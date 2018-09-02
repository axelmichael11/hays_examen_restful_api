'use strict';

require('dotenv').config({ path: `${__dirname}/../.test.env` });
const mongoose = require('mongoose');
const expect = require('expect');
const superagent = require('superagent');



const server = require('../server/server.js');
const cleanDB = require('../database/methods/cleandb');


let API_URL = process.env.API_URL;

describe('testing burger router', () => {
  before(server.start);
  after(server.stop);
  afterEach(cleanDB.start);
  

    describe('testing inserting json and pictures into database...', () => {
        it.only('should return a 200', () => {
            console.log('hello');
        });
    });
});
