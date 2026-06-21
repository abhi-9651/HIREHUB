import { forwardRef, useId } from 'react'
import { AlertCircle } from 'lucide-react'
import { cn } from '../utils/cn'

const Input = forwardRef(function Input(
  {
    id,
    label,
    error,
    helperText,
    leftIcon: LeftIcon,
    rightElement,
    className,
    containerClassName,
    required,
    ...props
  },
  ref,
) {
  const generatedId = useId()
  const inputId = id ?? generatedId
  const descriptionId = error || helperText ? `${inputId}-description` : undefined

  return (
    <div className={cn('w-full', containerClassName)}>
      {label ? (
        <label htmlFor={inputId} className="mb-2 block text-sm font-medium text-slate-200">
          {label}
          {required ? <span className="ml-1 text-[#06B6D4]">*</span> : null}
        </label>
      ) : null}
      <div className="relative">
        {LeftIcon ? (
          <LeftIcon className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-slate-400" aria-hidden="true" />
        ) : null}
        <input
          ref={ref}
          id={inputId}
          required={required}
          aria-invalid={Boolean(error)}
          aria-describedby={descriptionId}
          className={cn(
            'h-12 w-full rounded-xl border border-slate-700 bg-[#1E293B]/70 px-4 text-base text-slate-50 outline-none transition placeholder:text-slate-500 hover:border-slate-600 focus:border-[#8B5CF6] focus:ring-2 focus:ring-[#8B5CF6]/20 disabled:cursor-not-allowed disabled:opacity-50',
            LeftIcon && 'pl-11',
            rightElement && 'pr-11',
            error && 'border-[#EF4444] focus:border-[#EF4444] focus:ring-red-500/20',
            className,
          )}
          {...props}
        />
        {rightElement ? <div className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400">{rightElement}</div> : null}
      </div>
      {error || helperText ? (
        <p id={descriptionId} className={cn('mt-2 flex items-center gap-1.5 text-sm', error ? 'text-red-400' : 'text-slate-400')}>
          {error ? <AlertCircle className="size-4 shrink-0" aria-hidden="true" /> : null}
          {error || helperText}
        </p>
      ) : null}
    </div>
  )
})

export default Input
