import { act, fireEvent, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'
import { LocaleProvider } from '../i18n/LocaleContext'
import { useCommandPalette } from './useCommandPalette'
import { RainPreferenceProvider, useRainPreference } from './useRainPreference'

function Probe() {
  const { open, search, setSearch, selectedIndex, filtered } = useCommandPalette()
  const { enabled } = useRainPreference()

  return (
    <div>
      <span data-testid="open">{String(open)}</span>
      <span data-testid="rain">{String(enabled)}</span>
      <span data-testid="count">{filtered.length}</span>
      <span data-testid="selected">{filtered[selectedIndex]?.id ?? 'none'}</span>
      <input data-testid="search" value={search} onChange={(e) => setSearch(e.target.value)} />
    </div>
  )
}

function renderPalette() {
  return render(
    <LocaleProvider>
      <RainPreferenceProvider>
        <Probe />
      </RainPreferenceProvider>
    </LocaleProvider>,
  )
}

function pressKey(init: KeyboardEventInit) {
  act(() => {
    window.dispatchEvent(new KeyboardEvent('keydown', { ...init, bubbles: true, cancelable: true }))
  })
}

describe('useCommandPalette', () => {
  afterEach(() => {
    window.localStorage.clear()
  })

  it('opens and closes with Cmd+K', () => {
    renderPalette()

    expect(screen.getByTestId('open')).toHaveTextContent('false')

    pressKey({ key: 'k', metaKey: true })
    expect(screen.getByTestId('open')).toHaveTextContent('true')

    pressKey({ key: 'k', metaKey: true })
    expect(screen.getByTestId('open')).toHaveTextContent('false')
  })

  it('closes on Escape', () => {
    renderPalette()

    pressKey({ key: 'k', metaKey: true })
    expect(screen.getByTestId('open')).toHaveTextContent('true')

    pressKey({ key: 'Escape' })
    expect(screen.getByTestId('open')).toHaveTextContent('false')
  })

  it('filters commands by label and description', () => {
    renderPalette()

    fireEvent.change(screen.getByTestId('search'), { target: { value: 'rain' } })

    expect(screen.getByTestId('count')).toHaveTextContent('1')
    expect(screen.getByTestId('selected')).toHaveTextContent('toggle-rain')
  })

  it('wraps selection with arrow keys', () => {
    renderPalette()

    pressKey({ key: 'k', metaKey: true })
    expect(screen.getByTestId('selected')).toHaveTextContent('goto-home')

    pressKey({ key: 'ArrowUp' })
    expect(screen.getByTestId('selected')).toHaveTextContent('copy-email')

    pressKey({ key: 'ArrowDown' })
    expect(screen.getByTestId('selected')).toHaveTextContent('goto-home')
  })

  it('executes the toggle-rain command against the rain preference context', () => {
    renderPalette()

    expect(screen.getByTestId('rain')).toHaveTextContent('true')

    pressKey({ key: 'k', metaKey: true })
    fireEvent.change(screen.getByTestId('search'), { target: { value: 'rain' } })
    pressKey({ key: 'Enter' })

    expect(screen.getByTestId('rain')).toHaveTextContent('false')
    expect(screen.getByTestId('open')).toHaveTextContent('false')
  })
})
