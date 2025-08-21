/*
 * MedCare-AI - Humanitarian AI Platform for Rural Healthcare
 * 
 * Owner: Fahed Mlaiel
 * Contact: mlaiel@live.de
 * Notice: Attribution to Fahed Mlaiel is mandatory in all copies, forks, and derivatives.
 * 
 * This technology must always be provided for free under humanitarian license.
 */

import { useState } from 'react'
import { useKV } from '@github/spark/hooks'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Heart, Stethoscope, Upload, Users, AlertTriangle } from '@phosphor-icons/react'
import { LanguageProvider, useLanguage } from '@/hooks/useLanguage'
import { AccessibilityProvider } from '@/hooks/useAccessibility'
import LanguageSelector from '@/components/language/LanguageSelector'
import AccessibilityPanel from '@/components/accessibility/AccessibilityPanel'
import SymptomInput from './components/medical/SymptomInput'
import LabTestUpload from './components/medical/LabTestUpload'
import DiagnosisHistory from './components/medical/DiagnosisHistory'

function AppContent() {
  const [currentUser, setCurrentUser] = useKV('current-user', null)
  const [showDisclaimer, setShowDisclaimer] = useState(true)
  const { t, isRTL } = useLanguage()

  return (
    <div className={`min-h-screen bg-background ${isRTL ? 'rtl' : 'ltr'}`}>
      {/* Medical Disclaimer Banner */}
      {showDisclaimer && (
        <Alert className="rounded-none border-destructive bg-destructive/5 border-b-2">
          <AlertTriangle className="h-5 w-5 text-destructive" />
          <AlertDescription className="text-sm font-medium">
            <strong>{t.medicalDisclaimer}</strong> {t.medicalDisclaimerText}
            <Button 
              variant="ghost" 
              size="sm" 
              className="ml-4 text-destructive hover:text-destructive/80"
              onClick={() => setShowDisclaimer(false)}
            >
              {t.understood}
            </Button>
          </AlertDescription>
        </Alert>
      )}

      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <Heart className="h-8 w-8 text-primary" weight="fill" />
                <div>
                  <h1 className="text-2xl font-bold text-foreground">{t.appTitle}</h1>
                  <p className="text-sm text-muted-foreground">{t.appSubtitle}</p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <AccessibilityPanel />
              <LanguageSelector />
              <Badge variant="secondary" className="hidden sm:flex">
                {t.freeOpenSource}
              </Badge>
              <Button variant="outline" size="sm">
                <Users className="h-4 w-4 mr-2" />
                {t.doctorPortal}
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Welcome Section */}
          <div className="text-center space-y-4">
            <h2 className="text-3xl font-bold text-foreground">
              {t.welcomeTitle}
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {t.welcomeDescription}
            </p>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="border-primary/20 hover:border-primary/40 transition-colors cursor-pointer">
              <CardHeader className="text-center">
                <Stethoscope className="h-12 w-12 text-primary mx-auto mb-2" />
                <CardTitle className="text-lg">{t.describeSymptoms}</CardTitle>
                <CardDescription>
                  {t.describeSymptomsDesc}
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-accent/20 hover:border-accent/40 transition-colors cursor-pointer">
              <CardHeader className="text-center">
                <Upload className="h-12 w-12 text-accent mx-auto mb-2" />
                <CardTitle className="text-lg">{t.uploadLabResults}</CardTitle>
                <CardDescription>
                  {t.uploadLabResultsDesc}
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-muted-foreground/20 hover:border-muted-foreground/40 transition-colors cursor-pointer">
              <CardHeader className="text-center">
                <Users className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
                <CardTitle className="text-lg">{t.previousConsultations}</CardTitle>
                <CardDescription>
                  {t.previousConsultationsDesc}
                </CardDescription>
              </CardHeader>
            </Card>
          </div>

          {/* Main Interface Tabs */}
          <Tabs defaultValue="symptoms" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="symptoms" className="flex items-center gap-2">
                <Stethoscope className="h-4 w-4" />
                {t.symptoms}
              </TabsTrigger>
              <TabsTrigger value="lab-tests" className="flex items-center gap-2">
                <Upload className="h-4 w-4" />
                {t.labTests}
              </TabsTrigger>
              <TabsTrigger value="history" className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                {t.history}
              </TabsTrigger>
            </TabsList>

            <TabsContent value="symptoms" className="mt-6">
              <SymptomInput />
            </TabsContent>

            <TabsContent value="lab-tests" className="mt-6">
              <LabTestUpload />
            </TabsContent>

            <TabsContent value="history" className="mt-6">
              <DiagnosisHistory />
            </TabsContent>
          </Tabs>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t bg-muted/30 mt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
              <Heart className="h-4 w-4 text-primary" weight="fill" />
              <span>{t.createdBy}</span>
              <span className="font-semibold text-foreground">Fahed Mlaiel</span>
            </div>
            <p className="text-xs text-muted-foreground max-w-2xl mx-auto">
              {t.attributionNotice}
            </p>
            <div className="flex justify-center gap-4 text-xs text-muted-foreground">
              <span>{t.alwaysFree}</span>
              <span>•</span>
              <span>{t.openSource}</span>
              <span>•</span>
              <span>{t.humanitarianLicense}</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

function App() {
  return (
    <AccessibilityProvider>
      <LanguageProvider>
        <AppContent />
      </LanguageProvider>
    </AccessibilityProvider>
  )
}

export default App