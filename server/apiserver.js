'use strict';

require('dotenv').config({path: `${__dirname}/../.env`});
const cors = require('cors');
const morgan = require('morgan');
const express = require('express');
// const mongoose = require('mongoose');
require('dotenv').config();
const hotelMethods = require('../database/methods/hotel')
const DB  = require('../database/index');




const app = express();

app.use(morgan('dev'));
app.use(cors());

const state = {
    isOn: false, 
    http: null,
}

const server = module.exports = {};

server.start = () => {
    return new Promise((resolve, reject) => {
      if (state.isOn) 
          return reject(new Error('USAGE ERROR: the state is on'));
        state.http = app.listen(process.env.PORT, () => {
          DB.start();
          console.log('__SERVER_UP__', process.env.PORT);
          
          resolve()
        })
  })
}
