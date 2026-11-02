import { act, render, screen } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import { ThemePreferenceProvider, readStoredTheme, useThemePreference } from './useThemePreference'

function Probe() {
  const { theme, toggle } = useThemePreference()

  return (
    <button type="button" onClick={toggle}>
      {theme}
    </button>
  )
}

function renderTheme() {
  return render(
    <ThemePreferenceProvider>
      <Probe />
    </ThemePreferenceProvider>,
  )
}

describe('useThemePreference', () => {
  beforeEach(() => {
    window.localStorage.clear()
    delete document.documentElement.dataset.theme
    document.head.innerHTML = '<meta name="theme-color" content="#0a0a0a" />'
  })

  afterEach(() => {
    window.localStorage.clear()
    delete document.documentElement.dataset.theme
    document.head.innerHTML = ''
  })

  it('defaults to light and ignores the OS preference', () => {
    expect(readStoredTheme()).toBe('light')

    renderTheme()

    expect(screen.getByRole('button')).toHaveTextContent('light')
    expect(document.documentElement.dataset.theme).toBe('light')
    expect(document.querySelector('meta[name="theme-color"]')).toHaveAttribute('content', '#ffffff')
    expect(window.localStorage.getItem('theme')).toBe('light')
  })

  it('starts dark only when the stored preference is dark', () => {
    window.localStorage.setItem('theme', 'dark')

    renderTheme()

    expect(screen.getByRole('button')).toHaveTextContent('dark')
    expect(document.documentElement.dataset.theme).toBe('dark')
    expect(document.querySelector('meta[name="theme-color"]')).toHaveAttribute('content', '#0a0a0a')
  })

  it('treats any other stored value as light', () => {
    window.localStorage.setItem('theme', 'blue')

    expect(readStoredTheme()).toBe('light')
  })

  it('toggles between the themes and persists the choice', () => {
    renderTheme()

    act(() => {
      screen.getByRole('button').click()
    })

    expect(screen.getByRole('button')).toHaveTextContent('dark')
    expect(document.documentElement.dataset.theme).toBe('dark')
    expect(window.localStorage.getItem('theme')).toBe('dark')

    act(() => {
      screen.getByRole('button').click()
    })

    expect(document.documentElement.dataset.theme).toBe('light')
    expect(window.localStorage.getItem('theme')).toBe('light')
  })
})
