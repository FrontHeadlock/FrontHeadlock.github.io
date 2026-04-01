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
            title="기술은 나열하지 않고 운영 맥락 안에서 분류했습니다."
            description="클라우드, CI/CD, 컨테이너, 인증, 모니터링, 협업 도구를 운영 흐름 기준으로 묶었습니다."
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
