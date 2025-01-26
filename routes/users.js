import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const secret = process.env.JWT_TOKEN;

import { User } from '../models/User.js';

const router = express.Router();

router.post('/login', async(req,res) => {

  try {
    const { email, password } = req.body;
    const user = await User.findOne({ username: email });

    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    let token = jwt.sign({ email: user.username, role: user.role }, secret );
    res.cookie("uid", token);

    res.status(200).json({ message:'Logged In', cookie: token});
    
  } catch (error) {
    console.log('Error logging user', error.message)
    res.status(500).json({ message:"Internal Server Error"});
  }

});

router.post('/register', async (req,res) => {
    
    let { email, password } = req.body;
    await User.create({ username: email, password });

    res.status(200).json({message:"success"});
    
});

export default router;