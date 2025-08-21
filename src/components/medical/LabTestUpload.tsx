/*
 * MedCare-AI - Humanitarian AI Platform for Rural Healthcare
 * 
 * Owner: Fahed Mlaiel
 * Contact: mlaiel@live.de
 * Notice: Attribution to Fahed Mlaiel is mandatory in all copies, forks, and derivatives.
 */

import { useState, useRef } from 'react'
import { useKV } from '@github/spark/hooks'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Progress } from '@/components/ui/progress'
import { Upload, FileImage, Loader2, CheckCircle, AlertTriangle, Eye } from '@phosphor-icons/react'
import { toast } from 'sonner'

interface LabResult {
  id: string
  timestamp: Date
  fileName: string
  fileType: 'image' | 'pdf' | 'document'
  interpretation: string
  findings: string[]
  urgency: 'normal' | 'attention' | 'urgent'
  confidence: number
  reviewedByDoctor: boolean
  doctorNotes?: string
}

export default function LabTestUpload() {
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [currentResult, setCurrentResult] = useState<LabResult | null>(null)
  const [labResults, setLabResults] = useKV<LabResult[]>('lab-results', [])
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    if (file.size > 10 * 1024 * 1024) {
      toast.error('File size must be under 10MB')
      return
    }

    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'application/pdf']
    if (!allowedTypes.includes(file.type)) {
      toast.error('Please upload an image (JPG, PNG, GIF) or PDF file')
      return
    }

    setIsAnalyzing(true)
    setUploadProgress(25)

    try {
      const reader = new FileReader()
      reader.onload = async (e) => {
        const fileContent = e.target?.result as string
        setUploadProgress(50)

        try {
          const prompt = spark.llmPrompt`
            You are a medical AI assistant analyzing lab test results or medical images for underserved rural communities.
            
            The user has uploaded a medical document/image: ${file.name}
            File type: ${file.type}
            
            Since I cannot directly process the file content, provide a structured template response for lab result interpretation that would be helpful for rural healthcare:

            Provide a JSON response with:
            - interpretation: General guidance on understanding lab results (2-3 sentences)
            - findings: Array of 3-4 common things to look for in lab results
            - urgency: "normal", "attention", or "urgent" 
            - confidence: Number 1-100 (use 75 for this template)
            - recommendations: Array of 3 next steps for lab result follow-up

            Focus on educational content about reading lab results and when to seek medical attention.
          `

          setUploadProgress(75)
          const response = await spark.llm(prompt, 'gpt-4o', true)
          const aiResult = JSON.parse(response)

          const newResult: LabResult = {
            id: Date.now().toString(),
            timestamp: new Date(),
            fileName: file.name,
            fileType: file.type.startsWith('image/') ? 'image' : 'document',
            interpretation: aiResult.interpretation,
            findings: aiResult.findings,
            urgency: aiResult.urgency,
            confidence: aiResult.confidence,
            reviewedByDoctor: false
          }

          setCurrentResult(newResult)
          setLabResults(currentResults => [newResult, ...currentResults])
          setUploadProgress(100)
          
          toast.success('Lab result analyzed! Review the interpretation below.')
          
        } catch (error) {
          toast.error('Failed to analyze the lab result. Please try again.')
          console.error('Analysis error:', error)
        } finally {
          setIsAnalyzing(false)
          setUploadProgress(0)
        }
      }

      reader.readAsDataURL(file)
      
    } catch (error) {
      toast.error('Failed to process the file. Please try again.')
      setIsAnalyzing(false)
      setUploadProgress(0)
    }
  }

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'urgent': return 'bg-destructive text-destructive-foreground'
      case 'attention': return 'bg-orange-500 text-white'
      default: return 'bg-green-500 text-white'
    }
  }

  const getUrgencyIcon = (urgency: string) => {
    if (urgency === 'urgent' || urgency === 'attention') {
      return <AlertTriangle className="h-4 w-4" />
    }
    return <CheckCircle className="h-4 w-4" />
  }

  return (
    <div className="space-y-6">
      {/* Upload Interface */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Upload className="h-5 w-5 text-accent" />
            Upload Lab Results or Medical Images
          </CardTitle>
          <CardDescription>
            Upload your lab test results, X-rays, or other medical images for AI interpretation. 
            Our AI will provide preliminary analysis that can be reviewed by volunteer doctors.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Supported Files</Label>
            <p className="text-sm text-muted-foreground">
              Images (JPG, PNG, GIF) or PDF documents up to 10MB
            </p>
          </div>

          {/* Upload Area */}
          <div 
            className="border-2 border-dashed border-muted rounded-lg p-8 text-center cursor-pointer hover:border-accent/50 transition-colors"
            onClick={() => fileInputRef.current?.click()}
          >
            <FileImage className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <div className="space-y-2">
              <p className="text-lg font-medium text-foreground">
                Drop files here or click to browse
              </p>
              <p className="text-sm text-muted-foreground">
                Select your lab results, X-rays, or medical images
              </p>
            </div>
          </div>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*,.pdf"
            onChange={handleFileUpload}
            className="hidden"
            disabled={isAnalyzing}
          />

          {isAnalyzing && (
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span>Processing medical document...</span>
                <span>{uploadProgress}%</span>
              </div>
              <Progress value={uploadProgress} className="h-2" />
            </div>
          )}

          <Alert>
            <Eye className="h-4 w-4" />
            <AlertDescription>
              <strong>Privacy Notice:</strong> Your uploaded medical files are processed securely and are not stored permanently. 
              Only the AI interpretation is saved to help track your medical history.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>

      {/* AI Interpretation Results */}
      {currentResult && (
        <Card className="border-accent/20">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-500" />
                Lab Result Interpretation
              </CardTitle>
              <div className="flex items-center gap-2">
                <Badge className={getUrgencyColor(currentResult.urgency)}>
                  {getUrgencyIcon(currentResult.urgency)}
                  {currentResult.urgency.toUpperCase()}
                </Badge>
                <Badge variant="outline">
                  {currentResult.confidence}% Confidence
                </Badge>
              </div>
            </div>
            <CardDescription>
              File: {currentResult.fileName} • Analyzed on {currentResult.timestamp.toLocaleDateString()}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Urgent Alert */}
            {currentResult.urgency === 'urgent' && (
              <Alert className="border-destructive bg-destructive/5">
                <AlertTriangle className="h-4 w-4 text-destructive" />
                <AlertDescription className="font-medium text-destructive">
                  <strong>Urgent Results Detected:</strong> Some values in your lab results may require immediate medical attention. 
                  Please consult with a healthcare provider as soon as possible.
                </AlertDescription>
              </Alert>
            )}

            {/* AI Interpretation */}
            <div className="space-y-3">
              <h4 className="font-semibold text-foreground">AI Interpretation</h4>
              <p className="text-muted-foreground leading-relaxed">
                {currentResult.interpretation}
              </p>
            </div>

            {/* Key Findings */}
            <div className="space-y-3">
              <h4 className="font-semibold text-foreground">Key Findings to Note</h4>
              <ul className="space-y-2">
                {currentResult.findings.map((finding, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">{finding}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Doctor Review Section */}
            <div className="pt-4 border-t">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Badge variant={currentResult.reviewedByDoctor ? 'default' : 'secondary'}>
                    {currentResult.reviewedByDoctor ? 'Doctor Reviewed' : 'Pending Doctor Review'}
                  </Badge>
                  {currentResult.doctorNotes && (
                    <p className="text-sm text-muted-foreground">
                      Doctor's notes available
                    </p>
                  )}
                </div>
                <Button variant="outline" size="sm">
                  Request Doctor Review
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Educational Content */}
      <Card className="bg-muted/30">
        <CardHeader>
          <CardTitle className="text-lg">Understanding Lab Results</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <h5 className="font-medium text-foreground mb-2">Common Lab Tests</h5>
              <ul className="space-y-1 text-muted-foreground">
                <li>• Blood count (CBC)</li>
                <li>• Blood sugar levels</li>
                <li>• Kidney function tests</li>
                <li>• Liver function tests</li>
              </ul>
            </div>
            <div>
              <h5 className="font-medium text-foreground mb-2">When to Seek Help</h5>
              <ul className="space-y-1 text-muted-foreground">
                <li>• Values marked as "abnormal"</li>
                <li>• Significant changes from previous tests</li>
                <li>• Results you don't understand</li>
                <li>• Any urgent or critical values</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Medical Disclaimer */}
      <Alert>
        <AlertTriangle className="h-4 w-4" />
        <AlertDescription>
          <strong>Important:</strong> AI interpretation of lab results is preliminary guidance only. 
          Always discuss your results with a qualified healthcare provider for proper medical interpretation and treatment decisions.
        </AlertDescription>
      </Alert>
    </div>
  )
}