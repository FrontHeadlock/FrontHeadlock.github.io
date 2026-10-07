import { AnimatePresence, m } from 'framer-motion'
import { useEffect, useRef } from 'react'
import { useRainPreference } from '../../shared/hooks/useRainPreference'
import { useLocale } from '../../shared/i18n/LocaleContext'
import { useStrings } from '../../shared/i18n/strings'
import { cn } from '../../shared/lib/cn'

type MobileNavProps = {
  open: boolean
  onClose: () => void
  sections: { id: string; label: string }[]
  activeSection: string
}

// 44px 이상 터치 영역을 보장하는 공통 항목 스타일.
const itemClass =
  'flex min-h-11 items-center rounded-inner border border-transparent px-4 py-3 text-sm text-[var(--color-text-muted)] transition hover:text-[var(--color-accent)]'
const toggleClass = 'justify-center font-mono text-label-sm uppercase tracking-label-tight'

function MobileNavPanel({ onClose, sections, activeSection }: Omit<MobileNavProps, 'open'>) {
  const { locale, toggleLocale } = useLocale()
  const { enabled: rainEnabled, toggle: toggleRain } = useRainPreference()
  const strings = useStrings()
  const firstLinkRef = useRef<HTMLAnchorElement | null>(null)

  useEffect(() => {
    const previouslyFocused = document.activeElement instanceof HTMLElement ? document.activeElement : null
    firstLinkRef.current?.focus()

    return () => previouslyFocused?.focus()
  }, [])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        onClose()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [onClose])

  return (
    <m.nav
      id="mobile-nav"
      aria-label="Mobile"
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      className="absolute inset-x-0 top-full border-t border-[rgba(255,255,255,0.06)] bg-[rgba(10,10,10,0.96)] px-5 py-4 md:hidden"
    >
      <div className="grid gap-2">
        {sections.map((section, index) => (
          <a
            key={section.id}
            ref={index === 0 ? firstLinkRef : undefined}
            href={`#${section.id}`}
            onClick={onClose}
            className={cn(
              itemClass,
              activeSection === section.id && 'border-[var(--color-border-strong)] bg-[rgba(0,255,65,0.08)] text-[var(--color-accent)]',
            )}
          >
            {section.label}
          </a>
        ))}

        {/* 데스크톱 헤더에만 있던 레인 토글을 모바일에서도 노출 — 폰에서 캔버스를 끌 수 있어야 한다. */}
        <div className="mt-1 grid grid-cols-2 gap-2 border-t border-[rgba(255,255,255,0.06)] pt-3">
          <button type="button" onClick={toggleLocale} aria-pressed={locale === 'ko'} className={cn(itemClass, toggleClass)}>
            {locale === 'ko' ? '[KO]' : '[EN]'}
          </button>
          <button
            type="button"
            onClick={toggleRain}
            aria-pressed={rainEnabled}
            className={cn(
              itemClass,
              toggleClass,
              rainEnabled && 'border-[var(--color-border)] bg-[rgba(0,255,65,0.06)] text-[var(--color-accent)]',
            )}
          >
            {rainEnabled ? strings.header.rainOn : strings.header.rainOff}
          </button>
        </div>
      </div>
    </m.nav>
  )
}

export function MobileNav({ open, onClose, sections, activeSection }: MobileNavProps) {
  return (
    <AnimatePresence>
      {open ? <MobileNavPanel onClose={onClose} sections={sections} activeSection={activeSection} /> : null}
    </AnimatePresence>
  )
}
