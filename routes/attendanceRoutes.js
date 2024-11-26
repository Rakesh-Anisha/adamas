const express = require('express');
const router = express.Router();
const attendanceController = require('../controllers/attendanceController');

// Mark Attendance for a Student
router.post('/attendance', attendanceController.markAttendance);

// View Attendance for a Student
router.get('/attendance/:student_id', attendanceController.viewAttendance);

module.exports = router;
