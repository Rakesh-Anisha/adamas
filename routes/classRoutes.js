const express = require('express');
const router = express.Router();
const classController = require('../controllers/classController');

// Add Student to Class
router.post('/classes/addStudent', classController.addStudent);

// Remove Student from Class
router.delete('/classes/removeStudent/:student_id', classController.removeStudent);

// Assign Teacher to Class
router.post('/classes/assignTeacher', classController.assignTeacher);

module.exports = router;
