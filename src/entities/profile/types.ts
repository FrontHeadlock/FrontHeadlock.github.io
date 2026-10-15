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
  aboutSummary: string[]
  strengths: string[]
  metrics: ProfileMetric[]
  links: ProfileLink[]
}
