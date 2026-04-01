type SectionHeadingProps = {
  id?: string
  eyebrow: string
  title: string
  description?: string
}

export function SectionHeading({ id, eyebrow, title, description }: SectionHeadingProps) {
  return (
    <div className="space-y-3">
      <p className="font-mono text-xs uppercase tracking-[0.28em] text-[var(--color-accent)]">{eyebrow}</p>
      <div className="space-y-2">
        <h2 id={id} className="text-3xl font-semibold tracking-tight text-white md:text-4xl">
          {title}
        </h2>
        {description ? <p className="max-w-3xl text-sm leading-7 text-[var(--color-text-muted)] md:text-base">{description}</p> : null}
      </div>
    </div>
  )
}
