import type { Project } from './types'

// 순서 = 화면 순서. 재직 중 사내 프로젝트를 앞에, 학부 프로젝트를 뒤에 둔다.
// 사내 프로젝트에는 고객사명·SoC 프로젝트명·내부 식별자를 쓰지 않는다.
export const projects: Project[] = [
  {
    slug: 'agentic-ops',
    title: 'AI Agent Platform',
    kind: '사내',
    period: '2026',
    subtitle: 'ITSM 반복 요청 자동화 에이전트 플랫폼',
    summary: 'ITSM으로 들어오는 계정·권한 반복 요청을 분류, 계획, 승인, dry-run을 거쳐 처리하는 AI 에이전트 플랫폼',
    focus: '판단은 AI, 실행은 결정론적 코드. 일 평균 3시간 걸리던 반복 업무를 30분으로',
    techStack: ['Python', 'LangChain', 'vLLM', 'Qwen3', 'Jira Service Management', 'Microsoft Teams', 'Gerrit', 'OpenLDAP'],
    overview:
      '사내 인프라를 운영하며 ITSM으로 매일 비슷하게 들어오는 Gerrit 권한과 LDAP 계정 요청을 처리하느라 인프라 개선에 쓸 시간이 부족했습니다. 실패해도 복구 가능한 업무부터 골라 유휴 서버에 Qwen3를 vLLM으로 서빙하고 LangChain 기반 에이전트가 요청을 분류하고 계획을 만들게 했습니다.',
    role: '기획, 설계, 구현, 운영 반영',
    problem: [
      '계정·권한 요청은 사소하지만 연구원 개발과 직결돼 바로 대응해야 했고 하루 평균 3시간이 여기에 들어갔습니다.',
      '실제 운영 계정과 권한을 바꾸는 작업이라 LLM이 만든 계획을 그대로 실행하면 되돌리기 어려운 변경이 생길 수 있었습니다.',
    ],
    approach: [
      '요청을 유형별로 분석해 반복성이 높고 실패해도 복구 가능한 업무부터 자동화 대상으로 선별했습니다.',
      'Router Agent가 요청 유형을 판단해 담당 Sub-Agent에 배정하고 Sub-Agent가 작업 계획 초안을 만드는 구조로 설계했습니다.',
      'AI는 분류와 계획까지만 맡기고 실행은 결정론적 코드로 분리했습니다. 담당자가 Teams에서 계획 카드를 승인한 뒤 dry-run을 통과한 작업만 실행합니다.',
    ],
    outcomes: [
      '일 평균 3시간이 들던 반복 업무를 30분 수준으로 단축',
      '승인과 검증 없는 실행을 처음부터 막는 가드레일 도입',
      '확보한 시간을 인프라 개선에 재배분',
    ],
    learnings: [
      'AI가 들어간 프로젝트는 기술 구현에 앞서 프로덕션에 적용할 가드레일부터 정해야 한다는 것을 배웠습니다.',
      '요청을 빨리 처리하는 것만으로는 맡은 일이 나아지지 않았습니다. 처리 방식을 바꾸고 나서야 시간이 생겼습니다.',
    ],
    architectureNotes: [
      'ITSM request -> Router Agent (classify) -> Sub-Agent (plan draft)',
      'Plan card -> Teams approval -> dry-run -> deterministic executor (Gerrit / LDAP)',
      'Qwen3 served with vLLM on an idle in-house server',
    ],
    troubleshooting: [
      {
        title: '비결정적 계획과 결정론적 실행의 분리',
        problem: '에이전트가 만든 계획을 그대로 실행하면 실제 운영 계정과 권한이 잘못 바뀔 수 있었고 일부 작업은 되돌리기 어려웠습니다.',
        analysis: 'LLM 출력은 매번 같지 않고 요청 문구가 조금만 달라도 해석이 달라질 수 있었습니다.',
        action:
          'AI 역할을 분류와 계획 초안으로 한정하고 실행은 정해진 코드가 맡게 했습니다. 담당자의 Teams 승인과 실행 직전 dry-run을 필수 단계로 두었습니다.',
        result: '승인과 검증을 통과한 작업만 반영되면서 운영 안정성을 유지한 채 일 평균 처리 시간을 3시간에서 30분으로 줄였습니다.',
      },
    ],
  },
  {
    slug: 'ontap-monitoring',
    title: 'ONTAP',
    kind: '사내',
    period: '2026',
    teamSize: '2인',
    subtitle: 'SoC 개발 환경 스토리지 용량 모니터링',
    summary: '확장이 막힌 ONTAP 스토리지에서 사용자 job이 중단되는 원인을 계층별 용량 지표로 드러내고 유휴 볼륨을 회수한 프로젝트',
    focus: '증설 없이 볼륨 사용률 약 15% 개선. 수습하는 운영에서 먼저 발견하는 운영으로',
    techStack: ['NetApp ONTAP', 'NetApp Harvest', 'Prometheus', 'Grafana', 'Fluent Bit', 'ONTAP REST API', 'Python'],
    overview:
      '하드웨어 비용 때문에 확장이 제한된 ONTAP 스토리지에서 Aggregate에 여유가 남아 있어도 개별 Volume이 가득 차 사용자 job이 멈추는 일이 반복됐습니다. 동료와 함께 Aggregate·Volume·qtree 단위의 용량 지표를 수집하고 Grafana로 추이를 보며 원인을 찾았습니다.',
    role: '모니터링 체계 구축 (2인). 지표 설계와 수집 구성, 회수·조정 기준 수립',
    problem: [
      'Aggregate에는 공간이 남아 있는데 Volume이 가득 차 job이 중단됐고 데이터를 지워도 공간이 돌아오지 않았습니다.',
      '어느 계정이 얼마나 쓰는지 보이지 않아 증설 요청과 할당 판단에 근거가 없었습니다.',
    ],
    approach: [
      'NetApp Harvest와 Prometheus로 Aggregate, Volume, qtree 단위 용량 지표를 수집하고 Grafana로 시각화했습니다.',
      'space-guarantee 설정에 따른 예약 용량과 논리 사용량, 실제 점유량을 구분하고 Snapshot 예약·초과 사용량과 계정별 quota 추이를 함께 추적했습니다.',
      'Fluent Bit으로 ONTAP EMS 이벤트를 수집해 용량 변화와 장애 시점의 운영 기록을 같은 화면에서 보게 했습니다.',
      'ONTAP API로 계정별 사용량을 조회하는 기능을 만들어 쏠린 사용량부터 정리했습니다.',
    ],
    outcomes: [
      '유휴 Thick Volume 회수로 기존 집계 기준 볼륨 사용률 약 15% 개선',
      '중복 제거율, 논리·물리 사용량, Aggregate 여유를 함께 보는 NVMe Volume 크기 조정 기준 수립',
      '증설 없이 개발 환경을 유지하고 지표를 서버·스토리지 할당과 HW 도입 판단의 근거로 사용',
    ],
    learnings: [
      '스토리지 용량 문제는 계층마다 다른 숫자를 같이 보고 나서야 원인이 보였습니다.',
      '지표를 갖춘 뒤로는 장애를 수습하기 전에 발견하는 운영이 가능해졌습니다.',
    ],
    architectureNotes: [
      'ONTAP -> NetApp Harvest -> Prometheus -> Grafana (aggregate / volume / qtree / snapshot)',
      'ONTAP EMS -> Fluent Bit -> operational event log alongside capacity trends',
      'ONTAP REST API -> per-account usage lookup',
    ],
    troubleshooting: [
      {
        title: 'Snapshot이 잠식한 Volume 공간',
        problem: '데이터를 삭제해도 Volume 공간이 회수되지 않았습니다. 예약 공간을 넘긴 Snapshot이 데이터 영역까지 차지해 job이 중단됐습니다.',
        analysis: 'Snapshot이 삭제 전 블록을 계속 보존하고 있었습니다. 예약 공간 초과분은 Volume의 데이터 영역에서 빠져나가고 있었습니다.',
        action: 'Snapshot 예약·사용량·초과 사용량을 함께 모니터링해 공간 부족 징후를 먼저 잡고 유휴 Thick Volume을 식별해 회수했습니다.',
        result: 'job 중단 원인을 Volume과 Snapshot 단위로 확인할 수 있게 됐고 볼륨 사용률을 약 15% 개선했습니다.',
      },
    ],
  },
  {
    slug: 'ansible-deploy',
    title: 'Ansible',
    kind: '사내',
    period: '2026',
    subtitle: '80여 대 개발 서버 Ansible 4단계 배포 체계',
    summary: '서버마다 수동으로 설치하던 라이선스와 개발 툴 배포를 사전점검·스테이징·배포·롤백 4단계 플레이북으로 표준화',
    focus: '실패를 전제로 한 배포. 적용 전 점검하고 일부에 먼저 넣으며 되돌릴 수 있게',
    techStack: ['Ansible', 'Linux (Ubuntu·Rocky·Oracle)', 'KVM', 'OpenStack', 'Shell'],
    overview:
      '사내 80여 대 개발 서버에 라이선스와 개발 툴을 담당자가 서버마다 수동 설치하던 방식은 버전과 설정이 서버별로 달라지고 실수가 잦았습니다. 전체 서버를 그룹별 Inventory로 정리하고 4단계 플레이북으로 배포를 다시 짰습니다.',
    role: '배포 체계 설계와 플레이북 작성, 운영 적용',
    problem: [
      '수동 설치는 서버마다 버전과 설정이 달라졌고 어디까지 적용됐는지 추적할 수 없었습니다.',
      '서버별 셸 스크립트는 실행 중 실패하면 반쯤 적용된 상태로 멈춰 되돌릴 방법이 없었습니다.',
    ],
    approach: [
      '전체 서버를 그룹 구조의 Inventory로 정리해 배포 대상을 명확히 했습니다.',
      '사전점검 단계에서 권한, 디스크 여유, 접속 가능 여부를 먼저 확인해 실패 원인을 배포 전에 걸러냈습니다.',
      '스테이징에서 일부 서버에 먼저 적용해 확인한 뒤 전체로 확산하고 실패하면 이전 상태로 되돌리는 롤백 단계를 두었습니다.',
      '호스트별 실행 결과를 남겨 어디까지 적용됐는지 추적할 수 있게 했습니다.',
    ],
    outcomes: ['서버마다 달랐던 수작업 배포를 표준화해 휴먼 에러 감소', '같은 배포를 반복 실행해도 결과가 같은 멱등 배포 기반 확보'],
    learnings: [
      '운영 변경은 실패를 전제로 설계해야 한다는 것을 확인했습니다. 점검과 부분 적용, 롤백을 넣고 나서야 자동화가 수작업을 대신할 수 있었습니다.',
    ],
    architectureNotes: [
      'Inventory (grouped) -> pre-check -> staging (subset) -> deploy (all) -> rollback (on failure)',
      'Per-host execution results recorded for rollout tracking',
    ],
    troubleshooting: [
      {
        title: '셸 스크립트에서 Ansible로',
        problem: '서버별 셸 스크립트로 설치하면 중간에 실패해도 다음 서버로 넘어가거나 반쯤 적용된 상태로 남았습니다.',
        analysis: '스크립트는 상태를 검증하지 않고 명령을 순서대로 실행할 뿐이었고 실패 처리와 복구가 스크립트마다 달랐습니다.',
        action: '상태 선언형인 Ansible로 옮기고 사전점검·스테이징·배포·롤백을 분리한 플레이북으로 구성했습니다.',
        result: '같은 플레이북을 반복 실행해도 결과가 같아졌고 실패한 호스트를 결과 기록에서 바로 찾아 되돌릴 수 있게 됐습니다.',
      },
    ],
  },
  {
    slug: 'geulda',
    title: 'Geulda',
    kind: '학부 팀 프로젝트',
    period: '2025.10 – 2025.11',
    subtitle: '부천 관광 스탬프 앱 인프라·배포 자동화',
    summary: 'AWS 인프라 설계와 Jenkins + AWX 배포 자동화로 6단계 수동 배포를 하나의 흐름으로 바꾼 프로젝트',
    focus: 'ALB Blue/Green 무중단 배포. 배포 시간 30분에서 10분 이내로',
    techStack: ['AWS (VPC, ALB, NAT, EC2)', 'Jenkins', 'Docker', 'Ansible AWX', 'Spring Boot', 'MySQL', 'Redis'],
    overview:
      '부천시 관광 진흥을 위한 스탬프 앱입니다. 팀 리드와 개발 파트장으로 AWS 인프라 설계와 배포 자동화를 맡았고 이 결과로 교내 전공역량 경진대회 최우수상을 받았습니다.',
    role: '팀 리드, PM, 개발 파트장. AWS 인프라 설계와 Jenkins·AWX 배포 파이프라인 담당',
    problem: [
      '앱 서버를 외부에 노출하지 않아야 했는데 App·Jenkins·AWX 서버 중 무엇을 열고 무엇을 숨길지 경계가 정해져 있지 않았습니다.',
      '수동 배포는 느린 것도 문제였지만 같은 절차를 매번 같게 재현하기 어려웠습니다. App 서버 2대에 이미지 배포, 환경 변수 주입, health check, 트래픽 전환이 사람 손에 달려 있었습니다.',
    ],
    approach: [
      '2개 VPC와 Public/Private Subnet을 나누고 외부 유입은 ALB로만 받고 관리 접속은 Bastion, 외부 통신은 NAT Gateway로 한정했습니다.',
      'Jenkins를 Master-Agent로 나눠 빌드를 Docker-in-Docker로 격리하고 배포는 Ansible AWX로 넘겨 서버별 환경 변수를 중앙에서 관리했습니다.',
      '빌드, 이미지 생성, AWX 템플릿 실행, health check, ALB 대상 전환 순으로 파이프라인을 잇고 Discord 알림과 실패 시 롤백을 붙였습니다.',
    ],
    outcomes: [
      '배포 시간을 30분에서 10분 이내로 단축',
      '6단계 수동 배포를 하나의 자동화 흐름으로 전환',
      'ALB LeastConnection 기반 Blue/Green 무중단 배포 구성',
      '교내 전공역량 경진대회 최우수상 (2025.11)',
    ],
    learnings: [
      '배포 자동화를 하며 빌드 스크립트를 짜기 전에 누가 어디서 실행하고 어느 경로로 접근하는지부터 정해야 했습니다.',
      'Blue/Green을 health check와 함께 묶고 나서야 자동화가 운영 가능한 배포 절차가 됐습니다.',
    ],
    architectureNotes: [
      'Internet -> ALB -> App EC2 x2 (Private Subnet)',
      'Bastion -> private servers; NAT Gateway -> outbound only',
      'Jenkins Master -> Agent (DinD build) -> AWX template -> health check -> ALB target switch',
    ],
    troubleshooting: [
      {
        title: 'Jenkins 단일 노드 메모리 부족',
        problem: '빌드와 배포를 한 Jenkins 서버에서 처리하다 메모리 부족이 반복돼 파이프라인이 끊겼습니다.',
        analysis: '빌드 컨테이너와 캐시가 컨트롤러 노드에 쌓였고 한 번의 장애가 CI/CD 전체로 번졌습니다.',
        action: '컨트롤러와 에이전트를 분리해 빌드를 격리된 Docker-in-Docker로 옮기고 배포 책임은 AWX로 넘겼습니다.',
        result: '컨트롤러 메모리가 안정됐고 빌드 실패가 릴리스 전체를 막는 구조적 위험이 줄었습니다.',
      },
    ],
  },
  {
    slug: 'catxi',
    title: 'CATXI',
    kind: '학부 팀 프로젝트',
    period: '2025.05 – 2025.12',
    teamSize: '8인 (백엔드 4인)',
    repoUrl: 'https://github.com/Team-Catxi/Catxi_BackEnd',
    subtitle: '캠퍼스 택시 동승 앱 인증·인가 아키텍처',
    summary: 'Kakao OAuth2·JWT·Redis로 인증 라이프사이클을 설계하고 필터 체인 안 토큰 재발급으로 인증 지연을 줄인 프로젝트',
    focus: '네트워크 왕복 3회에서 1회, 인증 지연 68ms에서 3ms',
    techStack: ['Spring Boot 3.3', 'Java 17', 'Spring Security', 'OAuth2', 'JWT', 'Redis', 'MySQL 8.0', 'AWS'],
    overview:
      '가톨릭대학교 학생 대상 택시 동승 앱입니다. 백엔드에서 인증·인가 축을 맡아 Kakao 로그인부터 토큰 폐기까지를 설계했고 선착순 이벤트 도입 뒤 인증 구간 성능을 개선했습니다.',
    role: '백엔드. 인증·인가 축 설계와 구현 (팀 8인, 백엔드 4인)',
    problem: [
      'AccessToken이 만료되면 401, 재발급 API, 원 요청 재시도로 왕복이 세 번 생겼고 RefreshToken 조회까지 더해져 인증 구간이 느렸습니다.',
      '로그인만 붙이는 수준으로는 재발급, 로그아웃, 차단 사용자, 관리자 권한까지 운영 정책을 담을 수 없었습니다.',
    ],
    approach: [
      '사용자 식별 기준을 email로 통일하고 AccessToken은 헤더로, RefreshToken은 HttpOnly 쿠키와 Redis(refresh:{email})로 분리했습니다.',
      'JwtFilter에서 ExpiredJwtException을 잡아 만료 Claims의 email로 RefreshToken을 검증하고 새 토큰을 응답 헤더로 내려준 뒤 같은 요청의 SecurityContext를 다시 세웠습니다.',
      '로그아웃 시 AccessToken 블랙리스트 등록과 RefreshToken 삭제, 회원 상태(ACTIVE/PENDING/INACTIVE)와 사용자 블랙리스트 확인을 필터에 넣고 RefreshToken rotation을 적용했습니다.',
    ],
    outcomes: [
      '네트워크 왕복을 3회에서 1회로 단축',
      '인증 지연을 68ms에서 3ms로 단축',
      '클라이언트가 재발급 로직을 따로 두지 않아도 돼 프론트엔드 복잡도 감소',
    ],
    learnings: [
      '인증 성능은 캐시 적용 없이 실패와 복구의 책임 위치를 옮기면서 나아졌습니다. 만료 토큰을 복구 가능한 상태로 보고 필터 안에서 바로 처리하자 인증 지연이 줄었습니다.',
      '토큰 수명주기와 사용자 상태 모델은 처음부터 같이 설계해야 유지보수 비용이 줄어든다는 것을 배웠습니다.',
    ],
    architectureNotes: [
      'Client -> JwtFilter -> (expired) email from claims -> Redis refresh:{email} validate -> rotate',
      'Authorization: Bearer {new} + X-Access-Token-Refreshed + Set-Cookie refresh; SecurityContext rebuilt in-chain',
      'Redis keys: refresh:{email}, blacklist:token:{accessToken}, blacklist:user:{userId}',
    ],
    troubleshooting: [
      {
        title: '필터 체인 내부에서 만료 토큰 처리',
        problem: '만료된 토큰이 컨트롤러까지 도달해 401 응답과 토큰 재발급이 별도 호출로 나뉘었습니다.',
        analysis: '만료는 서버 필터에서 잡히지 않고 클라이언트의 재요청 흐름에서야 감지됐습니다.',
        action: 'JwtFilter 안에서 만료를 잡아 RefreshToken을 검증하고 AccessToken과 RefreshToken을 재발급해 같은 응답에 실었습니다.',
        result: '인증이 단일 요청 안에서 끝났고 인증 지연이 68ms에서 약 3ms로 줄었습니다.',
      },
    ],
  },
]
