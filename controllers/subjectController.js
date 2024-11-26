const Subject = require('../models/Subject');

// Assign Subject
exports.assignSubject = async (req, res) => {
  try {
    const { subject_name, class_id, teacher_id } = req.body;
    const subject = new Subject({
      subject_name,
      class_id,
      teacher_id
    });
    await subject.save();
    res.status(200).json(subject);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Update Subject Info
exports.updateSubjectInfo = async (req, res) => {
  try {
    const subject = await Subject.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(subject);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// View Subject Details
exports.viewSubjectDetails = async (req, res) => {
  try {
    const subject = await Subject.findById(req.params.id).populate('teacher_id class_id');
    res.status(200).json(subject);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
