const Section = require('../models/Section');
const Student = require('../models/Student');

// Assign Students to Section
exports.assignStudents = async (req, res) => {
  try {
    const { section_id, student_ids } = req.body;
    const students = await Student.updateMany(
      { _id: { $in: student_ids } },
      { section_id },
      { new: true }
    );
    res.status(200).json(students);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Remove Student from Section
exports.removeStudent = async (req, res) => {
  try {
    const student = await Student.findByIdAndUpdate(req.params.student_id, { section_id: null }, { new: true });
    res.status(200).json(student);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
