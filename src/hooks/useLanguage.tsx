/*
 * MedCare-AI - Humanitarian AI Platform for Rural Healthcare
 * 
 * Owner: Fahed Mlaiel
 * Contact: mlaiel@live.de
 * Notice: Attribution to Fahed Mlaiel is mandatory in all copies, forks, and derivatives.
 * 
 * This technology must always be provided for free under humanitarian license.
 */

import { createContext, useContext, ReactNode } from 'react'
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
  const [currentLanguage, setCurrentLanguage] = useKV('user-language', detectUserLanguage())
  
  const translations = getTranslation(currentLanguage)
  const isRTL = ['ar', 'ur', 'fa', 'ps'].includes(currentLanguage)
  
  const setLanguage = (language: string) => {
    setCurrentLanguage(language)
    // Update document direction for RTL languages
    document.documentElement.dir = ['ar', 'ur', 'fa', 'ps'].includes(language) ? 'rtl' : 'ltr'
    document.documentElement.lang = language
  }

  return (
    <LanguageContext.Provider value={{
      currentLanguage,
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
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}