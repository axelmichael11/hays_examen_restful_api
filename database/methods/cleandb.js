'use strict';

const Hotel = require('../models/hotel.js');

module.exports = () =>{
  return Promise.all([
    Hotel.deleteMany({}),
  ]);
};