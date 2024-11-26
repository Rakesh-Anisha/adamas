const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes'); // Import authentication routes
const dotenv = require('dotenv');
const protectedRoutes = require('./routes/protectedRoutes');
dotenv.config();  // Load environment variables



// Initialize app
const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Import routes
const studentRoutes = require('./routes/studentRoutes');
const teacherRoutes = require('./routes/teacherRoutes');
const adminRoutes = require('./routes/adminRoutes');
const classRoutes = require('./routes/classRoutes');
const sectionRoutes = require('./routes/sectionRoutes');
const subjectRoutes = require('./routes/subjectRoutes');
const departmentRoutes = require('./routes/departmentRoutes');
const attendanceRoutes = require('./routes/attendanceRoutes');
const examRoutes = require('./routes/examRoutes');
const marksRoutes = require('./routes/marksRoutes');


// Use the authentication routes
app.use('/api/auth', authRoutes); 
app.use('/api', protectedRoutes);

// Register routes
app.use('/api', studentRoutes);
app.use('/api', teacherRoutes);
app.use('/api', adminRoutes);
app.use('/api', classRoutes);
app.use('/api', sectionRoutes);
app.use('/api', subjectRoutes);
app.use('/api', departmentRoutes);
app.use('/api', attendanceRoutes);
app.use('/api', examRoutes);
app.use('/api', marksRoutes);


// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/student_management_system')
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));


  // Use auth routes
app.use('/api/auth', authRoutes);
app.use('/api/auth/admin', adminRoutes);

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
