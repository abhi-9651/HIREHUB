import { useState } from 'react'
import { Card, Button } from '../../../components'
import { ChevronDown, ChevronUp, CheckCircle, Play } from 'lucide-react'

export default function CareerRoadmap({ steps, onUpdateProgress }) {
  const [expandedId, setExpandedId] = useState(null)

  function toggleExpand(id) {
    setExpandedId(expandedId === id ? null : id)
  }

  return (
    <Card id="copilot-roadmap">
      <h3 className="text-sm font-semibold text-slate-200 border-b border-white/[0.06] pb-3">Career roadmap</h3>
      <div className="mt-4 space-y-4">
        {steps.map((s) => {
          const isExpanded = expandedId === s.id
          return (
            <div key={s.id} className="rounded-xl border border-white/[0.03] bg-white/[0.01] p-3 transition hover:border-white/[0.06]">
              <div 
                className="flex items-center justify-between text-sm text-slate-300 cursor-pointer"
                onClick={() => toggleExpand(s.id)}
              >
                <div className="flex items-center gap-2">
                  {s.progress === 100 ? (
                    <CheckCircle className="size-4 shrink-0 text-emerald-400 animate-pulse" />
                  ) : (
                    <Play className="size-3.5 shrink-0 text-[#8B5CF6]" />
                  )}
                  <span className="font-medium text-slate-200">{s.label}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className={`text-xs font-semibold ${s.progress === 100 ? 'text-emerald-400' : 'text-slate-400'}`}>
                    {s.progress}%
                  </span>
                  {isExpanded ? <ChevronUp className="size-4 text-slate-500" /> : <ChevronDown className="size-4 text-slate-500" />}
                </div>
              </div>

              <div className="mt-2.5 h-2 overflow-hidden rounded-full bg-[#0F172A]">
                <div 
                  style={{ width: `${s.progress}%` }} 
                  className={`h-full rounded-full transition-all duration-300 ${s.progress === 100 ? 'bg-gradient-to-r from-emerald-500 to-teal-400' : 'bg-gradient-to-r from-[#8B5CF6] to-[#06B6D4]'}`}
                />
              </div>

              {isExpanded && (
                <div className="mt-3 border-t border-white/[0.05] pt-3 text-xs text-slate-400 transition-all">
                  <p className="leading-relaxed">{s.details}</p>
                  
                  <div className="mt-3 flex items-center justify-between gap-2">
                    <span className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">Adjust Progress</span>
                    <div className="flex gap-1">
                      <Button 
                        size="sm" 
                        variant="ghost" 
                        className="h-7 px-2 text-[10px]" 
                        disabled={s.progress <= 0}
                        onClick={() => onUpdateProgress(s.id, Math.max(0, s.progress - 10))}
                      >
                        -10%
                      </Button>
                      <Button 
                        size="sm" 
                        variant="ghost" 
                        className="h-7 px-2 text-[10px]" 
                        disabled={s.progress >= 100}
                        onClick={() => onUpdateProgress(s.id, Math.min(100, s.progress + 10))}
                      >
                        +10%
                      </Button>
                      <Button 
                        size="sm" 
                        variant="secondary" 
                        className="h-7 px-2.5 text-[10px] border-emerald-500/20 text-emerald-400 hover:bg-emerald-500/10 hover:border-emerald-500/40"
                        onClick={() => onUpdateProgress(s.id, s.progress === 100 ? 0 : 100)}
                      >
                        {s.progress === 100 ? 'Reset' : 'Complete'}
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </Card>
  )
}

