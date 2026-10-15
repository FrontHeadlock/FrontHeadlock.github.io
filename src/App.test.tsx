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
  it('renders the Korean resume directly on the root path in the light theme', () => {
    const { container } = render(<App />)

    expect(screen.getByRole('banner')).toBeInTheDocument()
    expect(screen.getByText(/status online/i)).toBeInTheDocument()
    // 캔버스가 뜨기 전에는 h1에 낭독기용 한국어 이름이 보인다
    expect(screen.getByRole('heading', { name: /박규민/ })).toBeInTheDocument()
    expect(screen.getByText('배포 시간 단축')).toBeInTheDocument()
    expect(screen.getByText('반복 업무 처리')).toBeInTheDocument()
    expect(screen.getByText(/차량용 SoC 개발 환경의 인프라를 운영하며 반복되는 운영을 자동화하고/)).toBeInTheDocument()
    expect(screen.getByTestId('ascii-hero')).toBeInTheDocument()
    expect(screen.getByTestId('hero-copy')).toHaveTextContent('DevOps Engineer')
    expect(screen.getByTestId('hero-copy')).toHaveTextContent('Telechips · 차량용 SoC 개발 인프라 운영 및 DevOps Engineer')
    expect(screen.getByTestId('hero-copy')).toHaveTextContent('재직중')
    expect(screen.getAllByRole('link', { name: /^(GitHub|Blog|Email|LinkedIn)/i })).toHaveLength(4)
    expect(screen.getAllByRole('link', { name: /^GitHub/i })[0]).toHaveAttribute('href', expect.stringContaining('github.com'))
    expect(screen.getByRole('link', { name: /^소개$/ })).toHaveAttribute('href', '#about')
    expect(screen.getByRole('link', { name: /^경력$/ })).toHaveAttribute('href', '#experience')
    expect(screen.getByRole('link', { name: /^프로젝트$/ })).toHaveAttribute('href', '#projects')
    expect(screen.getByRole('button', { name: /^목차 열기$/ })).toHaveTextContent('목차')
    expect(screen.getByRole('button', { name: /^목차 열기$/ })).not.toHaveTextContent('[')
    // 영문 토글은 없다
    expect(screen.queryByRole('button', { name: /\[KO\]|\[EN\]/ })).not.toBeInTheDocument()
    expect(document.documentElement.lang === 'ko' || document.documentElement.lang === '').toBe(true)
    expect(document.documentElement.dataset.theme).toBe('light')
    expect(screen.getAllByRole('button', { name: /^다크 모드로 전환$/ })).not.toHaveLength(0)
    expect(document.getElementById('home')).toHaveClass('theme-band')
    expect(document.getElementById('experience')).toHaveClass('theme-band')
    expect(document.getElementById('projects')).toHaveClass('theme-alt')
    expect(document.getElementById('contact')).toBeNull()
    expect(screen.getByText(/세션 종료/)).toBeInTheDocument()
    expect(container.firstChild).toHaveClass('relative', 'isolate')
    // 라이트에서는 레인 캔버스도, 레인 토글도 없다
    expect(container.querySelector('.matrix-layer')).toBeNull()
    expect(screen.queryByRole('button', { name: /레인 켜짐|레인 꺼짐/ })).not.toBeInTheDocument()
  })

  it('renders project cards and expandable project details', async () => {
    const user = userEvent.setup()

    render(<App />)

    expect(screen.getByText('Telechips DevOps Team').closest('article')).toHaveClass('bg-[var(--color-surface-card)]')
    expect(screen.getByRole('button', { name: /Geulda/i })).toHaveClass('bg-[var(--color-surface-card)]')
    expect(screen.getAllByText('사내')).toHaveLength(3)
    expect(screen.getAllByText('학부 팀 프로젝트')).toHaveLength(2)
    expect(screen.getByRole('button', { name: /AI Agent Platform/i })).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: /Geulda/i }))

    expect(screen.getByText('개요')).toBeInTheDocument()
    expect(screen.getByText('트러블슈팅')).toBeInTheDocument()
    expect(screen.getByText('Jenkins 단일 노드 메모리 부족')).toBeInTheDocument()
    expect(screen.getByText('2025.10 – 2025.11')).toBeInTheDocument()
    expect(screen.queryByRole('link', { name: /^저장소/ })).not.toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: /CATXI/i }))

    expect(screen.getByText('2025.05 – 2025.12 · 8인 (백엔드 4인)')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /^저장소 \(github\.com\/Team-Catxi\/Catxi_BackEnd\)$/ })).toHaveAttribute(
      'href',
      'https://github.com/Team-Catxi/Catxi_BackEnd',
    )
  })

  it('renders experience entries with organization, highlights, and public-record links', () => {
    render(<App />)

    const entry = screen.getByRole('heading', { name: '오픈소스 기여' }).closest('article')
    expect(entry).toHaveTextContent('jenkinsci/docker · openstack/python-openstackclient')
    expect(entry).toHaveTextContent(/backoff 증가 문제 제거/)

    const recordLinks = screen.getAllByRole('link', { name: /공개 기록 보기/ })
    expect(recordLinks.length).toBeGreaterThanOrEqual(7)
    expect(recordLinks.some((link) => link.getAttribute('href') === 'https://github.com/jenkinsci/docker/pull/2268')).toBe(true)
    expect(recordLinks.some((link) => link.getAttribute('href') === 'http://www.cukjournal.com/news/articleView.html?idxno=4554')).toBe(true)
    recordLinks.forEach((link) => {
      expect(link).toHaveAttribute('target', '_blank')
      expect(link).toHaveAttribute('rel', 'noreferrer')
    })
    expect(screen.getByRole('heading', { name: '수상' }).closest('article')).toHaveTextContent('시퀀스 로그')
  })

  it('opens the related project panel from an experience entry link', async () => {
    const user = userEvent.setup()

    render(<App />)

    expect(screen.queryByText('개요')).not.toBeInTheDocument()

    await user.click(screen.getAllByRole('link', { name: /^AI Agent Platform/ })[0])

    expect(window.location.hash).toBe('#project-card-agentic-ops')
    expect(await screen.findByText('개요')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /AI Agent Platform/i })).toHaveAttribute('aria-expanded', 'true')
    expect(screen.getByRole('link', { name: /^공개 기록 보기 \(github\.com\/jenkinsci\/docker\/pull\/2268\)$/ })).toBeInTheDocument()

    // 닫으면 해시도 지워져서 같은 링크를 다시 눌러도 열리고, 새로고침해도 다시 열리지 않는다.
    await user.click(screen.getByRole('button', { name: /^\[ 닫기 \]$/ }))
    expect(screen.queryByText('개요')).not.toBeInTheDocument()
    expect(window.location.hash).toBe('')

    await user.click(screen.getAllByRole('link', { name: /^AI Agent Platform/ })[0])
    expect(await screen.findByText('개요')).toBeInTheDocument()

    // 다른 카드로 바꿔도 이전 카드의 해시는 남지 않는다.
    await user.click(screen.getByRole('button', { name: /CATXI/i }))
    expect(screen.getByText('2025.05 – 2025.12 · 8인 (백엔드 4인)')).toBeInTheDocument()
    expect(window.location.hash).toBe('')
  })

  it('switches the theme from the header tab and remembers it', async () => {
    const user = userEvent.setup()

    render(<App />)

    await user.click(screen.getAllByRole('button', { name: /^다크 모드로 전환$/ })[0])

    expect(document.documentElement.dataset.theme).toBe('dark')
    expect(window.localStorage.getItem('theme')).toBe('dark')
    expect(screen.getAllByRole('button', { name: /^라이트 모드로 전환$/ })).not.toHaveLength(0)
  })

  it('starts dark when the stored theme is dark and keeps the terminal labels', () => {
    window.localStorage.setItem('theme', 'dark')

    render(<App />)

    expect(document.documentElement.dataset.theme).toBe('dark')
    expect(screen.getAllByRole('button', { name: /^라이트 모드로 전환$/ })).not.toHaveLength(0)
    expect(document.querySelector('.matrix-layer')).toHaveClass('-z-10')
    expect(screen.getByRole('button', { name: /레인 켜짐|레인 꺼짐/ })).toBeInTheDocument()
    // 다크는 터미널식 대괄호 라벨을 유지한다
    expect(screen.getByRole('link', { name: /^\[소개\]$/ })).toHaveAttribute('href', '#about')
    expect(screen.getByRole('button', { name: /^목차 열기$/ })).toHaveTextContent('[목차]')
  })

  it('closes the expanded project panel from its close button or Escape and returns focus to the card', async () => {
    const user = userEvent.setup()

    render(<App />)

    const card = screen.getByRole('button', { name: /Geulda/i })
    await user.click(card)
    expect(screen.getByText('개요')).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: /^\[ 닫기 \]$/ }))
    expect(screen.queryByText('개요')).not.toBeInTheDocument()
    expect(card).toHaveFocus()

    await user.click(card)
    expect(screen.getByText('개요')).toBeInTheDocument()

    await user.keyboard('{Escape}')
    expect(screen.queryByText('개요')).not.toBeInTheDocument()
    expect(card).toHaveFocus()
  })
})
