import { BriefcaseBusiness, Sparkles, TrendingUp } from 'lucide-react'
import { Card } from '../../../components'

const summaryItems = [
  {
    value: '128',
    label: 'AI Matches',
    description: 'Internships ranked for your current profile.',
    icon: Sparkles,
    accent: 'purple',
  },
  {
    value: '86%',
    label: 'Profile Strength',
    description: 'You are close to a stronger match score.',
    icon: TrendingUp,
    accent: 'cyan',
  },
  {
    value: '24',
    label: 'New Opportunities',
    description: 'Fresh listings added in the last 7 days.',
    icon: BriefcaseBusiness,
    accent: 'purple',
  },
]

function MatchSummary() {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {summaryItems.map((item, index) => {
        const cyan = item.accent === 'cyan'

        return (
          <Card key={item.label} interactive padding="none" className="group relative overflow-hidden p-5 sm:p-6">
            <div className={`absolute -right-10 -top-10 size-28 rounded-full blur-3xl transition-opacity duration-300 group-hover:opacity-100 ${cyan ? 'bg-[#06B6D4]/12' : 'bg-[#8B5CF6]/14'}`} />
            <div className="relative flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-medium text-slate-400">{item.label}</p>
                <p className="mt-3 text-3xl font-bold tracking-[-0.04em] text-slate-50">{item.value}</p>
              </div>
              <span className={`grid size-11 place-items-center rounded-xl border ${cyan ? 'border-[#06B6D4]/20 bg-[#06B6D4]/10 text-[#22D3EE]' : 'border-[#8B5CF6]/20 bg-[#8B5CF6]/10 text-[#A78BFA]'}`}>
                <item.icon className="size-5" aria-hidden="true" />
              </span>
            </div>
            <p className="relative mt-4 max-w-sm text-sm leading-6 text-slate-400">{item.description}</p>
            <div className="relative mt-5 flex items-center gap-2 text-xs font-medium text-emerald-400">
                <span className="size-1.5 rounded-full bg-emerald-400" />
                {index === 0 && '+12 new matches this week'}
                {index === 1 && '+4% profile improvement'}
                {index === 2 && '+24 opportunities added'}
             </div>
          </Card>
        )
      })}
    </div>
  )
}

export default MatchSummary