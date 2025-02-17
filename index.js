const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // Enable Cross-Origin Resource Sharing
const session = require('express-session'); // For sessions (if you are using it)
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

// Database Connection
const dbURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/your_database_name'; // Replace with your MongoDB URI
mongoose.connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));


// Middleware
app.use(cors()); // Enable CORS for all origins (or configure as needed)
app.use(express.json()); // Enable parsing JSON request bodies
app.use(express.urlencoded({ extended: true })); // Enable parsing URL-encoded request bodies
app.use(express.static(path.join(__dirname, 'uploads'))); // Serve static files from 'uploads' directory
// app.use(session({ ... })); // If you are using sessions, uncomment and configure

// Routes
const authRoutes = require('./routes/auth');
app.use('/auth', authRoutes); 

const itemRoutes = require('./routes/item'); 
app.use('/', itemRoutes);

// Error Handling Middleware (Optional but recommended):
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' }); // Generic error message
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});