import type { Profile } from './types'

export const profile: Profile = {
  nameKo: '박규민',
  nameEn: 'KyuminPark',
  role: 'DevOps Engineer / Cloud & CI/CD Engineer',
  heroSummary: '배포, 인증, 운영 병목을 구조로 해결하는 DevOps 엔지니어입니다.',
  aboutSummary: [
    '운영 중 반복되는 문제를 임시 조치로 덮지 않고, 배포 흐름과 인프라 책임을 분리해 다시 발생하지 않는 구조를 만드는 데 강점이 있습니다.',
    '클라우드 인프라 설계, 재현 가능한 배포 파이프라인 구축, 인증 흐름 최적화처럼 운영 품질에 직접 연결되는 영역을 우선적으로 개선합니다.',
  ],
  strengths: [
    '운영 병목을 구조적으로 분리하고 해결하는 역량',
    '배포 자동화와 운영 표준화 역량',
    '클라우드 인프라 설계 및 재현 가능한 배포 파이프라인 구축 역량',
    '문제 원인을 끝까지 추적하고 도구 레벨까지 분석하는 고도화 역량',
  ],
  metrics: [
    {
      label: 'Deployment Time',
      value: '30m -> 10m',
      detail: '수동 배포 절차를 자동화해 배포 시간을 단축',
    },
    {
      label: 'Auth Latency',
      value: '68ms -> 3ms',
      detail: '필터 체인 레벨 인증 재구성으로 인증 지연 감소',
    },
    {
      label: 'Network Round Trips',
      value: '3 -> 1',
      detail: '토큰 재발급 구조를 무중단 흐름으로 단순화',
    },
    {
      label: 'Service Latency',
      value: '약 30% 감소',
      detail: '서비스 구조 개선과 지연 구간 분리로 응답 지연 완화',
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
