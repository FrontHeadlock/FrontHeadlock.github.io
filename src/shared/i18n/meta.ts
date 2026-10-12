import type { Locale } from './LocaleContext'

type DocumentMeta = {
  title: string
  description: string
}

export const documentMeta: Record<Locale, DocumentMeta> = {
  en: {
    title: 'Kyumin Park — DevOps Engineer',
    description:
      'Portfolio of Kyumin Park, a DevOps engineer running development infrastructure for automotive SoC teams: repetitive-operations automation, storage capacity visibility, and open-source contributions, with measured results.',
  },
  ko: {
    title: '박규민 — DevOps 엔지니어',
    description:
      '차량용 SoC 개발 환경의 인프라를 운영하는 DevOps 엔지니어 박규민의 포트폴리오입니다. 반복 운영 자동화, 스토리지 용량 가시화, 오픈소스 기여를 측정한 결과와 함께 정리했습니다.',
  },
}
