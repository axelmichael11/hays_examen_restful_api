'use strict';

require('dotenv').config({path: `${__dirname}/../.env`});
const cors = require('cors');
const morgan = require('morgan');
const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();



// mongoose.Promise = Promise;


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
      if (!state.isOn){ 
      state.isOn = true
      return mongoose.connect('mongodb://localhost/maxhax_db', { useNewUrlParser: true })
      .then(() => {
        state.http = app.listen(process.env.PORT, () => {
          console.log('__SERVER_UP__', process.env.PORT)
          resolve()
        })
      })
      .catch((error)=>{
        console.log('this is the erroer!',error)
        })
        }
    })
  }

