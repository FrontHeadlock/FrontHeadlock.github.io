import { useLocale } from '../../shared/i18n/LocaleContext'
import { profileEn } from './data.en'
import { profileKo } from './data.ko'

export function useProfile() {
  const { locale } = useLocale()
  return locale === 'ko' ? profileKo : profileEn
}
