/*
 * MedCare-AI - Humanitarian AI Platform for Rural Healthcare
 * 
 * Owner: Fahed Mlaiel
 * Contact: mlaiel@live.de
 * Notice: Attribution to Fahed Mlaiel is mandatory in all copies, forks, and derivatives.
 * 
 * This technology must always be provided for free under humanitarian license.
 */

export interface Language {
  code: string
  name: string
  nativeName: string
  rtl: boolean
  region: string
  flag: string
}

export const supportedLanguages: Language[] = [
  // Major International Languages
  { code: 'en', name: 'English', nativeName: 'English', rtl: false, region: 'Global', flag: '🇺🇸' },
  { code: 'es', name: 'Spanish', nativeName: 'Español', rtl: false, region: 'Latin America', flag: '🇪🇸' },
  { code: 'fr', name: 'French', nativeName: 'Français', rtl: false, region: 'Africa/Europe', flag: '🇫🇷' },
  { code: 'ar', name: 'Arabic', nativeName: 'العربية', rtl: true, region: 'MENA', flag: '🇸🇦' },
  { code: 'pt', name: 'Portuguese', nativeName: 'Português', rtl: false, region: 'Brazil/Africa', flag: '🇵🇹' },
  
  // African Languages
  { code: 'sw', name: 'Swahili', nativeName: 'Kiswahili', rtl: false, region: 'East Africa', flag: '🇰🇪' },
  { code: 'ha', name: 'Hausa', nativeName: 'Harshen Hausa', rtl: false, region: 'West Africa', flag: '🇳🇬' },
  { code: 'yo', name: 'Yoruba', nativeName: 'Yorùbá', rtl: false, region: 'West Africa', flag: '🇳🇬' },
  { code: 'ig', name: 'Igbo', nativeName: 'Asụsụ Igbo', rtl: false, region: 'West Africa', flag: '🇳🇬' },
  { code: 'am', name: 'Amharic', nativeName: 'አማርኛ', rtl: false, region: 'Ethiopia', flag: '🇪🇹' },
  
  // Asian Languages
  { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी', rtl: false, region: 'India', flag: '🇮🇳' },
  { code: 'bn', name: 'Bengali', nativeName: 'বাংলা', rtl: false, region: 'Bangladesh/India', flag: '🇧🇩' },
  { code: 'ur', name: 'Urdu', nativeName: 'اردو', rtl: true, region: 'Pakistan/India', flag: '🇵🇰' },
  { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்', rtl: false, region: 'South India/Sri Lanka', flag: '🇮🇳' },
  { code: 'te', name: 'Telugu', nativeName: 'తెలుగు', rtl: false, region: 'South India', flag: '🇮🇳' },
  
  // Southeast Asian Languages
  { code: 'id', name: 'Indonesian', nativeName: 'Bahasa Indonesia', rtl: false, region: 'Indonesia', flag: '🇮🇩' },
  { code: 'ms', name: 'Malay', nativeName: 'Bahasa Melayu', rtl: false, region: 'Malaysia', flag: '🇲🇾' },
  { code: 'th', name: 'Thai', nativeName: 'ไทย', rtl: false, region: 'Thailand', flag: '🇹🇭' },
  { code: 'vi', name: 'Vietnamese', nativeName: 'Tiếng Việt', rtl: false, region: 'Vietnam', flag: '🇻🇳' },
  { code: 'tl', name: 'Filipino', nativeName: 'Filipino', rtl: false, region: 'Philippines', flag: '🇵🇭' },
  
  // Latin American Indigenous Languages
  { code: 'qu', name: 'Quechua', nativeName: 'Runasimi', rtl: false, region: 'Andes', flag: '🇵🇪' },
  { code: 'gn', name: 'Guarani', nativeName: 'Avañe\'ẽ', rtl: false, region: 'Paraguay', flag: '🇵🇾' },
  
  // Additional Important Languages
  { code: 'tr', name: 'Turkish', nativeName: 'Türkçe', rtl: false, region: 'Turkey', flag: '🇹🇷' },
  { code: 'fa', name: 'Persian', nativeName: 'فارسی', rtl: true, region: 'Iran/Afghanistan', flag: '🇮🇷' },
  { code: 'ps', name: 'Pashto', nativeName: 'پښتو', rtl: true, region: 'Afghanistan/Pakistan', flag: '🇦🇫' },
  { code: 'so', name: 'Somali', nativeName: 'Soomaali', rtl: false, region: 'Horn of Africa', flag: '🇸🇴' },
]

export const getLanguageByCode = (code: string): Language | undefined => {
  return supportedLanguages.find(lang => lang.code === code)
}

export const getLanguagesByRegion = (region: string): Language[] => {
  return supportedLanguages.filter(lang => lang.region.includes(region))
}

export const detectUserLanguage = (): string => {
  // Check browser language
  const browserLang = navigator.language.split('-')[0]
  
  // Check if we support this language
  if (supportedLanguages.some(lang => lang.code === browserLang)) {
    return browserLang
  }
  
  // Default to English
  return 'en'
}