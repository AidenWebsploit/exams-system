const mongoose = require('mongoose');

const StudentsSchema = new mongoose.Schema({
  admission: Number,
  first_name: String,
  last_name: String,
  gender: String,
  grade: Number,
  age: Number,
  class: String,
  english: { type: Number, default: 0 },
  maths: { type: Number, default: 0 },
  kiswahili: { type: Number, default: 0 },
  biology: { type: Number, default: 0 },
  physics: { type: Number, default: 0 },
  chemistry: { type: Number, default: 0 },
  business: { type: Number, default: 0 },
  computer: { type: Number, default: 0 },
  agriculture: { type: Number, default: 0 }
})

const Students = mongoose.model('Students', StudentsSchema);

module.exports = Students;