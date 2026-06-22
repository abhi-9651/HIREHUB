import { Card, Button } from '../../../components'

export default function AIRecommendations() {
  const recs = [
    'Add one production-ready React project',
    'Contribute to an open-source repo',
    'Write measurable outcomes on your resume'
  ]

  return (
    <Card>
      <h3 className="text-sm font-semibold text-slate-200">AI recommendations</h3>
      <ul className="mt-3 space-y-2 text-sm text-slate-300">
        {recs.map((r) => <li key={r}>• {r}</li>)}
      </ul>
      <Button variant="secondary" className="mt-4 w-full">Apply suggestions</Button>
    </Card>
  )
}
