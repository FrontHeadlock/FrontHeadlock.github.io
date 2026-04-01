export type TroubleShootingItem = {
  title: string
  problem: string
  analysis: string
  action: string
  result: string
}

export type Project = {
  slug: string
  title: string
  subtitle: string
  summary: string
  focus: string
  techStack: string[]
  overview: string
  role: string
  problem: string[]
  approach: string[]
  outcomes: string[]
  learnings: string[]
  architectureNotes?: string[]
  troubleshooting: TroubleShootingItem[]
}
