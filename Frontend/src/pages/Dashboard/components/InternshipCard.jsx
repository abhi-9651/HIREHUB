import { Bookmark, BriefcaseBusiness, Clock3, MapPin } from 'lucide-react'
import Button from '../../../components/Button/Button'
import Card from '../../../components/Card/Card'

function InternshipCard({ internship }) {
  return (
    <Card interactive padding="none" className="group overflow-hidden p-5 sm:p-6">
      <div className="flex items-start justify-between gap-4">
        <div className="flex min-w-0 items-center gap-3">
          <span className={`grid size-11 shrink-0 place-items-center rounded-xl text-sm font-bold ${internship.logoClass}`}>
            {internship.company.charAt(0)}
          </span>
<div className="min-w-0">
  <h3 className="truncate font-semibold text-slate-100">
    {internship.role}
  </h3>

  <p className="mt-1 text-sm text-slate-500">
    {internship.company}
  </p>

  {internship.stipend && (
    <span className="mt-2 inline-flex rounded-full border border-[#06B6D4]/20 bg-[#06B6D4]/10 px-2.5 py-1 text-xs font-semibold text-[#67E8F9]">
      {internship.stipend}
    </span>
  )}
</div>
        </div>
        <button type="button" aria-label={`Save ${internship.role}`} className="grid size-9 shrink-0 place-items-center rounded-lg text-slate-500 transition hover:bg-white/5 hover:text-slate-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#06B6D4]">
          <Bookmark className="size-4" />
        </button>
      </div>

      <div className="mt-5 flex flex-wrap gap-x-4 gap-y-2 text-xs text-slate-400">
        <span className="flex items-center gap-1.5"><MapPin className="size-3.5 text-slate-500" aria-hidden="true" />{internship.location}</span>
        <span className="flex items-center gap-1.5"><Clock3 className="size-3.5 text-slate-500" aria-hidden="true" />{internship.duration}</span>
        <span className="flex items-center gap-1.5"><BriefcaseBusiness className="size-3.5 text-slate-500" aria-hidden="true" />{internship.type}</span>
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        {internship.skills.map((skill) => (
          <span key={skill} className="rounded-lg border border-white/[0.06] bg-white/[0.04] px-2.5 py-1.5 text-xs font-medium text-slate-400">{skill}</span>
        ))}
      </div>

      <div className="mt-6 flex items-end justify-between gap-4 border-t border-white/[0.07] pt-5">
        <div>
          <p className="text-xl font-bold tracking-tight text-[#A78BFA]">{internship.match}%</p>
          <p className="mt-0.5 text-[11px] font-medium uppercase tracking-[0.12em] text-slate-600">Smart match</p>
        </div>
        <Button size="sm">Apply Now</Button>
      </div>
    </Card>
  )
}

export default InternshipCard
