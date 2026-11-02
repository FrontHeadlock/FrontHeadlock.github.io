import { fireEvent, render, screen } from '@testing-library/react'
import { MetricCard } from './MetricCard'

const metric = { label: '배포 시간 단축', value: '30m -> 10m', detail: 'Blue/Green 배포 구축' }

describe('MetricCard', () => {
  const originalMatchMedia = window.matchMedia

  beforeEach(() => {
    // "모션 줄이기"로 두어 카운트업 프레임 없이 색 전환만 확인한다
    window.matchMedia = ((query: string) => ({ ...originalMatchMedia(query), matches: true })) as typeof window.matchMedia
  })

  afterEach(() => {
    window.matchMedia = originalMatchMedia
  })

  it('keeps the value white until hover or focus, then switches it to the emphasis color', () => {
    render(<MetricCard metric={metric} index={0} />)

    const value = screen.getByText('30m -> 10m')
    const card = value.closest('article') as HTMLElement
    expect(value).toHaveClass('text-[var(--color-text-strong)]')
    expect(value).not.toHaveClass('text-[var(--color-emphasis)]')

    fireEvent.mouseEnter(card)
    expect(value).toHaveClass('text-[var(--color-emphasis)]')
    expect(value).toHaveTextContent('30m -> 10m')

    fireEvent.mouseLeave(card)
    expect(value).toHaveClass('text-[var(--color-text-strong)]')
    expect(value).not.toHaveClass('text-[var(--color-emphasis)]')

    fireEvent.focus(card)
    expect(value).toHaveClass('text-[var(--color-emphasis)]')

    fireEvent.blur(card)
    expect(value).not.toHaveClass('text-[var(--color-emphasis)]')
  })
})
