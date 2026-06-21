import { forwardRef } from 'react'
import { LoaderCircle } from 'lucide-react'
import { motion } from 'framer-motion'
import { cn } from '../utils/cn'

const variants = {
  primary:
    'bg-gradient-to-r from-[#8B5CF6] to-[#7C3AED] text-white shadow-lg shadow-purple-950/30 hover:from-[#9F7AEA] hover:to-[#8B5CF6]',
  secondary:
    'border border-slate-600 bg-transparent text-slate-100 hover:border-[#8B5CF6]/70 hover:bg-[#8B5CF6]/10',
  ghost: 'bg-transparent text-slate-300 hover:bg-slate-800 hover:text-white',
  accent:
    'bg-[#06B6D4] text-slate-950 shadow-lg shadow-cyan-950/20 hover:bg-cyan-400',
  danger: 'bg-[#EF4444] text-white hover:bg-red-400',
}

const sizes = {
  sm: 'h-9 px-3.5 text-sm',
  md: 'h-11 px-5 text-sm',
  lg: 'h-12 px-6 text-base',
  icon: 'size-11 p-0',
}

const Button = forwardRef(function Button(
  {
    children,
    className,
    variant = 'primary',
    size = 'md',
    leftIcon: LeftIcon,
    rightIcon: RightIcon,
    loading = false,
    disabled = false,
    type = 'button',
    ...props
  },
  ref,
) {
  return (
    <motion.button
      ref={ref}
      type={type}
      whileHover={disabled || loading ? undefined : { y: -1 }}
      whileTap={disabled || loading ? undefined : { scale: 0.98 }}
      transition={{ duration: 0.15 }}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      className={cn(
        'inline-flex shrink-0 items-center justify-center gap-2 rounded-xl font-semibold transition-colors duration-200 outline-none focus-visible:ring-2 focus-visible:ring-[#06B6D4] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0F172A] disabled:pointer-events-none disabled:opacity-50',
        variants[variant] ?? variants.primary,
        sizes[size] ?? sizes.md,
        className,
      )}
      {...props}
    >
      {loading ? <LoaderCircle className="size-4 animate-spin" aria-hidden="true" /> : LeftIcon ? <LeftIcon className="size-4" aria-hidden="true" /> : null}
      {loading ? <span className="sr-only">Loading</span> : null}
      {children}
      {!loading && RightIcon ? <RightIcon className="size-4" aria-hidden="true" /> : null}
    </motion.button>
  )
})

export default Button
