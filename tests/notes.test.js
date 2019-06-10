require('dotenv').config();
const request = require('supertest');
const mongoose = require('mongoose');
const connect = require('../lib/utils/connect');
const app = require('../lib/app');

describe('note routes', () => {
  beforeAll(() => {
    return connect();
  });
  beforeEach(() => {
    return mongoose.connection.dropDatabase();
  }); 
  afterAll(() => {
    return mongoose.connection.close();
  });
  
  it('creates a note and puts in db via POST route', () => {
    return request(app)
      .post('/api/v1/notes')
      .send({ title: 'Big Title', body: 'Cute little bod bod' })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          title: 'Big Title',
          body: 'Cute little bod bod',
          __v: 0
        });
      });
  });
});
