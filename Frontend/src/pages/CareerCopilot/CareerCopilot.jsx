import { MotionConfig, motion } from 'framer-motion'
import { Bot, MessageSquare, Sparkles, Map, Clock3, Check, Zap } from 'lucide-react'
import { Button, Card, Input, Sidebar } from '../../components'
import { Hero, ChatInterface, SuggestedPrompts, SkillGapAnalysis, WeeklyGoals, CareerRoadmap, InterviewReadiness, AIRecommendations } from './components'
import { useState, useEffect } from 'react'
import { getProfile, saveProfile, calculateProfileScore } from '../../utils/profileStorage'
import { useNavigate } from 'react-router-dom'
import api from '../../utils/api'


const reveal = { initial: { opacity: 0, y: 12 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, amount: 0.12 }, transition: { duration: 0.45 } }

export default function CareerCopilot() {
  const navigate = useNavigate()
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [profile, setProfile] = useState(() => getProfile())

  // Header Search Input
  const [headerSearch, setHeaderSearch] = useState('')

  // Sync profile storage updates
  useEffect(() => {
    const handleUpdate = () => setProfile(getProfile())
    window.addEventListener('profile_updated', handleUpdate)
    return () => window.removeEventListener('profile_updated', handleUpdate)
  }, [])

  // Weekly Goals State
  const [weeklyGoals, setWeeklyGoals] = useState(() => {
    const saved = localStorage.getItem('hirehub_weekly_goals')
    if (saved) return JSON.parse(saved)
    return [
      { id: 1, title: 'Apply to 3 internships', done: false },
      { id: 2, title: 'Add project README', done: true },
      { id: 3, title: 'Practice 5 interview questions', done: false }
    ]
  })

  // Career Roadmap State
  const [roadmapSteps, setRoadmapSteps] = useState(() => {
    const saved = localStorage.getItem('hirehub_career_roadmap')
    if (saved) return JSON.parse(saved)
    return [
      { id: 1, label: 'React Project', progress: 60, details: 'Build a production-ready application using React, Vite, Tailwind CSS, and state management.' },
      { id: 2, label: 'Testing Basics', progress: 20, details: 'Learn unit testing with Jest/Vitest and integration testing with React Testing Library.' },
      { id: 3, label: 'System Design', progress: 0, details: 'Understand system scalability, API design, caching strategies, and database architecture.' },
      { id: 4, label: 'Backend Integration', progress: 10, details: 'Connect with a Node.js/Express backend API and implement authentication/database.' }
    ]
  })

  // Interview Readiness State
  const [readinessTasks, setReadinessTasks] = useState(() => {
    const saved = localStorage.getItem('hirehub_interview_readiness')
    if (saved) return JSON.parse(saved)
    return [
      { id: 1, text: 'Prepare answers for common behavioral questions', checked: false },
      { id: 2, text: 'Practice whiteboard DSA problems weekly', checked: false },
      { id: 3, text: 'Record mock interviews and review performance', checked: false },
      { id: 4, text: 'Understand core system design concepts', checked: false }
    ]
  })

  // Chat Assistant State
  const [messages, setMessages] = useState([
    { id: 1, from: 'bot', text: `Hi ${profile.name || 'Abhi'} — I’m your Career Copilot. How can I help you accelerate your MERN stack developer career today?` }
  ])
  const [isTyping, setIsTyping] = useState(false)

  // Save states to localStorage
  useEffect(() => {
    localStorage.setItem('hirehub_weekly_goals', JSON.stringify(weeklyGoals))
  }, [weeklyGoals])

  useEffect(() => {
    localStorage.setItem('hirehub_career_roadmap', JSON.stringify(roadmapSteps))
  }, [roadmapSteps])

  useEffect(() => {
    localStorage.setItem('hirehub_interview_readiness', JSON.stringify(readinessTasks))
  }, [readinessTasks])

  // Handle Log Out
  const handleLogout = () => {
    localStorage.removeItem('hirehub_session')
    navigate('/')
  }

  // Handle sending chat message
  const handleSendMessage = (text) => {
    if (!text.trim()) return
    const userMsg = { id: Date.now(), from: 'user', text }
    setMessages((prev) => [...prev, userMsg])
    setIsTyping(true)

    const targetRole = profile.goals?.targetRole || 'Software Engineer'
    const name = profile.name || 'User'

    // Run mockup fallback
    const runMockupFallback = (query) => {
      const lower = query.toLowerCase()
      let reply = ''

      if (lower.includes('ai engineer') || lower.includes('ai engineering') || lower.includes('machine learning') || lower.includes('ml engineer')) {
        reply = `# Overview
AI Engineering involves designing, implementing, and deploying artificial intelligence models and applications to solve real-world problems.
- **What the role does**: Bridges the gap between ML models and production software.
- **Why it matters**: Automates decision-making and infuses intelligent capabilities into software systems.
- **Current market demand**: 10/10 (Highest growth tech sector).
- **Future scope**: Trillions of dollars of investment globally as GenAI and agentic workflows scale.

# Skills Required
- **Core Skills**: Python, SQL, Statistics, Probability, Linear Algebra.
- **ML/DL**: Machine Learning, Deep Learning, NLP, Computer Vision.
- **GenAI**: LLMs, Prompt Engineering, RAG, Vector Databases, AI Agents, LangChain, MCP.
- **MLOps**: Fine-Tuning, Deployment, MLOps pipelines, Cloud computing.

# Learning Roadmap

## Phase 1: Foundations
- Learn Python programming, SQL, and mathematical basics (Linear Algebra, statistics, calculus).

## Phase 2: Intermediate Skills
- Study Deep Learning architectures (Transformers, CNNs) using PyTorch.
- Master Prompt Engineering techniques (Few-shot, Chain-of-Thought).

## Phase 3: Advanced Skills
- Build Retrieval-Augmented Generation (RAG) pipelines integrating Vector Databases (Pinecone, ChromaDB).
- Develop autonomous AI Agents with LangChain or AutoGen.

## Phase 4: Real-World Applications
- Fine-tune models (LoRA, QLoRA) on custom datasets.
- Implement Model Context Protocol (MCP) to connect AI models with databases.

## Phase 5: Industry Readiness
- Learn MLOps pipelines (MLflow, Weights & Biases) for model deployment.
- Host models as microservices using FastAPI, Docker, and AWS.

# Recommended Projects

### Beginner
1. **House Price Predictor**: Scikit-Learn regression model.
2. **Text Classifier**: NLP model to categorize articles.
3. **Digit Classifier**: Simple CNN using PyTorch.

### Intermediate
1. **Intelligent Document Search (RAG)**: Scan PDFs and answer user questions.
2. **Personalized Recommendations Engine**: Collaborative filtering.
3. **Sentiment Analysis API**: Deployed NLP model via FastAPI.

### Advanced
1. **Autonomous Customer Support Agent**: Multi-agent system that executes database tasks via MCP.
2. **Fine-tuned Medical LLM**: Deployed domain-specific model.
3. **MLOps Deployment Pipeline**: Deployed automated retraining loop.

# Portfolio Requirements
- Hugging Face Spaces demonstrating working model demos.
- High-quality GitHub repositories showing model benchmarks and architecture diagrams.

# Hiring Strategy
- **Internships**: Target GenAI startups and AI research labs.
- **Job Strategy**: Highlight model deployment, fine-tuning, and RAG optimization capabilities.

# Salary Expectations
- **Stipend**: ₹25k - ₹60k/month.
- **Full-time Freshers**: ₹10 LPA - ₹22 LPA.

# Hiring Trends
- Growing focus on candidates capable of integrating LLMs with production systems over pure theoretical research.

# Timeline
- **Expected Duration**: 16 to 20 weeks (20+ hours/week).

# Next 30 Days Plan
- **Week 1**: Python data science libraries (NumPy, Pandas) and statistics basics.
- **Week 2**: Supervised machine learning algorithms (Scikit-Learn).
- **Week 3**: Introduction to PyTorch and neural networks.
- **Week 4**: Build first text classification model.`
      } else if (lower.includes('mern stack') || lower.includes('mern')) {
        reply = `# Overview
The MERN Stack consists of MongoDB, Express.js, React, and Node.js. It is one of the most popular and in-demand JavaScript stacks for building modern, full-stack web applications.
- **What the role does**: Develops dynamic frontends, designs robust RESTful or GraphQL APIs, models scalable databases, and deploys full-stack solutions.
- **Why it matters**: Power startup MVPs, interactive SaaS platforms, and enterprise administration dashboards.
- **Current market demand**: 9.5/10 (Highest job opening volume for web developers).
- **Future scope**: Transitioning towards Next.js server-side features, microfrontends, and serverless architectures.

# Skills Required
- **Frontend**: HTML5, CSS3, ES6+ JavaScript, React, Tailwind CSS, Redux Toolkit, Framer Motion.
- **Backend & Database**: Node.js, Express.js, MongoDB (Mongoose), REST APIs, JWT authentication.
- **Tools & Testing**: Git/GitHub, Postman, Vitest, React Testing Library.

# Learning Roadmap

## Phase 1: Frontend Foundations
- Master HTML layout semantics, responsive CSS Flexbox/Grid, and modern ES6+ Javascript (Async/Await, DOM manipulation).

## Phase 2: React Core & State
- Learn React functional components, hooks (useState, useEffect, useContext), routing with React Router, and state management (Redux/Zustand).

## Phase 3: Backend & Database
- Build REST APIs with Express.js, study MongoDB document modeling, Mongoose schemas, and secure authentication using JWT.

## Phase 4: Production Integration
- Connect React frontend to Node backend, handle state persistence, manage cookies/sessions, and write unit tests using Vitest.

## Phase 5: DevOps & Deployment
- Learn environment variables, deploy backend to Render/AWS, frontend to Vercel/Netlify, and manage Git CI/CD actions.

# Recommended Projects

### Beginner
1. **Interactive Portfolio**: Sleek React + Tailwind site with animations.
2. **Task Board (MERN)**: Simple Kanban board using MongoDB CRUD operations.
3. **Weather Dashboard**: React app calling public API with charts.

### Intermediate
1. **HIREHUB Platform**: Interactive internship & job board dashboard.
2. **E-Commerce Feed**: Dynamic product sorting, shopping cart, and local storage.
3. **Multi-user Collaborative Notes**: Web app with secure JWT login and real-time syncing.

### Advanced
1. **Real-time Chat Space**: Complete rooms and messaging system using WebSockets.
2. **SaaS Dashboard**: Stripe subscription payments, user workspaces, and metrics charts.
3. **AI Resume Scorer & Career Copilot**: Deep Gemini API integrations and profile evaluation.

# Portfolio Requirements
- Three fully deployed MERN applications with well-documented READMEs showing architecture diagrams.

# Open Source Strategy
- Contribute to popular open source React libraries (e.g. Radix UI, Lucide React) by fixing simple documentation or bug issues.

# Internship Strategy
- Build targeted mini-solutions for active startups and demo them via cold outreach on LinkedIn/Email.

# Interview Preparation
- **Topics**: Event loop, React fiber rendering, hooks optimization, database indexing, CORS, JWT, security headers.

# Salary Expectations
- **Stipend**: ₹15,000 - ₹40,000 / month.
- **Full-time Freshers**: ₹6.5 LPA - ₹14 LPA starting.

# Hiring Trends
- Growing interest in Next.js, full-stack TypeScript, and AI-augmented developer capabilities.

# Timeline
- **Expected Duration**: 12 to 14 weeks of focused learning.

# Next 30 Days Plan
- **Week 1**: Master CSS layout systems and advanced ES6+ JS features.
- **Week 2**: React components, hooks, routing, and styling.
- **Week 3**: Setup Node/Express backend endpoints and REST principles.
- **Week 4**: Connect MongoDB schemas, design database relationships, and add JWT auth.`
      } else if (lower.includes('roadmap') || lower.includes('career path') || lower.includes('how to become')) {
        reply = `# Overview
As a ${targetRole}, you will design, build, and deploy software systems.
- **What the role does**: Owns end-to-end features, database layers, and application architecture.
- **Why it matters**: Power the systems behind web, mobile, SaaS, and digital products.
- **Current market demand**: 9.5/10 (High hiring volume).
- **Future scope**: Rapid expansion as more industries digitize and adopt cloud systems.

# Skills Required
- **Core Skills**: HTML, CSS, JavaScript, React, Tailwind, Node.js, Express, MongoDB.
- **Tools & Frameworks**: Vite, Git, Postman, Next.js.

# Learning Roadmap

## Phase 1: Foundations
- HTML, CSS layouts, ES6+ Javascript syntax, DOM operations.

## Phase 2: Intermediate Skills
- React (Hooks, state management, routing, component lifecycles).
- RESTful APIs in Node.js and Express.

## Phase 3: Advanced Skills
- Relational vs NoSQL databases (MongoDB, PostgreSQL), schemas, and aggregation.
- Authentication (JWT, sessions, cookie storage).

## Phase 4: Real-World Applications
- Build 3 full-stack React + Node applications.
- Write unit/integration tests with Vitest.

## Phase 5: Industry Readiness
- DevOps basics, Docker, deployment to Vercel/Render, CI/CD.

# Recommended Projects

### Beginner
1. **Portfolio Site**: Responsive React + Tailwind site.
2. **Task Manager**: CRUD app with local storage.
3. **Weather Dashboard**: Public API integration.

### Intermediate
1. **Interactive Dashboard**: Metric visualizations and charts (like HIREHUB).
2. **E-commerce Product Feed**: Dynamic search, filtering, and local cart.
3. **Multi-Step Form**: Complete input validation and state management.

### Advanced
1. **HireHub AI Internship Discovery**: ATS score calculator, copilot, and smart filters.
2. **Real-time Chat App**: Collaborative rooms using WebSockets.
3. **SaaS Platform**: Stripe subscription engine and user workspaces.

# Portfolio Requirements
- 3 advanced deployed applications with highly detailed READMEs.
- Clean GitHub commit logs.

# Open Source Strategy
- Solve 'good first issue' labels on active React/Node libraries.

# Internship Strategy
- Build highly customized, niche demo apps targeting specific mid-sized startups.

# Interview Preparation
- **Topics**: Event loop, React fiber, hooks optimization, database indexing, CORS, JWT.

# Salary Expectations
- **Stipend**: ₹15k - ₹40k/month.
- **Full-time Freshers**: ₹6.5 LPA - ₹14 LPA starting.

# Hiring Trends
- Employers prioritize candidates with strong portfolios showing production capabilities over degree certificates.

# Timeline
- **Expected Duration**: 10 to 12 weeks of focused study.

# Next 30 Days Plan
- **Week 1**: CSS layout systems, responsive design, modern ES6+ JS.
- **Week 2**: React components, hooks, state, routing.
- **Week 3**: Setup Node/Express backend endpoints.
- **Week 4**: Connect databases, design MongoDB schemas, JWT auth.`
      } else if (lower.includes('startup') || lower.includes('mvp') || lower.includes('founder') || lower.includes('monetization')) {
        reply = `# Idea Validation
- **Problem**: Identify a frequent, painful problem (e.g. students wasting hours manually customizing resumes for different applications).
- **Target Users**: College students, freshers, active job hunters.
- **Existing Competitors**: General builders, which lack specialized ATS scoring, AI roadmaps, and internship discoveries.

# Market Analysis
- **TAM**: Millions of tech graduates and students preparing for placements.
- **Demand**: High; career tools are recession-proof as jobs get more competitive.
- **Trends**: High adoption of GenAI tools and personalized AI learning coaches.

# MVP Plan
- **Features**: ATS resume scorer, 3 roadmap templates, and simple career chat copilot.
- **Timeline**: 4 weeks to deploy.
- **Tech Stack**: React, Tailwind, Node/Express, MongoDB, Gemini/OpenAI API.

# Build Roadmap
- **Week 1**: Core design, mockups, and database schemas.
- **Week 2**: Deployed user authorization and profile features.
- **Week 3**: Deployed AI integrations for resume suggestions and chat.
- **Week 4**: Deployed beta testing, bug resolutions, and Vercel launch.

# Monetization
- **Pricing**: Freemium. Free basic profile; ₹299/month for unlimited advanced ATS scans.
- **Revenue Models**: B2C subscriptions and university dashboard licensing.

# Marketing
- **Launch Strategy**: Launch on Product Hunt, HackerNews, and student discord/slack communities.
- **Growth Channels**: Campus ambassadors, university partnerships, and organic LinkedIn content.

# Risks
- **Key Challenges**: High API resource costs, retention, and competing with large recruitment portals.

# Next Steps
1. Create a waiting list landing page.
2. Conduct user interviews with 15 college students.
3. Build the core MVP layout and deploy.`
      } else if (lower.includes('demanding job') || lower.includes('hot job') || lower.includes('top field') || lower.includes('market trend') || lower.includes('trend') || lower.includes('in-demand') || lower.includes('career option') || lower.includes('jobs in demand') || lower.includes('what should i learn') || lower.includes('future-proof')) {
        reply = `### Job Market Analysis (Current Tech Trends)

Here is a ranking of the top technical fields based on current market demand, salary potential, and AI resilience:

| Role | Demand Score | Difficulty Score | Salary Potential | Competition Level | Remote Ops | AI Impact Risk | Growth Potential |
| :--- | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| **1. AI/ML Engineer** | 10/10 | 8/10 | 10/10 | Medium | High | Very Low | Excellent |
| **2. DevOps/Cloud Engineer** | 9.5/10 | 7.5/10 | 9/10 | Low | High | Low | Excellent |
| **3. Full-Stack Developer** | 9/10 | 7/10 | 8.5/10 | High | Very High | Medium | Very Good |
| **4. Data Engineer** | 8.5/10 | 7.5/10 | 9/10 | Medium | High | Low | Very Good |

### Ranked Recommendations
1. **AI/ML Engineer**: Strongest demand. Requires stats, math, and model deployment skills. Highly future-proof.
2. **DevOps & Cloud**: Massive shortage of talent. Critical for hosting systems and ensuring zero downtime.
3. **Full-Stack MERN Developer**: Highest volume of job openings. Highly versatile for startups and product companies.`
      } else if (lower.includes('resume') || lower.includes('cv') || lower.includes('portfolio')) {
        reply = `### Personalized Resume Optimization

Based on your current profile as an aspiring **${targetRole}** (${eduInfo}):

1. **Highlight Project Impact**:
   - For **'${profile.projects?.[0]?.name || 'HireHub'}'**, don't just list the stack. Use action verbs: *'Engineered HireHub, an AI-guided discovery platform, improving match rate to ${profile.stats?.matchRate || 87}%.'*
2. **Use Action Verbs**:
   - Start bullet points with words like 'Designed', 'Engineered', 'Optimized', 'Deployed'.
3. **Address Skill Gaps**:
   - Our analysis shows missing skills: **${currentMissing.slice(0, 3).join(', ') || 'Node.js, Testing'}**. Add them as keywords in your skills section as soon as you complete the learning steps.
4. **Quantify Achievements**:
   - Add metrics where possible. e.g. *'Reduced API response latency by 20% by implementing Redis cache.'*`
      } else if (lower.includes('salary') || lower.includes('stipend') || lower.includes('package') || lower.includes('how much')) {
        reply = `### Salary & Compensation Benchmarks (India & Remote)

Here are realistic ranges for freshers and junior roles in modern tech fields:

| Field | Intern Stipend (Monthly) | Fresher Package (LPA) | Remote Rate (Hourly) |
| :--- | :---: | :---: | :---: |
| **AI/ML Engineering** | ₹25,000 - ₹60,000 | ₹10 - ₹22 LPA | $25 - $60 / hr |
| **DevOps / Cloud** | ₹20,000 - ₹50,000 | ₹8 - ₹16 LPA | $20 - $50 / hr |
| **Full Stack Development** | ₹15,000 - ₹40,000 | ₹6.5 - ₹14 LPA | $20 - $45 / hr |
| **Frontend/Backend Dev** | ₹12,000 - ₹30,000 | ₹5 - ₹10 LPA | $15 - $35 / hr |`
      } else if (lower.includes('skill') || lower.includes('tech stack') || lower.includes('what tool')) {
        reply = `### Personalized Tech Stack Review

For your goal of becoming a **${targetRole}**:

- **Your Current Stack**:
  - Frontend: ${(profile.skills?.Frontend || []).join(', ') || 'React'}
  - Backend: ${(profile.skills?.Backend || []).join(', ') || 'Node.js'}
  - Programming: ${(profile.skills?.Programming || []).join(', ') || 'DSA'}
  
- **Missing Skills to Target**:
  - ${currentMissing.join(', ')}
  
*I highly recommend focusing on learning **${currentMissing[0] || 'Node.js'}** first to fill a critical gap.*`
      } else if (lower.includes('interview') || lower.includes('30-day') || lower.includes('prep') || lower.includes('plan')) {
        reply = `Here is a custom 30-day preparation roadmap:\n\n* **Days 1-10 (JavaScript & React)**: Re-visit closures, prototypes, event loop, custom hooks, and state management.\n* **Days 11-18 (Backend)**: Build mock endpoints using Node/Express and database models.\n* **Days 19-25 (DSA)**: Re-prepare arrays, trees, hash maps, and sliding window techniques.\n* **Days 26-30 (Mock & STAR)**: Practice behavioral questions using the STAR framework.`
      } else if (lower.includes('project') || lower.includes('production')) {
        reply = `To show production-level experience:\n\n1. **Use API integration**: Build full stack functionality instead of simple UI templates.\n2. **Security**: Add JWT tokens, bcrypt password hashing, and authorization guards.\n3. **Testing**: Write unit tests for your hooks and handlers using Jest or Vitest.`
      } else if (lower.includes('learn') || lower.includes('how to')) {
        const match = text.match(/(?:learn|how to learn)\s+([a-zA-Z\.\s#\-\+]+)/i)
        const skill = match ? match[1].trim() : 'new skills'
        reply = `To learn **${skill}** effectively:\n\n1. **Official Docs**: Follow the official tutorial for the solid fundamentals.\n2. **Mini Project**: Build a small project utilizing ${skill} (e.g. if testing, write tests for a utility helper).\n3. **Integrate**: Add this skill to your current project '${profile.projects?.[0]?.name || 'HireHub'}'.`
      } else {
        reply = `Hello ${name}! I'm your AI career advisor. Based on your goals to become a ${targetRole}, I recommend learning your missing skills (like Testing or Backend) and checking off your readiness checklist. How can I help you today?`
      }

      setMessages((prev) => [...prev, { id: Date.now() + 1, from: 'bot', text: reply }])
    }

    api.post('/copilot/chat', { messages, text })
      .then(res => {
        setIsTyping(false)
        const replyText = res.data?.reply || "Sorry, I couldn't generate a response."
        setMessages((prev) => [...prev, { id: Date.now() + 1, from: 'bot', text: replyText }])
      })
      .catch(err => {
        console.error("Copilot chat request failed:", err)
        setTimeout(() => {
          runMockupFallback(text)
        }, 600)
      })
  }

  // Handle header search
  const triggerHeaderSearch = () => {
    if (!headerSearch.trim()) return
    handleSendMessage(headerSearch)
    setHeaderSearch('')
    document.getElementById('copilot-chat')?.scrollIntoView({ behavior: 'smooth' })
  }

  // Compute skill gap dynamically
  const getMissingSkills = () => {
    const targetSkills = ['React', 'Node.js', 'Express', 'MongoDB', 'Testing', 'System Design', 'Git', 'TypeScript', 'Tailwind', 'Redux']
    const currentSkills = []
    if (profile.skills) {
      Object.values(profile.skills).forEach(skillsArray => {
        if (Array.isArray(skillsArray)) {
          skillsArray.forEach(s => currentSkills.push(s.toLowerCase()))
        }
      })
    }
    return targetSkills.filter(s => !currentSkills.includes(s.toLowerCase()))
  }

  const missingSkills = getMissingSkills()

  // Handle actions from Skill Gap badge menu
  const handleActionSkill = (skill, actionType) => {
    if (actionType === 'learn') {
      handleSendMessage(`How do I learn ${skill}?`)
      document.getElementById('copilot-chat')?.scrollIntoView({ behavior: 'smooth' })
    } else if (actionType === 'add') {
      const newProfile = { ...profile }
      if (!newProfile.skills) {
        newProfile.skills = { Frontend: [], Backend: [], Programming: [] }
      } else {
        newProfile.skills = {
          Frontend: [...(newProfile.skills.Frontend || [])],
          Backend: [...(newProfile.skills.Backend || [])],
          Programming: [...(newProfile.skills.Programming || [])]
        }
      }

      const skillLower = skill.toLowerCase()
      if (['react', 'tailwind', 'redux', 'html', 'css', 'javascript'].includes(skillLower)) {
        if (!newProfile.skills.Frontend.includes(skill)) newProfile.skills.Frontend.push(skill)
      } else if (['node.js', 'express', 'mongodb'].includes(skillLower)) {
        if (!newProfile.skills.Backend.includes(skill)) newProfile.skills.Backend.push(skill)
      } else {
        if (!newProfile.skills.Programming.includes(skill)) newProfile.skills.Programming.push(skill)
      }

      saveProfile(newProfile)

      setIsTyping(true)
      setTimeout(() => {
        setIsTyping(false)
        setMessages(prev => [...prev, {
          id: Date.now(),
          from: 'bot',
          text: `Awesome! I've added **${skill}** to your user profile. This will increase your internship match score!`
        }])
      }, 800)
    }
  }

  // Calculate dynamic recommendations
  const getRecommendations = () => {
    const recs = []
    const profileScore = calculateProfileScore(profile)

    if (profileScore < 90) {
      recs.push({
        type: 'Profile',
        text: `Complete your profile sections to reach 100% completion. Current: ${profileScore}%`,
        actionLabel: 'Go to Profile Page',
        action: 'profile'
      })
    }

    if (missingSkills.length > 0) {
      const nextSkill = missingSkills[0]
      recs.push({
        type: 'Skills',
        text: `Learn ${nextSkill} to fill a key gap for Software Engineer roles.`,
        actionLabel: `Add ${nextSkill} to skills`,
        action: 'add_skill',
        payload: nextSkill
      })
    }

    const readinessScore = readinessTasks.length > 0
      ? Math.round((readinessTasks.filter(t => t.checked).length / readinessTasks.length) * 100)
      : 0
    if (readinessScore < 100) {
      recs.push({
        type: 'Preparation',
        text: 'Complete all interview preparation checklist milestones.',
        actionLabel: 'Review readiness tracker',
        action: 'readiness'
      })
    }

    const pendingGoals = weeklyGoals.filter(g => !g.done)
    if (pendingGoals.length > 0) {
      recs.push({
        type: 'Goals',
        text: `Finish your goal: "${pendingGoals[0].title}"`,
        actionLabel: 'Mark goal as complete',
        action: 'complete_goal',
        payload: pendingGoals[0].id
      })
    }

    return recs.slice(0, 3)
  }

  const recommendations = getRecommendations()

  // Handle recommendation action trigger
  const handleExecuteRecommendation = (rec) => {
    if (rec.action === 'profile') {
      navigate('/profile')
    } else if (rec.action === 'add_skill') {
      handleActionSkill(rec.payload, 'add')
    } else if (rec.action === 'readiness') {
      document.getElementById('copilot-readiness')?.scrollIntoView({ behavior: 'smooth' })
    } else if (rec.action === 'complete_goal') {
      setWeeklyGoals(prev => prev.map(g => g.id === rec.payload ? { ...g, done: true } : g))
    }
  }

  // Get next milestone for snapshot
  const getNextMilestone = () => {
    const pendingGoals = weeklyGoals.filter(g => !g.done)
    if (pendingGoals.length > 0) {
      return pendingGoals[0].title
    }
    if (missingSkills.length > 0) {
      return `Learn ${missingSkills[0]}`
    }
    const readinessPending = readinessTasks.filter(t => !t.checked)
    if (readinessPending.length > 0) {
      return readinessPending[0].text
    }
    return 'Celebrate success!'
  }

  const nextMilestone = getNextMilestone()
  const profileCompleteness = calculateProfileScore(profile)

  return (
    <MotionConfig reducedMotion="user">
      <div className="flex h-screen overflow-hidden bg-[#0F172A] text-slate-50">
        <Sidebar collapsed={sidebarCollapsed} onCollapsedChange={setSidebarCollapsed} user={{ name: profile.name, email: profile.headline }} onLogout={handleLogout} className="bg-[#0B1120]/95" />

        <main className="h-screen min-w-0 flex-1 overflow-y-auto">
          <header className="sticky top-0 z-30 border-b border-white/[0.07] bg-[#0F172A]/85 backdrop-blur-xl">
            <div className="mx-auto flex h-20 max-w-[1600px] items-center justify-between gap-4 px-4 pl-18 sm:px-6 sm:pl-20 md:px-8 md:pl-8 xl:px-10">
              <div className="shrink-0">
                <h1 className="text-lg font-semibold text-white">
                  Career Copilot
                </h1>
                <p className="mt-0.5 text-xs text-slate-500">
                  Personalized, action-oriented guidance
                </p>
              </div>

              <div className="hidden md:block w-[420px]">
                <Input
                  aria-label="Search copilot"
                  placeholder="Ask career copilot..."
                  leftIcon={MessageSquare}
                  className="h-11 bg-[#111827]/70 text-sm"
                  value={headerSearch}
                  onChange={(e) => setHeaderSearch(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      triggerHeaderSearch()
                    }
                  }}
                />
              </div>
            </div>
          </header>

          <div className="relative mx-auto max-w-[1600px] px-4 py-8 sm:px-6 md:px-8 lg:py-10 xl:px-10">
            <motion.section {...reveal} className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
              <div className="space-y-6">
                <Hero
                  profileScore={profileCompleteness}
                  nextMilestone={nextMilestone}
                  onAskCopilotClick={() => document.getElementById('copilot-chat')?.scrollIntoView({ behavior: 'smooth' })}
                  onViewRoadmapClick={() => document.getElementById('copilot-roadmap')?.scrollIntoView({ behavior: 'smooth' })}
                />
                <ChatInterface
                  messages={messages}
                  onSendMessage={handleSendMessage}
                  isTyping={isTyping}
                />
                <SuggestedPrompts
                  onClickPrompt={(prompt) => {
                    handleSendMessage(prompt)
                    document.getElementById('copilot-chat')?.scrollIntoView({ behavior: 'smooth' })
                  }}
                />
                <SkillGapAnalysis
                  missing={missingSkills}
                  onActionSkill={handleActionSkill}
                />
                <InterviewReadiness
                  tasks={readinessTasks}
                  onToggleTask={(id) => setReadinessTasks(prev => prev.map(t => t.id === id ? { ...t, checked: !t.checked } : t))}
                />
              </div>

              <aside className="space-y-6">
                <WeeklyGoals
                  goals={weeklyGoals}
                  onToggleGoal={(id) => setWeeklyGoals(prev => prev.map(g => g.id === id ? { ...g, done: !g.done } : g))}
                  onAddGoal={(title) => setWeeklyGoals(prev => [...prev, { id: Date.now(), title, done: false }])}
                  onDeleteGoal={(id) => setWeeklyGoals(prev => prev.filter(g => g.id !== id))}
                />
                <CareerRoadmap
                  steps={roadmapSteps}
                  onUpdateProgress={(id, progress) => setRoadmapSteps(prev => prev.map(s => s.id === id ? { ...s, progress } : s))}
                />
                <AIRecommendations
                  recommendations={recommendations}
                  onExecuteRecommendation={handleExecuteRecommendation}
                />
              </aside>
            </motion.section>
          </div>
        </main>
      </div>
    </MotionConfig>
  )
}

