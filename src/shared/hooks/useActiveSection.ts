import { useEffect, useState } from 'react'

export function useActiveSection(sectionIds: string[]) {
  const [activeSection, setActiveSection] = useState(sectionIds[0] ?? '')

  useEffect(() => {
    setActiveSection(sectionIds[0] ?? '')

    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((element): element is HTMLElement => element !== null)

    if (elements.length === 0) {
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting)
        if (visible.length === 0) {
          return
        }

        const topMost = visible.reduce((closest, entry) =>
          entry.boundingClientRect.top < closest.boundingClientRect.top ? entry : closest,
        )
        setActiveSection(topMost.target.id)
      },
      { rootMargin: '-15% 0px -70% 0px', threshold: 0 },
    )

    elements.forEach((element) => observer.observe(element))

    return () => observer.disconnect()
  }, [sectionIds])

  return activeSection
}
