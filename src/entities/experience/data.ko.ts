import type { ExperienceEntry } from './types'

// 순서 = 화면 순서. 오래된 것부터 현재로 가되, 오픈소스 기여와 수상은 맨 뒤에 모아 둔다.
// 설명의 줄바꿈("\n")은 화면에서 그대로 줄이 나뉜다(whitespace-pre-line).
export const experienceKo: ExperienceEntry[] = [
  {
    title: '컴퓨터정보공학부 학사',
    organization: '가톨릭대학교',
    dateLabel: '2020.03 – 2026.02',
    category: '학력',
    role: '전공 이수',
    summary: '컴퓨터정보공학을 전공하며 다양한 CS 지식과 컴퓨터 공학 이론을 학습하였습니다.',
    highlights: [
      { text: '대학 동기들과 택시 동승 어플리케이션 CATXI 개발 (2025.10 – 2025.11)' },
      { text: 'CATXI 백엔드에서 Kakao OAuth2·JWT·Redis 인증 라이프사이클을 설계하고 필터 체인에서 토큰 재발급 구현 (2025.05 – 2025.12)' },
    ],
    link: 'http://www.cukjournal.com/news/articleView.html?idxno=4554',
    techStack: [],
  },
  {
    title: 'GDGoC CUK TECH 팀 운영진',
    organization: 'Google Developer Groups on Campus CUK',
    dateLabel: '2024.03 – 2025.12',
    category: '동아리',
    role: '클라우드·Java 백엔드·딥러닝등 다양한 스터디를 운영하며 IT 커뮤니티에 참여하였습니다.',
    summary: '스터디 커리큘럼을 기수마다 다듬어 구성원들의 학습을 도왔고, 10명 규모에서 90명 규모 교내 중앙 동아리로 커지도록 기여하였습니다.',
    techStack: [],
  },
  {
    title: 'University MakeUs Challenge Server 파트',
    organization: 'UMC CUK (22개 대학 연합 앱 개발 동아리)',
    dateLabel: '2024.09 – 2025.11',
    category: '동아리',
    role: 'Server 파트, Spring Boot 백엔드 개발',
    summary: 'SpringBoot를 기반으로 REST API 설계와 서버 구조를 배우고 2개의 웹 애플리케이션 프로젝트를 개발하였습니다.',
    highlights: [
      { text: 'momogum 백엔드: 유저 프로필, 팔로우, S3 이미지 업로드, 피드 조회 API 구현 (2025.01 – 02)' },
      { text: 'LunchChat 백엔드: Oauth2.0 기반 Kakao 로그인, AI 추천 시스템 구현 (2025.06 – 08)' },
    ],
    techStack: ['Java', 'Spring Boot', 'JPA', 'MySQL', 'AWS S3'],
  },
  {
    title: '한국오라클 미래내일 일경험',
    organization: '한국오라클',
    dateLabel: '2025.06 – 2025.08',
    category: '일경험',
    role: '4인 팀 리드 겸 개발 파트장. 아키텍처, 배포 환경, AI 챗봇 담당',
    summary:
      '한국 오라클 현직자들로부터 데이터를 기반으로 한 실무 프로세스 및 협업 역량을 배웠습니다.\n노인 복지 개선을 주제로 RAG기반의 복지 혜택 조회 챗봇을 개발하였습니다.',
    techStack: ['Spring Boot', 'Spring AI', 'Flask', 'Docker Compose', 'Jenkins', 'Redis', 'AWS EC2'],
  },
  {
    title: '현대오토에버 모빌리티 SW 스쿨 Cloud Track',
    dateLabel: '2025.12 – 2026.05',
    category: '교육',
    role: 'Linux 부터 Kubernetes 까지 인프라 전반에 대한 교육을 수강하였습니다.',
    summary:
      'Linux·네트워크·접근 제어부터 Docker·Kubernetes, Jenkins·ArgoCD CI/CD까지 실습하였습니다.\n부트캠프 기간 내 2개의 프로젝트 개발에 참여하였습니다.',
    highlights: [
      { text: 'Django 서비스를 역할별로 분리하고 중앙 Orchestrator가 호출 흐름을 관리하도록 구성' },
      { text: 'Saga 패턴의 보상 트랜잭션으로 분산 환경의 정합성을 맞추고 Circuit Breaker로 장애를 격리' },
      { text: 'TDD로 테스트 69개, 커버리지 80% 이상 유지. ArgoCD GitOps로 클러스터 상태를 Git과 동기화' },
    ],
    techStack: [],
  },
  {
    title: 'Telechips DevOps Team',
    organization: '차량용 SoC 개발 환경 인프라 운영',
    dateLabel: '2026.05 – 현재',
    category: '재직중',
    role: '매니저. 연구소 개발 인프라와 SoC 폐쇄망 개발 서버 운영',
    summary:
      '서버 견적 산정부터 랙 실장과 운영까지 서버 관리부터 운영까지 Onpremise 환경에대한 이해도를 가지고 있습니다.\nKVM 베어메탈과 OpenStack Private Cloud, ONTAP 스토리지등 인프라 환경 전반을 운영하며 더 나은 환경을 개선하고자 노력합니다.',
    highlights: [
      { text: 'ITSM 반복 요청을 AI 에이전트로 자동화해 일 평균 처리 시간을 3시간에서 30분으로 단축' },
      { text: 'ONTAP 용량 모니터링 체계를 구축하고 유휴 Thick Volume을 회수해 볼륨 사용률 약 15% 개선' },
      { text: '80여 대 개발 서버의 라이선스·툴 배포를 Ansible 4단계 플레이북으로 표준화' },
      { text: 'Prometheus·Grafana로 서버·스토리지 지표를 수집하고 ONTAP API 기반 계정별 사용량 조회 기능 개발' },
      { text: 'ISO 27001 심사와 TISAX 준비 문서 작업, 정부과제 기반의 HW 구매 및 물리장비 운영 전체 과정 참여' },
    ],
    relatedProjects: ['agentic-ops', 'ontap-monitoring', 'ansible-deploy'],
    techStack: ['Linux', 'KVM', 'OpenStack', 'NetApp ONTAP', 'Ansible', 'Prometheus', 'Grafana', 'Fluent Bit', 'Jenkins', 'Python'],
  },
  {
    title: '오픈소스 컨트리뷰션 아카데미 OpenStack 과정',
    organization: '정보통신산업진흥원 (NIPA)',
    dateLabel: '2026.04 – 2026.06',
    category: '교육 수강 및 오픈소스 기여',
    role: '멘티. python-openstackclient 기여 절차 실습',
    summary: 'OpenStack의 Nova·Cinder 등 핵심 서비스의 구조와 API를 코드 수준까지 학습하였습니다.',
    techStack: ['OpenStack', 'Python', 'Gerrit', 'Zuul', 'DevStack', 'tox'],
  },
  {
    title: 'GenAI on EKS 인퍼런스 최적화',
    organization: 'AWS 워크숍 (OSSAI)',
    dateLabel: '2026.07 – 2026.09',
    category: '교육',
    role: '교육 수강, 핸즈온 실습',
    summary:
      'Qwen 3와 DeepSeekR1 등 vLLM을 서빙하며 이를 게이트웨이와 Langfuse 등으로 관리하며 EKS에 배포하였습니다.\nAI를 단순히 사용하는 것에서 그치지 않고, 어떻게 관리하고 그 토큰 및 비용을 추적해 사용성을 높여나가는 LLMOps 기반을 학습하였습니다.',
    techStack: ['Amazon EKS', 'vLLM', 'LiteLLM', 'Langfuse', 'LangGraph', 'MCP', 'Karpenter'],
  },
  {
    title: '오픈소스 기여',
    organization: 'jenkinsci/docker · openstack/python-openstackclient · openchoreo/openchoreo 등',
    dateLabel: '2026.02 – 현재',
    category: '오픈소스',
    role: '이슈 제보, PR·change 작성, 리뷰',
    summary:
      '새로운 기술들에 많은 관심을 기반으로 다양한 오픈소스들에 관심이 많습니다.\n단순히 오픈소스 사용이 아닌, 실질적인 기여로써 가치 창출에 기여하고자 노력해왔습니다.',
    highlights: [
      { text: 'jenkinsci/docker: retry 함수의 backoff 증가 문제 제거 (2026.02)', href: 'https://github.com/jenkinsci/docker/pull/2268' },
      {
        text: 'oh-my-claudecode: ultragoal 가드가 세션의 모든 도구 호출을 막는 교착 및 가드 계약 불일치 개선(2026.07)',
        href: 'https://github.com/Yeachan-Heo/oh-my-claudecode/pull/3514',
      },
      {
        text: 'python-openstackclient: cinder 서비스를 비활성화하는 v2 기능 테스트 제거 (2026.08)',
        href: 'https://review.opendev.org/c/openstack/python-openstackclient/+/997058',
      },
      { text: 'gajae-code: subagent await 중 사용자 steer 이슈 제보(2026.08)', href: 'https://github.com/Yeachan-Heo/gajae-code/pull/4728' },
      {
        text: 'openchoreo: 프로젝트의 Jenkins 설정에 대한 상반된 설명에 대한 이슈 제보.',
        href: 'https://github.com/openchoreo/openchoreo/issues/4880',
      },
      {
        text: 'engineering-playbook (AWS 아키텍처 플레이북): EKS VPC CNI deep-dive 문서 한글화 (2026.09)',
        href: 'https://github.com/devfloor9/engineering-playbook/pull/35',
      },
    ],
    techStack: ['Shell', 'Python', 'TypeScript', 'Docker', 'Gerrit', 'Markdown'],
  },
  {
    title: '수상',
    category: '수상',
    highlights: [
      {
        text: '전공역량 경진대회 최우수상 (2025.11.24). 팀 리드·PM·개발 파트장으로 AWS 인프라와 Jenkins·AWX 배포 자동화를 맡아 6단계 수동 배포를 자동화하고 배포 시간을 30분에서 10분 이내로 단축',
      },
      {
        text: 'GDGoC CUK 해커톤 최우수상 (2024.06.30). UN SDG 17개 주제 중 노인 치매 예방을 주제로 치매 조기 진단 AI 모델의 데이터셋을 수집·전처리하고 데이터 품질 기준 수립',
      },
    ],
    techStack: [],
  },
]
