const express = require('express');
const router = express.Router();
const sectionController = require('../controllers/sectionController');

// Assign Students to Section
router.post('/sections/assignStudents', sectionController.assignStudents);

// Remove Student from Section
router.delete('/sections/removeStudent/:student_id', sectionController.removeStudent);

module.exports = router;
