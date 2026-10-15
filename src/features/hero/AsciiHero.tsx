import { cn } from '../../shared/lib/cn'
import { useAsciiHero } from '../../shared/hooks/useAsciiHero'

type AsciiHeroProps = {
  text: string
  srOnlyText?: string
  className?: string
  /** 'particles': 0/1 입자 캔버스(다크). 'static': 굵은 글자만(라이트, 도안 N1+의 44px 제목). */
  variant?: 'particles' | 'static'
}

function StaticName({ text, srOnlyText, className }: Omit<AsciiHeroProps, 'variant'>) {
  const hasSrName = srOnlyText !== undefined && srOnlyText !== text

  return (
    <div data-testid="ascii-hero" className={cn('relative w-full', className)}>
      <h1 className="text-[44px] font-bold leading-[52px] tracking-[-0.02em] text-[var(--color-text-strong)] md:text-[52px] md:leading-[60px]">
        {hasSrName ? <span className="sr-only">{srOnlyText}</span> : null}
        <span aria-hidden={hasSrName || undefined}>{text}</span>
      </h1>
    </div>
  )
}

function ParticleName({ text, srOnlyText, className }: Omit<AsciiHeroProps, 'variant'>) {
  const { canvasRef, isReady, reducedMotion } = useAsciiHero(text)

  return (
    <div data-testid="ascii-hero" className={cn('relative w-full', className)}>
      <h1
        className={cn(
          'font-mono text-[clamp(4rem,14vw,8.75rem)] font-semibold tracking-[-0.08em] text-[var(--color-text-strong)]',
          !reducedMotion && isReady && 'sr-only',
        )}
      >
        {srOnlyText ?? text}
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

export function AsciiHero({ variant = 'particles', ...props }: AsciiHeroProps) {
  return variant === 'static' ? <StaticName {...props} /> : <ParticleName {...props} />
}
