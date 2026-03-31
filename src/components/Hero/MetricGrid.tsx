import type { ProfileMetric } from '../../types/profile'
import { MetricCard } from './MetricCard'

type MetricGridProps = {
  metrics: ProfileMetric[]
}

export function MetricGrid({ metrics }: MetricGridProps) {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {metrics.map((metric, index) => (
        <MetricCard
          key={metric.label}
          metric={metric}
          index={index}
          isLead={index === 0}
        />
      ))}
    </div>
  )
}
