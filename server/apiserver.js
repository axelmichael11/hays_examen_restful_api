'use strict';

require('dotenv').config({path: `${__dirname}/../.env`});
const cors = require('cors');
const morgan = require('morgan');
const express = require('express');
// const mongoose = require('mongoose');
require('dotenv').config();
const hotelMethods = require('../database/methods/hotel')
const DB  = require('../database/index');
const port =  process.argv[2] || process.env.PORT;




const app = express();

app.use(morgan('dev'));
app.use(cors());


app.get('*', (req, res) => {
  res.status(400);
  res.send('WELCOME TO THE HOTEL API!');
});


// const state = {
//     isOn: false, 
//     http: null,
// }

const server = module.exports = {};
server.isOn = false;

server.start = () => {  
    return new Promise((resolve, reject) => {
      console.log("STATE", server.isOn);
      if (server.isOn) {
        return reject(new Error(500));
      }
        server.isOn = true;
        server.http = app.listen(port, () => {
        DB.start();
        return resolve();
        })
        return;
    })
    .then(()=>{
      console.log('__SERVER_UP__', port);
    })
    .catch(err=>{
      console.log('ERORR', err)
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
        return resolve();
        return;
      })
    }
  })
}
