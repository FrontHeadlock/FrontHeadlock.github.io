import type { Project } from './types'

export const projects: Project[] = [
  {
    slug: 'geulda',
    title: 'Geulda',
    subtitle: '부천 관광 스탬프 애플리케이션',
    summary: 'AWS 기반 인프라 설계와 Jenkins + AWX 배포 자동화로 운영 시간을 단축한 프로젝트',
    focus: '수동 배포 6단계를 자동화하고 멀티 서버 배포 절차를 표준화',
    techStack: ['AWS', 'Jenkins', 'AWX', 'Docker', 'Nginx', 'Redis', 'Prometheus', 'Grafana'],
    overview:
      '스탬프 기반의 부천시 관광 진흥 애플리케이션으로, 팀 전체 운영과 기획, 백엔드 파트 리드를 맡으며 인프라 환경 구축과 배포 자동화 파이프라인을 만들었습니다.',
    role: '팀 전체 리드, 기획, BE 파트장, 인프라 환경 및 배포 자동화 구축',
    problem: [
      '수동으로 나뉜 배포 절차 때문에 서버별 배포 편차와 운영 시간이 커졌습니다.',
      'Public/Private Subnet을 나눈 환경에서 접근 경로와 배포 책임이 명확히 정리되지 않은 상태였습니다.',
    ],
    approach: [
      'Bastion Host, NAT Gateway, ALB 기반의 Public/Private Subnet 아키텍처를 설계했습니다.',
      'Jenkins와 AWX를 결합해 멀티 서버 배포 절차와 환경 변수 적용 방식을 표준화했습니다.',
      'Prometheus와 Grafana를 포함한 운영 관측 흐름을 붙여 배포 이후 상태 확인 시간을 줄였습니다.',
    ],
    outcomes: [
      '배포 시간을 30분에서 10분 이내로 단축',
      '수동 6단계 배포 절차 자동화',
      '멀티 서버 배포 절차 표준화',
    ],
    learnings: [
      '배포 자동화는 빌드 스크립트 추가보다 접근 경로와 실행 책임을 먼저 정리해야 안정화됩니다.',
      '관측 도구까지 함께 묶어야 자동화가 실제 운영 시간 단축으로 이어집니다.',
    ],
    architectureNotes: [
      'Internet -> ALB -> Nginx / App',
      'Private Subnet 배포 경로는 Bastion Host와 NAT Gateway를 통해 통제',
      'Jenkins -> AWX -> Multi Server Deploy',
    ],
    troubleshooting: [
      {
        title: 'Jenkins DinD 메모리 압박 대응',
        problem: '단일 Jenkins 서버에서 빌드와 배포를 함께 수행하면서 메모리 고갈과 파이프라인 중단이 발생했습니다.',
        analysis:
          '빌드 컨테이너와 캐시가 누적되면서 컨트롤러 노드가 과도한 워크로드를 떠안았고, 장애가 전체 CI/CD 흐름으로 전파됐습니다.',
        action:
          'Jenkins Controller와 Agent 역할을 분리하고, Agent를 Docker-in-Docker 기반의 격리된 실행 환경으로 재구성했습니다. 배포 책임은 AWX로 분리했습니다.',
        result:
          '컨트롤러 메모리 사용이 안정화됐고, 빌드 실패가 전체 배포 흐름을 멈추는 구조적 리스크를 줄였습니다.',
      },
    ],
  },
  {
    slug: 'oldyoung',
    title: 'OldYoung',
    subtitle: '수급 분위 기반 복지 혜택 추천 애플리케이션',
    summary: '복지 혜택 추천 흐름과 배포 환경 구축, AI 챗봇 연계를 함께 맡은 프로젝트',
    focus: '사용자 입력을 기반으로 복지 정보를 빠르게 탐색할 수 있는 흐름 설계',
    techStack: ['Spring Boot 3.5', 'Java 17', 'OpenAI-bom:1.0', 'Redis', 'AWS'],
    overview:
      'RAG를 활용해 소득 분위 기반 노인 복지 혜택을 추천하는 애플리케이션으로, PM과 디자인, 백엔드, 배포 환경 구축, AI 챗봇 개발을 함께 담당했습니다.',
    role: 'PM, 디자인, 백엔드, 배포 환경 구축 및 AI 챗봇 개발',
    problem: [
      '사용자가 복지 혜택을 직접 탐색하기 어려워 입력 기반의 간단한 진입 흐름이 필요했습니다.',
      '추천 로직과 조회 흐름이 분리되지 않으면 챗봇 응답과 혜택 조회 경험이 단절될 수 있었습니다.',
    ],
    approach: [
      '사용자 정보 입력 -> 수급 분위 계산 -> 관련 혜택 반환 흐름으로 단순한 탐색 경로를 설계했습니다.',
      '챗봇 응답이 혜택 조회와 분리되지 않도록 입력 기반 조회 흐름을 동일한 정보 구조에 맞췄습니다.',
      '배포 환경을 함께 구축해 기능 검증과 데모 준비 시간을 줄였습니다.',
    ],
    outcomes: [
      '사용자 입력을 기반으로 수급 분위와 혜택을 연결하는 추천 흐름 구현',
      '노인 복지 시설 조회와 챗봇 응답을 같은 사용자 흐름 안에서 제공',
    ],
    learnings: [
      '추천형 서비스는 모델 성능보다도 사용자가 이해하기 쉬운 입력 흐름이 먼저 안정돼야 합니다.',
      '기획, 디자인, 백엔드, 배포를 함께 볼 때 사용자 흐름과 운영 준비가 더 빠르게 맞춰집니다.',
    ],
    troubleshooting: [
      {
        title: '추천 흐름과 조회 흐름의 분리 방지',
        problem: '복지 추천과 세부 혜택 조회가 따로 보이면 사용자가 결과를 이어서 이해하기 어려웠습니다.',
        analysis:
          '입력 데이터가 여러 단계에서 중복 해석되면 추천 근거와 조회 결과가 서로 다른 문맥으로 보일 수 있었습니다.',
        action:
          '사용자 입력을 기준으로 수급 분위 계산, 혜택 조회, 챗봇 응답이 같은 흐름을 공유하도록 정보 구조를 맞췄습니다.',
        result:
          '사용자 입장에서 입력 이후 결과 확인까지의 맥락이 유지되는 구조를 만들 수 있었습니다.',
      },
    ],
  },
  {
    slug: 'kubernetes-parking',
    title: 'Kubernetes',
    subtitle: '주차 관리 서비스',
    summary: '지연 시간과 장애 격리를 함께 고려해 운영 가능한 서비스 구조로 개선한 프로젝트',
    focus: '정합성과 장애 격리를 유지하면서 약 30% 수준의 지연 감소',
    techStack: ['Django', 'Kubernetes', 'Saga Pattern', 'Circuit Breaker'],
    overview:
      'Kubernetes 기반의 주차 관리 서비스에서 서비스 간 정합성과 장애 격리를 고려한 구조를 설계하고 운영 가능한 형태로 개선했습니다.',
    role: '서비스 구조 개선 및 운영 안정성 확보',
    problem: [
      '서비스 간 호출 지연과 장애 전파 가능성이 운영 안정성을 떨어뜨리고 있었습니다.',
      '정합성 유지와 장애 격리를 동시에 만족시키는 구조가 필요했습니다.',
    ],
    approach: [
      'Saga Pattern과 Circuit Breaker를 조합해 서비스 간 책임과 실패 경계를 분리했습니다.',
      'Kubernetes 환경에서 운영 가능한 형태로 배포 구조와 서비스 연결 방식을 재정리했습니다.',
    ],
    outcomes: ['기존 구조 대비 서비스 간 지연 시간 약 30% 감소', '운영 가능한 서비스 구조와 안정성 확보'],
    learnings: [
      '지연 감소는 단순한 최적화보다 실패 경계와 정합성 경계를 먼저 정리할 때 효과가 큽니다.',
      '운영 가능한 구조는 정상 흐름보다 장애 시나리오에서 더 명확히 드러납니다.',
    ],
    troubleshooting: [
      {
        title: '지연 구간과 장애 전파 분리',
        problem: '서비스 하나의 지연이 다른 서비스로 번지면서 전체 응답 품질이 낮아졌습니다.',
        analysis:
          '호출 실패를 개별 서비스 문제로 제한하지 못해 대기 시간이 누적됐고, 정합성 처리도 복잡해졌습니다.',
        action:
          '실패 경계를 분리하고 보상 흐름을 설계해 지연 구간을 국소화했습니다.',
        result: '운영 안정성을 유지하면서 서비스 간 지연을 약 30% 줄였습니다.',
      },
    ],
  },
  {
    slug: 'catxi',
    title: 'CATXI',
    subtitle: 'JWT 인증 구조 개선',
    summary: '필터 체인 내부 재발급 구조로 네트워크 왕복과 인증 지연을 줄인 프로젝트',
    focus: '네트워크 왕복 3회 -> 1회, 인증 지연 68ms -> 3ms',
    techStack: ['Spring Security', 'JWT', 'Redis', 'OAuth2', 'AWS'],
    overview:
      '가톨릭대학교 학생 대상 택시 동승 애플리케이션의 인증 구조를 개선해 만료 토큰 처리와 재발급 흐름을 필터 체인 레벨에서 재구성했습니다.',
    role: 'BE 파트장, 인증 및 인가 환경 구축',
    problem: [
      '만료된 AccessToken 요청이 DispatcherServlet까지 진입하면서 인증 실패 처리 비용이 커졌습니다.',
      '재발급 API를 별도로 호출하는 구조로 네트워크 왕복과 인증 지연이 불필요하게 증가했습니다.',
    ],
    approach: [
      'JwtFilter 내부에서 ExpiredJwtException을 직접 처리해 컨트롤러 진입 전에 재인증 흐름을 수행하도록 변경했습니다.',
      'RefreshToken을 Redis에서 검증하고 유효한 경우 새 토큰을 헤더에 포함해 응답하도록 구성했습니다.',
      '필터 체인 내부에서 SecurityContext를 재구성해 API 흐름이 끊기지 않도록 했습니다.',
    ],
    outcomes: ['네트워크 왕복 횟수 3회에서 1회로 축소', '인증 지연 시간 68ms에서 3ms로 감소'],
    learnings: [
      '인증 최적화는 토큰 저장소보다 예외가 어디서 처리되는지를 먼저 봐야 합니다.',
      '사용자 요청 흐름 안에서 재발급을 끝내면 성능뿐 아니라 클라이언트 복잡도도 줄어듭니다.',
    ],
    troubleshooting: [
      {
        title: '만료 토큰의 필터 체인 내부 처리',
        problem: '만료 토큰이 컨트롤러 레벨까지 도달해 401 응답과 재발급 호출이 분리돼 있었습니다.',
        analysis:
          '재발급이 별도 API에 묶여 있어 네트워크 왕복 3회와 높은 인증 지연이 발생했고, 요청 흐름도 복잡했습니다.',
        action:
          'JwtFilterChain 내부에서 만료 토큰을 감지하고 RefreshToken 검증 후 AccessToken과 RefreshToken을 재생성해 즉시 응답에 반영했습니다.',
        result: '인증 흐름이 한 번의 요청 안에서 마무리되며 68ms였던 인증 지연이 3ms 수준으로 줄었습니다.',
      },
    ],
  },
]
