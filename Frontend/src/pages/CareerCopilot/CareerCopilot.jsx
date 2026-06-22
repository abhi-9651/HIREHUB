import { MotionConfig, motion } from 'framer-motion'
import { Bot, MessageSquare, Sparkles, Map, Clock3, Check, Zap } from 'lucide-react'
import { Button, Card, Input, SectionTitle, Sidebar } from '../../components'
import { Hero, ChatInterface, SuggestedPrompts, SkillGapAnalysis, WeeklyGoals, CareerRoadmap, InterviewReadiness, AIRecommendations } from './components'
import { useState } from 'react'


const reveal = { initial: { opacity: 0, y: 12 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, amount: 0.12 }, transition: { duration: 0.45 } }

export default function CareerCopilot() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

  return (
    <MotionConfig reducedMotion="user">
      <div className="flex h-screen overflow-hidden bg-[#0F172A] text-slate-50">
        <Sidebar collapsed={sidebarCollapsed} onCollapsedChange={setSidebarCollapsed} user={{ name: 'Abhi' }} className="bg-[#0B1120]/95" />

        <main className="h-screen min-w-0 flex-1 overflow-y-auto">
         <header className="sticky top-0 z-30 border-b border-white/[0.07] bg-[#0F172A]/90 backdrop-blur-xl">
  <div className="flex h-20 items-center justify-between px-6 lg:px-8 xl:px-10">
    <div className="shrink-0">
      <h1 className="text-lg font-semibold text-white">
        Career Copilot
      </h1>

      <p className="text-sm text-slate-400">
        Personalized, action-oriented guidance
      </p>
    </div>

    <div className="hidden md:block w-[420px]">
      <Input
        aria-label="Search copilot"
        placeholder="Ask career copilot..."
        leftIcon={MessageSquare}
      />
    </div>
  </div>
</header>

       <div className="mx-auto w-full max-w-[1600px] px-6 py-8 lg:px-8 xl:px-10">
            <motion.section {...reveal} className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
              <div className="space-y-6">
                <Hero />
                <ChatInterface />
                <SuggestedPrompts />
                <SkillGapAnalysis />
                <InterviewReadiness />
              </div>

              <aside className="space-y-6">
                <WeeklyGoals />
                <CareerRoadmap />
                <AIRecommendations />
              </aside>
            </motion.section>
          </div>
        </main>
      </div>
    </MotionConfig>
  )
}
