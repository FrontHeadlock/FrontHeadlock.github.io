import type { Profile } from './types'

export const profileKo: Profile = {
  name: '박규민',
  role: 'DevOps Engineer',
  affiliation: 'Telechips · 차량용 SoC 개발 인프라 운영 및 DevOps Engineer',
  heroSummary:
    '차량용 SoC 개발 환경의 인프라를 운영하며 반복되는 운영을 자동화하고 자원 상태를 수치로 드러내는 DevOps 엔지니어입니다.',
  aboutSummary: [
    '텔레칩스에서 차량용 SoC 개발 환경의 인프라를 운영하고 있습니다. KVM 베어메탈과 OpenStack Private Cloud, ONTAP 스토리지를 연구원들에게 제공하고 OpenLDAP과 Gerrit으로 계정·권한·SDK 접근을 관리합니다.',
    '운영에서 반복되는 일은 코드로 옮깁니다. 80여 대 서버의 설정 배포를 Ansible 4단계 플레이북으로 바꾸고, ITSM으로 들어오는 반복 요청은 승인과 dry-run을 거치는 AI 에이전트가 처리하게 했습니다.',
    '도구를 사용하는 것에서 그치지 않고, 코드레벨까지 학습하며 다양한 기술들에 관심이 많습니다. Jenkins 공식 Docker 이미지와 OpenStack 클라이언트, 다양한 AI 오픈소스들에 기여하였습니다.',
  ],
  strengths: [
    '증설이 제한된 환경에서 ONTAP 계층별 용량 지표를 세워 볼륨 사용률을 약 15% 개선한 자원 가시화 경험',
    '사전점검·스테이징·배포·롤백으로 나눈 Ansible 배포 체계도입',
    'AI 판단과 결정론적 실행을 통한 업무 자동화 및 가드레일 설계',
    '이슈 제보에서 리뷰 조율, 병합까지 이어 간 오픈소스 협업 경험 (jenkinsci, openstack, openchoreo)',
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
}
