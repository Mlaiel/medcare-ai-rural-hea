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
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { Badge } from '@/components/ui/badge'
import { 
  Ear, 
  Eye, 
  SpeakerHigh, 
  TextAa, 
  Palette, 
  Timer,
  AccessibilityIcon,
  CheckCircle
} from '@phosphor-icons/react'
import { useAccessibility } from '@/hooks/useAccessibility'
import { useLanguage } from '@/hooks/useLanguage'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'

export default function AccessibilityPanel() {
  const { settings, updateSettings, speakText, announceMessage } = useAccessibility()
  const { t } = useLanguage()
  const [isOpen, setIsOpen] = useState(false)

  const handleSettingChange = (setting: keyof typeof settings, value: boolean) => {
    updateSettings({ [setting]: value })
    
    if (value) {
      announceMessage(`${setting} enabled`)
    } else {
      announceMessage(`${setting} disabled`)
    }
  }

  const testVoice = () => {
    speakText("This is a test of the voice system. You can hear medical information read aloud in your language.")
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="gap-2">
          <AccessibilityIcon className="h-4 w-4" />
          Accessibility
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <AccessibilityIcon className="h-5 w-5" />
            Accessibility Settings
          </DialogTitle>
          <DialogDescription>
            Configure accessibility features to make MedCare-AI easier to use. 
            These settings help users with visual, hearing, and motor disabilities.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Vision Assistance */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Eye className="h-5 w-5 text-blue-500" />
                Vision Assistance
              </CardTitle>
              <CardDescription>
                Features for users with visual impairments or reading difficulties
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label htmlFor="screen-reader" className="font-medium">
                    Screen Reader Support
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Enable voice narration of content and navigation
                  </p>
                </div>
                <Switch
                  id="screen-reader"
                  checked={settings.screenReaderEnabled}
                  onCheckedChange={(checked) => 
                    handleSettingChange('screenReaderEnabled', checked)
                  }
                />
              </div>
              
              <Separator />
              
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label htmlFor="large-text" className="font-medium">
                    Large Text Mode
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Increase text size for better readability
                  </p>
                </div>
                <Switch
                  id="large-text"
                  checked={settings.largeTextMode}
                  onCheckedChange={(checked) => 
                    handleSettingChange('largeTextMode', checked)
                  }
                />
              </div>
              
              <Separator />
              
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label htmlFor="high-contrast" className="font-medium">
                    High Contrast Mode
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Enhance color contrast for better visibility
                  </p>
                </div>
                <Switch
                  id="high-contrast"
                  checked={settings.highContrastMode}
                  onCheckedChange={(checked) => 
                    handleSettingChange('highContrastMode', checked)
                  }
                />
              </div>
            </CardContent>
          </Card>

          {/* Audio Features */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <SpeakerHigh className="h-5 w-5 text-green-500" />
                Audio Features
              </CardTitle>
              <CardDescription>
                Voice and audio assistance for better accessibility
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label htmlFor="voice-navigation" className="font-medium">
                    Voice Navigation
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Navigate using voice commands
                  </p>
                </div>
                <Switch
                  id="voice-navigation"
                  checked={settings.voiceNavigationEnabled}
                  onCheckedChange={(checked) => 
                    handleSettingChange('voiceNavigationEnabled', checked)
                  }
                />
              </div>
              
              <Separator />
              
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label htmlFor="auto-read" className="font-medium">
                    Auto-Read Content
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Automatically read new content aloud
                  </p>
                </div>
                <Switch
                  id="auto-read"
                  checked={settings.autoReadContent}
                  onCheckedChange={(checked) => 
                    handleSettingChange('autoReadContent', checked)
                  }
                />
              </div>
              
              <Separator />
              
              <div className="flex items-center justify-between gap-4">
                <div className="space-y-1 flex-1">
                  <Label className="font-medium">Voice Test</Label>
                  <p className="text-sm text-muted-foreground">
                    Test the voice system in your language
                  </p>
                </div>
                <Button onClick={testVoice} variant="outline" size="sm">
                  <SpeakerHigh className="h-4 w-4 mr-2" />
                  Test Voice
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Motor Assistance */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Timer className="h-5 w-5 text-purple-500" />
                Motor Assistance
              </CardTitle>
              <CardDescription>
                Features for users with motor disabilities or sensitivity to motion
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label htmlFor="reduced-motion" className="font-medium">
                    Reduced Motion
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Minimize animations and transitions
                  </p>
                </div>
                <Switch
                  id="reduced-motion"
                  checked={settings.reducedMotion}
                  onCheckedChange={(checked) => 
                    handleSettingChange('reducedMotion', checked)
                  }
                />
              </div>
            </CardContent>
          </Card>

          {/* Accessibility Status */}
          <Card className="border-green-200 bg-green-50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg text-green-800">
                <CheckCircle className="h-5 w-5" />
                Accessibility Status
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <p className="text-sm font-medium text-green-800">Active Features:</p>
                  <div className="space-y-1">
                    {Object.entries(settings).map(([key, value]) => (
                      value && (
                        <Badge key={key} variant="secondary" className="text-xs">
                          {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                        </Badge>
                      )
                    ))}
                    {Object.values(settings).every(v => !v) && (
                      <p className="text-sm text-muted-foreground">No accessibility features enabled</p>
                    )}
                  </div>
                </div>
                
                <div className="space-y-2">
                  <p className="text-sm font-medium text-green-800">Compatibility:</p>
                  <div className="space-y-1 text-sm text-muted-foreground">
                    <p>✓ Screen readers (NVDA, JAWS, VoiceOver)</p>
                    <p>✓ Voice input and output</p>
                    <p>✓ Keyboard navigation</p>
                    <p>✓ High contrast displays</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Humanitarian Notice */}
          <Card className="border-blue-200 bg-blue-50">
            <CardContent className="pt-6">
              <div className="text-center space-y-2">
                <p className="text-sm font-medium text-blue-800">
                  Accessibility for All
                </p>
                <p className="text-xs text-blue-600">
                  MedCare-AI is designed to be accessible to users with disabilities, 
                  supporting rural communities where specialized assistive technology may not be available.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  )
}