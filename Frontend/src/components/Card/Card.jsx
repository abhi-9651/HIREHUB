import { forwardRef } from 'react'
import { motion } from 'framer-motion'
import { cn } from '../utils/cn'

const paddings = { none: '', sm: 'p-4', md: 'p-6', lg: 'p-8' }

const Card = forwardRef(function Card(
  { children, className, interactive = false, padding = 'md', ...props },
  ref,
) {
  return (
    <motion.div
      ref={ref}
      whileHover={interactive ? { y: -4 } : undefined}
      transition={{ duration: 0.22, ease: 'easeOut' }}
      className={cn(
        'rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.055] to-white/[0.025] shadow-[0_16px_48px_-24px_rgba(0,0,0,0.75)] ring-1 ring-inset ring-white/[0.025] backdrop-blur-xl',
        interactive && 'will-change-transform transition-[border-color,background-color,box-shadow] duration-300 hover:border-[#8B5CF6]/40 hover:bg-white/[0.06] hover:shadow-[0_24px_64px_-28px_rgba(76,29,149,0.6)]',
        paddings[padding] ?? paddings.md,
        className,
      )}
      {...props}
    >
      {children}
    </motion.div>
  )
})

export default Card
