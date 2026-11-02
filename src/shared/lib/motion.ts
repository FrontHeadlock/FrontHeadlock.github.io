/**
 * 진입(reveal) 모션의 단일 기준값.
 * CSS 기반 Reveal과 framer-motion 기반 컴포넌트(MetricCard 등)가
 * 같은 타이밍 언어를 쓰도록 여기서만 정의한다.
 */
export const REVEAL = {
  duration: 0.3,
  distance: 12,
  ease: 'easeOut',
} as const

export const STAGGER = {
  step: 0.07,
  max: 0.28,
} as const

export function staggerDelay(index: number) {
  return Math.min(index * STAGGER.step, STAGGER.max)
}
