/*
 * MedCare-AI - Humanitarian AI Platform for Rural Healthcare
 * 
 * Owner: Fahed Mlaiel
 * Contact: mlaiel@live.de
 * Notice: Attribution to Fahed Mlaiel is mandatory in all copies, forks, and derivatives.
 * 
 * This technology must always be provided for free under humanitarian license.
 */

import { useState, useEffect, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Badge } from '@/components/ui/badge'
import { Microphone, MicrophoneSlash, Volume2, Stop } from '@phosphor-icons/react'
import { useLanguage } from '@/hooks/useLanguage'
import { toast } from 'sonner'

interface VoiceInputProps {
  onTranscript: (text: string) => void
  disabled?: boolean
}

export default function VoiceInput({ onTranscript, disabled = false }: VoiceInputProps) {
  const [isListening, setIsListening] = useState(false)
  const [isSupported, setIsSupported] = useState(false)
  const [transcript, setTranscript] = useState('')
  const [interimTranscript, setInterimTranscript] = useState('')
  const { t, currentLanguage } = useLanguage()
  const recognitionRef = useRef<SpeechRecognition | null>(null)

  useEffect(() => {
    // Check if speech recognition is supported
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
    if (SpeechRecognition) {
      setIsSupported(true)
      recognitionRef.current = new SpeechRecognition()
      
      const recognition = recognitionRef.current
      recognition.continuous = true
      recognition.interimResults = true
      recognition.lang = getLanguageCode(currentLanguage)
      
      recognition.onstart = () => {
        setIsListening(true)
        toast.success(t.voiceInput + ' started')
      }
      
      recognition.onend = () => {
        setIsListening(false)
      }
      
      recognition.onresult = (event) => {
        let finalTranscript = ''
        let interimTranscript = ''
        
        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript
          if (event.results[i].isFinal) {
            finalTranscript += transcript
          } else {
            interimTranscript += transcript
          }
        }
        
        if (finalTranscript) {
          setTranscript(prev => prev + finalTranscript)
          onTranscript(transcript + finalTranscript)
        }
        setInterimTranscript(interimTranscript)
      }
      
      recognition.onerror = (event) => {
        console.error('Speech recognition error:', event.error)
        setIsListening(false)
        if (event.error === 'not-allowed') {
          toast.error('Microphone permission denied. Please allow microphone access.')
        } else if (event.error === 'no-speech') {
          toast.error('No speech detected. Please try speaking again.')
        } else {
          toast.error('Voice recognition error. Please try again.')
        }
      }
    }
    
    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.abort()
      }
    }
  }, [currentLanguage, onTranscript, t.voiceInput])

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

  const startListening = () => {
    if (recognitionRef.current && !isListening) {
      setTranscript('')
      setInterimTranscript('')
      recognitionRef.current.start()
    }
  }

  const stopListening = () => {
    if (recognitionRef.current && isListening) {
      recognitionRef.current.stop()
    }
  }

  const speakText = (text: string) => {
    if ('speechSynthesis' in window && text) {
      const utterance = new SpeechSynthesisUtterance(text)
      utterance.lang = getLanguageCode(currentLanguage)
      utterance.rate = 0.8
      utterance.pitch = 1
      window.speechSynthesis.speak(utterance)
    }
  }

  if (!isSupported) {
    return (
      <Alert>
        <MicrophoneSlash className="h-4 w-4" />
        <AlertDescription>
          Voice input is not supported in your browser. Please use text input instead.
        </AlertDescription>
      </Alert>
    )
  }

  return (
    <Card className="border-accent/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Microphone className="h-5 w-5 text-accent" />
          {t.voiceInput}
        </CardTitle>
        <CardDescription>
          Speak your symptoms in your native language. The AI will understand and analyze your description.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Voice Controls */}
        <div className="flex items-center gap-3">
          <Button
            onClick={isListening ? stopListening : startListening}
            disabled={disabled}
            variant={isListening ? "destructive" : "default"}
            className="flex-1"
          >
            {isListening ? (
              <>
                <Stop className="h-4 w-4 mr-2" />
                Stop Listening
              </>
            ) : (
              <>
                <Microphone className="h-4 w-4 mr-2" />
                Start Voice Input
              </>
            )}
          </Button>
          
          {transcript && (
            <Button
              onClick={() => speakText(transcript)}
              variant="outline"
              size="sm"
            >
              <Volume2 className="h-4 w-4 mr-2" />
              {t.speakText}
            </Button>
          )}
        </div>

        {/* Language Badge */}
        <div className="flex items-center gap-2">
          <Badge variant="secondary">
            Language: {currentLanguage.toUpperCase()}
          </Badge>
          {isListening && (
            <Badge variant="default" className="animate-pulse">
              Listening...
            </Badge>
          )}
        </div>

        {/* Live Transcript */}
        {(transcript || interimTranscript) && (
          <div className="space-y-2">
            <h4 className="text-sm font-medium text-foreground">Live Transcript:</h4>
            <div className="bg-muted/50 rounded-lg p-3 min-h-20">
              <p className="text-sm text-foreground">
                {transcript}
                <span className="text-muted-foreground italic">
                  {interimTranscript}
                </span>
              </p>
            </div>
          </div>
        )}

        {/* Instructions */}
        <Alert>
          <Microphone className="h-4 w-4" />
          <AlertDescription className="text-xs">
            <strong>Tips:</strong> Speak clearly and describe your symptoms in detail. 
            You can speak in your local language or dialect. The system works best in quiet environments.
          </AlertDescription>
        </Alert>
      </CardContent>
    </Card>
  )
}