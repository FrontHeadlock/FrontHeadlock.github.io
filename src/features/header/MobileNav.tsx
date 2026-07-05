import { AnimatePresence, m } from 'framer-motion'
import { useLocale } from '../../shared/i18n/LocaleContext'
import { cn } from '../../shared/lib/cn'

type MobileNavProps = {
  open: boolean
  onClose: () => void
  sections: { id: string; label: string }[]
  activeSection: string
}

export function MobileNav({ open, onClose, sections, activeSection }: MobileNavProps) {
  const { locale, toggleLocale } = useLocale()

  return (
    <AnimatePresence>
      {open ? (
        <m.nav
          id="mobile-nav"
          aria-label="Mobile"
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          className="absolute inset-x-0 top-full border-t border-[rgba(255,255,255,0.06)] bg-[rgba(10,10,10,0.96)] px-5 py-4 md:hidden"
        >
          <div className="grid gap-2">
            {sections.map((section) => (
              <a
                key={section.id}
                href={`#${section.id}`}
                onClick={onClose}
                className={cn(
                  'rounded-2xl border border-transparent px-4 py-3 text-sm text-[var(--color-text-muted)]',
                  activeSection === section.id && 'border-[var(--color-border-strong)] bg-[rgba(0,255,65,0.08)] text-[var(--color-accent)]',
                )}
              >
                {section.label}
              </a>
            ))}
            <button
              type="button"
              onClick={toggleLocale}
              aria-pressed={locale === 'ko'}
              className="rounded-2xl border border-transparent px-4 py-3 text-left text-sm text-[var(--color-text-muted)] hover:text-[var(--color-accent)]"
            >
              {locale === 'ko' ? '[KO]' : '[EN]'}
            </button>
          </div>
        </m.nav>
      ) : null}
    </AnimatePresence>
  )
}
