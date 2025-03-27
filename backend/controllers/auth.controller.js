import jwt from 'jsonwebtoken';
import { JWT_SECRET,JWT_EXPIRES_IN } from '../config/env.js';
import { User } from '../models/User.js';

export const register = async (req, res) => {
  try {
    const { username } = req.body;
    
    // Check for existing user
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ 
        error: "Username already exists" 
      });
    }

    // Proceed with registration
    const user = new User(req.body);
    await user.save();
    res.status(201).json(user);
    
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const login = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user || !(await user.comparePassword(req.body.password))) {
      throw new Error('Invalid credentials');
    }
    const token = jwt.sign({ _id: user._id }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
    res.json({ user, token });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};