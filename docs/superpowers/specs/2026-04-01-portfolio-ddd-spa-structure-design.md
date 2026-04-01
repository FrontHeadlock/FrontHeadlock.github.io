# Portfolio DDD + SPA Structure Refactor Design

## 목적
- 현재 `src` 하위 파일을 `DDD + SPA` 경계 기준으로 재배치하여 유지보수성, 기능 단위 이동성, 테스트 안정성을 개선한다.
- 기존 기능 동작(컴포넌트, 훅, 데이터, 타입, 스타일)을 유지한 채 의존성과 책임 경계를 명확히 구분한다.

## 적용 범위
- 대상: React + TypeScript 포트폴리오 SPA 전체 구조(`src/*`).
- 제외: 기능 동작 자체 변경, 새 기능 추가, 외부 API 변경.
- 제외: Vercel/CI 파이프라인, 외부 배포 구조.

## 제약 조건
- 기존 텍스트/콘텐츠·문구·링크·컴포넌트 동작을 유지한다.
- 잘못된 링크/허위 콘텐츠를 추가하지 않는다.
- `npm test`, `npm run build` 통과를 최종 목표로 한다.

## 목표 아키텍처(1안)
- `src/app`: SPA App shell 및 페이지 라우팅 진입점
- `src/features`: 도메인/섹션 단위 UI 조립(`hero`, `about`, `experience`, `projects`, `tech-stack`, `contact`, `header`)
- `src/entities`: 도메인 데이터/타입( `project`, `experience`, `profile`, `skill` )
- `src/shared`: 공통 UI/유틸/훅/스타일
  - `src/shared/ui`: 재사용 UI 컴포넌트
  - `src/shared/hooks`: 공통 훅
  - `src/shared/lib`: 유틸성 모듈
  - `src/shared/styles`: 전역/공통 스타일

## 현재 대비 변경 맵(고수준)
- 기존 `src/components/*`를 `src/features/*`(도메인 섹션)로 이동
  - `Header`, `Hero`, `About`, `Experience`, `Projects`, `TechStack`, `Contact`
- 기존 `src/shared/*`(Reveal, TerminalFrame 등) -> `src/shared/ui`
- 기존 `src/hooks/*` -> `src/shared/hooks`
- 기존 `src/lib/*` -> `src/shared/lib`
- 기존 `src/data/*` -> `src/entities/*/data`
- 기존 `src/types/*` -> `src/entities/*/types`
- 공용 CSS(`index.css`, `matrix-effects.css`)는 `src/shared/styles`로 이동 후 경로 정리
- `App.tsx`, `main.tsx`는 `src/app` 또는 `src` 루트에서 `src/app` 하위로 이동/정리(프로젝트 방침에 맞추어 선택)

## 경계 규칙
1. `features`는 UI 컴포지션 위주로 두고, 데이터 호출은 각 feature 내부에서 `entities` 참조.
2. `entities`는 순수 타입과 정적 데이터만 가지며 React 훅/컴포넌트 의존 금지.
3. `shared/ui`는 도메인 지식 없는 순수 프레젠테이션/동작 조합 컴포넌트.
4. `shared/hooks`는 여러 feature에서 반복 재사용 가능한 상태/사이드이펙트 훅만 둔다.
5. `src/main.tsx`는 루트 진입점으로만 사용하고, 비즈니스 의존을 직접 임포트하지 않는다.

## 파일 매핑(예시)
- `src/components/Hero/*` -> `src/features/hero/*`
- `src/components/About/*` -> `src/features/about/*`
- `src/components/Experience/*` -> `src/features/experience/*`
- `src/components/Projects/*` -> `src/features/projects/*`
- `src/components/TechStack/*` -> `src/features/tech-stack/*`
- `src/components/Contact/*` -> `src/features/contact/*`
- `src/components/Header/*` -> `src/features/header/*`
- `src/components/shared/*` -> `src/shared/ui/*`
- `src/hooks/*` -> `src/shared/hooks/*`
- `src/lib/*` -> `src/shared/lib/*`
- `src/data/*` -> `src/entities/{profile,project,experience,skill}/data.ts`
- `src/types/*` -> `src/entities/{profile,project,experience,skill}/types.ts`
- `src/styles/matrix-effects.css` -> `src/shared/styles/matrix-effects.css`
- `src/index.css` -> `src/shared/styles/globals.css` (루트에서 index.css 재내보내기 or main에서 해당 경로 import)

## 리스크
- **Import 경로 대규모 변경**: 대량 이동 시 경로 변경 누락으로 런타임/테스트 실패 가능.
- **테스트 연동**: 컴포넌트 위치 변경 시 스냅샷/경로 기반 검증(있다면) 불일치 위험.
- **파일명 정합성**: 중복 케이스, 케밥/카멜 혼재로 인한 팀별 코드 스타일 혼란.

## 승인 기준
- 기존 기능이 시각적/동작적으로 동일(네비게이션, Hero, Projects 토글, 스크롤 동작 등).
- import 정합성 점검 후 `App.test.tsx` 및 `shared` 관련 테스트 통과.
- TS 경로 정정 후 `npm run build` 통과.
- 핵심 경계 파일 분리 준수(컴포넌트/훅/데이터/타입/스타일 분리).

## 구현 순서(요약)
1. 폴더/파일 이동 계획 확정 및 임시 백업 체크포인트 생성
2. 대규모 파일 이동(`git mv` 없이 move/rename) + import/alias 정합성 수정
3. 스타일 경로 정리 + 테스트 경로 정합성 수정
4. 빌드/테스트 회귀 점검
5. 실패한 경우 최소 롤백 포인트로 되돌릴 수 있도록 변경 단위 유지

## 미구현 결정(Out of scope)
- 라우팅 분리(멀티 페이지)
- 상태관리 라이브러리 도입
- API/백엔드 레이어 추가
