import React from 'react';
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type CookieCategories = {
  essential: boolean;
  functional: boolean;
  analytics: boolean;
  marketing: boolean;
};

interface CookieConsentContextType {
  cookieConsent: boolean | null;
  cookiePreferences: CookieCategories;
  acceptAllCookies: () => void;
  rejectAllCookies: () => void;
  saveCookiePreferences: (preferences: CookieCategories) => void;
  showBanner: boolean;
  setShowBanner: (show: boolean) => void;
}

const defaultCookiePreferences: CookieCategories = {
  essential: true, // Essential cookies are always enabled
  functional: false,
  analytics: false,
  marketing: false,
};

const CookieConsentContext = createContext<CookieConsentContextType | undefined>(undefined);

export const CookieConsentProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cookieConsent, setCookieConsent] = useState<boolean | null>(null);
  const [cookiePreferences, setCookiePreferences] = useState<CookieCategories>(defaultCookiePreferences);
  const [showBanner, setShowBanner] = useState<boolean>(true);

  useEffect(() => {
    const storedConsent = localStorage.getItem('cookieConsent');
    const storedPreferences = localStorage.getItem('cookiePreferences');
    
    if (storedConsent !== null) {
      setCookieConsent(storedConsent === 'true');
      setShowBanner(false);
    } else {
      setShowBanner(true);
    }
    
    if (storedPreferences !== null) {
      try {
        setCookiePreferences(JSON.parse(storedPreferences));
      } catch (e) {
        console.error('Invalid cookie preferences format', e);
        setCookiePreferences(defaultCookiePreferences);
      }
    }
  }, []);

  const saveConsent = (consent: boolean, preferences: CookieCategories) => {
    localStorage.setItem('cookieConsent', consent.toString());
    localStorage.setItem('cookiePreferences', JSON.stringify(preferences));
    
    const userId = localStorage.getItem('userId') || 'anonymous';
    const action = consent ? 'consent' : 'withdraw';
    
    try {
      import('@/utils/gdprCompliance').then(({ recordGdprAction }) => {
        recordGdprAction(action, userId);
      });
    } catch (e) {
      console.error('Failed to record GDPR action', e);
    }
  };

  const acceptAllCookies = () => {
    const allAccepted: CookieCategories = {
      essential: true,
      functional: true,
      analytics: true,
      marketing: true,
    };
    
    setCookieConsent(true);
    setCookiePreferences(allAccepted);
    setShowBanner(false);
    saveConsent(true, allAccepted);
  };

  const rejectAllCookies = () => {
    setCookieConsent(false);
    setCookiePreferences(defaultCookiePreferences);
    setShowBanner(false);
    saveConsent(false, defaultCookiePreferences);
  };

  const saveCookiePreferences = (preferences: CookieCategories) => {
    const updatedPreferences = { ...preferences, essential: true };
    
    const hasConsent = updatedPreferences.functional || 
                      updatedPreferences.analytics || 
                      updatedPreferences.marketing;
    
    setCookieConsent(hasConsent);
    setCookiePreferences(updatedPreferences);
    setShowBanner(false);
    saveConsent(hasConsent, updatedPreferences);
  };

  return (
    <CookieConsentContext.Provider 
      value={{ 
        cookieConsent, 
        cookiePreferences, 
        acceptAllCookies, 
        rejectAllCookies, 
        saveCookiePreferences,
        showBanner,
        setShowBanner
      }}
    >
      {children}
    </CookieConsentContext.Provider>
  );
};

export const useCookieConsent = () => {
  const context = useContext(CookieConsentContext);
  if (context === undefined) {
    throw new Error('useCookieConsent must be used within a CookieConsentProvider');
  }
  return context;
};
