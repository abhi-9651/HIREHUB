import { useCallback, useEffect, useState } from 'react'
import {
  Bot,
  BriefcaseBusiness,
  FileText,
  LayoutDashboard,
  LogOut,
  PanelLeftClose,
  PanelLeftOpen,
  Menu,
  Sparkles,
  UserRound,
  X,
} from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'
import { Link, NavLink } from 'react-router-dom'
import { cn } from '../utils/cn'

const defaultItems = [
  { label: 'Dashboard', to: '/dashboard', icon: LayoutDashboard },
  { label: 'Internships', to: '/internships', icon: BriefcaseBusiness },
  { label: 'Resume Studio', to: '/resume-studio', icon: FileText },
  { label: 'Career Copilot', to: '/career-copilot', icon: Bot },
  { label: 'Profile', to: '/profile', icon: UserRound },
]

function SidebarContent({
  items,
  collapsed,
  onCollapsedChange,
  onNavigate,
  onLogout,
  user,
  mobile = false,
}) {
  return (
    <>
      <div className={cn('mb-8 flex h-12 items-center', collapsed ? 'justify-center' : 'justify-between')}>
        <Link to="/dashboard" onClick={onNavigate} className="flex items-center gap-2.5 overflow-hidden font-bold text-slate-50">
          <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-[#8B5CF6] to-[#06B6D4]">
            <Sparkles className="size-5" aria-hidden="true" />
          </span>
          {!collapsed ? <span className="whitespace-nowrap text-lg">HireHub</span> : null}
        </Link>
        {mobile ? (
          <button type="button" onClick={onNavigate} className="grid size-9 place-items-center rounded-lg text-slate-400 hover:bg-slate-800 hover:text-white" aria-label="Close navigation menu">
            <X className="size-5" />
          </button>
        ) : !collapsed && onCollapsedChange ? (
          <button type="button" onClick={() => onCollapsedChange(true)} className="grid size-9 place-items-center rounded-lg text-slate-400 hover:bg-slate-800 hover:text-white" aria-label="Collapse sidebar">
            <PanelLeftClose className="size-4" />
          </button>
        ) : null}
      </div>

      {collapsed && onCollapsedChange ? (
        <button type="button" onClick={() => onCollapsedChange(false)} className="mb-4 grid h-10 place-items-center rounded-xl text-slate-400 hover:bg-slate-800 hover:text-white" aria-label="Expand sidebar">
          <PanelLeftOpen className="size-5" />
        </button>
      ) : null}

      <div className="flex flex-1 flex-col gap-1">
        {items.map(({ label, to, icon: Icon, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            onClick={onNavigate}
            title={collapsed ? label : undefined}
            className={({ isActive }) => cn(
              'relative flex h-12 items-center gap-3 rounded-xl px-3 text-sm font-medium transition-colors',
              collapsed && 'justify-center',
              isActive ? 'bg-[#8B5CF6]/15 text-white' : 'text-slate-400 hover:bg-slate-800/80 hover:text-slate-100',
            )}
          >
            {({ isActive }) => (
              <>
                {isActive ? <span className="absolute left-0 h-6 w-0.5 rounded-full bg-[#06B6D4]" /> : null}
                <Icon className={cn('size-5 shrink-0', isActive && 'text-[#8B5CF6]')} aria-hidden="true" />
                {!collapsed ? <span className="whitespace-nowrap">{label}</span> : null}
              </>
            )}
          </NavLink>
        ))}
      </div>

      {user && !collapsed ? (
        <div className="mb-3 flex items-center gap-3 rounded-xl border border-white/10 bg-slate-800/50 p-3">
          <div className="grid size-9 shrink-0 place-items-center rounded-full bg-[#06B6D4]/15 text-sm font-semibold text-[#06B6D4]">
            {user.avatar ?? user.name?.charAt(0)?.toUpperCase()}
          </div>
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-slate-100">{user.name}</p>
            {user.email ? <p className="truncate text-xs text-slate-500">{user.email}</p> : null}
          </div>
        </div>
      ) : null}

      <button type="button" onClick={onLogout} title={collapsed ? 'Logout' : undefined} className={cn('flex h-12 items-center gap-3 rounded-xl px-3 text-sm font-medium text-slate-400 transition hover:bg-red-500/10 hover:text-red-400', collapsed && 'justify-center')}>
        <LogOut className="size-5 shrink-0" aria-hidden="true" />
        {!collapsed ? 'Logout' : null}
      </button>
    </>
  )
}

function Sidebar({
  items = defaultItems,
  collapsed = false,
  onCollapsedChange,
  onLogout,
  user,
  className,
  mobileOpen,
  defaultMobileOpen = false,
  onMobileOpenChange,
}) {
  const [internalMobileOpen, setInternalMobileOpen] = useState(defaultMobileOpen)
  const isMobileOpen = mobileOpen ?? internalMobileOpen
  const setMobileOpen = useCallback((open) => {
    if (mobileOpen === undefined) setInternalMobileOpen(open)
    onMobileOpenChange?.(open)
  }, [mobileOpen, onMobileOpenChange])

  useEffect(() => {
    if (!isMobileOpen) return undefined

    const closeOnEscape = (event) => {
      if (event.key === 'Escape') setMobileOpen(false)
    }
    window.addEventListener('keydown', closeOnEscape)
    return () => window.removeEventListener('keydown', closeOnEscape)
  }, [isMobileOpen, setMobileOpen])

  return (
    <>
      <button type="button" onClick={() => setMobileOpen(true)} className="fixed left-4 top-4 z-40 grid size-11 place-items-center rounded-xl border border-white/10 bg-[#111827]/90 text-slate-200 shadow-lg backdrop-blur-xl md:hidden" aria-label="Open navigation menu" aria-expanded={isMobileOpen} aria-controls="mobile-dashboard-navigation">
        <Menu className="size-5" />
      </button>

      <AnimatePresence>
        {isMobileOpen ? (
          <div className="fixed inset-0 z-50 md:hidden">
            <motion.button type="button" aria-label="Close navigation menu" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setMobileOpen(false)} className="absolute inset-0 bg-slate-950/70 backdrop-blur-sm" />
            <motion.aside id="mobile-dashboard-navigation" initial={{ x: '-100%' }} animate={{ x: 0 }} exit={{ x: '-100%' }} transition={{ duration: 0.2, ease: 'easeOut' }} className={cn('relative flex h-full w-[min(84vw,288px)] flex-col border-r border-white/10 bg-[#111827] p-4 shadow-2xl', className)} aria-label="Dashboard navigation">
              <SidebarContent items={items} collapsed={false} onNavigate={() => setMobileOpen(false)} onLogout={onLogout} user={user} mobile />
            </motion.aside>
          </div>
        ) : null}
      </AnimatePresence>

      <motion.aside animate={{ width: collapsed ? 88 : 272 }} transition={{ duration: 0.2, ease: 'easeOut' }} className={cn('sticky top-0 hidden h-screen shrink-0 flex-col border-r border-white/10 bg-[#111827]/90 p-4 backdrop-blur-xl md:flex', className)} aria-label="Dashboard navigation">
        <SidebarContent items={items} collapsed={collapsed} onCollapsedChange={onCollapsedChange} onLogout={onLogout} user={user} />
      </motion.aside>
    </>
  )
}

export default Sidebar
