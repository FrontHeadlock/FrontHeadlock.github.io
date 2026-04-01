import { useEffect, useState } from 'react'

export function useActiveSection(sectionIds: string[]) {
  const [activeSection, setActiveSection] = useState(sectionIds[0] ?? '')

  useEffect(() => {
    setActiveSection(sectionIds[0] ?? '')
  }, [sectionIds])

  return activeSection
}
