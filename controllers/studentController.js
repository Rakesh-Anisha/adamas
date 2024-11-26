const Student = require('../models/Student');

// View profile
exports.viewProfile = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id).populate('class_id section_id');
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }
    res.status(200).json(student);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Update profile
exports.updateProfile = async (req, res) => {
  try {
    const student = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }
    res.status(200).json(student);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Check Attendance
exports.checkAttendance = async (req, res) => {
  try {
    const attendance = await Attendance.find({ student_id: req.params.id }).populate('subject_id');
    res.status(200).json(attendance);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// View Marks
exports.viewMarks = async (req, res) => {
  try {
    const marks = await Marks.find({ student_id: req.params.id }).populate('exam_id');
    res.status(200).json(marks);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
