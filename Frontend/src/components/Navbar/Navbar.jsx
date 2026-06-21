import { useState } from 'react'
import { Menu, Sparkles, X } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import Button from '../Button/Button'
import { cn } from '../utils/cn'

const defaultLinks = [
  { label: 'Home', to: '/' },
  { label: 'Features', to: '/#features' },
  { label: 'About', to: '/#about' },
]

function Navbar({
  links = defaultLinks,
  activeTo,
  logo,
  onLogin,
  onGetStarted,
  className,
}) {
  const [isOpen, setIsOpen] = useState(false)
  const brand = logo ?? (
    <Link to="/" className="flex items-center gap-2 text-lg font-bold tracking-tight text-slate-50">
      <span className="grid size-9 place-items-center rounded-xl bg-gradient-to-br from-[#8B5CF6] to-[#06B6D4] shadow-lg shadow-purple-950/30">
        <Sparkles className="size-5" aria-hidden="true" />
      </span>
      HireHub
    </Link>
  )

  return (
    <nav className={cn('sticky top-0 z-50 border-b border-white/10 bg-[#0F172A]/80 backdrop-blur-xl', className)} aria-label="Primary navigation">
      <div className="mx-auto flex h-18 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {brand}
        <div className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <Link key={link.to} to={link.to} className={cn('rounded-md text-sm font-medium text-slate-300 transition hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#06B6D4] focus-visible:ring-offset-4 focus-visible:ring-offset-[#0F172A]', activeTo === link.to && 'text-[#06B6D4]')}>
              {link.label}
            </Link>
          ))}
        </div>
        <div className="hidden items-center gap-3 md:flex">
          <Button variant="ghost" onClick={onLogin}>Login</Button>
          <Button onClick={onGetStarted}>Get Started</Button>
        </div>
        <button
          type="button"
          className="grid size-11 place-items-center rounded-xl text-slate-300 hover:bg-slate-800 hover:text-white md:hidden"
          onClick={() => setIsOpen((open) => !open)}
          aria-expanded={isOpen}
          aria-controls="mobile-primary-navigation"
          aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
        >
          {isOpen ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>
      <AnimatePresence>
        {isOpen ? (
          <motion.div id="mobile-primary-navigation" initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden border-t border-white/10 md:hidden">
            <div className="space-y-2 px-4 py-5">
              {links.map((link) => (
                <Link key={link.to} to={link.to} onClick={() => setIsOpen(false)} className={cn('block rounded-xl px-4 py-3 text-sm font-medium text-slate-300 hover:bg-slate-800 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#06B6D4]', activeTo === link.to && 'bg-[#8B5CF6]/10 text-[#06B6D4]')}>
                  {link.label}
                </Link>
              ))}
              <div className="grid grid-cols-2 gap-3 pt-3">
                <Button variant="secondary" onClick={onLogin}>Login</Button>
                <Button onClick={onGetStarted}>Get Started</Button>
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </nav>
  )
}

export default Navbar
