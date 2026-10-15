import { useProfile } from '../../entities/profile/useProfile'
import { useThemePreference } from '../../shared/hooks/useThemePreference'
import { useStrings } from '../../shared/i18n/strings'
import { Reveal } from '../../shared/ui/Reveal'
import { TerminalFrame } from '../../shared/ui/TerminalFrame'
import { AsciiHero } from './AsciiHero'
import { HeroLinks } from './HeroLinks'
import { MetricGrid } from './MetricGrid'

const HERO_NAME = 'KyuminPark'

export function Hero() {
  const profile = useProfile()
  const strings = useStrings()
  const { theme } = useThemePreference()
  const light = theme === 'light'

  return (
    <section id="home" className="theme-band">
      <div className="mx-auto grid max-w-7xl gap-8 px-5 pb-16 pt-12 md:px-8 md:pb-24 md:pt-20 xl:grid-cols-[1.15fr_0.85fr] xl:items-start">
        <Reveal>
          <div className="flex flex-col gap-8 xl:min-h-[33rem] xl:justify-between">
            <div data-testid="hero-copy" className="space-y-3 md:space-y-4">
              {light ? (
                <>
                  {/* 라이트(도안 N1+): 직함 | 회사 ● 재직중 → 굵은 이름 → 소속 줄 → 한 줄 소개 */}
                  <p className="flex flex-wrap items-center gap-3">
                    <span className="text-[15px] font-bold text-[var(--color-accent)]">{profile.role}</span>
                    <span aria-hidden="true" className="h-3.5 w-px bg-[var(--color-border)]" />
                    <span className="text-[15px] font-medium text-[var(--color-text-muted)]">{profile.company}</span>
                    <span className="inline-flex h-[26px] items-center gap-1.5 rounded-full border border-[var(--color-border)] bg-[var(--color-hairline-soft)] pl-2 pr-2.5 text-[13px] font-medium text-[var(--color-text-strong)]">
                      <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-[var(--color-status)] shadow-[0_0_0_3px_var(--color-accent-glow-soft)]" />
                      {profile.employmentStatus}
                    </span>
                  </p>
                  <AsciiHero variant="static" text={HERO_NAME} srOnlyText={profile.name} />
                  <p className="text-[15px] text-[var(--color-text-subtle)]">{profile.affiliation}</p>
                </>
              ) : (
                <>
                  <AsciiHero text={HERO_NAME} srOnlyText={profile.name} className="-mt-8 max-w-4xl md:-mt-10" />
                  {/* 직함 · 소속 한 줄: 직함은 터미널 라벨 톤, 소속은 본문 톤으로 구분한다. */}
                  <p className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                    <span className="font-mono text-label uppercase tracking-label text-[var(--color-accent)]">{profile.role}</span>
                    <span className="text-sm text-[var(--color-text-subtle)]">{profile.affiliation}</span>
                  </p>
                </>
              )}
              <p className="max-w-2xl text-base leading-7 text-[var(--color-text-muted)] md:text-lg md:leading-8">{profile.heroSummary}</p>
            </div>
            <div className="space-y-5 xl:pt-2">
              <HeroLinks links={profile.links} variant={light ? 'tile' : 'terminal'} />
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          {light ? (
            // 라이트: 네이비 위 반투명 카드. 제목·부제·배지 → 설명 → 지표 타일 2×2
            <div className="rounded-card border border-[var(--color-border)] bg-[var(--color-panel-translucent)] p-6 xl:mb-2">
              <div className="space-y-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="space-y-0.5">
                    <p className="text-[17px] font-bold text-[var(--color-text-strong)]">{strings.hero.coreResults}</p>
                    <p className="text-[13px] text-[var(--color-text-subtle)]">
                      {strings.hero.metricsLabel} · {strings.hero.metricsBasis}
                    </p>
                  </div>
                  <span className="inline-flex h-[22px] shrink-0 items-center rounded-md bg-[var(--color-accent-tint-2)] px-1.5 text-xs font-bold text-[var(--color-text-strong)]">
                    {strings.hero.metricsCount.replace('{count}', String(profile.metrics.length))}
                  </span>
                </div>
                <p className="text-[15px] leading-6 text-[var(--color-text-muted)]">{strings.hero.coreResultsDescription}</p>
                <MetricGrid metrics={profile.metrics} />
              </div>
            </div>
          ) : (
            <TerminalFrame label={strings.hero.metricsLabel} className="xl:mb-2">
              <div className="space-y-4">
                <div className="space-y-1.5">
                  <p className="font-mono text-label uppercase tracking-label text-[var(--color-text-subtle)]">{strings.hero.coreResults}</p>
                  <p className="text-sm leading-6 text-[var(--color-text-muted)]">{strings.hero.coreResultsDescription}</p>
                </div>
                <MetricGrid metrics={profile.metrics} />
              </div>
            </TerminalFrame>
          )}
        </Reveal>
      </div>
    </section>
  )
}
