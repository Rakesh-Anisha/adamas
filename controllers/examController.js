const Exam = require('../models/exam');

// Schedule Exam
exports.scheduleExam = async (req, res) => {
  try {
    const { exam_name, subject_id, exam_date, duration } = req.body;
    const exam = new Exam({
      exam_name,
      subject_id,
      exam_date,
      duration
    });
    await exam.save();
    res.status(200).json(exam);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Update Exam Details
exports.updateExamDetails = async (req, res) => {
  try {
    const exam = await Exam.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(exam);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// View Exam Info
exports.viewExamInfo = async (req, res) => {
  try {
    const exam = await Exam.findById(req.params.id).populate('subject_id');
    res.status(200).json(exam);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
