import { AnimatePresence, motion } from 'framer-motion'
import { cn } from '../../shared/lib/cn'

type MobileNavProps = {
  open: boolean
  onClose: () => void
  sections: { id: string; label: string }[]
  activeSection: string
}

export function MobileNav({ open, onClose, sections, activeSection }: MobileNavProps) {
  return (
    <AnimatePresence>
      {open ? (
        <motion.nav
          id="mobile-nav"
          aria-label="Mobile"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="border-t border-[rgba(255,255,255,0.06)] bg-[rgba(10,10,10,0.96)] px-5 py-4 md:hidden"
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
          </div>
        </motion.nav>
      ) : null}
    </AnimatePresence>
  )
}
