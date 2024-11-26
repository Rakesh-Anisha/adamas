const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Student = require('../models/Student');
const Teacher = require('../models/Teacher');
const Admin = require('../models/Admin');

// Secret key for JWT token (you should use a more secure method in production)
const JWT_SECRET = 'your_jwt_secret_key'; 

// Helper function to generate JWT token
const generateToken = (id, role) => {
  return jwt.sign({ id, role }, JWT_SECRET, { expiresIn: '1h' });
};

// Register a user (Student, Teacher, Admin)
const register = async (req, res) => {
  const { first_name, last_name, email, password, role, ...otherFields } = req.body;

  try {
    let user;

    // Check if the email already exists in the chosen role
    if (role === 'student') {
      user = await Student.findOne({ email });
    } else if (role === 'teacher') {
      user = await Teacher.findOne({ email });
    } else if (role === 'admin') {
      user = await Admin.findOne({ email });
    }

    // If user already exists, return an error
    if (user) {
      return res.status(400).json({ message: 'Email already registered' });
    }

    // Hash password before saving to database
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user based on role
    if (role === 'student') {
      user = new Student({ ...otherFields, first_name, last_name, email, password: hashedPassword });
    } else if (role === 'teacher') {
      user = new Teacher({ ...otherFields, first_name, last_name, email, password: hashedPassword });
    } else if (role === 'admin') {
      user = new Admin({ first_name, last_name, email, password: hashedPassword });
    }

    // Save the user
    await user.save();

    // Generate JWT token
    const token = generateToken(user._id, role);

    res.status(201).json({
      message: 'Registration successful',
      token,
      user: { first_name: user.first_name, last_name: user.last_name, email: user.email, role }
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Login function (for Student, Teacher, Admin)
const login = async (req, res) => {
  const { email, password, role } = req.body;

  try {
    let user;

    // Find user by role
    if (role === 'student') {
      user = await Student.findOne({ email });
    } else if (role === 'teacher') {
      user = await Teacher.findOne({ email });
    } else if (role === 'admin') {
      user = await Admin.findOne({ email });
    }

    // If user doesn't exist, return an error
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Compare passwords using bcrypt
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = generateToken(user._id, role);

    res.status(200).json({
      message: 'Login successful',
      token,
      user: { first_name: user.first_name, last_name: user.last_name, email: user.email, role }
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = { register, login };
