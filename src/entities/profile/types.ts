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
  nameKo: string
  nameEn: string
  role: string
  heroSummary: string
  aboutSummary: string[]
  strengths: string[]
  metrics: ProfileMetric[]
  links: ProfileLink[]
  deliveryMeta: string[]
}
