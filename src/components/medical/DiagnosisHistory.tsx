/*
 * MedCare-AI - Humanitarian AI Platform for Rural Healthcare
 * 
 * Owner: Fahed Mlaiel
 * Contact: mlaiel@live.de
 * Notice: Attribution to Fahed Mlaiel is mandatory in all copies, forks, and derivatives.
 */

import { useKV } from '@github/spark/hooks'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { ScrollArea } from '@/components/ui/scroll-area'
import { 
  Clock, 
  Stethoscope, 
  Upload, 
  CheckCircle, 
  AlertTriangle, 
  FileText, 
  Calendar,
  TrendingUp,
  User
} from '@phosphor-icons/react'

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

export default function DiagnosisHistory() {
  const [diagnoses] = useKV<Diagnosis[]>('medical-diagnoses', [])
  const [labResults] = useKV<LabResult[]>('lab-results', [])

  const allRecords = [
    ...diagnoses.map(d => ({ ...d, type: 'diagnosis' as const })),
    ...labResults.map(l => ({ ...l, type: 'lab' as const }))
  ].sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'urgent': return 'border-destructive bg-destructive/5 text-destructive'
      case 'high':
      case 'attention': return 'border-orange-500 bg-orange-50 text-orange-700'
      case 'moderate': return 'border-yellow-500 bg-yellow-50 text-yellow-700'
      default: return 'border-green-500 bg-green-50 text-green-700'
    }
  }

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 80) return 'text-green-600'
    if (confidence >= 60) return 'text-yellow-600'
    return 'text-orange-600'
  }

  const formatTimeAgo = (date: Date) => {
    const now = new Date()
    const diffMs = now.getTime() - new Date(date).getTime()
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60))
    const diffMinutes = Math.floor(diffMs / (1000 * 60))

    if (diffDays > 0) return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`
    if (diffHours > 0) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`
    if (diffMinutes > 0) return `${diffMinutes} minute${diffMinutes > 1 ? 's' : ''} ago`
    return 'Just now'
  }

  if (allRecords.length === 0) {
    return (
      <Card>
        <CardContent className="text-center py-12">
          <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-foreground mb-2">No Medical Records Yet</h3>
          <p className="text-muted-foreground mb-6 max-w-md mx-auto">
            Your consultation history will appear here. Start by describing your symptoms or uploading lab results.
          </p>
          <div className="flex justify-center gap-3">
            <Button variant="default">
              <Stethoscope className="h-4 w-4 mr-2" />
              Describe Symptoms
            </Button>
            <Button variant="outline">
              <Upload className="h-4 w-4 mr-2" />
              Upload Lab Results
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      {/* Summary Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-primary" />
              <div>
                <p className="text-2xl font-bold text-foreground">{allRecords.length}</p>
                <p className="text-sm text-muted-foreground">Total Records</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Stethoscope className="h-5 w-5 text-accent" />
              <div>
                <p className="text-2xl font-bold text-foreground">{diagnoses.length}</p>
                <p className="text-sm text-muted-foreground">Consultations</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Upload className="h-5 w-5 text-blue-500" />
              <div>
                <p className="text-2xl font-bold text-foreground">{labResults.length}</p>
                <p className="text-sm text-muted-foreground">Lab Results</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <User className="h-5 w-5 text-green-500" />
              <div>
                <p className="text-2xl font-bold text-foreground">
                  {allRecords.filter(r => 
                    (r.type === 'diagnosis' && r.reviewedByDoctor) || 
                    (r.type === 'lab' && r.reviewedByDoctor)
                  ).length}
                </p>
                <p className="text-sm text-muted-foreground">Doctor Reviewed</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Medical History Timeline */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-primary" />
            Medical History Timeline
          </CardTitle>
          <CardDescription>
            Your complete medical consultation and lab result history
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-96">
            <div className="space-y-4">
              {allRecords.map((record, index) => (
                <div key={record.id} className="relative">
                  {/* Timeline Line */}
                  {index < allRecords.length - 1 && (
                    <div className="absolute left-6 top-12 w-px h-16 bg-border" />
                  )}
                  
                  <div className="flex gap-4">
                    {/* Timeline Icon */}
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-muted flex items-center justify-center">
                      {record.type === 'diagnosis' ? (
                        <Stethoscope className="h-5 w-5 text-primary" />
                      ) : (
                        <Upload className="h-5 w-5 text-accent" />
                      )}
                    </div>

                    {/* Record Content */}
                    <div className="flex-1 space-y-3">
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="font-semibold text-foreground">
                            {record.type === 'diagnosis' ? 'Symptom Consultation' : 'Lab Result Analysis'}
                          </h4>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Calendar className="h-4 w-4" />
                            {new Date(record.timestamp).toLocaleDateString()} • {formatTimeAgo(new Date(record.timestamp))}
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge 
                            variant="outline" 
                            className={getSeverityColor(
                              record.type === 'diagnosis' ? record.severity : record.urgency
                            )}
                          >
                            {record.type === 'diagnosis' ? record.severity.toUpperCase() : record.urgency.toUpperCase()}
                          </Badge>
                          <Badge variant="secondary">
                            <span className={getConfidenceColor(record.confidence)}>
                              {record.confidence}%
                            </span>
                          </Badge>
                        </div>
                      </div>

                      {/* Record Details */}
                      <div className="bg-muted/30 rounded-lg p-4 space-y-3">
                        {record.type === 'diagnosis' ? (
                          <>
                            <div>
                              <p className="text-sm font-medium text-foreground mb-1">Symptoms</p>
                              <p className="text-sm text-muted-foreground line-clamp-2">
                                {record.symptoms}
                              </p>
                            </div>
                            <div>
                              <p className="text-sm font-medium text-foreground mb-1">AI Analysis</p>
                              <p className="text-sm text-muted-foreground line-clamp-2">
                                {record.analysis}
                              </p>
                            </div>
                          </>
                        ) : (
                          <>
                            <div>
                              <p className="text-sm font-medium text-foreground mb-1">File</p>
                              <p className="text-sm text-muted-foreground">
                                {record.fileName}
                              </p>
                            </div>
                            <div>
                              <p className="text-sm font-medium text-foreground mb-1">Interpretation</p>
                              <p className="text-sm text-muted-foreground line-clamp-2">
                                {record.interpretation}
                              </p>
                            </div>
                          </>
                        )}

                        {/* Doctor Review Status */}
                        <div className="flex items-center justify-between pt-2 border-t border-border">
                          <div className="flex items-center gap-2">
                            {record.reviewedByDoctor ? (
                              <>
                                <CheckCircle className="h-4 w-4 text-green-500" />
                                <span className="text-sm text-green-600">Doctor Reviewed</span>
                              </>
                            ) : (
                              <>
                                <Clock className="h-4 w-4 text-muted-foreground" />
                                <span className="text-sm text-muted-foreground">Pending Review</span>
                              </>
                            )}
                          </div>
                          <Button variant="ghost" size="sm">
                            View Details
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>

      {/* Health Trends */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-primary" />
            Health Insights
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium text-foreground mb-3">Recent Activity</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Last consultation:</span>
                  <span className="text-foreground">
                    {allRecords.length > 0 ? formatTimeAgo(new Date(allRecords[0].timestamp)) : 'None'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Doctor reviews:</span>
                  <span className="text-foreground">
                    {allRecords.filter(r => 
                      (r.type === 'diagnosis' && r.reviewedByDoctor) || 
                      (r.type === 'lab' && r.reviewedByDoctor)
                    ).length} of {allRecords.length}
                  </span>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="font-medium text-foreground mb-3">Health Reminders</h4>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p>• Regular health checkups are important</p>
                <p>• Keep track of your medications</p>
                <p>• Contact emergency services for urgent symptoms</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}