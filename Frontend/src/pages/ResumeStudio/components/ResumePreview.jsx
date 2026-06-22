import { BadgeCheck, BriefcaseBusiness, FolderKanban, GraduationCap, Lightbulb, UserRound } from 'lucide-react'
import { Card } from '../../../components'

const previewSections = [
  { key: 'education', label: 'Education', icon: GraduationCap },
  { key: 'skills', label: 'Skills', icon: Lightbulb },
  { key: 'projects', label: 'Projects', icon: FolderKanban },
  { key: 'experience', label: 'Experience', icon: BriefcaseBusiness },
  { key: 'achievements', label: 'Achievements', icon: BadgeCheck },
]

function parseList(value) {
  return value
    .split(/\n|,/) 
    .map((item) => item.trim())
    .filter(Boolean)
}

function ResumePreview({ data }) {
  const skills = parseList(data.skills)
  const projects = parseList(data.projects)
  const experience = parseList(data.experience)
  const achievements = parseList(data.achievements)

  return (
    <Card className="h-full overflow-hidden p-0">
      <div className="border-b border-white/10 bg-[#111827]/70 p-6">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#06B6D4]">Live Preview</p>
            <h3 className="mt-2 truncate text-2xl font-bold tracking-[-0.04em] text-slate-50">{data.fullName || 'Your Name'}</h3>
            <p className="mt-2 text-sm leading-6 text-slate-400">{data.email || 'your.email@example.com'} · {data.phone || '+91 00000 00000'}</p>
          </div>
          <div className="grid size-12 place-items-center rounded-2xl bg-gradient-to-br from-[#8B5CF6] to-[#06B6D4] text-white">
            <UserRound className="size-6" aria-hidden="true" />
          </div>
        </div>
        <div className="mt-5 rounded-2xl border border-[#8B5CF6]/20 bg-[#8B5CF6]/10 p-4 text-sm leading-6 text-slate-200">
          AI-optimized candidate summary: motivated student building modern web experiences with a strong focus on React, product thinking, and polished UI delivery.
        </div>
      </div>

      <div className="space-y-5 p-6">
        <section>
          <h4 className="text-xs font-semibold uppercase tracking-[0.16em] text-[#A78BFA]">Summary</h4>
          <p className="mt-3 text-sm leading-7 text-slate-300">
            {data.fullName || 'This candidate'} is a product-minded student focused on building clean, responsive interfaces and shipping internship-ready projects.
          </p>
        </section>

        {previewSections.map((section) => {
          const value = data[section.key] ?? ''
          const items = section.key === 'skills' ? skills : section.key === 'projects' ? projects : section.key === 'experience' ? experience : section.key === 'achievements' ? achievements : parseList(value)

          return (
            <section key={section.key} className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-[#06B6D4]">
                <section.icon className="size-3.5" aria-hidden="true" />
                {section.label}
              </div>
              <div className="mt-3 space-y-2">
                {items.length ? items.map((item) => <p key={item} className="text-sm leading-6 text-slate-300">{item}</p>) : <p className="text-sm leading-6 text-slate-500">No {section.label.toLowerCase()} added yet.</p>}
              </div>
            </section>
          )
        })}
      </div>
    </Card>
  )
}

export default ResumePreview