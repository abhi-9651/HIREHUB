import { useState, useRef, useEffect } from 'react'
import { Card } from '../../../components'
import { Sparkles, BookOpen, PlusCircle } from 'lucide-react'

export default function SkillGapAnalysis({ missing, onActionSkill }) {
  const [activeSkill, setActiveSkill] = useState(null)
  const menuRef = useRef(null)

  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setActiveSkill(null)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <Card>
      <h3 className="text-sm font-semibold text-slate-200">Skill gap analysis</h3>
      <p className="mt-2 text-sm text-slate-400">Based on your target roles and current profile, learning these skills will boost your Match Score the most:</p>
      
      <div className="mt-4 flex flex-wrap gap-2.5">
        {missing.map((s) => {
          const isOpen = activeSkill === s
          return (
            <div key={s} className="relative" ref={isOpen ? menuRef : null}>
              <button 
                onClick={() => setActiveSkill(isOpen ? null : s)}
                className={`flex items-center gap-1.5 rounded-xl border px-3 py-2 text-xs font-medium transition cursor-pointer select-none
                  ${isOpen 
                    ? 'border-[#8B5CF6] bg-[#8B5CF6]/15 text-[#C4B5FD] shadow-lg shadow-purple-950/20' 
                    : 'border-[#06B6D4]/15 bg-[#06B6D4]/[0.04] text-[#67E8F9] hover:border-[#06B6D4]/40 hover:bg-[#06B6D4]/10'
                  }`}
              >
                <span>{s}</span>
                <Sparkles className="size-3 text-cyan-400/80" />
              </button>

              {isOpen && (
                <div className="absolute left-0 top-full z-40 mt-1.5 w-44 rounded-xl border border-white/10 bg-[#0B1120] p-1.5 shadow-2xl shadow-black/80 backdrop-blur-xl">
                  <button 
                    onClick={() => {
                      onActionSkill(s, 'add')
                      setActiveSkill(null)
                    }}
                    className="flex w-full items-center gap-2 rounded-lg px-2.5 py-2 text-left text-xs font-medium text-slate-200 transition hover:bg-[#8B5CF6]/20 hover:text-white"
                  >
                    <PlusCircle className="size-3.5 text-cyan-400" />
                    Add to Profile
                  </button>
                  <button 
                    onClick={() => {
                      onActionSkill(s, 'learn')
                      setActiveSkill(null)
                    }}
                    className="flex w-full items-center gap-2 rounded-lg px-2.5 py-2 text-left text-xs font-medium text-slate-200 transition hover:bg-[#8B5CF6]/20 hover:text-white"
                  >
                    <BookOpen className="size-3.5 text-[#C4B5FD]" />
                    Ask how to learn
                  </button>
                </div>
              )}
            </div>
          )
        })}
        {missing.length === 0 && (
          <div className="py-2 text-xs text-emerald-400 font-medium">
            ✓ Awesome! You have all the recommended skills for this role.
          </div>
        )}
      </div>
    </Card>
  )
}

