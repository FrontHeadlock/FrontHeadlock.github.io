import { useEffect, useState } from 'react'

const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'

export function useDecodeText(text: string, enabled = true) {
  const [value, setValue] = useState(enabled ? '' : text)

  useEffect(() => {
    if (!enabled) {
      setValue(text)
      return
    }

    let frame = 0
    const totalFrames = 18
    const interval = window.setInterval(() => {
      frame += 1
      const progress = frame / totalFrames
      const resolved = Math.floor(text.length * progress)

      const nextValue = text
        .split('')
        .map((char, index) => {
          if (char === ' ') return ' '
          if (index < resolved) return char
          return charset[Math.floor(Math.random() * charset.length)]
        })
        .join('')

      setValue(nextValue)

      if (frame >= totalFrames) {
        window.clearInterval(interval)
        setValue(text)
      }
    }, 32)

    return () => window.clearInterval(interval)
  }, [enabled, text])

  return value
}
