import { useCallback, useEffect, useRef, useState } from 'react'
import { useDecodeText } from '../../shared/hooks/useDecodeText'
import { useStrings } from '../../shared/i18n/strings'
import { BOOT } from '../../shared/lib/motion'

export const BOOT_STORAGE_KEY = 'boot-sequence-done'

export function shouldShowBootSequence(): boolean {
  // Lighthouse CI 등 자동화 환경에서는 재생하지 않는다 — 측정 무결성 (플랜 §3/§7).
  if (window.navigator.webdriver) {
    return false
  }

  try {
    if (window.sessionStorage.getItem(BOOT_STORAGE_KEY) === 'true') {
      return false
    }
  } catch {
    // sessionStorage unavailable (private browsing) — degrade to once-per-load instead of once-per-session.
  }

  return !window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

function markBootSequenceDone() {
  try {
    window.sessionStorage.setItem(BOOT_STORAGE_KEY, 'true')
  } catch {
    // 기록 실패 시 리로드에서 다시 재생될 뿐 — 치명적이지 않다.
  }
}

const PARTICLE_COUNT = 320
// 본문 rain 캔버스와 동일한 문자 집합 — 오버레이와 배경이 같은 시각 언어를 쓴다.
const BOOT_GLYPHS = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ{}[]<>/\\=+-*%$#@'
// 진입 직후 첫 인상이 압도적이도록 순간적으로 몰아치는 하이퍼스페이스 점프 구간(초).
const BURST_DURATION = 1.0

type WarpParticle = {
  angle: number
  drift: number
  progress: number
  speed: number
  size: number
  charShift: number
  bright: boolean
}

// initial=false로 리스폰되는 입자는 중심 근처(스크림 뒤)에서 나타나 pop-in이 보이지 않는다.
function createParticle(initial: boolean): WarpParticle {
  return {
    angle: Math.random() * Math.PI * 2,
    drift: (Math.random() - 0.5) * 0.16,
    progress: initial ? Math.random() : Math.random() * 0.12,
    speed: 0.55 + Math.random() * 0.9,
    size: 10 + Math.random() * 11,
    charShift: Math.floor(Math.random() * BOOT_GLYPHS.length),
    bright: Math.random() < 0.22,
  }
}

// 초반 급가속 후 크루징 속도로 안착하는 완만한 감쇠 곡선 (quintic ease-out).
function burstMultiplier(t: number) {
  if (t >= BURST_DURATION) {
    return 1
  }

  const remaining = 1 - t / BURST_DURATION
  return 1 + remaining ** 5 * 11
}

// 캔버스는 CSS 변수를 직접 읽지 못하므로 마운트 시 한 번 resolve한다.
function resolveAccentRgb(): [number, number, number] {
  const raw = getComputedStyle(document.documentElement).getPropertyValue('--color-accent').trim()
  const match = /^#([0-9a-f]{6})$/i.exec(raw)

  if (!match) {
    return [0, 255, 65]
  }

  const value = parseInt(match[1], 16)
  return [(value >> 16) & 255, (value >> 8) & 255, value & 255]
}

function useBootVortex(leaving: boolean) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const leavingRef = useRef(leaving)

  useEffect(() => {
    leavingRef.current = leaving
  }, [leaving])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) {
      return
    }

    let context: CanvasRenderingContext2D | null = null

    try {
      context = canvas.getContext('2d')
    } catch {
      return
    }

    if (!context) {
      return
    }

    const ctx = context
    const [red, green, blue] = resolveAccentRgb()
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    const particles = Array.from({ length: PARTICLE_COUNT }, () => createParticle(true))
    let animationFrame = 0
    let lastFrameTime = performance.now()
    let virtualTime = 0
    let speed = 1
    let cachedFont = ''

    // 캔버스 크기 변경은 컨텍스트 상태를 초기화하므로 정렬/폰트 캐시도 여기서 재설정한다.
    const resize = () => {
      canvas.width = Math.round(window.innerWidth * dpr)
      canvas.height = Math.round(window.innerHeight * dpr)
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      cachedFont = ''
    }

    const draw = (timeMs: number) => {
      const delta = Math.max(0, Math.min(64, timeMs - lastFrameTime))
      lastFrameTime = timeMs

      // 종료 시 페이드와 함께 볼텍스를 가속한다 — "터널을 빠져나오는" 마무리 (플랜 §4).
      if (leavingRef.current && speed < BOOT.exitSpeedRamp) {
        speed = Math.min(BOOT.exitSpeedRamp, speed + delta * ((BOOT.exitSpeedRamp - 1) / (BOOT.fade * 1000)))
      }

      virtualTime += delta * speed
      const t = virtualTime / 1000
      const burst = burstMultiplier(t)

      const { width, height } = canvas
      const centerX = width * 0.5
      const centerY = height * 0.46
      const minRadius = Math.min(width, height) * 0.02
      const maxRadius = Math.hypot(width, height) * 0.62

      // clearRect 대신 배경색 반투명 필 — rain 캔버스와 같은 인광(phosphor) 잔상 언어.
      // 진입 버스트/종료 램프에서는 잔상을 길게 남겨 글리프가 워프 스트릭으로 늘어난다.
      const trailFade = leavingRef.current || burst > 1.5 ? 0.05 : 0.16
      ctx.fillStyle = `rgba(10, 10, 10, ${trailFade})`
      ctx.fillRect(0, 0, width, height)

      for (const particle of particles) {
        // 바깥으로 갈수록 가속 — 원근 터널의 시차(parallax). 진입 버스트가 여기에 곱해져
        // 첫 프레임들에서 입자가 폭발하듯 튀어나가는 인상을 만든다.
        particle.progress += delta * speed * burst * particle.speed * 0.00016 * (0.25 + particle.progress * 1.75)
        particle.angle += particle.drift * delta * 0.001

        if (particle.progress >= 1) {
          Object.assign(particle, createParticle(false))
        }

        const radius = minRadius + (maxRadius - minRadius) * particle.progress ** 1.8
        const x = centerX + Math.cos(particle.angle) * radius
        const y = centerY + Math.sin(particle.angle) * radius

        const glyph = BOOT_GLYPHS[(particle.charShift + Math.floor(t * 6)) % BOOT_GLYPHS.length]
        const fontSize = Math.round(particle.size * (0.55 + particle.progress * 1.15) * dpr)
        const font = `500 ${fontSize}px "JetBrains Mono Variable", monospace`

        if (font !== cachedFont) {
          cachedFont = font
          ctx.font = font
        }

        const fadeIn = Math.min(1, particle.progress / 0.14)
        const alpha = fadeIn * (particle.bright ? 0.55 + particle.progress * 0.45 : 0.16 + particle.progress * 0.48)

        // 리더 글리프는 rain의 헤드와 같은 민트빛 하이라이트를 쓴다.
        ctx.fillStyle = particle.bright
          ? `rgba(170, 255, 205, ${Math.min(0.95, alpha).toFixed(3)})`
          : `rgba(${red}, ${green}, ${blue}, ${alpha.toFixed(3)})`
        ctx.fillText(glyph, x, y)
      }

      animationFrame = window.requestAnimationFrame(draw)
    }

    resize()
    animationFrame = window.requestAnimationFrame(draw)
    // 수명이 ~2.75초라 rain 캔버스와 달리 리사이즈 디바운스·visibilitychange 처리는 생략한다.
    window.addEventListener('resize', resize)

    return () => {
      window.cancelAnimationFrame(animationFrame)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return canvasRef
}

function BootLogLine({ text, started, withCursor }: { text: string; started: boolean; withCursor?: boolean }) {
  const decoded = useDecodeText(text, started)
  const resolved = started && decoded === text

  return (
    <p className="my-1.5" style={{ visibility: started ? 'visible' : 'hidden' }}>
      {decoded}
      {withCursor && resolved ? <span className="boot-cursor">{' '}▮</span> : null}
    </p>
  )
}

export function BootSequence({ onDone }: { onDone: () => void }) {
  const strings = useStrings()
  const [leaving, setLeaving] = useState(false)
  const canvasRef = useBootVortex(leaving)
  const dismissedRef = useRef(false)
  const lineCount = strings.boot.lines.length
  const [startedCount, setStartedCount] = useState(1)

  const dismiss = useCallback(() => {
    if (dismissedRef.current) {
      return
    }

    dismissedRef.current = true
    markBootSequenceDone()
    setLeaving(true)
  }, [])

  useEffect(() => {
    const interval = window.setInterval(() => {
      setStartedCount((current) => {
        if (current >= lineCount) {
          window.clearInterval(interval)
          return current
        }

        return current + 1
      })
    }, BOOT.lineStagger * 1000)

    return () => window.clearInterval(interval)
  }, [lineCount])

  useEffect(() => {
    const timer = window.setTimeout(dismiss, BOOT.autoDismiss * 1000)
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        dismiss()
      }
    }

    // 오버레이가 뷰포트 전체를 덮는 동안의 입력이므로 window에서 받는다 (클릭 = 어디든 스킵).
    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('click', dismiss)

    return () => {
      window.clearTimeout(timer)
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('click', dismiss)
    }
  }, [dismiss])

  useEffect(() => {
    if (!leaving) {
      return
    }

    const timer = window.setTimeout(onDone, BOOT.fade * 1000)
    return () => window.clearTimeout(timer)
  }, [leaving, onDone])

  return (
    <div
      data-testid="boot-sequence"
      role="status"
      aria-label={strings.boot.ariaLabel}
      className="boot-overlay boot-punch-in fixed inset-0 z-50 bg-[var(--color-bg)] transition-opacity ease-out"
      style={{ opacity: leaving ? 0 : 1, transitionDuration: `${BOOT.fade * 1000}ms` }}
    >
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" aria-hidden="true" />
      <div className="boot-flash absolute inset-0" aria-hidden="true" />
      <div className="boot-glitch absolute inset-0" aria-hidden="true" />
      <div className="boot-vignette absolute inset-0" aria-hidden="true" />
      <div className="absolute inset-0 grid place-items-center" aria-hidden="true">
        <div className="boot-scrim px-10 py-12">
          <div className="w-[min(92vw,480px)] font-mono text-xs text-[var(--color-accent)] sm:text-sm">
            {strings.boot.lines.map((line, index) => (
              <BootLogLine key={line} text={line} started={index < startedCount} withCursor={index === lineCount - 1} />
            ))}
          </div>
        </div>
      </div>
      <button
        type="button"
        onClick={dismiss}
        aria-label={strings.boot.skipAriaLabel}
        className="absolute bottom-6 right-6 inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-lg border border-[var(--color-border)] bg-[rgba(255,255,255,0.02)] px-4 font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--color-text-subtle)] transition duration-200 hover:border-[var(--color-border-strong)] hover:text-[var(--color-accent)] focus-visible:border-[var(--color-border-strong)] focus-visible:bg-[rgba(0,255,65,0.06)] focus-visible:text-[var(--color-accent)] focus-visible:outline-none"
      >
        {strings.boot.skip}
      </button>
    </div>
  )
}
