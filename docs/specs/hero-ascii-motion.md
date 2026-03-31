# Hero ASCII Motion spec

## 목표

이번 작업이 끝났을 때 첫 화면의 중심은 `박규민`이 아니라 `KyuminPark`가 되어야 하고, Hero는 정적인 텍스트 블록보다 `ukint`의 `AsciiHero.astro`에서 느껴지는 캔버스 기반 ASCII 입자 애니메이션을 주인공으로 가져야 합니다.

구체적으로 달라져야 하는 점:

- Hero 메인 이름이 `박규민`에서 `KyuminPark`로 바뀔 것
- Hero 이름은 일반 텍스트 헤드라인만이 아니라, canvas 기반 ASCII 입자 애니메이션으로 표현될 것
- `DevOps Portfolio` 배지와 `> whoami` 블록은 제거될 것
- `Resume PDF` 링크는 제거될 것
- `GitHub`, `Blog`, `Email`, `LinkedIn` 링크 카드에는 절제된 즉각 반응 hover 애니메이션이 들어갈 것
- `ukint`의 `devlog~`가 마우스에 반응하듯, Hero 안의 주요 인터랙션 대상도 포인터 반응을 가질 것
- Hero는 `왼쪽 상단 큰 이름 / 왼쪽 아래 소개와 링크 / 오른쪽 하단 성과 패널` 흐름으로 정리될 것
- 배경의 `matrix rain`은 계속 흐르는 상태로 유지될 것

## 문맥

현재 Hero는 정보 자체는 맞지만, 표현 방식은 아직 두 가지 한계가 있습니다.

1. 메인 시선 처리 문제
- 현재 메인 이름은 한글 `박규민` 기준으로 크게 배치되어 있음
- 사용자는 영어 이름 `KyuminPark`를 메인 브랜딩으로 올리고 싶어 함
- 지금 구조는 단순 텍스트 헤드라인에 가깝고, 첫 화면의 인상점이 더 강하게 필요함

2. 인터랙션 밀도 문제
- `ukint`의 메인 `devlog~`는 단순 텍스트가 아니라, ASCII 입자와 포인터 반응으로 살아 있는 Hero 역할을 함
- 현재 포트폴리오는 matrix rain 배경은 있으나, Hero 본문과 성과 패널, 링크 카드의 반응 우선순위가 정리되어 있지 않음
- 따라서 Hero 이름이 가장 강하게 살아 있어야 하고, 성과 패널은 그 다음, 링크 카드는 가장 절제된 층으로 정리되어야 함

이번 변경은 단순한 장식 추가가 아니라, Hero의 시선 집중 구조를 `이름 중심 인터랙션`으로 재정렬하는 작업입니다.

## 제약

이번 차수에서는 다음을 하지 않습니다.

- Hero 전체 레이아웃을 완전히 다른 구조로 갈아엎는 작업
- 프로젝트, About, Experience 섹션까지 광범위한 인터랙션을 추가하는 작업
- 링크 카드의 정보 구조 자체를 재설계하는 작업
- 과도한 글리치, 흔들림, 번쩍임처럼 채용용 가독성을 해치는 효과
- WebGL, Three.js 같은 더 무거운 렌더링 스택 도입
- 실제 제공되지 않은 새 링크, 새 이력서 파일, 새 소개 문구 추가

즉, 이번 작업은 `Hero 중심 재구성 + 성과/링크 인터랙션 계층 정리 + 지속형 matrix rain 보정`에 한정합니다.

## 완료 조건

아래 조건이 모두 만족되면 완료로 봅니다.

1. Hero의 메인 이름이 `KyuminPark`로 렌더될 것
2. `박규민`은 Hero 메인 표기에서 제거될 것
3. Hero 상단의 `DevOps Portfolio` 배지와 `> whoami` 블록이 제거될 것
4. `Resume PDF` 항목이 Hero 링크 목록에서 제거될 것
5. Hero에 `KyuminPark` 기반의 canvas ASCII 입자 애니메이션이 동작할 것
6. ASCII Hero는 랜덤 ASCII 잡음에서 이름으로 디코딩된 뒤, 기본 상태에서는 미세한 입자 떨림만 유지할 것
7. ASCII Hero는 hover 시 포인터 근처만 국소적으로 크게 무너지고, leave 시 원래 상태로 원복할 것
8. 대표 성과 `30m -> under 10m` 카드는 다른 성과 카드보다 먼저 진입할 것
9. 성과 카드는 hover 시 살짝 떠오르고 숫자가 짧게 카운트업되는 반응을 가질 것
10. `GitHub`, `Blog`, `Email`, `LinkedIn` 카드는 hover 또는 focus 시 살짝 밀리고 `OPEN` 라벨이 따라 움직일 것
11. Hero 오른쪽 `Core Results` 패널은 기존 프레임을 유지하되, 하단 빈 공간이 줄어든 더 단단한 높이로 정리될 것
12. 링크 카드는 2x2 그리드를 유지할 것
13. 보조 문장은 `배포, 인증, 운영 병목을 구조로 해결하는 DevOps 엔지니어입니다.`로 압축될 것
8. matrix rain이 초기 몇 초 뒤 멈춘 것처럼 보이지 않고 계속 흐를 것
14. 본문 가독성과 핵심 지표 카드의 정보 전달력은 유지될 것
15. 테스트와 빌드가 다시 통과할 것

## 변경 범위

직접 영향 범위:

- Hero 메인 이름 표현
- Hero 상단 장식 제거
- Hero 링크 카드 인터랙션
- Hero 성과 카드 반응
- ASCII canvas 애니메이션
- matrix rain 지속성
- 관련 테스트

예상 파일:

- `src/components/Hero/Hero.tsx`
- `src/components/Hero/HeroLinks.tsx`
- `src/components/shared/IconLinkButton.tsx`
- `src/data/profile.ts`
- `src/hooks/useMatrixRain.ts`
- `src/hooks/` 아래 새 ASCII Hero 전용 훅 또는 컴포넌트
- `src/App.test.tsx`

간접 영향 가능 파일:

- `src/components/shared/StatusBadge.tsx`
- `src/components/shared/MatrixRainCanvas.tsx`
- `src/styles/matrix-effects.css`
- `src/styles/globals.css` 또는 Hero 전용 스타일 파일

참고 파일:

- `/Users/kyum/Desktop/vibe/cv/ukint-vs.github.io/src/components/AsciiHero.astro`
- `/Users/kyum/Desktop/vibe/cv/ukint-vs.github.io/src/pages/index.astro`

## 설계 결정

### 1. Hero 이름 우선순위 재정의

Hero의 가장 큰 이름 표시는 `KyuminPark`로 바꿉니다.

처리 원칙:

- `KyuminPark`가 1순위 시선 포인트
- `박규민`은 Hero 메인에서 제거
- `whoami` 블록도 제거
- 이름 아래에는 짧은 한글 소개 문장만 유지

이유:

- 영문 이름이 링크, GitHub, LinkedIn 문맥과도 더 자연스럽게 연결됨
- ASCII 입자 애니메이션도 영문 기반이 더 읽기 안정성이 높음
- `KyuminPark`처럼 붙여 쓰는 표기가 더 강한 브랜딩 포인트를 만듦

### 2. ASCII Hero 적용 방식

`ukint`의 `AsciiHero.astro`를 “그대로 복제”하지 않고, 다음 개념을 가져옵니다.

- 텍스트를 오프스크린 캔버스에 렌더링한 뒤 입자 포인트로 변환
- 입자들이 원래 좌표로 수렴하는 spring + damping 구조
- 포인터가 가까이 오면 입자가 밀리거나 흩어지는 반응
- reduced motion 환경에서는 정적 텍스트로 안전하게 폴백

이번 포트폴리오에서는 문자열을 `devlog~` 대신 `KyuminPark`로 바꿉니다.

동작 기준:

- 첫 진입 시 0.8초~1.2초 안에서 랜덤 ASCII 잡음이 이름으로 디코딩
- 디코딩 이후에는 글자가 충분히 읽히는 상태 유지
- 기본 상태는 아주 미세한 입자 떨림만 유지
- hover 시 포인터 근처 입자만 국소적으로 크게 무너짐
- leave 시 spring + damping으로 빠르게 원복

### 3. 텍스트와 캔버스의 역할 분리

ASCII Hero는 “장식용 캔버스”가 아니라 Hero의 메인 타이틀 표현입니다.

다만 접근성과 폴백을 위해:

- 실제 텍스트 헤드라인도 DOM에 유지
- 시각적으로는 canvas가 메인을 담당
- reduced motion 또는 canvas 불가 환경에서는 DOM 텍스트가 직접 보이도록 함
- 시각적으로는 현재보다 더 크게, Hero의 절반 가까운 존재감을 가지도록 함

### 4. ukint식 포인터 반응의 적용 범위

`ukint`의 `devlog~`처럼 포인터 반응을 Hero 핵심 구간에 넣되, 적용 범위는 절제합니다.

적용 대상:

- ASCII Hero
- Hero 성과 카드
- Hero 링크 카드 4개

적용하지 않는 대상:

- 본문 전체
- 프로젝트 카드 전체에 동일한 강도의 효과 재사용

우선순위:

1. ASCII Hero
2. 성과 카드
3. 링크 카드

링크 카드 반응 예시:

- 카드 전체가 아주 살짝 밀림
- 우측 `OPEN` 라벨이 같이 따라 움직임
- 테두리 glow는 보조적으로만 사용

핵심은 “즉각적이고 짧은 반응”이지, 오래 지속되는 과한 애니메이션이 아닙니다.

### 5. Matrix Rain 지속성 유지

matrix rain은 여전히 배경이어야 하며, Hero ASCII 애니메이션과 경쟁하면 안 됩니다.

원칙:

- Hero 전면 인터랙션은 ASCII name
- 페이지 전체 분위기 유지 요소는 matrix rain
- 둘 다 녹색 계열을 쓰더라도 명도와 존재감을 분리

### 6. Hero 레이아웃 원칙

레이아웃은 다음 흐름으로 정리합니다.

- 왼쪽 상단: 대형 `KyuminPark` ASCII Hero
- 왼쪽 아래: 압축된 소개 문장 + 2x2 링크 카드
- 오른쪽 하단: 높이가 더 단단해진 `Core Results` 패널

`Core Results`는 터미널 프레임 자체는 유지하되, 내부 하단 빈 공간을 줄여 현재보다 더 응집된 패널로 보이게 합니다.

### 7. 성과 카드 인터랙션 원칙

성과 카드는 링크 카드보다 한 단계 강하게 반응합니다.

필수 조건:

- 대표 성과 `30m -> under 10m`는 다른 카드보다 먼저 진입
- 카드 hover 시 살짝 떠오름
- 숫자 텍스트는 짧게 카운트업되는 느낌으로 반응
- 카드 구조 자체는 모두 동일하게 유지

### 8. 링크 카드 인터랙션 원칙

`GitHub`, `Blog`, `Email`, `LinkedIn`은 모두 hover/focus 시 즉각 반응하되, 정보 전달을 해치지 않아야 합니다.

필수 조건:

- 키보드 focus에서도 동일한 수준의 시각 반응 제공
- 모바일에서는 hover 대신 tap/press 기반으로 자연스럽게 축소 적용
- 링크 값 텍스트는 흔들리거나 읽기 어려워지지 않음
- 2x2 그리드는 유지
- 성과 카드보다 약한 모션 계층 유지

## 구현 원칙

1. Hero 장식 제거와 ASCII Hero 도입은 같은 차수에서 처리
2. `ukint`의 구현 아이디어는 참고하되, 현재 React 구조에 맞게 컴포넌트 또는 훅으로 재구성
3. 캔버스 애니메이션은 `prefers-reduced-motion`을 존중
4. 링크 카드 인터랙션은 `hover`, `focus-visible`, 모바일 입력을 모두 고려
5. 성과 카드와 링크 카드의 모션 계층은 분리
6. matrix rain은 지속성을 보정하되, Hero ASCII보다 앞에 서지 않게 유지
7. 테스트는 “제거된 것”과 “새로 유지되어야 할 것”을 함께 검증

## 후킹을 위해 spec에 미리 정의할 항목

현재 페이지의 첫인상을 더 강하게 만들려면, 단순히 애니메이션을 추가하는 것보다 “무엇이 먼저 눈에 들어오고, 사용자가 어디에 마우스를 올렸을 때 즉시 반응하는지”를 spec에 미리 고정해두는 편이 좋습니다.

이번 spec에는 아래 항목도 함께 정의합니다.

### 1. 첫 3초 연출 우선순위

첫 진입 후 사용자가 가장 먼저 인지해야 하는 순서를 명확히 합니다.

우선순위:

1. `Kyumin Park` ASCII Hero 형성
2. 대표 성과 `30m -> under 10m` 인지
3. 한 줄 요약 문구 인지
4. 핵심 링크 4개 인지
5. 배경 matrix rain은 보조 레이어로 유지

즉, Hero 안에서 가장 강한 후킹 요소는 배경이 아니라 `KyuminPark`여야 합니다.

### 2. 진입 애니메이션 시퀀스

초기 로드 시 모든 요소가 동시에 튀어나오지 않도록, 짧은 순차 진입을 정의합니다.

권장 흐름:

- matrix rain은 이미 뒤에서 계속 동작
- ASCII Hero가 랜덤 ASCII 잡음에서 디코딩
- 대표 성과 `30m -> under 10m` 카드가 가장 먼저 진입
- 나머지 성과 카드가 뒤따라 들어옴
- 이름 아래 요약 텍스트가 짧게 reveal
- 링크 카드는 가장 마지막에 짧은 stagger로 들어옴

이 시퀀스는 “멋있음”보다 “첫 시선 유도”가 목적입니다.

### 3. 포인터 반응 우선 대상

모든 요소가 움직이면 산만해지므로, 포인터 반응 대상을 미리 제한합니다.

강한 반응:

- ASCII Hero
- Hero 성과 카드

약한 반응:

- Hero 링크 카드 4개

비적용:

- Hero 바깥의 일반 본문

즉, 후킹은 Hero 상단에서 끝내고, 아래 섹션은 읽기 중심을 유지합니다.

### 4. 링크 카드의 즉각 반응 정의

링크 카드의 반응은 “마우스를 올렸을 때 곧바로 체감되는 수준”이어야 합니다.

허용되는 반응:

- 카드의 미세한 이동
- `OPEN` 텍스트의 위치 변화
- border glow의 보조 강조

지양할 반응:

- 카드 전체가 크게 흔들리는 효과
- 링크 값 텍스트가 깨지거나 scramble 되는 효과
- 0.5초 이상 지속되는 느린 hover 모션

### 5. 모바일과 reduced motion 기준

후킹은 데스크톱 기준으로 설계하되, 모바일과 접근성 폴백도 spec에서 같이 고정합니다.

기준:

- 모바일에서는 ASCII Hero의 입자 수와 반응 반경을 줄임
- hover 중심 반응은 tap/press에 맞게 축소
- `prefers-reduced-motion`에서는 canvas 조립 효과를 정적 타이틀로 대체
- reduced motion 환경에서도 정보 위계는 동일해야 함

### 6. 성능 기준

후킹 요소가 늘어도 페이지가 무거워지면 목적에 맞지 않으므로, 성능 기준을 미리 둡니다.

기준:

- Hero 캔버스는 Hero 영역 안에서만 계산
- 링크 카드 hover는 layout thrash 없이 transform/opacity 중심으로 처리
- 성과 카드 카운트업은 hover 순간 짧게만 실행
- matrix rain과 ASCII Hero가 동시에 있어도 스크롤과 입력이 둔해지지 않아야 함
- 저사양 환경에서는 입자 수를 줄일 수 있는 구조여야 함

### 7. 테스트 관점에서 고정할 항목

후킹 요소는 시각 효과라서 테스트가 어려우므로, 최소한 아래 사실은 테스트로 고정합니다.

- Hero의 주 헤드라인 텍스트가 `KyuminPark`
- `Resume PDF`가 렌더되지 않음
- `DevOps Portfolio`, `whoami` 문구가 렌더되지 않음
- ASCII Hero용 canvas 또는 전용 컴포넌트가 존재함
- 링크 카드 4개는 여전히 접근 가능한 링크로 남아 있음
- 보조 문장이 압축된 새 문구로 바뀜
- 대표 성과 카드가 존재하고 구조는 유지됨
- reduced motion 폴백에서도 이름 텍스트가 사라지지 않음

## 다음 단계

이 spec 기준으로 이어서 plan을 작성합니다.

plan에는 최소한 아래 항목이 들어가야 합니다.

- Hero 이름 전환 테스트
- Resume PDF 제거 테스트
- ASCII Hero 컴포넌트 또는 훅 설계
- Hero 링크 카드 인터랙션 반영
- matrix rain 지속성 보정
- 접근성 및 reduced motion 폴백 검증
