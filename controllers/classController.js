const Class = require('../models/class');
const Student = require('../models/student');
const Teacher = require('../models/teacher');

// Add Student to Class
exports.addStudent = async (req, res) => {
  try {
    const { class_id, student_id } = req.body;
    const student = await Student.findByIdAndUpdate(student_id, { class_id }, { new: true });
    res.status(200).json(student);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Remove Student from Class
exports.removeStudent = async (req, res) => {
  try {
    const student = await Student.findByIdAndUpdate(req.params.student_id, { class_id: null }, { new: true });
    res.status(200).json(student);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Assign Teacher to Class
exports.assignTeacher = async (req, res) => {
  try {
    const { class_id, teacher_id } = req.body;
    const classObj = await Class.findByIdAndUpdate(class_id, { teacher_id }, { new: true });
    res.status(200).json(classObj);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
