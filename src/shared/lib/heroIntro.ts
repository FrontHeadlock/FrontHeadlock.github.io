// 히어로 이름 인트로가 진행 중인지 알리는 작은 신호.
// 인트로와 같은 프레임 예산을 나눠 쓰는 효과(다크 테마의 매트릭스 레인)가 인트로가 끝난 뒤 시작하도록 기다리는 데 쓴다.
let pending = 0
const waiters = new Set<() => void>()

/** 인트로 시작을 등록하고, 끝났을 때 부를 함수를 돌려준다. 여러 번 불러도 한 번만 반영된다. */
export function beginHeroIntro() {
  pending += 1
  let ended = false

  return () => {
    if (ended) {
      return
    }

    ended = true
    pending = Math.max(0, pending - 1)
    if (pending === 0) {
      const ready = [...waiters]
      waiters.clear()
      ready.forEach((run) => run())
    }
  }
}

/**
 * 진행 중인 인트로가 끝나면 callback을 부른다. 인트로가 없으면 바로 부른다.
 * 같은 커밋에서 히어로 effect가 아직 등록 전일 수 있으므로(레인이 DOM상 히어로보다 앞) 한 프레임 뒤에 확인한다.
 * maxWaitMs가 지나면 인트로와 무관하게 부른다(히어로가 화면 밖에서 시작한 경우 등). 반환값은 대기 취소.
 */
export function afterHeroIntro(callback: () => void, maxWaitMs: number) {
  let done = false

  const run = () => {
    if (done) {
      return
    }

    done = true
    window.clearTimeout(timer)
    waiters.delete(run)
    callback()
  }

  const frame = window.requestAnimationFrame(() => {
    if (pending === 0) {
      run()
    } else {
      waiters.add(run)
    }
  })
  const timer = window.setTimeout(run, maxWaitMs)

  return () => {
    done = true
    window.cancelAnimationFrame(frame)
    window.clearTimeout(timer)
    waiters.delete(run)
  }
}
