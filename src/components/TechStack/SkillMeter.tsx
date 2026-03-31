import type { SkillItem } from '../../types/skill'

type SkillMeterProps = {
  item: SkillItem
}

export function SkillMeter({ item }: SkillMeterProps) {
  return (
    <div className="group rounded-2xl border border-[var(--color-border)] bg-[rgba(255,255,255,0.02)] px-4 py-3 transition duration-300 hover:border-[var(--color-border-strong)] hover:bg-[rgba(0,255,65,0.05)] hover:shadow-[0_0_30px_rgba(0,255,65,0.08)]">
      <div className="flex items-center justify-between gap-4">
        <span className="text-sm font-medium text-[var(--color-text-main)]">{item.name}</span>
        <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--color-accent)]">{item.levelLabel}</span>
      </div>
      <div className="mt-3 h-1.5 rounded-full bg-[rgba(255,255,255,0.08)]">
        <div className="h-full w-[72%] rounded-full bg-[linear-gradient(90deg,rgba(0,255,65,0.22),rgba(0,255,65,0.92))]" />
      </div>
    </div>
  )
}
