// const Admin = require('../models/Admin.js');
// const bcrypt = require('bcryptjs');

// // Manage Students
// exports.manageStudents = async (req, res) => {
//   try {
//     const students = await Student.find().populate('class_id section_id');
//     res.status(200).json(students);
//   } catch (err) {
//     res.status(400).json({ error: err.message });
//   }
// };

// // Manage Teachers
// exports.manageTeachers = async (req, res) => {
//   try {
//     const teachers = await Teacher.find().populate('department_id');
//     res.status(200).json(teachers);
//   } catch (err) {
//     res.status(400).json({ error: err.message });
//   }
// };

// // Manage Classes
// exports.manageClasses = async (req, res) => {
//   try {
//     const classes = await Class.find().populate('department_id');
//     res.status(200).json(classes);
//   } catch (err) {
//     res.status(400).json({ error: err.message });
//   }
// };

// // Configure System
// exports.configureSystem = async (req, res) => {
//   // Placeholder for configuration functionality
//   res.status(200).json({ message: 'System Configuration Updated' });
// };

// // Create Admin
// exports.createAdmin = async (req, res) => {
//   try {
//     const { first_name, last_name, email, password, phone_number, role } = req.body;

//     // Validate required fields
//     if (!first_name || !last_name || !email || !password || !phone_number) {
//       return res.status(400).json({ message: 'All fields are required' });
//     }

//     // Check if the email already exists
//     const existingAdmin = await Admin.findOne({ email });
//     if (existingAdmin) {
//       return res.status(400).json({ message: 'Admin with this email already exists' });
//     }

//     // Hash the password
//     const salt = await bcrypt.genSalt(10);
//     const hashedPassword = await bcrypt.hash(password, salt);

//     // Create new admin
//     const newAdmin = new Admin({
//       first_name,
//       last_name,
//       email,
//       password: hashedPassword,
//       phone_number,
//       role: role || 'admin', // Default role is 'admin'
//     });

//     // Save the admin to the database
//     await newAdmin.save();

//     // Return success message
//     res.status(201).json({ message: 'Admin created successfully', admin: newAdmin });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };











// // Admin Login
// exports.loginAdmin = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     // Validate required fields
//     if (!email || !password) {
//       return res.status(400).json({ message: 'Email and password are required' });
//     }

//     // Check if the admin exists in the database
//     const admin = await Admin.findOne({ email });
//     if (!admin) {
//       return res.status(400).json({ message: 'Invalid email or password' });
//     }

//     // Compare the entered password with the stored hash
//     const isMatch = await bcrypt.compare(password, admin.password);
//     if (!isMatch) {
//       return res.status(400).json({ message: 'Invalid email or password' });
//     }

//     // Create and sign a JWT token
//     const payload = {
//       id: admin._id,
//       first_name: admin.first_name,
//       last_name: admin.last_name,
//       email: admin.email,
//       role: admin.role,
//     };

//     const token = jwt.sign(payload, yoursecretkey, { expiresIn: '1s' });

//     // Return the token as the response
//     res.status(200).json({ message: 'Login successful', token });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };



// controllers/AdminAuthController.js
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');
const config = require('../config/config');

// Create a new admin (register)
exports.createAdmin = async (req, res) => {
  const { first_name, last_name, email, password, phone_number, role } = req.body;

  // Validate required fields
  if (!first_name || !last_name || !email || !password || !phone_number) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    // Check if the admin already exists
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res.status(400).json({ message: 'Admin with this email already exists' });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new admin
    const newAdmin = new Admin({
      first_name,
      last_name,
      email,
      password: hashedPassword,
      phone_number,
      role: role || 'admin', // Default role is 'admin'
    });

    // Save the admin to the database
    await newAdmin.save();

    // Return success message
    res.status(201).json({ message: 'Admin created successfully', admin: newAdmin });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

// Login admin and generate JWT
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find admin by email
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Check if password matches
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: admin._id, email: admin.email },
      your_jwt_secret_key,
      { expiresIn: '1h' }
    );

    res.json({ message: 'Login successful', token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};
