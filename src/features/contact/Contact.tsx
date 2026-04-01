import { ServerCog } from 'lucide-react'
import { profile } from '../../entities/profile/data'
import { HeroLinks } from '../hero/HeroLinks'
import { Reveal } from '../shared/ui/Reveal'
import { SectionHeading } from '../shared/ui/SectionHeading'
import { TerminalFrame } from '../shared/ui/TerminalFrame'

export function Contact() {
  return (
    <section id="contact" aria-labelledby="contact-title" className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-24">
      <Reveal>
        <div className="grid gap-8 xl:grid-cols-[0.95fr_1.05fr]">
          <SectionHeading
            id="contact-title"
            eyebrow="Contact"
            title="핵심 정보와 운영 결과를 빠르게 검토할 수 있는 포트폴리오로 구성했습니다."
            description="연락처는 실제 값만 사용했고, 이력서 PDF는 아직 연결하지 않았습니다."
          />
          <div className="space-y-5">
            <HeroLinks links={profile.links} />
            <TerminalFrame label="Portfolio Delivery">
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-[var(--color-text-main)]">
                  <ServerCog size={18} className="text-[var(--color-accent)]" />
                  <p className="font-medium">이 포트폴리오의 인프라 구성</p>
                </div>
                <ul className="grid gap-2">
                  {profile.deliveryMeta.map((item) => (
                    <li key={item} className="font-mono text-xs uppercase tracking-[0.2em] text-[var(--color-text-subtle)]">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </TerminalFrame>
          </div>
        </div>
      </Reveal>
    </section>
  )
}
