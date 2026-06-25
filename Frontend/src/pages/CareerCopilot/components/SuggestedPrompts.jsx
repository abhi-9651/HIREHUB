import { Card, Button } from '../../../components'

const prompts = [
  'Ai engineer roadmaps',
  'Mern Stack',
  'Startup Roadmaps',
  'Demanding jobs',
  'How do I improve my resume?'
]

export default function SuggestedPrompts({ onClickPrompt }) {
  return (
    <Card>
      <h3 className="text-sm font-semibold text-slate-200">Suggested prompts</h3>
      <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:flex-wrap">
        {prompts.map((p) => (
          <Button 
            key={p} 
            variant="ghost" 
            className="justify-start rounded-xl border border-white/[0.04] bg-white/[0.02] text-xs py-2 hover:bg-white/[0.08]" 
            onClick={() => onClickPrompt(p)}
          >
            {p}
          </Button>
        ))}
      </div>
    </Card>
  )
}

