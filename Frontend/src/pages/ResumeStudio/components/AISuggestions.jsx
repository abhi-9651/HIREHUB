import { AlertTriangle, Lightbulb, Sparkles, Target, TrendingUp } from 'lucide-react'
import { Card } from '../../../components'

const missingSkills = ['Node.js', 'MongoDB', 'System Design']
const suggestions = ['Add one backend project', 'Improve project descriptions', 'Add measurable achievements']
const atsTips = ['Use stronger action verbs', 'Add relevant keywords']

function AISuggestions() {
  return (
    <div className="space-y-4">
      <Card className="p-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[#06B6D4]">AI analyzer</p>
            <h3 className="mt-2 text-xl font-semibold text-slate-50">What to improve next</h3>
          </div>
          <span className="grid size-11 place-items-center rounded-xl bg-[#8B5CF6]/12 text-[#D8B4FE]">
            <Sparkles className="size-5" aria-hidden="true" />
          </span>
        </div>

        <div className="mt-6 space-y-5">
          <section>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-[#A78BFA]">
              <AlertTriangle className="size-3.5" aria-hidden="true" />
              Missing skills
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              {missingSkills.map((skill) => (
                <span key={skill} className="rounded-full border border-[#06B6D4]/20 bg-[#06B6D4]/10 px-3 py-1.5 text-xs font-medium text-[#67E8F9]">
                  {skill}
                </span>
              ))}
            </div>
          </section>

          <section>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-[#A78BFA]">
              <Lightbulb className="size-3.5" aria-hidden="true" />
              Suggestions
            </div>
            <ul className="mt-3 space-y-2.5">
              {suggestions.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm leading-6 text-slate-300">
                  <Target className="mt-0.5 size-4 shrink-0 text-[#22D3EE]" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          </section>

          <section>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-[#A78BFA]">
              <TrendingUp className="size-3.5" aria-hidden="true" />
              ATS tips
            </div>
            <ul className="mt-3 space-y-2.5">
              {atsTips.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm leading-6 text-slate-300">
                  <Sparkles className="mt-0.5 size-4 shrink-0 text-emerald-400" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          </section>
        </div>
      </Card>

      <Card className="p-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[#06B6D4]">AI improvement insights</p>
            <h3 className="mt-2 text-xl font-semibold text-slate-50">Estimated impact</h3>
          </div>
          <span className="grid size-11 place-items-center rounded-xl bg-[#06B6D4]/10 text-[#67E8F9]">
            <TrendingUp className="size-5" aria-hidden="true" />
          </span>
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          {[
            { label: 'Match increase', value: '+12%' },
            { label: 'ATS improvement', value: '+8%' },
          ].map((item) => (
            <div key={item.label} className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.15em] text-slate-500">{item.label}</p>
              <p className="mt-3 text-2xl font-bold tracking-[-0.04em] text-slate-50">{item.value}</p>
            </div>
          ))}
        </div>

        <div className="mt-4 rounded-2xl border border-[#8B5CF6]/20 bg-[#8B5CF6]/10 p-4 text-sm leading-6 text-slate-200">
          Recommended next step: <span className="font-semibold text-white">Add a MERN project</span>.
        </div>
      </Card>
    </div>
  )
}

export default AISuggestions