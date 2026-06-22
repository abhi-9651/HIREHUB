import { Card, Button } from '../../../components'

export default function WeeklyGoals() {
  const goals = [
    { title: 'Apply to 3 internships', done: false },
    { title: 'Add project README', done: true },
    { title: 'Practice 5 interview questions', done: false },
  ]

  return (
    <Card>
      <h3 className="text-sm font-semibold text-slate-200">Weekly goals</h3>
      <ul className="mt-4 space-y-3">
        {goals.map((g) => (
          <li key={g.title} className="flex items-center justify-between">
            <div className="text-sm text-slate-300">{g.title}</div>
            <div className="text-sm text-slate-400">{g.done ? 'Done' : 'Pending'}</div>
          </li>
        ))}
      </ul>
      <Button variant="secondary" className="mt-4 w-full">Add Goal</Button>
    </Card>
  )
}
