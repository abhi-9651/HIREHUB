import { useState } from 'react'
import { Card, Button, Input } from '../../../components'
import { Plus, Trash2, CheckSquare, Square, X } from 'lucide-react'

export default function WeeklyGoals({ goals, onToggleGoal, onAddGoal, onDeleteGoal }) {
  const [isAdding, setIsAdding] = useState(false)
  const [newGoalText, setNewGoalText] = useState('')

  function handleSubmit(e) {
    e.preventDefault()
    if (!newGoalText.trim()) return
    onAddGoal(newGoalText.trim())
    setNewGoalText('')
    setIsAdding(false)
  }

  return (
    <Card id="copilot-goals">
      <div className="flex items-center justify-between border-b border-white/[0.06] pb-3">
        <h3 className="text-sm font-semibold text-slate-200">Weekly goals</h3>
        <span className="rounded-full bg-[#8B5CF6]/15 px-2 py-0.5 text-xs font-semibold text-[#C4B5FD]">
          {goals.filter(g => g.done).length}/{goals.length} done
        </span>
      </div>

      <ul className="mt-4 space-y-2.5">
        {goals.map((g) => (
          <li 
            key={g.id} 
            className="group flex items-center justify-between gap-3 rounded-xl border border-white/[0.02] bg-white/[0.01] p-3 transition hover:border-white/[0.06] hover:bg-white/[0.03]"
          >
            <button 
              onClick={() => onToggleGoal(g.id)}
              className="flex flex-1 items-center gap-3 text-left transition outline-none cursor-pointer"
            >
              {g.done ? (
                <CheckSquare className="size-5 shrink-0 text-[#06B6D4]" />
              ) : (
                <Square className="size-5 shrink-0 text-slate-500 hover:text-[#8B5CF6]" />
              )}
              <span className={`text-sm text-slate-300 transition ${g.done ? 'line-through text-slate-500' : ''}`}>
                {g.title}
              </span>
            </button>

            <button 
              onClick={() => onDeleteGoal(g.id)}
              className="text-slate-500 transition hover:text-red-400 md:opacity-0 md:group-hover:opacity-100 cursor-pointer"
              title="Delete goal"
            >
              <Trash2 className="size-4" />
            </button>
          </li>
        ))}
        {goals.length === 0 && (
          <div className="py-6 text-center text-xs text-slate-500">
            No goals set for this week.
          </div>
        )}
      </ul>

      {isAdding ? (
        <form onSubmit={handleSubmit} className="mt-4 flex gap-2">
          <Input 
            value={newGoalText}
            onChange={(e) => setNewGoalText(e.target.value)}
            placeholder="What's your goal?"
            className="h-10 bg-[#0B1224]/50 text-sm border-white/10"
            autoFocus
          />
          <div className="flex gap-1 shrink-0">
            <Button type="submit" size="sm" className="px-3">Add</Button>
            <Button 
              variant="ghost" 
              size="sm" 
              className="px-2"
              onClick={() => {
                setIsAdding(false)
                setNewGoalText('')
              }}
            >
              <X className="size-4" />
            </Button>
          </div>
        </form>
      ) : (
        <Button 
          variant="secondary" 
          leftIcon={Plus} 
          className="mt-4 w-full h-10 text-xs" 
          onClick={() => setIsAdding(true)}
        >
          Add Goal
        </Button>
      )}
    </Card>
  )
}

