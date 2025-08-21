/*
 * MedCare-AI - Humanitarian AI Platform for Rural Healthcare
 * 
 * Owner: Fahed Mlaiel
 * Contact: mlaiel@live.de
 * Notice: Attribution to Fahed Mlaiel is mandatory in all copies, forks, and derivatives.
 * 
 * This technology must always be provided for free under humanitarian license.
 */

import { createContext, useContext, ReactNode, useEffect } from 'react'
import { useKV } from '@github/spark/hooks'
import { getTranslation, Translations } from '@/lib/translations'
import { detectUserLanguage } from '@/lib/languages'

interface LanguageContextType {
  currentLanguage: string
  setLanguage: (language: string) => void
  t: Translations
  isRTL: boolean
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [currentLanguage, setCurrentLanguage] = useKV('user-language', 'en')
  
  // Initialize with detected language if no stored preference
  useEffect(() => {
    if (!currentLanguage) {
      setCurrentLanguage(detectUserLanguage())
    }
  }, [currentLanguage, setCurrentLanguage])
  
  const translations = getTranslation(currentLanguage || 'en')
  const isRTL = ['ar', 'ur', 'fa', 'ps'].includes(currentLanguage || 'en')
  
  const setLanguage = (language: string) => {
    setCurrentLanguage(language)
    // Update document direction for RTL languages
    document.documentElement.dir = ['ar', 'ur', 'fa', 'ps'].includes(language) ? 'rtl' : 'ltr'
    document.documentElement.lang = language
  }

  // Initialize document language and direction on mount
  useEffect(() => {
    const lang = currentLanguage || 'en'
    const rtl = ['ar', 'ur', 'fa', 'ps'].includes(lang)
    document.documentElement.dir = rtl ? 'rtl' : 'ltr'
    document.documentElement.lang = lang
  }, [currentLanguage])

  return (
    <LanguageContext.Provider value={{
      currentLanguage: currentLanguage || 'en',
      setLanguage,
      t: translations,
      isRTL
    }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    // Provide a fallback instead of throwing error
    console.warn('useLanguage must be used within a LanguageProvider. Using fallback values.')
    return {
      currentLanguage: 'en',
      setLanguage: () => {},
      t: getTranslation('en'),
      isRTL: false
    }
  }
  return context
}