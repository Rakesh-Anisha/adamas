const express = require('express');
const router = express.Router();
const marksController = require('../controllers/marksController');

// Add Marks for a Student
router.post('/marks', marksController.addMarks);

// Update Marks for a Student
router.put('/marks/:id', marksController.updateMarks);

// View Marks for a Student
router.get('/marks/:student_id', marksController.viewMarks);

module.exports = router;
