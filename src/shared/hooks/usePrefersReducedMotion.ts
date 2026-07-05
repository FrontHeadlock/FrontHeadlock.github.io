import { useEffect, useState } from 'react'

export function usePrefersReducedMotion() {
  const [reducedMotion, setReducedMotion] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    const updateMotionPreference = () => setReducedMotion(mediaQuery.matches)

    updateMotionPreference()
    mediaQuery.addEventListener?.('change', updateMotionPreference)

    return () => mediaQuery.removeEventListener?.('change', updateMotionPreference)
  }, [])

  return reducedMotion
}
