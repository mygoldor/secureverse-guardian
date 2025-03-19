
/**
 * Utility functions for GDPR compliance
 */

// Sanitize personal data before storage
export const sanitizePersonalData = (data: Record<string, unknown>) => {
  // This is a simple implementation - in a real app you'd have more complex sanitization
  const sanitized = { ...data };
  
  // Remove any sensitive fields that shouldn't be stored
  const sensitiveFields = ['password', 'creditCard', 'ssn'];
  sensitiveFields.forEach(field => {
    if (field in sanitized) {
      delete sanitized[field];
    }
  });
  
  return sanitized;
};

// Format data for user export (ensures standardized format)
export const formatDataForExport = (userData: Record<string, unknown>) => {
  return {
    metadata: {
      exportDate: new Date().toISOString(),
      exportVersion: '1.0',
      gdprCompliant: true
    },
    userData
  };
};

// Check if consent is valid
export const isConsentValid = (consentData: { 
  given: boolean; 
  timestamp: string; 
  expiresAt?: string;
}) => {
  if (!consentData.given) return false;
  
  // Check if consent has expired (if expiration is set)
  if (consentData.expiresAt) {
    const expirationDate = new Date(consentData.expiresAt);
    if (expirationDate < new Date()) {
      return false;
    }
  }
  
  return true;
};

// Record a GDPR-related user action (for audit trails)
export const recordGdprAction = (
  action: 'consent' | 'withdraw' | 'export' | 'delete',
  userId: string
) => {
  // In a real app, this would log to a secure audit trail
  console.log(`GDPR Action: ${action} for user ${userId} at ${new Date().toISOString()}`);
  
  // Return the record for potential storage
  return {
    action,
    userId,
    timestamp: new Date().toISOString(),
    ipAddress: '127.0.0.1' // In a real app, you would get the actual IP
  };
};
