import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from '../../App'
import { BOOT_STORAGE_KEY } from './BootSequence'

beforeEach(() => {
  window.sessionStorage.clear()
})

describe('BootSequence', () => {
  it('shows the overlay on first visit while the resume renders behind it', async () => {
    render(<App />)

    expect(screen.getByRole('status', { name: /boot sequence/i })).toBeInTheDocument()
    // 게이트가 아니라 오버레이 — 이력서 DOM은 동시에 존재해야 한다.
    expect(screen.getByRole('banner')).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /KyuminPark/i })).toBeInTheDocument()
    // 첫 줄이 디코드를 마치고 원문으로 resolve되는지 확인 (~0.58s).
    // 기본 findBy 타임아웃(1000ms)은 느린 CI 러너에서 실시간 setInterval 기반
    // 디코드 애니메이션에 여유가 부족해 간헐적으로 실패했다 — 여유를 넉넉히 둔다.
    expect(await screen.findByText('> boot resume.node --target=portfolio', {}, { timeout: 5000 })).toBeInTheDocument()
  })

  it('dismisses via the skip button and stays hidden for the rest of the session', async () => {
    const user = userEvent.setup()
    const { unmount } = render(<App />)

    await user.click(screen.getByRole('button', { name: /skip intro/i }))

    await waitFor(() => expect(screen.queryByTestId('boot-sequence')).not.toBeInTheDocument())
    expect(window.sessionStorage.getItem(BOOT_STORAGE_KEY)).toBe('true')

    unmount()
    render(<App />)

    expect(screen.queryByTestId('boot-sequence')).not.toBeInTheDocument()
  })

  it('dismisses when clicking anywhere on the overlay', async () => {
    const user = userEvent.setup()
    render(<App />)

    await user.click(screen.getByTestId('boot-sequence'))

    await waitFor(() => expect(screen.queryByTestId('boot-sequence')).not.toBeInTheDocument())
    expect(window.sessionStorage.getItem(BOOT_STORAGE_KEY)).toBe('true')
  })

  it('dismisses on Escape', async () => {
    const user = userEvent.setup()
    render(<App />)

    await user.keyboard('{Escape}')

    await waitFor(() => expect(screen.queryByTestId('boot-sequence')).not.toBeInTheDocument())
    expect(window.sessionStorage.getItem(BOOT_STORAGE_KEY)).toBe('true')
  })

  it('still shows and dismisses when sessionStorage writes fail', async () => {
    const setItemSpy = vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
      throw new Error('storage denied')
    })

    try {
      const user = userEvent.setup()
      render(<App />)

      expect(screen.getByTestId('boot-sequence')).toBeInTheDocument()

      await user.click(screen.getByRole('button', { name: /skip intro/i }))

      await waitFor(() => expect(screen.queryByTestId('boot-sequence')).not.toBeInTheDocument())
    } finally {
      setItemSpy.mockRestore()
    }
  })

  it('does not mount when prefers-reduced-motion is set', () => {
    const originalMatchMedia = window.matchMedia
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      configurable: true,
      value: (query: string) => ({
        matches: query.includes('prefers-reduced-motion'),
        media: query,
        onchange: null,
        addEventListener: () => undefined,
        removeEventListener: () => undefined,
        addListener: () => undefined,
        removeListener: () => undefined,
        dispatchEvent: () => false,
      }),
    })

    try {
      render(<App />)
      expect(screen.queryByTestId('boot-sequence')).not.toBeInTheDocument()
    } finally {
      Object.defineProperty(window, 'matchMedia', {
        writable: true,
        configurable: true,
        value: originalMatchMedia,
      })
    }
  })
})
