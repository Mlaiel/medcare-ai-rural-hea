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
import { Globe, MagnifyingGlass, Check } from '@phosphor-icons/react'
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
        <Button variant="outline" className="gap-1 sm:gap-2 text-xs sm:text-sm px-2 sm:px-3">
          <Globe className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
          <span className="hidden sm:inline">{currentLang?.flag}</span>
          <span className="hidden md:inline">{currentLang?.nativeName || 'English'}</span>
          <span className="sm:hidden">{currentLang?.flag}</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[95vw] sm:max-w-2xl max-h-[85vh] sm:max-h-[80vh] mx-4">
        <DialogHeader className="space-y-2 sm:space-y-3">
          <DialogTitle className="flex items-center gap-2 text-lg sm:text-xl">
            <Globe className="h-5 w-5 flex-shrink-0" />
            <span>{t.selectLanguage}</span>
          </DialogTitle>
          <DialogDescription className="text-sm sm:text-base leading-relaxed">
            Choose your preferred language for the MedCare-AI interface. 
            We support languages from rural and underserved communities worldwide.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-3 sm:space-y-4">
          {/* Current Language Display */}
          <Card className="border-primary/20 bg-primary/5">
            <CardContent className="pt-3 sm:pt-4 p-3 sm:p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                  <span className="text-xl sm:text-2xl flex-shrink-0">{currentLang?.flag}</span>
                  <div className="min-w-0">
                    <p className="font-medium text-sm sm:text-base truncate">{currentLang?.nativeName}</p>
                    <p className="text-xs sm:text-sm text-muted-foreground truncate">{currentLang?.name} • {currentLang?.region}</p>
                  </div>
                </div>
                <Badge variant="secondary" className="text-xs flex-shrink-0">{t.currentLanguage}</Badge>
              </div>
            </CardContent>
          </Card>
          
          {/* Search */}
          <div className="relative">
            <MagnifyingGlass className="absolute left-3 top-3 h-4 w-4 text-muted-foreground flex-shrink-0" />
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