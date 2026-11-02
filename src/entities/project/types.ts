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
  /** 종류(사내 · 학부 팀 프로젝트). 카드 라벨 옆 작은 태그. */
  kind: string
  /** 진행 기간. 패널 제목 아래 한 줄. */
  period?: string
  /** 팀 규모. 기간과 같은 줄에 "·"로 이어 붙는다. */
  teamSize?: string
  /** 공개 저장소 URL. 패널 오른쪽 위 아이콘 링크. */
  repoUrl?: string
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
