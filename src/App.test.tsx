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
    // 지표 값은 평소 흰색이고 호버·포커스 때만 강조색(#ff8700)이 된다 (MetricCard.test.tsx)
    expect(screen.getByText('3h -> 30m')).toHaveClass('text-[var(--color-text-strong)]')
    expect(screen.getByText('3h -> 30m')).not.toHaveClass('text-[var(--color-emphasis)]')
    expect(screen.getByText(/혼자만의 성장이 아닌 팀과 함께 공유하고/)).toBeInTheDocument()
    // 원고에서 두 줄로 나눈 문구는 "\n"을 그대로 줄바꿈으로 그린다
    expect(screen.getByText(/정량적인 수치를 기반으로/)).toHaveClass('whitespace-pre-line')
    expect(screen.getByRole('heading', { name: /반복되는 운영 자동화,\s+지표를 근거로 한 Pain Point 개선/ })).toHaveClass('whitespace-pre-line')
    // 강점의 **…** 표기는 굵게 그려지고 별표는 화면에 남지 않는다
    expect(screen.getByText('볼륨 사용률 수십 TiB 이상 확보').tagName).toBe('STRONG')
    expect(document.getElementById('about')).not.toHaveTextContent('**')
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
    // 푸터에는 "맨 위로" 링크만 있고 세션 종료·연락처 문구는 없다
    expect(screen.queryByText(/세션 종료/)).not.toBeInTheDocument()
    expect(screen.getByRole('link', { name: '맨 위로 ↑' })).toHaveAttribute('href', '#main-content')
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
    // CATXI는 잠시 주석 처리되어 학부 프로젝트 카드는 Geulda 하나만 보인다
    expect(screen.getAllByText('학부 팀 프로젝트')).toHaveLength(1)
    expect(screen.queryByRole('button', { name: /CATXI/i })).not.toBeInTheDocument()
    expect(screen.getByRole('button', { name: /AI Agent Platform/i })).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: /Geulda/i }))

    expect(screen.getByText('개요')).toBeInTheDocument()
    expect(screen.getByText('트러블슈팅')).toBeInTheDocument()
    expect(screen.getByText('Jenkins 컨테이너의 Docker Hub Push 실패')).toBeInTheDocument()
    // 트러블슈팅 박스에 '시스템 경고' 배지는 더 이상 없다
    expect(screen.queryByText('시스템 경고')).not.toBeInTheDocument()
    expect(screen.getByText('배운 점')).toBeInTheDocument()
    expect(screen.getByText('2025.10 – 2025.11')).toBeInTheDocument()
    expect(screen.queryByRole('link', { name: /^저장소/ })).not.toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: /SoC 개발 환경 스토리지 용량 모니터링/ }))

    expect(screen.getByText('2026 · 2인')).toBeInTheDocument()
    // 배운 점을 비운 프로젝트는 블록 제목도 그리지 않고, Fluent Bit 언급은 없다
    expect(screen.queryByText('배운 점')).not.toBeInTheDocument()
    expect(screen.queryByText(/Fluent Bit/)).not.toBeInTheDocument()
    expect(screen.getByText('space-guarantee 예약에 묶인 NVMe Aggregate 공간')).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: /80여 대 개발 서버/ }))
    expect(screen.getByText('관리대장과 달랐던 Inventory와 접속 계정')).toBeInTheDocument()
  })

  it('renders experience entries with organization, highlights, and public-record links', () => {
    render(<App />)

    // 재직 중 카드 제목만 강조색으로 그린다
    expect(screen.getByRole('heading', { name: 'Telechips DevOps Team' })).toHaveClass('text-[var(--color-emphasis)]')
    expect(screen.getByRole('heading', { name: '오픈소스 기여' })).not.toHaveClass('text-[var(--color-emphasis)]')

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
    // 기간이 없는 카드는 대체 문구 없이 비워 두고, 수상명 뒤에서 줄을 바꾼다
    expect(screen.getByRole('heading', { name: '수상' }).closest('article')).not.toHaveTextContent('시퀀스 로그')
    expect(screen.getByText(/전공역량 경진대회 최우수상/)).toHaveClass('whitespace-pre-line')
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
    await user.click(screen.getByRole('button', { name: /SoC 개발 환경 스토리지 용량 모니터링/ }))
    expect(screen.getByText('2026 · 2인')).toBeInTheDocument()
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
