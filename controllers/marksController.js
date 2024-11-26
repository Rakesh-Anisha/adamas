const Marks = require('../models/marks');

// Add Marks
exports.addMarks = async (req, res) => {
  try {
    const { student_id, exam_id, marks_obtained, total_marks } = req.body;
    const marks = new Marks({
      student_id,
      exam_id,
      marks_obtained,
      total_marks
    });
    await marks.save();
    res.status(200).json(marks);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Update Marks
exports.updateMarks = async (req, res) => {
  try {
    const marks = await Marks.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(marks);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// View Marks
exports.viewMarks = async (req, res) => {
  try {
    const marks = await Marks.find({ student_id: req.params.student_id }).populate('exam_id');
    res.status(200).json(marks);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
