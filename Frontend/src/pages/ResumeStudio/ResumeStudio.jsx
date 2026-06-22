import { useMemo, useState } from 'react'
import { MotionConfig, motion } from 'framer-motion'
import { BookText, Bot, FileText, GraduationCap, LayoutDashboard, Sparkles, Target, UserRound } from 'lucide-react'
import { Button, Card, SectionTitle, Sidebar } from '../../components'
import { AISuggestions, ResumeBuilderForm, ResumePreview, ResumeScoreCard } from './components'

const sidebarItems = [
  { label: 'Dashboard', to: '/dashboard', icon: LayoutDashboard },
  { label: 'Smart Match', to: '/internships', icon: Target },
  { label: 'Resume Studio', to: '/resume-studio', icon: FileText, end: true },
  { label: 'Career Copilot', to: '/career-copilot', icon: Bot },
  { label: 'Profile', to: '/profile', icon: UserRound },
]

const initialResume = {
  fullName: 'Abhi Sharma',
  email: 'abhi@example.com',
  phone: '+91 98765 43210',
  education: 'B.Tech in Computer Science, 2026\nNIT Jaipur',
  skills: 'React, TypeScript, Tailwind CSS, Framer Motion, Node.js',
  projects: 'HireHub Dashboard — built an AI-powered internship platform\nPortfolio Studio — created a responsive personal brand site',
  experience: 'Frontend Intern at Nova Labs — shipped responsive product flows and improved conversion by 18%',
  achievements: 'Hackathon finalist\nAWS Cloud Practitioner badge\nBuilt 8+ UI projects',
}

const scoreCards = [
  { label: 'Resume Score', value: '86%', change: '+6%', icon: BookText },
  { label: 'ATS Compatibility', value: '92%', change: '+8%', icon: Sparkles, accent: 'cyan' },
  { label: 'Skill Relevance', value: '84%', change: '+5%', icon: GraduationCap },
]

const reveal = {
  initial: { opacity: 0, y: 18 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.14 },
  transition: { duration: 0.45, ease: 'easeOut' },
}

function ResumeStudio() {
  const [resume, setResume] = useState(initialResume)

  const preview = useMemo(() => resume, [resume])

  const updateField = (field, value) => {
    setResume((current) => ({ ...current, [field]: value }))
  }

  const onSaveDraft = () => {
    // Future backend integration hook.
    console.info('Save Draft', resume)
  }

  const onGenerateResume = () => {
    // Future backend integration hook.
    console.info('Generate Resume', resume)
  }

  return (
    <MotionConfig reducedMotion="user">
      <div className="flex h-screen overflow-hidden bg-[#0F172A] text-slate-50">
        <Sidebar
          items={sidebarItems}
          user={{ name: 'Abhi', email: 'Resume Studio' }}
          className="bg-[#0B1120]/95"
        />

        <main className="h-screen min-w-0 flex-1 overflow-y-auto">
          <header className="sticky top-0 z-30 border-b border-white/[0.07] bg-[#0F172A]/85 backdrop-blur-xl">
            <div className="mx-auto flex h-20 max-w-[1600px] items-center gap-4 px-4 pl-18 sm:px-6 sm:pl-20 md:px-8 md:pl-8 xl:px-10">
              <div className="hidden min-w-0 flex-1 lg:block">
                <p className="text-sm font-semibold text-slate-200">Resume Workspace</p>
                <p className="mt-0.5 text-xs text-slate-500">Builder, preview, and AI analysis in one place</p>
              </div>
              <div className="rounded-xl border border-[#8B5CF6]/20 bg-[#8B5CF6]/10 px-3 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-[#D8B4FE]">
                Auto-saving disabled for mock mode
              </div>
            </div>
          </header>

          <div className="relative mx-auto max-w-[1600px] px-4 py-8 sm:px-6 md:px-8 lg:py-10 xl:px-10">
            <div className="pointer-events-none absolute right-0 top-0 -z-0 size-[34rem] rounded-full bg-[#8B5CF6]/[0.07] blur-[130px]" />
            <div className="pointer-events-none absolute left-20 top-28 -z-0 size-72 rounded-full bg-[#06B6D4]/[0.06] blur-[120px]" />

            <motion.section initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="relative overflow-hidden rounded-[32px] border border-white/10 bg-[#111827]/80 p-6 shadow-[0_32px_90px_-46px_rgba(76,29,149,0.85)] sm:p-8 lg:p-10">
              <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_80%_20%,rgba(6,182,212,0.15),transparent_26%),radial-gradient(circle_at_10%_10%,rgba(139,92,246,0.25),transparent_32%)]" />
              <div className="absolute inset-0 -z-10 bg-[linear-gradient(rgba(255,255,255,0.024)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.024)_1px,transparent_1px)] bg-[size:44px_44px] [mask-image:linear-gradient(to_right,black,transparent)]" />

              <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
                <div className="max-w-3xl">
                  <div className="inline-flex items-center gap-2 rounded-full border border-[#8B5CF6]/25 bg-[#8B5CF6]/10 px-3 py-1.5 text-xs font-semibold text-[#C4B5FD]">
                    <Sparkles className="size-3.5" aria-hidden="true" />
                    AI resume workspace
                  </div>
                  <h1 className="mt-5 text-4xl font-bold tracking-[-0.04em] sm:text-5xl">Resume Studio</h1>
                  <p className="mt-3 max-w-2xl text-base leading-7 text-slate-300 sm:text-lg">Build, optimize, and improve your resume with AI.</p>
                </div>

                <div className="grid gap-3 sm:grid-cols-3 lg:min-w-[480px]">
                  {scoreCards.map((card) => (
                    <ResumeScoreCard key={card.label} {...card} />
                  ))}
                </div>
              </div>
            </motion.section>

            <motion.section {...reveal} className="mt-10 grid gap-6 xl:grid-cols-[minmax(320px,0.85fr)_minmax(0,1.35fr)_minmax(320px,0.95fr)]" aria-label="Resume studio workspace">
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
                    description="A polished resume preview based on your current mock data."
                  />
                </div>
                <div className="p-6">
                  <ResumePreview data={preview} />
                </div>
              </Card>

              <div className="space-y-6">
                <AISuggestions />
                <Card className="p-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[#06B6D4]">Next step</p>
                  <h3 className="mt-2 text-xl font-semibold text-slate-50">Prepare for smarter matching</h3>
                  <p className="mt-3 text-sm leading-6 text-slate-400">A stronger resume improves internship recommendations, ATS filtering, and recruiter confidence.</p>
                  <Button className="mt-5 w-full" variant="secondary">
                    Review Skill Gaps
                  </Button>
                </Card>
              </div>
            </motion.section>
          </div>
        </main>
      </div>
    </MotionConfig>
  )
}

export default ResumeStudio