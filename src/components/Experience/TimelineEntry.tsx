import type { ExperienceEntry } from '../../types/experience'

type TimelineEntryProps = {
  entry: ExperienceEntry
}

export function TimelineEntry({ entry }: TimelineEntryProps) {
  return (
    <article className="grid gap-4 rounded-3xl border border-[var(--color-border)] bg-[rgba(18,22,20,0.72)] p-5 md:grid-cols-[140px_1fr]">
      <div className="space-y-3">
        <p className="font-mono text-xs uppercase tracking-[0.22em] text-[var(--color-accent)]">{entry.category}</p>
        <p className="font-mono text-xs text-[var(--color-text-subtle)]">{entry.dateLabel ?? 'Sequence log'}</p>
      </div>
      <div className="space-y-4">
        <div className="space-y-2">
          <h3 className="text-xl font-semibold text-white">{entry.title}</h3>
          <p className="text-sm leading-6 text-[var(--color-text-muted)]">{entry.role}</p>
        </div>
        <p className="text-sm leading-7 text-[var(--color-text-main)]">{entry.summary}</p>
        <div className="flex flex-wrap gap-2">
          {entry.techStack.map((stack) => (
            <span key={stack} className="rounded-full border border-[var(--color-border)] px-3 py-1 font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--color-text-subtle)]">
              {stack}
            </span>
          ))}
        </div>
      </div>
    </article>
  )
}
