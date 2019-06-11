const { Router } = require('express');
const Note = require('../models/Note');

module.exports = Router() 
  .post('/', (req, res, next) => {
    const { title, body } = req.body;
    Note
      .create({ title, body })
      .then(note => res.send(note))
      .catch(next);
  })

  .get('/', (req, res, next) => {
    console.log('is the get even getting?');
    Note
      .find()
      .then(notes => res.send(notes))
      .catch(next);
  });
  
