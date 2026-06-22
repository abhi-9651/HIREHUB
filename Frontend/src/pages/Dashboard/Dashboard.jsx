import { useState } from 'react'
import { MotionConfig, motion } from 'framer-motion'
import {
  ArrowRight,
  Bell,
  Bot,
  BriefcaseBusiness,
  CalendarDays,
  Check,
  CircleCheck,
  Clock3,
  FileCheck2,
  FileText,
  LayoutDashboard,
  Map,
  Search,
  Sparkles,
  Target,
  TrendingUp,
  UserRound,
  WandSparkles,
} from 'lucide-react'
import { Button, Card, Input, SectionTitle, Sidebar } from '../../components'
import { DashboardStatCard, InternshipCard, QuickActionCard } from './components'

const sidebarItems = [
  { label: 'Dashboard', to: '/dashboard', icon: LayoutDashboard, end: true },
  { label: 'Smart Match', to: '/internships', icon: BriefcaseBusiness },
  { label: 'Resume Studio', to: '/resume-studio', icon: FileText },
  { label: 'Career Copilot', to: '/career-copilot', icon: Bot },
  { label: 'Profile', to: '/profile', icon: UserRound },
]

const stats = [
  { label: 'Resume Score', value: '86%', growth: '+6%', icon: FileCheck2 },
  { label: 'Career Score', value: '78', growth: '+4 pts', icon: TrendingUp, accent: 'cyan' },
  { label: 'Applications Sent', value: '12', growth: '+3', icon: BriefcaseBusiness },
  { label: 'Saved Internships', value: '8', growth: '+2', icon: Target, accent: 'cyan' },
]

const quickActions = [
  { title: 'Generate Resume', description: 'Create a tailored resume with AI.', to: '/resume-studio', icon: WandSparkles },
  { title: 'Find Internships', description: 'See roles matched to your profile.', to: '/internships', icon: Search, accent: 'cyan' },
  { title: 'Ask Copilot', description: 'Get instant, personal career guidance.', to: '/career-copilot', icon: Bot },
  { title: 'Career Roadmap', description: 'Review your next learning milestones.', to: '/roadmap', icon: Map, accent: 'cyan' },
]

const internships = [
  { role: 'Frontend Developer Intern', company: 'Nova Labs', location: 'Remote', duration: '3 months', type: 'Full-time', skills: ['React', 'Tailwind', 'JavaScript'], match: 95, logoClass: 'bg-[#8B5CF6]/15 text-[#A78BFA]' },
  { role: 'React Engineering Intern', company: 'Orbit AI', location: 'Bengaluru', duration: '6 months', type: 'Hybrid', skills: ['React', 'TypeScript', 'Git'], match: 92, logoClass: 'bg-[#06B6D4]/15 text-[#22D3EE]' },
  { role: 'Product Frontend Intern', company: 'Pixelstack', location: 'Remote', duration: '4 months', type: 'Part-time', skills: ['React', 'UI/UX', 'Tailwind'], match: 89, logoClass: 'bg-emerald-500/15 text-emerald-400' },
  { role: 'Web Platform Intern', company: 'CloudCore', location: 'Pune', duration: '6 months', type: 'Hybrid', skills: ['JavaScript', 'Node.js', 'APIs'], match: 87, logoClass: 'bg-amber-500/15 text-amber-400' },
]

const roadmap = [
  { label: 'React', progress: 100, color: 'bg-[#8B5CF6]' },
  { label: 'Tailwind CSS', progress: 100, color: 'bg-[#06B6D4]' },
  { label: 'Node.js', progress: 60, color: 'bg-[#8B5CF6]' },
  { label: 'MongoDB', progress: 20, color: 'bg-[#06B6D4]' },
]

const activities = [
  { title: 'Resume updated', detail: 'Improved your professional summary', time: '18 min ago', icon: FileText, color: 'text-[#A78BFA] bg-[#8B5CF6]/12' },
  { title: 'Application sent', detail: 'Frontend Developer Intern at Nova Labs', time: '2 hours ago', icon: BriefcaseBusiness, color: 'text-emerald-400 bg-emerald-500/10' },
  { title: 'Internship saved', detail: 'React Engineering Intern at Orbit AI', time: 'Yesterday', icon: Target, color: 'text-[#22D3EE] bg-[#06B6D4]/10' },
  { title: 'Asked Career Copilot', detail: 'Created a 30-day interview preparation plan', time: 'Yesterday', icon: Bot, color: 'text-amber-400 bg-amber-500/10' },
]

const reveal = {
  initial: { opacity: 0, y: 18 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.15 },
  transition: { duration: 0.45, ease: 'easeOut' },
}

function Dashboard() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const currentDate = new Intl.DateTimeFormat('en-IN', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date())

  return (
    <MotionConfig reducedMotion="user">
      <div className="flex h-screen overflow-hidden bg-[#0F172A] text-slate-50">
        <Sidebar
          items={sidebarItems}
          collapsed={sidebarCollapsed}
          onCollapsedChange={setSidebarCollapsed}
          user={{ name: 'Abhi', email: 'Frontend Developer' }}
          className="bg-[#0B1120]/95"
        />

        <main className="h-screen min-w-0 flex-1 overflow-y-auto">
          <header className="sticky top-0 z-30 border-b border-white/[0.07] bg-[#0F172A]/85 backdrop-blur-xl">
            <div className="mx-auto flex h-20 max-w-[1600px] items-center gap-4 px-4 pl-18 sm:px-6 sm:pl-20 md:px-8 md:pl-8 xl:px-10">
              <div className="hidden min-w-0 flex-1 lg:block">
                <p className="text-sm font-semibold text-slate-200">Career Command Center</p>
                <p className="mt-0.5 text-xs text-slate-500">Small steps. Stronger outcomes.</p>
              </div>
              <Input
                aria-label="Search dashboard"
                placeholder="Search opportunities, tools, or advice..."
                leftIcon={Search}
                containerClassName="ml-auto max-w-md"
                className="h-11 bg-[#111827]/70 text-sm"
                rightElement={<kbd className="hidden rounded border border-white/10 bg-white/5 px-1.5 py-0.5 text-[10px] text-slate-500 sm:inline">⌘ K</kbd>}
              />
              <button type="button" aria-label="Notifications, 2 unread" className="relative grid size-11 shrink-0 place-items-center rounded-xl border border-white/10 bg-[#111827]/70 text-slate-400 transition hover:border-[#8B5CF6]/30 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#06B6D4]">
                <Bell className="size-4.5" />
                <span className="absolute right-2.5 top-2.5 size-1.5 rounded-full bg-[#06B6D4] ring-2 ring-[#111827]" />
              </button>
              <button type="button" aria-label="Open profile menu" className="grid size-11 shrink-0 place-items-center rounded-full bg-gradient-to-br from-[#8B5CF6] to-[#06B6D4] text-sm font-bold shadow-lg shadow-purple-950/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#06B6D4] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0F172A]">
                AB
              </button>
            </div>
          </header>

          <div className="relative mx-auto max-w-[1600px] px-4 py-8 sm:px-6 md:px-8 lg:py-10 xl:px-10">
            <div className="pointer-events-none absolute right-0 top-0 -z-0 size-96 rounded-full bg-[#8B5CF6]/[0.045] blur-[120px]" />

            <motion.section initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="relative mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="flex items-center gap-2 text-sm font-medium text-[#22D3EE]"><CalendarDays className="size-4" aria-hidden="true" />{currentDate}</p>
                <h1 className="mt-3 text-3xl font-bold tracking-[-0.035em] sm:text-4xl">Good Morning, Abhi <span aria-hidden="true">👋</span></h1>
                <p className="mt-2 text-base text-slate-400">Your career snapshot for today—one focused step at a time.</p>
              </div>
              <div className="rounded-xl border border-emerald-500/15 bg-emerald-500/[0.06] px-4 py-2.5 text-sm text-emerald-300">
                <span className="mr-2 inline-block size-1.5 rounded-full bg-emerald-400 align-middle" />You’re on a 6-day progress streak
              </div>
            </motion.section>

            <motion.section {...reveal} aria-labelledby="copilot-title">
              <Card padding="none" className="relative isolate overflow-hidden border-[#8B5CF6]/25 bg-[#111827]/80 p-6 shadow-[0_32px_90px_-46px_rgba(76,29,149,0.85)] sm:p-8 lg:p-10">
                <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_85%_20%,rgba(6,182,212,0.15),transparent_32%),radial-gradient(circle_at_15%_0%,rgba(139,92,246,0.22),transparent_42%)]" />
                <div className="absolute inset-0 -z-10 bg-[linear-gradient(rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:44px_44px] [mask-image:linear-gradient(to_right,black,transparent)]" />
                <div className="grid gap-8 xl:grid-cols-[1.1fr_0.9fr] xl:items-center">
                  <div>
                    <div className="inline-flex items-center gap-2 rounded-full border border-[#8B5CF6]/25 bg-[#8B5CF6]/10 px-3 py-1.5 text-xs font-semibold text-[#C4B5FD]">
                      <Sparkles className="size-3.5" aria-hidden="true" />AI-powered daily guidance
                    </div>
                    <h2 id="copilot-title" className="mt-5 text-2xl font-bold tracking-tight sm:text-3xl">AI Career Copilot</h2>
                    <p className="mt-3 max-w-2xl text-base leading-7 text-slate-300">Your profile is <strong className="font-semibold text-white">86% complete.</strong> You’re close to unlocking stronger matches—here’s what will move you forward today.</p>
                    <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                      <Button leftIcon={Bot} rightIcon={ArrowRight}>Ask AI</Button>
                      <Button variant="secondary" leftIcon={Map}>View Roadmap</Button>
                    </div>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-[#0F172A]/60 p-5 backdrop-blur-sm sm:p-6">
                    <div className="mb-5 flex items-center justify-between gap-3">
                      <h3 className="text-sm font-semibold text-slate-200">Today’s recommendations</h3>
                      <span className="rounded-full bg-[#06B6D4]/10 px-2.5 py-1 text-[11px] font-semibold text-[#22D3EE]">3 actions</span>
                    </div>
                    <ul className="space-y-4">
                      {['Add one React project', 'Apply to 3 matched internships', 'Improve your resume summary'].map((item, index) => (
                        <li key={item} className="flex items-center gap-3 text-sm text-slate-300">
                          <span className={`grid size-7 shrink-0 place-items-center rounded-lg ${index === 0 ? 'bg-[#8B5CF6]/15 text-[#A78BFA]' : 'bg-emerald-500/10 text-emerald-400'}`}>
                            {index === 0 ? <Sparkles className="size-3.5" aria-hidden="true" /> : <Check className="size-3.5" aria-hidden="true" />}
                          </span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Card>
            </motion.section>

            <motion.section {...reveal} className="mt-10" aria-labelledby="stats-title">
              <div className="mb-5 flex items-center justify-between">
                <h2 id="stats-title" className="text-lg font-semibold tracking-tight">Career pulse</h2>
                <p className="text-xs text-slate-500">Updated today</p>
              </div>
              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {stats.map((stat) => <DashboardStatCard key={stat.label} {...stat} />)}
              </div>
            </motion.section>

            <motion.section {...reveal} className="mt-10" aria-labelledby="quick-actions-title">
              <SectionTitle id="quick-actions-title" eyebrow="Move forward" title="Quick Actions" description="The most useful next steps, right where you need them." />
              <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {quickActions.map((action) => <QuickActionCard key={action.title} {...action} />)}
              </div>
            </motion.section>

            <motion.section {...reveal} className="mt-12" aria-labelledby="matches-title">
              <SectionTitle
                eyebrow="Selected for you"
                title="Smart Match Internships"
                description="Roles ranked around your current skills, preferences, and career direction."
                action={<Button variant="ghost" rightIcon={ArrowRight}>View All Matches</Button>}
              />
              <div id="matches-title" className="mt-6 grid gap-4 xl:grid-cols-2">
                {internships.map((internship) => <InternshipCard key={`${internship.company}-${internship.role}`} internship={internship} />)}
              </div>
            </motion.section>

            <div className="mt-12 grid gap-6 xl:grid-cols-2">
              <motion.section {...reveal} aria-labelledby="resume-insights-title">
                <Card className="h-full">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[#22D3EE]">AI-generated</p>
                      <h2 id="resume-insights-title" className="mt-2 text-xl font-semibold">Resume Insights</h2>
                    </div>
                    <span className="grid size-11 place-items-center rounded-xl bg-[#8B5CF6]/12 text-[#A78BFA]"><Sparkles className="size-5" aria-hidden="true" /></span>
                  </div>
                  <div className="mt-7">
                    <p className="text-sm font-medium text-slate-300">Missing skills</p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {['Node.js', 'MongoDB', 'GitHub Actions'].map((skill) => <span key={skill} className="rounded-lg border border-[#06B6D4]/15 bg-[#06B6D4]/[0.07] px-3 py-1.5 text-xs font-medium text-[#67E8F9]">{skill}</span>)}
                    </div>
                  </div>
                  <div className="mt-7 border-t border-white/[0.07] pt-6">
                    <p className="text-sm font-medium text-slate-300">High-impact suggestions</p>
                    <ul className="mt-4 space-y-3">
                      {['Add one production-ready project', 'Make your summary outcome-focused', 'Add measurable achievements'].map((suggestion) => (
                        <li key={suggestion} className="flex items-center gap-3 text-sm text-slate-400"><CircleCheck className="size-4 shrink-0 text-emerald-400" aria-hidden="true" />{suggestion}</li>
                      ))}
                    </ul>
                  </div>
                  <Button variant="secondary" className="mt-7 w-full" rightIcon={ArrowRight}>Open Resume Studio</Button>
                </Card>
              </motion.section>

              <motion.section {...reveal} aria-labelledby="roadmap-title">
                <Card className="h-full">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[#A78BFA]">Your learning path</p>
                      <h2 id="roadmap-title" className="mt-2 text-xl font-semibold">Frontend Developer Roadmap</h2>
                    </div>
                    <span className="grid size-11 place-items-center rounded-xl bg-[#06B6D4]/10 text-[#22D3EE]"><Map className="size-5" aria-hidden="true" /></span>
                  </div>
                  <div className="mt-7 space-y-5">
                    {roadmap.map((item) => (
                      <div key={item.label}>
                        <div className="mb-2 flex items-center justify-between text-sm">
                          <span className="font-medium text-slate-300">{item.label}</span>
                          <span className={item.progress === 100 ? 'text-emerald-400' : 'text-slate-500'}>{item.progress === 100 ? 'Complete' : `${item.progress}%`}</span>
                        </div>
                        <div className="h-2 overflow-hidden rounded-full bg-slate-800" role="progressbar" aria-label={`${item.label} progress`} aria-valuenow={item.progress} aria-valuemin="0" aria-valuemax="100">
                          <motion.div initial={{ width: 0 }} whileInView={{ width: `${item.progress}%` }} viewport={{ once: true }} transition={{ duration: 0.7, ease: 'easeOut' }} className={`h-full rounded-full ${item.progress === 100 ? 'bg-emerald-500' : item.color}`} />
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-7 flex items-center gap-2 rounded-xl border border-white/[0.07] bg-white/[0.025] p-3 text-xs text-slate-400">
                    <Clock3 className="size-4 shrink-0 text-[#A78BFA]" aria-hidden="true" />Next milestone: Complete Node.js fundamentals
                  </div>
                </Card>
              </motion.section>
            </div>

            <motion.section {...reveal} className="mt-12 pb-8" aria-labelledby="activity-title">
              <SectionTitle eyebrow="Your momentum" title="Recent Activity" description="A simple record of the progress you’re making." />
              <Card className="mt-6" padding="none">
                <ol className="divide-y divide-white/[0.07]">
                  {activities.map((activity, index) => {
                    const Icon = activity.icon
                    return (
                      <li key={activity.title} className="relative flex gap-4 p-5 sm:items-center sm:px-6">
                        {index < activities.length - 1 ? <span className="absolute bottom-0 left-[40px] top-[52px] hidden w-px bg-white/10 sm:block" /> : null}
                        <span className={`relative z-10 grid size-10 shrink-0 place-items-center rounded-xl ${activity.color}`}><Icon className="size-4" aria-hidden="true" /></span>
                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-semibold text-slate-200">{activity.title}</p>
                          <p className="mt-1 text-sm text-slate-500">{activity.detail}</p>
                        </div>
                        <time className="shrink-0 text-xs text-slate-600">{activity.time}</time>
                      </li>
                    )
                  })}
                </ol>
              </Card>
            </motion.section>
          </div>
        </main>
      </div>
    </MotionConfig>
  )
}

export default Dashboard
