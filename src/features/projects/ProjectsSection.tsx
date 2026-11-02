import { AnimatePresence } from 'framer-motion'
import { useCallback, useEffect, useState } from 'react'
import { projectCardId, projectPanelId } from '../../entities/project/anchors'
import { useProjects } from '../../entities/project/useProjects'
import { useStrings } from '../../shared/i18n/strings'
import { Reveal } from '../../shared/ui/Reveal'
import { SectionHeading } from '../../shared/ui/SectionHeading'
import { ProjectCard } from './ProjectCard'
import { ProjectDetailPanel } from './ProjectDetailPanel'

/**
 * 해시가 이 카드를 가리키면 지운다. 닫은 뒤 같은 "관련 프로젝트" 링크를 다시 눌러도 hashchange가 나고,
 * 새로고침해도 닫아 둔 패널이 다시 열리지 않는다. 스크롤 위치는 그대로다.
 */
function clearCardHash(slug: string) {
  if (window.location.hash === `#${projectCardId(slug)}`) {
    window.history.replaceState(null, '', window.location.pathname + window.location.search)
  }
}

export function ProjectsSection() {
  const projects = useProjects()
  const strings = useStrings()
  const [selectedSlug, setSelectedSlug] = useState<string | null>(null)
  const activeProject = projects.find((project) => project.slug === selectedSlug) ?? null
  // slug는 두 로케일이 같으므로, 언어를 바꿔도 해시 효과가 다시 돌지 않도록 slug 목록 문자열을 의존성으로 쓴다.
  const slugKey = projects.map((project) => project.slug).join(' ')

  const close = useCallback(
    ({ restoreFocus = true }: { restoreFocus?: boolean } = {}) => {
      if (selectedSlug) {
        clearCardHash(selectedSlug)

        if (restoreFocus) {
          // 닫은 뒤 포커스를 열었던 카드로 돌려 키보드 사용자가 위치를 잃지 않게 한다.
          document.getElementById(projectCardId(selectedSlug))?.focus({ preventScroll: true })
        }
      }

      setSelectedSlug(null)
    },
    [selectedSlug],
  )

  const select = (slug: string) => {
    if (selectedSlug) {
      clearCardHash(selectedSlug)
    }

    setSelectedSlug(selectedSlug === slug ? null : slug)
  }

  // 경력 카드의 "관련 프로젝트" 링크는 #project-card-<slug>로 이동한다. 카드로 스크롤만 하고 끝나면
  // 사용자가 다시 눌러야 하므로, 해시가 카드를 가리키면 패널까지 바로 펼친다. 패널의 마운트 효과가 이어서 스크롤·포커스를 맡는다.
  useEffect(() => {
    const slugs = slugKey.split(' ')
    const openFromHash = () => {
      const match = /^#project-card-(.+)$/.exec(window.location.hash)
      if (match && slugs.includes(match[1])) {
        setSelectedSlug(match[1])
      }
    }

    openFromHash()
    window.addEventListener('hashchange', openFromHash)
    return () => window.removeEventListener('hashchange', openFromHash)
  }, [slugKey])

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
    <section id="projects" aria-labelledby="projects-title" className="theme-alt">
      <Reveal>
        <div className="mx-auto max-w-7xl space-y-8 px-5 py-12 md:px-8 md:py-24">
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
                onSelect={select}
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
