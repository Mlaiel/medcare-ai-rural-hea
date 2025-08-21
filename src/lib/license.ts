/*
 * MedCare-AI - Humanitarian AI Platform for Rural Healthcare
 * 
 * Owner: Fahed Mlaiel
 * Contact: mlaiel@live.de
 * Notice: Attribution to Fahed Mlaiel is mandatory in all copies, forks, and derivatives.
 * 
 * This technology must always be provided for free under humanitarian license.
 */

export interface LicenseInfo {
  type: 'humanitarian' | 'commercial'
  isValid: boolean
  expiresAt?: string
  organization?: string
  contactEmail?: string
}

export class LicenseManager {
  private static instance: LicenseManager
  private ownerEmail = 'mlaiel@live.de'
  
  private constructor() {}
  
  public static getInstance(): LicenseManager {
    if (!LicenseManager.instance) {
      LicenseManager.instance = new LicenseManager()
    }
    return LicenseManager.instance
  }
  
  /**
   * Check current license status
   * For MVP, always returns humanitarian license
   */
  public async checkLicense(): Promise<LicenseInfo> {
    // Check for stored commercial license key
    const storedLicense = localStorage.getItem('medcare-commercial-license')
    
    if (storedLicense) {
      try {
        const license = JSON.parse(storedLicense)
        if (this.validateCommercialLicense(license)) {
          return {
            type: 'commercial',
            isValid: true,
            expiresAt: license.expiresAt,
            organization: license.organization,
            contactEmail: license.contactEmail
          }
        }
      } catch (error) {
        console.warn('[MedCare-AI] Invalid commercial license format')
      }
    }
    
    // Default to humanitarian license
    return {
      type: 'humanitarian',
      isValid: true
    }
  }
  
  /**
   * Validate commercial license key
   */
  private validateCommercialLicense(license: any): boolean {
    // Basic validation - in production would verify signature/API
    return (
      license &&
      license.key &&
      license.expiresAt &&
      new Date(license.expiresAt) > new Date() &&
      license.organization &&
      license.contactEmail
    )
  }
  
  /**
   * Get licensing policy text
   */
  public getLicensingPolicy(): string {
    return `MedCare-AI is provided free for humanitarian, educational, and non-commercial use. Commercial organizations must obtain a paid license. Contact ${this.ownerEmail} for commercial licensing.`
  }
  
  /**
   * Get non-commercial notice
   */
  public getNonCommercialNotice(): string {
    return `Non-commercial use only. For commercial licensing contact: ${this.ownerEmail}`
  }
  
  /**
   * Check if commercial use is allowed
   */
  public async isCommercialUseAllowed(): Promise<boolean> {
    const license = await this.checkLicense()
    return license.type === 'commercial' && license.isValid
  }
  
  /**
   * Get owner contact for licensing
   */
  public getOwnerContact(): { email: string; name: string } {
    return {
      email: this.ownerEmail,
      name: 'Fahed Mlaiel'
    }
  }
  
  /**
   * Set commercial license (for future implementation)
   */
  public setCommercialLicense(licenseKey: string, organization: string, contactEmail: string, expiresAt: string): boolean {
    try {
      const license = {
        key: licenseKey,
        organization,
        contactEmail,
        expiresAt,
        setAt: new Date().toISOString()
      }
      
      localStorage.setItem('medcare-commercial-license', JSON.stringify(license))
      return true
    } catch (error) {
      console.error('[MedCare-AI] Failed to set commercial license:', error)
      return false
    }
  }
  
  /**
   * Remove commercial license
   */
  public removeCommercialLicense(): void {
    localStorage.removeItem('medcare-commercial-license')
  }
}

export const licenseManager = LicenseManager.getInstance()