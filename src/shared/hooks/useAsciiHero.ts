import { useEffect, useRef, useState } from 'react'
import { beginHeroIntro } from '../lib/heroIntro'

type AsciiParticle = {
  x: number
  y: number
  sx: number
  sy: number
  tx: number
  ty: number
  vx: number
  vy: number
  char: string
  finalChar: string
  delay: number
}

// 글자 형태는 particle 위치(텍스트 알파 마스크 샘플링)가 만들고, 글리프 자체는 0/1만 쓴다.
// 디코드 중에는 0↔1이 프레임마다 뒤바뀌고, 정착 후에는 particle마다 고정된 비트로 남는다.
const CHARACTERS = '01'
// 인트로: particle마다 delay초에 흩어진 자리에서 출발해 INTRO_TRAVEL초 동안 easeOutCubic으로 제자리에 도착한다.
// 출발은 왼쪽→오른쪽 스윕(INTRO_SWEEP) + 흔들림(INTRO_JITTER). 프레임 수가 아니라 경과 시간 기준이라
// 프레임이 떨어져도 마지막 particle이 SWEEP + JITTER + TRAVEL(≈0.9초)에 정착한다.
const INTRO_SWEEP = 0.25
const INTRO_JITTER = 0.08
const INTRO_TRAVEL = 0.57
// 출발 후 SCRAMBLE_WINDOW초까지 0↔1을 뒤섞고(이동의 약 70% 지점), 밝기는 DECODE_FADE초에 걸쳐 올린다.
const SCRAMBLE_WINDOW = 0.4
const DECODE_FADE = 0.16
// 인트로 이후(마우스 반발, 리사이즈 재정착)는 스프링. 상수는 60fps 1스텝 기준이고,
// 프레임 간격을 1스텝 안팎의 하위 스텝으로 나눠 적분하므로 프레임이 떨어져도 같은 속도로 수렴한다.
const SPRING = 0.06
const DAMPING = 0.86
const FRAME_MS = 1000 / 60
// 탭 복귀 등 긴 공백은 이만큼(100ms)까지만 따라잡는다.
const MAX_CATCH_UP_MS = FRAME_MS * 6
// 속도(px/스텝)가 REST_SPEED 아래로 REST_FRAMES 프레임 연속 머물면 루프를 멈춘다. 포인터가 없을 때는
// 제자리 오차도 REST_OFFSET(px) 안이어야 한다. 포인터 이동·이탈, 테마·크기 변화가 다시 깨운다.
const REST_SPEED = 0.02
const REST_OFFSET = 0.25
const REST_FRAMES = 8
// 샘플링에 쓰는 웹폰트. 준비 전에 빌드하면 폴백 폰트 모양으로 샘플링했다가 폰트 도착 후 다시 흩뿌려야 하므로
// 준비될 때까지(최대 FONT_WAIT_MS) 일반 h1을 그대로 보여 주고 한 번만 빌드한다.
const HERO_FONT = '700 16px "JetBrains Mono Variable"'
const FONT_WAIT_MS = 1500

const easeOutCubic = (progress: number) => 1 - (1 - progress) ** 3

export function useAsciiHero(text: string) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const [reducedMotion, setReducedMotion] = useState(false)
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) {
      return
    }

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    const updateMotionPreference = () => setReducedMotion(mediaQuery.matches)

    updateMotionPreference()
    mediaQuery.addEventListener?.('change', updateMotionPreference)

    if (mediaQuery.matches) {
      setIsReady(false)

      return () => {
        mediaQuery.removeEventListener?.('change', updateMotionPreference)
      }
    }

    const context = canvas.getContext('2d')
    if (
      !context ||
      typeof context.clearRect !== 'function' ||
      typeof context.fillText !== 'function' ||
      typeof context.setTransform !== 'function'
    ) {
      setIsReady(false)

      return () => {
        mediaQuery.removeEventListener?.('change', updateMotionPreference)
      }
    }

    // 인트로가 끝날 때까지 매트릭스 레인 시작을 미룬다(heroIntro.ts).
    const endIntro = beginHeroIntro()

    let animationFrame = 0
    let particles: AsciiParticle[] = []
    let width = 0
    let height = 0
    let dpr = 1
    let pointerX = -9999
    let pointerY = -9999
    let pointerActive = false
    let fontSize = 72
    let step = 5
    let charSize = 7
    let mouseRadius = 90
    let mouseForce = 3.2
    let accentColor = '#00ff41'
    let running = false
    let settled = false
    let restFrames = 0
    let inViewport = true
    let cancelled = false
    let fontTimer = 0
    let startedAt = performance.now()
    let lastFrameTime = startedAt
    let introEnd = 0

    // 밴드(.theme-band) 안에서 재정의된 --color-accent를 쓰도록 캔버스 자신의 계산값을 읽는다.
    const readAccent = () => getComputedStyle(canvas).getPropertyValue('--color-accent').trim() || '#00ff41'

    // initial=true: 흩어진 위치에서 모여드는 인트로. false(리사이즈 재샘플링): 현재 자리 근처에서 스프링으로 바로 정착해
    // 재흩뿌림이 보이지 않고, 디코드도 되감지 않는다.
    const buildParticles = (initial: boolean) => {
      const parentWidth = canvas.parentElement?.clientWidth ?? canvas.clientWidth ?? 640
      const isMobile = window.innerWidth < 768

      dpr = Math.min(window.devicePixelRatio || 1, 2)
      width = Math.max(parentWidth, 280)
      fontSize = isMobile ? Math.max(64, Math.floor(width * 0.14)) : Math.max(110, Math.floor(width * 0.15))
      height = Math.max(180, Math.ceil(fontSize * (isMobile ? 1.7 : 1.55)))
      step = isMobile ? 3 : 5
      charSize = isMobile ? 5 : 7
      mouseRadius = isMobile ? 64 : 96
      mouseForce = isMobile ? 3.8 : 3.2

      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      canvas.width = Math.floor(width * dpr)
      canvas.height = Math.floor(height * dpr)
      context.setTransform(dpr, 0, 0, dpr, 0, 0)

      accentColor = readAccent()

      const offscreenCanvas = document.createElement('canvas')
      offscreenCanvas.width = width
      offscreenCanvas.height = height
      const offscreenContext = offscreenCanvas.getContext('2d')

      if (!offscreenContext) {
        particles = []
        setIsReady(false)
        endIntro()
        return
      }

      const measureContext = document.createElement('canvas').getContext('2d')
      if (
        !measureContext ||
        typeof measureContext.measureText !== 'function' ||
        typeof offscreenContext.fillText !== 'function' ||
        typeof offscreenContext.getImageData !== 'function'
      ) {
        particles = []
        setIsReady(false)
        endIntro()
        return
      }

      measureContext.font = `700 ${fontSize}px "JetBrains Mono Variable", monospace`
      const measuredWidth = measureContext.measureText(text).width || width
      const scaleRatio = Math.min(1, (width * 0.96) / measuredWidth)
      const scaledFontSize = Math.floor(fontSize * scaleRatio)

      offscreenContext.clearRect(0, 0, width, height)
      offscreenContext.font = `700 ${scaledFontSize}px "JetBrains Mono Variable", monospace`
      offscreenContext.fillStyle = '#ffffff'
      offscreenContext.textAlign = 'left'
      offscreenContext.textBaseline = 'middle'
      offscreenContext.fillText(text, 0, height / 2)

      const imageData = offscreenContext.getImageData(0, 0, width, height)

      particles = []
      let lastDelay = 0

      for (let y = 0; y < height; y += step) {
        for (let x = 0; x < width; x += step) {
          const index = (y * width + x) * 4
          if (imageData.data[index + 3] < 120) {
            continue
          }

          const sx = initial ? x + (Math.random() - 0.5) * width * 0.42 : x + (Math.random() - 0.5) * 12
          const sy = initial ? y + (Math.random() - 0.5) * height * 1.9 : y + (Math.random() - 0.5) * 12
          // 리사이즈 재샘플링은 인트로 없이 바로 스프링 단계로 들어가도록 출발 시각을 과거로 둔다.
          const delay = initial ? (x / width) * INTRO_SWEEP + Math.random() * INTRO_JITTER : -INTRO_TRAVEL
          lastDelay = Math.max(lastDelay, delay)

          particles.push({
            x: sx,
            y: sy,
            sx,
            sy,
            tx: x,
            ty: y,
            vx: 0,
            vy: 0,
            char: CHARACTERS[Math.floor(Math.random() * CHARACTERS.length)],
            finalChar: CHARACTERS[Math.floor(Math.random() * CHARACTERS.length)],
            delay,
          })
        }
      }

      if (initial) {
        startedAt = performance.now()
        lastFrameTime = startedAt
        introEnd = lastDelay + INTRO_TRAVEL
      }

      if (particles.length === 0) {
        endIntro()
      }

      setIsReady(particles.length > 0)
    }

    const draw = (timestamp: number) => {
      // 프레임 간격을 1스텝(60fps 1프레임) 안팎의 하위 스텝으로 나눠 스프링을 적분한다.
      const delta = Math.max(1, Math.min(MAX_CATCH_UP_MS, timestamp - lastFrameTime))
      lastFrameTime = timestamp
      const substeps = Math.max(1, Math.round(delta / FRAME_MS))
      const scale = delta / substeps / FRAME_MS
      const spring = SPRING * scale
      const damping = DAMPING ** scale
      const force = mouseForce * scale
      const elapsed = (timestamp - startedAt) / 1000

      let maxSpeed = 0
      let maxOffset = 0

      for (const particle of particles) {
        const sinceStart = elapsed - particle.delay

        if (sinceStart < INTRO_TRAVEL) {
          // 인트로 중: 경과 시간으로 위치를 정한다(프레임 수와 무관).
          const progress = easeOutCubic(Math.max(0, sinceStart) / INTRO_TRAVEL)
          particle.x = particle.sx + (particle.tx - particle.sx) * progress
          particle.y = particle.sy + (particle.ty - particle.sy) * progress
          continue
        }

        for (let i = 0; i < substeps; i += 1) {
          particle.vx += (particle.tx - particle.x) * spring
          particle.vy += (particle.ty - particle.y) * spring

          if (pointerActive) {
            const dx = particle.x - pointerX
            const dy = particle.y - pointerY
            const distanceSquared = dx * dx + dy * dy

            if (distanceSquared < mouseRadius * mouseRadius && distanceSquared > 0) {
              const distance = Math.sqrt(distanceSquared)
              const push = (1 - distance / mouseRadius) ** 2 * force
              particle.vx += (dx / distance) * push
              particle.vy += (dy / distance) * push
            }
          }

          particle.vx *= damping
          particle.vy *= damping
          particle.x += particle.vx * scale
          particle.y += particle.vy * scale
        }

        maxSpeed = Math.max(maxSpeed, Math.abs(particle.vx), Math.abs(particle.vy))
        maxOffset = Math.max(maxOffset, Math.abs(particle.x - particle.tx), Math.abs(particle.y - particle.ty))
      }

      context.clearRect(0, 0, width, height)
      context.font = `600 ${charSize}px "JetBrains Mono Variable", monospace`
      context.textAlign = 'center'
      context.textBaseline = 'middle'
      context.fillStyle = accentColor

      let currentAlpha = -1
      for (const particle of particles) {
        const revealed = Math.max(0, elapsed - particle.delay)
        particle.char =
          revealed < SCRAMBLE_WINDOW ? CHARACTERS[Math.floor(Math.random() * CHARACTERS.length)] : particle.finalChar

        const alpha = Math.min(0.96, 0.22 + Math.min(1, revealed / DECODE_FADE) * 0.74)
        if (alpha !== currentAlpha) {
          context.globalAlpha = alpha
          currentAlpha = alpha
        }
        context.fillText(particle.char, particle.x, particle.y)
      }

      context.globalAlpha = 1

      const introRunning = elapsed < introEnd
      if (!introRunning) {
        endIntro()
      }

      const atRest = !introRunning && maxSpeed < REST_SPEED && (pointerActive || maxOffset < REST_OFFSET)
      restFrames = atRest ? restFrames + 1 : 0

      if (restFrames >= REST_FRAMES) {
        // 정지 상태: 캔버스는 마지막 그림을 유지하므로 더 그릴 필요가 없다.
        settled = true
        stopLoop()
        return
      }

      if (running) {
        animationFrame = window.requestAnimationFrame(draw)
      }
    }

    const startLoop = () => {
      if (running) {
        return
      }

      running = true
      lastFrameTime = performance.now()
      animationFrame = window.requestAnimationFrame(draw)
    }

    const stopLoop = () => {
      running = false
      window.cancelAnimationFrame(animationFrame)
    }

    const syncLoop = () => {
      if (document.hidden || !inViewport) {
        stopLoop()
      } else if (!settled) {
        startLoop()
      }
    }

    // 정지해 있던 루프를 다시 돌린다(포인터, 테마, 리사이즈).
    const wake = () => {
      settled = false
      restFrames = 0
      syncLoop()
    }

    // 테마가 바뀌면 입자 색만 갱신하고 한 번 다시 그린다(재샘플링 없음).
    const themeObserver = new MutationObserver(() => {
      accentColor = readAccent()
      wake()
    })
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] })

    const handlePointerMove = (event: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      pointerX = event.clientX - rect.left
      pointerY = event.clientY - rect.top
      pointerActive = true
      wake()
    }

    const handlePointerLeave = () => {
      pointerActive = false
      wake()
    }

    const handleTouch = (event: TouchEvent) => {
      const touch = event.touches[0]
      if (!touch) {
        handlePointerLeave()
        return
      }

      const rect = canvas.getBoundingClientRect()
      pointerX = touch.clientX - rect.left
      pointerY = touch.clientY - rect.top
      pointerActive = true
      wake()
    }

    // 캔버스가 숨김(준비 전)→보임으로 바뀌면 두 항목이 한 번에 올 수 있으므로 가장 최근(마지막) 항목을 쓴다.
    // 첫 항목을 쓰면 '안 보임'으로 판정해 인트로가 멈춘 채로 남는다.
    const viewportObserver =
      typeof IntersectionObserver === 'function'
        ? new IntersectionObserver((entries) => {
            inViewport = entries[entries.length - 1]?.isIntersecting ?? true
            syncLoop()
          })
        : null

    // 모바일 주소창 show/hide가 스크롤 중 resize를 연발하므로,
    // 폭이 실제로 변한 경우에만 150ms 트레일링으로 재샘플링한다.
    let resizeTimer = 0
    let lastInnerWidth = window.innerWidth
    const handleResize = () => {
      if (window.innerWidth === lastInnerWidth) {
        return
      }

      window.clearTimeout(resizeTimer)
      resizeTimer = window.setTimeout(() => {
        lastInnerWidth = window.innerWidth
        buildParticles(false)
        wake()
      }, 150)
    }

    const start = () => {
      if (cancelled) {
        return
      }

      buildParticles(true)
      settled = false
      startLoop()
    }

    // 폰트가 이미 있으면 즉시, 아니면 로드를 명시적으로 요청하고 도착(또는 FONT_WAIT_MS 초과) 후 한 번만 빌드한다.
    // document.fonts가 없는 환경(jsdom 등)은 바로 진행한다.
    const fonts = document.fonts
    if (!fonts || typeof fonts.check !== 'function' || fonts.check(HERO_FONT)) {
      start()
    } else {
      const timeout = new Promise<void>((resolve) => {
        fontTimer = window.setTimeout(resolve, FONT_WAIT_MS)
      })
      const loaded = fonts.load(HERO_FONT).then(
        () => undefined,
        () => undefined,
      )

      Promise.race([loaded, timeout]).then(() => {
        window.clearTimeout(fontTimer)
        start()
      })
    }

    viewportObserver?.observe(canvas)
    document.addEventListener('visibilitychange', syncLoop)
    window.addEventListener('resize', handleResize)
    canvas.addEventListener('mousemove', handlePointerMove, { passive: true })
    canvas.addEventListener('mouseleave', handlePointerLeave)
    canvas.addEventListener('touchstart', handleTouch, { passive: true })
    canvas.addEventListener('touchmove', handleTouch, { passive: true })
    canvas.addEventListener('touchend', handlePointerLeave)

    return () => {
      cancelled = true
      endIntro()
      themeObserver.disconnect()
      stopLoop()
      window.clearTimeout(fontTimer)
      window.clearTimeout(resizeTimer)
      viewportObserver?.disconnect()
      document.removeEventListener('visibilitychange', syncLoop)
      window.removeEventListener('resize', handleResize)
      mediaQuery.removeEventListener?.('change', updateMotionPreference)
      canvas.removeEventListener('mousemove', handlePointerMove)
      canvas.removeEventListener('mouseleave', handlePointerLeave)
      canvas.removeEventListener('touchstart', handleTouch)
      canvas.removeEventListener('touchmove', handleTouch)
      canvas.removeEventListener('touchend', handlePointerLeave)
    }
  }, [text, reducedMotion])

  return { canvasRef, isReady, reducedMotion }
}
