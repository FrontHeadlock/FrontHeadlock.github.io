import type { Profile } from './types'

export const profileKo: Profile = {
  name: '박규민',
  role: 'DevOps Engineer',
  affiliation: 'Telechips · 차량용 SoC 개발 인프라 운영 및 DevOps Engineer',
  heroSummary:
    '차량용 SoC 개발 환경의 인프라를 운영하며 반복되는 운영을 자동화하고 자원 상태를 수치로 드러내는 DevOps 엔지니어입니다.',
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
      label: '반복 업무 처리',
      value: '3h -> 30m',
      detail: 'ITSM 반복 요청을 승인·dry-run을 거치는 AI 에이전트로 자동화, 일 평균 처리 시간 단축',
    },
    {
      label: '볼륨 사용률 개선',
      value: '15%',
      detail: 'ONTAP 계층별 용량 지표 수집, 유휴 Volume을 회수해 증설 없이 용량 확보',
    },
    {
      label: '배포 시간 단축',
      value: '30m -> 10m',
      detail: 'Jenkins·AWX 기반 배포 자동화 및 Blue/Green 방식의 무중단 배포',
    },
    {
      label: '인증 지연 개선',
      value: '68ms -> 3ms',
      detail: '필터 체인 내에서 토큰 재발급 구조를 도입, 네트워크 왕복 3회를 1회로',
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
