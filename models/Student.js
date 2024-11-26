const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    required: true,
  },
  dob: {
    type: Date,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone_number: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  enrollment_date: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    enum: ['Active', 'Inactive'],
    default: 'Active',
  },
  class_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Class',
  },
  section_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Section',
  },
  password: {
    type: String,
    required: true,
  },
});

// This check prevents redefining the model
const Student = mongoose.models.Student || mongoose.model('Student', studentSchema);
module.exports = Student;
