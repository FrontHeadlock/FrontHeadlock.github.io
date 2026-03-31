import { experience } from '../../data/experience'
import { Reveal } from '../shared/Reveal'
import { SectionHeading } from '../shared/SectionHeading'
import { TimelineEntry } from './TimelineEntry'

export function ExperienceTimeline() {
  return (
    <section id="experience" aria-labelledby="experience-title" className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-24">
      <Reveal>
        <div className="space-y-8">
          <SectionHeading
            id="experience-title"
            eyebrow="Experience"
            title="프로젝트와 운영 흐름을 로그처럼 읽을 수 있게 정리했습니다."
            description="제공된 날짜와 역할 정보만 사용해 실제 경험 항목을 정리했습니다. 기간 정보가 없는 항목은 순서 기반 로그처럼 표현합니다."
          />
          <div className="space-y-4">
            {experience.map((entry) => (
              <TimelineEntry key={`${entry.title}-${entry.dateLabel ?? entry.role}`} entry={entry} />
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  )
}
