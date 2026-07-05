import { useLocale } from '../../shared/i18n/LocaleContext'
import { experienceEn } from './data.en'
import { experienceKo } from './data.ko'

export function useExperience() {
  const { locale } = useLocale()
  return locale === 'ko' ? experienceKo : experienceEn
}
