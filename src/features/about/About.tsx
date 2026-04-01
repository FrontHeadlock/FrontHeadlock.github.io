import { profile } from '../../entities/profile/data'
import { Reveal } from '../shared/ui/Reveal'
import { SectionHeading } from '../shared/ui/SectionHeading'
import { TerminalFrame } from '../shared/ui/TerminalFrame'

export function About() {
  return (
    <section id="about" aria-labelledby="about-title" className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-24">
      <Reveal>
        <div className="grid gap-8 xl:grid-cols-[0.95fr_1.05fr]">
          <SectionHeading
            id="about-title"
            eyebrow="About"
            title="운영 병목을 구조로 분리하고, 자동화로 되돌아오지 않게 만듭니다."
            description="장애 대응보다 먼저 구조를 정리하고, 수동 작업보다 먼저 재현 가능한 흐름을 설계하는 방식으로 문제를 해결합니다."
          />

          <TerminalFrame label="Problem Solving">
            <div className="space-y-5">
              {profile.aboutSummary.map((paragraph) => (
                <p key={paragraph} className="text-sm leading-7 text-[var(--color-text-main)] md:text-base">
                  {paragraph}
                </p>
              ))}
              <ul className="grid gap-3 pt-2">
                {profile.strengths.map((strength, index) => (
                  <li key={strength} className="flex gap-3 rounded-2xl border border-[var(--color-border)] px-4 py-3">
                    <span className="font-mono text-xs text-[var(--color-accent)]">{`0${index + 1}`}</span>
                    <span className="text-sm leading-6 text-[var(--color-text-muted)]">{strength}</span>
                  </li>
                ))}
              </ul>
            </div>
          </TerminalFrame>
        </div>
      </Reveal>
    </section>
  )
}
