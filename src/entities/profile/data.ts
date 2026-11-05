import type { Profile } from './types'

// 소개 문단의 줄바꿈("\n")은 화면에서 그대로 줄이 나뉘고, 강점의 **…**은 굵게 강조된다.
export const profile: Profile = {
  name: '박규민',
  role: 'DevOps Engineer',
  affiliation: 'Telechips · 차량용 SoC 개발 인프라 운영 및 DevOps Engineer',
  company: 'Telechips',
  employmentStatus: '재직중',
  heroSummary:
    '수백 대 규모의 차량용 SoC 개발 인프라를 운영하며, 자동화와 관측성으로 반복 운영과 장애를 줄이는 DevOps 엔지니어\n혼자만의 성장이 아닌 팀과 함께 공유하고, 함께 일하고 싶은 팀원',
  aboutSummary: [
    '전장 Tier2 기업에서 차량용 SoC 개발 환경의 인프라를 운영하고 있습니다.\n수백 대 규모의 Rocky·Ubuntu 서버와 KVM·OpenStack VM, NetApp ONTAP 스토리지를 운영하며 서버 트러블 슈팅과 스토리지 용량 관리를 맡고 있습니다.',
    '코드를 활용해 반복 작업을 단순화 및 자동화하는 것에 관심이 많습니다.\nAnsible을 이용한 라이선스 배포, Toil 업무들에 대한 AI Agent 기반 자동화 환경 구축 경험이 있습니다.',
    '빠르게 변화하는 다양한 기술 및 오픈소스들에 관심이 많습니다.\nJenkins, OpenStack, 다양한 AI 기반 오픈소스들에 기여하고 있습니다.',
  ],
  strengths: [
    '증설이 막힌 ONTAP에서 Thick→Thin 전환과 유휴 볼륨 회수로 **Aggregate 여유 공간 약 30 TiB 확보**',
    '사전점검·스테이징·배포·롤백으로 나눈 **Ansible 기반 자동 배포 체계도입**',
    '**AI Agent와 규칙기반 실행을 통한 업무 자동화** 및 가드레일 설계',
    '다양한 오픈소스 PR 및 행사 참여 등을 통해 학습한 **개발 커뮤니케이션 능력**',
  ],
  metrics: [
    {
      label: '반복 업무 처리',
      value: '3h -> 30m',
      detail: 'ITSM 반복 요청을 AI 에이전트로 자동화, 일 평균 처리 시간 단축',
    },
    {
      label: '유휴 볼륨 회수',
      value: '15%',
      detail: 'Thick 볼륨 회수로 기존 집계 기준 볼륨 사용률 개선',
    },
    {
      label: '배포 시간 단축',
      value: '30m -> 10m',
      detail: 'Jenkins·AWX 기반 배포 자동화 및 Blue/Green 방식의 무중단 배포 구축',
    },
    {
      label: '증설 없이 확보',
      value: '30 TiB',
      detail: 'Thick→Thin 전환과 유휴 볼륨 회수로 NVMe Aggregate 여유 공간 확보',
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
