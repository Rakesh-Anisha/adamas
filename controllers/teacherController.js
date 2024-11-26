const Teacher = require('../models/teacher');

// View profile
exports.viewProfile = async (req, res) => {
  try {
    const teacher = await Teacher.findById(req.params.id).populate('department_id');
    if (!teacher) {
      return res.status(404).json({ message: 'Teacher not found' });
    }
    res.status(200).json(teacher);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Update profile
exports.updateProfile = async (req, res) => {
  try {
    const teacher = await Teacher.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!teacher) {
      return res.status(404).json({ message: 'Teacher not found' });
    }
    res.status(200).json(teacher);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Assign Grades (Example functionality)
exports.assignGrades = async (req, res) => {
  try {
    const { student_id, exam_id, marks_obtained, total_marks } = req.body;
    const newMarks = new Marks({
      student_id,
      exam_id,
      marks_obtained,
      total_marks
    });
    await newMarks.save();
    res.status(200).json(newMarks);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
