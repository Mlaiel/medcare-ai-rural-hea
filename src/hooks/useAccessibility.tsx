/*
 * MedCare-AI - Humanitarian AI Platform for Rural Healthcare
 * 
 * Owner: Fahed Mlaiel
 * Contact: mlaiel@live.de
 * Notice: Attribution to Fahed Mlaiel is mandatory in all copies, forks, and derivatives.
 * 
 * This technology must always be provided for free under humanitarian license.
 */

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { useKV } from '@github/spark/hooks'

interface AccessibilitySettings {
  screenReaderEnabled: boolean
  highContrastMode: boolean
  largeTextMode: boolean
  voiceNavigationEnabled: boolean
  autoReadContent: boolean
  reducedMotion: boolean
}

interface AccessibilityContextType {
  settings: AccessibilitySettings
  updateSettings: (updates: Partial<AccessibilitySettings>) => void
  speakText: (text: string) => void
  announceMessage: (message: string) => void
}

const defaultSettings: AccessibilitySettings = {
  screenReaderEnabled: false,
  highContrastMode: false,
  largeTextMode: false,
  voiceNavigationEnabled: false,
  autoReadContent: false,
  reducedMotion: false
}

const AccessibilityContext = createContext<AccessibilityContextType | undefined>(undefined)

export function AccessibilityProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useKV('accessibility-settings', defaultSettings)
  const [currentLanguage, setCurrentLanguage] = useState('en')

  const updateSettings = (updates: Partial<AccessibilitySettings>) => {
    setSettings(prev => ({ ...prev, ...updates }))
  }

  const getLanguageCode = (lang: string): string => {
    const languageCodes: Record<string, string> = {
      'en': 'en-US',
      'es': 'es-ES',
      'fr': 'fr-FR',
      'ar': 'ar-SA',
      'pt': 'pt-BR',
      'sw': 'sw-KE',
      'ha': 'ha-NG',
      'hi': 'hi-IN',
      'bn': 'bn-BD',
      'ur': 'ur-PK',
      'ta': 'ta-IN',
      'te': 'te-IN',
      'id': 'id-ID',
      'ms': 'ms-MY',
      'th': 'th-TH',
      'vi': 'vi-VN',
      'tl': 'tl-PH',
      'tr': 'tr-TR',
      'fa': 'fa-IR'
    }
    return languageCodes[lang] || 'en-US'
  }

  const speakText = (text: string) => {
    if ('speechSynthesis' in window && text && settings.screenReaderEnabled) {
      // Cancel any ongoing speech
      window.speechSynthesis.cancel()
      
      const utterance = new SpeechSynthesisUtterance(text)
      utterance.lang = getLanguageCode(currentLanguage)
      utterance.rate = 0.8
      utterance.pitch = 1
      utterance.volume = 0.8
      
      window.speechSynthesis.speak(utterance)
    }
  }

  const announceMessage = (message: string) => {
    if (settings.screenReaderEnabled) {
      // Create a live region for screen reader announcements
      const announcement = document.createElement('div')
      announcement.setAttribute('aria-live', 'polite')
      announcement.setAttribute('aria-atomic', 'true')
      announcement.className = 'sr-only'
      announcement.textContent = message
      
      document.body.appendChild(announcement)
      
      // Remove after announcement
      setTimeout(() => {
        document.body.removeChild(announcement)
      }, 1000)
      
      // Also speak the message
      speakText(message)
    }
  }

  // Get current language from localStorage or document lang for speech synthesis
  useEffect(() => {
    const updateLanguage = () => {
      const storedLang = localStorage.getItem('spark.kv.user-language')
      if (storedLang) {
        try {
          setCurrentLanguage(JSON.parse(storedLang))
        } catch {
          setCurrentLanguage(document.documentElement.lang || 'en')
        }
      } else {
        setCurrentLanguage(document.documentElement.lang || 'en')
      }
    }
    
    updateLanguage()
    
    // Listen for language changes
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'attributes' && mutation.attributeName === 'lang') {
          updateLanguage()
        }
      })
    })
    
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['lang']
    })
    
    return () => observer.disconnect()
  }, [])

  // Apply accessibility settings to document
  useEffect(() => {
    const root = document.documentElement
    
    // High contrast mode
    if (settings.highContrastMode) {
      root.classList.add('high-contrast')
    } else {
      root.classList.remove('high-contrast')
    }
    
    // Large text mode
    if (settings.largeTextMode) {
      root.style.fontSize = '120%'
    } else {
      root.style.fontSize = ''
    }
    
    // Reduced motion
    if (settings.reducedMotion) {
      root.style.setProperty('--animation-duration', '0.01ms')
      root.style.setProperty('--transition-duration', '0.01ms')
    } else {
      root.style.removeProperty('--animation-duration')
      root.style.removeProperty('--transition-duration')
    }
    
  }, [settings])

  return (
    <AccessibilityContext.Provider value={{
      settings,
      updateSettings,
      speakText,
      announceMessage
    }}>
      {children}
    </AccessibilityContext.Provider>
  )
}

export function useAccessibility() {
  const context = useContext(AccessibilityContext)
  if (context === undefined) {
    throw new Error('useAccessibility must be used within an AccessibilityProvider')
  }
  return context
}