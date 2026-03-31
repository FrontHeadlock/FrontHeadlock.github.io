# 박규민 포트폴리오 디자인 명세

## 개요 (Overview)

- 주제: 데브옵스 엔지니어 박규민의 이력서 및 포트폴리오 웹사이트
- 작업 공간: `/Users/kyum/Desktop/vibe/cv/resume`
- 언어: 한국어 우선 (유용한 경우 제한적으로 영어 레이블 사용)
- 주요 목표: 채용 담당자가 몇 초 안에 기술적 강점, 구조적 판단력 및 측정 가능한 성과를 파악할 수 있도록 지원
- 부가 목표: 가독성을 해치지 않으면서 절제된 터미널 느낌의 아이덴티티로 작업물 소개

## 프로덕트 의도 (Product Intent)

이 사이트는 콘셉트 작품이 아닙니다. 데브옵스 엔지니어를 위한 채용 중심의 이력서 사이트입니다. 시각적인 완성도는 신뢰성을 뒷받침해야 하며 내용보다 눈에 띄어서는 안 됩니다.

디자인은 가급적 화면 초반에 다음 사항을 명확히 보여주어야 합니다:

1. 이 지원자는 시스템을 겉보기로 개선하는 것이 아니라 구조적으로 운영 시스템을 개선합니다.
2. 이 지원자는 자동화와 표준화를 통해 배포 시 발생하는 마찰을 줄입니다.
3. 이 지원자는 클라우드 인프라와 재현 가능한 배포 파이프라인을 설계할 수 있습니다.
4. 이 지원자는 장애의 근본 원인을 조사하고 도구 및 아키텍처 수준에서 시스템을 개선합니다.

## 소스 제약 사항 (Source Constraints)

모든 콘텐츠는 사용자가 프롬프트와 참조 이미지에서 명시적으로 제공한 사실에 기반해야 합니다.

이 빌드에 허용되는 사실 자료 출처:

- 이 스레드의 사용자 프롬프트
- 사용자가 제공한 연락처 링크
- 사용자가 제공한 프로젝트 순서
- 프로젝트 설명, 역할, 기술 스택, 날짜, 트러블슈팅 내용이 포함된 사용자가 제공한 스크린샷

금지 사항:

- 가상의 회사, 날짜, 기간, 인원수 또는 담당 업무 창작
- 실제처럼 보이는 임의의 플레이스홀더 외부 URL 사용
- 가짜 코드 스니펫
- 인프라, 성능 또는 프로젝트 범위에 관한 근거 없는 주장
- RPC 또는 gRPC에 대한 직접적인 언급

## 선택된 기술 방향 (Chosen Technical Direction)

### 결정 사항
`resume` 폴더 내에 `Vite + React + TypeScript` 기반의 새로운 싱글 페이지 애플리케이션(SPA)을 구축. `Tailwind CSS`로 스타일링하고, `Framer Motion`으로 애니메이션을 적용하며, data, hooks, components, utilities 단위로 모듈화.

### 이 방향을 선택한 이유
- 요청된 스택이 React + Tailwind + Framer Motion임.
- 스크롤에 따른 나타남 효과(reveal), 타이핑되는 히어로 텍스트, 호버 상태, 확장 가능한 프로젝트 세부 정보, 캔버스 배경 등 상호작용이 많은 섹션이 있음.
- `ukint-vs.github.io`는 정보를 우선시하는 구성과 절제된 모션의 훌륭한 레퍼런스지만, 해당 프로젝트의 Astro 구조는 이번 요청에 직접적인 기반으로 적합하지 않음.
- `pretext`는 UI 시작점은 아니지만 다음과 같은 중요한 원칙을 강화해 줌: 가독성과 텍스트 레이아웃 안정성이 장식적인 효과보다 우선함.

### 주변 프로젝트에서 차용할 개념적 요소

`ukint-vs.github.io`에서 차용:
- 명확한 최상위 섹션 흐름
- 강력한 타이포그래피와 간격에 대한 규칙
- 가벼운 텍스트 스크램블 / 디코드 느낌
- 콘텐츠 뒤에서 배경으로만 머무는 장식 요소

`pretext`에서 차용:
- 줄바꿈이나 읽는 흐름을 방해하는 애니메이션 사용 지양
- 빽빽한 텍스트 블록은 쉽게 읽을 수 있도록 안정적으로 유지
- 텍스트 렌더링 및 간격을 최우선 프로덕트 요소로 취급

## 정보 아키텍처 (Information Architecture)

사이트는 앵커 네비게이션 방식의 단일 페이지 이력서 흐름으로 구성됩니다:

1. 홈 (Home)
2. 소개 (About)
3. 경험 (Experience)
4. 프로젝트 (Projects)
5. 기술 스택 (Tech Stack)
6. 연락처 (Contact)

섹션 순서의 의도:
- `히어로 파트(Home)`: 역할과 측정 가능한 성과를 빠르게 각인.
- `소개(About)`: 지원자가 문제를 어떻게 해결하는지 프레임 설정.
- `경험(Experience)`: 시간 흐름에 따른 상황 및 경력의 신뢰성 제공.
- `프로젝트(Projects)`: 실질적 증명(증거) 제시.
- `기술 스택(Tech Stack)`: 기술 면접관이 직무 적합성을 검증할 수 있도록 도움.
- `연락처(Contact)`: 증명 위주의 내러티브를 끊지 않고 사이트를 마무리.

## 콘텐츠 모델 (Content Model)

### 히어로 파트 (Hero)

필수 포함 내용:
- 이름: `박규민 / Kyumin Park`
- 역할: `DevOps Engineer / Cloud & CI/CD Engineer`
- 구조, 자동화, 운영 안정성에 초점을 맞춘 짧은 요약
- 핵심 지표(Metrics) 카드:
  - 배포 시간: `30m -> under 10m`
  - 인증 지연 시간: `68ms -> 3ms`
  - 네트워크 왕복 횟수: `3 -> 1`
  - 서비스 지연 시간: `약 30% 감소`
  - JenkinsCI/Docker Repository OpenSource Contribution
- 링크:
  - GitHub: `https://github.com/FrontHeadlock`
  - Blog: `https://frontheadlock.tistory.com/`
  - Email: `southvi1@naver.com`
  - LinkedIn: `linkedin.com/in/kyumin19/?skipRedirect=true`

이력서 PDF는 허위로 제공되지 않아야 함. UI에서는 다운로드 링크 대신 비활성화되거나 플레이스홀더 형태의 버튼을 노출.

### 소개 (About)

다음 내용을 요약해야 함:
- 단순히 증상을 복구하는 것이 아닌 구조적 문제 해결
- 배포 자동화 및 운영 표준화
- 클라우드 인프라 설계 및 재현 가능한 배포 체계
- 도구 및 파이프라인 수준의 근본 원인 분석

이 섹션은 간결하고 채용에 초점을 맞춰 구성되어야 함.

### 경험 (Experience)

스크린샷과 프롬프트에 제공된 사실에 기반한 로그 스타일의 타임라인을 사용. 임의의 직장이나 기간을 지어내지 말 것. 날짜는 소스 이미지에 제공된 경우에만 표시함.

예상 항목:
1. `Geulda` 관광 홍보 앱
   - 스크린샷 텍스트 기준 날짜: `25.10 - 11`
   - 역할 정보: 팀 리더 / 기획 / 백엔드 리더 / 인프라 환경 및 배포 자동화
2. `OldYoung` 복지 추천 애플리케이션
   - 스크린샷 텍스트 기준 날짜: `25.06 - 08`
   - 역할 정보: PM / 기획 / 백엔드 / 배포 환경 구성 / AI 챗봇 개발
3. `Jenkins 기반 CI/CD 파이프라인 구축, Docker Compose 멀티 서비스 배포 안정화`
   - 스크린샷 텍스트 기준 날짜: `25.06 - 08`
4. `CATXI JWTFilterChain 내부 무중단 토큰 재발급 구조 도입`
   - 스크린샷 텍스트 기준 날짜: `25.05 - 12`
5. `JenkinsCI/Docker Repository OpenSource Contribution PR#2268`
   - `26.02`    

경험 섹션은 이력서를 꾸미기 위한 타임라인이 아니라 실제 운영 로그와 같은 느낌을 주어야 함.

### 프로젝트 (Projects)

다음 순서대로 네 개의 주요 프로젝트 카드를 사용:
1. `Geulda`
2. `OldYoung`
3. `Kubernetes 기반 주차 관리 서비스`
4. `CATXI`
5. `JenkinsCI/Docker OpenSource Contribution`

각 카드는 다음을 필수적으로 보여줘야 함:
- 프로젝트 제목
- 한 줄짜리 요약 (One-line summary)
- 핵심 성과 또는 운영적 관점에서의 핵심 목표
- 주요 기술 스택

카드를 클릭하면 카드 그리드 아래에 확장 가능한 상세 패널을 표시.

### 프로젝트 상세 스키마 (Project Detail Schema)

모든 세부 패널에는 다음 항목이 포함되어야 함:
1. 프로젝트 개요
2. 맡은 역할
3. 문제 상황
4. 해결 방식
5. 성과 / 수치
6. 트러블슈팅 경험
7. 배운 점

다음 논리적 흐름에 맞게 작성해야 함:
- 문제가 무엇이었는가
- 그것이 도대체 왜 운영상 유의미했는가
- 어떤 구조적 판단을 내렸는가
- 시스템을 어떻게 변경했는가
- 그 결과로 무엇이 개선되었는가

각 프로젝트 세부 정보에는 다음 형식에 따른 트러블슈팅 블록이 하나 이상 포함되어야 함:
- 문제
- 원인 분석
- 조치
- 결과

위 트러블슈팅 블록은 경고(Alert) 또는 로그 추적 카드 느낌으로 시각적 형태를 띄어야 함.

### 기술 스택 (Tech Stack)

단순한 배지 형태로 나열하기보다는 카테고리 기반의 그룹화 사용.

권장 카테고리:
- Cloud (클라우드)
- CI/CD
- Container / Orchestration (컨테이너 / 오케스트레이션)
- Backend / Auth (백엔드 / 인증)
- Monitoring (모니터링)
- Collaboration / Ops (협업 도구 / 운영)

각 기술 항목은 시스템 상태를 보여주는 행(row)이나 절제된 상태 표시기(progress meter)처럼 보여야 함. 디자인 상 퍼센트(%)를 활용해 숙련도를 과장하는 것은 지양하며, 익숙함의 정도를 제안하는 형태여야 함.

### 연락처 (Contact)

연락처 항목:
- GitHub
- Blog
- Email
- LinkedIn
- 이력서 PDF 기능 설명(플레이스홀더)

제공된 실제 링크만 사용. 가짜 소셜 링크 삽입 금지.

### 포트폴리오 인프라 정보 추가 (Portfolio Infrastructure Meta)

하단부나 소개 섹션 측면에 매우 작게 다음과 같은 메타 블록을 추가:
- `Portfolio Delivery`

이 포트폴리오 프로젝트 자체의 실제 배포 인프라가 제공되지 않았으므로 내용은 보편적이고 사실에 기반해야 함. 예시:
- React SPA
- Static delivery ready
- Deployment path configurable

이 프로젝트 안에 CDN, S3, CloudFront 또는 파이프라인의 구성 내용이 있지 않은 이상, 그러한 것들이 이미 구축된 것처럼 거짓으로 꾸미는 것을 지양.

## 시각적 방향성 (Visual Direction)

### 테마 (Theme)
- 배경: `#0a0a0a`
- 강조 색상(Accent): `#00ff41`
- 본문 텍스트: `#e0e0e0`
- Mono 폰트 (강조 요소): JetBrains Mono
- 본문 폰트: Pretendard

### 톤 앤 매너 (Tone)
다음 요소들이 결합되어야 함:
- 매트릭스 느낌의 터미널 분위기
- 포트폴리오의 절제된 프리미엄 엔지니어링 느낌
- 명확하게 정보의 위계가 나뉜 고밀도의 정보 형태

강조 색상(녹색)이 사용되어야 하는 곳:
- 레이블
- 테두리(Borders)
- 활성화된(Active) 상태 및 호버시
- 지표 데이터(Metrics)
- 짧은 장식형 트레이스 바(traces)

긴 단락의 텍스트에는 강조 색상을 절대 사용하지 말 것.

### 레이아웃 특징 (Layout Character)
- 데스크톱 화면에서 신뢰감을 주는 넓은 구조 사용
- 긴 한국어 텍스트를 편안하게 읽을 수 있는 너비 한계 유지
- 강력한 섹션 리듬감 유지
- 요약 블록과 세부 정보 블록 간의 뚜렷한 대비
- 세로 스크롤로 모바일 뷰에서도 안전하게 구성(가로 스크롤 생성을 방지)

## 모션 방향성 (Motion Direction)

### 모션 원칙 (Motion principles)
- 모션은 볼거리를 위한 것이 아니라 정보 이해를 돕기 위함이어야 함
- 요약 정보 및 상태 변경 부분에서 제일 확실하게 동작
- 긴 텍스트를 읽을 때는 배경 속으로 자연스레 묻혀야 함
- `prefers-reduced-motion` (애니메이션 줄이기 설정) 존중

### 필수 모션 패턴 (Required motion patterns)
1. 히어로(Hero) 파트의 타이핑 효과
   - 이름과 역할이 나타날 때 터미널 명령어를 입력하는 느낌 구사
   - 화면 로딩 시 처음 한 번만 실행
2. 스크롤 뷰 노출 (Scroll reveal)
   - 스크롤을 내릴 시 섹션들이 부드럽게 나타나며 살짝 위로 올라오듯 등장
   - 몇몇 주요 제목은 가벼운 텍스트 디코드(decode) 이펙트 적용 가능
3. 호버 마이크로-인터랙션(Hover micro-interactions)
   - 기술(Skill) 아이템: 미세한 스케일 업 + 부드러운 그린 글로우(빛 번짐)
   - 프로젝트 카드: 테두리 스와이프 이펙트 / 글로우 빛 번짐 / 옅은 글리치 액센트
4. 뒷배경의 매트릭스 효과 (Background matrix effect)
   - HTML 캔버스(Canvas) 적용
   - 매우 낮은 투명도 (opacity) 설정
   - 시각적 노이즈를 최소화
   - 텍스트 가독성을 어떠한 경우에도 방해하지 않아야 함

## 인터랙션 디자인 (Interaction Design)

### 내비게이션 (Navigation)
- 앵커 링크로 작동되는 스티키 헤더(Sticky Header) 위치 상단 고정
- 현재 사용자가 위치한 영역을 강조하는 활성화 구별 기능 포함
- 모바일 환경에서는 내비게이션이 심플한 메뉴로 접히되, 화면을 가득 채우는 서랍형은 지양. 

### 프로젝트 카드 확장 방식 (Project Card Expansion)
선택된 패턴: 인라인(inline)으로 펼쳐지는 세부 패널 구조

선택 이유:
- 여러 프로젝트를 빠르게 비교하려는 채용 담당자에게 효과적
- 모달(Modal) 창 방식보다 흐름의 방해가 적음
- 별도로 화면이 이탈되는 사이드 패널 구조보다는 모바일에 안전함
- Framer Motion의 `layoutId` 기능과의 궁합이 잘 맞음

인터랙션 기대 효과:
- 카드를 클릭 시, 클릭된 바로 그 카드 하단으로 세부 패널 오픈
- 오픈된 패널 또는 동일한 카드를 한 번 더 클릭하면 다시 닫힘
- 오픈이 된 상태가 시각적으로 다른 구분 상태를 가져야 함
- 세부 패널이 갑자기 툭 튀어나오게 생기는 것이 아닌 선택된 카드 중심으로 애니메이션이 적용되어 펼쳐져야 함.

### 가독성 확보 방안 (Readability safeguards)
- 정보량이 많은 텍스트 구간은 적절하고 충분한 줄 간격을 확보해야 함
- 문제 / 접근법 / 결과 이들 블록 사이에 시각적인 구분자를 주어야 함
- 빠른 텍스트 파악을 위해 성과 및 트러블슈팅 구간에서는 리스트 형태 활용
- 긴 텍스트의 중앙 정렬을 무조건적으로 회피

## 제안된 컴포넌트 아키텍처 (Proposed Component Architecture)

```text
src/
  components/
    Header/
      Header.tsx
      MobileNav.tsx
    Hero/
      Hero.tsx
      MetricGrid.tsx
      HeroLinks.tsx
    About/
      About.tsx
    Experience/
      ExperienceTimeline.tsx
      TimelineEntry.tsx
    Projects/
      ProjectsSection.tsx
      ProjectCard.tsx
      ProjectDetailPanel.tsx
      TroubleshootingAlert.tsx
    TechStack/
      TechStack.tsx
      SkillCategory.tsx
      SkillMeter.tsx
    Contact/
      Contact.tsx
    shared/
      SectionHeading.tsx
      Pill.tsx
      StatusBadge.tsx
      Reveal.tsx
      TerminalFrame.tsx
      IconLinkButton.tsx
  data/
    profile.ts
    experience.ts
    projects.ts
    skills.ts
  hooks/
    useTypingEffect.ts
    useScrollReveal.ts
    useDecodeText.ts
    useMatrixRain.ts
    useActiveSection.ts
  lib/
    cn.ts
    motion.ts
    format.ts
  styles/
    globals.css
    matrix-effects.css
  types/
    profile.ts
    experience.ts
    project.ts
    skill.ts
```

## 데이터 모델링 규칙 (Data Modeling Rules)

### 프로필 데이터 (Profile data)
다음을 포함해야 함:
- 이름 (Name)
- 한국어 및 영어 역할 직함(labels)
- 요약 정보 (Summary)
- 핵심 지표 데이터 (Metrics)
- 외부 링크 (Links)

### 프로젝트 데이터 (Project data)
각 개별 주요 프로젝트 객체는 다음 값들을 지원해야 합니다:
- `slug`
- `title` (제목)
- `subtitle` (부제)
- `summary` (요약)
- `techStack` (기술 스택)
- `highlights` (특장점)
- `overview` (개요)
- `role` (맡은 역할)
- `problem` (문제 상황)
- `approach` (접근 및 해결 방식)
- `outcomes` (성과 및 수치 반영 결과)
- `troubleshooting[]` (트러블슈팅 배열)
- `learnings` (배운 점)
- 옵션 사항: `architectureNotes`

### 경험 데이터 (Experience data)
각 타임라인 객체는 다음 값들을 지원해야 합니다:
- `title` (직함 또는 제목)
- `dateLabel` (알려지거나 작성된 경우의 날짜 데이터)
- `category` (분류)
- `summary` (요약 정보)
- `techStack` (기술 스택)
- `role` (맡은 역할)

### 스킬셋 데이터 (Skill data)
각 카테고리에는 다음 구조의 리스트가 있어야 함:
- `name` (항목 이름)
- `category` (소속 카테고리)
- `displayLevel` 정량적 % 게이지가 아닌 제어된 형태의 라벨 혹은 사이즈가 한정된 짧은 막대 바로 표현.

## 콘텐츠 초안 작성 가이드라인 (Content Drafting Guidance)

### Geulda
프롬프트 및 제공된 스크린샷들을 활용하여 아래 항목을 강조:
- Bastion 호스트, NAT 게이트웨이, 다중 ALB 구조가 도입된 AWS 퍼블릭/프라이빗 서브넷 아키텍처 역량
- Jenkins + AWX를 이용한 배포 환경의 표준화
- 기존 수동의 6단계 배포 절차 자동화
- 대략 30분에서 10분 미만으로 단축한 배포 소요 시간
- 다중 서비스 롤아웃의 운영 문제 개선
- Jenkins DinD를 구성할 시 메모리 부족 문제의 마이그레이션 경험(컨트롤러/에이전트 분리 트러블 슈팅 경험 포함)

### OldYoung
프롬프트와 제공된 스크린샷 데이터만으로 작성할 것:
- RAG 기술이 사용된 복지 추천 애플리케이션
- 프롬프트 엔지니어 혹은 AI 챗봇의 개발과 더불어, 백엔드 서버의 배포와 인프라 분산 구축 내용 강조할 것
- 단, 주어진 원본 테스트에 직접적인 연결이나 언급이 없는 이상 AWS + Jenkins + AWX + Docker 환경 이야기 자체는 억지로 끼워 넣지 않을 것
- 사용자의 입력 값을 바탕으로 한 복지 카테고리 및 정보 추천 분류 흐름에 대해 집중할 것

근거 없는 임의의 퍼포먼스 숫자를 절대로 지어내지 말 것.

### Kubernetes 기반 주차 관리 서비스
제공된 프롬프트만의 내용을 사용:
- Django
- Kubernetes
- Saga 패턴 (Saga Pattern)
- 서킷 브레이커 (Circuit Breaker)
- 서비스 간 데이터 일관성 파악 및 장애 격리 구성
- 지연시간 약 30% 감소 내용
- 안정적인 형태의 서비스 아키텍처 및 장애 환경 구성 파악 요소에 중점 제공

어떠한 형태의 프로토콜 항목에 대해서도 직접적인 언급 배제할 것 (금지됨).

### CATXI
제공된 애플리케이션 정보와 인증 관련 항목들을 신중히 병합할 것:
- 택시 승차 공유 애플리케이션 콘텍스트
- 백엔드 리더 / 인증 및 승인 인가 환경 구축 내력
- Spring Security, JWT, Redis, OAuth2
- 필터 체인(Filter-chain) 내부의 구조적인 레벨로 재발급 처리를 이동
- 3번에서 1번으로 단축된 네트워크 트랩 사이클 횟수 감소 내력
- 68ms -> 3ms로 줄어든 인증 딜레이 요소 강조

트러블 슈팅 시나리오는 다음과 같은 방향만을 지켜 진행할 것:
- 만료된 토큰이 컨트롤러(Controller) 레벨로 유입되었을 때 발생하는 문제
- 재발급 처리 시 구조적으로 가지는 불필요성 처리 경험
- 상기한 내용들을 바탕으로, 필터 체인 내부로 발급 과정을 이양하여 생긴 구조적 안정화

## 접근성 요구 사항 (Accessibility Requirements)
- 시맨틱한 랜드마크 마크업 언어와 논리적 헤딩(heading) 계층
- 카드 선택과 네비게이션을 지원하는 완벽한 키보드 접근성 확보
- 활성화(포커싱) 된 요소들에 명확히 보이는 상태 부여
- 어두운 화면 뒤 매끄러운 느낌의 충분한 명도 대비 색상 적용
- 애니메이션 줄이기 (Reduced motion) 지원 기능 적용
- 마크 요소 등을 꾸미기(Decorative) 용도로 만든 Canvas 배경 설정
- 텍스트 버튼 및 일반 링크들의 명확하고 뚜렷한 식별 요건

## 반응형 동작 구조 (Responsive Behavior)

### 데스크톱 (Desktop)
- 좌측에 요약 소개글, 우측(또는 터미널 블록에 프레임 된 형태의 적층)에는 수치데이터/액션이 들어간 히어로 섹션
- 2열(Column) 그리드 구조의 프로젝트 카드 배치
- 묶여서 그룹화된 기술 스택 표시 영역(다열 뷰 레이아웃)

### 태블릿 (Tablet)
- 깔끔한 싱글 칼럼 느낌으로 카드가 축소되어 배치되게 변경
- 모바일에 적합하도록 확장이 된 세부 패널이 기존 줄 안에서 인라인 유지되게 설계

### 모바일 (Mobile)
- 단일 컬럼(단일 열) 흐름으로 구성
- 헤더를 작고 타이트하게 압축해 고정된 채 활용
- 세부적인 프로젝트 디테일의 정보 텍스트 들은 길지 않은 문장들의 짧은 서브 헤딩 처리로 요약
- 넉넉한 여백(공간)을 지닌 수직 형태로 메트릭 정보 카드를 누적 배열

## 테스트 및 검증 전략 (Testing and Verification Strategy)
구현이 시작될 때 적용해야 할 최소 검증 단계:
- 타입스크립트 빌드 에러 없이 완전한 통과 처리
- 테일윈드(Tailwind CSS) 스타일링 시 컴파일상 예외 오류가 없어야 함
- Framer 모션을 이용한 인터랙션이 레이아웃 레이어의 파괴를 유발하지 않고 완전 구동되어야 함
- 마우스 없이 키보드만으로 대화형/작용 형 프로젝트 카드의 동작 접근이 수행되어야 함
- 비필수 적인 모션을 전부 불가능하게 제어할 수 있는 애니메이션 줄이기 모드 적용 상태가 원활해야 함
- 모바일용 레이블 크기 및 사이즈 규격 내에 텍스트가 안 잘리고 안전하게 표시되게 조정

## 비목표 영역 (Non-Goals) (구현하지 않을 사항들)
- PDF 형태의 가짜 이력서 에셋의 임의 생산 생성 금지
- 허위 정보를 담은 임의적 회사 및 근속 타임라인 생성 배제
- 가짜의 블로그(CMS) 또는 관리자 어드민의 생산 지양
- 코드가 제공이 되지 않은 프로젝트에 대한 어떠한 형태의 지어낸 코드 생성 시스템 금지
- 단순히 화려함만을 추구, 가독성에 하자를 발생시킬 과한 스케일의 터미널 모션 이펙트는 절대 배제

## 향후 미해결/옵션 구현 사항 알림 (Open Implementation Notes)
- 실제 제작된 온전한 레쥬메(이력서) PDF 파일 링크 추가 제공 시, 레이아웃의 레이어를 손상시키지 않고 플레이스 홀더 버튼을 이력서 다운로드 형태로의 변환 요망.
- 실제 사이트 배포 인프라 및 환경 요소에 대한 정보 제공 시 현재 기입된 보편적인 인프라 정보에서 디테일한 요소가 강화된 정보로 수정 교체.
- 보다 자세하고 명시적인 프로젝트 기간 및 타임 날짜 데이터 제고 시 타임라인 상 단순 날짜 데이터 및 순서 표시 방식에서 완전한 크로놀로지(시간대 별) 데이터 표시 구조로 전환.

## 사용자로부터 협의가 완료된 승인 방향 요약 (Approved Direction Captured From User)
- `/Users/kyum/Desktop/vibe/cv/resume`에서 작업 진행
- `pretext` 혹은 `ukint` 등의 구조를 무시하지 않는 형태, 기존 제안을 채택한 설계 진행 동의
- 사용자로부터 받은 실 소유 연락처 데이터 적극 활용
- 주요(Featured) 프로젝트 표출 우선순위 설정 승인:
  1. Geulda
  2. OldYoung 
  3. Kubernetes
  4. CATXI
  5. JenkinsCI/OpenSource Contribution
  
- 상세 프로젝트 설명창의 패턴: 확장 가능한 인라인(inline) 구조 반영
- 제공된 이미지 및 콘텍스트를 스크린샷 데이터 증거 날조 없이 차용한 경험 구간 텍스트(문장 구성) 데이터 채택
