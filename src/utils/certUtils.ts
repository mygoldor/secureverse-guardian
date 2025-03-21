
/**
 * Certificate utility functions for managing Let's Encrypt certificates
 */

import axios from 'axios';

/**
 * Check certificate expiration status
 * @param domain Domain to check certificate for
 * @returns Object with expiration details
 */
export const checkCertExpiration = async (domain: string): Promise<{
  isValid: boolean;
  daysRemaining: number | null;
  expiryDate: string | null;
  error?: string;
}> => {
  try {
    // In production this would call a backend endpoint
    // that checks the actual certificate files
    const response = await axios.get('/api/cert-status', { 
      params: { domain } 
    });
    return response.data;
  } catch (error) {
    console.error('Failed to check certificate status:', error);
    return {
      isValid: false,
      daysRemaining: null,
      expiryDate: null,
      error: 'Failed to check certificate status'
    };
  }
};

/**
 * Trigger certificate renewal
 * @param domain Domain to renew certificate for
 * @returns Success status and message
 */
export const renewCertificate = async (domain: string): Promise<{
  success: boolean;
  message: string;
}> => {
  try {
    // In production this would call a backend endpoint
    // that triggers the actual certbot renewal process
    const response = await axios.post('/api/cert-renew', { domain });
    return response.data;
  } catch (error) {
    console.error('Failed to renew certificate:', error);
    return {
      success: false,
      message: 'Failed to initiate certificate renewal'
    };
  }
};
