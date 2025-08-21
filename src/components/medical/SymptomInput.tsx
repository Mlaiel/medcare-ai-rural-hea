/*
 * MedCare-AI - Humanitarian AI Platform for Rural Healthcare
 * 
 * Owner: Fahed Mlaiel
 * Contact: mlaiel@live.de
 * Notice: Attribution to Fahed Mlaiel is mandatory in all copies, forks, and derivatives.
 */

import { useState } from 'react'
import { useKV } from '@github/spark/hooks'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Progress } from '@/components/ui/progress'
import { Microphone, Send, Loader2, CheckCircle, AlertTriangle } from '@phosphor-icons/react'
import { toast } from 'sonner'
import { useLanguage } from '@/hooks/useLanguage'

interface Diagnosis {
  id: string
  timestamp: Date
  symptoms: string
  analysis: string
  confidence: number
  recommendations: string[]
  severity: 'low' | 'moderate' | 'high' | 'urgent'
  reviewedByDoctor: boolean
}

export default function SymptomInput() {
  const [symptoms, setSymptoms] = useState('')
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [currentDiagnosis, setCurrentDiagnosis] = useState<Diagnosis | null>(null)
  const [diagnoses, setDiagnoses] = useKV<Diagnosis[]>('medical-diagnoses', [])
  const { t, currentLanguage } = useLanguage()

  const handleSymptomAnalysis = async () => {
    if (!symptoms.trim()) {
      toast.error('Please describe your symptoms first')
      return
    }

    setIsAnalyzing(true)

    try {
      const prompt = spark.llmPrompt`
        You are a medical AI assistant providing preliminary diagnostic guidance for underserved rural communities. 
        Analyze these symptoms and provide a helpful, cautious assessment.
        
        IMPORTANT: Respond in ${currentLanguage} language, using culturally appropriate and simple language suitable for rural communities.

        Patient symptoms: ${symptoms}

        Provide a JSON response with:
        - analysis: Brief explanation of possible conditions (2-3 sentences) in ${currentLanguage}
        - confidence: Number 1-100 representing diagnostic confidence
        - recommendations: Array of 3-4 practical next steps in ${currentLanguage}
        - severity: "low", "moderate", "high", or "urgent"
        - disclaimer: Reminder that this is preliminary guidance only in ${currentLanguage}

        Be empathetic, avoid medical jargon, and emphasize when immediate medical care is needed.
        Consider cultural context and local healthcare availability in your recommendations.
      `

      const response = await spark.llm(prompt, 'gpt-4o', true)
      const aiResult = JSON.parse(response)

      const newDiagnosis: Diagnosis = {
        id: Date.now().toString(),
        timestamp: new Date(),
        symptoms,
        analysis: aiResult.analysis,
        confidence: aiResult.confidence,
        recommendations: aiResult.recommendations,
        severity: aiResult.severity,
        reviewedByDoctor: false
      }

      setCurrentDiagnosis(newDiagnosis)
      setDiagnoses(currentDiagnoses => [newDiagnosis, ...currentDiagnoses])
      
      toast.success(t.success + '! Review your preliminary assessment below.')
      
    } catch (error) {
      toast.error('Unable to analyze symptoms. Please try again.')
      console.error('Analysis error:', error)
    } finally {
      setIsAnalyzing(false)
    }
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'urgent': return 'bg-destructive text-destructive-foreground'
      case 'high': return 'bg-orange-500 text-white'
      case 'moderate': return 'bg-yellow-500 text-white'
      default: return 'bg-green-500 text-white'
    }
  }

  const getSeverityIcon = (severity: string) => {
    if (severity === 'urgent' || severity === 'high') {
      return <AlertTriangle className="h-4 w-4" />
    }
    return <CheckCircle className="h-4 w-4" />
  }

  return (
    <div className="space-y-6">
      {/* Symptom Input Form */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Microphone className="h-5 w-5 text-primary" />
            {t.howAreYouFeeling}
          </CardTitle>
          <CardDescription>
            {t.describeYourSymptoms}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="symptoms">{t.symptoms}</Label>
            <Textarea
              id="symptoms"
              placeholder={t.symptomPlaceholder}
              className="min-h-32 resize-y"
              value={symptoms}
              onChange={(e) => setSymptoms(e.target.value)}
              disabled={isAnalyzing}
            />
          </div>

          <div className="flex gap-3">
            <Button 
              onClick={handleSymptomAnalysis}
              disabled={isAnalyzing || !symptoms.trim()}
              className="flex-1"
            >
              {isAnalyzing ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  {t.analyzing}
                </>
              ) : (
                <>
                  <Send className="h-4 w-4 mr-2" />
                  {t.analyzeSymptoms}
                </>
              )}
            </Button>
            
            <Button variant="outline" disabled>
              <Microphone className="h-4 w-4 mr-2" />
              {t.useVoiceInput}
              <Badge variant="secondary" className="ml-2 text-xs">Soon</Badge>
            </Button>
          </div>

          {isAnalyzing && (
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span>{t.analyzing}</span>
                <span>{t.loading}</span>
              </div>
              <Progress value={66} className="h-2" />
            </div>
          )}
        </CardContent>
      </Card>

      {/* AI Analysis Results */}
      {currentDiagnosis && (
        <Card className="border-primary/20">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-500" />
                Preliminary AI Assessment
              </CardTitle>
              <div className="flex items-center gap-2">
                <Badge className={getSeverityColor(currentDiagnosis.severity)}>
                  {getSeverityIcon(currentDiagnosis.severity)}
                  {currentDiagnosis.severity.toUpperCase()}
                </Badge>
                <Badge variant="outline">
                  {currentDiagnosis.confidence}% Confidence
                </Badge>
              </div>
            </div>
            <CardDescription>
              Generated on {currentDiagnosis.timestamp.toLocaleDateString()} at {currentDiagnosis.timestamp.toLocaleTimeString()}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Critical Warning for Urgent Cases */}
            {currentDiagnosis.severity === 'urgent' && (
              <Alert className="border-destructive bg-destructive/5">
                <AlertTriangle className="h-4 w-4 text-destructive" />
                <AlertDescription className="font-medium text-destructive">
                  <strong>{t.emergency}:</strong> Your symptoms may require immediate medical attention. 
                  Please contact emergency services or visit the nearest hospital immediately.
                </AlertDescription>
              </Alert>
            )}

            {/* AI Analysis */}
            <div className="space-y-3">
              <h4 className="font-semibold text-foreground">AI Analysis</h4>
              <p className="text-muted-foreground leading-relaxed">
                {currentDiagnosis.analysis}
              </p>
            </div>

            {/* Recommendations */}
            <div className="space-y-3">
              <h4 className="font-semibold text-foreground">Recommended Next Steps</h4>
              <ul className="space-y-2">
                {currentDiagnosis.recommendations.map((rec, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">{rec}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Doctor Review Status */}
            <div className="pt-4 border-t">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Badge variant={currentDiagnosis.reviewedByDoctor ? 'default' : 'secondary'}>
                    {currentDiagnosis.reviewedByDoctor ? 'Doctor Reviewed' : 'Pending Doctor Review'}
                  </Badge>
                </div>
                <Button variant="outline" size="sm">
                  Request Doctor Review
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Medical Disclaimer */}
      <Alert>
        <AlertTriangle className="h-4 w-4" />
        <AlertDescription>
          <strong>{t.medicalDisclaimer}</strong> {t.medicalDisclaimerText}
        </AlertDescription>
      </Alert>
    </div>
  )
}