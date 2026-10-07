import { m } from 'framer-motion'
import { useEffect, useRef } from 'react'
import type { Project } from '../../entities/project/types'
import { useStrings } from '../../shared/i18n/strings'
import { TechStackChips } from '../../shared/ui/TechStackChips'
import { TroubleshootingAlert } from './TroubleshootingAlert'

export const projectPanelId = (slug: string) => `project-panel-${slug}`

type ProjectDetailPanelProps = {
  project: Project
  onClose: () => void
}

function DetailBlock({ title, items }: { title: string; items: string[] }) {
  return (
    <section className="space-y-3">
      <h4 className="font-mono text-label uppercase tracking-label text-[var(--color-accent)]">{title}</h4>
      <ul className="grid gap-3">
        {items.map((item) => (
          <li key={item} className="rounded-inner border border-[var(--color-border)] bg-[var(--color-surface-card)] px-4 py-3 text-sm leading-7 text-[var(--color-text-main)]">
            {item}
          </li>
        ))}
      </ul>
    </section>
  )
}

export function ProjectDetailPanel({ project, onClose }: ProjectDetailPanelProps) {
  const strings = useStrings()
  const panelRef = useRef<HTMLDivElement | null>(null)

  // 패널은 카드 그리드 전체 아래에 렌더되므로 윗줄 카드를 누르면 화면 밖에 열린다.
  // 마운트 시(프로젝트 전환으로 다시 마운트될 때 포함) 상단이 헤더에 가렸거나 뷰포트 하단 40% 아래면
  // scroll-mt 여백만큼 띄워 스크롤하고, 포커스를 패널로 옮긴다.
  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      const panel = panelRef.current
      if (!panel) {
        return
      }

      const headerHeight = document.querySelector('header[data-site-header]')?.getBoundingClientRect().height ?? 0
      const { top } = panel.getBoundingClientRect()
      const hiddenAbove = top < headerHeight
      const hiddenBelow = top > window.innerHeight * 0.6

      if ((hiddenAbove || hiddenBelow) && typeof panel.scrollIntoView === 'function') {
        const behavior: ScrollBehavior = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth'
        panel.scrollIntoView({ block: 'start', behavior })
      }

      panel.focus({ preventScroll: true })
    })

    return () => window.cancelAnimationFrame(frame)
  }, [])

  return (
    <m.div
      ref={panelRef}
      id={projectPanelId(project.slug)}
      tabIndex={-1}
      layout
      layoutId={projectPanelId(project.slug)}
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 12 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      // scroll-mt: 스크롤 진입 시 sticky 헤더 아래로 여백을 확보. before: 선택 카드에서 이어진 신호선처럼 읽히는 상단 액센트.
      className="relative scroll-mt-24 rounded-card border border-[var(--color-border-strong)] bg-[var(--color-surface-strong)] p-6 outline-none before:absolute before:inset-x-8 before:top-0 before:h-px before:bg-gradient-to-r before:from-transparent before:via-[var(--color-accent)] before:to-transparent before:opacity-80 before:content-[''] md:p-8"
    >
      <div className="space-y-8">
        <m.div layoutId={`project-card-${project.slug}`} className="flex items-start justify-between gap-4">
          <div className="space-y-2">
            <p className="font-mono text-label uppercase tracking-label text-[var(--color-accent)]">{project.title}</p>
            <h3 className="text-2xl font-semibold text-white md:text-3xl">{project.subtitle}</h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="inline-flex min-h-11 shrink-0 items-center rounded-full border border-[var(--color-border)] px-4 font-mono text-label-sm uppercase tracking-label text-[var(--color-text-subtle)] transition hover:border-[var(--color-border-strong)] hover:text-[var(--color-accent)] focus-visible:border-[var(--color-border-strong)] focus-visible:text-[var(--color-accent)] focus-visible:outline-none"
          >
            [ {strings.projects.close} ]
          </button>
        </m.div>

        <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="space-y-4">
            <div className="space-y-2">
              <h4 className="font-mono text-label uppercase tracking-label text-[var(--color-accent)]">{strings.projectDetail.overview}</h4>
              <p className="text-sm leading-7 text-[var(--color-text-main)]">{project.overview}</p>
            </div>
            {project.architectureNotes ? (
              <div className="rounded-inner border border-[var(--color-border)] bg-[var(--color-surface-deep)] p-4 font-mono text-label uppercase tracking-label-tight text-[var(--color-text-subtle)]">
                {project.architectureNotes.map((note) => (
                  <p key={note} className="leading-7">
                    {note}
                  </p>
                ))}
              </div>
            ) : null}
          </div>
          <div className="rounded-card border border-[var(--color-border)] bg-[var(--color-surface-card)] p-5">
            <p className="font-mono text-label uppercase tracking-label text-[var(--color-text-subtle)]">{strings.projectDetail.techStack}</p>
            <div className="mt-4">
              <TechStackChips items={project.techStack} tone="main" />
            </div>
            <div className="mt-6 space-y-2">
              <h4 className="font-mono text-label uppercase tracking-label text-[var(--color-accent)]">{strings.projectDetail.role}</h4>
              <p className="text-sm leading-7 text-[var(--color-text-main)]">{project.role}</p>
            </div>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          <DetailBlock title={strings.projectDetail.problemContext} items={project.problem} />
          <DetailBlock title={strings.projectDetail.approach} items={project.approach} />
          <DetailBlock title={strings.projectDetail.outcomes} items={project.outcomes} />
          <DetailBlock title={strings.projectDetail.learnings} items={project.learnings} />
        </div>

        <section className="space-y-4">
          <h4 className="font-mono text-label uppercase tracking-label text-[var(--color-accent)]">{strings.projectDetail.troubleshooting}</h4>
          <div className="grid gap-4">
            {project.troubleshooting.map((item) => (
              <TroubleshootingAlert key={item.title} item={item} />
            ))}
          </div>
        </section>
      </div>
    </m.div>
  )
}
