import { useEffect, useState } from 'react'

export function useTypingEffect(lines: string[], typingSpeed = 28, pause = 420) {
  const [visibleLines, setVisibleLines] = useState<string[]>(lines.map(() => ''))

  useEffect(() => {
    let cancelled = false
    let lineIndex = 0
    let charIndex = 0
    let timeoutId = 0

    const tick = () => {
      if (cancelled || lineIndex >= lines.length) {
        return
      }

      setVisibleLines((current) => {
        const nextVisible = [...current]
        nextVisible[lineIndex] = lines[lineIndex].slice(0, charIndex + 1)
        return nextVisible
      })

      charIndex += 1

      if (charIndex > lines[lineIndex].length) {
        lineIndex += 1
        charIndex = 0
        timeoutId = window.setTimeout(tick, pause)
        return
      }

      timeoutId = window.setTimeout(tick, typingSpeed)
    }

    setVisibleLines(lines.map(() => ''))
    timeoutId = window.setTimeout(tick, typingSpeed)

    return () => {
      cancelled = true
      if (timeoutId) {
        window.clearTimeout(timeoutId)
      }
    }
  }, [lines, pause, typingSpeed])

  return visibleLines
}
