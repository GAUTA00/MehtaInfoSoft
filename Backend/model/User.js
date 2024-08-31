// models/User.js
const mongoose = require('mongoose');

// Define the schema
const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    products: [
        {
            productName: { type: String, required: true },
            quantity: { type: Number, required: true },
            price: { type: Number, required: true },
        }
    ],
    totalPrice: { type: Number, required: true },
});

// Create the model
const User = mongoose.model('User', UserSchema);

module.exports = User;
