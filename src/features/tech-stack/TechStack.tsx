import { skillCategories } from '../../entities/skill/data'
import { Reveal } from '../../shared/ui/Reveal'
import { SectionHeading } from '../../shared/ui/SectionHeading'
import { SkillCategory } from './SkillCategory'

export function TechStack() {
  return (
    <section id="tech-stack" aria-labelledby="tech-stack-title" className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-24">
      <Reveal>
        <div className="space-y-8">
          <SectionHeading
            id="tech-stack-title"
            eyebrow="Tech Stack"
            title="Technologies are categorized by operational context, not listed in isolation."
            description="Cloud, CI/CD, containers, authentication, monitoring, and collaboration tools are grouped by delivery workflow."
          />
          <div className="grid gap-4 lg:grid-cols-2 xl:grid-cols-3">
            {skillCategories.map((category) => (
              <SkillCategory key={category.name} category={category} />
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  )
}
