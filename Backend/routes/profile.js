import express from 'express';
import { db } from '../utils/db.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.get('/', auth, async (req, res) => {
  try {
    const userId = req.user.id;
    const users = await db.getUsers();
    const user = users.find(u => u.id === userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const profiles = await db.getProfiles();
    let profile = profiles.find(p => p.userId === userId);
    if (!profile) {
      profile = {
        userId,
        headline: 'Aspiring Software Engineer',
        bio: 'Building full-stack web applications, solving DSA problems, and preparing for internship opportunities.',
        skills: { Frontend: [], Backend: [], Programming: [] },
        projects: [],
        goals: { targetRole: 'Software Engineer', preferredDomain: 'Full Stack Development', workPreference: 'Remote / Hybrid', expectedStipend: '₹20k+' },
        stats: { matchRate: 85, applications: 0 }
      };
      profiles.push(profile);
      await db.saveProfiles(profiles);
    }

    const combinedProfile = {
      name: user.name,
      email: user.email,
      college: user.college,
      degree: user.degree,
      ...profile
    };

    res.json(combinedProfile);
  } catch (err) {
    console.error('Fetch profile error:', err);
    res.status(500).json({ message: 'Internal server error fetching profile' });
  }
});

router.put('/', auth, async (req, res) => {
  try {
    const userId = req.user.id;
    const { name, college, degree, headline, bio, duration, skills, projects, goals, stats } = req.body;

    const users = await db.getUsers();
    const userIndex = users.findIndex(u => u.id === userId);
    if (userIndex === -1) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (name !== undefined) users[userIndex].name = name;
    if (college !== undefined) users[userIndex].college = college;
    if (degree !== undefined) users[userIndex].degree = degree;
    await db.saveUsers(users);

    const profiles = await db.getProfiles();
    let profileIndex = profiles.findIndex(p => p.userId === userId);
    if (profileIndex === -1) {
      const newProfile = {
        userId,
        headline: headline || '',
        bio: bio || '',
        duration: duration || '',
        skills: skills || { Frontend: [], Backend: [], Programming: [] },
        projects: projects || [],
        goals: goals || {},
        stats: stats || { matchRate: 85, applications: 0 }
      };
      profiles.push(newProfile);
      profileIndex = profiles.length - 1;
    } else {
      profiles[profileIndex] = {
        ...profiles[profileIndex],
        headline: headline !== undefined ? headline : profiles[profileIndex].headline,
        bio: bio !== undefined ? bio : profiles[profileIndex].bio,
        duration: duration !== undefined ? duration : profiles[profileIndex].duration,
        skills: skills !== undefined ? skills : profiles[profileIndex].skills,
        projects: projects !== undefined ? projects : profiles[profileIndex].projects,
        goals: goals !== undefined ? goals : profiles[profileIndex].goals,
        stats: stats !== undefined ? stats : profiles[profileIndex].stats
      };
    }
    await db.saveProfiles(profiles);

    const updatedCombined = {
      name: users[userIndex].name,
      email: users[userIndex].email,
      college: users[userIndex].college,
      degree: users[userIndex].degree,
      ...profiles[profileIndex]
    };

    res.json(updatedCombined);
  } catch (err) {
    console.error('Update profile error:', err);
    res.status(500).json({ message: 'Internal server error updating profile' });
  }
});

export default router;
