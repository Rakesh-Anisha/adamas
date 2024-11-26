const express = require('express');
const router = express.Router();
const examController = require('../controllers/examController');

// Schedule an Exam
router.post('/exams/schedule', examController.scheduleExam);

// Update Exam Details
router.put('/exams/:id', examController.updateExamDetails);

// View Exam Information
router.get('/exams/:id', examController.viewExamInfo);

module.exports = router;
