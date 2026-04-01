import { AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { projects } from '../../entities/project/data'
import { Reveal } from '../../shared/ui/Reveal'
import { SectionHeading } from '../../shared/ui/SectionHeading'
import { ProjectCard } from './ProjectCard'
import { ProjectDetailPanel } from './ProjectDetailPanel'

export function ProjectsSection() {
  const [selectedSlug, setSelectedSlug] = useState<string | null>(null)
  const activeProject = projects.find((project) => project.slug === selectedSlug) ?? null

  return (
    <section id="projects" aria-labelledby="projects-title" className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-24">
      <Reveal>
        <div className="space-y-8">
          <SectionHeading
            id="projects-title"
            eyebrow="Projects"
            title="성과와 구조적 판단이 먼저 보이도록 프로젝트를 배치했습니다."
            description="대표 프로젝트는 Geulda, OldYoung, Kubernetes, CATXI 순으로 배치하고, 카드를 선택하면 같은 흐름 안에서 상세 이력서가 열리도록 구성합니다."
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
