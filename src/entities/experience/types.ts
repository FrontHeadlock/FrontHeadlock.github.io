export type ExperienceHighlight = {
  text: string
  /** 성과 항목의 공개 기록(PR·change·이슈). 있으면 항목 끝에 외부 링크 아이콘이 붙는다. */
  href?: string
}

export type ExperienceEntry = {
  title: string
  /** 제목을 강조색(--color-emphasis)으로 그린다. 재직 중인 회사 카드에 쓴다. */
  emphasized?: boolean
  /** 소속(학교·회사·커뮤니티). 제목 아래 작은 모노 글씨. */
  organization?: string
  dateLabel?: string
  category: string
  /** 역할·설명은 수상처럼 성과 목록만 있는 카드에서 비워 둘 수 있다. 설명의 "\n"은 화면에서 줄바꿈된다. */
  role?: string
  summary?: string
  /** 설명 아래 불릿으로 나열되는 성과 목록. */
  highlights?: ExperienceHighlight[]
  /** 카드 전체를 대표하는 공개 기록 URL. 제목 오른쪽에 외부 링크 아이콘으로 노출. */
  link?: string
  /** 4. 프로젝트 섹션의 해당 카드로 이동하는 링크. 프로젝트 slug 목록. */
  relatedProjects?: string[]
  techStack: string[]
}
