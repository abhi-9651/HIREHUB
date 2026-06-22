import { Card, Button } from '../../../components'

const prompts = [
  'How do I improve my resume for React roles?',
  'Build a 30-day interview plan for frontend',
  'What projects should I add to show production experience?'
]

export default function SuggestedPrompts() {
  return (
    <Card>
      <h3 className="text-sm font-semibold text-slate-200">Suggested prompts</h3>
      <div className="mt-4 flex flex-wrap gap-2">
        {prompts.map((p) => (
          <Button key={p} variant="ghost" className="rounded-lg" onClick={() => {}}>{p}</Button>
        ))}
      </div>
    </Card>
  )
}
