import { m } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import type { ProfileMetric } from '../../entities/profile/types'
import { REVEAL, staggerDelay } from '../../shared/lib/motion'

type MetricCardProps = {
  metric: ProfileMetric
  isLead?: boolean
  index: number
}

const NUMBER_PATTERN = /\d+(\.\d+)?/g

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

export function MetricCard({ metric, isLead = false, index }: MetricCardProps) {
  const [displayValue, setDisplayValue] = useState(metric.value)
  const frameRef = useRef<number>(0)

  useEffect(() => {
    setDisplayValue(metric.value)
  }, [metric.value])

  useEffect(() => {
    return () => {
      window.cancelAnimationFrame(frameRef.current)
    }
  }, [])

  const playValueAnimation = () => {
    window.cancelAnimationFrame(frameRef.current)
    const startedAt = performance.now()
    const duration = 260

    const tick = (timestamp: number) => {
      const progress = Math.min((timestamp - startedAt) / duration, 1)
      setDisplayValue(renderAnimatedValue(metric.value, progress))

      if (progress < 1) {
        frameRef.current = window.requestAnimationFrame(tick)
      }
    }

    frameRef.current = window.requestAnimationFrame(tick)
  }

  const resetValue = () => {
    window.cancelAnimationFrame(frameRef.current)
    setDisplayValue(metric.value)
  }

  return (
    <m.article
      initial={{ opacity: 0, y: REVEAL.distance }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: REVEAL.duration, ease: REVEAL.ease, delay: staggerDelay(index) }}
      whileHover={{ y: -2 }}
      onMouseEnter={playValueAnimation}
      onFocus={playValueAnimation}
      onMouseLeave={resetValue}
      onBlur={resetValue}
      className="group rounded-2xl border border-[var(--color-border)] bg-[rgba(255,255,255,0.03)] p-4 transition duration-300 hover:border-[var(--color-border-strong)] hover:shadow-[0_0_30px_rgba(0,255,65,0.08)]"
      data-metric-card={isLead ? 'lead' : 'default'}
    >
      <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--color-accent)]">{metric.label}</p>
      <p className="mt-3 font-mono text-2xl font-semibold tabular-nums tracking-tight text-white transition duration-200 group-hover:text-[var(--color-accent)]">
        {displayValue}
      </p>
      <p className="mt-2 text-sm leading-6 text-[var(--color-text-muted)]">{metric.detail}</p>
    </m.article>
  )
}
