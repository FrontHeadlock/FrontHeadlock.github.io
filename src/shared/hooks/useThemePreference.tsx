import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from 'react'

export type Theme = 'light' | 'dark'

const STORAGE_KEY = 'theme'
const THEME_COLOR: Record<Theme, string> = { light: '#ffffff', dark: '#0a0a0a' }

type ThemePreferenceContextValue = {
  theme: Theme
  toggle: () => void
}

const ThemePreferenceContext = createContext<ThemePreferenceContextValue | null>(null)

/**
 * 기본은 라이트. 저장값이 'dark'일 때만 다크(매트릭스 테마)로 시작한다.
 * OS의 prefers-color-scheme은 따르지 않는다 — 포트폴리오의 첫인상을 라이트로 고정하기 위한 결정.
 * index.html의 인라인 스크립트가 같은 규칙으로 첫 그리기 전에 data-theme을 먼저 붙여 깜빡임을 막는다.
 */
export function readStoredTheme(): Theme {
  try {
    return window.localStorage.getItem(STORAGE_KEY) === 'dark' ? 'dark' : 'light'
  } catch {
    return 'light'
  }
}

export function applyTheme(theme: Theme) {
  document.documentElement.dataset.theme = theme
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', THEME_COLOR[theme])
}

export function ThemePreferenceProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>(readStoredTheme)

  useEffect(() => {
    applyTheme(theme)

    try {
      window.localStorage.setItem(STORAGE_KEY, theme)
    } catch {
      // localStorage may be unavailable (private browsing, disabled storage) — preference just won't persist.
    }
  }, [theme])

  const toggle = useCallback(() => {
    setTheme((current) => (current === 'dark' ? 'light' : 'dark'))
  }, [])

  return <ThemePreferenceContext.Provider value={{ theme, toggle }}>{children}</ThemePreferenceContext.Provider>
}

export function useThemePreference() {
  const context = useContext(ThemePreferenceContext)
  if (!context) {
    throw new Error('useThemePreference must be used within a ThemePreferenceProvider')
  }

  return context
}
