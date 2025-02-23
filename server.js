const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// In-memory array to store users (for demonstration purposes)
const users = [
    { username: 'john_doe', name: 'John Doe', email: 'john@example.com', dateOfBirth: '1990-01-01' },
    { username: 'jane_doe', name: 'Jane Doe', email: 'jane@example.com', dateOfBirth: '1992-05-15' }
];

// Basic route to test if the server is running
app.get('/', (req, res) => {
    res.send('Server is running!');
});

// Login endpoint
app.post('/login', (req, res) => {
    const { email, password } = req.body;

    // Validate email
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        return res.status(400).json({ error: 'Invalid email format' });
    }

    // Validate password
    if (!password) {
        return res.status(400).json({ error: 'Password cannot be empty' });
    }

    // If all validations pass, return success message
    res.json({ message: 'Login successful' });
});

// Signup endpoint
app.post('/signup', (req, res) => {
    const { name, email, password, dateOfBirth } = req.body;

    // Validate name
    if (!name || !/^[A-Za-z\s]+$/.test(name)) {
        return res.status(400).json({ error: 'Invalid name format. Only letters and spaces are allowed.' });
    }

    // Validate email
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        return res.status(400).json({ error: 'Invalid email format' });
    }

    // Validate password
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/;
    if (!password || !passwordRegex.test(password)) {
        return res.status(400).json({ error: 'Password must be 8-16 characters long, contain at least one uppercase, one lowercase, one number, and one special character.' });
    }

    // If all validations pass, return success message
    res.json({ message: 'Signup successful' });
});

// User data retrieval endpoint
app.get('/user', (req, res) => {
    const { username } = req.query;

    // Validate username
    if (!username) {
        return res.status(400).json({ error: 'User parameter cannot be empty' });
    }

    // Find user by username
    const user = users.find(u => u.username === username);

    if (user) {
        res.json({ message: 'User found', data: user });
    } else {
        res.status(404).json({ message: 'User not found' });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});