import { Bot, Sparkles, ArrowRight } from 'lucide-react'
import { Button, Card } from '../../../components'

export default function Hero() {
  return (
    <Card className="relative overflow-hidden">
      <div className="grid gap-6 sm:grid-cols-2 sm:items-center">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-[#8B5CF6]/25 bg-[#8B5CF6]/10 px-3 py-1.5 text-xs font-semibold text-[#C4B5FD]"><Sparkles className="size-3.5" />AI Career Copilot</div>
          <h1 className="mt-4 text-2xl font-bold">Personalized career guidance, instant.</h1>
          <p className="mt-2 text-sm text-slate-300">Ask questions, get practical steps, and follow a roadmap tailored to your profile and goals.</p>
          <div className="mt-4 flex gap-3">
            <Button leftIcon={Bot}>Ask Copilot</Button>
            <Button variant="secondary" rightIcon={ArrowRight}>View Roadmap</Button>
          </div>
        </div>

        <div className="rounded-2xl border border-white/10 bg-[#0F172A]/60 p-4">
          <p className="text-sm font-semibold text-slate-200">Quick snapshot</p>
          <div className="mt-3 flex items-center justify-between gap-3">
            <div>
              <p className="text-xs text-slate-400">Profile completeness</p>
              <p className="text-lg font-semibold">86%</p>
            </div>
            <div>
              <p className="text-xs text-slate-400">Next milestone</p>
              <p className="text-lg font-semibold">Add React project</p>
            </div>
          </div>
        </div>
      </div>
    </Card>
  )
}
