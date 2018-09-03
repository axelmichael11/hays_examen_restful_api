const Hotel = require('../models/hotel')
const hotelData = require('../../recursos/data/data.json');
const fs = require('fs');
const hotelMethods = {};
const mongoose = require('mongoose');

const hotelImageFolder = '/../../recursos/assets/images/hotels/';

hotelMethods.insertHotelDataOnStart = function(){
    
    mongoose.connection.once( 'open', function callback() {
            return Hotel.findOne()
            .then((hotel)=>{
                if (!hotel){
                    console.log('PUTTING IN DB')
                    hotelMethods.saveJsonAndImagesOnStart()
                    .then(result=>{
                        console.log('images and data stored in DB')
                        return result;
                    })
                    .catch(err=>{
                        console.log('err storing hotels',err)
                    })
                } else {
                    console.log('Hotels already in DB')
                    return;
                }
            })
            .catch(err=>console.log(err));    
        })
        
}

hotelMethods.saveJsonAndImagesOnStart = function(){
    return hotelMethods.reducedAsync(Object.keys(hotelData), function(hotel){
        return hotel.save()
    })
}


hotelMethods.reducedAsync = function (array, asyncFunc) {
        return array.reduce((previous, current, i) => {
            let image = hotelData[i].image;
            let imagePath = hotelImageFolder+image;
            let hotel = new Hotel({
            id: hotelData[i].id,
            name: hotelData[i].name,
            price:hotelData[i].price,
            imageName: image,
            img: { data: fs.readFileSync(__dirname+ imagePath), contentType:'image/jpeg'}
        })
          return previous.then(accumulator => {
            return asyncFunc(hotel).then(result => {
                console.log('STORED');
                return accumulator.concat(result)
            })
            .catch(err=>{
                console.log('NOT STORED', err)
            })
          })
          .catch(err=>console.log(err));
        }, Promise.resolve([]));
      }

module.exports = hotelMethods;
