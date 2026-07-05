import { useProfile } from '../../entities/profile/useProfile'
import { useStrings } from '../../shared/i18n/strings'

export function Footer() {
  const profile = useProfile()
  const strings = useStrings()
  const emailLink = profile.links.find((link) => link.kind === 'email')

  return (
    <footer className="border-t border-[rgba(255,255,255,0.06)] px-5 py-8 md:px-8">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-4 text-center">
        <p className="font-mono text-xs text-[var(--color-text-subtle)]">
          {strings.footer.sessionClosed}
          {emailLink ? (
            <>
              {strings.footer.reachMeAt}
              <a href={emailLink.href} className="text-[var(--color-accent)] hover:underline">
                {emailLink.value}
              </a>
            </>
          ) : null}
        </p>
        <a
          href="#main-content"
          className="font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--color-text-subtle)] transition hover:text-[var(--color-accent)]"
        >
          {strings.footer.backToTop}
        </a>
      </div>
    </footer>
  )
}
