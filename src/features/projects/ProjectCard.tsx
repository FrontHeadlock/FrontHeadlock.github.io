import { motion } from 'framer-motion'
import type { Project } from '../../entities/project/types'
import { cn } from '../../shared/lib/cn'

type ProjectCardProps = {
  project: Project
  isActive: boolean
  onSelect: (slug: string) => void
}

export function ProjectCard({ project, isActive, onSelect }: ProjectCardProps) {
  return (
    <motion.button
      type="button"
      layout
      layoutId={`project-card-${project.slug}`}
      onClick={() => onSelect(project.slug)}
      className={cn(
        'group rounded-3xl border p-6 text-left transition duration-300',
        isActive
          ? 'border-[var(--color-border-strong)] bg-[rgba(0,255,65,0.08)] shadow-[0_0_40px_rgba(0,255,65,0.12)]'
          : 'border-[var(--color-border)] bg-[rgba(18,22,20,0.72)] hover:border-[var(--color-border-strong)] hover:bg-[rgba(24,32,28,0.84)]',
      )}
      aria-expanded={isActive}
      aria-controls={isActive ? `project-panel-${project.slug}` : undefined}
    >
      <div className="space-y-4">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="space-y-2">
            <p className="font-mono text-xs uppercase tracking-[0.24em] text-[var(--color-accent)]">{project.title}</p>
            <h3 className="text-xl font-semibold text-white">{project.subtitle}</h3>
          </div>
          <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--color-text-subtle)]">
            {isActive ? 'Expanded' : 'Open'}
          </span>
        </div>
        <p className="text-sm leading-7 text-[var(--color-text-main)]">{project.summary}</p>
        <p className="rounded-2xl border border-[var(--color-border)] bg-[rgba(24,30,27,0.82)] px-4 py-3 text-sm text-[var(--color-text-muted)]">
          {project.focus}
        </p>
        <div className="flex flex-wrap gap-2">
          {project.techStack.map((stack) => (
            <span key={stack} className="rounded-full border border-[var(--color-border)] px-3 py-1 font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--color-text-subtle)]">
              {stack}
            </span>
          ))}
        </div>
      </div>
    </motion.button>
  )
}
