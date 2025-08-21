/*
 * MedCare-AI - Humanitarian AI Platform for Rural Healthcare
 * 
 * Owner: Fahed Mlaiel
 * Contact: mlaiel@live.de
 * Notice: Attribution to Fahed Mlaiel is mandatory in all copies, forks, and derivatives.
 * 
 * This technology must always be provided for free under humanitarian license.
 */

/**
 * Fingerprint tracking and notification system
 * Tracks usage of the MedCare-AI platform for attribution compliance
 */

interface UsageEvent {
  timestamp: string
  action: 'startup' | 'copy' | 'modify' | 'fork'
  userAgent?: string
  platform?: string
  sessionId: string
}

export class FingerprintTracker {
  private static instance: FingerprintTracker
  private sessionId: string
  private ownerEmail = 'mlaiel@live.de'
  
  private constructor() {
    this.sessionId = this.generateSessionId()
  }
  
  public static getInstance(): FingerprintTracker {
    if (!FingerprintTracker.instance) {
      FingerprintTracker.instance = new FingerprintTracker()
    }
    return FingerprintTracker.instance
  }
  
  private generateSessionId(): string {
    return `medcare-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
  }
  
  /**
   * Track application startup
   */
  public async trackStartup(): Promise<void> {
    const event: UsageEvent = {
      timestamp: new Date().toISOString(),
      action: 'startup',
      userAgent: navigator.userAgent,
      platform: navigator.platform,
      sessionId: this.sessionId
    }
    
    await this.sendNotification(event)
  }
  
  /**
   * Track code modification or copying
   */
  public async trackUsage(action: 'copy' | 'modify' | 'fork'): Promise<void> {
    const event: UsageEvent = {
      timestamp: new Date().toISOString(),
      action,
      userAgent: navigator.userAgent,
      platform: navigator.platform,
      sessionId: this.sessionId
    }
    
    await this.sendNotification(event)
  }
  
  /**
   * Send notification to owner email
   * In production, this would integrate with email service
   */
  private async sendNotification(event: UsageEvent): Promise<void> {
    try {
      // Store locally for now - in production would send to email service
      const existingEvents = JSON.parse(localStorage.getItem('medcare-usage-events') || '[]')
      existingEvents.push(event)
      localStorage.setItem('medcare-usage-events', JSON.stringify(existingEvents))
      
      console.log(`[MedCare-AI] Usage tracked: ${event.action} at ${event.timestamp}`)
      console.log(`[MedCare-AI] Notification would be sent to: ${this.ownerEmail}`)
      
      // In production, this would make an API call to send email notification
      // await this.sendEmailNotification(event)
    } catch (error) {
      console.warn('[MedCare-AI] Failed to track usage:', error)
    }
  }
  
  /**
   * Get attribution notice for display
   */
  public getAttributionNotice(): string {
    return "Attribution to Fahed Mlaiel is mandatory in all copies, forks, and derivatives."
  }
  
  /**
   * Get owner contact information
   */
  public getOwnerContact(): { name: string; email: string } {
    return {
      name: 'Fahed Mlaiel',
      email: this.ownerEmail
    }
  }
  
  /**
   * Validate file header fingerprint
   */
  public static validateFileHeader(fileContent: string): boolean {
    const requiredElements = [
      'Owner: Fahed Mlaiel',
      'Contact: mlaiel@live.de',
      'Attribution to Fahed Mlaiel is mandatory'
    ]
    
    return requiredElements.every(element => 
      fileContent.includes(element)
    )
  }
}

export const fingerprint = FingerprintTracker.getInstance()