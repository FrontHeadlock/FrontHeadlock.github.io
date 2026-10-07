import { useEffect, useRef, useState } from 'react'

type AsciiParticle = {
  x: number
  y: number
  tx: number
  ty: number
  vx: number
  vy: number
  char: string
  finalChar: string
  phase: number
  revealDelay: number
}

// 글자 형태는 particle 위치(텍스트 알파 마스크 샘플링)가 만들고, 글리프 자체는 0/1만 쓴다.
// 디코드 중에는 0↔1이 프레임마다 뒤바뀌고, 정착 후에는 particle마다 고정된 비트로 남는다.
const CHARACTERS = '01'
// 스프링 상수는 60fps 1프레임 기준값. draw()에서 경과 시간으로 보정하므로 프레임이 떨어져도 같은 속도로 수렴한다.
const SPRING = 0.06
const DAMPING = 0.86
const FRAME_MS = 1000 / 60
// 왼쪽→오른쪽 디코드 스윕과 글자별 스크램블 유지 시간(초). 마지막 글자가 약 1초 안에 자리 잡는다.
const REVEAL_SWEEP = 0.5
const REVEAL_JITTER = 0.12
const SCRAMBLE_WINDOW = 0.4
// 샘플링에 쓰는 웹폰트. 준비 전에 빌드하면 폴백 폰트 모양으로 샘플링했다가 폰트 도착 후 다시 흩뿌려야 하므로
// 준비될 때까지(최대 FONT_WAIT_MS) 일반 h1을 그대로 보여 주고 한 번만 빌드한다.
const HERO_FONT = '700 16px "JetBrains Mono Variable"'
const FONT_WAIT_MS = 1500

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

    let animationFrame = 0
    let particles: AsciiParticle[] = []
    let width = 0
    let height = 0
    let dpr = 1
    let pointerX = -9999
    let pointerY = -9999
    let fontSize = 72
    let step = 5
    let charSize = 7
    let mouseRadius = 90
    let mouseForce = 3.2
    let accentColor = '#00ff41'
    let running = false
    let inViewport = true
    let cancelled = false
    let fontTimer = 0
    let startedAt = performance.now()
    let lastFrameTime = startedAt

    // initial=true: 흩어진 위치에서 모여드는 인트로. false(리사이즈 재샘플링): 현재 자리 근처에서 바로 정착해
    // 재흩뿌림이 보이지 않고, 디코드 타이밍도 되감지 않는다.
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

      accentColor = getComputedStyle(document.documentElement).getPropertyValue('--color-accent').trim() || '#00ff41'

      const offscreenCanvas = document.createElement('canvas')
      offscreenCanvas.width = width
      offscreenCanvas.height = height
      const offscreenContext = offscreenCanvas.getContext('2d')

      if (!offscreenContext) {
        particles = []
        setIsReady(false)
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

      for (let y = 0; y < height; y += step) {
        for (let x = 0; x < width; x += step) {
          const index = (y * width + x) * 4
          if (imageData.data[index + 3] < 120) {
            continue
          }

          particles.push({
            x: initial ? x + (Math.random() - 0.5) * width * 0.42 : x + (Math.random() - 0.5) * 12,
            y: initial ? y + (Math.random() - 0.5) * height * 1.9 : y + (Math.random() - 0.5) * 12,
            tx: x,
            ty: y,
            vx: 0,
            vy: 0,
            char: CHARACTERS[Math.floor(Math.random() * CHARACTERS.length)],
            finalChar: CHARACTERS[Math.floor(Math.random() * CHARACTERS.length)],
            phase: Math.random() * Math.PI * 2,
            revealDelay: (x / width) * REVEAL_SWEEP + Math.random() * REVEAL_JITTER,
          })
        }
      }

      if (initial) {
        startedAt = performance.now()
        lastFrameTime = startedAt
      }

      setIsReady(particles.length > 0)
    }

    const handlePointerMove = (event: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      pointerX = event.clientX - rect.left
      pointerY = event.clientY - rect.top
    }

    const handlePointerLeave = () => {
      pointerX = -9999
      pointerY = -9999
    }

    const handleTouch = (event: TouchEvent) => {
      const touch = event.touches[0]
      if (!touch) {
        pointerX = -9999
        pointerY = -9999
        return
      }

      const rect = canvas.getBoundingClientRect()
      pointerX = touch.clientX - rect.left
      pointerY = touch.clientY - rect.top
    }

    const handleTouchEnd = () => {
      pointerX = -9999
      pointerY = -9999
    }

    const draw = (timestamp: number) => {
      // 프레임 간격을 60fps 배수로 환산해 물리를 보정한다. 탭 복귀 등 큰 공백은 34ms로 잘라 튀지 않게 한다.
      const delta = Math.max(8, Math.min(34, timestamp - lastFrameTime))
      lastFrameTime = timestamp
      const steps = delta / FRAME_MS
      const damping = DAMPING ** steps
      const elapsed = (timestamp - startedAt) / 1000

      context.clearRect(0, 0, width, height)
      context.font = `600 ${charSize}px "JetBrains Mono Variable", monospace`
      context.textAlign = 'center'
      context.textBaseline = 'middle'
      context.fillStyle = accentColor

      particles.forEach((particle) => {
        particle.vx += (particle.tx - particle.x) * SPRING * steps
        particle.vy += (particle.ty - particle.y) * SPRING * steps

        const dx = particle.x - pointerX
        const dy = particle.y - pointerY
        const distance = Math.sqrt(dx * dx + dy * dy)

        if (distance < mouseRadius && distance > 0) {
          const force = ((1 - distance / mouseRadius) ** 2) * mouseForce * steps
          particle.vx += (dx / distance) * force
          particle.vy += (dy / distance) * force
        }

        particle.vx *= damping
        particle.vy *= damping
        particle.x += particle.vx * steps
        particle.y += particle.vy * steps

        const revealed = Math.max(0, elapsed - particle.revealDelay)
        const decodeAlpha = Math.min(1, revealed / 0.16)
        const idleJitter = Math.sin(elapsed * 1.2 + particle.phase) * 0.8

        if (revealed < SCRAMBLE_WINDOW) {
          particle.char = CHARACTERS[Math.floor(Math.random() * CHARACTERS.length)]
        } else {
          particle.char = particle.finalChar
        }

        context.globalAlpha = Math.min(0.96, 0.22 + decodeAlpha * 0.74)
        context.fillText(particle.char, particle.x, particle.y + idleJitter)
      })

      context.globalAlpha = 1

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
      } else {
        startLoop()
      }
    }

    const viewportObserver =
      typeof IntersectionObserver === 'function'
        ? new IntersectionObserver(([entry]) => {
            inViewport = entry?.isIntersecting ?? true
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
      }, 150)
    }

    const start = () => {
      if (cancelled) {
        return
      }

      buildParticles(true)
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
    canvas.addEventListener('touchend', handleTouchEnd)

    return () => {
      cancelled = true
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
      canvas.removeEventListener('touchend', handleTouchEnd)
    }
  }, [text, reducedMotion])

  return { canvasRef, isReady, reducedMotion }
}
