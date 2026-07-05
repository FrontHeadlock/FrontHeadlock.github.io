import type { Project } from './types'

export const projectsKo: Project[] = [
  {
    slug: 'geulda',
    title: 'Geulda',
    subtitle: '부천 관광 스탬프 애플리케이션',
    summary: 'AWS 인프라 설계와 Jenkins + AWX 배포 자동화로 운영 시간을 단축한 프로젝트',
    focus: '수동 배포 절차 6단계를 자동화하고 다중 서버 릴리스 절차를 표준화',
    techStack: ['AWS', 'Jenkins', 'AWX', 'Docker', 'Nginx', 'Redis', 'Prometheus', 'Grafana'],
    overview:
      '부천 관광 스탬프 앱입니다. 기획과 백엔드 개발을 이끌면서 인프라 기반과 배포 자동화 파이프라인을 함께 구축했습니다.',
    role: '팀 리드, 기획, 백엔드 리드, 인프라·배포 자동화 오너',
    problem: [
      '수동적이고 파편화된 배포 절차로 인해 서버 간 릴리스 일관성이 떨어지고 운영 부담이 증가했습니다.',
      'Public/Private 서브넷 구조에서 접근 경로와 배포 소유권이 명확하게 정의되지 않았습니다.',
    ],
    approach: [
      'Bastion Host, NAT Gateway, ALB를 활용한 Public/Private 서브넷 아키텍처를 설계했습니다.',
      'Jenkins와 AWX를 결합해 다중 서버 배포와 환경 변수 관리를 표준화했습니다.',
      'Prometheus와 Grafana 관측 체계를 통합해 배포 후 검증 시간을 단축했습니다.',
    ],
    outcomes: [
      '배포 시간을 30분에서 10분 이내로 단축',
      '6단계 수동 배포 프로세스를 자동화',
      '다중 서버 배포 절차 표준화',
    ],
    learnings: [
      '안정적인 배포 자동화는 빌드 스크립트뿐 아니라 명확한 실행 소유권과 접근 경로에서 시작됩니다.',
      '관측 가능성이 같은 워크플로우 안에 내재될 때 자동화가 실질적인 운영 이득으로 이어집니다.',
    ],
    architectureNotes: [
      'Internet -> ALB -> Nginx / App',
      'Private Subnet deployment path controlled through Bastion Host and NAT Gateway',
      'Jenkins -> AWX -> Multi Server Deploy',
    ],
    troubleshooting: [
      {
        title: 'Jenkins DinD 메모리 압박 완화',
        problem: '단일 Jenkins 노드에서 빌드와 배포를 함께 수행해 메모리 고갈과 파이프라인 중단이 발생했습니다.',
        analysis:
          '빌드 컨테이너와 캐시가 컨트롤러 노드에 누적되며 부하가 커졌고, 장애가 CI/CD 전반으로 전파됐습니다.',
        action:
          'Jenkins 컨트롤러와 에이전트 책임을 분리하고, 에이전트를 격리된 Docker-in-Docker 실행 환경으로 이전했으며, 배포 책임은 AWX로 위임했습니다.',
        result:
          '컨트롤러 메모리가 안정화됐고, 빌드 실패가 전체 릴리스 흐름을 막는 구조적 리스크가 크게 줄었습니다.',
      },
    ],
  },
  {
    slug: 'oldyoung',
    title: 'OldYoung',
    subtitle: '소득 분위 기반 복지 추천 애플리케이션',
    summary: '복지 추천 흐름, 배포 환경, AI 챗봇 연동을 아우르는 프로젝트',
    focus: '간단한 입력만으로 복지 정보를 빠르게 찾을 수 있는 플로우 설계',
    techStack: ['Spring Boot 3.5', 'Java 17', 'OpenAI-bom:1.0', 'Redis', 'AWS'],
    overview:
      '소득 분위 기준으로 노인 복지 혜택을 추천하는 RAG 기반 애플리케이션입니다. PM, 기획, 백엔드 개발, 배포 환경 구축, AI 챗봇 구현을 담당했습니다.',
    role: 'PM, 기획, 백엔드 엔지니어링, 배포 환경 구축, AI 챗봇 개발',
    problem: [
      '복지 정보를 직접 탐색하기 어려워, 사용자에게는 입력 중심의 단순한 진입 흐름이 필요했습니다.',
      '추천 흐름과 조회 흐름이 분리되면 챗봇 응답과 혜택 탐색이 서로 단절될 수 있었습니다.',
    ],
    approach: [
      '사용자 입력 → 소득 분위 계산 → 관련 혜택 결과로 이어지는 단순한 경로를 설계했습니다.',
      '챗봇 응답과 혜택 조회를 동일한 입력 기반 정보 구조 위에서 통합했습니다.',
      '검증과 데모 준비 시간을 줄이기 위해 배포 환경을 병행 구축했습니다.',
    ],
    outcomes: [
      '사용자 입력을 소득 분위 계산과 혜택 매칭으로 연결하는 추천 흐름 구현',
      '노인 복지 시설 조회와 챗봇 응답을 하나의 통합된 사용자 흐름으로 제공',
    ],
    learnings: [
      '추천 상품에서는 모델의 정교함보다 명확한 입력 경험이 더 중요한 경우가 많습니다.',
      '기획·디자인·백엔드·배포를 함께 정렬하면 사용자 흐름 품질과 운영 준비도가 동시에 향상됩니다.',
    ],
    architectureNotes: [
      'User Input -> Income Decile Calculation -> Welfare Match',
      'Chatbot Response and Benefit Lookup share the same input-driven flow',
    ],
    troubleshooting: [
      {
        title: '추천과 조회 흐름 분리 방지',
        problem: '복지 추천과 상세 조회가 별도 흐름으로 보이면서, 사용자가 결과를 서로 연결 짓기 어려웠습니다.',
        analysis:
          '단계별로 입력 데이터가 다르게 해석되면서 추천 근거와 조회 결과가 서로 다른 맥락으로 나타났습니다.',
        action:
          '소득 분위 계산, 혜택 조회, 챗봇 응답이 모두 같은 입력 기반 흐름을 공유하도록 정보 모델을 정렬했습니다.',
        result: '입력부터 최종 결과 해석까지 일관된 사용자 컨텍스트를 구축했습니다.',
      },
    ],
  },
  {
    slug: 'kubernetes-parking',
    title: 'Kubernetes',
    subtitle: '주차 관리 서비스',
    summary: '지연과 장애 격리를 함께 다뤄 실제 운영에 맞게 서비스 아키텍처를 개선',
    focus: '일관성과 장애 경계를 유지하면서 지연을 약 30% 개선',
    techStack: ['Django', 'Kubernetes', 'Saga Pattern', 'Circuit Breaker'],
    overview:
      'Kubernetes 기반 주차 관리 서비스에서, 일관성을 유지하면서 장애를 격리할 수 있도록 서비스 간 구조를 프로덕션 수준으로 재설계했습니다.',
    role: '서비스 아키텍처 개선 및 운영 안정성 확보',
    problem: [
      '서비스 간 지연과 연쇄 장애 위험이 운영 안정성을 해치고 있었습니다.',
      '아키텍처는 일관성 요구사항과 장애 격리를 동시에 만족해야 했습니다.',
    ],
    approach: [
      'Saga 패턴과 Circuit Breaker를 결합해 서비스 책임과 장애 경계를 분리했습니다.',
      '안정적인 Kubernetes 운영을 위해 배포와 서비스 연결 패턴을 재구성했습니다.',
    ],
    outcomes: ['기존 구조 대비 서비스 간 지연 약 30% 감소', '운영적으로 안정적인 서비스 아키텍처 확립'],
    learnings: [
      '일관성과 장애 경계를 먼저 설계할 때 지연 개선 효과가 더 크게 나타납니다.',
      '운영 품질은 정상 흐름보다 장애 시나리오에서 더 명확하게 드러납니다.',
    ],
    architectureNotes: [
      'Service A -> Saga Orchestrator -> Service B (compensating transaction on failure)',
      'Circuit Breaker isolates high-latency zones from cascading failure',
    ],
    troubleshooting: [
      {
        title: '지연 영역과 장애 전파 분리',
        problem: '한 서비스의 지연이 다른 서비스로 전파되며 전체 응답 품질이 저하됐습니다.',
        analysis:
          '서비스 경계에서 호출 실패가 격리되지 않아 대기 시간이 누적되고 일관성 처리가 더 복잡해졌습니다.',
        action: '더 엄격한 장애 경계와 보상 트랜잭션 흐름을 설계해 고지연 영역을 국소화했습니다.',
        result: '운영 안정성을 유지하면서 서비스 간 지연을 약 30% 감소시켰습니다.',
      },
    ],
  },
  {
    slug: 'catxi',
    title: 'CATXI',
    subtitle: 'JWT 인증 아키텍처 개선',
    summary: '필터 내 토큰 재발급으로 네트워크 왕복과 인증 지연을 감소',
    focus: '네트워크 왕복 3 -> 1, 인증 지연 68ms -> 3ms',
    techStack: ['Spring Security', 'JWT', 'Redis', 'OAuth2', 'AWS'],
    overview:
      '대학 카풀 애플리케이션의 인증 아키텍처를 개선했습니다. 만료 토큰 처리와 재발급 흐름을 필터 체인 단계에서 재설계했습니다.',
    role: '백엔드 리드, 인증·인가 아키텍처',
    problem: [
      '만료된 AccessToken 요청이 DispatcherServlet까지 도달해 인증 실패 처리 비용이 증가했습니다.',
      '별도의 재발급 API로 인해 불필요한 네트워크 왕복과 인증 지연이 발생했습니다.',
    ],
    approach: [
      'JwtFilter 내부에서 ExpiredJwtException을 직접 처리해 컨트롤러 진입 전에 재인증이 이루어지도록 했습니다.',
      'Redis에서 RefreshToken을 검증하고, 유효할 경우 새로 발급한 토큰을 응답 헤더로 반환했습니다.',
      'API 흐름이 끊기지 않도록 필터 체인 내에서 SecurityContext를 재구성했습니다.',
    ],
    outcomes: ['네트워크 왕복을 3회에서 1회로 감소', '인증 지연을 68ms에서 3ms로 감소'],
    learnings: [
      '인증 최적화에서는 토큰 저장 방식보다 예외 처리 위치가 더 중요한 경우가 많습니다.',
      '동일한 요청 경로 내에서 토큰 재발급을 완료하면 성능과 클라이언트 단순성이 함께 개선됩니다.',
    ],
    architectureNotes: [
      'Client -> JwtFilter -> (expired) Redis RefreshToken Validate -> Reissue',
      'New AccessToken / RefreshToken returned in response headers, SecurityContext rebuilt in-chain',
    ],
    troubleshooting: [
      {
        title: '필터 체인 내부에서 만료 토큰 처리',
        problem: '만료된 토큰이 컨트롤러 단계까지 도달해, 401 응답과 토큰 재발급이 별도 호출로 분리됐습니다.',
        analysis:
          '재발급이 별도 API에 의존하면서 세 번의 왕복, 높은 인증 지연, 더 복잡한 요청 흐름이 발생했습니다.',
        action:
          'JwtFilterChain 내부에서 만료 토큰을 감지하고, RefreshToken을 검증한 뒤 AccessToken/RefreshToken을 재발급해 같은 응답에 즉시 반영했습니다.',
        result: '인증이 단일 요청 안에서 완료됐고, 인증 지연이 68ms에서 약 3ms로 감소했습니다.',
      },
    ],
  },
]
