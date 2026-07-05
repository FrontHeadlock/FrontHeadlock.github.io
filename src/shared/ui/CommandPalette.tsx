import { useEffect, useState } from 'react'
import { cn } from '../lib/cn'

type Command = {
  id: string
  label: string
  description?: string
  action: () => void
  shortcut?: string
}

export function useCommandPalette() {
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState('')
  const [selectedIndex, setSelectedIndex] = useState(0)

  const commands: Command[] = [
    {
      id: 'goto-home',
      label: 'Go to Home',
      description: 'Navigate to the top of the page',
      action: () => document.getElementById('main-content')?.scrollIntoView({ behavior: 'smooth' }),
      shortcut: 'g h',
    },
    {
      id: 'goto-about',
      label: 'Go to About',
      description: 'Jump to the About section',
      action: () => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' }),
      shortcut: 'g a',
    },
    {
      id: 'goto-experience',
      label: 'Go to Experience',
      description: 'Jump to the Experience section',
      action: () => document.getElementById('experience')?.scrollIntoView({ behavior: 'smooth' }),
      shortcut: 'g e',
    },
    {
      id: 'goto-projects',
      label: 'Go to Projects',
      description: 'Jump to the Projects section',
      action: () => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' }),
      shortcut: 'g p',
    },
    {
      id: 'goto-contact',
      label: 'Go to Contact',
      description: 'Jump to the Contact section',
      action: () => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }),
      shortcut: 'g c',
    },
    {
      id: 'toggle-rain',
      label: 'Toggle Rain',
      description: 'Turn the matrix rain animation on or off',
      action: () => document.querySelector('button[aria-pressed]')?.dispatchEvent(new MouseEvent('click', { bubbles: true })),
      shortcut: 't r',
    },
    {
      id: 'copy-email',
      label: 'Copy Email',
      description: 'Copy email address to clipboard',
      action: () => {
        const email = 'southvi1@naver.com'
        navigator.clipboard.writeText(email)
      },
      shortcut: 'c e',
    },
  ]

  const filtered = commands.filter((cmd) => cmd.label.toLowerCase().includes(search.toLowerCase()) || cmd.description?.toLowerCase().includes(search.toLowerCase()))

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setOpen(!open)
        setSearch('')
        setSelectedIndex(0)
      }

      if ((e.metaKey || e.ctrlKey) && e.key === '`') {
        e.preventDefault()
        setOpen(!open)
        setSearch('')
        setSelectedIndex(0)
      }

      if (open) {
        if (e.key === 'Escape') {
          setOpen(false)
        } else if (e.key === 'ArrowDown') {
          e.preventDefault()
          setSelectedIndex((prev) => (prev + 1) % filtered.length)
        } else if (e.key === 'ArrowUp') {
          e.preventDefault()
          setSelectedIndex((prev) => (prev - 1 + filtered.length) % filtered.length)
        } else if (e.key === 'Enter') {
          e.preventDefault()
          filtered[selectedIndex]?.action()
          setOpen(false)
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [open, search, selectedIndex, filtered])

  return { open, setOpen, search, setSearch, selectedIndex, setSelectedIndex, filtered }
}

type CommandPaletteProps = {
  open: boolean
  onClose: () => void
  search: string
  onSearchChange: (value: string) => void
  selectedIndex: number
  commands: Command[]
  onSelect: (command: Command) => void
}

export function CommandPalette({ open, onClose, search, onSearchChange, selectedIndex, commands, onSelect }: CommandPaletteProps) {
  if (!open) return null

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
                onClick={() => {
                  cmd.action()
                  onClose()
                }}
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
