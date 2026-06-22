import { ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import Card from '../../../components/Card/Card'

function QuickActionCard({ title, description, to, icon: Icon, accent = 'purple' }) {
  const cyan = accent === 'cyan'

  return (
    <Link to={to} className="group block rounded-2xl outline-none focus-visible:ring-2 focus-visible:ring-[#06B6D4] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0F172A]">
      <Card interactive className="h-full min-h-44">
        <div className="flex items-start justify-between gap-4">
          <span className={`grid size-11 place-items-center rounded-xl ${cyan ? 'bg-[#06B6D4]/12 text-[#22D3EE]' : 'bg-[#8B5CF6]/12 text-[#A78BFA]'}`}>
            <Icon className="size-5" aria-hidden="true" />
          </span>
          <ArrowUpRight className="size-4 text-slate-600 transition duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-slate-300" aria-hidden="true" />
        </div>
        <h3 className="mt-6 font-semibold text-slate-100">{title}</h3>
        <p className="mt-2 text-sm leading-6 text-slate-500">{description}</p>
      </Card>
    </Link>
  )
}

export default QuickActionCard
