const Department = require('../models/department');
const Teacher = require('../models/Teacher');

// Create a new department
exports.createDepartment = async (req, res) => {
  try {
    const { department_name, faculty_head_id, description } = req.body;

    // Check if the department name already exists
    const existingDepartment = await Department.findOne({ department_name });
    if (existingDepartment) {
      return res.status(400).json({ message: 'Department with this name already exists' });
    }

    // Create new department
    const newDepartment = new Department({
      department_name,
      faculty_head_id,
      description
    });

    await newDepartment.save();
    res.status(201).json(newDepartment);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Update a department's information
exports.updateDepartmentInfo = async (req, res) => {
  try {
    const { department_name, faculty_head_id, description } = req.body;

    const updatedDepartment = await Department.findByIdAndUpdate(
      req.params.id,
      { department_name, faculty_head_id, description },
      { new: true }
    );

    if (!updatedDepartment) {
      return res.status(404).json({ message: 'Department not found' });
    }

    res.status(200).json(updatedDepartment);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// View a department's details
exports.viewDepartmentDetails = async (req, res) => {
  try {
    const department = await Department.findById(req.params.id).populate('faculty_head_id');
    if (!department) {
      return res.status(404).json({ message: 'Department not found' });
    }
    res.status(200).json(department);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all departments
exports.getAllDepartments = async (req, res) => {
  try {
    const departments = await Department.find().populate('faculty_head_id');
    res.status(200).json(departments);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Assign a faculty head to a department
exports.assignFacultyHead = async (req, res) => {
  try {
    const { department_id, faculty_head_id } = req.body;

    // Check if faculty head exists
    const facultyHead = await Teacher.findById(faculty_head_id);
    if (!facultyHead) {
      return res.status(404).json({ message: 'Faculty head not found' });
    }

    // Update department with the new faculty head
    const department = await Department.findByIdAndUpdate(
      department_id,
      { faculty_head_id },
      { new: true }
    );

    if (!department) {
      return res.status(404).json({ message: 'Department not found' });
    }

    res.status(200).json(department);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
