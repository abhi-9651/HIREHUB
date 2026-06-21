import { cn } from '../utils/cn'

function SectionTitle({ eyebrow, title, description, action, align = 'left', className }) {
  const centered = align === 'center'

  return (
    <div className={cn('flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between', centered && 'text-center sm:block', className)}>
      <div className={cn('max-w-2xl', centered && 'mx-auto')}>
        {eyebrow ? <p className="mb-2 text-sm font-semibold uppercase tracking-[0.18em] text-[#06B6D4]">{eyebrow}</p> : null}
        <h2 className="text-2xl font-bold tracking-tight text-slate-50 sm:text-[32px] sm:leading-tight">{title}</h2>
        {description ? <p className="mt-3 text-base leading-7 text-slate-400 sm:text-lg">{description}</p> : null}
      </div>
      {action ? <div className={cn('shrink-0', centered && 'mt-6')}>{action}</div> : null}
    </div>
  )
}

export default SectionTitle
