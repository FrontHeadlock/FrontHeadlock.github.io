import type { Project } from './types'

// 순서 = 화면 순서. 재직 중 사내 프로젝트를 앞에, 학부 프로젝트를 뒤에 둔다.
// 사내 프로젝트에는 고객사명·SoC 프로젝트명·내부 식별자를 쓰지 않는다.
// 개요·문제·접근·트러블슈팅 본문의 줄바꿈("\n")은 화면에서 그대로 줄이 나뉜다(whitespace-pre-line).
export const projects: Project[] = [
  {
    slug: 'agentic-ops',
    title: 'AI Agent Platform',
    kind: '사내',
    period: '2026',
    subtitle: 'ITSM 반복 요청 자동화 에이전트 플랫폼',
    summary: 'ITSM으로 들어오는 반복 업무를 4단계에 거쳐 처리하는 AI 에이전트 플랫폼',
    focus: 'AI로 분류 및 계획, 규칙기반 코드를 활용한 실행 (일 평균 **3시간 반복 업무를 30분으로 개선**)',
    techStack: ['Python', 'LangChain', 'vLLM', 'Qwen3', 'Jira Service Management', 'Gerrit', 'OpenLDAP'],
    overview:
      '사내 인프라를 운영하며 ITSM으로 매일 비슷하게 들어오는 Gerrit 권한과 LDAP 계정 요청을 처리하느라 인프라 개선에 쓸 시간이 부족했습니다.\n실패해도 복구 가능한 업무부터 시작해 유휴 서버에 Qwen3를 vLLM으로 서빙하며 LangChain 기반 에이전트가 요청을 분류하고 계획을 만들게 했습니다.',
    role: '1인 개발 (기획부터 설계 및 구현, 운영)',
    problem: [
      '계정·권한 등의 반복 요청은 사소하지만 연구원들의 개발과 직결돼,\n바로 대응해야 했고 하루 평균 3시간에서 그 이상을 소비해야 했습니다.',
      '실제 운영 계정과 권한을 바꾸는 리스크가 큰 작업이라 LLM이 만든 계획을 그대로 실행 시 그 파장이 클 수 있었습니다.',
    ],
    approach: [
      '요청을 유형별로 분석해 반복성이 높고 실패해도 복구 가능한 업무부터 자동화 대상으로 선별했습니다.',
      'Router Agent가 요청 유형을 판단해 담당 Sub-Agent에 배정하고 Sub-Agent가 작업 계획 초안을 만드는 구조로 설계했습니다.',
      'AI는 분류와 계획까지만 맡기고 실행은 규칙기반 코드로 분리했습니다.\n담당자가 Teams에서 계획 카드를 승인한 뒤 dry-run을 통과한 작업만 실행합니다.',
    ],
    outcomes: [
      '일 평균 **3시간이 들던 반복 업무를 30분 수준으로 단축**',
      '승인과 검증 없는 실행을 처음부터 막는 가드레일 도입',
      '확보한 시간을 인프라 개선에 재배분',
    ],
    architectureNotes: [
      'ITSM request -> Router Agent (classify) -> Sub-Agent (plan draft)',
      'Plan card -> Teams approval -> dry-run -> deterministic executor (Gerrit / LDAP)',
      'Qwen3-8B served with vLLM (CPU backend) on an idle 8-core / 64 GB server',
      'Sequential request queue, ticket-ID idempotency, up to 3 retries per call',
    ],
    troubleshooting: [
      {
        title: 'GPU 없는 8코어·64 GB 유휴 서버에서의 vLLM 서빙 안정화',
        problem: '에이전트용 추론 서버로 쓸 수 있는 자원은 GPU가 없는 8코어·64 GB 유휴 서버 한 대뿐이었습니다.\n처음 올린 더 큰 모델은 요청 하나에도 응답이 너무 느렸고, 요청이 몇 건만 겹쳐도 모든 응답이 함께 늘어져 자동화의 이점이 사라졌습니다.',
        analysis: 'GPU 없이 CPU로 추론하면 메모리 대역폭이 병목이라 모델이 클수록 토큰 생성 속도가 그대로 떨어졌습니다.\n에이전트는 요청 하나에 Router Agent와 Sub-Agent 순으로 LLM을 여러 번 호출하는데, 여러 요청이 동시에 들어오면 이 호출들이 한 서버의 CPU를 나눠 쓰며 서로를 늦췄습니다.',
        action: '모델을 Qwen3-8B로 낮췄습니다. 분류와 계획 초안은 일관성이 중요한 작업이라 큰 모델의 이득이 작았고, 실행은 어차피 규칙기반 코드가 맡았습니다.\nthinking 모드는 유지하되 출력 토큰 상한을 걸어 한 호출의 길이를 예측할 수 있게 했습니다.\n병렬 처리를 막고 순차 큐로 요청을 하나씩 처리하게 바꿨으며, 티켓 고유 번호로 멱등성을 챙겨 같은 요청이 두 번 실행되지 않게 했습니다. 실패한 호출은 최대 3회까지 재시도합니다.',
        result: 'GPU 없는 서버 한 대로 일 평균 **3시간 걸리던 반복 업무를 30분 수준으로** 줄였고, 요청이 몰려도 하나씩 안정적으로 처리됩니다.\n외부 API 없이 사내 폐쇄망 안에서 추론 비용 없이 운영하고 있으며, 추론 서버가 에이전트와 분리돼 있어 GPU 서버를 확보하면 모델만 바꿔 끼울 수 있습니다.',
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
    focus: '증설 없이 **볼륨 사용률 약 15% 개선**. 수습하는 운영에서 먼저 발견하는 운영으로',
    techStack: ['NetApp ONTAP', 'NetApp Harvest', 'Prometheus', 'Grafana', 'ONTAP REST API', 'Python'],
    overview:
      '하드웨어 비용 때문에 확장이 제한된 ONTAP 스토리지에서 Aggregate에 여유가 남아 있어도 개별 논리 Volume이 가득 차 사용자 job이 멈추는 일이 발생했습니다.\n이를 극복하고자 Aggregate·Volume·qtree 단위의 용량 지표를 수집하고 Grafana로 추이를 보며 원인을 찾았습니다.',
    role: '모니터링 체계 구축 (2인). 지표 설계와 수집 구성, 회수·조정 기준 수립',
    problem: [
      'Aggregate에는 공간이 남아 있는데 Volume이 가득 차 job이 중단됐고 데이터를 지워도 공간이 돌아오지 않았습니다.',
      '어느 계정이 얼마나 쓰는지 보이지 않아 증설 요청과 할당 판단 근거가 미흡했습니다.',
      '사용자들에게 할당된 공간을 회수할 근거와 의사결정의 근거가 미흡했습니다.',
    ],
    approach: [
      'NetApp Harvest와 Prometheus로 Aggregate, Volume, qtree 단위 용량 지표를 수집하고 Grafana로 시각화했습니다.',
      'space-guarantee 설정에 따른 예약 용량과 논리 사용량, 실제 점유량을 구분하고 Snapshot 예약·초과 사용량과 계정별 quota 추이를 함께 추적했습니다.',
      'ONTAP EMS 이벤트를 수집해 용량 변화와 장애 시점의 운영 기록을 시각화하였습니다.',
      'ONTAP API로 계정별 사용량을 조회하는 기능을 만들어 쏠린 사용량부터 정리했습니다.',
    ],
    outcomes: [
      'Thick Volume의 Thin 전환과 유휴 Volume 회수로 증설 없이 Aggregate 실제 여유 공간 **약 30 TiB 확보**',
      '유휴 Thick Volume 회수로 기존 집계 기준 **볼륨 사용률 약 15% 개선**',
      '중복 제거율, 논리·물리 사용량, Aggregate 여유를 함께 보는 NVMe Volume 크기 조정 기준 수립',
      '증설 없이 개발 환경을 유지하고 지표를 서버·스토리지 할당과 HW 도입 판단의 근거로 사용',
    ],
    architectureNotes: [
      'ONTAP -> NetApp Harvest -> Prometheus -> Grafana (aggregate / volume / qtree / snapshot)',
      'ONTAP EMS -> operational event log alongside capacity trends',
      'ONTAP REST API -> per-account usage lookup',
    ],
    troubleshooting: [
      {
        title: 'space-guarantee 예약에 묶인 NVMe Aggregate 공간',
        problem: 'NVMe Aggregate의 물리 사용량에는 여유가 있는데도 가용 공간이 바닥나 Volume을 새로 만들거나 늘릴 수 없었고, 그 사이 개별 Volume이 가득 차 사용자 job이 멈췄습니다.\n증설이 막힌 환경이라 하드웨어를 더하는 대신 이미 있는 공간을 되찾아야 했습니다.',
        analysis: '대부분의 Volume이 space-guarantee volume(Thick)으로 만들어져 실제 쓴 양과 무관하게 Volume 크기 전체가 Aggregate에서 예약돼 있었습니다.\nNVMe 계열은 inline 중복 제거·압축·compaction이 켜져 있어 Volume 안에서는 데이터가 크게 줄었지만, Thick 예약 탓에 그 절감분이 Aggregate 여유 공간으로 돌아오지 않았습니다.\nHarvest로 Aggregate·Volume·qtree 지표를 겹쳐 보고 나서야 예약 용량, 논리 사용량, 물리 점유량의 차이가 어디서 생기는지 확인할 수 있었습니다.',
        action: 'Volume마다 space-guarantee, 논리 사용량, 물리 점유량, 중복 제거·압축 절감률을 수집해 예약은 크지만 실제 점유가 작은 Volume부터 골라냈습니다.\n활성 Volume은 space-guarantee를 none(Thin)으로 바꾸고 autosize 상한을 두어 절감분이 Aggregate로 돌아오게 했고, 유휴 Thick Volume은 사용자와 확인한 뒤 축소하거나 회수했습니다.\nThin 전환으로 생기는 overcommit 위험은 Aggregate 사용률, Volume 증가 추이, Snapshot 예약 초과 알림을 Prometheus 규칙으로 걸어 감당했고, 단계마다 Aggregate 가용 공간 지표로 효과를 확인했습니다.',
        result: '증설 없이 Aggregate 실제 여유 공간을 기존 대비 **약 30 TiB** 끌어올렸고, 멈춰 있던 Volume 확장과 신규 할당을 다시 진행할 수 있었습니다.\n절감률과 논리·물리 사용량을 함께 보는 NVMe Volume 크기 조정 기준이 생겨 이후 할당 요청과 HW 도입 판단의 근거로 쓰고 있습니다.',
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
      '사내 80여 대 개발 서버에 라이선스와 개발 툴을 담당자가 서버마다 수동 설치하던 방식은 버전과 설정이 서버별로 달라지고 실수가 잦았습니다.\n전체 서버를 그룹별 Inventory로 정리하고 4단계 플레이북으로 배포를 다시 짰습니다.',
    role: '배포 체계 설계와 플레이북 작성, 운영 적용',
    problem: [
      '수동 설치는 서버마다 버전과 설정이 달라졌고 어디까지 적용됐는지 추적할 수 없었습니다.',
      '서버별 셸 스크립트는 실행 중 실패하면 반쯤 적용된 상태로 멈춰 되돌릴 방법이 없었습니다.',
      '배포 대상의 기준이 될 사내 서버 관리대장조차 일부 서버가 빠지거나 잘못 적혀 있어 어디에 배포해야 하는지부터 불확실했습니다.',
    ],
    approach: [
      '관리대장을 실제 서버와 대조해 바로잡고 전체 서버를 그룹 구조의 Inventory로 정리해 배포 대상을 명확히 했습니다.',
      '사전점검 단계에서 권한, 디스크 여유, 접속 가능 여부를 먼저 확인해 실패 원인을 배포 전에 걸러냈습니다.',
      '스테이징에서 일부 서버에 먼저 적용해 확인한 뒤 전체로 확산하고 실패하면 이전 상태로 되돌리는 롤백 단계를 두었습니다.',
      '호스트별 실행 결과를 남겨 어디까지 적용됐는지 추적할 수 있게 했습니다.',
    ],
    outcomes: ['서버마다 달랐던 수작업 배포를 표준화해 휴먼 에러 감소', '같은 배포를 반복 실행해도 결과가 같은 멱등 배포 기반 확보'],
    architectureNotes: [
      'Inventory (grouped) -> pre-check -> staging (subset) -> deploy (all) -> rollback (on failure)',
      'Per-host execution results recorded for rollout tracking',
      'Distro differences in group_vars; a second run must report changed=0 to pass staging',
    ],
    troubleshooting: [
      {
        title: 'Ubuntu·Rocky·Oracle 혼재 환경에서 다시 돌려도 바뀌지 않는 플레이북',
        problem: '80여 대에 Ubuntu, Rocky, Oracle Linux가 섞여 있어 패키지 관리자, 설치 경로, 서비스 이름이 서버마다 달랐습니다.\n기존 설치 절차를 옮긴 초기 플레이북은 shell·command 태스크 위주라 이미 설치된 서버에서도 매번 changed로 보고돼, 실행 결과만으로는 어디까지 적용됐는지 알 수 없었습니다.',
        analysis: 'shell 모듈은 결과를 따로 판정하지 않으면 항상 변경으로 보고하므로 실행 로그의 changed가 실제 변경을 뜻하지 않았습니다.\n배포판 차이를 태스크마다 when 분기로 풀면 같은 태스크가 배포판 수만큼 늘어나고, 새 버전이 들어올 때마다 모든 분기를 손봐야 했습니다.',
        action: '배포판별 패키지 이름, 경로, 서비스 이름은 group_vars로 옮겨 태스크 본문을 하나로 유지했습니다.\n대부분의 shell 태스크를 package, copy, template, systemd, lineinfile 같은 전용 모듈로 바꾸고, 모듈로 대체할 수 없는 설치 스크립트는 설치 여부를 먼저 확인한 뒤 실행하게 했습니다.\n같은 서버에 플레이북을 두 번 돌려 두 번째 실행이 changed=0인지를 스테이징 단계의 통과 기준으로 두었습니다.',
        result: '배포판 3종을 하나의 플레이북으로 다루게 됐고, 재실행해도 **changed=0**이 유지되면서 실행 로그의 changed가 실제 변경만 뜻하게 됐습니다.\n덕분에 실패한 서버만 골라 다시 돌리는 부분 재배포가 가능해졌습니다.',
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
    focus: 'ALB Blue/Green 무중단 배포. 배포 시간 **30분에서 10분 이내로**',
    techStack: ['AWS (VPC, ALB, NAT, EC2)', 'Jenkins', 'Docker', 'Ansible AWX', 'Spring Boot', 'MySQL', 'Redis'],
    overview:
      '부천시 관광 진흥을 위한 스탬프 앱입니다.\n팀 리드와 개발 파트장으로 AWS 인프라 설계와 배포 자동화를 맡았고 이 결과로 교내 전공역량 경진대회 최우수상을 받았습니다.',
    role: '팀 리드, PM, 개발 파트장. AWS 인프라 설계와 Jenkins·AWX 배포 파이프라인 담당',
    problem: [
      '앱 서버를 외부에 노출하지 않아야 했는데 App·Jenkins·AWX 서버 중 무엇을 열고 무엇을 숨길지 경계가 정해져 있지 않았습니다.',
      '수동 배포는 느린 것도 문제였지만 같은 절차를 매번 같게 재현하기 어려웠습니다.\nApp 서버 2대에 이미지 배포, 환경 변수 주입, health check, 트래픽 전환이 사람 손에 달려 있었습니다.',
    ],
    approach: [
      '2개 VPC와 Public/Private Subnet을 나누고 외부 유입은 ALB로만 받고 관리 접속은 Bastion, 외부 통신은 NAT Gateway로 한정했습니다.',
      'Jenkins를 Master-Agent로 나눠 빌드를 Docker-in-Docker로 격리하고 배포는 Ansible AWX로 넘겨 서버별 환경 변수를 중앙에서 관리했습니다.',
      '빌드, 이미지 생성, AWX 템플릿 실행, health check, ALB 대상 전환 순으로 파이프라인을 잇고 Discord 알림과 실패 시 롤백을 붙였습니다.',
    ],
    outcomes: [
      '배포 시간을 **30분에서 10분 이내로 단축**',
      '6단계 수동 배포를 하나의 자동화 흐름으로 전환',
      'ALB LeastConnection 기반 Blue/Green 무중단 배포 구성',
      '교내 **전공역량 경진대회 최우수상** (2025.11)',
    ],
    architectureNotes: [
      'Internet -> ALB -> App EC2 x2 (Private Subnet)',
      'Bastion -> private servers; NAT Gateway -> outbound only',
      'Jenkins Master -> Agent (DinD build) -> AWX template -> health check -> ALB target switch',
    ],
    troubleshooting: [
      {
        title: 'Jenkins 컨테이너의 Docker Hub Push 실패',
        problem: 'Jenkins 파이프라인에서 이미지 빌드와 Docker Hub push 단계가 Docker 데몬에 연결할 수 없다는 오류로 실패했습니다.\nt2.micro 1 GiB 메모리에서 Jenkins 컨테이너 안에 Docker 데몬을 하나 더 띄우는 DinD는 dockerd·containerd가 중복 상주해 OOM 위험이 컸습니다.',
        analysis: 'Jenkins 컨테이너의 마운트 네임스페이스에 호스트의 /var/run/docker.sock이 없어 Docker CLI가 데몬을 찾지 못했습니다.\n소켓을 마운트한 뒤에는 오류가 permission denied로 바뀌었는데, 소켓 권한이 660·group 986인 반면 컨테이너의 jenkins 사용자(gid 1000)는 그 그룹 밖이었습니다.',
        action: 'DinD 대신 호스트 데몬을 공유하는 DooD를 택해 /var/run/docker.sock을 같은 경로로 bind mount했습니다. chmod 666은 소켓을 호스트 전체에 여는 것이라 제외했습니다.\n컨테이너 안에 GID 986 그룹을 만들어 jenkins를 추가하고 재시작했습니다. 커널은 그룹 이름이 아니라 GID 숫자로 권한을 판정하므로 그룹 이름은 호스트와 달라도 됩니다.\n단계마다 같은 docker ps 명령으로 오류가 cannot connect → permission denied → 정상으로 바뀌는지 보며 가설을 검증했습니다.',
        result: '빌드 #6에서 Docker Hub push를 포함한 전 스테이지가 통과했고, 같은 이미지가 호스트 데몬에 남아 추가 데몬 없이 메모리 기준을 지킨 것을 확인했습니다.\n소켓 공유는 호스트 권한을 넘기는 일이라 빌드 Agent에만 마운트하고 CI 노드와 운영 컨테이너를 분리하는 것을 원칙으로 두었고, socket proxy로 허용 API를 build·push 계열로 좁히거나 rootless BuildKit으로 옮기는 안을 잔여 리스크 대응으로 남겼습니다.',
      },
    ],
  },
  // 2026-11-02 원고 지시: CATXI는 잠시 주석 처리. 다시 보이려면 아래 블록 주석을 풀고 App.test.tsx의 카드 수 단언을 맞춘다.
  /*
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
      '가톨릭대학교 학생 대상 택시 동승 앱입니다.\n백엔드에서 인증·인가 축을 맡아 Kakao 로그인부터 토큰 폐기까지를 설계했고 선착순 이벤트 도입 뒤 인증 구간 성능을 개선했습니다.',
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
  */
]
