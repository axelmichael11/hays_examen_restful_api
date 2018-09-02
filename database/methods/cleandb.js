'use strict';

const mongoose = require('mongoose');
const cleanDB = {};

cleanDB.start = function(){
    mongoose.connection.dropDatabase();
}

module.exports = cleanDB;
