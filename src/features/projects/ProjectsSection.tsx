import { AnimatePresence } from 'framer-motion'
import { useCallback, useEffect, useState } from 'react'
import { useProjects } from '../../entities/project/useProjects'
import { useStrings } from '../../shared/i18n/strings'
import { Reveal } from '../../shared/ui/Reveal'
import { SectionHeading } from '../../shared/ui/SectionHeading'
import { ProjectCard, projectCardId } from './ProjectCard'
import { ProjectDetailPanel, projectPanelId } from './ProjectDetailPanel'

export function ProjectsSection() {
  const projects = useProjects()
  const strings = useStrings()
  const [selectedSlug, setSelectedSlug] = useState<string | null>(null)
  const activeProject = projects.find((project) => project.slug === selectedSlug) ?? null

  const close = useCallback(
    ({ restoreFocus = true }: { restoreFocus?: boolean } = {}) => {
      if (selectedSlug && restoreFocus) {
        // 닫은 뒤 포커스를 열었던 카드로 돌려 키보드 사용자가 위치를 잃지 않게 한다.
        document.getElementById(projectCardId(selectedSlug))?.focus({ preventScroll: true })
      }

      setSelectedSlug(null)
    },
    [selectedSlug],
  )

  useEffect(() => {
    if (!selectedSlug) {
      return
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Escape' || event.defaultPrevented) {
        return
      }

      // 팔레트·모바일 메뉴 같은 상위 레이어가 열려 있으면 그쪽의 ESC다.
      if (document.querySelector('[aria-modal="true"], #mobile-nav')) {
        return
      }

      // 포커스가 패널·카드 밖(예: 연락처 섹션)에 있으면 사용자는 다른 작업 중 — 패널을 건드리지 않는다.
      const active = document.activeElement
      const panel = document.getElementById(projectPanelId(selectedSlug))
      const card = document.getElementById(projectCardId(selectedSlug))
      const ownsFocus = !active || active === document.body || panel?.contains(active) || active === card

      if (ownsFocus) {
        close()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [selectedSlug, close])

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
            {activeProject ? <ProjectDetailPanel key={activeProject.slug} project={activeProject} onClose={() => close()} /> : null}
          </AnimatePresence>
        </div>
      </Reveal>
    </section>
  )
}
