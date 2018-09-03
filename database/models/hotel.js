'use strict';

const DB = require('mongoose');


// {
//     "id": "249942",
//     "name": "Hotel Stefanos",
//     "stars": 3,
//     "price": 994.18,
//     "image": "4900059_30_b.jpg",
//     "amenities": [
//       "safety-box",
//       "nightclub",
//       "deep-soaking-bathtub",
//       "beach",
//       "business-center"
//     ]
//   },



const hotelSchema = DB.Schema({
    id: {type:String, required:true, minlength:1 },
    name: {type:String, required:true, minlength:1 },
    price:{type:Number, required:true },
    imageName: {type:String, required:true, minlength:1 },
    // amenities:[{type:String, required:true }],
    img: { data: Buffer, contentType: String },
  });

  module.exports = DB.model('hotel', hotelSchema);

