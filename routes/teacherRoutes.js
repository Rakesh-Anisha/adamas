const express = require('express');
const router = express.Router();
const teacherController = require('../controllers/teacherController');

// View Teacher Profile
router.get('/teachers/:id', teacherController.viewProfile);

// Update Teacher Profile
router.put('/teachers/:id', teacherController.updateProfile);

// Assign Grades to a Student
router.post('/teachers/assignGrades', teacherController.assignGrades);

module.exports = router;
