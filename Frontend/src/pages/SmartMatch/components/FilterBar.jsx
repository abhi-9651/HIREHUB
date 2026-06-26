import { ChevronDown, RotateCcw, Search, SlidersHorizontal } from 'lucide-react'
import { Button, Input } from '../../../components'

function FilterBar({
  search,
  onSearchChange,
  categoryFilters,
  selectedCategories,
  onToggleCategory,
  modeFilters,
  selectedModes,
  onToggleMode,
  location,
  onLocationChange,
  sortBy,
  onSortByChange,
  onClearFilters,
  minMatch,
  onMinMatchChange,
  minStipend,
  onMinStipendChange,
}) {
  const activeCount =
    selectedCategories.length +
    selectedModes.length +
    (location ? 1 : 0) +
    (search ? 1 : 0) +
    (minMatch > 55 ? 1 : 0) +
    (minStipend > 0 ? 1 : 0)

  return (
    <div className="overflow-hidden rounded-[28px] border border-white/10 bg-[#111827]/80 p-5 shadow-[0_24px_80px_-48px_rgba(76,29,149,0.85)] sm:p-6">
      <div className="flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">
        <div className="grid flex-1 gap-4 lg:grid-cols-[minmax(0,1.2fr)_minmax(220px,0.7fr)_minmax(180px,0.45fr)]">
          <Input
            label="Search"
            placeholder="Search roles, companies, or skills"
            leftIcon={Search}
            value={search}
            onChange={(event) => onSearchChange(event.target.value)}
          />

          <Input
            label="Location"
            placeholder="Bengaluru, Remote, Pune..."
            value={location}
            onChange={(event) => onLocationChange(event.target.value)}
          />

          <div className="relative">
            <label className="mb-2 block text-sm font-medium text-slate-200">Sort by</label>
            <div className="relative">
              <select
                value={sortBy}
                onChange={(event) => onSortByChange(event.target.value)}
                className="h-12 w-full appearance-none rounded-xl border border-slate-700 bg-[#1E293B]/70 px-4 pr-11 text-base text-slate-50 outline-none transition hover:border-slate-600 focus:border-[#8B5CF6] focus:ring-2 focus:ring-[#8B5CF6]/20"
              >
                <option value="best">Best Match</option>
                <option value="newest">Newest</option>
                <option value="stipend">Highest Stipend</option>
              </select>
              <ChevronDown className="pointer-events-none absolute right-4 top-1/2 size-4 -translate-y-1/2 text-slate-400" aria-hidden="true" />
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
            {activeCount} active filters
          </div>
          <Button variant="secondary" size="sm" leftIcon={RotateCcw} onClick={onClearFilters}>
            Clear Filters
          </Button>
        </div>
      </div>

      <div className="mt-6 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        <div>
          <div className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#06B6D4]">
            <SlidersHorizontal className="size-3.5" aria-hidden="true" />
            Categories
          </div>
          <div className="flex flex-wrap gap-2.5">
            {categoryFilters.map((category) => {
              const active = selectedCategories.includes(category)

              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => onToggleCategory(category)}
                  className={`rounded-full border px-4 py-2 text-sm font-medium transition ${active ? 'border-[#8B5CF6]/40 bg-[#8B5CF6]/15 text-[#E9D5FF]' : 'border-white/10 bg-white/[0.03] text-slate-400 hover:border-[#06B6D4]/30 hover:bg-white/[0.05] hover:text-slate-100'}`}
                >
                  {category}
                </button>
              )
            })}
          </div>
        </div>

        <div>
          <div className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#06B6D4]">
            <SlidersHorizontal className="size-3.5" aria-hidden="true" />
            Work Mode
          </div>
          <div className="flex flex-wrap gap-2.5">
            {modeFilters.map((mode) => {
              const active = selectedModes.includes(mode)

              return (
                <button
                  key={mode}
                  type="button"
                  onClick={() => onToggleMode(mode)}
                  className={`rounded-full border px-4 py-2 text-sm font-medium transition ${active ? 'border-[#06B6D4]/40 bg-[#06B6D4]/12 text-[#67E8F9]' : 'border-white/10 bg-white/[0.03] text-slate-400 hover:border-[#8B5CF6]/30 hover:bg-white/[0.05] hover:text-slate-100'}`}
                >
                  {mode}
                </button>
              )
            })}
          </div>
        </div>

        <div>
          <div className="mb-3 flex items-center justify-between text-xs font-semibold uppercase tracking-[0.18em] text-[#06B6D4]">
            <span className="flex items-center gap-2">
              <SlidersHorizontal className="size-3.5" aria-hidden="true" />
              Skill Match
            </span>
            <span className="rounded-full bg-[#8B5CF6]/10 px-2.5 py-0.5 text-[11px] font-bold lowercase tracking-normal text-[#D8B4FE]">
              {minMatch}%+ fit
            </span>
          </div>
          <div className="flex h-10 items-center px-1">
            <input
              type="range"
              min="55"
              max="98"
              value={minMatch}
              onChange={(event) => onMinMatchChange(Number(event.target.value))}
              className="h-1.5 w-full cursor-pointer appearance-none rounded-lg bg-slate-800 accent-[#8B5CF6] focus:outline-none"
            />
          </div>
        </div>

        <div>
          <div className="mb-3 flex items-center justify-between text-xs font-semibold uppercase tracking-[0.18em] text-[#06B6D4]">
            <span className="flex items-center gap-2">
              <SlidersHorizontal className="size-3.5" aria-hidden="true" />
              Min Stipend
            </span>
            <span className="rounded-full bg-[#06B6D4]/10 px-2.5 py-0.5 text-[11px] font-bold tracking-normal text-[#67E8F9]">
              {minStipend === 0 ? 'Any' : `₹${minStipend / 1000}k+/mo`}
            </span>
          </div>
          <div className="flex h-10 items-center px-1">
            <input
              type="range"
              min="0"
              max="80000"
              step="5000"
              value={minStipend}
              onChange={(event) => onMinStipendChange(Number(event.target.value))}
              className="h-1.5 w-full cursor-pointer appearance-none rounded-lg bg-slate-800 accent-[#06B6D4] focus:outline-none"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default FilterBar