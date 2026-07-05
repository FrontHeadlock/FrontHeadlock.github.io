import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from 'react'

const STORAGE_KEY = 'matrix-rain-enabled'

type RainPreferenceContextValue = {
  enabled: boolean
  toggle: () => void
}

const RainPreferenceContext = createContext<RainPreferenceContextValue | null>(null)

function readStoredPreference() {
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY)
    return stored === null ? true : stored === 'true'
  } catch {
    return true
  }
}

export function RainPreferenceProvider({ children }: { children: ReactNode }) {
  const [enabled, setEnabled] = useState(readStoredPreference)

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, String(enabled))
    } catch {
      // localStorage may be unavailable (private browsing, disabled storage) — preference just won't persist.
    }
  }, [enabled])

  const toggle = useCallback(() => {
    setEnabled((current) => !current)
  }, [])

  return <RainPreferenceContext.Provider value={{ enabled, toggle }}>{children}</RainPreferenceContext.Provider>
}

export function useRainPreference() {
  const context = useContext(RainPreferenceContext)
  if (!context) {
    throw new Error('useRainPreference must be used within a RainPreferenceProvider')
  }

  return context
}
