import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { db } from '../utils/db.js';

const router = express.Router();

const DEFAULT_PROFILE = {
  headline: 'Aspiring Software Engineer',
  bio: 'Building full-stack web applications, solving DSA problems, and preparing for internship opportunities.',
  skills: {
    Frontend: ['HTML', 'CSS', 'JavaScript', 'React', 'Tailwind'],
    Backend: ['Node.js', 'Express', 'MongoDB'],
    Programming: ['C++', 'Java', 'DSA', 'Git']
  },
  projects: [
    { name: 'HireHub', desc: 'AI-powered internship discovery platform.' },
    { name: 'EduSmaran', desc: 'Smart attendance and curriculum planner.' },
    { name: 'Career Copilot', desc: 'AI-guided career assistant dashboard.' },
    { name: 'Resume Studio', desc: 'ATS-friendly resume builder.' }
  ],
  goals: {
    targetRole: 'Software Engineer',
    preferredDomain: 'Full Stack Development',
    workPreference: 'Remote / Hybrid',
    expectedStipend: '₹20k+'
  },
  stats: {
    matchRate: 85,
    applications: 0
  }
};

router.post('/signup', async (req, res) => {
  try {
    const { name, email, password, college, degree } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Name, email, and password are required' });
    }

    const users = await db.getUsers();
    const existingUser = users.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists with this email' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const userId = Date.now().toString();
    const newUser = {
      id: userId,
      name,
      email: email.toLowerCase(),
      password: hashedPassword,
      college: college || '',
      degree: degree || '',
      createdAt: new Date().toISOString()
    };

    users.push(newUser);
    await db.saveUsers(users);

    const profiles = await db.getProfiles();
    const newProfile = {
      userId,
      ...DEFAULT_PROFILE,
      headline: `Aspiring Software Engineer${degree ? ` • ${degree}` : ''}`
    };
    profiles.push(newProfile);
    await db.saveProfiles(profiles);

    const token = jwt.sign(
      { id: userId, email: newUser.email },
      process.env.JWT_SECRET || 'hirehub_jwt_secret_token_key_123',
      { expiresIn: '7d' }
    );

    res.status(201).json({
      token,
      user: {
        id: userId,
        name: newUser.name,
        email: newUser.email,
        college: newUser.college,
        degree: newUser.degree
      }
    });
  } catch (err) {
    console.error('Signup error:', err);
    res.status(500).json({ message: 'Internal server error during signup' });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    const users = await db.getUsers();
    const user = users.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET || 'hirehub_jwt_secret_token_key_123',
      { expiresIn: '7d' }
    );

    res.json({
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        college: user.college,
        degree: user.degree
      }
    });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ message: 'Internal server error during login' });
  }
});

export default router;
