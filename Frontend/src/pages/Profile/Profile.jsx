import { useState, useEffect } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { MotionConfig, motion } from 'framer-motion'
import {
  UserRound,
  GraduationCap,
  Sparkles,
  BriefcaseBusiness,
  Target,
  TrendingUp,
  LayoutDashboard,
  Bot,
  FileText,
  Pencil,
  Plus,
  Trash2,
  Save,
  X,
  CheckCircle2,
} from 'lucide-react'

import { Button, Card, Input, SectionTitle, Sidebar } from '../../components'
import { getProfile, saveProfile, calculateProfileScore, syncProfileWithBackend } from '../../utils/profileStorage'

const sidebarItems = [
  { label: 'Dashboard', to: '/dashboard', icon: LayoutDashboard },
  { label: 'Smart Match', to: '/internships', icon: BriefcaseBusiness },
  { label: 'Resume Studio', to: '/resume-studio', icon: FileText },
  { label: 'Career Copilot', to: '/career-copilot', icon: Bot },
  { label: 'Profile', to: '/profile', icon: UserRound, end: true },
]

const reveal = {
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.12 },
  transition: { duration: 0.45, ease: 'easeOut' },
}

export default function Profile() {
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()
  const [profile, setProfile] = useState(null)
  const [isEditing, setIsEditing] = useState(false)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  
  // Temporary edit form state
  const [tempProfile, setTempProfile] = useState(null)
  const [skillsInput, setSkillsInput] = useState({
    Frontend: '',
    Backend: '',
    Programming: '',
  })
  
  const [showSuccessToast, setShowSuccessToast] = useState(false)

  useEffect(() => {
    const loadedProfile = getProfile()
    setProfile(loadedProfile)
    
    if (searchParams.get('edit') === 'true') {
      setIsEditing(true)
      initEditState(loadedProfile)
    }
  }, [searchParams])

  useEffect(() => {
    syncProfileWithBackend().then(p => {
      if (p) {
        setProfile(p)
      }
    })
  }, [])

  const initEditState = (sourceProfile) => {
    const copy = JSON.parse(JSON.stringify(sourceProfile))
    setTempProfile(copy)
    setSkillsInput({
      Frontend: copy.skills?.Frontend?.join(', ') || '',
      Backend: copy.skills?.Backend?.join(', ') || '',
      Programming: copy.skills?.Programming?.join(', ') || '',
    })
  }

  const handleEditClick = () => {
    initEditState(profile)
    setIsEditing(true)
    setSearchParams({ edit: 'true' })
  }

  const handleCancelClick = () => {
    setIsEditing(false)
    setSearchParams({})
  }

  const handleSave = (e) => {
    e.preventDefault()
    
    // Parse skills inputs
    const parsedSkills = {
      Frontend: skillsInput.Frontend.split(',').map(s => s.trim()).filter(Boolean),
      Backend: skillsInput.Backend.split(',').map(s => s.trim()).filter(Boolean),
      Programming: skillsInput.Programming.split(',').map(s => s.trim()).filter(Boolean),
    }

    const updatedProfile = {
      ...tempProfile,
      skills: parsedSkills,
    }

    // Save profile to storage
    saveProfile(updatedProfile)
    setProfile(updatedProfile)
    setIsEditing(false)
    setSearchParams({})

    // Show visual success feedback
    setShowSuccessToast(true)
    setTimeout(() => setShowSuccessToast(false), 3000)
  }

  const handleFieldChange = (field, value) => {
    setTempProfile(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleGoalChange = (field, value) => {
    setTempProfile(prev => ({
      ...prev,
      goals: {
        ...prev.goals,
        [field]: value
      }
    }))
  }

  const handleProjectChange = (index, field, value) => {
    setTempProfile(prev => {
      const updatedProjects = [...prev.projects]
      updatedProjects[index] = {
        ...updatedProjects[index],
        [field]: value
      }
      return {
        ...prev,
        projects: updatedProjects
      }
    })
  }

  const handleAddProject = () => {
    setTempProfile(prev => ({
      ...prev,
      projects: [...prev.projects, { name: '', desc: '' }]
    }))
  }

  const handleRemoveProject = (index) => {
    setTempProfile(prev => ({
      ...prev,
      projects: prev.projects.filter((_, i) => i !== index)
    }))
  }

  if (!profile) {
    return (
      <div className="flex h-screen items-center justify-center bg-[#0F172A] text-slate-400">
        Loading Profile...
      </div>
    )
  }

  const profileScore = calculateProfileScore(profile)

  const handleLogout = () => {
    localStorage.removeItem('hirehub_session')
    navigate('/')
  }

  return (
    <MotionConfig reducedMotion="user">
      <div className="flex h-screen overflow-hidden bg-[#0F172A] text-slate-50">
        <Sidebar
          items={sidebarItems}
          collapsed={sidebarCollapsed}
          onCollapsedChange={setSidebarCollapsed}
          user={{ name: profile.name, email: profile.headline }}
          onLogout={handleLogout}
          className="bg-[#0B1120]/95"
        />

        <main className="h-screen min-w-0 flex-1 overflow-y-auto">
          <header className="sticky top-0 z-30 border-b border-white/[0.07] bg-[#0F172A]/85 backdrop-blur-xl">
            <div className="mx-auto flex h-20 max-w-[1600px] items-center justify-between gap-4 px-4 pl-18 sm:px-6 sm:pl-20 md:px-8 md:pl-8 xl:px-10">
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-slate-200">
                  {isEditing ? 'Settings & Personalization' : 'Career Identity'}
                </p>
                <p className="mt-0.5 text-xs text-slate-500">
                  {isEditing ? 'Configure your profile details below' : 'Your professional representation on HireHub'}
                </p>
              </div>

              {!isEditing && (
                <Button
                  onClick={handleEditClick}
                  leftIcon={Pencil}
                  className="h-11 shadow-lg shadow-purple-950/20"
                >
                  Edit Profile
                </Button>
              )}
            </div>
          </header>

          <div className="relative mx-auto max-w-[1600px] px-4 py-8 sm:px-6 md:px-8 lg:py-10 xl:px-10">
            <div className="pointer-events-none absolute right-0 top-0 -z-0 size-96 rounded-full bg-[#8B5CF6]/[0.045] blur-[120px]" />
            <div className="pointer-events-none absolute left-0 bottom-0 -z-0 size-[32rem] rounded-full bg-[#06B6D4]/[0.035] blur-[120px]" />

            {showSuccessToast && (
              <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 rounded-2xl border border-emerald-500/30 bg-[#064E3B] p-4 text-emerald-200 shadow-2xl backdrop-blur-md">
                <CheckCircle2 className="size-5 text-emerald-400" />
                <span className="text-sm font-semibold">Profile updated successfully!</span>
              </div>
            )}

            {!isEditing ? (
              // VIEW MODE
              <div className="space-y-8">
                <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                  <Card className="p-8">
                    <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
                      <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
                        <div className="grid h-24 w-24 shrink-0 place-items-center rounded-3xl bg-gradient-to-br from-[#8B5CF6] to-[#06B6D4] shadow-lg shadow-purple-950/20">
                          <UserRound className="h-12 w-12 text-white" />
                        </div>

                        <div>
                          <h1 className="text-4xl font-bold text-white tracking-[-0.03em]">
                            {profile.name}
                          </h1>

                          <p className="mt-2 text-sm font-medium text-slate-300">
                            {profile.degree} • {profile.college}
                          </p>

                          <p className="mt-1 text-xs text-slate-500">
                            {profile.headline}
                          </p>

                          <p className="mt-3 max-w-xl text-sm leading-relaxed text-slate-400">
                            {profile.bio}
                          </p>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:w-auto">
                        <Card padding="sm" className="bg-[#1E293B]/45">
                          <p className="text-3xl font-bold text-[#8B5CF6]">{profileScore}%</p>
                          <p className="text-xs text-slate-400">Profile Score</p>
                        </Card>

                        <Card padding="sm" className="bg-[#1E293B]/45">
                          <p className="text-3xl font-bold text-[#06B6D4]">{profile.stats?.matchRate || 0}%</p>
                          <p className="text-xs text-slate-400">Match Rate</p>
                        </Card>

                        <Card padding="sm" className="bg-[#1E293B]/45">
                          <p className="text-3xl font-bold text-[#8B5CF6]">
                            {Object.values(profile.skills || {}).flat().length}
                          </p>
                          <p className="text-xs text-slate-400">Skills Added</p>
                        </Card>

                        <Card padding="sm" className="bg-[#1E293B]/45">
                          <p className="text-3xl font-bold text-[#06B6D4]">{profile.stats?.applications || 0}</p>
                          <p className="text-xs text-slate-400">Applications</p>
                        </Card>
                      </div>
                    </div>
                  </Card>
                </motion.div>

                <SectionTitle
                  eyebrow="Career Identity"
                  title="Profile Overview"
                  description="Your academic background, skills, projects, goals, and AI-powered recommendations."
                />

                <div className="grid gap-6 lg:grid-cols-3">
                  {/* EDUCATION */}
                  <Card className="p-6">
                    <div className="mb-4 flex items-center gap-2 border-b border-white/[0.05] pb-4">
                      <GraduationCap className="text-[#8B5CF6]" />
                      <h2 className="text-xl font-semibold text-white">Education</h2>
                    </div>

                    <p className="text-lg font-bold text-slate-200">{profile.college}</p>
                    <p className="mt-2 text-sm text-slate-400">{profile.degree}</p>
                    <p className="mt-1.5 text-xs text-slate-500">Graduation: {profile.duration}</p>
                  </Card>

                  {/* SKILLS */}
                  <Card className="p-6">
                    <div className="mb-4 flex items-center gap-2 border-b border-white/[0.05] pb-4">
                      <BriefcaseBusiness className="text-[#06B6D4]" />
                      <h2 className="text-xl font-semibold text-white">Skills</h2>
                    </div>

                    <div className="space-y-4">
                      {Object.entries(profile.skills || {}).map(([category, values]) => (
                        <div key={category}>
                          <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-[#06B6D4]">
                            {category}
                          </p>
                          <div className="flex flex-wrap gap-1.5">
                            {values.map((skill) => (
                              <span
                                key={skill}
                                className="rounded-lg border border-white/5 bg-white/[0.03] px-2.5 py-1 text-xs text-slate-300"
                              >
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </Card>

                  {/* CAREER GOALS */}
                  <Card className="p-6">
                    <div className="mb-4 flex items-center gap-2 border-b border-white/[0.05] pb-4">
                      <Target className="text-[#8B5CF6]" />
                      <h2 className="text-xl font-semibold text-white">Career Goals</h2>
                    </div>

                    <div className="space-y-4 text-sm text-slate-300">
                      <div>
                        <p className="text-xs text-slate-500">Target Role</p>
                        <p className="font-semibold text-slate-200">{profile.goals?.targetRole}</p>
                      </div>

                      <div>
                        <p className="text-xs text-slate-500">Preferred Domain</p>
                        <p className="font-semibold text-slate-200">{profile.goals?.preferredDomain}</p>
                      </div>

                      <div>
                        <p className="text-xs text-slate-500">Work Preference</p>
                        <p className="font-semibold text-slate-200">{profile.goals?.workPreference}</p>
                      </div>

                      <div>
                        <p className="text-xs text-slate-500">Expected Stipend</p>
                        <p className="font-semibold text-slate-200">{profile.goals?.expectedStipend}</p>
                      </div>
                    </div>
                  </Card>

                  {/* PROJECTS */}
                  <Card className="p-6 lg:col-span-2">
                    <div className="mb-4 flex items-center gap-2 border-b border-white/[0.05] pb-4">
                      <BriefcaseBusiness className="text-[#06B6D4]" />
                      <h2 className="text-xl font-semibold text-white">Projects</h2>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                      {profile.projects?.map((project) => (
                        <div
                          key={project.name}
                          className="rounded-xl border border-white/5 bg-white/[0.02] p-4 hover:border-white/10 transition"
                        >
                          <h3 className="font-semibold text-white">{project.name}</h3>
                          <p className="mt-2 text-xs leading-relaxed text-slate-400">{project.desc}</p>
                        </div>
                      ))}
                      {(!profile.projects || profile.projects.length === 0) && (
                        <p className="text-xs text-slate-500">No projects added yet.</p>
                      )}
                    </div>
                  </Card>

                  {/* AI INSIGHTS */}
                  <Card className="p-6">
                    <div className="mb-4 flex items-center gap-2 border-b border-white/[0.05] pb-4">
                      <Sparkles className="text-[#8B5CF6]" />
                      <h2 className="text-xl font-semibold text-white">AI Insights</h2>
                    </div>

                    <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                      Missing Skills
                    </p>
                    <div className="mt-2.5 flex flex-wrap gap-1.5">
                      {['System Design', 'TypeScript', 'Backend APIs'].map((skill) => (
                        <span
                          key={skill}
                          className="rounded-full bg-[#06B6D4]/10 px-2.5 py-1 text-xs font-medium text-[#22D3EE]"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>

                    <p className="mt-6 text-xs text-slate-500">Recommended Next Step</p>
                    <p className="mt-1.5 text-sm font-semibold text-slate-200">
                      Build a production-ready MERN project.
                    </p>

                    <div className="mt-6 rounded-xl border border-[#8B5CF6]/20 bg-[#8B5CF6]/10 p-4">
                      <p className="text-xs text-slate-400">Career Readiness Score</p>
                      <p className="mt-1 text-3xl font-extrabold text-[#A78BFA]">78%</p>
                    </div>
                  </Card>
                </div>
              </div>
            ) : (
              // EDIT MODE
              <motion.form onSubmit={handleSave} {...reveal} className="space-y-8">
                <Card className="p-6 sm:p-8">
                  <div className="flex items-center justify-between border-b border-white/[0.07] pb-5">
                    <h2 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
                      <UserRound className="text-[#8B5CF6]" /> Edit Profile Data
                    </h2>
                    <div className="flex gap-2">
                      <Button
                        type="button"
                        variant="secondary"
                        leftIcon={X}
                        onClick={handleCancelClick}
                        className="h-10"
                      >
                        Cancel
                      </Button>
                      <Button
                        type="submit"
                        leftIcon={Save}
                        className="h-10"
                      >
                        Save Changes
                      </Button>
                    </div>
                  </div>

                  <div className="mt-8 space-y-6">
                    {/* PERSONAL INFORMATION */}
                    <div>
                      <h3 className="text-sm font-semibold uppercase tracking-wider text-[#8B5CF6] mb-4">
                        1. Personal Details
                      </h3>
                      <div className="grid gap-4 sm:grid-cols-2">
                        <Input
                          label="Full Name"
                          required
                          value={tempProfile.name}
                          onChange={(e) => handleFieldChange('name', e.target.value)}
                        />
                        <Input
                          label="Professional Headline"
                          required
                          value={tempProfile.headline}
                          onChange={(e) => handleFieldChange('headline', e.target.value)}
                        />
                        <div className="sm:col-span-2">
                          <label className="mb-2 block text-sm font-medium text-slate-200">
                            Short Bio / Summary
                          </label>
                          <textarea
                            value={tempProfile.bio}
                            onChange={(e) => handleFieldChange('bio', e.target.value)}
                            className="w-full rounded-xl border border-slate-700 bg-[#1E293B]/70 p-4 text-sm text-slate-50 outline-none transition placeholder:text-slate-500 hover:border-slate-600 focus:border-[#8B5CF6] focus:ring-2 focus:ring-[#8B5CF6]/20"
                            rows={3}
                          />
                        </div>
                      </div>
                    </div>

                    <hr className="border-white/[0.07]" />

                    {/* EDUCATION */}
                    <div>
                      <h3 className="text-sm font-semibold uppercase tracking-wider text-[#06B6D4] mb-4">
                        2. Education & Academics
                      </h3>
                      <div className="grid gap-4 sm:grid-cols-3">
                        <Input
                          label="College / University"
                          required
                          value={tempProfile.college}
                          onChange={(e) => handleFieldChange('college', e.target.value)}
                        />
                        <Input
                          label="Degree / Course"
                          required
                          value={tempProfile.degree}
                          onChange={(e) => handleFieldChange('degree', e.target.value)}
                        />
                        <Input
                          label="Duration (e.g. 2024 - 2028)"
                          required
                          value={tempProfile.duration}
                          onChange={(e) => handleFieldChange('duration', e.target.value)}
                        />
                      </div>
                    </div>

                    <hr className="border-white/[0.07]" />

                    {/* SKILLS */}
                    <div>
                      <h3 className="text-sm font-semibold uppercase tracking-wider text-[#8B5CF6] mb-4">
                        3. Core Skills (Comma-separated)
                      </h3>
                      <div className="grid gap-4 sm:grid-cols-3">
                        <Input
                          label="Frontend Skills"
                          value={skillsInput.Frontend}
                          onChange={(e) => setSkillsInput(prev => ({ ...prev, Frontend: e.target.value }))}
                          placeholder="e.g. React, Tailwind, HTML5"
                        />
                        <Input
                          label="Backend Skills"
                          value={skillsInput.Backend}
                          onChange={(e) => setSkillsInput(prev => ({ ...prev, Backend: e.target.value }))}
                          placeholder="e.g. Node.js, Express, MongoDB"
                        />
                        <Input
                          label="Programming & Tools"
                          value={skillsInput.Programming}
                          onChange={(e) => setSkillsInput(prev => ({ ...prev, Programming: e.target.value }))}
                          placeholder="e.g. Git, C++, Java, Python"
                        />
                      </div>
                    </div>

                    <hr className="border-white/[0.07]" />

                    {/* PROJECTS */}
                    <div>
                      <h3 className="text-sm font-semibold uppercase tracking-wider text-[#06B6D4] mb-4">
                        4. Featured Projects
                      </h3>
                      <div className="space-y-4">
                        {tempProfile.projects?.map((project, index) => (
                          <div
                            key={index}
                            className="relative rounded-2xl border border-white/5 bg-[#1E293B]/20 p-5"
                          >
                            <button
                              type="button"
                              onClick={() => handleRemoveProject(index)}
                              className="absolute right-4 top-4 text-slate-500 hover:text-red-400 transition"
                              aria-label="Remove Project"
                            >
                              <Trash2 className="size-4" />
                            </button>
                            <div className="grid gap-4 sm:grid-cols-2">
                              <Input
                                label={`Project #${index + 1} Name`}
                                required
                                value={project.name}
                                onChange={(e) => handleProjectChange(index, 'name', e.target.value)}
                                placeholder="e.g. HireHub App"
                              />
                              <div className="sm:col-span-2">
                                <label className="mb-2 block text-sm font-medium text-slate-200">
                                  Description
                                </label>
                                <textarea
                                  required
                                  value={project.desc}
                                  onChange={(e) => handleProjectChange(index, 'desc', e.target.value)}
                                  className="w-full rounded-xl border border-slate-700 bg-[#1E293B]/70 p-3 text-sm text-slate-50 outline-none transition hover:border-slate-600 focus:border-[#8B5CF6] focus:ring-2 focus:ring-[#8B5CF6]/20"
                                  rows={2}
                                  placeholder="Describe the project goal, tech stack, and key metrics..."
                                />
                              </div>
                            </div>
                          </div>
                        ))}
                        <Button
                          type="button"
                          variant="secondary"
                          onClick={handleAddProject}
                          leftIcon={Plus}
                          className="w-full mt-2 border-dashed border-white/10 hover:border-white/20"
                        >
                          Add Project
                        </Button>
                      </div>
                    </div>

                    <hr className="border-white/[0.07]" />

                    {/* CAREER GOALS */}
                    <div>
                      <h3 className="text-sm font-semibold uppercase tracking-wider text-[#8B5CF6] mb-4">
                        5. Career Preference & Goals
                      </h3>
                      <div className="grid gap-4 sm:grid-cols-4">
                        <Input
                          label="Target Role"
                          value={tempProfile.goals?.targetRole}
                          onChange={(e) => handleGoalChange('targetRole', e.target.value)}
                        />
                        <Input
                          label="Preferred Domain"
                          value={tempProfile.goals?.preferredDomain}
                          onChange={(e) => handleGoalChange('preferredDomain', e.target.value)}
                        />
                        <div>
                          <label className="mb-2 block text-sm font-medium text-slate-200">
                            Work Preference
                          </label>
                          <select
                            value={tempProfile.goals?.workPreference}
                            onChange={(e) => handleGoalChange('workPreference', e.target.value)}
                            className="h-12 w-full rounded-xl border border-slate-700 bg-[#1E293B] px-4 text-sm text-slate-100 outline-none hover:border-slate-600 focus:border-[#8B5CF6] focus:ring-2 focus:ring-[#8B5CF6]/20"
                          >
                            <option value="Remote">Remote</option>
                            <option value="Hybrid">Hybrid</option>
                            <option value="Onsite">Onsite</option>
                            <option value="Remote / Hybrid">Remote / Hybrid</option>
                          </select>
                        </div>
                        <Input
                          label="Expected Stipend"
                          value={tempProfile.goals?.expectedStipend}
                          onChange={(e) => handleGoalChange('expectedStipend', e.target.value)}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 flex justify-end gap-3 border-t border-white/[0.07] pt-6">
                    <Button
                      type="button"
                      variant="secondary"
                      leftIcon={X}
                      onClick={handleCancelClick}
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      leftIcon={Save}
                    >
                      Save Changes
                    </Button>
                  </div>
                </Card>
              </motion.form>
            )}
          </div>
        </main>
      </div>
    </MotionConfig>
  )
}