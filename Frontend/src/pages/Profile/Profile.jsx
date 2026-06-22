import {
  UserRound,
  GraduationCap,
  Sparkles,
  BriefcaseBusiness,
  Target,
  TrendingUp,
} from 'lucide-react'

import { Card, SectionTitle } from '../../components'

const skills = {
  Frontend: ['HTML', 'CSS', 'JavaScript', 'React', 'Tailwind'],
  Backend: ['Node.js', 'Express', 'MongoDB'],
  Programming: ['C++', 'Java', 'DSA', 'Git'],
}

export default function Profile() {
  return (
    <div className="min-h-screen bg-[#0F172A] px-4 py-8 sm:px-6 md:px-8 xl:px-10">
      <div className="mx-auto max-w-[1600px] space-y-8">

        {/* HERO */}

        <Card className="p-8">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-center gap-5">
              <div className="grid h-24 w-24 place-items-center rounded-3xl bg-gradient-to-br from-[#8B5CF6] to-[#06B6D4]">
                <UserRound className="h-12 w-12 text-white" />
              </div>

              <div>
                <h1 className="text-4xl font-bold text-white">
                  Abhi
                </h1>

                <p className="mt-2 text-slate-400">
                  B.Tech CSE Student • MMMUT Gorakhpur
                </p>

                <p className="mt-1 text-slate-500">
                  Aspiring Software Engineer • MERN Stack Developer
                </p>

                <p className="mt-3 max-w-xl text-slate-400">
                  Building full-stack web applications, solving DSA problems,
                  and preparing for internship opportunities.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
              <Card padding="sm">
                <p className="text-3xl font-bold text-[#8B5CF6]">86%</p>
                <p className="text-sm text-slate-400">Profile Score</p>
              </Card>

              <Card padding="sm">
                <p className="text-3xl font-bold text-[#06B6D4]">87%</p>
                <p className="text-sm text-slate-400">Match Rate</p>
              </Card>

              <Card padding="sm">
                <p className="text-3xl font-bold text-[#8B5CF6]">18</p>
                <p className="text-sm text-slate-400">Skills</p>
              </Card>

              <Card padding="sm">
                <p className="text-3xl font-bold text-[#06B6D4]">12</p>
                <p className="text-sm text-slate-400">Applications</p>
              </Card>
            </div>
          </div>
        </Card>

        {/* TITLE */}

        <SectionTitle
          eyebrow="Career Identity"
          title="Profile Overview"
          description="Your academic background, skills, projects, resume health, and AI-powered career insights."
        />

        {/* GRID */}

        <div className="grid gap-6 lg:grid-cols-3">

          {/* PROFILE COMPLETION */}

          <Card className="p-6">
            <h2 className="mb-6 text-xl font-semibold text-white">
              Profile Completion
            </h2>

            <div className="space-y-4">
              {[
                ['Education', 'Completed'],
                ['Skills', 'Completed'],
                ['Projects', 'Completed'],
                ['Resume', 'Uploaded'],
                ['Experience', 'Pending'],
                ['Certifications', 'Pending'],
              ].map(([label, status]) => (
                <div
                  key={label}
                  className="flex items-center justify-between"
                >
                  <span className="text-slate-300">
                    {label}
                  </span>

                  <span
                    className={
                      status === 'Pending'
                        ? 'text-amber-400'
                        : 'text-emerald-400'
                    }
                  >
                    {status}
                  </span>
                </div>
              ))}
            </div>
          </Card>

          {/* SKILLS */}

          <Card className="p-6">
            <h2 className="mb-6 text-xl font-semibold text-white">
              Skills
            </h2>

            <div className="space-y-5">
              {Object.entries(skills).map(([category, values]) => (
                <div key={category}>
                  <p className="mb-3 text-sm font-medium uppercase tracking-wider text-[#06B6D4]">
                    {category}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {values.map((skill) => (
                      <span
                        key={skill}
                        className="rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2 text-sm text-slate-300"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* AI INSIGHTS */}

          <Card className="p-6">
            <div className="mb-4 flex items-center gap-2">
              <Sparkles className="text-[#8B5CF6]" />
              <h2 className="text-xl font-semibold text-white">
                AI Insights
              </h2>
            </div>

            <p className="font-medium text-slate-300">
              Missing Skills
            </p>

            <div className="mt-3 flex flex-wrap gap-2">
              {['System Design', 'TypeScript', 'Backend APIs'].map(
                (skill) => (
                  <span
                    key={skill}
                    className="rounded-full bg-[#06B6D4]/10 px-3 py-1 text-sm text-[#06B6D4]"
                  >
                    {skill}
                  </span>
                ),
              )}
            </div>

            <p className="mt-6 text-sm text-slate-400">
              Recommended Next Step
            </p>

            <p className="mt-1 font-semibold text-white">
              Build a production-ready MERN project.
            </p>

            <div className="mt-6 rounded-xl border border-[#8B5CF6]/20 bg-[#8B5CF6]/10 p-4">
              <p className="text-sm text-slate-300">
                Career Readiness
              </p>

              <p className="mt-1 text-2xl font-bold text-[#A78BFA]">
                78%
              </p>
            </div>
          </Card>

          {/* EDUCATION */}

          <Card className="p-6">
            <div className="mb-4 flex items-center gap-2">
              <GraduationCap />
              <h2 className="text-xl font-semibold text-white">
                Education
              </h2>
            </div>

            <p className="text-lg font-semibold text-slate-200">
              MMMUT Gorakhpur
            </p>

            <p className="mt-2 text-slate-400">
              B.Tech Computer Science & Engineering
            </p>

            <p className="mt-1 text-slate-500">
              2024 - 2028
            </p>
          </Card>

          {/* PROJECTS */}

          <Card className="p-6">
            <div className="mb-4 flex items-center gap-2">
              <BriefcaseBusiness />
              <h2 className="text-xl font-semibold text-white">
                Projects
              </h2>
            </div>

            <div className="space-y-3">
              {[
                {
                  name: 'HireHub',
                  desc: 'AI-powered internship discovery platform.',
                },
                {
                  name: 'EduSmaran',
                  desc: 'Smart attendance and curriculum planner.',
                },
                {
                  name: 'Career Copilot',
                  desc: 'AI-guided career assistant dashboard.',
                },
                {
                  name: 'Resume Studio',
                  desc: 'ATS-friendly resume builder.',
                },
              ].map((project) => (
                <div
                  key={project.name}
                  className="rounded-xl border border-white/10 bg-white/[0.03] p-4"
                >
                  <h3 className="font-medium text-white">
                    {project.name}
                  </h3>

                  <p className="mt-1 text-sm text-slate-400">
                    {project.desc}
                  </p>
                </div>
              ))}
            </div>
          </Card>

          {/* CAREER GOALS */}

          <Card className="p-6">
            <div className="mb-4 flex items-center gap-2">
              <Target />
              <h2 className="text-xl font-semibold text-white">
                Career Goals
              </h2>
            </div>

            <div className="space-y-4 text-slate-300">
              <div>
                <p className="text-sm text-slate-500">
                  Target Role
                </p>
                <p>Software Engineer</p>
              </div>

              <div>
                <p className="text-sm text-slate-500">
                  Preferred Domain
                </p>
                <p>Full Stack Development</p>
              </div>

              <div>
                <p className="text-sm text-slate-500">
                  Work Preference
                </p>
                <p>Remote / Hybrid</p>
              </div>

              <div>
                <p className="text-sm text-slate-500">
                  Expected Stipend
                </p>
                <p>₹20k+</p>
              </div>
            </div>
          </Card>

          {/* RESUME ANALYTICS */}

          <Card className="p-6 lg:col-span-3">
            <div className="mb-4 flex items-center gap-2">
              <TrendingUp className="text-[#06B6D4]" />
              <h2 className="text-xl font-semibold text-white">
                Resume Analytics
              </h2>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              {[
                ['Resume Score', '86%', '86%', '#8B5CF6'],
                ['ATS Compatibility', '92%', '92%', '#06B6D4'],
                ['Skill Relevance', '84%', '84%', '#10B981'],
              ].map(([label, value, width, color]) => (
                <div key={label}>
                  <div className="mb-2 flex justify-between text-sm">
                    <span className="text-slate-300">
                      {label}
                    </span>

                    <span style={{ color }}>
                      {value}
                    </span>
                  </div>

                  <div className="h-2 rounded-full bg-slate-800">
                    <div
                      className="h-2 rounded-full"
                      style={{
                        width,
                        backgroundColor: color,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* RECENT ACTIVITY */}

        <Card className="p-6">
          <div className="mb-6 flex items-center gap-2">
            <TrendingUp />
            <h2 className="text-xl font-semibold text-white">
              Recent Activity
            </h2>
          </div>

          <div className="space-y-5">
            <div>
              <p className="text-xs uppercase tracking-widest text-[#06B6D4]">
                Today
              </p>
              <p className="mt-1 text-slate-300">
                Resume updated successfully
              </p>
            </div>

            <div>
              <p className="text-xs uppercase tracking-widest text-[#06B6D4]">
                Yesterday
              </p>
              <p className="mt-1 text-slate-300">
                Applied to Frontend Internship
              </p>
            </div>

            <div>
              <p className="text-xs uppercase tracking-widest text-[#06B6D4]">
                2 Days Ago
              </p>
              <p className="mt-1 text-slate-300">
                Completed React Roadmap milestone
              </p>
            </div>

            <div>
              <p className="text-xs uppercase tracking-widest text-[#06B6D4]">
                3 Days Ago
              </p>
              <p className="mt-1 text-slate-300">
                Profile score increased to 86%
              </p>
            </div>
          </div>
        </Card>

      </div>
    </div>
  )
}