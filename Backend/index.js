// server.js (or app.js)
const express = require('express');
const mongoose = require('mongoose');
const User = require('./model/User');
const cors = require('cors')


require('dotenv').config();
const app = express();
app.use(express.json());
app.use(cors());

app.use(cors({
    origin: 'http://localhost:5173/', // Replace with your frontend URL
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
    allowedHeaders: ['Content-Type'], // Allowed headers
}));


// Connect to MongoDB
mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to MongoDB');
}).catch((err) => {
    console.error('Failed to connect to MongoDB', err);
});

// Endpoint to save user data
app.post('/save', async (req, res) => {
    const { name, email, products, totalPrice } = req.body;

    const user = new User({
        name,
        email,
        products,
        totalPrice
    });

    try {
        await user.save();
        res.status(201).send('User data saved successfully');
    } catch (err) {
        res.status(400).send('Error saving data');
    }
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
