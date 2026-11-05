import { render } from '@testing-library/react'
import { EmphasisText } from './EmphasisText'

describe('EmphasisText', () => {
  it('renders **…** as a strong element and leaves the rest as text', () => {
    const { container } = render(<EmphasisText text="앞 **강조** 뒤" />)

    const strong = container.querySelector('strong')
    expect(strong).toHaveTextContent('강조')
    expect(strong).toHaveClass('emphasis-mark')
    expect(container).toHaveTextContent('앞 강조 뒤')
    expect(container.textContent).not.toContain('**')
  })

  it('supports an emphasis that ends the sentence and several per sentence', () => {
    const { container } = render(<EmphasisText text="**하나** 그리고 **둘**" />)

    const strongs = container.querySelectorAll('strong')
    expect(strongs).toHaveLength(2)
    expect(strongs[0]).toHaveTextContent('하나')
    expect(strongs[1]).toHaveTextContent('둘')
  })

  it('keeps the original text when the markers are unbalanced or absent', () => {
    const { container: unbalanced } = render(<EmphasisText text="닫히지 **않음" />)
    expect(unbalanced.querySelector('strong')).toBeNull()
    expect(unbalanced).toHaveTextContent('닫히지 **않음')

    const { container: plain } = render(<EmphasisText text="표기 없음" />)
    expect(plain.querySelector('strong')).toBeNull()
    expect(plain).toHaveTextContent('표기 없음')
  })
})
