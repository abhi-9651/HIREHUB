import express from 'express';
import { db } from '../utils/db.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.get('/', auth, async (req, res) => {
  try {
    const userId = req.user.id;
    const resumes = await db.getResumes();
    const resume = resumes.find(r => r.userId === userId);

    if (resume) {
      return res.json(resume.data);
    }

    const users = await db.getUsers();
    const user = users.find(u => u.id === userId);
    const profiles = await db.getProfiles();
    const profile = profiles.find(p => p.userId === userId);

    const flatSkills = profile ? Object.values(profile.skills || {}).flat().join(', ') : '';
    const flatProjects = profile ? (profile.projects || [])
      .map(p => `${p.name} — ${p.desc}`)
      .join('\n') : '';

    const defaultResume = {
      fullName: user?.name || 'Abhi Sharma',
      email: user?.email || 'abhi@example.com',
      phone: '+91 98765 43210',
      education: user ? `${user.degree || 'B.Tech CS'}, ${profile?.duration || '2024-2028'}\n${user.college || 'College'}` : '',
      skills: flatSkills || 'React, TypeScript, Tailwind CSS, Node.js',
      projects: flatProjects || 'HireHub — built an AI-powered platform',
      experience: 'Frontend Intern at Nova Labs — shipped responsive product flows and improved conversion by 18%',
      achievements: 'AWS Cloud Practitioner\nBuilt 8+ UI projects'
    };

    res.json(defaultResume);
  } catch (err) {
    console.error('Fetch resume error:', err);
    res.status(500).json({ message: 'Internal server error fetching resume' });
  }
});

router.post('/', auth, async (req, res) => {
  try {
    const userId = req.user.id;
    const resumeData = req.body;

    const resumes = await db.getResumes();
    const index = resumes.findIndex(r => r.userId === userId);

    if (index > -1) {
      resumes[index].data = resumeData;
      resumes[index].updatedAt = new Date().toISOString();
    } else {
      resumes.push({
        userId,
        data: resumeData,
        updatedAt: new Date().toISOString()
      });
    }

    await db.saveResumes(resumes);
    res.json({ message: 'Resume draft saved successfully' });
  } catch (err) {
    console.error('Save resume error:', err);
    res.status(500).json({ message: 'Internal server error saving resume' });
  }
});

router.post('/score', auth, async (req, res) => {
  try {
    const { fullName, email, phone, education, skills, projects, experience, achievements } = req.body;

    let resumeScore = 40;
    let atsCompatibility = 45;
    let skillRelevance = 50;

    if (fullName && fullName.trim()) { resumeScore += 5; atsCompatibility += 5; }
    if (email && email.trim()) { resumeScore += 5; atsCompatibility += 5; }
    if (phone && phone.trim()) { resumeScore += 5; atsCompatibility += 5; }
    if (education && education.trim().length > 15) { resumeScore += 10; atsCompatibility += 10; }
    if (skills && skills.trim().length > 15) { resumeScore += 15; atsCompatibility += 10; skillRelevance += 20; }
    if (projects && projects.trim().length > 25) { resumeScore += 10; atsCompatibility += 10; skillRelevance += 10; }
    if (experience && experience.trim().length > 25) { resumeScore += 10; atsCompatibility += 10; skillRelevance += 10; }
    if (achievements && achievements.trim().length > 15) { resumeScore += 5; atsCompatibility += 5; }

    resumeScore = Math.min(resumeScore, 99);
    atsCompatibility = Math.min(atsCompatibility, 99);
    skillRelevance = Math.min(skillRelevance, 99);

    res.json({
      scores: [
        { label: 'Resume Score', value: `${resumeScore}%`, change: '+6%', type: 'resume' },
        { label: 'ATS Compatibility', value: `${atsCompatibility}%`, change: '+8%', type: 'ats' },
        { label: 'Skill Relevance', value: `${skillRelevance}%`, change: '+5%', type: 'skill' }
      ],
      suggestions: [
        { id: 1, type: 'warning', text: skills && skills.length > 50 ? 'Skills section looks robust.' : 'Add more backend skills (e.g. Node.js, Express, databases) to match current industry standard.' },
        { id: 2, type: 'info', text: experience && experience.length > 50 ? 'Strong experience description.' : 'Quantify your impact in the experience section (e.g., "improved conversion by 18%").' },
        { id: 3, type: 'success', text: 'ATS formatting is clean: clear headings and single-column layout.' }
      ]
    });
  } catch (err) {
    console.error('Score resume error:', err);
    res.status(500).json({ message: 'Internal server error scoring resume' });
  }
});

export default router;
