import { cn } from '../lib/cn'

type TechStackChipsProps = {
  items: string[]
  tone?: 'subtle' | 'main'
  visibleCount?: number
}

export function TechStackChips({ items, tone = 'subtle', visibleCount = 5 }: TechStackChipsProps) {
  const visible = items.slice(0, visibleCount)
  const overflow = items.slice(visibleCount)
  const toneClass = tone === 'main' ? 'text-[var(--color-text-main)]' : 'text-[var(--color-text-subtle)]'
  const chipClass = 'rounded-full border border-[var(--color-border)] px-3 py-1 font-mono text-xs uppercase tracking-[0.12em]'

  return (
    <div className="flex flex-wrap gap-2">
      {visible.map((stack) => (
        <span key={stack} className={cn(chipClass, toneClass)}>
          {stack}
        </span>
      ))}
      {overflow.map((stack) => (
        <span key={stack} className={cn(chipClass, toneClass, 'max-md:hidden')}>
          {stack}
        </span>
      ))}
      {overflow.length > 0 ? (
        <span className={cn(chipClass, 'text-[var(--color-text-subtle)] md:hidden')}>+{overflow.length}</span>
      ) : null}
    </div>
  )
}
