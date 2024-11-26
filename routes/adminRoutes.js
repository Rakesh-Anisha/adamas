const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

// Manage Students
router.get('/admin/students', adminController.manageStudents);

// Manage Teachers
router.get('/admin/teachers', adminController.manageTeachers);

// Manage Classes
router.get('/admin/classes', adminController.manageClasses);

// Configure System Settings
router.post('/admin/configure', adminController.configureSystem);

module.exports = router;
//create admin
router.post('/admin/createadmin',adminController.createAdmin)



router.post('/register', createAdmin);  // Use createAdmin here

// Login route
router.post('/login', login);