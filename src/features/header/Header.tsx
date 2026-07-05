import { Menu, X } from 'lucide-react'
import { useState } from 'react'
import { useActiveSection } from '../../shared/hooks/useActiveSection'
import { useRainPreference } from '../../shared/hooks/useRainPreference'
import { useLocale } from '../../shared/i18n/LocaleContext'
import { useStrings } from '../../shared/i18n/strings'
import { cn } from '../../shared/lib/cn'
import { MobileNav } from './MobileNav'

const SECTION_IDS = ['about', 'experience', 'projects']

export function Header() {
  const [mobileNavOpen, setMobileNavOpen] = useState(false)
  const activeSection = useActiveSection(SECTION_IDS)
  const { enabled: rainEnabled, toggle: toggleRain } = useRainPreference()
  const { locale, toggleLocale } = useLocale()
  const strings = useStrings()

  const sections = [
    { id: 'about', label: strings.nav.about },
    { id: 'experience', label: strings.nav.experience },
    { id: 'projects', label: strings.nav.projects },
  ]

  return (
    <header className="sticky top-0 z-40 border-b border-[rgba(255,255,255,0.06)] bg-[rgba(10,10,10,0.78)] backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 md:px-8">
        <div className="group flex items-center gap-3" aria-label="Resume status">
          <span className="relative flex h-2.5 w-2.5">
            <span
              aria-hidden="true"
              className="absolute inset-0 animate-ping rounded-full bg-[rgba(0,255,65,0.55)] [animation-duration:2.4s] motion-reduce:hidden"
            />
            <span className="relative h-2.5 w-2.5 rounded-full bg-[var(--color-accent)] shadow-[0_0_14px_rgba(0,255,65,0.95)] transition group-hover:scale-110" />
          </span>
          <span className="flex flex-col leading-none">
            <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--color-accent)]">resume.node</span>
            <span className="mt-1 font-mono text-[10px] uppercase tracking-[0.13em] text-[var(--color-text-muted)]">status online</span>
          </span>
        </div>

        <nav aria-label="Section" className="hidden items-center gap-1 md:flex">
          {sections.map((section) => (
            <a
              key={section.id}
              href={`#${section.id}`}
              className={cn(
                'rounded-full border border-transparent px-3 py-1.5 font-mono text-xs uppercase tracking-[0.12em] text-[var(--color-text-muted)] transition hover:text-[var(--color-accent)]',
                activeSection === section.id && 'border-[var(--color-border-strong)] bg-[rgba(0,255,65,0.08)] text-[var(--color-accent)]',
              )}
            >
              [{section.label.toLowerCase()}]
            </a>
          ))}
          <button
            type="button"
            onClick={toggleLocale}
            aria-pressed={locale === 'ko'}
            className="ml-2 rounded-full border border-[var(--color-border)] px-3 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-[var(--color-text-muted)] transition hover:text-[var(--color-accent)]"
          >
            {locale === 'ko' ? '[KO]' : '[EN]'}
          </button>
          <button
            type="button"
            onClick={toggleRain}
            aria-pressed={rainEnabled}
            className={cn(
              'rounded-full border px-3 py-1 font-mono text-[10px] uppercase tracking-[0.14em] transition',
              rainEnabled
                ? 'border-[var(--color-border)] bg-[rgba(0,255,65,0.06)] text-[var(--color-accent)]'
                : 'border-[var(--color-border)] text-[var(--color-text-muted)] hover:text-[var(--color-accent)]',
            )}
          >
            {rainEnabled ? 'live rain' : 'rain off'}
          </button>
        </nav>

        <button
          type="button"
          aria-label={mobileNavOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileNavOpen}
          aria-controls="mobile-nav"
          onClick={() => setMobileNavOpen((open) => !open)}
          className="text-[var(--color-text-main)] md:hidden"
        >
          {mobileNavOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      <MobileNav
        open={mobileNavOpen}
        onClose={() => setMobileNavOpen(false)}
        sections={sections}
        activeSection={activeSection}
      />
    </header>
  )
}
