const Hotel = require('../models/hotel')
const hotelData = require('../../recursos/data/data.json');
const fs = require('fs');
const hotelMethods = {};
const mongoose = require('mongoose');

const hotelImageFolder = '/../../recursos/assets/images/hotels/';

hotelMethods.insertHotelDataOnStart = function(){
    return mongoose.connection.once( 'open', function callback() {
            let dataBaseEmpty = Hotel.findOne()
            .then((hotel)=>{
                if (!hotel){
                    console.log('PUTTING IN DB')
                    hotelMethods.saveImagesAndJsonData();
                } else {
                    console.log('Hotels already in DB')
                }
            })
            .catch(err=>console.log(err));
    })
}


hotelMethods.saveImagesAndJsonData = function(){

    let hotelsToSave = [];


    for (let i in hotelData) {
        let image = hotelData[i].image;
        let imagePath = hotelImageFolder+image;
        // console.log(imagePath);
        let hotel = new Hotel({
            id: hotelData[i].id,
            name: hotelData[i].name,
            price:hotelData[i].price,
            imageName: image,
            img: { data: fs.readFileSync(__dirname+ imagePath), contentType:'image/jpeg'}
        })
        console.log('HOTEL@@@', hotel);
        hotelsToSave.push(hotel);
    }


    hotelsToSave.reduce( (p, hotel, i) => {
        console.log('HOTEL', p, hotel, i)
        return hotel.save()
            .then(()=>{
                console.log("hotel stored", i);
            })
            .catch(err=>console.log("ERROR SAVING HOTEL: ",i, err))
    }
, Promise.resolve() );

}


module.exports = hotelMethods;
