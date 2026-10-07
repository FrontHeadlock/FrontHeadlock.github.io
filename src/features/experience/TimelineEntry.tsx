import type { ExperienceEntry } from '../../entities/experience/types'
import { useScrollReveal } from '../../shared/hooks/useScrollReveal'
import { useStrings } from '../../shared/i18n/strings'
import { cn } from '../../shared/lib/cn'
import { REVEAL, staggerDelay } from '../../shared/lib/motion'
import { TechStackChips } from '../../shared/ui/TechStackChips'

type TimelineEntryProps = {
  entry: ExperienceEntry
  index: number
  isFirst: boolean
  isLast: boolean
}

export function TimelineEntry({ entry, index, isFirst, isLast }: TimelineEntryProps) {
  const strings = useStrings()
  const { ref, revealed } = useScrollReveal<HTMLLIElement>()
  const delay = `${staggerDelay(index)}s`

  return (
    <li ref={ref} className="relative">
      {/* 레일 충전 구간: 위 항목과의 간격(gap-4)부터 이 항목 하단까지. 첫/마지막 항목은 기준선 끝에 맞춘다. */}
      <span
        aria-hidden="true"
        style={{ transitionDelay: delay }}
        className={cn(
          'timeline-rail absolute -left-8 ml-[5px] w-px origin-top bg-[var(--color-accent)] shadow-[0_0_8px_rgba(0,255,65,0.6)] transition-transform duration-700 ease-out motion-reduce:transition-none',
          isFirst ? 'top-3' : '-top-4',
          isLast ? 'bottom-3' : 'bottom-0',
          revealed ? 'scale-y-100' : 'scale-y-0',
        )}
      />
      {/* 노드: 헤더의 status 점과 같은 핑을 노출 순간 두 번만 재생해 "켜지는" 인상을 준다. */}
      <span aria-hidden="true" className="timeline-node absolute -left-8 top-7 flex h-[11px] w-[11px] items-center justify-center">
        {revealed ? (
          <span className="absolute inset-0 rounded-full bg-[rgba(0,255,65,0.55)] animate-ping [animation-duration:1.4s] [animation-iteration-count:2] motion-reduce:hidden" />
        ) : null}
        <span
          style={{ transitionDelay: delay }}
          className={cn(
            'relative h-[11px] w-[11px] rounded-full border transition-colors duration-500',
            revealed
              ? 'border-[var(--color-accent)] bg-[var(--color-accent)] shadow-[0_0_14px_rgba(0,255,65,0.95)]'
              : 'border-[var(--color-border)] bg-[var(--color-bg)]',
          )}
        />
      </span>

      <article
        data-reveal={revealed ? 'revealed' : 'pending'}
        style={{ transitionDelay: delay, transitionDuration: `${REVEAL.duration}s` }}
        className={cn(
          'grid gap-4 rounded-card border border-[var(--color-border)] bg-[var(--color-surface-card)] p-5 transition ease-out motion-reduce:!translate-y-0 motion-reduce:!opacity-100 md:grid-cols-[140px_1fr]',
          revealed ? 'translate-y-0 opacity-100' : 'translate-y-3 opacity-0',
        )}
      >
        <div className="space-y-3">
          <p className="font-mono text-label uppercase tracking-label text-[var(--color-accent)]">{entry.category}</p>
          <p className="font-mono text-label text-[var(--color-text-subtle)]">{entry.dateLabel ?? strings.experience.sequenceLog}</p>
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
    </li>
  )
}
