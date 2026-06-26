import { useMemo, useState, useEffect } from 'react'
import { MotionConfig, motion } from 'framer-motion'
import { Bot, FileText, LayoutDashboard, Sparkles, Target, UserRound } from 'lucide-react'
import { Button, Card, SectionTitle, Sidebar } from '../../components'
import { ResumeBuilderForm, ResumePreview } from './components'
import { getProfile } from '../../utils/profileStorage'
import { useNavigate } from 'react-router-dom'
import { getPrintResumeHtml } from './utils/printTemplate'

const sidebarItems = [
  { label: 'Dashboard', to: '/dashboard', icon: LayoutDashboard },
  { label: 'Smart Match', to: '/internships', icon: Target },
  { label: 'Resume Studio', to: '/resume-studio', icon: FileText, end: true },
  { label: 'Career Copilot', to: '/career-copilot', icon: Bot },
  { label: 'Profile', to: '/profile', icon: UserRound },
]

const reveal = {
  initial: { opacity: 0, y: 18 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.14 },
  transition: { duration: 0.45, ease: 'easeOut' },
}

function ResumeStudio() {
  const navigate = useNavigate()
  const [profile, setProfile] = useState(() => getProfile())
  const [toast, setToast] = useState(null)
  const [generating, setGenerating] = useState(false)
  const [generationStep, setGenerationStep] = useState(0)

  const showNotification = (message, type = 'success') => {
    setToast({ message, type })
    setTimeout(() => setToast(null), 3000)
  }

  useEffect(() => {
    const handleUpdate = () => setProfile(getProfile())
    window.addEventListener('profile_updated', handleUpdate)
    return () => window.removeEventListener('profile_updated', handleUpdate)
  }, [])

  const [resume, setResume] = useState(() => {
    const savedDraft = localStorage.getItem('hirehub_resume_draft')
    if (savedDraft) {
      try {
        return JSON.parse(savedDraft)
      } catch (e) {
        console.error('Error parsing draft', e)
      }
    }

    const flatSkills = Object.values(profile.skills || {}).flat().join(', ')
    const flatProjects = (profile.projects || [])
      .map(p => `${p.name} — ${p.desc}`)
      .join('\n')
    
    return {
      fullName: profile.name || 'Abhi Sharma',
      email: 'abhi@example.com',
      phone: '+91 98765 43210',
      education: `${profile.degree || 'B.Tech CS'}, ${profile.duration || '2024-2028'}\n${profile.college || 'NIT Jaipur'}`,
      skills: flatSkills || 'React, TypeScript, Tailwind CSS, Node.js',
      projects: flatProjects || 'HireHub — built an AI-powered platform',
      experience: 'Frontend Intern at Nova Labs — shipped responsive product flows',
      achievements: 'AWS Cloud Practitioner\nBuilt 8+ UI projects',
    }
  })

  // Watch for profile updates to keep resume fields in sync if profile changes
  useEffect(() => {
    const savedDraft = localStorage.getItem('hirehub_resume_draft')
    if (savedDraft) return

    const flatSkills = Object.values(profile.skills || {}).flat().join(', ')
    const flatProjects = (profile.projects || [])
      .map(p => `${p.name} — ${p.desc}`)
      .join('\n')

    setResume({
      fullName: profile.name || 'Abhi Sharma',
      email: 'abhi@example.com',
      phone: '+91 98765 43210',
      education: `${profile.degree || 'B.Tech CS'}, ${profile.duration || '2024-2028'}\n${profile.college || 'NIT Jaipur'}`,
      skills: flatSkills || 'React, TypeScript, Tailwind CSS, Node.js',
      projects: flatProjects || 'HireHub — built an AI-powered platform',
      experience: 'Frontend Intern at Nova Labs — shipped responsive product flows',
      achievements: 'AWS Cloud Practitioner\nBuilt 8+ UI projects',
    })
  }, [profile])

  const preview = useMemo(() => resume, [resume])

  const updateField = (field, value) => {
    setResume((current) => ({ ...current, [field]: value }))
  }

  const onSaveDraft = () => {
    localStorage.setItem('hirehub_resume_draft', JSON.stringify(resume))
    showNotification('Draft saved successfully!')
  }

  const onGenerateResume = () => {
    setGenerating(true)
    setGenerationStep(0)
    
    const steps = [
      'Parsing resume fields...',
      'Analyzing ATS compatibility...',
      'Optimizing layout format...',
      'Compiling PDF document...'
    ]
    
    let currentStep = 0
    const interval = setInterval(() => {
      currentStep++
      if (currentStep < steps.length) {
        setGenerationStep(currentStep)
      } else {
        clearInterval(interval)
        setGenerating(false)
        showNotification('Resume compiled successfully!')
        
        const printWindow = window.open('', '_blank')
        if (!printWindow) {
          showNotification('Popup blocked! Please allow popups to generate your PDF.', 'error')
          return
        }
        printWindow.document.open()
        printWindow.document.write(getPrintResumeHtml(resume))
        printWindow.document.close()
      }
    }, 850)
  }

  const handleLogout = () => {
    localStorage.removeItem('hirehub_session')
    navigate('/')
  }

  return (
    <MotionConfig reducedMotion="user">
      <div className="flex h-screen overflow-hidden bg-[#0F172A] text-slate-50">
        <Sidebar
          items={sidebarItems}
          user={{ name: profile.name, email: profile.headline }}
          onLogout={handleLogout}
          className="bg-[#0B1120]/95"
        />

        <main className="h-screen min-w-0 flex-1 overflow-y-auto">
          <header className="sticky top-0 z-30 border-b border-white/[0.07] bg-[#0F172A]/85 backdrop-blur-xl">
            <div className="mx-auto flex h-20 max-w-[1600px] items-center gap-4 px-4 pl-18 sm:px-6 sm:pl-20 md:px-8 md:pl-8 xl:px-10">
              <div className="hidden min-w-0 flex-1 lg:block">
                <p className="text-sm font-semibold text-slate-200">Resume Workspace</p>
                <p className="mt-0.5 text-xs text-slate-500">Builder and live preview in one place</p>
              </div>
            </div>
          </header>

          <div className="relative mx-auto max-w-[1600px] px-4 py-8 sm:px-6 md:px-8 lg:py-10 xl:px-10">
            <div className="pointer-events-none absolute right-0 top-0 -z-0 size-[34rem] rounded-full bg-[#8B5CF6]/[0.07] blur-[130px]" />
            <div className="pointer-events-none absolute left-20 top-28 -z-0 size-72 rounded-full bg-[#06B6D4]/[0.06] blur-[120px]" />

            <motion.section initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="relative overflow-hidden rounded-[32px] border border-white/10 bg-[#111827]/80 p-6 shadow-[0_32px_90px_-46px_rgba(76,29,149,0.85)] sm:p-8 lg:p-10">
              <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_80%_20%,rgba(6,182,212,0.15),transparent_26%),radial-gradient(circle_at_10%_10%,rgba(139,92,246,0.25),transparent_32%)]" />
              <div className="absolute inset-0 -z-10 bg-[linear-gradient(rgba(255,255,255,0.024)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.024)_1px,transparent_1px)] bg-[size:44px_44px] [mask-image:linear-gradient(to_right,black,transparent)]" />

              <div className="max-w-3xl">
                <div className="inline-flex items-center gap-2 rounded-full border border-[#8B5CF6]/25 bg-[#8B5CF6]/10 px-3 py-1.5 text-xs font-semibold text-[#C4B5FD]">
                  <Sparkles className="size-3.5" aria-hidden="true" />
                  Resume workspace
                </div>
                <h1 className="mt-5 text-4xl font-bold tracking-[-0.04em] sm:text-5xl">Resume Studio</h1>
                <p className="mt-3 max-w-2xl text-base leading-7 text-slate-300 sm:text-lg">Build and generate your professional resume draft.</p>
              </div>
            </motion.section>

            <motion.section {...reveal} className="mt-10 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]" aria-label="Resume studio workspace">
              <Card className="h-full p-6">
                <SectionTitle
                  eyebrow="Builder"
                  title="Resume Builder"
                  description="Enter your details once and keep the preview in sync as you iterate."
                />
                <div className="mt-6">
                  <ResumeBuilderForm
                    data={resume}
                    onChange={updateField}
                    onSaveDraft={onSaveDraft}
                    onGenerateResume={onGenerateResume}
                  />
                </div>
              </Card>

              <Card className="h-full p-0">
                <div className="border-b border-white/10 p-6">
                  <SectionTitle
                    eyebrow="Preview"
                    title="Live Resume Preview"
                    description="A polished resume preview based on your current draft data."
                  />
                </div>
                <div className="p-6">
                  <ResumePreview data={preview} />
                </div>
              </Card>
            </motion.section>
          </div>
        </main>
      </div>
      
      {/* Toast Notification */}
      {toast && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.9 }}
          className={`fixed bottom-6 right-6 z-50 flex items-center gap-2.5 rounded-2xl border px-5 py-3.5 text-sm font-semibold shadow-2xl backdrop-blur-xl transition duration-300 ${
            toast.type === 'success'
              ? 'border-emerald-500/20 bg-emerald-500/10 text-emerald-300'
              : 'border-red-500/20 bg-red-500/10 text-red-300'
          }`}
        >
          <Sparkles className="size-4 shrink-0" />
          {toast.message}
        </motion.div>
      )}

      {/* Generation Steps Modal */}
      {generating && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur-md">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-md rounded-3xl border border-white/10 bg-[#111827]/90 p-8 text-center shadow-2xl backdrop-blur-2xl"
          >
            <div className="mx-auto grid size-16 place-items-center rounded-2xl bg-gradient-to-br from-[#8B5CF6] to-[#06B6D4] text-white">
              <Sparkles className="size-8 animate-pulse" />
            </div>
            
            <h3 className="mt-6 text-xl font-bold text-white">Generating Resume</h3>
            <p className="mt-2 text-sm text-slate-400">Please wait while the AI compiles your document...</p>
            
            <div className="mt-6 space-y-2 text-left">
              {[
                'Parsing resume fields...',
                'Analyzing ATS compatibility...',
                'Optimizing layout format...',
                'Compiling PDF document...'
              ].map((step, idx) => {
                const isActive = idx === generationStep
                const isCompleted = idx < generationStep
                return (
                  <div key={step} className="flex items-center gap-3 text-sm">
                    <span className={`size-2.5 rounded-full ${
                      isCompleted ? 'bg-emerald-400' : isActive ? 'bg-[#8B5CF6] animate-ping' : 'bg-slate-700'
                    }`} />
                    <span className={
                      isCompleted ? 'text-slate-300 font-medium' : isActive ? 'text-white font-bold' : 'text-slate-500'
                    }>
                      {step}
                    </span>
                  </div>
                )
              })}
            </div>
            
            <div className="mt-8 h-1.5 w-full rounded-full bg-slate-800 overflow-hidden">
              <motion.div 
                className="h-full bg-gradient-to-r from-[#8B5CF6] to-[#06B6D4]" 
                animate={{ width: `${(generationStep + 1) * 25}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </motion.div>
        </div>
      )}
    </MotionConfig>
  )
}

export default ResumeStudio