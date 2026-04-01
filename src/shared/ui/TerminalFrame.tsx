import type { ReactNode } from 'react'

type TerminalFrameProps = {
  label: string
  children: ReactNode
  className?: string
}

export function TerminalFrame({ label, children, className }: TerminalFrameProps) {
  return (
    <div className={`rounded-3xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 shadow-[0_0_0_1px_rgba(255,255,255,0.02),0_24px_80px_rgba(0,0,0,0.45)] ${className ?? ''}`}>
      <div className="mb-5 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-[var(--color-danger)]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[var(--color-warning)]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[var(--color-accent)]" />
        </div>
        <span className="font-mono text-[11px] uppercase tracking-[0.24em] text-[var(--color-text-subtle)]">{label}</span>
      </div>
      {children}
    </div>
  )
}
