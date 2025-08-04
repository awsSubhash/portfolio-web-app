const express = require('express');
const nodemailer = require('nodemailer');
const path = require('path');

// Safely load dotenv
let dotenv;
try {
  dotenv = require('dotenv');
  dotenv.config({ path: path.resolve(__dirname, '.env') });
  console.log('Environment variables loaded:');
  console.log('EMAIL_USER:', process.env.EMAIL_USER ? 'Set' : 'Not set');
  console.log('EMAIL_PASS:', process.env.EMAIL_PASS ? 'Set' : 'Not set');
  console.log('PORT:', process.env.PORT || 3000);
} catch (error) {
  console.error('Failed to load dotenv:', error.message);
  console.warn('Continuing without environment variables. Contact form may not work.');
}

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON and serve static files
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Serve home.html for root URL
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'home.html'));
});

// Contact form endpoint
app.post('/api/contact', async (req, res) => {
  const { name, email, message } = req.body;

  // Validate input
  if (!name || !email || !message) {
    console.error('Validation failed: Missing required fields');
    return res.status(400).json({ error: 'All fields are required' });
  }

  // Validate environment variables
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    console.error('Nodemailer configuration error: Missing EMAIL_USER or EMAIL_PASS');
    return res.status(500).json({ error: 'Server configuration error: Missing email credentials' });
  }

  // Configure Nodemailer transporter
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  // Email options
  const mailOptions = {
    from: email,
    to: process.env.EMAIL_USER,
    subject: `Contact Form Submission from ${name}`,
    text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Email sent successfully from ${email} to ${process.env.EMAIL_USER}`);
    res.status(200).json({ message: 'Message sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error.message);
    res.status(500).json({ error: 'Failed to send message', details: error.message });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
