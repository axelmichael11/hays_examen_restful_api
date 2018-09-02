const mongoose = require('mongoose');
const Hotel = require('./models/hotel')
const hotelMethods = require('./methods/hotel');

const cleanDB = require('./methods/cleandb');
const DB = {};

DB.start = function(){

    return new Promise((resolve, reject)=>{
        mongoose.connect('mongodb://localhost:27017/myapp', { useNewUrlParser: true,  useCreateIndex: true});
        mongoose.connection.on( 'error', console.error.bind( console, 'connection error:' ) );  
        // mongoose.connection.dropDatabase();
        hotelMethods.insertHotelDataOnStart();
        resolve();
        });
}



module.exports = DB;

