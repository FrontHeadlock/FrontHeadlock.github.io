import type { Locale } from './LocaleContext'

type DocumentMeta = {
  title: string
  description: string
}

export const documentMeta: Record<Locale, DocumentMeta> = {
  en: {
    title: 'Kyumin Park — DevOps Engineer',
    description:
      'Kyumin Park is a DevOps engineer who resolves deployment, authentication, and service-latency bottlenecks at the architecture level. Matrix-themed interactive resume with measurable outcomes.',
  },
  ko: {
    title: '박규민 — DevOps 엔지니어',
    description:
      '배포, 인증, 서비스 지연 병목을 아키텍처 수준에서 해결하는 DevOps 엔지니어 박규민의 이력서입니다. 측정 가능한 성과를 담은 매트릭스 테마 인터랙티브 포트폴리오.',
  },
}
