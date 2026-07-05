import { useLocale } from '../../shared/i18n/LocaleContext'
import { projectsEn } from './data.en'
import { projectsKo } from './data.ko'

export function useProjects() {
  const { locale } = useLocale()
  return locale === 'ko' ? projectsKo : projectsEn
}
