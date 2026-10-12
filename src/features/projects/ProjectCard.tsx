import { m } from 'framer-motion'
import type { Project } from '../../entities/project/types'
import { useStrings } from '../../shared/i18n/strings'
import { cn } from '../../shared/lib/cn'
import { DecodeLabel } from '../../shared/ui/DecodeLabel'
import { TechStackChips } from '../../shared/ui/TechStackChips'
import { projectCardId, projectPanelId } from '../../entities/project/anchors'

type ProjectCardProps = {
  project: Project
  isActive: boolean
  onSelect: (slug: string) => void
}

/** 사내 · 학부 구분 태그. 카드와 패널 머리에서 라벨 옆에 붙는다. */
export function ProjectKindTag({ kind }: { kind: string }) {
  return (
    <span className="rounded-full border border-[var(--color-border)] px-2 py-0.5 font-mono text-label-xs uppercase tracking-label-tight text-[var(--color-text-subtle)]">
      {kind}
    </span>
  )
}

export function ProjectCard({ project, isActive, onSelect }: ProjectCardProps) {
  const strings = useStrings()

  return (
    <m.button
      type="button"
      layout
      layoutId={`project-card-${project.slug}`}
      id={projectCardId(project.slug)}
      onClick={() => onSelect(project.slug)}
      className={cn(
        'group scroll-mt-24 rounded-card border p-6 text-left transition duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-border-strong)]',
        isActive
          ? 'border-[var(--color-border-strong)] bg-[rgba(0,255,65,0.08)] shadow-[0_0_40px_rgba(0,255,65,0.12)]'
          : 'border-[var(--color-border)] bg-[var(--color-surface-card)] hover:border-[var(--color-border-strong)] hover:bg-[rgba(24,32,28,0.84)]',
      )}
      aria-expanded={isActive}
      aria-controls={isActive ? projectPanelId(project.slug) : undefined}
    >
      <div className="space-y-4">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <p className="font-mono text-label uppercase tracking-label text-[var(--color-accent)]">
                <DecodeLabel text={project.title} />
              </p>
              <ProjectKindTag kind={project.kind} />
            </div>
            <h3 className="text-xl font-semibold text-white">{project.subtitle}</h3>
          </div>
          <span className="font-mono text-label-sm uppercase tracking-label text-[var(--color-text-subtle)]">
            {isActive ? strings.projects.expanded : strings.projects.open}
          </span>
        </div>
        <p className="text-sm leading-7 text-[var(--color-text-main)]">{project.summary}</p>
        <p className="rounded-inner border border-[var(--color-border)] bg-[rgba(24,30,27,0.82)] px-4 py-3 text-sm text-[var(--color-text-muted)]">
          {project.focus}
        </p>
        <TechStackChips items={project.techStack} />
      </div>
    </m.button>
  )
}
