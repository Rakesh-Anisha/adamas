const mongoose = require('mongoose');

const sectionSchema = new mongoose.Schema({
  section_name: {
    type: String,
    required: true
  },
  class_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Class',
    required: true
  },
  capacity: {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model('Section', sectionSchema);
