import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, describe, expect, it } from 'vitest'
import { LocaleProvider, useLocale } from './LocaleContext'

function Probe() {
  const { locale, toggleLocale } = useLocale()

  return (
    <button type="button" onClick={toggleLocale}>
      locale:{locale}
    </button>
  )
}

function renderLocale() {
  return render(
    <LocaleProvider>
      <Probe />
    </LocaleProvider>,
  )
}

describe('LocaleContext', () => {
  afterEach(() => {
    window.localStorage.clear()
    document.documentElement.lang = ''
  })

  it('falls back to navigator language when nothing is stored', () => {
    renderLocale()

    // jsdom navigator.language is en-US
    expect(screen.getByRole('button')).toHaveTextContent('locale:en')
  })

  it('prefers the stored locale over navigator language', () => {
    window.localStorage.setItem('locale', 'ko')

    renderLocale()

    expect(screen.getByRole('button')).toHaveTextContent('locale:ko')
  })

  it('syncs html lang, document title, and storage on toggle', async () => {
    const user = userEvent.setup()

    renderLocale()
    expect(document.documentElement.lang).toBe('en')

    await user.click(screen.getByRole('button'))

    expect(screen.getByRole('button')).toHaveTextContent('locale:ko')
    expect(document.documentElement.lang).toBe('ko')
    expect(window.localStorage.getItem('locale')).toBe('ko')
    expect(document.title).toContain('박규민')
  })
})
