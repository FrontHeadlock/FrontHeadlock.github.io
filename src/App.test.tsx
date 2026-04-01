import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from './App'

beforeEach(() => {
  window.sessionStorage.clear()
  window.sessionStorage.setItem('fh_onboarding_seen_v1', '1')
  window.history.pushState({}, '', '/resume')
})

afterEach(() => {
  window.history.pushState({}, '', '/')
})

describe('App', () => {
  it('renders the primary navigation and hero identity', () => {
    const { container } = render(<App />)

    expect(screen.getByRole('navigation')).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /KyuminPark/i })).toBeInTheDocument()
    expect(screen.queryByRole('heading', { name: /박규민/i })).not.toBeInTheDocument()
    expect(screen.getByText(/Deployment Time/i)).toBeInTheDocument()
    expect(screen.getByText(/배포, 인증, 운영 병목을 구조로 해결하는 DevOps 엔지니어입니다\./i)).toBeInTheDocument()
    expect(screen.getByTestId('ascii-hero')).toBeInTheDocument()
    expect(screen.getByTestId('hero-copy')).toContainElement(
      screen.getByText(/배포, 인증, 운영 병목을 구조로 해결하는 DevOps 엔지니어입니다\./i),
    )
    expect(screen.getAllByRole('link', { name: /GitHub|Blog|Email|LinkedIn/i })).toHaveLength(4)
    expect(screen.getByRole('link', { name: /GitHub/i })).toHaveAttribute('href', expect.stringContaining('github.com'))
    expect(screen.queryByRole('button', { name: /Resume PDF/i })).not.toBeInTheDocument()
    expect(screen.queryByText(/DevOps Portfolio/i)).not.toBeInTheDocument()
    expect(screen.queryByText(/whoami/i)).not.toBeInTheDocument()
    expect(screen.queryByRole('link', { name: /Tech Stack/i })).not.toBeInTheDocument()
    expect(screen.queryByRole('link', { name: /Contact/i })).not.toBeInTheDocument()
    expect(container.firstChild).toHaveClass('relative', 'isolate')
    expect(container.querySelector('.matrix-layer')).toHaveClass('-z-10')
  })

  it('renders project cards and expandable project details without tech/contact sections', async () => {
    const user = userEvent.setup()

    render(<App />)

    expect(screen.getByText(/Geulda 부천시 관광 진흥 애플리케이션/i).closest('article')).toHaveClass('bg-[rgba(18,22,20,0.72)]')
    expect(screen.getByRole('button', { name: /Geulda/i })).toHaveClass('bg-[rgba(18,22,20,0.72)]')

    await user.click(screen.getByRole('button', { name: /Geulda/i }))

    expect(screen.getByText(/프로젝트 개요/)).toBeInTheDocument()
    expect(screen.getByText(/트러블슈팅 경험/)).toBeInTheDocument()
    expect(screen.getAllByText(/Kubernetes/)[0]).toBeInTheDocument()
    expect(screen.queryByText(/기술은 나열하지 않고 운영 맥락 안에서 분류했습니다\./i)).not.toBeInTheDocument()
    expect(screen.queryByText(/핵심 정보와 운영 결과를 빠르게 검토할 수 있는 포트폴리오로 구성했습니다\./i)).not.toBeInTheDocument()
  })
})
