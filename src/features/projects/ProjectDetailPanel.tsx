import { m } from 'framer-motion'
import type { Project } from '../../entities/project/types'
import { useStrings } from '../../shared/i18n/strings'
import { TechStackChips } from '../../shared/ui/TechStackChips'
import { TroubleshootingAlert } from './TroubleshootingAlert'

type ProjectDetailPanelProps = {
  project: Project
}

function DetailBlock({ title, items }: { title: string; items: string[] }) {
  return (
    <section className="space-y-3">
      <h4 className="font-mono text-xs uppercase tracking-[0.22em] text-[var(--color-accent)]">{title}</h4>
      <ul className="grid gap-3">
        {items.map((item) => (
          <li key={item} className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface-card)] px-4 py-3 text-sm leading-7 text-[var(--color-text-main)]">
            {item}
          </li>
        ))}
      </ul>
    </section>
  )
}

export function ProjectDetailPanel({ project }: ProjectDetailPanelProps) {
  const strings = useStrings()

  return (
    <m.div
      id={`project-panel-${project.slug}`}
      layout
      layoutId={`project-panel-${project.slug}`}
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 12 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className="rounded-[2rem] border border-[var(--color-border-strong)] bg-[var(--color-surface-strong)] p-6 md:p-8"
    >
      <div className="space-y-8">
        <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
          <m.div layoutId={`project-card-${project.slug}`} className="space-y-4">
            <p className="font-mono text-xs uppercase tracking-[0.24em] text-[var(--color-accent)]">{project.title}</p>
            <h3 className="text-2xl font-semibold text-white md:text-3xl">{project.subtitle}</h3>
            <div className="space-y-2">
              <h4 className="font-mono text-xs uppercase tracking-[0.22em] text-[var(--color-accent)]">{strings.projectDetail.overview}</h4>
              <p className="text-sm leading-7 text-[var(--color-text-main)]">{project.overview}</p>
            </div>
            {project.architectureNotes ? (
              <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface-deep)] p-4 font-mono text-xs uppercase tracking-[0.16em] text-[var(--color-text-subtle)]">
                {project.architectureNotes.map((note) => (
                  <p key={note} className="leading-7">
                    {note}
                  </p>
                ))}
              </div>
            ) : null}
          </m.div>
          <div className="rounded-3xl border border-[var(--color-border)] bg-[var(--color-surface-card)] p-5">
            <p className="font-mono text-xs uppercase tracking-[0.22em] text-[var(--color-text-subtle)]">{strings.projectDetail.techStack}</p>
            <div className="mt-4">
              <TechStackChips items={project.techStack} tone="main" />
            </div>
            <div className="mt-6 space-y-2">
              <h4 className="font-mono text-xs uppercase tracking-[0.22em] text-[var(--color-accent)]">{strings.projectDetail.role}</h4>
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
          <h4 className="font-mono text-xs uppercase tracking-[0.22em] text-[var(--color-accent)]">{strings.projectDetail.troubleshooting}</h4>
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
