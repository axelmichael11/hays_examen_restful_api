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
server.isOn = false;

server.start = () => {  
    return new Promise((resolve, reject) => {
      console.log("STATE", server.inOn);
      if (server.isOn) {
        return reject(new Error(500));
      } else {
        server.isOn = true;
        server.http = app.listen(process.env.PORT, () => {
        DB.start();
        console.log('__SERVER_UP__', process.env.PORT);
        resolve();
        })
        return;
      }
    })
}


server.stop = () => {
  return new Promise((resolve, reject) => {
    console.log("STATE", server.isOn);
    if (!server.http && !server.isOn) {
      return reject(new Error(500));
    } else {
      console.log("turning off server")
      return server.http.close((res, err) => {
        server.isOn = false;
        resolve();
        return;
      })
    }
    
  })
}
