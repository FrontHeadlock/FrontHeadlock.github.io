import { useEffect, useRef } from 'react'
import { advanceColumn } from '../lib/matrixRain'

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
    let columns: number[] = []
    const characters = '01[]{}<>/\\'

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = Math.max(window.innerHeight, document.documentElement.scrollHeight)
      columns = Array.from({ length: Math.floor(canvas.width / 18) }, () => Math.random() * -100)
    }

    const draw = () => {
      context.fillStyle = 'rgba(10, 10, 10, 0.05)'
      context.fillRect(0, 0, canvas.width, canvas.height)
      context.font = '12px "JetBrains Mono", monospace'

      columns.forEach((position, index) => {
        const character = characters[Math.floor(Math.random() * characters.length)]
        context.fillStyle = 'rgba(0, 255, 65, 0.18)'
        context.fillText(character, index * 18, position)
        columns[index] = advanceColumn({
          position,
          canvasHeight: canvas.height,
          speed: 11,
          resetOffset: 120,
          variance: Math.random() * 400,
        })
      })

      animationFrame = window.requestAnimationFrame(draw)
    }

    resize()
    draw()
    window.addEventListener('resize', resize)

    return () => {
      window.cancelAnimationFrame(animationFrame)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return canvasRef
}
