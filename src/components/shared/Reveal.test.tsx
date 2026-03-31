import { act, render, screen } from '@testing-library/react'
import { Reveal } from './Reveal'

describe('Reveal', () => {
  it('renders content as a stable wrapper without runtime hide state', async () => {
    render(
      <Reveal>
        <div>content</div>
      </Reveal>,
    )

    const wrapper = screen.getByText('content').closest('[data-reveal]')

    await act(async () => {
      await Promise.resolve()
    })

    expect(wrapper).toHaveAttribute('data-reveal', 'static')
    expect(screen.getByText('content')).toBeVisible()
  })
})
