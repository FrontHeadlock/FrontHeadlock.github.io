import { useDecodeText } from '../hooks/useDecodeText'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'
import { useScrollReveal } from '../hooks/useScrollReveal'

type SectionHeadingProps = {
  id?: string
  eyebrow: string
  title: string
  description?: string
}

export function SectionHeading({ id, eyebrow, title, description }: SectionHeadingProps) {
  const { ref, revealed } = useScrollReveal()
  const reducedMotion = usePrefersReducedMotion()
  const decodedEyebrow = useDecodeText(eyebrow, revealed && !reducedMotion)

  return (
    <div ref={ref} className="space-y-3">
      <p className="font-mono text-xs uppercase tracking-[0.28em] text-[var(--color-accent)]">
        <span className="sr-only">{eyebrow}</span>
        <span aria-hidden="true">{decodedEyebrow}</span>
      </p>
      <div className="space-y-2">
        <h2 id={id} className="text-3xl font-semibold tracking-tight text-white md:text-4xl">
          {title}
        </h2>
        {description ? <p className="max-w-3xl text-sm leading-7 text-[var(--color-text-muted)] md:text-base">{description}</p> : null}
      </div>
    </div>
  )
}
