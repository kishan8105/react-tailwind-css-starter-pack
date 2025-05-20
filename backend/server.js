const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

// Load environment variables - ensure this is at the top
dotenv.config();

// Debug output to check environment variables
console.log('MongoDB URI:', process.env.MONGODB_URI ? 'Defined' : 'Undefined');

// Initialize Express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection URI - use hardcoded fallback for now
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://kishan8105:damHEHo7pNlKcnRd@contact.0fqqtdx.mongodb.net/?retryWrites=true&w=majority&appName=contact';

// Connect to MongoDB with error handling
mongoose.connect(MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Define Contact schema
const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    match: [/\S+@\S+\.\S+/, 'Please enter a valid email']
  },
  contact: {
    type: String,
    required: [true, 'Contact number is required'],
    match: [/^\d{10,15}$/, 'Please enter a valid contact number']
  },
  message: {
    type: String,
    required: [true, 'Message is required'],
    minLength: [10, 'Message should be at least 10 characters']
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Create Contact model
const Contact = mongoose.model('Contact', contactSchema);

// Routes
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, contact, message } = req.body;
    
    // Validate input
    if (!name || !email || !contact || !message) {
      return res.status(400).json({ success: false, error: 'All fields are required' });
    }
    
    // Create new contact submission
    const newContact = new Contact({
      name,
      email,
      contact,
      message
    });
    
    // Save to database
    await newContact.save();
    
    res.status(201).json({
      success: true,
      message: 'Message sent successfully',
      data: newContact
    });
  } catch (error) {
    console.error('Error saving contact:', error);
    
    // Handle validation errors
    if (error.name === 'ValidationError') {
      const validationErrors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({ success: false, error: validationErrors });
    }
    
    res.status(500).json({
      success: false,
      error: 'Server error, please try again later'
    });
  }
});

// Get all contacts (for admin purposes)
app.get('/api/contacts', async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      count: contacts.length,
      data: contacts
    });
  } catch (error) {
    console.error('Error fetching contacts:', error);
    res.status(500).json({
      success: false,
      error: 'Server error, please try again later'
    });
  }
});

// Define port
const PORT = process.env.PORT || 5000;

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});