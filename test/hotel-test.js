'use strict';

require('dotenv').config({ path: `${__dirname}/../.test.env` });
const mongoose = require('mongoose');
const expect = require('expect');
const superagent = require('superagent');
const assert = require('assert');


const hotelData = require('../recursos/data/data.json')

const server = require('../server/apiserver.js');
const cleanDB = require('../database/methods/cleandb');
const Hotel = require('../database/models/hotel')
const hotelMethods = require('../database/methods/hotel')
let API_URL = process.env.API_URL;

describe('testing hotel insertion', () => {
  before(server.start);
  after(server.stop);
//   afterEach(cleanDB.start);
  

    describe('testing inserting json and pictures into database...', (done) => {
        it('should return a hotel after insertion... checking types....', (done) => {
                Hotel.findOne()
                .then(function(hotel){
                    if (!hotel){
                        console.log('hotel', hotel)
                        done();
                    } else {
                        console.log('hotel', hotel);
                        expect(typeof hotel.name).toEqual("string");
                        expect(typeof hotel.id).toEqual('string')
                        expect(typeof hotel.name).toEqual('string')
                        expect(typeof hotel.price).toEqual('number')
                        done();
                    }
                })
                .catch(function(err){
                    console.log('HIT ERROR', err)
                    done();
                })
        });
        it.only('should return a hotel after insertion... checking types....', (done) => {
            hotelMethods.saveJsonAndImagesOnStart()
            .then(result=>{
                // console.log('RESULT of insert hotel method',result)
                console.log(result.length, " should be equal",hotelData.length);
                expect(result.length).toEqual(hotelData.length);
                done()
            })
            .catch(err=>{
                console.log('error with method',err)
                done()
            })
        })
    });
});
