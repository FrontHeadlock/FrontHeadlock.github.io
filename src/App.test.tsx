import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from './App'

beforeEach(() => {
  window.sessionStorage.clear()
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
    expect(screen.getByText(/Deployment Time/i)).toBeInTheDocument()
    expect(
      screen.getByText(
        /I am a DevOps engineer who solves deployment, authentication, and operations bottlenecks at the architecture level\./i,
      ),
    ).toBeInTheDocument()
    expect(screen.getByTestId('ascii-hero')).toBeInTheDocument()
    expect(screen.getByTestId('hero-copy')).toContainElement(
      screen.getByText(
        /I am a DevOps engineer who solves deployment, authentication, and operations bottlenecks at the architecture level\./i,
      ),
    )
    expect(screen.getAllByRole('link', { name: /GitHub|Blog|Email|LinkedIn/i })).toHaveLength(8)
    expect(screen.getAllByRole('link', { name: /GitHub/i })[0]).toHaveAttribute('href', expect.stringContaining('github.com'))
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

    expect(screen.getByText(/Geulda Bucheon Tourism Promotion Application/i).closest('article')).toHaveClass(
      'bg-[var(--color-surface-card)]',
    )
    expect(screen.getByRole('button', { name: /Geulda/i })).toHaveClass('bg-[var(--color-surface-card)]')

    await user.click(screen.getByRole('button', { name: /Geulda/i }))

    expect(screen.getByText(/Overview/)).toBeInTheDocument()
    expect(screen.getByText(/Troubleshooting/)).toBeInTheDocument()
    expect(screen.getAllByText(/Kubernetes/)[0]).toBeInTheDocument()
    expect(
      screen.queryByText(/Technologies are categorized by operational context, not listed in isolation\./i),
    ).not.toBeInTheDocument()
    expect(
      screen.getByText(/This portfolio is structured for fast review of key details and operational outcomes\./i),
    ).toBeInTheDocument()
  })
})
