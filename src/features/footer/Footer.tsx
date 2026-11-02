import { useStrings } from '../../shared/i18n/strings'

/** 푸터는 "맨 위로" 링크 하나만 둔다. 연락처는 히어로의 링크로 충분해 2026-11-02에 뺐다. */
export function Footer() {
  const strings = useStrings()

  return (
    <footer className="border-t border-[var(--color-hairline)] px-5 py-8 md:px-8">
      <div className="mx-auto flex max-w-7xl flex-col items-center text-center">
        <a
          href="#main-content"
          className="font-mono text-label-sm uppercase tracking-label text-[var(--color-text-subtle)] transition hover:text-[var(--color-accent)]"
        >
          {strings.footer.backToTop}
        </a>
      </div>
    </footer>
  )
}
