import { useLocale, type Locale } from './LocaleContext'

type StringDictionary = {
  skipToContent: string
  nav: { about: string; experience: string; projects: string }
  hero: { metricsLabel: string; coreResults: string; coreResultsDescription: string }
  about: { eyebrow: string; title: string; description: string; problemSolvingLabel: string }
  experience: {
    eyebrow: string
    title: string
    description: string
    sequenceLog: string
    publicRecord: string
    relatedProjects: string
  }
  projects: { eyebrow: string; title: string; description: string; open: string; expanded: string; close: string }
  projectDetail: {
    overview: string
    role: string
    techStack: string
    problemContext: string
    approach: string
    outcomes: string
    learnings: string
    troubleshooting: string
    repository: string
  }
  contact: { eyebrow: string; title: string; description: string; deliveryLabel: string; deliveryHeading: string }
  footer: { sessionClosed: string; reachMeAt: string; backToTop: string }
  // 시스템 토큰처럼 보이는 짧은 문구(resume.node, status online, ⌘K)는 테마 요소로 영어를 유지하고,
  // 내용을 설명하는 라벨은 아래 사전에서 번역한다.
  header: { rainOn: string; rainOff: string; openMenu: string; closeMenu: string }
  links: { open: string; placeholder: string }
  troubleshooting: { badge: string; problem: string; rootCause: string; action: string; result: string }
  palette: {
    placeholder: string
    noResults: string
    hintToggle: string
    hintNavigate: string
    openAriaLabel: string
    dialogLabel: string
    commands: {
      home: { label: string; description: string }
      about: { label: string; description: string }
      experience: { label: string; description: string }
      projects: { label: string; description: string }
      contact: { label: string; description: string }
      rain: { label: string; description: string }
      email: { label: string; description: string }
    }
  }
}

const en: StringDictionary = {
  skipToContent: 'Skip to content',
  nav: { about: 'about', experience: 'experience', projects: 'projects' },
  hero: {
    metricsLabel: 'Operational Metrics',
    coreResults: 'Core Results',
    coreResultsDescription:
      'Figures measured in in-house infrastructure operations and projects, chosen around repetitive-work automation, storage capacity reclamation, and shorter deployment and authentication latency.',
  },
  about: {
    eyebrow: 'About',
    title: 'I build infrastructure that automates recurring operations and surfaces resource state through metrics first.',
    description: 'I prefer operations that catch problems early over firefighting, and reversible changes over manual work.',
    problemSolvingLabel: 'Problem Solving',
  },
  experience: {
    eyebrow: 'Experience',
    title: 'A timeline of problems met in operations and solved through automation and contribution.',
    description: 'From university to the present, in chronological order. Contribution entries link to their public records.',
    sequenceLog: 'Sequence log',
    publicRecord: 'View public record',
    relatedProjects: 'Related projects',
  },
  projects: {
    eyebrow: 'Projects',
    title: 'Projects are laid out so the problem, the judgment call, and the measured result come first.',
    description:
      'In-house projects from my current role come first, followed by university projects. In-house entries describe only structure and figures that can be shared publicly.',
    open: 'Open',
    expanded: 'Expanded',
    close: 'Close',
  },
  projectDetail: {
    overview: 'Overview',
    role: 'Role',
    techStack: 'Tech Stack',
    problemContext: 'Problem Context',
    approach: 'Approach',
    outcomes: 'Outcomes / Metrics',
    learnings: 'Learnings',
    troubleshooting: 'Troubleshooting',
    repository: 'Repository',
  },
  contact: {
    eyebrow: 'Contact',
    title: 'This portfolio is structured for fast review of key details and operational outcomes.',
    description: 'Contact details use real values, and resume PDF linkage is not enabled yet.',
    deliveryLabel: 'Portfolio Delivery',
    deliveryHeading: 'Infrastructure setup for this portfolio',
  },
  footer: {
    sessionClosed: '> session closed.',
    reachMeAt: ' reach me at ',
    backToTop: 'back to top ↑',
  },
  header: { rainOn: 'live rain', rainOff: 'rain off', openMenu: 'Open menu', closeMenu: 'Close menu' },
  links: { open: 'Open', placeholder: 'Placeholder' },
  troubleshooting: { badge: 'System Alert', problem: 'Problem', rootCause: 'Root Cause', action: 'Action', result: 'Result' },
  palette: {
    placeholder: 'Type a command or search...',
    noResults: 'No commands found',
    hintToggle: 'Cmd+K or Cmd+` to toggle',
    hintNavigate: '↑↓ to navigate, Enter to select, Esc to close',
    openAriaLabel: 'Open command palette',
    dialogLabel: 'Command palette',
    commands: {
      home: { label: 'Go to Home', description: 'Navigate to the top of the page' },
      about: { label: 'Go to About', description: 'Jump to the About section' },
      experience: { label: 'Go to Experience', description: 'Jump to the Experience section' },
      projects: { label: 'Go to Projects', description: 'Jump to the Projects section' },
      contact: { label: 'Go to Contact', description: 'Jump to the Contact section' },
      rain: { label: 'Toggle Rain', description: 'Turn the matrix rain animation on or off' },
      email: { label: 'Copy Email', description: 'Copy email address to clipboard' },
    },
  },
}

const ko: StringDictionary = {
  skipToContent: '본문으로 건너뛰기',
  nav: { about: '소개', experience: '경력', projects: '프로젝트' },
  hero: {
    metricsLabel: '운영 지표',
    coreResults: '핵심 성과',
    coreResultsDescription:
      '사내 인프라 운영과 프로젝트에서 측정한 수치입니다. 반복 업무 자동화, 스토리지 용량 회수, 배포와 인증 지연 단축을 중심으로 골랐습니다.',
  },
  about: {
    eyebrow: '소개',
    title: '반복되는 운영 자동화, 수치 기반의 개선 포인트를 찾아내는 인프라 운영',
    description: '문제를 수습하기보다 먼저 발견해 개선하고자 노력하며, 안정성을 최우선으로 멱등적인 운영을 추구합니다.',
    problemSolvingLabel: '문제 해결',
  },
  experience: {
    eyebrow: '경력',
    title: '운영에서 만난 문제를 자동화하고 기여하며 풀어 왔습니다.',
    description: '학부부터 현재까지 시간순으로 정리했습니다. 기여 항목에는 GitHub·Gerrit 링크를 함께 둡니다.',
    sequenceLog: '시퀀스 로그',
    publicRecord: '공개 기록 보기',
    relatedProjects: '관련 프로젝트',
  },
  projects: {
    eyebrow: '프로젝트',
    title: '프로젝트는 문제와 판단, 측정한 결과가 먼저 보이도록 정리했습니다.',
    description:
      '재직 중 진행한 사내 프로젝트를 앞에, 학부 프로젝트를 뒤에 두었습니다. 사내 프로젝트는 공개 가능한 범위에서 구조와 수치만 적었습니다.',
    open: '열기',
    expanded: '펼침',
    close: '닫기',
  },
  projectDetail: {
    overview: '개요',
    role: '역할',
    techStack: '기술 스택',
    problemContext: '문제 상황',
    approach: '접근 방법',
    outcomes: '성과 / 지표',
    learnings: '배운 점',
    troubleshooting: '트러블슈팅',
    repository: '저장소',
  },
  contact: {
    eyebrow: '연락처',
    title: '이 포트폴리오는 핵심 정보와 운영 성과를 빠르게 검토할 수 있도록 구성했습니다.',
    description: '연락처 정보는 실제 값을 사용하며, 이력서 PDF 연동은 아직 제공되지 않습니다.',
    deliveryLabel: '포트폴리오 배포',
    deliveryHeading: '이 포트폴리오의 인프라 구성',
  },
  footer: {
    sessionClosed: '> 세션 종료.',
    reachMeAt: ' 연락처: ',
    backToTop: '맨 위로 ↑',
  },
  header: { rainOn: '레인 켜짐', rainOff: '레인 꺼짐', openMenu: '메뉴 열기', closeMenu: '메뉴 닫기' },
  links: { open: '열기', placeholder: '준비 중' },
  troubleshooting: { badge: '시스템 경고', problem: '문제', rootCause: '원인', action: '조치', result: '결과' },
  palette: {
    placeholder: '명령어를 입력하거나 검색하세요...',
    noResults: '일치하는 명령이 없습니다',
    hintToggle: 'Cmd+K 또는 Cmd+` 로 열기/닫기',
    hintNavigate: '↑↓ 이동, Enter 실행, Esc 닫기',
    openAriaLabel: '커맨드 팔레트 열기',
    dialogLabel: '커맨드 팔레트',
    commands: {
      home: { label: '홈으로 이동', description: '페이지 맨 위로 이동합니다' },
      about: { label: '소개로 이동', description: '소개 섹션으로 이동합니다' },
      experience: { label: '경력으로 이동', description: '경력 섹션으로 이동합니다' },
      projects: { label: '프로젝트로 이동', description: '프로젝트 섹션으로 이동합니다' },
      contact: { label: '연락처로 이동', description: '연락처 섹션으로 이동합니다' },
      rain: { label: '매트릭스 비 전환', description: '매트릭스 비 애니메이션을 켜거나 끕니다' },
      email: { label: '이메일 복사', description: '이메일 주소를 클립보드에 복사합니다' },
    },
  },
}

export const strings: Record<Locale, StringDictionary> = { en, ko }

export function useStrings() {
  const { locale } = useLocale()
  return strings[locale]
}
