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

  it('finds and returns a note by id', () => {
    return request(app)
      .post('/api/v1/notes')
      .send({ title: 'Cute note bro', body: 'Yeah I like this note a lot' })
      .then(note => {
        return request(app)
          .get(`/api/v1/notes/${note.body._id}`)
          .then(returnedNote => {
            expect(returnedNote.body).toEqual({
              _id: note.body._id,
              title: 'Cute note bro',
              body: 'Yeah I like this note a lot',
              __v: 0
            });
          });
      });
  });
});
