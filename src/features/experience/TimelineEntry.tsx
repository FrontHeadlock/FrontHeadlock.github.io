import type { ExperienceEntry } from '../../entities/experience/types'
import { useStrings } from '../../shared/i18n/strings'
import { TechStackChips } from '../../shared/ui/TechStackChips'

type TimelineEntryProps = {
  entry: ExperienceEntry
}

export function TimelineEntry({ entry }: TimelineEntryProps) {
  const strings = useStrings()

  return (
    <article className="grid gap-4 rounded-3xl border border-[var(--color-border)] bg-[var(--color-surface-card)] p-5 md:grid-cols-[140px_1fr]">
      <div className="space-y-3">
        <p className="font-mono text-xs uppercase tracking-[0.22em] text-[var(--color-accent)]">{entry.category}</p>
        <p className="font-mono text-xs text-[var(--color-text-subtle)]">{entry.dateLabel ?? strings.experience.sequenceLog}</p>
      </div>
      <div className="space-y-4">
        <div className="space-y-2">
          <h3 className="text-xl font-semibold text-white">{entry.title}</h3>
          <p className="text-sm leading-6 text-[var(--color-text-muted)]">{entry.role}</p>
        </div>
        <p className="text-sm leading-7 text-[var(--color-text-main)]">{entry.summary}</p>
        <TechStackChips items={entry.techStack} />
      </div>
    </article>
  )
}
