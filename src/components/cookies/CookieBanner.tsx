
import React, { useState, useEffect } from 'react';
import { useCookieConsent } from '@/contexts/CookieConsentContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { useLocation } from 'react-router-dom';
import CookieBannerFull from './CookieBannerFull';
import CookieBannerCompact from './CookieBannerCompact';
import CookiePreferencesDialog from './CookiePreferencesDialog';

const CookieBanner: React.FC = () => {
  const { t } = useLanguage();
  const { 
    showBanner, 
    setShowBanner, 
    cookiePreferences, 
    acceptAllCookies, 
    rejectAllCookies, 
    saveCookiePreferences 
  } = useCookieConsent();
  const location = useLocation();
  const isLandingPage = location.pathname === '/';
  
  const [showDetails, setShowDetails] = useState(false);
  const [localPreferences, setLocalPreferences] = useState(cookiePreferences);
  
  // Reset local preferences when global preferences change
  useEffect(() => {
    setLocalPreferences(cookiePreferences);
  }, [cookiePreferences]);

  // Force banner to show at first visit
  useEffect(() => {
    // Check if this is the first visit
    const hasVisited = localStorage.getItem('hasVisited');
    
    if (!hasVisited) {
      setShowBanner(true);
      localStorage.setItem('hasVisited', 'true');
    }
    
    console.log('Cookie banner mounted, showBanner:', showBanner);
  }, [setShowBanner]);
  
  // Handle preference changes
  const handlePreferenceChange = (category: keyof typeof cookiePreferences) => {
    if (category === 'essential') return; // Essential cookies can't be disabled
    
    setLocalPreferences(prev => ({
      ...prev,
      [category]: !prev[category]
    }));
  };
  
  // Handle save preferences
  const handleSavePreferences = () => {
    saveCookiePreferences(localPreferences);
  };

  // Define handlers for accept and reject buttons
  const handleAcceptCookies = () => {
    console.log("Accepting cookies");
    acceptAllCookies();
  };

  const handleRejectCookies = () => {
    console.log("Rejecting cookies");
    rejectAllCookies();
  };

  const openPreferences = () => {
    setShowDetails(true);
  };

  if (!showBanner && !showDetails) {
    return null;
  }

  return (
    <>
      {/* Banner with different styling for landing page */}
      {showBanner && !showDetails && (
        <div className={`fixed z-50 backdrop-blur-sm border ${
          isLandingPage 
            ? "bottom-10 left-4 bg-white/95 dark:bg-gray-900/95 p-3 shadow-md rounded-lg border-gray-200 dark:border-gray-800 w-64"
            : "bottom-1 right-1 bg-white/80 dark:bg-gray-900/80 py-1 px-2 shadow-sm rounded-md border-gray-200 dark:border-gray-800 flex items-center gap-1.5"
        }`}>
          {isLandingPage ? (
            <CookieBannerFull 
              onAccept={handleAcceptCookies}
              onReject={handleRejectCookies}
              onPreferences={openPreferences}
            />
          ) : (
            <CookieBannerCompact
              onAccept={handleAcceptCookies}
              onReject={handleRejectCookies}
              onPreferences={openPreferences}
            />
          )}
        </div>
      )}
      
      {/* Detailed cookie preferences dialog */}
      <CookiePreferencesDialog
        open={showDetails}
        onOpenChange={setShowDetails}
        preferences={localPreferences}
        onPreferenceChange={handlePreferenceChange}
        onSavePreferences={handleSavePreferences}
        onAcceptAll={handleAcceptCookies}
        onRejectAll={handleRejectCookies}
      />
    </>
  );
};

export default CookieBanner;
