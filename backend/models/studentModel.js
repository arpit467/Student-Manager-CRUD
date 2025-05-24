const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  name: String,
  rollNo: String,
  email: String,
});

module.exports = mongoose.model('Student', studentSchema);
