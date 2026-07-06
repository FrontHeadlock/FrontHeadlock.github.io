import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from 'react'
import { documentMeta } from './meta'

export type Locale = 'ko' | 'en'

const STORAGE_KEY = 'locale'

type LocaleContextValue = {
  locale: Locale
  setLocale: (locale: Locale) => void
  toggleLocale: () => void
}

const LocaleContext = createContext<LocaleContextValue | null>(null)

function detectInitialLocale(): Locale {
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY)
    if (stored === 'ko' || stored === 'en') {
      return stored
    }
  } catch {
    // localStorage unavailable (private browsing, disabled storage) — fall through to navigator detection
  }

  return window.navigator.language?.toLowerCase().startsWith('ko') ? 'ko' : 'en'
}

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(detectInitialLocale)

  useEffect(() => {
    document.documentElement.lang = locale
    document.title = documentMeta[locale].title
    document.querySelector('meta[name="description"]')?.setAttribute('content', documentMeta[locale].description)

    try {
      window.localStorage.setItem(STORAGE_KEY, locale)
    } catch {
      // preference just won't persist across reloads
    }
  }, [locale])

  const setLocale = useCallback((next: Locale) => setLocaleState(next), [])
  const toggleLocale = useCallback(() => setLocaleState((current) => (current === 'ko' ? 'en' : 'ko')), [])

  return <LocaleContext.Provider value={{ locale, setLocale, toggleLocale }}>{children}</LocaleContext.Provider>
}

export function useLocale() {
  const context = useContext(LocaleContext)
  if (!context) {
    throw new Error('useLocale must be used within a LocaleProvider')
  }

  return context
}
