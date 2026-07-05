import { useEffect, useMemo, useRef, useState } from 'react'
import { profileEn } from '../../entities/profile/data.en'

export type Command = {
  id: string
  label: string
  description?: string
  action: () => void
  shortcut?: string
}

const emailLink = profileEn.links.find((link) => link.kind === 'email')

const COMMANDS: Command[] = [
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
  ...(emailLink
    ? [
        {
          id: 'copy-email',
          label: 'Copy Email',
          description: 'Copy email address to clipboard',
          action: () => {
            navigator.clipboard.writeText(emailLink.value)
          },
          shortcut: 'c e',
        },
      ]
    : []),
]

export function useCommandPalette() {
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState('')
  const [selectedIndex, setSelectedIndex] = useState(0)

  const filtered = useMemo(
    () =>
      COMMANDS.filter(
        (cmd) => cmd.label.toLowerCase().includes(search.toLowerCase()) || cmd.description?.toLowerCase().includes(search.toLowerCase()),
      ),
    [search],
  )

  const latest = useRef({ open, filtered, selectedIndex })
  latest.current = { open, filtered, selectedIndex }

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const current = latest.current

      if ((e.metaKey || e.ctrlKey) && (e.key === 'k' || e.key === '`')) {
        e.preventDefault()
        setOpen((prev) => !prev)
        setSearch('')
        setSelectedIndex(0)
        return
      }

      if (!current.open) {
        return
      }

      if (e.key === 'Escape') {
        setOpen(false)
      } else if (e.key === 'ArrowDown') {
        e.preventDefault()
        setSelectedIndex(current.filtered.length > 0 ? (current.selectedIndex + 1) % current.filtered.length : 0)
      } else if (e.key === 'ArrowUp') {
        e.preventDefault()
        setSelectedIndex(current.filtered.length > 0 ? (current.selectedIndex - 1 + current.filtered.length) % current.filtered.length : 0)
      } else if (e.key === 'Enter') {
        e.preventDefault()
        current.filtered[current.selectedIndex]?.action()
        setOpen(false)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  return { open, setOpen, search, setSearch, selectedIndex, setSelectedIndex, filtered }
}
