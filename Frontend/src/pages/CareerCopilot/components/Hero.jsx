import { Bot, Sparkles, ArrowRight } from 'lucide-react'
import { Button, Card } from '../../../components'

export default function Hero({ profileScore, nextMilestone, onAskCopilotClick, onViewRoadmapClick }) {
  return (
    <Card className="relative overflow-hidden bg-gradient-to-r from-[#1E1B4B]/65 to-[#0F172A]/80 border-white/[0.08]">
      <div className="grid gap-6 sm:grid-cols-2 sm:items-center">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-[#8B5CF6]/25 bg-[#8B5CF6]/10 px-3 py-1.5 text-xs font-semibold text-[#C4B5FD]">
            <Sparkles className="size-3.5" />AI Career Copilot
          </div>
          <h1 className="mt-4 text-2xl font-bold">Personalized career guidance, instant.</h1>
          <p className="mt-2 text-sm text-slate-300">
            Ask questions, get practical steps, and follow a roadmap tailored to your profile and goals.
          </p>
          <div className="mt-4 flex flex-col md:flex-row gap-3">
            <Button leftIcon={Bot} onClick={onAskCopilotClick} className="w-full md:w-auto">Ask Copilot</Button>
            <Button variant="secondary" rightIcon={ArrowRight} onClick={onViewRoadmapClick} className="w-full md:w-auto">View Roadmap</Button>
          </div>
        </div>

        <div className="rounded-2xl border border-white/10 bg-[#0F172A]/70 p-5 shadow-inner">
          <p className="text-sm font-semibold text-slate-200 border-b border-white/[0.06] pb-2">Quick snapshot</p>
          <div className="mt-4 grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-slate-400">Profile completeness</p>
              <p className="text-xl font-bold text-[#06B6D4] mt-1">{profileScore}%</p>
            </div>
            <div className="border-l border-white/[0.08] pl-4">
              <p className="text-xs text-slate-400">Next milestone</p>
              <p className="text-sm font-semibold text-slate-200 mt-1 leading-snug" title={nextMilestone}>
                {nextMilestone}
              </p>
            </div>
          </div>
        </div>
      </div>
    </Card>
  )
}

