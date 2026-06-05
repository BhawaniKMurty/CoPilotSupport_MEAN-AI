const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const router = express.Router();

// Register a new user
router.post('/register', async (req, res) => {
    try{
        const { name, email, password } = req.body;
        if(!name || !email || !password){
            return res.status(400).json({ message: 'Name, email, and password are required' });
        }
        const existing = await User.findOne({ email });
        if(existing){
            return res.status(400).json({ message: 'Email already in use' });
        }
        const passwordHash = await bcrypt.hash(password, 10);
        const user = await User.create({ name, email, passwordHash });
        return res.status(201).json({ userId: user._id, name: user.name, email: user.email });
    }catch(err){
        console.error('Error during registration:', err);
        res.status(500).json({ message: 'Server error during registration' });
    }
})

router.post('/login', async (req, res) => {
    try{
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if(!user){
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        const ok = await bcrypt.compare(password, user.passwordHash);
        if(!ok){
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN || '1d' });
        return res.json({ token, user:{id:user._id, name:user.name, email:user.email, role:user.role} });
    }catch(err){
        console.error('Error during login:', err);
        return res.status(500).json({ message: 'Server error, login Failed' });
    }
})


module.exports = router;