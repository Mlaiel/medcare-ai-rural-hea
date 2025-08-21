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
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Globe, Search, Check } from '@phosphor-icons/react'
import { useLanguage } from '@/hooks/useLanguage'
import { supportedLanguages, Language } from '@/lib/languages'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'

export default function LanguageSelector() {
  const { currentLanguage, setLanguage, t } = useLanguage()
  const [searchTerm, setSearchTerm] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  
  const filteredLanguages = supportedLanguages.filter(lang => 
    lang.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lang.nativeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lang.region.toLowerCase().includes(searchTerm.toLowerCase())
  )
  
  const currentLang = supportedLanguages.find(lang => lang.code === currentLanguage)
  
  const handleLanguageSelect = (languageCode: string) => {
    setLanguage(languageCode)
    setIsOpen(false)
    setSearchTerm('')
  }
  
  const groupedLanguages = filteredLanguages.reduce((acc, lang) => {
    const region = lang.region
    if (!acc[region]) {
      acc[region] = []
    }
    acc[region].push(lang)
    return acc
  }, {} as Record<string, Language[]>)

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="gap-2">
          <Globe className="h-4 w-4" />
          {currentLang?.flag} {currentLang?.nativeName || 'English'}
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[80vh]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Globe className="h-5 w-5" />
            {t.selectLanguage}
          </DialogTitle>
          <DialogDescription>
            Choose your preferred language for the MedCare-AI interface. 
            We support languages from rural and underserved communities worldwide.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          {/* Current Language Display */}
          <Card className="border-primary/20 bg-primary/5">
            <CardContent className="pt-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{currentLang?.flag}</span>
                  <div>
                    <p className="font-medium">{currentLang?.nativeName}</p>
                    <p className="text-sm text-muted-foreground">{currentLang?.name} • {currentLang?.region}</p>
                  </div>
                </div>
                <Badge variant="secondary">{t.currentLanguage}</Badge>
              </div>
            </CardContent>
          </Card>
          
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search languages or regions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          
          {/* Language List */}
          <ScrollArea className="h-96">
            <div className="space-y-6">
              {Object.entries(groupedLanguages).map(([region, languages]) => (
                <div key={region}>
                  <h3 className="font-semibold text-sm text-muted-foreground mb-2 px-2">
                    {region}
                  </h3>
                  <div className="grid gap-2">
                    {languages.map((language) => (
                      <Card 
                        key={language.code}
                        className={`cursor-pointer transition-colors hover:bg-accent/50 ${
                          language.code === currentLanguage ? 'border-primary bg-primary/5' : ''
                        }`}
                        onClick={() => handleLanguageSelect(language.code)}
                      >
                        <CardContent className="p-3">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <span className="text-lg">{language.flag}</span>
                              <div className={language.rtl ? 'text-right' : ''}>
                                <p className="font-medium">{language.nativeName}</p>
                                <p className="text-sm text-muted-foreground">
                                  {language.name}
                                  {language.rtl && (
                                    <Badge variant="outline" className="ml-2 text-xs">
                                      RTL
                                    </Badge>
                                  )}
                                </p>
                              </div>
                            </div>
                            {language.code === currentLanguage && (
                              <Check className="h-4 w-4 text-primary" weight="bold" />
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
          
          {filteredLanguages.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              <Globe className="h-12 w-12 mx-auto mb-2 opacity-50" />
              <p>No languages found matching your search.</p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}