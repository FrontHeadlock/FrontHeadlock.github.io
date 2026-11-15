import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { afterHeroIntro, beginHeroIntro } from './heroIntro'

describe('heroIntro', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('runs after one frame when no intro is pending', () => {
    const callback = vi.fn()
    afterHeroIntro(callback, 2500)

    expect(callback).not.toHaveBeenCalled()
    vi.advanceTimersByTime(20)
    expect(callback).toHaveBeenCalledTimes(1)
  })

  it('waits for an intro registered in the same commit, then runs once it ends', () => {
    const callback = vi.fn()
    afterHeroIntro(callback, 2500)
    // 레인 effect가 먼저 돌고, 같은 커밋에서 히어로가 인트로를 등록하는 순서
    const endIntro = beginHeroIntro()

    vi.advanceTimersByTime(600)
    expect(callback).not.toHaveBeenCalled()

    endIntro()
    expect(callback).toHaveBeenCalledTimes(1)

    endIntro()
    vi.advanceTimersByTime(3000)
    expect(callback).toHaveBeenCalledTimes(1)
  })

  it('gives up waiting after maxWaitMs', () => {
    const callback = vi.fn()
    const endIntro = beginHeroIntro()
    afterHeroIntro(callback, 2500)

    vi.advanceTimersByTime(2499)
    expect(callback).not.toHaveBeenCalled()
    vi.advanceTimersByTime(1)
    expect(callback).toHaveBeenCalledTimes(1)

    endIntro()
    expect(callback).toHaveBeenCalledTimes(1)
  })

  it('does not run after being cancelled', () => {
    const callback = vi.fn()
    const endIntro = beginHeroIntro()
    const cancel = afterHeroIntro(callback, 2500)

    vi.advanceTimersByTime(20)
    cancel()
    endIntro()
    vi.advanceTimersByTime(3000)
    expect(callback).not.toHaveBeenCalled()
  })
})
