import express from 'express';
import mongoose from 'mongoose';

const router = express.Router();

// User modeli
const userSchema = new mongoose.Schema({
  name: String,
  age: Number,
});

const User = mongoose.model('User', userSchema);

// Yeni user yaratmaq (POST /users)
router.post('/', async (req, res) => {
  const newUser = new User({
    name: req.body.name,
    age: req.body.age,
  });

  try {
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (error) {
    res.status(500).json({ error: 'Error creating user' });
  }
});

// Bütün user-ləri almaq (GET /users)
router.get('/', async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching users' });
  }
});

export default router;
