import type { TroubleShootingItem } from '../../entities/project/types'

type TroubleshootingAlertProps = {
  item: TroubleShootingItem
}

export function TroubleshootingAlert({ item }: TroubleshootingAlertProps) {
  return (
    <article className="rounded-2xl border border-[var(--color-danger-border)] bg-[var(--color-danger-bg)] p-5">
      <div className="mb-4 flex items-center justify-between gap-3">
        <h4 className="font-semibold text-white">{item.title}</h4>
        <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--color-danger-soft)]">System Alert</span>
      </div>
      <dl className="grid gap-4">
        <div>
          <dt className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--color-danger-soft)]">Problem</dt>
          <dd className="mt-2 text-sm leading-7 text-[var(--color-text-main)]">{item.problem}</dd>
        </div>
        <div>
          <dt className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--color-danger-soft)]">Root Cause</dt>
          <dd className="mt-2 text-sm leading-7 text-[var(--color-text-main)]">{item.analysis}</dd>
        </div>
        <div>
          <dt className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--color-danger-soft)]">Action</dt>
          <dd className="mt-2 text-sm leading-7 text-[var(--color-text-main)]">{item.action}</dd>
        </div>
        <div>
          <dt className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--color-danger-soft)]">Result</dt>
          <dd className="mt-2 text-sm leading-7 text-[var(--color-text-main)]">{item.result}</dd>
        </div>
      </dl>
    </article>
  )
}
