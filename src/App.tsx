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
import { Toaster } from '@/components/ui/sonner'
import { Heart, Stethoscope, Upload, Users, Warning } from '@phosphor-icons/react'
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
        <Alert className="rounded-none border-destructive bg-destructive/5 border-b-2 mx-3 sm:mx-0">
          <Warning className="h-4 w-4 sm:h-5 sm:w-5 text-destructive flex-shrink-0" />
          <AlertDescription className="text-xs sm:text-sm font-medium leading-relaxed">
            <strong>{t.medicalDisclaimer}</strong> {t.medicalDisclaimerText}
            <Button 
              variant="ghost" 
              size="sm" 
              className="ml-2 sm:ml-4 text-destructive hover:text-destructive/80 h-auto p-1 text-xs sm:text-sm"
              onClick={() => setShowDisclaimer(false)}
            >
              {t.understood}
            </Button>
          </AlertDescription>
        </Alert>
      )}

      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-3 sm:px-4 lg:px-6 py-3 sm:py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="flex items-center gap-2">
                <Heart className="h-6 w-6 sm:h-8 sm:w-8 text-primary flex-shrink-0" weight="fill" />
                <div className="min-w-0">
                  <h1 className="text-lg sm:text-xl lg:text-2xl font-bold text-foreground truncate">{t.appTitle}</h1>
                  <p className="text-xs sm:text-sm text-muted-foreground hidden sm:block">{t.appSubtitle}</p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2 sm:gap-4">
              <div className="flex items-center gap-1 sm:gap-2">
                <AccessibilityPanel />
                <LanguageSelector />
              </div>
              <Badge variant="secondary" className="hidden lg:flex text-xs">
                {t.freeOpenSource}
              </Badge>
              <Button variant="outline" size="sm" className="hidden md:flex">
                <Users className="h-4 w-4 mr-2" />
                <span className="hidden lg:inline">{t.doctorPortal}</span>
                <Users className="h-4 w-4 lg:hidden" />
              </Button>
              {/* Mobile menu button */}
              <Button variant="ghost" size="sm" className="md:hidden">
                <Users className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-3 sm:px-4 lg:px-6 py-4 sm:py-6 lg:py-8">
        <div className="max-w-6xl mx-auto space-y-6 sm:space-y-8">
          {/* Welcome Section */}
          <div className="text-center space-y-3 sm:space-y-4 px-2">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground leading-tight">
              {t.welcomeTitle}
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              {t.welcomeDescription}
            </p>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            <Card className="border-primary/20 hover:border-primary/40 transition-all duration-300 hover:shadow-lg hover:scale-[1.02] cursor-pointer">
              <CardHeader className="text-center p-4 sm:p-6">
                <Stethoscope className="h-10 w-10 sm:h-12 sm:w-12 text-primary mx-auto mb-3" />
                <CardTitle className="text-base sm:text-lg">{t.describeSymptoms}</CardTitle>
                <CardDescription className="text-sm leading-relaxed">
                  {t.describeSymptomsDesc}
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-accent/20 hover:border-accent/40 transition-all duration-300 hover:shadow-lg hover:scale-[1.02] cursor-pointer">
              <CardHeader className="text-center p-4 sm:p-6">
                <Upload className="h-10 w-10 sm:h-12 sm:w-12 text-accent mx-auto mb-3" />
                <CardTitle className="text-base sm:text-lg">{t.uploadLabResults}</CardTitle>
                <CardDescription className="text-sm leading-relaxed">
                  {t.uploadLabResultsDesc}
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-muted-foreground/20 hover:border-muted-foreground/40 transition-all duration-300 hover:shadow-lg hover:scale-[1.02] cursor-pointer sm:col-span-2 lg:col-span-1">
              <CardHeader className="text-center p-4 sm:p-6">
                <Users className="h-10 w-10 sm:h-12 sm:w-12 text-muted-foreground mx-auto mb-3" />
                <CardTitle className="text-base sm:text-lg">{t.previousConsultations}</CardTitle>
                <CardDescription className="text-sm leading-relaxed">
                  {t.previousConsultationsDesc}
                </CardDescription>
              </CardHeader>
            </Card>
          </div>

          {/* Main Interface Tabs */}
          <Tabs defaultValue="symptoms" className="w-full">
            <TabsList className="grid w-full grid-cols-3 h-auto p-1 bg-muted/50">
              <TabsTrigger value="symptoms" className="flex flex-col sm:flex-row items-center gap-1 sm:gap-2 py-3 px-2 sm:px-4 text-xs sm:text-sm data-[state=active]:bg-background">
                <Stethoscope className="h-4 w-4 sm:h-4 sm:w-4" />
                <span className="truncate">{t.symptoms}</span>
              </TabsTrigger>
              <TabsTrigger value="lab-tests" className="flex flex-col sm:flex-row items-center gap-1 sm:gap-2 py-3 px-2 sm:px-4 text-xs sm:text-sm data-[state=active]:bg-background">
                <Upload className="h-4 w-4 sm:h-4 sm:w-4" />
                <span className="truncate">{t.labTests}</span>
              </TabsTrigger>
              <TabsTrigger value="history" className="flex flex-col sm:flex-row items-center gap-1 sm:gap-2 py-3 px-2 sm:px-4 text-xs sm:text-sm data-[state=active]:bg-background">
                <Users className="h-4 w-4 sm:h-4 sm:w-4" />
                <span className="truncate">{t.history}</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="symptoms" className="mt-4 sm:mt-6">
              <SymptomInput />
            </TabsContent>

            <TabsContent value="lab-tests" className="mt-4 sm:mt-6">
              <LabTestUpload />
            </TabsContent>

            <TabsContent value="history" className="mt-4 sm:mt-6">
              <DiagnosisHistory />
            </TabsContent>
          </Tabs>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t bg-muted/30 mt-12 sm:mt-16">
        <div className="container mx-auto px-3 sm:px-4 lg:px-6 py-6 sm:py-8">
          <div className="text-center space-y-3 sm:space-y-4">
            <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
              <Heart className="h-4 w-4 text-primary flex-shrink-0" weight="fill" />
              <span className="text-xs sm:text-sm">{t.createdBy}</span>
              <span className="font-semibold text-foreground text-xs sm:text-sm">Fahed Mlaiel</span>
            </div>
            <p className="text-xs text-muted-foreground max-w-2xl mx-auto leading-relaxed px-4">
              {t.attributionNotice}
            </p>
            <div className="flex flex-wrap justify-center gap-2 sm:gap-4 text-xs text-muted-foreground">
              <span>{t.alwaysFree}</span>
              <span className="hidden sm:inline">•</span>
              <span>{t.openSource}</span>
              <span className="hidden sm:inline">•</span>
              <span>{t.humanitarianLicense}</span>
            </div>
          </div>
        </div>
      </footer>
      
      <Toaster />
    </div>
  )
}

function App() {
  return (
    <LanguageProvider>
      <AccessibilityProvider>
        <AppContent />
      </AccessibilityProvider>
    </LanguageProvider>
  )
}

export default App