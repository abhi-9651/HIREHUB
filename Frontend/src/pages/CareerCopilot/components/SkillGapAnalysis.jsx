import { Card } from '../../../components'

export default function SkillGapAnalysis() {
  const missing = ['Node.js', 'MongoDB', 'Testing']

  return (
    <Card>
      <h3 className="text-sm font-semibold text-slate-200">Skill gap analysis</h3>
      <p className="mt-2 text-sm text-slate-400">Based on your profile and target roles, these skills would raise your match score most:</p>
      <div className="mt-4 flex flex-wrap gap-2">
        {missing.map((s) => <span key={s} className="rounded-lg border border-[#06B6D4]/15 bg-[#06B6D4]/[0.06] px-3 py-1.5 text-xs font-medium text-[#67E8F9]">{s}</span>)}
      </div>
    </Card>
  )
}
