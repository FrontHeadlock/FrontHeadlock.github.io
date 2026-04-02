import { type ReactNode, useEffect, useState } from 'react'
import { MatrixOnboarding } from './MatrixOnboarding'

const ONBOARDING_KEY = 'fh_onboarding_seen_v1'

type OnboardingGateProps = {
  children: ReactNode
}

export function OnboardingGate({ children }: OnboardingGateProps) {
  const [ready, setReady] = useState(false)
  const [showOnboarding, setShowOnboarding] = useState(true)

  useEffect(() => {
    const syncFromPath = () => {
      const isRootPath = window.location.pathname === '/' || window.location.pathname === ''
      const seen = window.sessionStorage.getItem(ONBOARDING_KEY) === '1'
      const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

      if (isRootPath) {
        setShowOnboarding(true)
      } else if (seen || reducedMotion) {
        setShowOnboarding(false)
      }

      setReady(true)
    }

    syncFromPath()
    window.addEventListener('popstate', syncFromPath)
    return () => {
      window.removeEventListener('popstate', syncFromPath)
    }
  }, [])

  const completeOnboarding = () => {
    window.sessionStorage.setItem(ONBOARDING_KEY, '1')
    setShowOnboarding(false)
  }

  if (!ready) {
    return null
  }

  if (showOnboarding) {
    return <MatrixOnboarding onComplete={completeOnboarding} />
  }

  return <>{children}</>
}
