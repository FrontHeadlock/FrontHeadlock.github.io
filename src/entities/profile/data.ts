import type { Profile } from './types'

export const profile: Profile = {
  nameKo: 'Kyumin Park',
  nameEn: 'KyuminPark',
  role: 'DevOps Engineer / Cloud & CI/CD Engineer',
  heroSummary: 'I am a DevOps engineer who solves deployment, authentication, and operations bottlenecks at the architecture level.',
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
      label: 'Deployment Time',
      value: '30m -> 10m',
      detail: 'Reduced release time by automating manual deployment procedures',
    },
    {
      label: 'Auth Latency',
      value: '68ms -> 3ms',
      detail: 'Cut authentication latency by redesigning the flow at filter-chain level',
    },
    {
      label: 'Network Round Trips',
      value: '3 -> 1',
      detail: 'Simplified token reissue into a no-disruption request path',
    },
    {
      label: 'Service Latency',
      value: 'about 30% down',
      detail: 'Reduced response delay by restructuring services and isolating latency zones',
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
