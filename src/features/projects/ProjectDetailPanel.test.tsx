import { render, screen } from '@testing-library/react'
import type { Project } from '../../entities/project/types'
import { ProjectDetailPanel } from './ProjectDetailPanel'

// CATXI 카드가 잠시 숨겨져 실제 데이터에는 저장소 링크가 없으므로, 링크와 빈 블록 생략은 고정 데이터로 확인한다.
const fixture: Project = {
  slug: 'fixture',
  title: 'Fixture',
  kind: '학부 팀 프로젝트',
  period: '2025.05 – 2025.12',
  teamSize: '8인',
  repoUrl: 'https://github.com/example/repo',
  subtitle: '저장소 링크가 있는 프로젝트',
  summary: '요약 한 줄',
  focus: '포커스 한 줄',
  techStack: ['Spring Boot'],
  overview: '개요 본문',
  role: '백엔드',
  problem: ['문제 상황 1'],
  approach: ['접근 방법 1'],
  outcomes: [],
  troubleshooting: [{ title: '항목 제목', problem: '문제 본문', analysis: '원인 본문', action: '조치 본문', result: '결과 본문' }],
}

describe('ProjectDetailPanel', () => {
  it('links the public repository and skips a detail block with no items', () => {
    render(<ProjectDetailPanel project={fixture} onClose={() => undefined} />)

    expect(screen.getByText('2025.05 – 2025.12 · 8인')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /^저장소 \(github\.com\/example\/repo\)$/ })).toHaveAttribute('href', 'https://github.com/example/repo')
    expect(screen.getByText('문제 상황')).toBeInTheDocument()
    // 항목이 없는 블록(여기서는 성과)은 제목까지 생략하고, 배운 점 블록은 더 이상 없다
    expect(screen.queryByText('성과 / 지표')).not.toBeInTheDocument()
    expect(screen.queryByText('배운 점')).not.toBeInTheDocument()
    // 트러블슈팅 박스는 제목과 네 칸만 그리고 배지는 없다
    expect(screen.getByText('항목 제목')).toBeInTheDocument()
    expect(screen.queryByText('시스템 경고')).not.toBeInTheDocument()
  })
})
