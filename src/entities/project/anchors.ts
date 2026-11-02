// 프로젝트 카드·패널의 DOM id. 경력 카드의 "관련 프로젝트" 링크가 #project-card-<slug>로 이동하므로
// 컴포넌트 밖(entities)에 두어 features 간 직접 의존을 피한다.
export const projectCardId = (slug: string) => `project-card-${slug}`
export const projectPanelId = (slug: string) => `project-panel-${slug}`
