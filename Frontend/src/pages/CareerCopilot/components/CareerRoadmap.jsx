import { Card } from '../../../components'

export default function CareerRoadmap() {
  const steps = [
    { label: 'React Project', progress: 60 },
    { label: 'Testing Basics', progress: 20 },
    { label: 'System Design', progress: 0 },
  ]

  return (
    <Card>
      <h3 className="text-sm font-semibold text-slate-200">Career roadmap</h3>
      <div className="mt-4 space-y-4">
        {steps.map((s) => (
          <div key={s.label}>
            <div className="flex items-center justify-between text-sm text-slate-300">
              <span className="font-medium">{s.label}</span>
              <span className={s.progress === 100 ? 'text-emerald-400' : 'text-slate-500'}>{s.progress}%</span>
            </div>
            <div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-800">
              <div style={{ width: `${s.progress}%` }} className="h-full rounded-full bg-[#8B5CF6]" />
            </div>
          </div>
        ))}
      </div>
    </Card>
  )
}
