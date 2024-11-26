const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');

// View Student Profile
router.get('/students/:id', studentController.viewProfile);

// Update Student Profile
router.put('/students/:id', studentController.updateProfile);

// Check Attendance for Student
router.get('/students/:id/attendance', studentController.checkAttendance);

// View Marks for Student
router.get('/students/:id/marks', studentController.viewMarks);

module.exports = router;
