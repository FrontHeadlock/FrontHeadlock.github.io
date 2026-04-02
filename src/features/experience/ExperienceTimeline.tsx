import { experience } from '../../entities/experience/data'
import { Reveal } from '../../shared/ui/Reveal'
import { SectionHeading } from '../../shared/ui/SectionHeading'
import { TimelineEntry } from './TimelineEntry'

export function ExperienceTimeline() {
  return (
    <section id="experience" aria-labelledby="experience-title" className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-24">
      <Reveal>
        <div className="space-y-8">
          <SectionHeading
            id="experience-title"
            eyebrow="Experience"
            title="Project and operations flow are organized so they read like a log."
            description="Experience entries are structured using provided date and role data. Items without period metadata are shown in sequence-log order."
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
