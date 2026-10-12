import type { Profile } from './types'

export const profileEn: Profile = {
  name: 'KyuminPark',
  role: 'DevOps Engineer',
  affiliation: 'Telechips · Automotive SoC Development Infrastructure',
  heroSummary:
    'I am a DevOps engineer running the development infrastructure for automotive SoC teams, automating recurring operations and making resource state visible through metrics.',
  aboutSummary: [
    'I avoid temporary patches for recurring operational issues and focus on separating deployment flow and infrastructure ownership to prevent repeat incidents.',
    'I prioritize high-impact areas directly tied to service quality, such as cloud infrastructure design, reproducible delivery pipelines, and authentication flow optimization.',
  ],
  strengths: [
    'Ability to isolate and resolve operational bottlenecks structurally',
    'Strong capability in deployment automation and operations standardization',
    'Hands-on experience designing cloud infrastructure and reproducible deployment pipelines',
    'Deep troubleshooting capability from root cause tracing down to tool-level analysis',
  ],
  metrics: [
    {
      label: 'Repetitive Ops',
      value: '3h -> 30m',
      detail: 'Automated repetitive ITSM requests with an approval- and dry-run-gated AI agent, cutting average daily handling time',
    },
    {
      label: 'Volume Utilization',
      value: '15%',
      detail: 'Collected layered ONTAP capacity metrics and reclaimed idle thick volumes, improving utilization without expansion',
    },
    {
      label: 'Deployment Time',
      value: '30m -> 10m',
      detail: 'Automated a six-step manual deployment with Jenkins, AWX, and ALB Blue/Green',
    },
    {
      label: 'Auth Latency',
      value: '68ms -> 3ms',
      detail: 'Reissued tokens inside the filter chain, reducing three network round trips to one',
    },
  ],
  links: [
    {
      label: 'GitHub',
      href: 'https://github.com/FrontHeadlock',
      value: '@FrontHeadlock',
      kind: 'link',
    },
    {
      label: 'Blog',
      href: 'https://frontheadlock.tistory.com/',
      value: 'frontheadlock.tistory.com',
      kind: 'link',
    },
    {
      label: 'Email',
      href: 'mailto:southvi1@naver.com',
      value: 'southvi1@naver.com',
      kind: 'email',
    },
    {
      label: 'LinkedIn',
      href: 'https://linkedin.com/in/kyumin19/?skipRedirect=true',
      value: 'linkedin.com/in/kyumin19',
      kind: 'link',
    },
  ],
  deliveryMeta: ['React SPA', 'Static delivery ready', 'Deployment path configurable'],
}
