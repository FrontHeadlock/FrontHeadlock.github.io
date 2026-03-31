import type { SkillCategory } from '../types/skill'

export const skillCategories: SkillCategory[] = [
  {
    name: 'Cloud',
    items: [
      { name: 'AWS', levelLabel: 'Architecture' },
      { name: 'ALB', levelLabel: 'Traffic' },
      { name: 'Bastion Host', levelLabel: 'Access' },
      { name: 'NAT Gateway', levelLabel: 'Routing' },
    ],
  },
  {
    name: 'CI/CD',
    items: [
      { name: 'Jenkins', levelLabel: 'Pipeline' },
      { name: 'AWX', levelLabel: 'Deploy' },
      { name: 'Docker Compose', levelLabel: 'Release' },
    ],
  },
  {
    name: 'Container / Orchestration',
    items: [
      { name: 'Docker', levelLabel: 'Runtime' },
      { name: 'Kubernetes', levelLabel: 'Ops' },
    ],
  },
  {
    name: 'Backend / Auth',
    items: [
      { name: 'Spring Security', levelLabel: 'Auth Flow' },
      { name: 'JWT', levelLabel: 'Token' },
      { name: 'Redis', levelLabel: 'Session' },
      { name: 'OAuth2', levelLabel: 'Identity' },
      { name: 'Django', levelLabel: 'Service' },
    ],
  },
  {
    name: 'Monitoring',
    items: [
      { name: 'Prometheus', levelLabel: 'Metrics' },
      { name: 'Grafana', levelLabel: 'Observability' },
    ],
  },
  {
    name: 'Collaboration / Ops',
    items: [
      { name: 'Git', levelLabel: 'Source' },
      { name: 'Jira', levelLabel: 'Tracking' },
      { name: 'Confluence', levelLabel: 'Docs' },
      { name: 'Slack', levelLabel: 'Alerting' },
    ],
  },
]
