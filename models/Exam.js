const mongoose = require('mongoose');

const examSchema = new mongoose.Schema({
  exam_name: {
    type: String,
    required: true
  },
  subject_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Subject',
    required: true
  },
  exam_date: {
    type: Date,
    required: true
  },
  duration: {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model('Exam', examSchema);
