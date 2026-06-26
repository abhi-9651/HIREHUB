import { useMemo, useState, useEffect } from 'react'
import { MotionConfig, motion } from 'framer-motion'
import {
  BadgeCheck,
  BookOpen,
  BriefcaseBusiness,
  Bot,
  Clock3,
  FileText,
  LayoutDashboard,
  MapPin,
  Sparkles,
  Target,
  UserRound,
  WandSparkles,
} from 'lucide-react'
import { Button, Card, SectionTitle, Sidebar } from '../../components'
import InternshipCard from '../Dashboard/components/InternshipCard'
import { FilterBar, MatchSummary } from './components'
import { getProfile, calculateProfileScore, syncProfileWithBackend } from '../../utils/profileStorage'
import { useNavigate } from 'react-router-dom'
import api from '../../utils/api'

const sidebarItems = [
  { label: 'Dashboard', to: '/dashboard', icon: LayoutDashboard, end: true },
  { label: 'Smart Match', to: '/internships', icon: BriefcaseBusiness },
  { label: 'Resume Studio', to: '/resume-studio', icon: FileText },
  { label: 'Career Copilot', to: '/career-copilot', icon: Bot },
  { label: 'Profile', to: '/profile', icon: UserRound },
]

const categoryFilters = ['Engineering', 'Design', 'Data Science', 'Marketing', 'Business']
const modeFilters = ['Remote', 'Hybrid', 'Onsite']

const internships = [
  {
    title: 'Frontend Engineering Intern',
    company: 'Google',
    category: 'Engineering',
    workMode: 'Hybrid',
    location: 'Bengaluru',
    duration: '6 months',
    type: 'Hybrid Internship',
    stipend: '₹30k/mo',
    stipendValue: 30000,
    match: 98,
    skills: ['React.js', 'TypeScript', 'Design Systems'],
    logoClass: 'bg-[#8B5CF6]/15 text-[#E9D5FF]',
    postedDaysAgo: 1,
  },
  {
    title: 'Product Design Intern',
    company: 'Microsoft',
    category: 'Design',
    workMode: 'Remote',
    location: 'Remote',
    duration: '5 months',
    type: 'Remote Internship',
    stipend: '₹35k/mo',
    stipendValue: 35000,
    match: 95,
    skills: ['Figma', 'Prototyping', 'UI Systems'],
    logoClass: 'bg-[#06B6D4]/15 text-[#67E8F9]',
    postedDaysAgo: 2,
  },
  {
    title: 'Data Science Intern',
    company: 'Amazon',
    category: 'Data Science',
    workMode: 'Onsite',
    location: 'Hyderabad',
    duration: '6 months',
    type: 'Onsite Internship',
    stipend: '₹50k/mo',
    stipendValue: 50000,
    match: 93,
    skills: ['Python', 'SQL', 'Analytics'],
    logoClass: 'bg-amber-500/15 text-amber-300',
    postedDaysAgo: 0,
  },
  {
    title: 'UX Engineering Intern',
    company: 'Adobe',
    category: 'Design',
    workMode: 'Hybrid',
    location: 'Noida',
    duration: '4 months',
    type: 'Hybrid Internship',
    stipend: '₹58K/mo',
    stipendValue: 58000,
    match: 91,
    skills: ['React.js', 'Motion Design', 'Accessibility'],
    logoClass: 'bg-rose-500/15 text-rose-300',
    postedDaysAgo: 3,
  },
  {
    title: 'Platform Engineering Intern',
    company: 'Atlassian',
    category: 'Engineering',
    workMode: 'Remote',
    location: 'Remote',
    duration: '6 months',
    type: 'Remote Internship',
    stipend: '₹60k/mo',
    stipendValue: 60000,
    match: 90,
    skills: ['Node.js', 'APIs', 'Cloud'],
    logoClass: 'bg-emerald-500/15 text-emerald-300',
    postedDaysAgo: 5,
  },
  {
    title: 'Growth Marketing Intern',
    company: 'Notion',
    category: 'Marketing',
    workMode: 'Remote',
    location: 'Remote',
    duration: '3 months',
    type: 'Remote Internship',
    stipend: '₹84K/mo',
    stipendValue: 84000,
    match: 88,
    skills: ['Copywriting', 'Analytics', 'Campaigns'],
    logoClass: 'bg-slate-500/15 text-slate-200',
    postedDaysAgo: 4,
  },
  {
    title: 'Business Operations Intern',
    company: 'Razorpay',
    category: 'Business',
    workMode: 'Hybrid',
    location: 'Bengaluru',
    duration: '6 months',
    type: 'Hybrid Internship',
    stipend: '₹62K/mo',
    stipendValue: 62000,
    match: 87,
    skills: ['Strategy', 'Operations', 'Stakeholder Mgmt'],
    logoClass: 'bg-cyan-500/15 text-cyan-200',
    postedDaysAgo: 6,
  },
  {
    title: 'Analytics Intern',
    company: 'Swiggy',
    category: 'Data Science',
    workMode: 'Onsite',
    location: 'Bengaluru',
    duration: '5 months',
    type: 'Onsite Internship',
    stipend: '₹70K/mo',
    stipendValue: 70000,
    match: 86,
    skills: ['Excel', 'SQL', 'Dashboards'],
    logoClass: 'bg-orange-500/15 text-orange-300',
    postedDaysAgo: 1,
  },
]

const companies = [
  { name: 'Google', status: 'Hiring now', count: 12, accent: 'purple' },
  { name: 'Microsoft', status: 'Application open', count: 8, accent: 'cyan' },
  { name: 'Adobe', status: 'Hiring now', count: 6, accent: 'purple' },
  { name: 'Amazon', status: 'New listings', count: 10, accent: 'cyan' },
  { name: 'Atlassian', status: 'Hiring now', count: 5, accent: 'purple' },
  { name: 'Notion', status: 'Application open', count: 4, accent: 'cyan' },
]

const reveal = {
  initial: { opacity: 0, y: 18 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.12 },
  transition: { duration: 0.45, ease: 'easeOut' },
}

const toDaysLabel = (days) => {
  if (days === 0) return 'Today'
  if (days === 1) return '1 day ago'
  return `${days} days ago`
}

function SmartMatch() {
  const navigate = useNavigate()
  const [search, setSearch] = useState('')
  const [selectedCategories, setSelectedCategories] = useState([])
  const [selectedModes, setSelectedModes] = useState([])
  const [location, setLocation] = useState('')
  const [sortBy, setSortBy] = useState('best')
  const [profile, setProfile] = useState(() => getProfile())
  const [internshipsList, setInternshipsList] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const handleUpdate = () => setProfile(getProfile())
    window.addEventListener('profile_updated', handleUpdate)
    syncProfileWithBackend()
    return () => window.removeEventListener('profile_updated', handleUpdate)
  }, [])

  useEffect(() => {
    api.get('/internships/match')
      .then(res => {
        setInternshipsList(res.data)
        setIsLoading(false)
      })
      .catch(err => {
        console.error('Error fetching matched internships:', err)
        setInternshipsList(internships)
        setIsLoading(false)
      })
  }, [profile])

  const profileScore = calculateProfileScore(profile)

  const filteredInternships = useMemo(() => {
    const query = search.trim().toLowerCase()
    const locationQuery = location.trim().toLowerCase()

    return internshipsList
      .filter((internship) => {
        const matchesQuery = !query || [internship.title, internship.company, internship.location, ...internship.skills].some((value) => value.toLowerCase().includes(query))
        const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(internship.category)
        const matchesMode = selectedModes.length === 0 || selectedModes.includes(internship.workMode)
        const matchesLocation = !locationQuery || internship.location.toLowerCase().includes(locationQuery)

        return matchesQuery && matchesCategory && matchesMode && matchesLocation
      })
      .sort((left, right) => {
        if (sortBy === 'newest') return left.postedDaysAgo - right.postedDaysAgo
        if (sortBy === 'stipend') return right.stipendValue - left.stipendValue
        return right.match - left.match
      })
  }, [location, search, selectedCategories, selectedModes, sortBy, internshipsList])

  const clearFilters = () => {
    setSearch('')
    setSelectedCategories([])
    setSelectedModes([])
    setLocation('')
    setSortBy('best')
  }

  const toggleValue = (values, value, setter) => {
    setter(values.includes(value) ? values.filter((item) => item !== value) : [...values, value])
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
                <p className="text-sm font-semibold text-slate-200">Internship Intelligence</p>
                <p className="mt-0.5 text-xs text-slate-500">AI-ranked roles matched to your profile</p>
              </div>
              <button type="button" className="grid size-11 shrink-0 place-items-center rounded-xl border border-white/10 bg-[#111827]/70 text-slate-400 transition hover:border-[#8B5CF6]/30 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#06B6D4]">
                <Sparkles className="size-4.5" />
              </button>
            </div>
          </header>

          <div className="relative mx-auto max-w-[1600px] px-4 py-8 sm:px-6 md:px-8 lg:py-10 xl:px-10">
            <div className="pointer-events-none absolute right-0 top-0 -z-0 size-[34rem] rounded-full bg-[#8B5CF6]/[0.06] blur-[130px]" />
            <div className="pointer-events-none absolute left-24 top-24 -z-0 size-80 rounded-full bg-[#06B6D4]/[0.06] blur-[120px]" />

            <motion.section initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="relative mb-8 overflow-hidden rounded-[32px] border border-white/10 bg-[#111827]/80 p-6 shadow-[0_32px_90px_-46px_rgba(76,29,149,0.85)] sm:p-8 lg:p-10">
              <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_80%_20%,rgba(6,182,212,0.16),transparent_28%),radial-gradient(circle_at_15%_10%,rgba(139,92,246,0.24),transparent_36%)]" />
              <div className="absolute inset-0 -z-10 bg-[linear-gradient(rgba(255,255,255,0.024)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.024)_1px,transparent_1px)] bg-[size:44px_44px] [mask-image:linear-gradient(to_right,black,transparent)]" />

              <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
                <div className="max-w-3xl">
                  <div className="inline-flex items-center gap-2 rounded-full border border-[#8B5CF6]/25 bg-[#8B5CF6]/10 px-3 py-1.5 text-xs font-semibold text-[#C4B5FD]">
                    <WandSparkles className="size-3.5" aria-hidden="true" />
                    AI internship discovery
                  </div>
                  <h1 className="mt-5 text-4xl font-bold tracking-[-0.04em] sm:text-5xl">Smart Match</h1>
                  <p className="mt-3 max-w-2xl text-base leading-7 text-slate-300 sm:text-lg">AI-ranked internships based on your profile, skills, and career goals.</p>
                </div>

                <div className="grid gap-3 sm:grid-cols-3 lg:min-w-[430px]">
                  {[
                    { icon: BadgeCheck, label: 'Profile ready', value: `${profileScore}%` },
                    { icon: BriefcaseBusiness, label: 'Priority matches', value: '24' },
                    { icon: Target, label: 'New today', value: '8' },
                  ].map((item, index) => (
                    <div key={item.label} className="rounded-2xl border border-white/10 bg-white/[0.035] p-4 backdrop-blur-sm">
                      <div className="flex items-center justify-between gap-3">
                        <span className={`grid size-10 place-items-center rounded-xl ${index === 1 ? 'bg-[#06B6D4]/10 text-[#67E8F9]' : 'bg-[#8B5CF6]/10 text-[#D8B4FE]'}`}>
                          <item.icon className="size-4.5" aria-hidden="true" />
                        </span>
                        <span className="text-2xl font-bold tracking-[-0.04em] text-slate-50">{item.value}</span>
                      </div>
                      <p className="mt-3 text-sm text-slate-400">{item.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.section>

            <motion.section {...reveal} aria-labelledby="match-summary-title">
              <SectionTitle
                eyebrow="Match summary"
                title="Ranked for your profile"
                description="A quick snapshot of how many roles are ready for you right now."
              />
              <div id="match-summary-title" className="mt-6">
                <MatchSummary />
              </div>
            </motion.section>

            <motion.section {...reveal} className="mt-10" aria-labelledby="filters-title">
              <SectionTitle
                eyebrow="Search and refine"
                title="Smart filters"
                description="Narrow internships by skill fit, location, work mode, and ranking signal."
              />
              <div id="filters-title" className="mt-6">
                <FilterBar
                  search={search}
                  onSearchChange={setSearch}
                  categoryFilters={categoryFilters}
                  selectedCategories={selectedCategories}
                  onToggleCategory={(category) => toggleValue(selectedCategories, category, setSelectedCategories)}
                  modeFilters={modeFilters}
                  selectedModes={selectedModes}
                  onToggleMode={(mode) => toggleValue(selectedModes, mode, setSelectedModes)}
                  location={location}
                  onLocationChange={setLocation}
                  sortBy={sortBy}
                  onSortByChange={setSortBy}
                  onClearFilters={clearFilters}
                />
              </div>
            </motion.section>

            <div className="mt-10 grid gap-6 xl:grid-cols-[minmax(0,1.6fr)_minmax(340px,0.9fr)]">
              <motion.section {...reveal} aria-labelledby="internships-title">
                <SectionTitle
                  eyebrow="Best fits"
                  title="Internship recommendations"
                  description="The strongest matches from your current profile and preferences."
                />

                <div id="internships-title" className="mt-6 space-y-4">
                  {filteredInternships.length ? filteredInternships.map((internship) => (
                    <motion.div key={`${internship.company}-${internship.title}`} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.15 }} transition={{ duration: 0.35, ease: 'easeOut' }}>
                      <div className="relative">

                       <InternshipCard
                            internship={{
                                role: internship.title,
                                company: internship.company,
                                location: internship.location,
                                duration: internship.duration,
                                type: internship.type,
                                skills: internship.skills,
                                match: internship.match,
                                logoClass: internship.logoClass,
                                stipend: internship.stipend,
                            }}
                            />
                        <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-slate-500">
                          <span className="flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5">
                            <MapPin className="size-3.5" aria-hidden="true" />
                            {internship.location}
                          </span>
                          <span className="flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5">
                            <Clock3 className="size-3.5" aria-hidden="true" />
                            Posted {toDaysLabel(internship.postedDaysAgo)}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  )) : (
                    <Card className="p-8 text-center">
                      <p className="text-lg font-semibold text-slate-100">No internships match the current filters.</p>
                      <p className="mt-2 text-sm text-slate-400">Try clearing the filters or broadening your search to see more opportunities.</p>
                      <Button className="mt-6" variant="secondary" onClick={clearFilters}>
                        Reset Filters
                      </Button>
                    </Card>
                  )}
                </div>
              </motion.section>

              <div className="space-y-6">
                <motion.section {...reveal} aria-labelledby="ai-insights-title">
                  <Card className="relative overflow-hidden p-6">
                    <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_85%_10%,rgba(6,182,212,0.18),transparent_28%),radial-gradient(circle_at_10%_0%,rgba(139,92,246,0.2),transparent_32%)]" />
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[#06B6D4]">AI insights</p>
                        <h2 id="ai-insights-title" className="mt-2 text-xl font-semibold">What will improve your match?</h2>
                      </div>
                      <span className="grid size-11 place-items-center rounded-xl bg-[#8B5CF6]/12 text-[#D8B4FE]">
                        <Bot className="size-5" aria-hidden="true" />
                      </span>
                    </div>

                    <div className="mt-6 space-y-4">
                      {[
                        { label: 'Top matching skill', value: 'React.js', icon: Sparkles, tone: 'purple' },
                        { label: 'Missing skill', value: 'System Design', icon: Target, tone: 'cyan' },
                        { label: 'Learning path', value: 'Frontend → Advanced React → System Design', icon: BookOpen, tone: 'purple' },
                        { label: 'Improvement tip', value: 'Add 2 projects to increase your match score by 12%.', icon: WandSparkles, tone: 'cyan' },
                      ].map((item) => {
                        const cyan = item.tone === 'cyan'

                        return (
                          <div key={item.label} className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                            <div className="flex items-start gap-3">
                              <span className={`grid size-10 shrink-0 place-items-center rounded-xl ${cyan ? 'bg-[#06B6D4]/10 text-[#67E8F9]' : 'bg-[#8B5CF6]/10 text-[#D8B4FE]'}`}>
                                <item.icon className="size-4.5" aria-hidden="true" />
                              </span>
                              <div>
                                <p className="text-xs font-semibold uppercase tracking-[0.15em] text-slate-500">{item.label}</p>
                                <p className="mt-1.5 text-sm leading-6 text-slate-100">{item.value}</p>
                              </div>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </Card>
                </motion.section>

                <motion.section {...reveal} aria-labelledby="companies-title">
                  <Card className="p-6">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[#A78BFA]">Recommended companies</p>
                        <h2 id="companies-title" className="mt-2 text-xl font-semibold">Teams hiring right now</h2>
                      </div>
                      <span className="grid size-11 place-items-center rounded-xl bg-[#06B6D4]/10 text-[#67E8F9]">
                        <BriefcaseBusiness className="size-5" aria-hidden="true" />
                      </span>
                    </div>

                    <div className="mt-6 space-y-3">
                      {companies.map((company) => (
                        <div key={company.name} className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 transition hover:border-[#8B5CF6]/25 hover:bg-white/[0.045]">
                          <div className="flex items-start justify-between gap-4">
                            <div className="flex min-w-0 items-center gap-3">
                              <span className={`grid size-11 shrink-0 place-items-center rounded-xl text-sm font-bold ${company.accent === 'cyan' ? 'bg-[#06B6D4]/12 text-[#67E8F9]' : 'bg-[#8B5CF6]/12 text-[#E9D5FF]'}`}>
                                {company.name.charAt(0)}
                              </span>
                              <div className="min-w-0">
                                <p className="truncate font-semibold text-slate-100">{company.name}</p>
                                <p className="mt-1 text-xs text-slate-500">{company.status}</p>
                              </div>
                            </div>
                            <div className="rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 text-xs font-medium text-slate-300">
                              {company.count} open
                            </div>
                          </div>
                          <Button variant="secondary" size="sm" className="mt-4 w-full sm:w-auto">
                            View Opportunities
                          </Button>
                        </div>
                      ))}
                    </div>
                  </Card>
                </motion.section>
              </div>
            </div>
          </div>
        </main>
      </div>
    </MotionConfig>
  )
}

export default SmartMatch