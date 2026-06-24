import { useEffect } from 'react'
import { MotionConfig, motion, useReducedMotion } from 'framer-motion'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import {
  ArrowRight,
  Bot,
  BriefcaseBusiness,
  Check,
  ChevronRight,
  CircleCheck,
  Code2,
  FileCheck2,
  FileText,
  MapPin,
  MessageSquareQuote,
  Network,
  Sparkles,
  Star,
  Target,
  TrendingUp,
  UserRound,
  WandSparkles,
} from 'lucide-react'
import { Button, Card, Navbar, SectionTitle } from '../../components'

const navLinks = [
  { label: 'Home', to: '/#home' },
  { label: 'Features', to: '/#features' },
  { label: 'How it works', to: '/#how-it-works' },
  { label: 'About', to: '/#about' },
]

const features = [
  {
    title: 'AI Resume Studio',
    description: 'Turn your experience into recruiter-ready stories with focused, role-specific AI guidance.',
    icon: FileText,
    accent: 'purple',
    detail: 'Tailored in seconds',
  },
  {
    title: 'Internship Discovery',
    description: 'Find opportunities ranked around your skills, goals, location, and preferred way of working.',
    icon: BriefcaseBusiness,
    accent: 'cyan',
    detail: 'Smarter matching',
  },
  {
    title: 'AI Career Copilot',
    description: 'Get thoughtful, always-on support for interview prep, learning plans, and your next career move.',
    icon: Bot,
    accent: 'purple',
    detail: 'Guidance, 24/7',
  },
]

const steps = [
  { title: 'Create your profile', description: 'Tell us what you know, what you care about, and where you want to go.', icon: UserRound },
  { title: 'Shape your resume', description: 'Build a polished resume with AI suggestions grounded in your real work.', icon: WandSparkles },
  { title: 'Discover your fit', description: 'Explore internships that align with your strengths—not just your keywords.', icon: Target },
  { title: 'Grow with guidance', description: 'Use your Copilot to prepare, learn, and make each application stronger.', icon: TrendingUp },
]

const testimonials = [
  {
    quote: 'HireHub helped me turn scattered project notes into a resume I was genuinely proud to send.',
    name: 'Aarav Mehta',
    role: 'Computer Science student',
    initials: 'AM',
  },
  {
    quote: 'The matches felt relevant from day one. I spent less time searching and more time preparing well.',
    name: 'Riya Kapoor',
    role: 'Frontend developer intern',
    initials: 'RK',
  },
  {
    quote: 'Career Copilot gave me a clear interview plan and made the whole process feel far less overwhelming.',
    name: 'Kabir Shah',
    role: 'Final-year engineering student',
    initials: 'KS',
  },
]

const trustMetrics = [
  { value: '12K+', label: 'Students supported' },
  { value: '8.4K', label: 'Resumes generated' },
  { value: '24K+', label: 'Internship matches' },
]

const footerGroups = [
  { title: 'Product', links: [['Features', '/#features'], ['Resume Studio', '/#features'], ['Career Copilot', '/#features']] },
  { title: 'Company', links: [['About', '/#about'], ['How it works', '/#how-it-works'], ['Contact', 'mailto:hello@hirehub.app']] },
  { title: 'Resources', links: [['Student guide', '/#how-it-works'], ['Privacy', '/#'], ['Terms', '/#']] },
]

const reveal = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.55, ease: 'easeOut' },
}

function scrollToSection(id) {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  document.getElementById(id)?.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth' })
}

function ProductPreview() {
  const reduceMotion = useReducedMotion()

  return (
    <motion.div
      initial={{ opacity: 0, x: reduceMotion ? 0 : 28, scale: reduceMotion ? 1 : 0.98 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      transition={{ duration: 0.7, delay: 0.15, ease: 'easeOut' }}
      className="relative mx-auto w-full max-w-[640px] lg:mx-0 lg:translate-x-3"
    >
      <div className="absolute -inset-10 -z-10 rounded-full bg-[#8B5CF6]/20 blur-[90px]" />
      <div className="absolute -right-8 top-16 -z-10 size-48 rounded-full bg-[#06B6D4]/10 blur-[70px]" />

      <div className="relative overflow-hidden rounded-[24px] border border-white/12 bg-[#0B1120]/90 shadow-[0_35px_90px_-35px_rgba(0,0,0,0.9)] ring-1 ring-inset ring-white/[0.035] backdrop-blur-xl">
        <div className="pointer-events-none absolute inset-x-12 top-0 h-px bg-gradient-to-r from-transparent via-[#C4B5FD]/60 to-transparent" />
        <div className="flex h-12 items-center gap-2 border-b border-white/8 px-5">
          <span className="size-2.5 rounded-full bg-red-400/80" />
          <span className="size-2.5 rounded-full bg-amber-400/80" />
          <span className="size-2.5 rounded-full bg-emerald-400/80" />
          <div className="ml-3 flex h-7 flex-1 items-center rounded-lg border border-white/6 bg-white/[0.03] px-3 text-[11px] text-slate-500">
            hirehub.app/dashboard
          </div>
        </div>

        <div className="grid grid-cols-[64px_1fr] sm:grid-cols-[148px_1fr]">
          <div className="border-r border-white/8 p-3 sm:p-4">
            <div className="mb-6 flex items-center gap-2">
              <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-gradient-to-br from-[#8B5CF6] to-[#06B6D4]">
                <Sparkles className="size-4" />
              </span>
              <span className="hidden text-xs font-semibold sm:block">HireHub</span>
            </div>
            {[TrendingUp, BriefcaseBusiness, FileText, Bot].map((Icon, index) => (
              <div key={index} className={`mb-2 flex h-9 items-center gap-2 rounded-lg px-2.5 ${index === 0 ? 'bg-[#8B5CF6]/15 text-[#A78BFA]' : 'text-slate-500'}`}>
                <Icon className="size-4 shrink-0" />
                <span className="hidden text-[10px] sm:block">{['Overview', 'Internships', 'Resume', 'Copilot'][index]}</span>
              </div>
            ))}
          </div>

          <div className="min-w-0 p-4 sm:p-6">
            <div className="mb-5 flex items-center justify-between">
              <div>
                <p className="text-[10px] text-slate-500">Tuesday, 21 June</p>
                <h3 className="mt-1 text-sm font-semibold sm:text-base">Good morning, Aanya</h3>
              </div>
              <div className="grid size-8 place-items-center rounded-full bg-[#06B6D4]/15 text-[10px] font-bold text-[#22D3EE]">AS</div>
            </div>

            <div className="mb-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
              {[
                ['Resume score', '86%', FileCheck2],
                ['Smart matches', '24', Target],
                ['Applications', '08', TrendingUp],
              ].map(([label, value, Icon], index) => (
                <div key={label} className={`${index === 2 ? 'hidden sm:block' : ''} rounded-xl border border-white/8 bg-white/[0.035] p-3`}>
                  <Icon className={`mb-3 size-4 ${index === 1 ? 'text-[#06B6D4]' : 'text-[#8B5CF6]'}`} />
                  <p className="text-lg font-bold">{value}</p>
                  <p className="mt-0.5 text-[9px] text-slate-500">{label}</p>
                </div>
              ))}
            </div>

            <div className="rounded-xl border border-[#8B5CF6]/20 bg-gradient-to-br from-[#8B5CF6]/10 to-transparent p-4">
              <div className="mb-3 flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-semibold">
                  <span className="grid size-7 place-items-center rounded-lg bg-[#8B5CF6]/20 text-[#A78BFA]"><Sparkles className="size-3.5" /></span>
                  AI opportunity match
                </div>
                <span className="rounded-full bg-emerald-500/10 px-2 py-1 text-[9px] font-semibold text-emerald-400">96% match</span>
              </div>
              <div className="flex items-center justify-between gap-3 rounded-lg border border-white/6 bg-[#0F172A]/70 p-3">
                <div className="min-w-0">
                  <p className="truncate text-xs font-semibold">Product Design Intern</p>
                  <p className="mt-1 flex items-center gap-1 text-[9px] text-slate-500"><MapPin className="size-2.5" /> Bengaluru · Hybrid</p>
                </div>
                <span className="shrink-0 rounded-lg bg-white px-2.5 py-1.5 text-[9px] font-bold text-slate-900">View role</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <motion.div animate={reduceMotion ? undefined : { y: [0, -7, 0] }} transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }} className="absolute -bottom-7 -left-4 hidden items-center gap-3 rounded-xl border border-white/10 bg-[#111827]/90 p-3 shadow-xl backdrop-blur-xl sm:flex">
        <span className="grid size-9 place-items-center rounded-lg bg-emerald-500/15 text-emerald-400"><CircleCheck className="size-4" /></span>
        <div><p className="text-[11px] font-semibold">Profile optimized</p><p className="mt-0.5 text-[9px] text-slate-500">You are ready to apply</p></div>
      </motion.div>
    </motion.div>
  )
}

function Landing() {
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace('#', '')
      const timer = setTimeout(() => {
        const element = document.getElementById(id)
        if (element) {
          const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
          element.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth' })
        }
      }, 100)
      return () => clearTimeout(timer)
    }
  }, [location.hash])

  return (
    <MotionConfig reducedMotion="user">
    <div className="min-h-screen bg-[#0F172A] text-slate-50">
      <Navbar
        links={navLinks}
        activeTo="/#home"
        onLogin={() => navigate('/login?mode=login')}
        onGetStarted={() => navigate('/login?mode=signup')}
      />

      <main>
        <section id="home" className="relative isolate overflow-hidden">
          <div className="absolute inset-0 -z-20 bg-[linear-gradient(rgba(148,163,184,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.035)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:linear-gradient(to_bottom,black,transparent_90%)]" />
          <div className="absolute left-[8%] top-16 -z-10 h-96 w-96 rounded-full bg-[#8B5CF6]/12 blur-[130px]" />
          <div className="absolute right-[4%] top-[22%] -z-10 h-80 w-80 rounded-full bg-[#06B6D4]/7 blur-[130px]" />
          <div className="mx-auto grid min-h-[calc(100vh-72px)] max-w-7xl items-center gap-16 px-4 py-24 sm:px-6 sm:py-28 lg:grid-cols-[0.92fr_1.08fr] lg:gap-20 lg:px-8 lg:py-32">
            <motion.div variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.06 } } }} initial="hidden" animate="visible" className="max-w-2xl">
              <motion.div variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } }} className="mb-7 inline-flex items-center gap-2 rounded-full border border-[#8B5CF6]/30 bg-[#8B5CF6]/10 px-3.5 py-2 text-xs font-semibold text-[#C4B5FD] shadow-[0_0_30px_-12px_rgba(139,92,246,0.75)]">
                <Sparkles className="size-3.5" />
                Built for ambitious students
              </motion.div>
              <motion.h1 variants={{ hidden: { opacity: 0, y: 18 }, visible: { opacity: 1, y: 0, transition: { duration: 0.55 } } }} className="max-w-[650px] text-[42px] font-bold leading-[1.04] tracking-[-0.045em] text-white sm:text-5xl lg:text-[56px]">
                Your career, accelerated by <span className="bg-gradient-to-r from-[#C4B5FD] via-[#8B5CF6] to-[#22D3EE] bg-clip-text text-transparent">intelligent guidance.</span>
              </motion.h1>
              <motion.p variants={{ hidden: { opacity: 0, y: 18 }, visible: { opacity: 1, y: 0, transition: { duration: 0.55 } } }} className="mt-7 max-w-[580px] text-base leading-7 text-slate-300/90 sm:text-lg sm:leading-8">
                Build standout resumes, discover internships that fit, and move forward with an AI career copilot in your corner.
              </motion.p>
              <motion.div variants={{ hidden: { opacity: 0, y: 18 }, visible: { opacity: 1, y: 0, transition: { duration: 0.55 } } }} className="mt-9 flex flex-col gap-3 sm:flex-row">
                <Button size="lg" rightIcon={ArrowRight} onClick={() => navigate('/login?mode=signup')}>Get Started Free</Button>
                <Button size="lg" variant="secondary" onClick={() => scrollToSection('features')}>Explore Features</Button>
              </motion.div>
              <motion.div variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 0.5 } } }} className="mt-8 flex flex-wrap gap-x-5 gap-y-2 text-xs text-slate-400 sm:text-sm">
                {['Free for students', 'No credit card', 'Set up in minutes'].map((item) => (
                  <span key={item} className="flex items-center gap-1.5"><Check className="size-4 text-emerald-400" />{item}</span>
                ))}
              </motion.div>
            </motion.div>

            <ProductPreview />
          </div>

          <motion.div {...reveal} className="relative mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8 lg:pb-24">
            <div className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />
            <div className="grid gap-8 pt-10 sm:grid-cols-3 sm:gap-0 sm:pt-12">
              {trustMetrics.map((metric, index) => (
                <div key={metric.label} className={`text-center ${index > 0 ? 'sm:border-l sm:border-white/10' : ''}`}>
                  <p className="text-2xl font-bold tracking-[-0.03em] text-white sm:text-3xl">{metric.value}</p>
                  <p className="mt-1.5 text-xs font-medium uppercase tracking-[0.14em] text-slate-500">{metric.label}</p>
                </div>
              ))}
            </div>
            <p className="mt-8 text-center text-xs text-slate-600">Early HireHub community metrics · illustrative values</p>
          </motion.div>
        </section>

        <section id="features" className="relative border-t border-white/[0.045] py-20 sm:py-24 lg:py-28">
          <div className="pointer-events-none absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-[#8B5CF6]/[0.035] to-transparent" />
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <motion.div {...reveal}>
              <SectionTitle align="center" eyebrow="Everything in one place" title="A smarter toolkit for your next move" description="Focused tools that help you show your potential, find the right opportunities, and prepare with confidence." />
            </motion.div>

            <div className="mt-12 grid gap-5 lg:grid-cols-3">
              {features.map((feature, index) => {
                const Icon = feature.icon
                const cyan = feature.accent === 'cyan'
                return (
                  <Card key={feature.title} interactive padding="lg" {...reveal} transition={{ duration: 0.5, delay: index * 0.08 }} className="group relative min-h-72 overflow-hidden">
                    <div className={`absolute -right-16 -top-16 size-44 rounded-full opacity-60 blur-3xl transition-opacity duration-300 group-hover:opacity-100 ${cyan ? 'bg-[#06B6D4]/14' : 'bg-[#8B5CF6]/16'}`} />
                    <div className={`absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 ${cyan ? 'via-[#06B6D4]/70' : 'via-[#8B5CF6]/70'}`} />
                    <div className={`grid size-12 place-items-center rounded-xl border ${cyan ? 'border-[#06B6D4]/20 bg-[#06B6D4]/10 text-[#22D3EE]' : 'border-[#8B5CF6]/20 bg-[#8B5CF6]/12 text-[#A78BFA]'}`}>
                      <Icon className="size-5" />
                    </div>
                    <h3 className="mt-8 text-xl font-semibold tracking-tight">{feature.title}</h3>
                    <p className="mt-3 leading-7 text-slate-400">{feature.description}</p>
                    <div className={`mt-7 flex items-center gap-2 text-sm font-semibold ${cyan ? 'text-[#22D3EE]' : 'text-[#A78BFA]'}`}>
                      {feature.detail}<ChevronRight className="size-4 transition-transform group-hover:translate-x-1" />
                    </div>
                  </Card>
                )
              })}
            </div>
          </div>
        </section>

        <section id="how-it-works" className="relative border-y border-white/[0.06] bg-[#111827]/35 py-20 sm:py-24 lg:py-28">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(139,92,246,0.08),transparent_55%)]" />
          <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <motion.div {...reveal}>
              <SectionTitle eyebrow="A clear path forward" title="From profile to opportunity in four focused steps" description="HireHub keeps the process simple, so you can spend less energy navigating tools and more energy building your future." />
            </motion.div>

            <div className="relative mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
              <div className="absolute left-[12%] right-[12%] top-7 hidden h-px bg-gradient-to-r from-transparent via-[#8B5CF6]/50 to-transparent lg:block" />
              {steps.map((step, index) => {
                const Icon = step.icon
                return (
                  <motion.div key={step.title} {...reveal} whileHover={{ y: -3, borderColor: 'rgba(139, 92, 246, 0.28)' }} transition={{ duration: 0.22, delay: index * 0.06 }} className="relative rounded-2xl border border-white/8 bg-[#0F172A]/70 p-6 shadow-[0_14px_40px_-28px_rgba(0,0,0,0.8)] backdrop-blur-sm">
                    <div className="relative z-10 flex items-center justify-between">
                      <span className="grid size-14 place-items-center rounded-2xl border border-[#8B5CF6]/25 bg-[#8B5CF6]/12 text-[#A78BFA] shadow-lg shadow-purple-950/20"><Icon className="size-5" /></span>
                      <span className="text-xs font-semibold tracking-[0.18em] text-slate-600">0{index + 1}</span>
                    </div>
                    <h3 className="mt-6 text-lg font-semibold">{step.title}</h3>
                    <p className="mt-3 text-sm leading-6 text-slate-400">{step.description}</p>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </section>

        <section id="about" className="relative overflow-hidden py-20 sm:py-24 lg:py-28">
          <div className="pointer-events-none absolute left-1/2 top-1/2 h-96 w-[720px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#06B6D4]/[0.035] blur-[120px]" />
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <motion.div {...reveal}>
              <SectionTitle align="center" eyebrow="Student stories" title="Built for the moments that shape a career" description="From the first draft to the final interview, HireHub helps students move with more clarity and confidence." />
            </motion.div>

            <div className="mt-12 grid gap-5 lg:grid-cols-3">
              {testimonials.map((testimonial, index) => (
                <Card key={testimonial.name} interactive padding="lg" {...reveal} transition={{ duration: 0.5, delay: index * 0.08 }} className="flex min-h-72 flex-col">
                  <div className="flex items-center justify-between">
                    <MessageSquareQuote className="size-7 text-[#8B5CF6]" />
                    <div className="flex gap-1 text-amber-400" aria-label="5 out of 5 stars">{Array.from({ length: 5 }).map((_, star) => <Star key={star} className="size-3.5 fill-current" aria-hidden="true" />)}</div>
                  </div>
                  <blockquote className="mt-7 flex-1 text-base leading-7 text-slate-200">“{testimonial.quote}”</blockquote>
                  <div className="mt-7 flex items-center gap-3 border-t border-white/8 pt-5">
                    <span className="grid size-10 place-items-center rounded-full bg-gradient-to-br from-[#8B5CF6]/30 to-[#06B6D4]/20 text-xs font-bold text-white">{testimonial.initials}</span>
                    <div><p className="text-sm font-semibold">{testimonial.name}</p><p className="mt-0.5 text-xs text-slate-500">{testimonial.role}</p></div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section id="cta" className="px-4 py-20 sm:px-6 sm:py-24 lg:px-8">
          <motion.div {...reveal} className="relative mx-auto max-w-7xl overflow-hidden rounded-[28px] border border-[#8B5CF6]/30 bg-[#111827] px-6 py-16 text-center shadow-[0_32px_90px_-38px_rgba(76,29,149,0.75)] ring-1 ring-inset ring-white/[0.035] sm:px-12 sm:py-20">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(139,92,246,0.28),transparent_55%)]" />
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:42px_42px] [mask-image:radial-gradient(circle_at_center,black,transparent_75%)]" />
            <div className="relative mx-auto max-w-3xl">
              <span className="mx-auto grid size-12 place-items-center rounded-2xl bg-gradient-to-br from-[#8B5CF6] to-[#06B6D4] shadow-xl shadow-purple-950/30"><Sparkles className="size-5" /></span>
              <h2 className="mt-7 text-3xl font-bold tracking-tight sm:text-4xl">Ready to accelerate your career?</h2>
              <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-slate-400 sm:text-lg">Create your profile, sharpen your story, and discover opportunities designed around where you want to go.</p>
              <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
                <Button size="lg" rightIcon={ArrowRight} onClick={() => navigate('/login?mode=signup')}>Create Your Free Profile</Button>
                <Button size="lg" variant="secondary" onClick={() => scrollToSection('how-it-works')}>See How It Works</Button>
              </div>
            </div>
          </motion.div>
        </section>
      </main>

      <footer className="border-t border-white/8 bg-[#0B1120]">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 py-14 sm:px-6 md:grid-cols-[1.4fr_2fr] lg:px-8">
          <div className="max-w-sm">
            <Link to="/" className="flex items-center gap-2 text-lg font-bold">
              <span className="grid size-9 place-items-center rounded-xl bg-gradient-to-br from-[#8B5CF6] to-[#06B6D4]"><Sparkles className="size-4" /></span>
              HireHub
            </Link>
            <p className="mt-4 text-sm leading-6 text-slate-500">An AI-powered career copilot helping students build stronger stories and find better opportunities.</p>
            <div className="mt-6 flex gap-2">
              {[Network, Code2].map((Icon, index) => <a key={index} href="#" aria-label={index === 0 ? 'HireHub community' : 'HireHub developer resources'} className="grid size-9 place-items-center rounded-lg border border-white/8 text-slate-500 transition hover:border-[#8B5CF6]/40 hover:text-white"><Icon className="size-4" /></a>)}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            {footerGroups.map((group) => (
              <div key={group.title}>
                <h3 className="text-sm font-semibold text-slate-200">{group.title}</h3>
                <ul className="mt-4 space-y-3">
                  {group.links.map(([label, to]) => <li key={label}><Link to={to} className="text-sm text-slate-500 transition hover:text-slate-200">{label}</Link></li>)}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div className="border-t border-white/8">
          <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-5 text-xs text-slate-600 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
            <p>© 2026 HireHub. All rights reserved.</p>
            <p>Designed to help students move forward.</p>
          </div>
        </div>
      </footer>
    </div>
    </MotionConfig>
  )
}

export default Landing
