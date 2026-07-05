import type { Command } from '../hooks/useCommandPalette'
import { cn } from '../lib/cn'

type CommandPaletteProps = {
  onClose: () => void
  search: string
  onSearchChange: (value: string) => void
  selectedIndex: number
  commands: Command[]
  onSelect: (command: Command) => void
}

export function CommandPalette({ onClose, search, onSearchChange, selectedIndex, commands, onSelect }: CommandPaletteProps) {
  return (
    <>
      <div className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm" onClick={onClose} aria-hidden="true" />
      <div className="fixed left-1/2 top-1/2 z-50 w-full max-w-lg -translate-x-1/2 -translate-y-1/2 rounded-lg border border-[var(--color-border-strong)] bg-[var(--color-surface-strong)] shadow-lg">
        <div className="border-b border-[var(--color-border)] px-4 py-3">
          <input
            type="text"
            placeholder="Type a command or search..."
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full bg-transparent font-mono text-sm text-[var(--color-text-main)] placeholder:text-[var(--color-text-muted)] outline-none"
            autoFocus
          />
        </div>

        <div className="max-h-64 overflow-y-auto">
          {commands.length === 0 ? (
            <div className="px-4 py-8 text-center text-sm text-[var(--color-text-muted)]">No commands found</div>
          ) : (
            commands.map((cmd, idx) => (
              <button
                key={cmd.id}
                type="button"
                onClick={() => onSelect(cmd)}
                className={cn(
                  'w-full border-b border-[var(--color-border)] px-4 py-3 text-left transition',
                  idx === selectedIndex ? 'bg-[rgba(0,255,65,0.12)] text-[var(--color-accent)]' : 'text-[var(--color-text-main)] hover:bg-[rgba(0,255,65,0.06)]',
                )}
              >
                <div className="flex items-center justify-between">
                  <div className="flex flex-col gap-1">
                    <div className="font-mono text-sm">{cmd.label}</div>
                    {cmd.description && <div className="text-xs text-[var(--color-text-muted)]">{cmd.description}</div>}
                  </div>
                  {cmd.shortcut && <div className="font-mono text-[10px] text-[var(--color-text-subtle)]">{cmd.shortcut}</div>}
                </div>
              </button>
            ))
          )}
        </div>

        <div className="border-t border-[var(--color-border)] px-4 py-2 text-[10px] text-[var(--color-text-subtle)]">
          <div className="flex justify-between">
            <span>Cmd+K or Cmd+` to toggle</span>
            <span>↑↓ to navigate, Enter to select, Esc to close</span>
          </div>
        </div>
      </div>
    </>
  )
}
