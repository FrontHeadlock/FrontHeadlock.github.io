import { useEffect, useMemo, useRef, useState } from 'react'
import { useProfile } from '../../entities/profile/useProfile'
import { useStrings } from '../i18n/strings'
import { useRainPreference } from './useRainPreference'

export type Command = {
  id: string
  label: string
  description?: string
  action: () => void
  shortcut?: string
}

function scrollToSection(id: string) {
  const behavior: ScrollBehavior = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth'
  document.getElementById(id)?.scrollIntoView({ behavior })
}

export function useCommandPalette() {
  const strings = useStrings()
  const profile = useProfile()
  const { toggle: toggleRain } = useRainPreference()
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState('')
  const [selectedIndex, setSelectedIndex] = useState(0)

  const commands = useMemo<Command[]>(() => {
    const labels = strings.palette.commands
    const emailLink = profile.links.find((link) => link.kind === 'email')

    return [
      { id: 'goto-home', ...labels.home, action: () => scrollToSection('main-content'), shortcut: 'g h' },
      { id: 'goto-about', ...labels.about, action: () => scrollToSection('about'), shortcut: 'g a' },
      { id: 'goto-experience', ...labels.experience, action: () => scrollToSection('experience'), shortcut: 'g e' },
      { id: 'goto-projects', ...labels.projects, action: () => scrollToSection('projects'), shortcut: 'g p' },
      { id: 'goto-contact', ...labels.contact, action: () => scrollToSection('contact'), shortcut: 'g c' },
      { id: 'toggle-rain', ...labels.rain, action: toggleRain, shortcut: 't r' },
      ...(emailLink
        ? [
            {
              id: 'copy-email',
              ...labels.email,
              action: () => {
                navigator.clipboard.writeText(emailLink.value)
              },
              shortcut: 'c e',
            },
          ]
        : []),
    ]
  }, [strings, profile, toggleRain])

  const filtered = useMemo(
    () =>
      commands.filter(
        (cmd) => cmd.label.toLowerCase().includes(search.toLowerCase()) || cmd.description?.toLowerCase().includes(search.toLowerCase()),
      ),
    [commands, search],
  )

  const latest = useRef({ open, filtered, selectedIndex })

  useEffect(() => {
    latest.current = { open, filtered, selectedIndex }
  })

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
