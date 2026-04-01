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

const DESKTOP_CHARACTERS = '.:+-=*#@&~<>{}[]|/\\01'
const MOBILE_CHARACTERS = '01'
const SPRING = 0.042
const DAMPING = 0.88

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
    const startedAt = performance.now()

    const buildParticles = () => {
      const parentWidth = canvas.parentElement?.clientWidth ?? canvas.clientWidth ?? 640
      const isMobile = window.innerWidth < 768

      dpr = Math.min(window.devicePixelRatio || 1, 2)
      width = Math.max(parentWidth, 280)
      fontSize = isMobile ? Math.max(64, Math.floor(width * 0.14)) : Math.max(110, Math.floor(width * 0.15))
      height = Math.max(180, Math.ceil(fontSize * (isMobile ? 1.7 : 1.55)))
      step = isMobile ? 4 : 5
      charSize = isMobile ? 5 : 7
      mouseRadius = isMobile ? 64 : 96
      mouseForce = isMobile ? 3.8 : 3.2

      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      canvas.width = Math.floor(width * dpr)
      canvas.height = Math.floor(height * dpr)
      context.setTransform(dpr, 0, 0, dpr, 0, 0)

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

      measureContext.font = `700 ${fontSize}px "JetBrains Mono", monospace`
      const measuredWidth = measureContext.measureText(text).width || width
      const scaleRatio = Math.min(1, (width * 0.96) / measuredWidth)
      const scaledFontSize = Math.floor(fontSize * scaleRatio)
      measureContext.font = `700 ${scaledFontSize}px "JetBrains Mono", monospace`

      offscreenContext.clearRect(0, 0, width, height)
      offscreenContext.font = `700 ${scaledFontSize}px "JetBrains Mono", monospace`
      offscreenContext.fillStyle = '#ffffff'
      offscreenContext.textAlign = 'left'
      offscreenContext.textBaseline = 'middle'
      offscreenContext.fillText(text, 0, height / 2)

      const imageData = offscreenContext.getImageData(0, 0, width, height)
      const characters = isMobile ? MOBILE_CHARACTERS : DESKTOP_CHARACTERS

      const resolvedTextWidth = measureContext.measureText(text).width || measuredWidth

      particles = []

      for (let y = 0; y < height; y += step) {
        for (let x = 0; x < width; x += step) {
          const index = (y * width + x) * 4
          if (imageData.data[index + 3] < 120) {
            continue
          }

          const charIndex = Math.min(
            text.length - 1,
            Math.max(0, Math.floor((x / Math.max(resolvedTextWidth, 1)) * text.length)),
          )

          particles.push({
            x: x + (Math.random() - 0.5) * width * 0.42,
            y: y + (Math.random() - 0.5) * height * 1.9,
            tx: x,
            ty: y,
            vx: 0,
            vy: 0,
            char: characters[Math.floor(Math.random() * characters.length)],
            finalChar: text[charIndex] ?? text[text.length - 1] ?? 'K',
            phase: Math.random() * Math.PI * 2,
            revealDelay: (x / width) * 0.9 + Math.random() * 0.16,
          })
        }
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
      const elapsed = (timestamp - startedAt) / 1000
      const characters = window.innerWidth < 768 ? MOBILE_CHARACTERS : DESKTOP_CHARACTERS

      context.clearRect(0, 0, width, height)
      context.font = `600 ${charSize}px "JetBrains Mono", monospace`
      context.textAlign = 'center'
      context.textBaseline = 'middle'
      context.fillStyle = getComputedStyle(document.documentElement).getPropertyValue('--color-accent').trim() || '#00ff41'

      particles.forEach((particle) => {
        particle.vx += (particle.tx - particle.x) * SPRING
        particle.vy += (particle.ty - particle.y) * SPRING

        const dx = particle.x - pointerX
        const dy = particle.y - pointerY
        const distance = Math.sqrt(dx * dx + dy * dy)

        if (distance < mouseRadius && distance > 0) {
          const force = ((1 - distance / mouseRadius) ** 2) * mouseForce
          particle.vx += (dx / distance) * force
          particle.vy += (dy / distance) * force
        }

        particle.vx *= DAMPING
        particle.vy *= DAMPING
        particle.x += particle.vx
        particle.y += particle.vy

        const revealed = Math.max(0, elapsed - particle.revealDelay)
        const decodeAlpha = Math.min(1, revealed / 0.16)
        const idleJitter = Math.sin(elapsed * 1.2 + particle.phase) * 0.8

        if (revealed < 0.72) {
          particle.char = characters[Math.floor(Math.random() * characters.length)]
        } else {
          particle.char = particle.finalChar
        }

        context.globalAlpha = Math.min(0.96, 0.22 + decodeAlpha * 0.74)
        context.fillText(particle.char, particle.x, particle.y + idleJitter)
      })

      context.globalAlpha = 1
      animationFrame = window.requestAnimationFrame(draw)
    }

    buildParticles()
    animationFrame = window.requestAnimationFrame(draw)
    window.addEventListener('resize', buildParticles)
    canvas.addEventListener('mousemove', handlePointerMove, { passive: true })
    canvas.addEventListener('mouseleave', handlePointerLeave)
    canvas.addEventListener('touchstart', handleTouch, { passive: true })
    canvas.addEventListener('touchmove', handleTouch, { passive: true })
    canvas.addEventListener('touchend', handleTouchEnd)

    return () => {
      window.cancelAnimationFrame(animationFrame)
      window.removeEventListener('resize', buildParticles)
      mediaQuery.removeEventListener?.('change', updateMotionPreference)
      canvas.removeEventListener('mousemove', handlePointerMove)
      canvas.removeEventListener('mouseleave', handlePointerLeave)
      canvas.removeEventListener('touchstart', handleTouch)
      canvas.removeEventListener('touchmove', handleTouch)
      canvas.removeEventListener('touchend', handleTouchEnd)
    }
  }, [text])

  return { canvasRef, isReady, reducedMotion }
}
