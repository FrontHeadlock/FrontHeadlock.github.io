import { AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { useProjects } from '../../entities/project/useProjects'
import { useStrings } from '../../shared/i18n/strings'
import { Reveal } from '../../shared/ui/Reveal'
import { SectionHeading } from '../../shared/ui/SectionHeading'
import { ProjectCard } from './ProjectCard'
import { ProjectDetailPanel } from './ProjectDetailPanel'

export function ProjectsSection() {
  const projects = useProjects()
  const strings = useStrings()
  const [selectedSlug, setSelectedSlug] = useState<string | null>(null)
  const activeProject = projects.find((project) => project.slug === selectedSlug) ?? null

  return (
    <section id="projects" aria-labelledby="projects-title" className="mx-auto max-w-7xl px-5 py-12 md:px-8 md:py-24">
      <Reveal>
        <div className="space-y-8">
          <SectionHeading
            id="projects-title"
            eyebrow={strings.projects.eyebrow}
            title={strings.projects.title}
            description={strings.projects.description}
          />

          <div className="grid gap-4 lg:grid-cols-2">
            {projects.map((project) => (
              <ProjectCard
                key={project.slug}
                project={project}
                isActive={activeProject?.slug === project.slug}
                onSelect={(slug) => setSelectedSlug((current) => (current === slug ? null : slug))}
              />
            ))}
          </div>

          <AnimatePresence mode="wait">
            {activeProject ? <ProjectDetailPanel key={activeProject.slug} project={activeProject} /> : null}
          </AnimatePresence>
        </div>
      </Reveal>
    </section>
  )
}
