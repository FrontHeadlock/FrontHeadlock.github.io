import { ExternalLink } from 'lucide-react'
import type { ExperienceEntry } from '../../entities/experience/types'
import { projectCardId } from '../../entities/project/anchors'
import { useProjects } from '../../entities/project/useProjects'
import { useScrollReveal } from '../../shared/hooks/useScrollReveal'
import { useStrings } from '../../shared/i18n/strings'
import { cn } from '../../shared/lib/cn'
import { describeRecordUrl, hostnameOf } from '../../shared/lib/recordUrl'
import { REVEAL, staggerDelay } from '../../shared/lib/motion'
import { TechStackChips } from '../../shared/ui/TechStackChips'

type TimelineEntryProps = {
  entry: ExperienceEntry
  index: number
  isFirst: boolean
  isLast: boolean
}

type RecordLinkProps = {
  href: string
  label: string
  inline?: boolean
}

/**
 * 공개 기록(PR·change·이슈)으로 나가는 아이콘 링크.
 * 접근성 이름에 호스트+경로를 붙여 같은 라벨의 링크가 여러 개여도 구분되고, 터치 영역은 24px 상자로 확보한다.
 */
function RecordLink({ href, label, inline = false }: RecordLinkProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={`${label} (${describeRecordUrl(href)})`}
      title={hostnameOf(href) || undefined}
      className={cn(
        'inline-flex h-6 w-6 items-center justify-center text-[var(--color-text-subtle)] transition hover:text-[var(--color-accent)] focus-visible:text-[var(--color-accent)] focus-visible:outline-none',
        inline ? 'ml-1 align-middle' : 'shrink-0',
      )}
    >
      <ExternalLink size={inline ? 13 : 16} aria-hidden="true" />
    </a>
  )
}

/** 성과 문장 + 링크 아이콘. 아이콘이 줄 끝에서 혼자 다음 줄로 떨어지지 않도록 마지막 단어와 묶는다. */
function HighlightText({ text, href, label }: { text: string; href?: string; label: string }) {
  if (!href) {
    return <>{text}</>
  }

  const lastSpace = text.lastIndexOf(' ')
  const head = lastSpace === -1 ? '' : text.slice(0, lastSpace + 1)
  const tail = lastSpace === -1 ? text : text.slice(lastSpace + 1)

  return (
    <>
      {head}
      <span className="whitespace-nowrap">
        {tail}
        <RecordLink href={href} label={label} inline />
      </span>
    </>
  )
}

export function TimelineEntry({ entry, index, isFirst, isLast }: TimelineEntryProps) {
  const strings = useStrings()
  const projects = useProjects()
  const { ref, revealed } = useScrollReveal<HTMLLIElement>()
  const delay = `${staggerDelay(index)}s`
  // 원고의 slug가 아직 프로젝트 섹션에 없으면 조용히 건너뛴다.
  const relatedProjects = (entry.relatedProjects ?? [])
    .map((slug) => projects.find((project) => project.slug === slug))
    .filter((project) => project !== undefined)

  return (
    <li ref={ref} className="relative">
      {/* 레일 충전 구간: 위 항목과의 간격(gap-4)부터 이 항목 하단까지. 첫/마지막 항목은 기준선 끝에 맞춘다. */}
      <span
        aria-hidden="true"
        style={{ transitionDelay: delay }}
        className={cn(
          'timeline-rail absolute -left-8 ml-[5px] w-px origin-top bg-[var(--color-accent)] shadow-[0_0_8px_var(--color-accent-glow-soft)] transition-transform duration-700 ease-out motion-reduce:transition-none',
          isFirst ? 'top-3' : '-top-4',
          isLast ? 'bottom-3' : 'bottom-0',
          revealed ? 'scale-y-100' : 'scale-y-0',
        )}
      />
      {/* 노드: 헤더의 status 점과 같은 핑을 노출 순간 두 번만 재생해 "켜지는" 인상을 준다. */}
      <span aria-hidden="true" className="timeline-node absolute -left-8 top-7 flex h-[11px] w-[11px] items-center justify-center">
        {revealed ? (
          <span className="absolute inset-0 rounded-full bg-[var(--color-accent-glow-soft)] animate-ping [animation-duration:1.4s] [animation-iteration-count:2] motion-reduce:hidden" />
        ) : null}
        <span
          style={{ transitionDelay: delay }}
          className={cn(
            'relative h-[11px] w-[11px] rounded-full border transition-colors duration-500',
            revealed
              ? 'border-[var(--color-accent)] bg-[var(--color-accent)] shadow-[0_0_14px_var(--color-accent-glow)]'
              : 'border-[var(--color-border)] bg-[var(--color-bg)]',
          )}
        />
      </span>

      <article
        data-reveal={revealed ? 'revealed' : 'pending'}
        style={{ transitionDelay: delay, transitionDuration: `${REVEAL.duration}s` }}
        className={cn(
          'theme-card grid gap-4 rounded-card border border-[var(--color-border)] bg-[var(--color-surface-card)] p-5 transition ease-out motion-reduce:!translate-y-0 motion-reduce:!opacity-100 md:grid-cols-[140px_1fr]',
          revealed ? 'translate-y-0 opacity-100' : 'translate-y-3 opacity-0',
        )}
      >
        <div className="space-y-3">
          <p className="font-mono text-label uppercase tracking-label text-[var(--color-accent)]">{entry.category}</p>
          <p className="font-mono text-label text-[var(--color-text-subtle)]">{entry.dateLabel ?? strings.experience.sequenceLog}</p>
        </div>
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex items-start justify-between gap-3">
              <h3 className="text-xl font-semibold text-[var(--color-text-strong)]">{entry.title}</h3>
              {entry.link ? <RecordLink href={entry.link} label={strings.experience.publicRecord} /> : null}
            </div>
            {entry.organization ? (
              <p className="font-mono text-label-sm tracking-label-tight text-[var(--color-text-subtle)]">{entry.organization}</p>
            ) : null}
            {entry.role ? <p className="text-sm leading-6 text-[var(--color-text-muted)]">{entry.role}</p> : null}
          </div>
          {entry.summary ? <p className="whitespace-pre-line text-sm leading-7 text-[var(--color-text-main)]">{entry.summary}</p> : null}
          {entry.highlights && entry.highlights.length > 0 ? (
            <ul className="grid list-disc gap-2 pl-4 marker:text-[var(--color-accent)]">
              {entry.highlights.map((highlight) => (
                <li key={highlight.text} className="text-sm leading-6 text-[var(--color-text-muted)]">
                  <HighlightText text={highlight.text} href={highlight.href} label={strings.experience.publicRecord} />
                </li>
              ))}
            </ul>
          ) : null}
          {entry.techStack.length > 0 ? <TechStackChips items={entry.techStack} /> : null}
          {relatedProjects.length > 0 ? (
            <p className="flex flex-wrap items-center gap-2">
              <span className="mr-1 font-mono text-label-sm uppercase tracking-label text-[var(--color-text-subtle)]">
                {strings.experience.relatedProjects}
              </span>
              {relatedProjects.map((project) => (
                <a
                  key={project.slug}
                  href={`#${projectCardId(project.slug)}`}
                  className="rounded-full border border-[var(--color-border)] px-3 py-1 font-mono text-label-sm uppercase tracking-label-tight text-[var(--color-text-muted)] transition hover:border-[var(--color-border-strong)] hover:text-[var(--color-accent)] focus-visible:border-[var(--color-border-strong)] focus-visible:text-[var(--color-accent)] focus-visible:outline-none"
                >
                  {project.title} →
                </a>
              ))}
            </p>
          ) : null}
        </div>
      </article>
    </li>
  )
}
