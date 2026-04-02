import { useEffect, useRef } from 'react'
import { advanceColumn } from '../lib/matrixRain'

type RainColumn = {
  x: number
  y: number
  speed: number
  variance: number
  resetOffset: number
  alpha: number
  size: number
  tailLength: number
  charShift: number
}

export function useMatrixRain() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
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

    let animationFrame = 0
    let lastFrameTime = performance.now()
    let columns: RainColumn[] = []
    const characters = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ{}[]<>/\\=+-*%$#@'
    let cachedFontSize = -1

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = Math.max(window.innerHeight, document.documentElement.scrollHeight)
      const spacing = 17
      const columnCount = Math.floor(canvas.width / spacing) + 1
      columns = Array.from({ length: columnCount }, (_, index) => ({
        x: index * spacing,
        y: Math.random() * canvas.height * 1.6 - canvas.height * 1.1,
        speed: 1.7 + Math.random() * 1.2,
        variance: canvas.height * (0.2 + Math.random() * 0.85),
        resetOffset: canvas.height * (0.32 + Math.random() * 1.05),
        alpha: 0.18 + Math.random() * 0.26,
        size: 12 + Math.floor(Math.random() * 2),
        tailLength: 8 + Math.floor(Math.random() * 8),
        charShift: Math.floor(Math.random() * characters.length),
      }))
    }

    const draw = (timeMs: number) => {
      const delta = Math.max(8, Math.min(34, timeMs - lastFrameTime))
      const frameScale = delta / 16.6667
      lastFrameTime = timeMs
      context.fillStyle = 'rgba(6, 10, 14, 0.06)'
      context.fillRect(0, 0, canvas.width, canvas.height)
      const charsetLength = characters.length

      columns.forEach((column) => {
        if (cachedFontSize !== column.size) {
          cachedFontSize = column.size
          context.font = `400 ${column.size}px "JetBrains Mono", monospace`
        }
        const baseIndex = (Math.floor((column.y + timeMs * 0.05) / Math.max(column.size, 1)) + column.charShift) % charsetLength

        for (let tailIndex = 0; tailIndex < column.tailLength; tailIndex += 1) {
          const glyph = characters[(baseIndex + tailIndex * 3 + 1000 * charsetLength) % charsetLength]
          const glyphY = column.y - tailIndex * (column.size + 1.5)

          if (glyphY < -column.size || glyphY > canvas.height + column.size) {
            continue
          }

          const alpha = Math.max(0.07, column.alpha - tailIndex * 0.035)
          context.fillStyle = tailIndex === 0 ? `rgba(170, 255, 205, ${Math.min(0.95, alpha + 0.25)})` : `rgba(0, 255, 65, ${alpha})`
          context.fillText(glyph, column.x, glyphY)
        }

        const nextY = advanceColumn({
          position: column.y,
          canvasHeight: canvas.height,
          speed: column.speed * frameScale,
          resetOffset: column.resetOffset,
          variance: column.variance,
        })

        if (nextY < column.y) {
          column.speed = 1.7 + Math.random() * 1.2
          column.tailLength = 8 + Math.floor(Math.random() * 8)
          column.charShift = (column.charShift + 7 + Math.floor(Math.random() * 11)) % charsetLength
          column.alpha = 0.18 + Math.random() * 0.26
        }

        column.y = nextY
      })

      animationFrame = window.requestAnimationFrame(draw)
    }

    resize()
    animationFrame = window.requestAnimationFrame(draw)
    window.addEventListener('resize', resize)

    return () => {
      window.cancelAnimationFrame(animationFrame)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return canvasRef
}
