import { cn } from '../../shared/lib/cn'
import { useAsciiHero } from '../../shared/hooks/useAsciiHero'

type AsciiHeroProps = {
  text: string
  className?: string
}

export function AsciiHero({ text, className }: AsciiHeroProps) {
  const { canvasRef, isReady, reducedMotion } = useAsciiHero(text)

  return (
    <div data-testid="ascii-hero" className={cn('relative w-full', className)}>
      <h1
        className={cn(
          'font-mono text-[clamp(4rem,14vw,8.75rem)] font-semibold tracking-[-0.08em] text-white',
          !reducedMotion && isReady && 'sr-only',
        )}
      >
        {text}
      </h1>
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className={cn(
          'block min-h-[190px] w-full select-none md:min-h-[250px]',
          (reducedMotion || !isReady) && 'hidden',
        )}
      />
    </div>
  )
}
