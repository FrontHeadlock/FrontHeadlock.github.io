import { DecodeLabel } from './DecodeLabel'

type SectionHeadingProps = {
  id?: string
  eyebrow: string
  title?: string
  description?: string
}

const eyebrowClassName = 'section-eyebrow font-mono text-label uppercase tracking-label-wide text-[var(--color-accent)]'

/**
 * 섹션 제목 블록. title이 없으면(연락처처럼 눈썹 라벨만 두는 구역) 눈썹 라벨이 h2가 되어
 * section의 aria-labelledby가 계속 유효하다.
 */
export function SectionHeading({ id, eyebrow, title, description }: SectionHeadingProps) {
  if (!title) {
    return (
      <h2 id={id} className={eyebrowClassName}>
        <DecodeLabel text={eyebrow} />
      </h2>
    )
  }

  return (
    <div className="space-y-3">
      <p className={eyebrowClassName}>
        <DecodeLabel text={eyebrow} />
      </p>
      <div className="space-y-2">
        <h2 id={id} className="text-3xl font-semibold tracking-tight text-[var(--color-text-strong)] md:text-4xl">
          {title}
        </h2>
        {description ? <p className="max-w-3xl text-sm leading-7 text-[var(--color-text-muted)] md:text-base">{description}</p> : null}
      </div>
    </div>
  )
}
