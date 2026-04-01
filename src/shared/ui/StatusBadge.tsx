type StatusBadgeProps = {
  label: string
}

export function StatusBadge({ label }: StatusBadgeProps) {
  return (
    <span className="inline-flex items-center rounded-full border border-[var(--color-border-strong)] bg-[rgba(0,255,65,0.08)] px-3 py-1 font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--color-accent)]">
      {label}
    </span>
  )
}
