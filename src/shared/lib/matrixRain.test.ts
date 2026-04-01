import { describe, expect, it } from 'vitest'
import { advanceColumn } from './matrixRain'

describe('advanceColumn', () => {
  it('wraps a finished column back above the canvas', () => {
    const next = advanceColumn({
      position: 900,
      canvasHeight: 800,
      speed: 12,
      resetOffset: 120,
      variance: 0,
      random: () => 0.5,
    })

    expect(next).toBeLessThan(0)
  })

  it('keeps advancing an active column downward', () => {
    const next = advanceColumn({
      position: 120,
      canvasHeight: 800,
      speed: 12,
      resetOffset: 120,
      variance: 0,
      random: () => 0.5,
    })

    expect(next).toBe(132)
  })
})
