import type { Profile } from './types'

export const profileKo: Profile = {
  name: '박규민',
  role: '데브옵스 엔지니어 / 클라우드 & CI/CD 엔지니어',
  heroSummary: '배포, 인증, 운영 병목을 아키텍처 단위에서 해결하는 데브옵스 엔지니어입니다.',
  aboutSummary: [
    '반복되는 운영 이슈를 임시 패치로 넘기지 않고, 배포 흐름과 인프라 소유권을 분리해 재발을 방지하는 데 집중합니다.',
    '클라우드 인프라 설계, 재현 가능한 배포 파이프라인, 인증 흐름 최적화 등 서비스 품질에 직결되는 영역을 우선순위로 둡니다.',
  ],
  strengths: [
    '운영 병목을 구조적으로 격리하고 해결하는 능력',
    '배포 자동화 및 운영 표준화 역량',
    '클라우드 인프라 설계 및 재현 가능한 배포 파이프라인 구축 경험',
    '근본 원인 추적부터 도구 단위 분석까지 이어지는 깊이 있는 트러블슈팅 역량',
  ],
  metrics: [
    {
      label: '배포 시간',
      value: '30m -> 10m',
      detail: '수동 배포 절차를 자동화해 릴리스 시간을 단축',
    },
    {
      label: '인증 지연',
      value: '68ms -> 3ms',
      detail: '필터 체인 단계에서 흐름을 재설계해 인증 지연을 단축',
    },
    {
      label: '네트워크 왕복',
      value: '3 -> 1',
      detail: '토큰 재발급을 무중단 요청 경로로 단순화',
    },
    {
      label: '서비스 지연',
      value: '−30%',
      detail: '서비스 구조 재설계와 지연 영역 격리로 응답 지연을 개선',
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
  deliveryMeta: ['React SPA', '정적 배포 지원', '배포 경로 구성 가능'],
}
