import { useDecodeText } from '../hooks/useDecodeText'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'
import { useScrollReveal } from '../hooks/useScrollReveal'
import { cn } from '../lib/cn'

type DecodeLabelProps = {
  text: string
  className?: string
}

/**
 * 뷰포트 진입 시 매트릭스 디코드 효과로 나타나는 mono 라벨.
 * 최종 텍스트로 폭을 미리 예약하고 스크램블 글자를 그 위에 겹쳐 그리므로
 * 리빌 전(빈 문자열)·중(스크램블)·후(최종) 어느 단계에서도 레이아웃이 움직이지 않는다.
 * 스크린 리더에는 원본 텍스트만 노출된다.
 */
export function DecodeLabel({ text, className }: DecodeLabelProps) {
  const { ref, revealed } = useScrollReveal<HTMLSpanElement>()
  const reducedMotion = usePrefersReducedMotion()
  const decoded = useDecodeText(text, revealed && !reducedMotion)

  return (
    <span ref={ref} className={cn('relative inline-block whitespace-nowrap', className)}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true" className="invisible">
        {text}
      </span>
      <span aria-hidden="true" className="absolute inset-0">
        {decoded}
      </span>
    </span>
  )
}
