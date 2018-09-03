'use strict';

require('dotenv').config({ path: `${__dirname}/../.test.env` });

const expect = require('expect');
const superagent = require('superagent');

const server = require('../server/apiserver.js');

let API_URL = process.env.API_URL;

describe('testing server', () => {
  it('should return an error not having any routes...', () => {
    server.start();
    return superagent.post(`${API_URL}/api/hello`)
      .catch(res => {
        expect(res.status).toEqual(404);
        console.log('test DONE')
      });
  });
  it.only('should return 500 error for stopping the server when already off.... ', () => {
    server.stop();
    server.stop().catch(err=>{
        console.log(err);
        expect(err).toEqual(Error(500))
    })
  });
  it('should return an error for server already running...', () => {
    server.start();
    server.start()
    .then(res=>{
        console.log('this shouldn not hit');
    })
    .catch(err=>{
        console.log('THis should be a 500 error',err);
        expect(err).toEqual(Error(500))
        
    })
  });
  it('success on stopping the server', () => {
    server.start();
    server.stop()
      .then(res => {        
        expect(res).toEqual(undefined)
      })
      .catch(err=>{
        console.log('EROROROROROR',err);
      })
  });
  
});