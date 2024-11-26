const express = require('express');
const router = express.Router();
const departmentController = require('../controllers/departmentController');

// Create a New Department
router.post('/departments', departmentController.createDepartment);

// Update Department Info
router.put('/departments/:id', departmentController.updateDepartmentInfo);

// View Department Details
router.get('/departments/:id', departmentController.viewDepartmentDetails);

// Get All Departments
router.get('/departments', departmentController.getAllDepartments);

// Assign Faculty Head to Department
router.put('/departments/assignFacultyHead', departmentController.assignFacultyHead);

module.exports = router;
