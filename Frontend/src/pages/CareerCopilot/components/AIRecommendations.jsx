import { Card, Button } from '../../../components'
import { Sparkles, ArrowRight } from 'lucide-react'

export default function AIRecommendations({ recommendations, onExecuteRecommendation }) {
  return (
    <Card>
      <div className="flex items-center gap-2 border-b border-white/[0.06] pb-3">
        <Sparkles className="size-4 text-amber-400" />
        <h3 className="text-sm font-semibold text-slate-200">AI recommendations</h3>
      </div>

      <div className="mt-4 space-y-2.5">
        {recommendations.map((r, i) => (
          <div 
            key={i} 
            onClick={() => onExecuteRecommendation(r)}
            className="group flex flex-col gap-2 rounded-xl border border-white/[0.03] bg-white/[0.01] p-3 transition hover:border-[#8B5CF6]/30 hover:bg-white/[0.03] cursor-pointer"
          >
            <div className="flex items-start justify-between gap-2">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider text-[9px] bg-slate-800/80 px-2 py-0.5 rounded">
                {r.type}
              </span>
              <ArrowRight className="size-3 text-slate-500 transition group-hover:translate-x-1 group-hover:text-[#8B5CF6]" />
            </div>
            <p className="text-sm text-slate-300 leading-relaxed font-medium">
              {r.text}
            </p>
            <span className="text-[11px] text-[#C4B5FD] font-semibold">
              {r.actionLabel}
            </span>
          </div>
        ))}
        {recommendations.length === 0 && (
          <div className="py-6 text-center text-xs text-slate-500">
            All caught up! No recommendations at this time.
          </div>
        )}
      </div>
    </Card>
  )
}

