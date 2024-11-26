const express = require('express');
const router = express.Router();
const subjectController = require('../controllers/subjectController');

// Assign Subject to Class
router.post('/subjects/assignSubject', subjectController.assignSubject);

// Update Subject Info
router.put('/subjects/:id', subjectController.updateSubjectInfo);

// View Subject Details
router.get('/subjects/:id', subjectController.viewSubjectDetails);

module.exports = router;
