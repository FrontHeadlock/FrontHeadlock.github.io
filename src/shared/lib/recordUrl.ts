/**
 * 공개 기록(PR·change·이슈·저장소) 링크의 접근성 이름에 붙일 설명.
 * "github.com/jenkinsci/docker/pull/2268"처럼 호스트와 경로를 함께 돌려주어
 * 같은 라벨의 링크가 여러 개여도 스크린 리더 목록에서 서로 구분된다.
 * 원고의 URL이 잘못돼도 렌더가 죽지 않도록 파싱 실패 시 원문을 그대로 쓴다.
 */
export function describeRecordUrl(href: string): string {
  try {
    const { hostname, pathname } = new URL(href)
    return `${hostname}${pathname.replace(/\/$/, '')}`
  } catch {
    return href
  }
}

export function hostnameOf(href: string): string {
  try {
    return new URL(href).hostname
  } catch {
    return ''
  }
}
