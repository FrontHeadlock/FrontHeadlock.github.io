export type ProfileMetric = {
  label: string
  value: string
  detail: string
}

export type ProfileLink = {
  label: string
  href?: string
  value: string
  kind: 'link' | 'email' | 'disabled'
}

export type Profile = {
  name: string
  role: string
  /** 히어로에서 직함 옆에 보이는 소속 한 줄 (회사 · 담당 영역). */
  affiliation: string
  /** 라이트 히어로 첫 줄의 회사명과 재직 상태 알약. */
  company: string
  employmentStatus: string
  heroSummary: string
  /** 소개 본문 문단. "\n"은 화면에서 줄바꿈된다. */
  aboutSummary: string[]
  /** 강점 목록. `**…**`로 감싼 구간은 굵게 강조된다. */
  strengths: string[]
  metrics: ProfileMetric[]
  links: ProfileLink[]
}
