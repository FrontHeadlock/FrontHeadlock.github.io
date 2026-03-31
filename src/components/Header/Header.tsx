import { Menu } from 'lucide-react'
import { useMemo, useState } from 'react'
import { cn } from '../../lib/cn'
import { useActiveSection } from '../../hooks/useActiveSection'
import { MobileNav } from './MobileNav'

const sections = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
]

export function Header() {
  const [open, setOpen] = useState(false)
  const activeSection = useActiveSection(useMemo(() => sections.map((section) => section.id), []))

  return (
    <header className="sticky top-0 z-40 border-b border-[rgba(255,255,255,0.06)] bg-[rgba(10,10,10,0.78)] backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 md:px-8">
        <a href="#home" className="font-mono text-sm uppercase tracking-[0.24em] text-[var(--color-accent)]">
          kyumin.log
        </a>

        <nav aria-label="Primary" className="hidden items-center gap-1 rounded-full border border-[var(--color-border)] bg-[rgba(255,255,255,0.02)] p-1 md:flex">
          {sections.map((section) => (
            <a
              key={section.id}
              href={`#${section.id}`}
              className={cn(
                'rounded-full px-4 py-2 text-sm text-[var(--color-text-muted)] transition',
                activeSection === section.id && 'bg-[rgba(0,255,65,0.1)] font-medium text-[var(--color-accent)]',
              )}
            >
              {section.label}
            </a>
          ))}
        </nav>

        <button
          type="button"
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[var(--color-border)] text-[var(--color-text-main)] md:hidden"
          onClick={() => setOpen((value) => !value)}
          aria-label="메뉴 열기"
          aria-expanded={open}
          aria-controls="mobile-nav"
        >
          <Menu size={18} />
        </button>
      </div>
      <MobileNav open={open} onClose={() => setOpen(false)} sections={sections} activeSection={activeSection} />
    </header>
  )
}
