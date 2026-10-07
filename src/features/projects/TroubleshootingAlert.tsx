import type { TroubleShootingItem } from '../../entities/project/types'
import { useStrings } from '../../shared/i18n/strings'

type TroubleshootingAlertProps = {
  item: TroubleShootingItem
}

export function TroubleshootingAlert({ item }: TroubleshootingAlertProps) {
  const strings = useStrings()
  return (
    <article className="rounded-inner border border-[var(--color-danger-border)] bg-[var(--color-danger-bg)] p-5">
      <div className="mb-4 flex items-center justify-between gap-3">
        <h4 className="font-semibold text-white">{item.title}</h4>
        <span className="font-mono text-label-sm uppercase tracking-label text-[var(--color-danger-soft)]">{strings.troubleshooting.badge}</span>
      </div>
      <dl className="grid gap-4">
        <div>
          <dt className="font-mono text-label uppercase tracking-label text-[var(--color-danger-soft)]">{strings.troubleshooting.problem}</dt>
          <dd className="mt-2 text-sm leading-7 text-[var(--color-text-main)]">{item.problem}</dd>
        </div>
        <div>
          <dt className="font-mono text-label uppercase tracking-label text-[var(--color-danger-soft)]">{strings.troubleshooting.rootCause}</dt>
          <dd className="mt-2 text-sm leading-7 text-[var(--color-text-main)]">{item.analysis}</dd>
        </div>
        <div>
          <dt className="font-mono text-label uppercase tracking-label text-[var(--color-danger-soft)]">{strings.troubleshooting.action}</dt>
          <dd className="mt-2 text-sm leading-7 text-[var(--color-text-main)]">{item.action}</dd>
        </div>
        <div>
          <dt className="font-mono text-label uppercase tracking-label text-[var(--color-danger-soft)]">{strings.troubleshooting.result}</dt>
          <dd className="mt-2 text-sm leading-7 text-[var(--color-text-main)]">{item.result}</dd>
        </div>
      </dl>
    </article>
  )
}
