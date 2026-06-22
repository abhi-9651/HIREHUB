import { ArrowUpRight } from 'lucide-react'
import { Card } from '../../../components'

function ResumeScoreCard({ label, value, change, icon: Icon, accent = 'purple' }) {
  const cyan = accent === 'cyan'

  return (
    <Card interactive padding="none" className="group relative overflow-hidden p-5 sm:p-6">
      <div className={`absolute -right-10 -top-10 size-28 rounded-full blur-3xl transition-opacity duration-300 group-hover:opacity-100 ${cyan ? 'bg-[#06B6D4]/12' : 'bg-[#8B5CF6]/14'}`} />
      <div className="relative flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-slate-400">{label}</p>
          <p className="mt-3 text-3xl font-bold tracking-[-0.04em] text-slate-50">{value}</p>
        </div>
        <span className={`grid size-11 place-items-center rounded-xl border ${cyan ? 'border-[#06B6D4]/20 bg-[#06B6D4]/10 text-[#22D3EE]' : 'border-[#8B5CF6]/20 bg-[#8B5CF6]/10 text-[#A78BFA]'}`}>
          <Icon className="size-5" aria-hidden="true" />
        </span>
      </div>
      <div className="relative mt-5 flex items-center gap-1.5 text-xs font-medium text-emerald-400">
        <ArrowUpRight className="size-3.5" aria-hidden="true" />
        {change}
        <span className="font-normal text-slate-500">this week</span>
      </div>
    </Card>
  )
}

export default ResumeScoreCard