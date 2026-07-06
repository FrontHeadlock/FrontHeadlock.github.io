import { useLocale, type Locale } from './LocaleContext'

type StringDictionary = {
  skipToContent: string
  nav: { about: string; experience: string; projects: string }
  hero: { metricsLabel: string; coreResults: string; coreResultsDescription: string }
  about: { eyebrow: string; title: string; description: string; problemSolvingLabel: string }
  experience: { eyebrow: string; title: string; description: string; sequenceLog: string }
  projects: { eyebrow: string; title: string; description: string; open: string; expanded: string }
  projectDetail: {
    overview: string
    role: string
    techStack: string
    problemContext: string
    approach: string
    outcomes: string
    learnings: string
    troubleshooting: string
  }
  contact: { eyebrow: string; title: string; description: string; deliveryLabel: string; deliveryHeading: string }
  footer: { sessionClosed: string; reachMeAt: string; backToTop: string }
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
      'This portfolio is centered on projects where deployment, authentication, and service-latency bottlenecks were improved with measurable results.',
  },
  about: {
    eyebrow: 'About',
    title: 'I isolate operational bottlenecks by structure and prevent recurrence with automation.',
    description:
      'I solve problems by organizing architecture before incident response and designing reproducible flows before manual work.',
    problemSolvingLabel: 'Problem Solving',
  },
  experience: {
    eyebrow: 'Experience',
    title: 'Project and operations flow are organized so they read like a log.',
    description:
      'Experience entries are structured using provided date and role data. Items without period metadata are shown in sequence-log order.',
    sequenceLog: 'Sequence log',
  },
  projects: {
    eyebrow: 'Projects',
    title: 'Projects are arranged so outcomes and structural judgment appear first.',
    description:
      'Featured projects are ordered as Geulda, OldYoung, Kubernetes, and CATXI. Selecting a card opens detailed resume context within the same flow.',
    open: 'Open',
    expanded: 'Expanded',
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
      '이 포트폴리오는 배포, 인증, 서비스 지연 병목을 측정 가능한 성과로 개선한 프로젝트를 중심으로 구성되어 있습니다.',
  },
  about: {
    eyebrow: '소개',
    title: '구조적 설계와 자동화로 운영 병목을 격리하고 재발을 방지합니다.',
    description: '장애 대응보다 아키텍처 정리를, 수동 작업보다 재현 가능한 플로우 설계를 우선합니다.',
    problemSolvingLabel: '문제 해결',
  },
  experience: {
    eyebrow: '경력',
    title: '프로젝트와 운영 흐름을 로그처럼 읽히도록 구성했습니다.',
    description:
      '경력 항목은 제공된 기간·역할 데이터를 기준으로 구성됩니다. 기간 정보가 없는 항목은 시퀀스 로그 순서로 표시됩니다.',
    sequenceLog: '시퀀스 로그',
  },
  projects: {
    eyebrow: '프로젝트',
    title: '프로젝트는 성과와 구조적 판단이 먼저 드러나도록 배치했습니다.',
    description:
      '주요 프로젝트는 Geulda, OldYoung, Kubernetes, CATXI 순으로 정렬되어 있습니다. 카드를 선택하면 같은 흐름 안에서 상세 이력 정보가 펼쳐집니다.',
    open: '열기',
    expanded: '펼침',
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
