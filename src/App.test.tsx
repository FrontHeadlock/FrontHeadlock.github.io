import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from './App'

beforeEach(() => {
  window.history.pushState({}, '', '/')
  window.localStorage.clear()
  delete document.documentElement.dataset.theme
})

afterEach(() => {
  window.history.pushState({}, '', '/')
})

describe('App', () => {
  it('renders the resume directly on the root path', () => {
    const { container } = render(<App />)

    expect(screen.getByRole('banner')).toBeInTheDocument()
    expect(screen.getByText(/status online/i)).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /KyuminPark/i })).toBeInTheDocument()
    expect(screen.queryByLabelText(/Matrix access onboarding/i)).not.toBeInTheDocument()
    expect(screen.queryByRole('button', { name: /\[ ACCESS \]/i })).not.toBeInTheDocument()
    expect(screen.queryByRole('heading', { name: /박규민/i })).not.toBeInTheDocument()
    expect(screen.getByText('Deployment Time')).toBeInTheDocument()
    expect(screen.getByText('Repetitive Ops')).toBeInTheDocument()
    expect(
      screen.getByText(/I am a DevOps engineer running the development infrastructure for automotive SoC teams/i),
    ).toBeInTheDocument()
    expect(screen.getByTestId('ascii-hero')).toBeInTheDocument()
    expect(screen.getByTestId('hero-copy')).toContainElement(
      screen.getByText(/I am a DevOps engineer running the development infrastructure for automotive SoC teams/i),
    )
    expect(screen.getByTestId('hero-copy')).toHaveTextContent('DevOps Engineer')
    expect(screen.getByTestId('hero-copy')).toHaveTextContent('Telechips · Automotive SoC Development Infrastructure')
    expect(screen.getAllByRole('link', { name: /^(GitHub|Blog|Email|LinkedIn)/i })).toHaveLength(4)
    expect(screen.getAllByRole('link', { name: /^GitHub/i })[0]).toHaveAttribute('href', expect.stringContaining('github.com'))
    expect(screen.queryByRole('button', { name: /Resume PDF/i })).not.toBeInTheDocument()
    expect(screen.queryByText(/DevOps Portfolio/i)).not.toBeInTheDocument()
    expect(screen.queryByText(/whoami/i)).not.toBeInTheDocument()
    expect(screen.queryByRole('link', { name: /Tech Stack/i })).not.toBeInTheDocument()
    expect(screen.queryByRole('link', { name: /^Contact$/i })).not.toBeInTheDocument()
    expect(screen.getByRole('link', { name: /^about$/i })).toHaveAttribute('href', '#about')
    expect(screen.getByRole('link', { name: /^experience$/i })).toHaveAttribute('href', '#experience')
    expect(screen.getByRole('link', { name: /^projects$/i })).toHaveAttribute('href', '#projects')
    expect(screen.getByRole('button', { name: /^Open contents$/ })).toHaveTextContent('contents')
    expect(screen.getByRole('button', { name: /^Open contents$/ })).not.toHaveTextContent('[')
    expect(document.getElementById('home')).toHaveClass('theme-band')
    expect(document.getElementById('experience')).toHaveClass('theme-band')
    expect(document.getElementById('projects')).toHaveClass('theme-alt')
    expect(document.documentElement.dataset.theme).toBe('light')
    expect(screen.getAllByRole('button', { name: /^Switch to dark mode$/ })).not.toHaveLength(0)
    expect(screen.queryByText('⌘K')).not.toBeInTheDocument()
    expect(screen.getByText(/session closed/i)).toBeInTheDocument()
    expect(container.firstChild).toHaveClass('relative', 'isolate')
    // 라이트에서는 레인 캔버스도, 레인 토글도 없다
    expect(container.querySelector('.matrix-layer')).toBeNull()
    expect(screen.queryByRole('button', { name: /live rain|rain off/i })).not.toBeInTheDocument()
  })

  it('renders project cards and expandable project details without a tech-stack section', async () => {
    const user = userEvent.setup()

    render(<App />)

    expect(screen.getByText(/Infrastructure Operations for Automotive SoC Development/i).closest('article')).toHaveClass(
      'bg-[var(--color-surface-card)]',
    )
    expect(screen.getByRole('button', { name: /Geulda/i })).toHaveClass('bg-[var(--color-surface-card)]')
    expect(screen.getAllByText('In-house')).toHaveLength(3)
    expect(screen.getAllByText('University team project')).toHaveLength(2)
    expect(screen.getByRole('button', { name: /AI Agent Platform/i })).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: /Geulda/i }))

    expect(screen.getByText(/Overview/)).toBeInTheDocument()
    expect(screen.getByText(/Troubleshooting/)).toBeInTheDocument()
    expect(screen.getByText(/Jenkins Single-node Memory Exhaustion/)).toBeInTheDocument()
    expect(screen.getByText('2025.10 – 2025.11')).toBeInTheDocument()
    expect(screen.queryByRole('link', { name: /^Repository/ })).not.toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: /CATXI/i }))

    expect(screen.getByText('2025.05 – 2025.12 · 8 members (4 backend)')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /^Repository \(github\.com\/Team-Catxi\/Catxi_BackEnd\)$/ })).toHaveAttribute(
      'href',
      'https://github.com/Team-Catxi/Catxi_BackEnd',
    )
    expect(
      screen.queryByText(/Technologies are categorized by operational context, not listed in isolation\./i),
    ).not.toBeInTheDocument()
    expect(document.getElementById('contact')).toBeNull()
    expect(screen.queryByRole('heading', { name: /^Contact$/ })).not.toBeInTheDocument()
    expect(screen.queryByText('Static delivery on GitHub Pages')).not.toBeInTheDocument()
    expect(screen.queryByText(/resume PDF linkage/i)).not.toBeInTheDocument()
  })

  it('renders experience entries with organization, highlights, and public-record links', () => {
    render(<App />)

    const entry = screen.getByRole('heading', { name: /^Open-source Contributions — Reading the Tools/ }).closest('article')
    expect(entry).toHaveTextContent('jenkinsci/docker · openstack/python-openstackclient')
    expect(entry).toHaveTextContent(/PR #2268 was merged/)

    const recordLinks = screen.getAllByRole('link', { name: /View public record/i })
    expect(recordLinks.length).toBeGreaterThanOrEqual(7)
    expect(recordLinks.some((link) => link.getAttribute('href') === 'https://github.com/jenkinsci/docker/pull/2268')).toBe(true)
    expect(recordLinks.some((link) => link.getAttribute('href') === 'http://www.cukjournal.com/news/articleView.html?idxno=4554')).toBe(true)
    expect(screen.getByRole('heading', { name: 'Awards' }).closest('article')).toHaveTextContent('Sequence log')
    recordLinks.forEach((link) => {
      expect(link).toHaveAttribute('target', '_blank')
      expect(link).toHaveAttribute('rel', 'noreferrer')
    })
  })

  it('opens the related project panel from an experience entry link', async () => {
    const user = userEvent.setup()

    render(<App />)

    expect(screen.queryByText(/Overview/)).not.toBeInTheDocument()

    await user.click(screen.getAllByRole('link', { name: /^AI Agent Platform/ })[0])

    expect(window.location.hash).toBe('#project-card-agentic-ops')
    expect(await screen.findByText(/Overview/)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /AI Agent Platform/i })).toHaveAttribute('aria-expanded', 'true')
    expect(screen.getByRole('link', { name: /^View public record \(github\.com\/jenkinsci\/docker\/pull\/2268\)$/ })).toBeInTheDocument()

    // 닫으면 해시도 지워져서 같은 링크를 다시 눌러도 열리고, 새로고침해도 다시 열리지 않는다.
    await user.click(screen.getByRole('button', { name: /^\[ Close \]$/ }))
    expect(screen.queryByText(/Overview/)).not.toBeInTheDocument()
    expect(window.location.hash).toBe('')

    await user.click(screen.getAllByRole('link', { name: /^AI Agent Platform/ })[0])
    expect(await screen.findByText(/Overview/)).toBeInTheDocument()

    // 다른 카드로 바꿔도 이전 카드의 해시는 남지 않는다.
    await user.click(screen.getByRole('button', { name: /CATXI/i }))
    expect(screen.getByText('2025.05 – 2025.12 · 8 members (4 backend)')).toBeInTheDocument()
    expect(window.location.hash).toBe('')
  })

  it('switches the theme from the header tab and remembers it', async () => {
    const user = userEvent.setup()

    render(<App />)

    const tab = screen.getAllByRole('button', { name: /^Switch to dark mode$/ })[0]
    await user.click(tab)

    expect(document.documentElement.dataset.theme).toBe('dark')
    expect(window.localStorage.getItem('theme')).toBe('dark')
    expect(screen.getAllByRole('button', { name: /^Switch to light mode$/ })).not.toHaveLength(0)
    expect(document.querySelector('meta[name="theme-color"]')?.getAttribute('content') ?? '#0a0a0a').toBe('#0a0a0a')
  })

  it('starts dark when the stored theme is dark', () => {
    window.localStorage.setItem('theme', 'dark')

    render(<App />)

    expect(document.documentElement.dataset.theme).toBe('dark')
    expect(screen.getAllByRole('button', { name: /^Switch to light mode$/ })).not.toHaveLength(0)
    expect(document.querySelector('.matrix-layer')).toHaveClass('-z-10')
    expect(screen.getByRole('button', { name: /live rain|rain off/i })).toBeInTheDocument()
    // 다크는 터미널식 대괄호 라벨을 유지한다
    expect(screen.getByRole('link', { name: /^\[about\]$/i })).toHaveAttribute('href', '#about')
    expect(screen.getByRole('button', { name: /^Open contents$/ })).toHaveTextContent('[contents]')
  })

  it('closes the expanded project panel from its close button or Escape and returns focus to the card', async () => {
    const user = userEvent.setup()

    render(<App />)

    const card = screen.getByRole('button', { name: /Geulda/i })
    await user.click(card)
    expect(screen.getByText(/Overview/)).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: /^\[ Close \]$/ }))
    expect(screen.queryByText(/Overview/)).not.toBeInTheDocument()
    expect(card).toHaveFocus()

    await user.click(card)
    expect(screen.getByText(/Overview/)).toBeInTheDocument()

    await user.keyboard('{Escape}')
    expect(screen.queryByText(/Overview/)).not.toBeInTheDocument()
    expect(card).toHaveFocus()
  })
})
