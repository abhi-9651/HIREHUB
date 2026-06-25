import { Card } from '../../../components'
import { CheckSquare, Square } from 'lucide-react'

export default function InterviewReadiness({ tasks, onToggleTask }) {
  const completedCount = tasks.filter(t => t.checked).length
  const score = tasks.length > 0 ? Math.round((completedCount / tasks.length) * 100) : 0

  return (
    <Card id="copilot-readiness">
      <div className="flex items-center justify-between border-b border-white/[0.06] pb-3">
        <div>
          <h3 className="text-sm font-semibold text-slate-200">Interview readiness</h3>
          <p className="mt-0.5 text-[11px] text-slate-400">Complete tasks to increase preparation level</p>
        </div>
        <div className="text-right">
          <span className="text-lg font-bold text-[#06B6D4]">{score}%</span>
          <p className="text-[10px] text-slate-500 uppercase font-semibold">Ready</p>
        </div>
      </div>

      <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-[#0F172A]">
        <div 
          style={{ width: `${score}%` }} 
          className="h-full rounded-full bg-gradient-to-r from-[#06B6D4] to-[#8B5CF6] transition-all duration-300"
        />
      </div>

      <ul className="mt-4 space-y-2.5">
        {tasks.map((t) => (
          <li 
            key={t.id} 
            className="flex items-start gap-3 rounded-xl border border-white/[0.02] bg-white/[0.01] p-3 transition hover:border-white/[0.06]"
          >
            <button 
              onClick={() => onToggleTask(t.id)}
              className="flex items-start gap-3 text-left transition outline-none cursor-pointer mt-0.5"
            >
              {t.checked ? (
                <CheckSquare className="size-5 shrink-0 text-[#06B6D4] mt-0.5" />
              ) : (
                <Square className="size-5 shrink-0 text-slate-500 hover:text-[#8B5CF6] mt-0.5" />
              )}
              <span className={`text-sm text-slate-300 transition ${t.checked ? 'text-slate-500 line-through' : ''}`}>
                {t.text}
              </span>
            </button>
          </li>
        ))}
      </ul>
    </Card>
  )
}

