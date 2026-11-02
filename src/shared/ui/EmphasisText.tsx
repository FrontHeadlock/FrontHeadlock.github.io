import { Fragment } from 'react'

type EmphasisTextProps = {
  text: string
  /** 강조 구간의 클래스. 기본은 굵게 + 강한 글자색. */
  className?: string
}

/**
 * 원고의 `**굵게**` 표기를 <strong>으로 그린다.
 * 짝이 맞지 않는 `**`가 있으면 원문을 그대로 보여 준다.
 */
export function EmphasisText({ text, className = 'font-semibold text-[var(--color-text-strong)]' }: EmphasisTextProps) {
  const parts = text.split('**')

  // split 결과가 짝수면 `**` 개수가 홀수, 즉 닫히지 않은 강조가 있다.
  if (parts.length < 3 || parts.length % 2 === 0) {
    return <>{text}</>
  }

  return (
    <>
      {parts.map((part, index) =>
        index % 2 === 1 ? (
          <strong key={index} className={className}>
            {part}
          </strong>
        ) : (
          <Fragment key={index}>{part}</Fragment>
        ),
      )}
    </>
  )
}
