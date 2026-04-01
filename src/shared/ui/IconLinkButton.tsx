import type { ReactNode } from 'react'

type IconLinkButtonProps = {
  href?: string
  icon: ReactNode
  label: string
  value: string
  disabled?: boolean
}

export function IconLinkButton({ href, icon, label, value, disabled = false }: IconLinkButtonProps) {
  const baseClassName =
    'group flex min-h-16 items-center justify-between rounded-2xl border px-4 py-3 text-left transition duration-200'

  if (disabled) {
    return (
      <button
        type="button"
        disabled
        className={`${baseClassName} cursor-not-allowed border-[var(--color-border)] bg-[rgba(255,255,255,0.02)] text-[var(--color-text-subtle)]`}
      >
        <span className="flex items-center gap-3">
          <span className="text-[var(--color-text-subtle)]">{icon}</span>
          <span>
            <span className="block text-sm font-medium text-[var(--color-text-main)]">{label}</span>
            <span className="block text-xs">{value}</span>
          </span>
        </span>
        <span className="font-mono text-[11px] uppercase tracking-[0.22em]">Placeholder</span>
      </button>
    )
  }

  return (
    <a
      href={href}
      target={label === 'Email' ? undefined : '_blank'}
      rel={label === 'Email' ? undefined : 'noreferrer'}
      className={`${baseClassName} border-[var(--color-border)] bg-[rgba(255,255,255,0.02)] text-[var(--color-text-main)] hover:translate-x-[2px] hover:-translate-y-[2px] hover:border-[var(--color-border-strong)] hover:bg-[rgba(0,255,65,0.06)] focus-visible:translate-x-[2px] focus-visible:-translate-y-[2px] focus-visible:border-[var(--color-border-strong)] focus-visible:bg-[rgba(0,255,65,0.06)] focus-visible:outline-none`}
    >
      <span className="flex items-center gap-3">
        <span className="text-[var(--color-accent)] transition duration-200 group-hover:-translate-y-0.5 group-focus-visible:-translate-y-0.5">
          {icon}
        </span>
        <span>
          <span className="block text-sm font-medium">{label}</span>
          <span className="block text-xs text-[var(--color-text-muted)]">{value}</span>
        </span>
      </span>
      <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--color-text-subtle)] transition duration-200 group-hover:translate-x-1 group-hover:text-[var(--color-accent)] group-focus-visible:translate-x-1 group-focus-visible:text-[var(--color-accent)]">
        Open
      </span>
    </a>
  )
}
