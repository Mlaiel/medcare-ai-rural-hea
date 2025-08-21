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
import SymptomInput from '@/components/medical/SymptomInput'
import LabTestUpload from '@/components/medical/LabTestUpload'
import DiagnosisHistory from '@/components/medical/DiagnosisHistory'

function App() {
  const [currentUser, setCurrentUser] = useKV('current-user', null)
  const [showDisclaimer, setShowDisclaimer] = useState(true)

  return (
    <div className="min-h-screen bg-background">
      {/* Medical Disclaimer Banner */}
      {showDisclaimer && (
        <Alert className="rounded-none border-destructive bg-destructive/5 border-b-2">
          <AlertTriangle className="h-5 w-5 text-destructive" />
          <AlertDescription className="text-sm font-medium">
            <strong>Medical Disclaimer:</strong> This AI tool provides preliminary guidance only and is NOT a substitute for professional medical care. 
            Always consult qualified healthcare providers for medical decisions. In emergencies, contact local emergency services immediately.
            <Button 
              variant="ghost" 
              size="sm" 
              className="ml-4 text-destructive hover:text-destructive/80"
              onClick={() => setShowDisclaimer(false)}
            >
              Understood
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
                  <h1 className="text-2xl font-bold text-foreground">MedCare-AI</h1>
                  <p className="text-sm text-muted-foreground">Humanitarian Healthcare Platform</p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Badge variant="secondary" className="hidden sm:flex">
                Free & Open Source
              </Badge>
              <Button variant="outline" size="sm">
                <Users className="h-4 w-4 mr-2" />
                Doctor Portal
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
              Welcome to MedCare-AI
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Get preliminary medical guidance, upload lab results for analysis, and connect with volunteer doctors worldwide. 
              Our AI-powered platform serves underserved communities with compassionate healthcare support.
            </p>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="border-primary/20 hover:border-primary/40 transition-colors cursor-pointer">
              <CardHeader className="text-center">
                <Stethoscope className="h-12 w-12 text-primary mx-auto mb-2" />
                <CardTitle className="text-lg">Describe Symptoms</CardTitle>
                <CardDescription>
                  Tell us how you're feeling and get preliminary diagnostic guidance
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-accent/20 hover:border-accent/40 transition-colors cursor-pointer">
              <CardHeader className="text-center">
                <Upload className="h-12 w-12 text-accent mx-auto mb-2" />
                <CardTitle className="text-lg">Upload Lab Results</CardTitle>
                <CardDescription>
                  Get your test results interpreted by AI and reviewed by doctors
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-muted-foreground/20 hover:border-muted-foreground/40 transition-colors cursor-pointer">
              <CardHeader className="text-center">
                <Users className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
                <CardTitle className="text-lg">Previous Consultations</CardTitle>
                <CardDescription>
                  Review your medical history and previous AI consultations
                </CardDescription>
              </CardHeader>
            </Card>
          </div>

          {/* Main Interface Tabs */}
          <Tabs defaultValue="symptoms" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="symptoms" className="flex items-center gap-2">
                <Stethoscope className="h-4 w-4" />
                Symptoms
              </TabsTrigger>
              <TabsTrigger value="lab-tests" className="flex items-center gap-2">
                <Upload className="h-4 w-4" />
                Lab Tests
              </TabsTrigger>
              <TabsTrigger value="history" className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                History
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
              <span>Created with humanitarian purpose by</span>
              <span className="font-semibold text-foreground">Fahed Mlaiel</span>
            </div>
            <p className="text-xs text-muted-foreground max-w-2xl mx-auto">
              MedCare-AI is free and open-source software designed to support underserved communities. 
              Attribution to Fahed Mlaiel (mlaiel@live.de) is mandatory in all copies, forks, and derivatives.
            </p>
            <div className="flex justify-center gap-4 text-xs text-muted-foreground">
              <span>Always Free</span>
              <span>•</span>
              <span>Open Source</span>
              <span>•</span>
              <span>Humanitarian License</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App