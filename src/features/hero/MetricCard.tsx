import { m } from 'framer-motion'
import { useCallback, useEffect, useRef, useState } from 'react'
import type { ProfileMetric } from '../../entities/profile/types'
import { usePrefersReducedMotion } from '../../shared/hooks/usePrefersReducedMotion'
import { cn } from '../../shared/lib/cn'
import { REVEAL, staggerDelay } from '../../shared/lib/motion'

type MetricCardProps = {
  metric: ProfileMetric
  isLead?: boolean
  index: number
}

const NUMBER_PATTERN = /\d+(\.\d+)?/g
const HOVER_COUNT_MS = 420

function easeOutCubic(progress: number) {
  return 1 - (1 - progress) ** 3
}

function renderAnimatedValue(template: string, progress: number) {
  const matches = [...template.matchAll(NUMBER_PATTERN)]

  if (matches.length === 0) {
    return template
  }

  let matchIndex = 0

  return template.replace(NUMBER_PATTERN, (value) => {
    const currentMatch = matches[matchIndex]
    matchIndex += 1

    if (!currentMatch) {
      return value
    }

    const numericValue = Number(value)
    if (Number.isNaN(numericValue)) {
      return value
    }

    const animatedValue = Math.max(0, Math.round(numericValue * progress))
    return String(animatedValue)
  })
}

/**
 * 지표 카드. 값은 평소 본문 강조색(흰색)이고, 마우스를 올리거나 포커스하면 강조색(--color-emphasis)으로 바뀌면서
 * 값 안의 숫자가 0에서 올라간 다음 한 번 살짝 커졌다 돌아온다. 벗어나면 흰색과 최종 값으로 돌아온다.
 * "모션 줄이기" 설정에서는 색만 바뀌고 숫자는 움직이지 않는다.
 */
export function MetricCard({ metric, isLead = false, index }: MetricCardProps) {
  const [displayValue, setDisplayValue] = useState(metric.value)
  const [landed, setLanded] = useState(false)
  const [active, setActive] = useState(false)
  const frameRef = useRef<number>(0)
  const reducedMotion = usePrefersReducedMotion()

  useEffect(() => {
    setDisplayValue(metric.value)
  }, [metric.value])

  useEffect(() => {
    return () => {
      window.cancelAnimationFrame(frameRef.current)
    }
  }, [])

  const playValueAnimation = useCallback(() => {
    if (reducedMotion || typeof window.requestAnimationFrame !== 'function') {
      return
    }

    window.cancelAnimationFrame(frameRef.current)
    setLanded(false)
    const startedAt = performance.now()

    const tick = (timestamp: number) => {
      const progress = Math.min((timestamp - startedAt) / HOVER_COUNT_MS, 1)
      setDisplayValue(renderAnimatedValue(metric.value, easeOutCubic(progress)))

      if (progress < 1) {
        frameRef.current = window.requestAnimationFrame(tick)
      } else {
        setLanded(true)
      }
    }

    frameRef.current = window.requestAnimationFrame(tick)
  }, [metric.value, reducedMotion])

  const activate = () => {
    setActive(true)
    playValueAnimation()
  }

  const deactivate = () => {
    window.cancelAnimationFrame(frameRef.current)
    setDisplayValue(metric.value)
    setLanded(false)
    setActive(false)
  }

  return (
    <m.article
      initial={{ opacity: 0, y: REVEAL.distance }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: REVEAL.duration, ease: REVEAL.ease, delay: staggerDelay(index) }}
      whileHover={{ y: -2 }}
      onMouseEnter={activate}
      onFocus={activate}
      onMouseLeave={deactivate}
      onBlur={deactivate}
      className="rounded-inner border border-[var(--color-border)] bg-[var(--color-hairline-soft)] p-4 transition duration-300 hover:border-[var(--color-border-strong)] hover:shadow-[0_0_30px_var(--color-accent-tint-2)]"
      data-metric-card={isLead ? 'lead' : 'default'}
    >
      <p className="font-mono text-label-sm uppercase tracking-label text-[var(--color-accent)]">{metric.label}</p>
      <p
        onAnimationEnd={() => setLanded(false)}
        className={cn(
          'mt-3 font-mono text-2xl font-semibold tabular-nums tracking-tight transition-colors duration-300',
          active ? 'text-[var(--color-emphasis)]' : 'text-[var(--color-text-strong)]',
          landed && 'metric-value-pop',
        )}
      >
        {displayValue}
      </p>
      <p className="mt-2 text-sm leading-6 text-[var(--color-text-muted)]">{metric.detail}</p>
    </m.article>
  )
}
