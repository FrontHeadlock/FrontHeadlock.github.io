import type { TroubleShootingItem } from '../../entities/project/types'

type TroubleshootingAlertProps = {
  item: TroubleShootingItem
}

export function TroubleshootingAlert({ item }: TroubleshootingAlertProps) {
  return (
    <article className="rounded-2xl border border-[rgba(255,95,86,0.3)] bg-[rgba(255,95,86,0.06)] p-5">
      <div className="mb-4 flex items-center justify-between gap-3">
        <h4 className="font-semibold text-white">{item.title}</h4>
        <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-[#ff8c82]">System Alert</span>
      </div>
      <dl className="grid gap-4">
        <div>
          <dt className="font-mono text-xs uppercase tracking-[0.18em] text-[#ff8c82]">문제</dt>
          <dd className="mt-2 text-sm leading-7 text-[var(--color-text-main)]">{item.problem}</dd>
        </div>
        <div>
          <dt className="font-mono text-xs uppercase tracking-[0.18em] text-[#ff8c82]">원인 분석</dt>
          <dd className="mt-2 text-sm leading-7 text-[var(--color-text-main)]">{item.analysis}</dd>
        </div>
        <div>
          <dt className="font-mono text-xs uppercase tracking-[0.18em] text-[#ff8c82]">조치</dt>
          <dd className="mt-2 text-sm leading-7 text-[var(--color-text-main)]">{item.action}</dd>
        </div>
        <div>
          <dt className="font-mono text-xs uppercase tracking-[0.18em] text-[#ff8c82]">결과</dt>
          <dd className="mt-2 text-sm leading-7 text-[var(--color-text-main)]">{item.result}</dd>
        </div>
      </dl>
    </article>
  )
}
