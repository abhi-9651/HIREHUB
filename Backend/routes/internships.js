import express from 'express';
import { db } from '../utils/db.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const internships = await db.getInternships();
    res.json(internships);
  } catch (err) {
    console.error('Fetch internships error:', err);
    res.status(500).json({ message: 'Internal server error fetching internships' });
  }
});

router.get('/match', auth, async (req, res) => {
  try {
    const userId = req.user.id;
    const profiles = await db.getProfiles();
    let profile = profiles.find(p => p.userId === userId);
    if (!profile) {
      if (userId === 'default_user') {
        profile = {
          userId,
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
        profiles.push(profile);
        await db.saveProfiles(profiles);
      } else {
        return res.status(404).json({ message: 'Profile not found' });
      }
    }

    const internships = await db.getInternships();

    const userSkills = new Set(
      [
        ...(profile.skills?.Frontend || []),
        ...(profile.skills?.Backend || []),
        ...(profile.skills?.Programming || [])
      ].map(s => s.toLowerCase().replace(/[\.\s-]/g, ''))
    );

    const matchedInternships = internships.map(internship => {
      const required = internship.skills || [];
      if (required.length === 0) {
        return { ...internship, match: 100 };
      }

      const matches = required.filter(skill => {
        const normalizedSkill = skill.toLowerCase().replace(/[\.\s-]/g, '');
        return Array.from(userSkills).some(us => us.includes(normalizedSkill) || normalizedSkill.includes(us));
      });

      const ratio = matches.length / required.length;
      const matchPercentage = Math.round(60 + ratio * 38);

      return {
        ...internship,
        match: matchPercentage
      };
    });

    matchedInternships.sort((a, b) => b.match - a.match);

    res.json(matchedInternships);
  } catch (err) {
    console.error('Match internships error:', err);
    res.status(500).json({ message: 'Internal server error matching internships' });
  }
});

export default router;
