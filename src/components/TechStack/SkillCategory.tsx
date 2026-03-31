import type { SkillCategory as SkillCategoryType } from '../../types/skill'
import { SkillMeter } from './SkillMeter'

type SkillCategoryProps = {
  category: SkillCategoryType
}

export function SkillCategory({ category }: SkillCategoryProps) {
  return (
    <article className="rounded-3xl border border-[var(--color-border)] bg-[rgba(255,255,255,0.02)] p-5">
      <div className="mb-5 flex items-center justify-between gap-3">
        <h3 className="text-lg font-semibold text-white">{category.name}</h3>
        <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--color-text-subtle)]">
          {category.items.length} items
        </span>
      </div>
      <div className="grid gap-3">
        {category.items.map((item) => (
          <SkillMeter key={`${category.name}-${item.name}`} item={item} />
        ))}
      </div>
    </article>
  )
}
