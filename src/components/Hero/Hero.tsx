import { profile } from '../../data/profile'
import { Reveal } from '../shared/Reveal'
import { TerminalFrame } from '../shared/TerminalFrame'
import { AsciiHero } from './AsciiHero'
import { HeroLinks } from './HeroLinks'
import { MetricGrid } from './MetricGrid'

export function Hero() {
  return (
    <section
      id="home"
      className="mx-auto grid max-w-7xl gap-8 px-5 pb-16 pt-12 md:px-8 md:pb-24 md:pt-20 xl:grid-cols-[1.15fr_0.85fr] xl:items-end"
    >
      <Reveal>
        <div className="flex flex-col gap-6 xl:min-h-[33rem] xl:justify-between">
          <div data-testid="hero-copy" className="space-y-3 md:space-y-4">
            <AsciiHero text={profile.nameEn} className="max-w-4xl" />
            <p className="max-w-2xl text-base leading-7 text-[var(--color-text-muted)] md:text-lg md:leading-8">{profile.heroSummary}</p>
          </div>
          <div className="space-y-5 xl:pt-2">
            <HeroLinks links={profile.links} />
          </div>
        </div>
      </Reveal>

      <Reveal delay={0.08}>
        <TerminalFrame label="Operational Metrics" className="xl:mb-2">
          <div className="space-y-4">
            <div className="space-y-1.5">
              <p className="font-mono text-xs uppercase tracking-[0.24em] text-[var(--color-text-subtle)]">Core Results</p>
              <p className="text-sm leading-6 text-[var(--color-text-muted)]">
                배포, 인증, 서비스 지연 구간에서 실제 수치로 개선 결과를 남긴 프로젝트를 중심으로 포트폴리오를 구성했습니다.
              </p>
            </div>
            <MetricGrid metrics={profile.metrics} />
          </div>
        </TerminalFrame>
      </Reveal>
    </section>
  )
}
