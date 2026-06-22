import { BookText, BriefcaseBusiness, FolderKanban, GraduationCap, Lightbulb, Sparkles, UserRound, WandSparkles } from 'lucide-react'
import { Button, Input } from '../../../components'

const sections = [
  { key: 'fullName', label: 'Full Name', placeholder: 'Abhi Sharma', icon: UserRound },
  { key: 'email', label: 'Email', placeholder: 'abhi@example.com', icon: Sparkles },
  { key: 'phone', label: 'Phone', placeholder: '+91 98765 43210', icon: BriefcaseBusiness },
  { key: 'education', label: 'Education', placeholder: 'B.Tech in Computer Science, 2026', icon: GraduationCap, multiline: true },
  { key: 'skills', label: 'Skills', placeholder: 'React, TypeScript, Tailwind, Framer Motion', icon: Lightbulb, multiline: true },
  { key: 'projects', label: 'Projects', placeholder: 'Built a student career dashboard with AI matching...', icon: FolderKanban, multiline: true },
  { key: 'experience', label: 'Experience', placeholder: 'Frontend Intern at Nova Labs - improved...', icon: BriefcaseBusiness, multiline: true },
  { key: 'achievements', label: 'Achievements', placeholder: 'Placed in top 5 of hackathon, earned AWS badge...', icon: BookText, multiline: true },
]

function ResumeBuilderForm({ data, onChange, onSaveDraft, onGenerateResume }) {
  return (
    <div className="space-y-4">
      {sections.map((section) => {
        const value = data[section.key] ?? ''

        return (
          <div key={section.key} className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
            <label className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-200">
              <span className="grid size-8 place-items-center rounded-lg bg-[#8B5CF6]/10 text-[#D8B4FE]">
                <section.icon className="size-4" aria-hidden="true" />
              </span>
              {section.label}
            </label>
            {section.multiline ? (
              <textarea
                value={value}
                onChange={(event) => onChange(section.key, event.target.value)}
                placeholder={section.placeholder}
                rows={section.key === 'projects' ? 4 : 3}
                className="min-h-24 w-full rounded-xl border border-slate-700 bg-[#1E293B]/70 px-4 py-3 text-base text-slate-50 outline-none transition placeholder:text-slate-500 hover:border-slate-600 focus:border-[#8B5CF6] focus:ring-2 focus:ring-[#8B5CF6]/20"
              />
            ) : (
              <Input
                value={value}
                onChange={(event) => onChange(section.key, event.target.value)}
                placeholder={section.placeholder}
              />
            )}
          </div>
        )
      })}

      <div className="grid gap-3 pt-2 sm:grid-cols-2">
        <Button variant="secondary" className="w-full" onClick={onSaveDraft} leftIcon={WandSparkles}>
          Save Draft
        </Button>
        <Button className="w-full" onClick={onGenerateResume} leftIcon={Sparkles}>
          Generate Resume
        </Button>
      </div>
    </div>
  )
}

export default ResumeBuilderForm