import { useEffect, useRef } from 'react'
import type { Command } from '../hooks/useCommandPalette'
import { useStrings } from '../i18n/strings'
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
  const strings = useStrings()
  const panelRef = useRef<HTMLDivElement | null>(null)
  const selectedRef = useRef<HTMLButtonElement | null>(null)

  useEffect(() => {
    const previouslyFocused = document.activeElement instanceof HTMLElement ? document.activeElement : null

    return () => previouslyFocused?.focus()
  }, [])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') {
        return
      }

      const panel = panelRef.current
      if (!panel) {
        return
      }

      const focusables = panel.querySelectorAll<HTMLElement>('input, button')
      if (focusables.length === 0) {
        return
      }

      const first = focusables[0]
      const last = focusables[focusables.length - 1]

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  useEffect(() => {
    selectedRef.current?.scrollIntoView({ block: 'nearest' })
  }, [selectedIndex])

  const activeCommand = commands[selectedIndex]

  return (
    <>
      <div className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm" onClick={onClose} aria-hidden="true" />
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label={strings.palette.dialogLabel}
        className="fixed left-1/2 top-1/2 z-50 w-full max-w-lg -translate-x-1/2 -translate-y-1/2 rounded-lg border border-[var(--color-border-strong)] bg-[var(--color-surface-strong)] shadow-lg"
      >
        <div className="border-b border-[var(--color-border)] px-4 py-3">
          <input
            type="text"
            role="combobox"
            aria-expanded="true"
            aria-controls="command-palette-listbox"
            aria-activedescendant={activeCommand ? `command-option-${activeCommand.id}` : undefined}
            aria-label={strings.palette.dialogLabel}
            placeholder={strings.palette.placeholder}
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full bg-transparent font-mono text-sm text-[var(--color-text-main)] placeholder:text-[var(--color-text-muted)] outline-none"
            autoFocus
          />
        </div>

        <div id="command-palette-listbox" role="listbox" aria-label={strings.palette.dialogLabel} className="max-h-64 overflow-y-auto">
          {commands.length === 0 ? (
            <div className="px-4 py-8 text-center text-sm text-[var(--color-text-muted)]">{strings.palette.noResults}</div>
          ) : (
            commands.map((cmd, idx) => (
              <button
                key={cmd.id}
                ref={idx === selectedIndex ? selectedRef : undefined}
                id={`command-option-${cmd.id}`}
                type="button"
                role="option"
                aria-selected={idx === selectedIndex}
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
            <span>{strings.palette.hintToggle}</span>
            <span>{strings.palette.hintNavigate}</span>
          </div>
        </div>
      </div>
    </>
  )
}
