const mongoose = require('mongoose');

const marksSchema = new mongoose.Schema({
  student_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student',
    required: true
  },
  exam_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Exam',
    required: true
  },
  marks_obtained: {
    type: Number,
    required: true
  },
  total_marks: {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model('Marks', marksSchema);
