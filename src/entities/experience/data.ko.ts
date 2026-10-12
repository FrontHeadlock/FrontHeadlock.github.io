import type { ExperienceEntry } from './types'

// 순서 = 화면 순서. 오래된 것부터 현재로 가되, 오픈소스 기여와 수상은 맨 뒤에 모아 둔다.
export const experienceKo: ExperienceEntry[] = [
  {
    title: '컴퓨터정보공학부 학사',
    organization: '가톨릭대학교',
    dateLabel: '2020.03 – 2026.02',
    category: '학력',
    role: '전공 이수. 팀 프로젝트에서 백엔드와 인프라 구축',
    summary:
      '컴퓨터정보공학을 전공하며 팀 프로젝트에서 백엔드와 인프라를 맡았습니다. 캠퍼스 택시 동승 앱의 인증·인가와 관광 스탬프 앱의 AWS 인프라·배포 자동화를 구축했습니다.',
    highlights: [
      { text: 'Geulda 팀 리드·개발 파트장으로 AWS 인프라와 Jenkins·AWX·Blue/Green 배포 자동화 구축 (2025.10 – 2025.11)' },
      { text: 'CATXI 백엔드에서 Kakao OAuth2·JWT·Redis 인증 라이프사이클을 설계하고 필터 체인에서 토큰 재발급 구현 (2025.05 – 2025.12)' },
    ],
    relatedProjects: ['geulda', 'catxi'],
    techStack: ['Java', 'Spring Boot', 'Python', 'Linux', 'AWS'],
  },
  {
    title: '병역 이행',
    dateLabel: '2022.01 – 2023.10',
    category: '병역',
    role: '복무 완료',
    summary: '2022년 1월부터 2023년 10월까지 복무했습니다.',
    techStack: [],
  },
  {
    title: 'GDGoC CUK TECH 팀 운영진',
    organization: 'Google Developer Groups on Campus CUK',
    dateLabel: '2024.03 – 2025.12',
    category: '활동',
    role: '클라우드·Java 백엔드·딥러닝 스터디 기획과 운영',
    summary:
      '스터디 커리큘럼을 기수마다 다듬어 구성원 학습을 도왔고 10명 규모 스터디가 90명 규모 교내 중앙 동아리로 커지는 동안 운영진으로 함께했습니다.',
    techStack: [],
  },
  {
    title: 'University MakeUs Challenge Server 파트',
    organization: 'UMC CUK (22개 대학 연합 앱 개발 동아리)',
    dateLabel: '2024.09 – 2025.11',
    category: '활동',
    role: 'Server 파트, Spring Boot 백엔드 개발',
    summary:
      '백엔드 스터디로 REST API 설계와 서버 구조를 배우고 웹 애플리케이션 프로젝트 2개에 서버 개발자로 들어가 백엔드 로직과 API를 맡았습니다.',
    highlights: [
      { text: 'momogum 백엔드: 유저 프로필, 팔로우, S3 이미지 업로드, 피드 조회 API 구현 (2025.01 – 02)' },
      { text: 'BodyBuddy 백엔드: 메인 페이지와 꾸미기 페이지 API, 아바타·스킨 연관관계 구현 (2025.01 – 02)' },
    ],
    techStack: ['Java', 'Spring Boot', 'JPA', 'MySQL', 'AWS S3'],
  },
  {
    title: '한국오라클 미래내일 일경험 — 복지 추천 서비스 OldYoung',
    organization: '한국오라클',
    dateLabel: '2025.06 – 2025.08',
    category: '일경험',
    role: '4인 팀 리드 겸 개발 파트장. 아키텍처, 배포 환경, AI 챗봇 담당',
    summary:
      'Spring Boot를 API·비즈니스 서버로, Flask를 AI 처리 서버로 분리하고 Docker Compose로 묶어 Jenkins로 빌드와 배포를 자동화했습니다. 사용자 소득 정보와 Redis 멀티턴 메모리를 연결한 복지 추천 챗봇을 구현했습니다.',
    techStack: ['Spring Boot', 'Spring AI', 'Flask', 'Docker Compose', 'Jenkins', 'Redis', 'AWS EC2'],
  },
  {
    title: '현대오토에버 모빌리티 SW 스쿨 Cloud Track',
    organization: '현대오토에버',
    dateLabel: '2025.12 – 2026.05',
    category: '교육',
    role: '수료. 팀 프로젝트 ParkFlow 백엔드 개발',
    summary:
      'Linux·네트워크·접근 제어부터 Docker·Kubernetes, Jenkins·ArgoCD CI/CD까지 실습하며 코드 변경을 직접 배포했습니다. 팀 프로젝트 ParkFlow에서는 Kubernetes 위에 주차 관리 서비스를 MSA로 나누고 서비스 간 통신을 gRPC로 바꿔 호출 지연을 줄였습니다.',
    highlights: [
      { text: 'Django 서비스를 역할별로 분리하고 중앙 Orchestrator가 호출 흐름을 관리하도록 구성' },
      { text: '서비스 간 통신을 REST에서 gRPC로 바꿔 호출 지연 약 30% 감소' },
      { text: 'Saga 패턴의 보상 트랜잭션으로 분산 환경의 정합성을 맞추고 Circuit Breaker로 장애를 격리' },
      { text: 'TDD로 테스트 69개, 커버리지 80% 이상 유지. ArgoCD GitOps로 클러스터 상태를 Git과 동기화' },
    ],
    link: 'https://github.com/k8s-Parkflow/park_python',
    techStack: ['Linux', 'Docker', 'Kubernetes', 'Jenkins', 'ArgoCD', 'Django', 'gRPC', 'MariaDB'],
  },
  {
    title: '차량용 SoC 개발 환경 인프라 운영',
    organization: '텔레칩스 DevOps팀',
    dateLabel: '2026.05 – 현재',
    category: '재직',
    role: '매니저. 연구소 개발 인프라와 SoC 폐쇄망 개발 서버 운영',
    summary:
      'KVM 베어메탈과 OpenStack Private Cloud, ONTAP 스토리지를 연구원들에게 제공하고 OpenLDAP과 Gerrit으로 계정·권한·SDK 접근을 관리합니다. 반복되는 운영은 Ansible과 AI 에이전트로 자동화했습니다.',
    highlights: [
      { text: 'ITSM 반복 요청을 AI 에이전트로 자동화해 일 평균 처리 시간을 3시간에서 30분으로 단축' },
      { text: 'ONTAP 용량 모니터링 체계를 구축하고 유휴 Thick Volume을 회수해 볼륨 사용률 약 15% 개선' },
      { text: '80여 대 개발 서버의 라이선스·툴 배포를 Ansible 4단계 플레이북으로 표준화' },
      { text: 'Prometheus·Grafana로 서버·스토리지 지표를 수집하고 ONTAP API 기반 계정별 사용량 조회 기능 개발' },
      { text: 'ISO 27001 심사와 TISAX 준비 문서 작업, 정부과제 HW 도입 과정 참여' },
    ],
    relatedProjects: ['agentic-ops', 'ontap-monitoring', 'ansible-deploy'],
    techStack: [
      'Linux (Ubuntu·Rocky·Oracle)',
      'KVM',
      'OpenStack',
      'NetApp ONTAP',
      'Ansible',
      'Prometheus',
      'Grafana',
      'Fluent Bit',
      'OpenLDAP',
      'Gerrit',
      'Jenkins',
      'Python',
      'LangChain',
      'vLLM',
    ],
  },
  {
    title: '오픈소스 컨트리뷰션 아카데미 OpenStack 과정',
    organization: '정보통신산업진흥원',
    dateLabel: '2026.04 – 2026.06',
    category: '교육',
    role: '멘티. python-openstackclient 기여 절차 실습',
    summary:
      '사내에서 운영하던 OpenStack에서 Nova·Cinder 등 핵심 서비스의 구조와 API를 코드 수준까지 학습하고 Gerrit에 change를 올려 Zuul CI를 거쳐 코어 리뷰어 승인을 받는 기여 절차를 실습했습니다. 운영 중 마주치던 동작의 원인을 코드에서 직접 찾았고 과정 뒤 올린 change는 병합됐습니다.',
    techStack: ['OpenStack', 'Python', 'Gerrit', 'Zuul', 'DevStack', 'tox'],
  },
  {
    title: 'GenAI on EKS — 추론 인프라 최적화 교육',
    organization: 'AWS 워크숍 (OSSAI)',
    dateLabel: '2026.07 – 2026.09',
    category: '교육',
    role: '수강, 핸즈온 실습',
    summary:
      'vLLM으로 Qwen 3와 DeepSeek R1을 서빙하고 Bedrock의 Claude까지 LiteLLM 게이트웨이 하나로 묶은 뒤, Langfuse로 토큰과 비용을 추적하며 LangGraph·MCP 에이전트를 EKS에 배포했습니다. 에이전트는 만드는 일보다 배포 뒤 지연·비용·품질을 관측하며 운영하는 일이 더 중요하다는 것을 익혔습니다.',
    techStack: ['Amazon EKS', 'vLLM', 'LiteLLM', 'Langfuse', 'LangGraph', 'MCP', 'Karpenter'],
  },
  {
    title: '오픈소스 기여 — 쓰던 도구를 코드까지 읽고 고치기',
    organization:
      'jenkinsci/docker · openstack/python-openstackclient · Yeachan-Heo/oh-my-claudecode · Yeachan-Heo/gajae-code · openchoreo/openchoreo · devfloor9/engineering-playbook',
    dateLabel: '2026.02 – 현재',
    category: '오픈소스',
    role: '이슈 제보, PR·change 작성, 리뷰 대응',
    summary:
      '학부 때부터 쓰던 Jenkins의 공식 Docker 이미지에 처음 기여했고 이후 사내에서 운영하는 OpenStack 클라이언트, 매일 쓰는 에이전트 도구 두 곳, Jenkins 백엔드 문서, AWS 엔지니어링 플레이북으로 기여 대상을 넓혔습니다. 병합 5건과 이슈 제보 1건이며, 각 항목은 공개 기록과 1:1로 맞습니다.',
    highlights: [
      {
        text: 'jenkinsci/docker: retry 함수의 backoff 주석이 실제 동작과 달라 이슈 #2266으로 제보. 메인테이너와 논의해 미사용 코드를 지운 PR #2268 병합 (2026.02)',
        href: 'https://github.com/jenkinsci/docker/pull/2268',
      },
      {
        text: 'oh-my-claudecode: ultragoal 가드가 세션의 모든 도구 호출을 막는 교착을 이슈 #3506·#3513으로 제보하고 핸드오프 안내문과 가드의 계약 불일치를 고친 PR #3514 병합 (2026.07)',
        href: 'https://github.com/Yeachan-Heo/oh-my-claudecode/pull/3514',
      },
      {
        text: 'python-openstackclient: v2 기능 테스트가 cinder 서비스를 비활성화한 채 끝나고 Xena 이후 영구 스킵 상태임을 확인. 이 테스트를 제거한 change 997058 병합 (2026.08)',
        href: 'https://review.opendev.org/c/openstack/python-openstackclient/+/997058',
      },
      {
        text: 'gajae-code: subagent await 중 사용자 steer가 대기 끝까지 처리되지 않아 이슈 #4727로 제보. 대기 도구만 steering에 반응하게 한 PR #4728 병합 (2026.08)',
        href: 'https://github.com/Yeachan-Heo/gajae-code/pull/4728',
      },
      {
        text: 'openchoreo: Jenkins 백엔드 설정 안내가 README와 CONTRIBUTING에서 서로 달라 코드로 확인한 뒤 이슈 #4880으로 제보. 메인테이너가 수정 예정으로 확인 (2026.08)',
        href: 'https://github.com/openchoreo/openchoreo/issues/4880',
      },
      {
        text: 'engineering-playbook (AWS 아키텍처 플레이북): EKS VPC CNI deep-dive 문서를 기존 영문 문서 규칙에 맞춰 번역한 PR #35 병합 (2026.09)',
        href: 'https://github.com/devfloor9/engineering-playbook/pull/35',
      },
    ],
    techStack: ['Shell', 'Python', 'TypeScript', 'Docker', 'Gerrit', 'Markdown'],
  },
  {
    title: '수상',
    organization: '가톨릭대학교 · GDGoC CUK',
    dateLabel: '2024.06 – 2025.11',
    category: '수상',
    role: '경진대회 팀 리드·PM·개발 파트장, 해커톤 데이터셋 수집·전처리',
    summary:
      '교내 전공역량 경진대회에서 Geulda의 AWS 인프라와 Blue/Green 배포 자동화로 최우수상을 받았고 GDGoC CUK 해커톤에서는 노인 치매 조기 진단 AI 모델 프로젝트로 최우수상을 받았습니다.',
    highlights: [
      {
        text: '전공역량 경진대회 최우수상 (2025.11.24). 팀 리드·PM·개발 파트장으로 AWS 인프라와 Jenkins·AWX 배포 자동화를 맡아 6단계 수동 배포를 자동화하고 배포 시간을 30분에서 10분 이내로 단축',
      },
      {
        text: 'GDGoC CUK 해커톤 최우수상 (2024.06.30). UN SDG 17개 주제 중 노인 치매 예방을 주제로 치매 조기 진단 AI 모델의 데이터셋을 수집·전처리하고 데이터 품질 기준 수립',
      },
    ],
    relatedProjects: ['geulda'],
    techStack: ['AWS', 'Jenkins', 'Ansible AWX', 'Python'],
  },
]
