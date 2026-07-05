import type { ReactNode } from 'react'
import { useScrollReveal } from '../hooks/useScrollReveal'
import { cn } from '../lib/cn'

type RevealProps = {
  children: ReactNode
  delay?: number
}

export function Reveal({ children, delay = 0 }: RevealProps) {
  const { ref, revealed } = useScrollReveal()

  return (
    <div
      ref={ref}
      data-reveal={revealed ? 'revealed' : 'pending'}
      style={{ transitionDelay: `${delay}s` }}
      className={cn(
        'transition duration-300 ease-out motion-reduce:!opacity-100 motion-reduce:!translate-y-0',
        revealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3',
      )}
    >
      {children}
    </div>
  )
}
