import { useEffect, useState } from 'react'

const LATIN = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
// 한글은 라틴 모노 글리프보다 폭이 넓어 라틴으로 스크램블하면 라벨 폭이 출렁인다.
// 호환 자모는 완성형 음절과 같은 전각 폭이라 글자 단위 폭을 유지한다.
const JAMO = 'ㄱㄴㄷㄹㅁㅂㅅㅇㅈㅊㅋㅌㅍㅎㅏㅓㅗㅜㅡㅣ'
const HANGUL = /[ᄀ-ᇿ㄰-㆏가-힯]/

function scrambleFor(char: string) {
  const pool = HANGUL.test(char) ? JAMO : LATIN
  return pool[Math.floor(Math.random() * pool.length)]
}

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
          return scrambleFor(char)
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
