import { useExperience } from '../../entities/experience/useExperience'
import { useStrings } from '../../shared/i18n/strings'
import { staggerDelay } from '../../shared/lib/motion'
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
        <div className="space-y-4">
          {experience.map((entry, index) => (
            <Reveal key={`${entry.title}-${entry.dateLabel ?? entry.role}`} delay={staggerDelay(index)}>
              <TimelineEntry entry={entry} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
