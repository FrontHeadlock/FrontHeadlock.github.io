import type { ReactNode } from 'react'

type RevealProps = {
  children: ReactNode
  delay?: number
}

export function Reveal({ children }: RevealProps) {
  return (
    <div data-reveal="static">
      {children}
    </div>
  )
}
