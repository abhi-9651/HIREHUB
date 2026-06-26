import express from 'express';
import auth from '../middleware/auth.js';
import { db } from '../utils/db.js';

const router = express.Router();

router.post('/chat', auth, async (req, res) => {
  try {
    const userId = req.user.id;
    const { messages, text } = req.body;

    if (!text || !text.trim()) {
      return res.status(400).json({ message: 'Message text is required' });
    }

    const users = await db.getUsers();
    const user = users.find(u => u.id === userId);
    const profiles = await db.getProfiles();
    const profile = profiles.find(p => p.userId === userId);

    const name = user ? user.name : 'User';
    const eduInfo = user ? `${user.degree || 'B.Tech CSE'} from ${user.college || 'College'}` : 'B.Tech CSE from College';
    const targetRole = profile?.goals?.targetRole || 'Software Engineer';
    const currentSkills = profile ? [
      ...(profile.skills?.Frontend || []),
      ...(profile.skills?.Backend || []),
      ...(profile.skills?.Programming || [])
    ].join(', ') : 'React, Node.js';

    const targetSkills = ['React', 'Node.js', 'Express', 'MongoDB', 'Testing', 'System Design', 'Git', 'TypeScript', 'Tailwind', 'Redux'];
    const userSkillsLower = new Set(
      [
        ...(profile?.skills?.Frontend || []),
        ...(profile?.skills?.Backend || []),
        ...(profile?.skills?.Programming || [])
      ].map(s => s.toLowerCase().trim())
    );
    const missingSkills = targetSkills.filter(s => !userSkillsLower.has(s.toLowerCase()));

    const systemInstructionText = `You are Career Copilot, an elite AI Career Mentor, Tech Industry Analyst, Startup Advisor, and Learning Coach.
Your goal is to help users make better career decisions, learn in-demand skills, build projects, get internships/jobs, launch startups, and stay ahead of technology trends.
You provide highly practical, actionable, and personalized guidance rather than generic advice.

━━━━━━━━━━━━━━━━━━━━━━
USER PROFILE CONTEXT (Personalize responses based on this)
━━━━━━━━━━━━━━━━━━━━━━
- Name: ${name}
- Education: ${eduInfo}
- Current Skills: ${currentSkills || 'None'}
- Missing Skills (Identified Gaps): ${missingSkills.join(', ')}
- Goal: Target Role: ${targetRole}, Domain: ${profile?.goals?.preferredDomain || 'Full Stack'}
- Profile Completeness: ${profile?.stats?.matchRate || 85}%

━━━━━━━━━━━━━━━━━━━━━━
YOUR RESPONSIBILITIES
━━━━━━━━━━━━━━━━━━━━━━
When users ask about careers, roadmaps, startups, jobs, technologies, skills, salaries, market demand, learning paths, projects, or future opportunities:
1. Explain concepts clearly.
2. Provide structured roadmaps.
3. Break goals into actionable steps.
4. Recommend projects.
5. Suggest learning resources.
6. Explain market demand.
7. Highlight future trends.
8. Estimate realistic timelines.
9. Suggest portfolio improvements.
10. Create personalized plans whenever possible.

━━━━━━━━━━━━━━━━━━━━━━
RESPONSE FORMATS
━━━━━━━━━━━━━━━━━━━━━━
Follow these format structures exactly based on query types:

[ROADMAP RESPONSE FORMAT] (When user asks for roadmap or career path)
# Overview
• What the role does, why it matters, market demand, future scope
# Skills Required
• Core skills, tools, frameworks, technologies
# Learning Roadmap
## Phase 1: Foundations (Topics)
## Phase 2: Intermediate Skills (Topics)
## Phase 3: Advanced Skills (Topics)
## Phase 4: Real-World Applications (Topics)
## Phase 5: Industry Readiness (Topics)
# Recommended Projects
### Beginner (3 projects)
### Intermediate (3 projects)
### Advanced (3 projects)
# Portfolio Requirements
# Common Mistakes
# Interview Preparation
# Timeline
# Next 30 Days Plan (Week-by-week action plan)

[AI ENGINEER ROADMAP FORMAT] (When user asks about AI Engineering: include Python, ML, DL, NLP, CV, LLMs, Prompt Engineering, RAG, Vector DBs, AI Agents, LangChain, MCP, Fine-Tuning, MLOps, deployment, cloud, salary and hiring trends)

[MERN STACK DEVELOPER ROADMAP FORMAT] (When user asks about MERN stack: include MongoDB, Express, React, Node.js, frontend, backend, tools, database, testing, projects, salary, hiring trends, and next 30 days plan)

━━━━━━━━━━━━━━━━━━━━━━
COMMUNICATION STYLE
━━━━━━━━━━━━━━━━━━━━━━
- Be practical and realistic. Prioritize execution.
- Use markdown tables where helpful.
- Explain jargon simply and give step-by-step guidance.
- Think like a mentor, recruiter, hiring manager, startup founder, and tech expert simultaneously.`;

    const groqKey = process.env.GROQ_API_KEY;
    const geminiKey = process.env.GEMINI_API_KEY;

    if (groqKey && groqKey !== 'your_groq_api_key_here' && groqKey.trim() !== '') {
      const groqMessages = [
        { role: 'system', content: systemInstructionText },
        ...messages.map(msg => ({
          role: msg.from === 'bot' ? 'assistant' : 'user',
          content: msg.text
        })),
        { role: 'user', content: text }
      ];

      const apiRes = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${groqKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          model: 'llama-3.3-70b-versatile',
          messages: groqMessages,
          temperature: 0.7
        })
      });

      if (apiRes.ok) {
        const data = await apiRes.json();
        const reply = data.choices?.[0]?.message?.content || "Sorry, I couldn't generate a response.";
        return res.json({ reply });
      } else {
        console.error(`Groq API returned error status: ${apiRes.status}`);
      }
    }

    if (geminiKey && geminiKey !== 'your_gemini_api_key_here' && geminiKey.trim() !== '') {
      const contents = messages.map(msg => ({
        role: msg.from === 'bot' ? 'model' : 'user',
        parts: [{ text: msg.text }]
      }));
      contents.push({
        role: 'user',
        parts: [{ text }]
      });

      const apiRes = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${geminiKey}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          systemInstruction: {
            parts: [{ text: systemInstructionText }]
          },
          contents
        })
      });

      if (apiRes.ok) {
        const data = await apiRes.json();
        const reply = data.candidates?.[0]?.content?.parts?.[0]?.text || "Sorry, I couldn't generate a response.";
        return res.json({ reply });
      } else {
        console.error(`Gemini API returned error status: ${apiRes.status}`);
      }
    }

    const lower = text.toLowerCase();
    let reply = '';
    if (lower.includes('ai engineer') || lower.includes('machine learning') || lower.includes('ml engineer')) {
      reply = `# Overview\nAI Engineering involves designing, implementing, and deploying artificial intelligence models.\n\n# Skills Required\n- Python, SQL, Statistics\n- Machine Learning, Deep Learning, LLMs, RAG\n\n# Recommended Projects\n1. Simple CNN\n2. RAG Document Search\n3. Autonomous Agent via MCP\n\n# Salary Expectations\n- Stipend: ₹25k - ₹60k/month\n- Freshers: ₹10 LPA - ₹22 LPA`;
    } else if (lower.includes('mern') || lower.includes('react') || lower.includes('express')) {
      reply = `# Overview\nThe MERN stack (MongoDB, Express, React, Node.js) is excellent for full-stack JavaScript developers.\n\n# Skills Required\n- React, Redux, Tailwind CSS\n- Node.js, Express, MongoDB/File DB, REST APIs, JWT Auth\n\n# Next 30 Days Plan\n- Week 1: Advanced JS & React Hooks\n- Week 2: Build Node/Express APIs and setup JWT Auth\n- Week 3: Integrate database-less storage & sync frontend\n- Week 4: Deploy and write test cases`;
    } else {
      reply = `Hello ${name}! I'm your AI career advisor. Based on your goals to become a ${targetRole}, I recommend learning your missing skills (like ${missingSkills.slice(0, 3).join(', ') || 'Testing or System Design'}) and updating your projects. How can I help you today?`;
    }

    res.json({ reply });

  } catch (err) {
    console.error('Copilot chat error:', err);
    res.status(500).json({ message: 'Internal server error in Career Copilot' });
  }
});

export default router;
