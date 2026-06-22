import { Card } from '../../../components'

export default function InterviewReadiness() {
  const tips = [
    'Prepare answers for common behavioral questions',
    'Practice whiteboard problems weekly',
    'Record mock interviews and review'
  ]

  return (
    <Card>
      <h3 className="text-sm font-semibold text-slate-200">Interview readiness</h3>
      <ul className="mt-3 space-y-2 text-sm text-slate-300">
        {tips.map((t) => <li key={t}>• {t}</li>)}
      </ul>
    </Card>
  )
}
