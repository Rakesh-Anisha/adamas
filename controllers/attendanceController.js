const Attendance = require('../models/attendance');

// Mark Attendance
exports.markAttendance = async (req, res) => {
  try {
    const { student_id, subject_id, date, status } = req.body;
    const attendance = new Attendance({
      student_id,
      subject_id,
      date,
      status
    });
    await attendance.save();
    res.status(200).json(attendance);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// View Attendance
exports.viewAttendance = async (req, res) => {
  try {
    const attendance = await Attendance.find({ student_id: req.params.student_id }).populate('subject_id');
    res.status(200).json(attendance);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
