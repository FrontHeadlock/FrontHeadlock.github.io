import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from './App'

beforeEach(() => {
  window.history.pushState({}, '', '/')
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
    expect(screen.getAllByRole('link', { name: /^(GitHub|Blog|Email|LinkedIn)/i })).toHaveLength(8)
    expect(screen.getAllByRole('link', { name: /^GitHub/i })[0]).toHaveAttribute('href', expect.stringContaining('github.com'))
    expect(screen.queryByRole('button', { name: /Resume PDF/i })).not.toBeInTheDocument()
    expect(screen.queryByText(/DevOps Portfolio/i)).not.toBeInTheDocument()
    expect(screen.queryByText(/whoami/i)).not.toBeInTheDocument()
    expect(screen.queryByRole('link', { name: /Tech Stack/i })).not.toBeInTheDocument()
    expect(screen.queryByRole('link', { name: /^Contact$/i })).not.toBeInTheDocument()
    expect(screen.getByRole('link', { name: /^\[about\]$/i })).toHaveAttribute('href', '#about')
    expect(screen.getByRole('link', { name: /^\[experience\]$/i })).toHaveAttribute('href', '#experience')
    expect(screen.getByRole('link', { name: /^\[projects\]$/i })).toHaveAttribute('href', '#projects')
    expect(screen.getByText(/session closed/i)).toBeInTheDocument()
    expect(container.firstChild).toHaveClass('relative', 'isolate')
    expect(container.querySelector('.matrix-layer')).toHaveClass('-z-10')
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
    expect(screen.getByRole('link', { name: /^Repository \(github\.com\)$/ })).toHaveAttribute(
      'href',
      'https://github.com/Team-Catxi/Catxi_BackEnd',
    )
    expect(
      screen.queryByText(/Technologies are categorized by operational context, not listed in isolation\./i),
    ).not.toBeInTheDocument()
    expect(
      screen.getByText(/This portfolio is structured for fast review of key details and operational outcomes\./i),
    ).toBeInTheDocument()
  })

  it('renders experience entries with organization, highlights, and public-record links', () => {
    render(<App />)

    const entry = screen.getByText(/Open-source Contributions/i).closest('article')
    expect(entry).toHaveTextContent('jenkinsci/docker · openstack/python-openstackclient')
    expect(entry).toHaveTextContent(/PR #2268 was merged/)

    const recordLinks = screen.getAllByRole('link', { name: /View public record/i })
    expect(recordLinks.length).toBeGreaterThanOrEqual(7)
    expect(recordLinks.some((link) => link.getAttribute('href') === 'https://github.com/jenkinsci/docker/pull/2268')).toBe(true)
    expect(recordLinks.some((link) => link.getAttribute('href') === 'https://github.com/k8s-Parkflow/park_python')).toBe(true)
    recordLinks.forEach((link) => {
      expect(link).toHaveAttribute('target', '_blank')
      expect(link).toHaveAttribute('rel', 'noreferrer')
    })
  })

  it('opens the related project panel from an experience entry link', async () => {
    const user = userEvent.setup()

    render(<App />)

    expect(screen.queryByText(/Overview/)).not.toBeInTheDocument()

    await user.click(screen.getAllByRole('link', { name: /^Geulda/ })[0])

    expect(window.location.hash).toBe('#project-card-geulda')
    expect(await screen.findByText(/Overview/)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /Geulda/i })).toHaveAttribute('aria-expanded', 'true')
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
