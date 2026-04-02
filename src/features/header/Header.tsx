export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-[rgba(255,255,255,0.06)] bg-[rgba(10,10,10,0.78)] backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 md:px-8">
        <div className="group flex items-center gap-3" aria-label="Resume status">
          <span className="h-2.5 w-2.5 rounded-full bg-[var(--color-accent)] shadow-[0_0_14px_rgba(0,255,65,0.95)] transition group-hover:scale-110" />
          <span className="flex flex-col leading-none">
            <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--color-accent)]">resume.node</span>
            <span className="mt-1 font-mono text-[10px] uppercase tracking-[0.13em] text-[var(--color-text-muted)]">status online</span>
          </span>
        </div>

        <div className="hidden items-center gap-2 md:flex">
          <span className="rounded-full border border-[var(--color-border)] bg-[rgba(0,255,65,0.06)] px-3 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-[var(--color-accent)]">
            live rain
          </span>
          <span className="rounded-full border border-[var(--color-border)] px-3 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-[var(--color-text-muted)]">
            stream 60hz
          </span>
        </div>
      </div>
    </header>
  )
}
