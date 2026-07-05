import { act, render, screen } from '@testing-library/react'
import { Reveal } from './Reveal'

type MockIntersectionObserver = { trigger: (isIntersecting: boolean) => void }

function triggerLatestObserver(isIntersecting: boolean) {
  const observers = (globalThis as { __mockIntersectionObservers?: MockIntersectionObserver[] })
    .__mockIntersectionObservers
  observers?.at(-1)?.trigger(isIntersecting)
}

describe('Reveal', () => {
  it('starts pending and reveals content once its section scrolls into view', async () => {
    render(
      <Reveal>
        <div>content</div>
      </Reveal>,
    )

    const wrapper = screen.getByText('content').closest('[data-reveal]')
    expect(wrapper).toHaveAttribute('data-reveal', 'pending')

    await act(async () => {
      triggerLatestObserver(true)
    })

    expect(wrapper).toHaveAttribute('data-reveal', 'revealed')
    expect(screen.getByText('content')).toBeInTheDocument()
  })
})
