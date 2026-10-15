import { ChevronRight } from 'lucide-react'
import type { ReactNode } from 'react'
import { useStrings } from '../i18n/strings'
import { cn } from '../lib/cn'

type IconLinkButtonProps = {
  href?: string
  icon: ReactNode
  label: string
  value: string
  disabled?: boolean
  /** 'terminal': 아이콘 + "열기" 라벨(다크). 'tile': 둥근 아이콘 + 화살표(라이트, 도안 N1+). */
  variant?: 'terminal' | 'tile'
}

export function IconLinkButton({ href, icon, label, value, disabled = false, variant = 'terminal' }: IconLinkButtonProps) {
  const strings = useStrings()
  const tile = variant === 'tile'
  const baseClassName = cn(
    'group flex min-h-16 items-center justify-between rounded-inner border px-4 py-3 text-left transition duration-200',
    tile && 'gap-3.5 px-5',
  )

  if (disabled) {
    return (
      <button
        type="button"
        disabled
        className={`${baseClassName} cursor-not-allowed border-[var(--color-border)] bg-[var(--color-hairline-soft)] text-[var(--color-text-subtle)]`}
      >
        <span className="flex items-center gap-3">
          <span className="text-[var(--color-text-subtle)]">{icon}</span>
          <span>
            <span className="block text-sm font-medium text-[var(--color-text-main)]">{label}</span>
            <span className="block text-xs">{value}</span>
          </span>
        </span>
        <span className="font-mono text-label-sm uppercase tracking-label">{strings.links.placeholder}</span>
      </button>
    )
  }

  return (
    <a
      href={href}
      target={label === 'Email' ? undefined : '_blank'}
      rel={label === 'Email' ? undefined : 'noreferrer'}
      className={`${baseClassName} border-[var(--color-border)] bg-[var(--color-hairline-soft)] text-[var(--color-text-main)] hover:translate-x-[2px] hover:-translate-y-[2px] hover:border-[var(--color-border-strong)] hover:bg-[var(--color-accent-tint-1)] focus-visible:translate-x-[2px] focus-visible:-translate-y-[2px] focus-visible:border-[var(--color-border-strong)] focus-visible:bg-[var(--color-accent-tint-1)] focus-visible:outline-none`}
    >
      <span className="flex min-w-0 items-center gap-3">
        {tile ? (
          <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[var(--color-accent-tint-2)] text-[var(--color-text-strong)]">
            {icon}
          </span>
        ) : (
          <span className="text-[var(--color-accent)] transition duration-200 group-hover:-translate-y-0.5 group-focus-visible:-translate-y-0.5">
            {icon}
          </span>
        )}
        <span className="min-w-0">
          <span className={cn('block text-sm font-medium', tile && 'font-bold text-[var(--color-text-strong)]')}>{label}</span>
          <span className={cn('block text-xs', tile ? 'text-[var(--color-text-subtle)]' : 'text-[var(--color-text-muted)]')}>{value}</span>
        </span>
      </span>
      {tile ? (
        <span className="inline-flex shrink-0 text-[var(--color-text-muted)] transition duration-200 group-hover:translate-x-1 group-hover:text-[var(--color-text-strong)]">
          <ChevronRight size={18} aria-hidden="true" />
          <span className="sr-only">{strings.links.open}</span>
        </span>
      ) : (
        <span className="font-mono text-label-sm uppercase tracking-label text-[var(--color-text-subtle)] transition duration-200 group-hover:translate-x-1 group-hover:text-[var(--color-accent)] group-focus-visible:translate-x-1 group-focus-visible:text-[var(--color-accent)]">
          {strings.links.open}
        </span>
      )}
    </a>
  )
}
