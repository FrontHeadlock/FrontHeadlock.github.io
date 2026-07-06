import { useDecodeText } from '../hooks/useDecodeText'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'
import { useScrollReveal } from '../hooks/useScrollReveal'

type DecodeLabelProps = {
  text: string
  className?: string
}

/**
 * 뷰포트 진입 시 매트릭스 디코드 효과로 나타나는 mono 라벨.
 * 스크린 리더에는 원본 텍스트만 노출된다.
 */
export function DecodeLabel({ text, className }: DecodeLabelProps) {
  const { ref, revealed } = useScrollReveal<HTMLSpanElement>()
  const reducedMotion = usePrefersReducedMotion()
  const decoded = useDecodeText(text, revealed && !reducedMotion)

  return (
    <span ref={ref} className={className}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">{decoded}</span>
    </span>
  )
}
