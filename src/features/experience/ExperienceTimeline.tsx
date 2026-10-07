import { useExperience } from '../../entities/experience/useExperience'
import { useStrings } from '../../shared/i18n/strings'
import { Reveal } from '../../shared/ui/Reveal'
import { SectionHeading } from '../../shared/ui/SectionHeading'
import { TimelineEntry } from './TimelineEntry'

export function ExperienceTimeline() {
  const experience = useExperience()
  const strings = useStrings()

  return (
    <section
      id="experience"
      aria-labelledby="experience-title"
      className="mx-auto max-w-7xl px-5 py-12 md:px-8 md:py-24"
      style={{ contentVisibility: 'auto', containIntrinsicSize: 'auto 1200px' }}
    >
      <div className="space-y-8">
        <Reveal>
          <SectionHeading
            id="experience-title"
            eyebrow={strings.experience.eyebrow}
            title={strings.experience.title}
            description={strings.experience.description}
          />
        </Reveal>
        {/* 왼쪽 레일(흐린 기준선) 위로 각 항목이 노출될 때 액센트 구간이 차오르고 노드가 켜진다. */}
        <ol className="timeline relative flex flex-col gap-4 pl-8">
          <span aria-hidden="true" className="timeline-rail absolute bottom-3 left-[5px] top-3 w-px bg-[var(--color-border)]" />
          {experience.map((entry, index) => (
            <TimelineEntry
              key={`${entry.title}-${entry.dateLabel ?? entry.role}`}
              entry={entry}
              index={index}
              isFirst={index === 0}
              isLast={index === experience.length - 1}
            />
          ))}
        </ol>
      </div>
    </section>
  )
}
