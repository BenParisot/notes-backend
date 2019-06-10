const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
  title: {
    type: String,
    minlength: 1,
    maxlength: 75,
    required: true
  },
  body: {
    type: String,
    maxlength: 750,
    required: true
  }
});

module.exports = mongoose.model('Note', noteSchema);
