const mongoose = require('mongoose');

const departmentSchema = new mongoose.Schema({
  department_name: {
    type: String,
    required: true
  },
  faculty_head_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Teacher'
  },
  description: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Department', departmentSchema);
