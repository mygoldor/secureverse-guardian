
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover';
import { useCookieConsent } from '@/contexts/CookieConsentContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { Cookie, Info, ShieldCheck } from 'lucide-react';

const CookieBanner: React.FC = () => {
  const { t } = useLanguage();
  const { showBanner, setShowBanner, cookiePreferences, acceptAllCookies, rejectAllCookies, saveCookiePreferences } = useCookieConsent();
  
  const [showDetails, setShowDetails] = useState(false);
  const [localPreferences, setLocalPreferences] = useState(cookiePreferences);
  
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

  return (
    <>
      {/* Ultra-compact mini banner */}
      {showBanner && !showDetails && (
        <div className="fixed bottom-1 right-1 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm py-1 px-2 shadow-sm rounded-md border border-gray-200 dark:border-gray-800 z-50 flex items-center gap-1.5">
          <Cookie className="h-3 w-3 text-security-primary" />
          <div className="flex items-center gap-1">
            <Button
              variant="outline"
              size="sm"
              className="text-[10px] h-5 px-1.5 border-destructive text-destructive hover:bg-destructive/10"
              onClick={rejectAllCookies}
            >
              {t('reject')}
            </Button>
            <Button
              variant="default"
              size="sm"
              className="text-[10px] h-5 px-1.5"
              onClick={acceptAllCookies}
            >
              {t('accept')}
            </Button>
            <Button
              variant="ghost" 
              size="sm"
              className="text-[10px] h-5 px-1.5"
              onClick={() => setShowDetails(true)}
            >
              ⚙️
            </Button>
          </div>
        </div>
      )}
      
      {/* Detailed cookie preferences dialog */}
      <Dialog open={showDetails} onOpenChange={setShowDetails}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Cookie className="h-5 w-5" />
              {t('cookie_management')}
            </DialogTitle>
          </DialogHeader>
          
          <div className="py-4">
            <p className="text-sm text-gray-500 mb-4">
              {t('cookie_preferences_description')}
            </p>
            
            <div className="space-y-4">
              {/* Essential cookies */}
              <div className="flex items-start space-x-3">
                <Checkbox 
                  id="essential" 
                  checked={localPreferences.essential} 
                  disabled 
                />
                <div className="grid gap-1.5">
                  <label 
                    htmlFor="essential" 
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex items-center gap-1"
                  >
                    {t('essential_cookies')}
                    <Popover>
                      <PopoverTrigger>
                        <Info className="h-3.5 w-3.5 text-gray-500" />
                      </PopoverTrigger>
                      <PopoverContent className="w-80">
                        <p className="text-xs text-gray-500">
                          {t('essential_cookies_description')}
                        </p>
                      </PopoverContent>
                    </Popover>
                  </label>
                  <p className="text-xs text-gray-500">
                    {t('essential_cookies_required')}
                  </p>
                </div>
              </div>
              
              {/* Functional cookies */}
              <div className="flex items-start space-x-3">
                <Checkbox 
                  id="functional" 
                  checked={localPreferences.functional} 
                  onCheckedChange={() => handlePreferenceChange('functional')} 
                />
                <div className="grid gap-1.5">
                  <label 
                    htmlFor="functional" 
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex items-center gap-1"
                  >
                    {t('functional_cookies')}
                    <Popover>
                      <PopoverTrigger>
                        <Info className="h-3.5 w-3.5 text-gray-500" />
                      </PopoverTrigger>
                      <PopoverContent className="w-80">
                        <p className="text-xs text-gray-500">
                          {t('functional_cookies_description')}
                        </p>
                      </PopoverContent>
                    </Popover>
                  </label>
                  <p className="text-xs text-gray-500">
                    {t('functional_cookies_info')}
                  </p>
                </div>
              </div>
              
              {/* Analytics cookies */}
              <div className="flex items-start space-x-3">
                <Checkbox 
                  id="analytics" 
                  checked={localPreferences.analytics} 
                  onCheckedChange={() => handlePreferenceChange('analytics')} 
                />
                <div className="grid gap-1.5">
                  <label 
                    htmlFor="analytics" 
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex items-center gap-1"
                  >
                    {t('analytics_cookies')}
                    <Popover>
                      <PopoverTrigger>
                        <Info className="h-3.5 w-3.5 text-gray-500" />
                      </PopoverTrigger>
                      <PopoverContent className="w-80">
                        <p className="text-xs text-gray-500">
                          {t('analytics_cookies_description')}
                        </p>
                      </PopoverContent>
                    </Popover>
                  </label>
                  <p className="text-xs text-gray-500">
                    {t('analytics_cookies_info')}
                  </p>
                </div>
              </div>
              
              {/* Marketing cookies */}
              <div className="flex items-start space-x-3">
                <Checkbox 
                  id="marketing" 
                  checked={localPreferences.marketing} 
                  onCheckedChange={() => handlePreferenceChange('marketing')} 
                />
                <div className="grid gap-1.5">
                  <label 
                    htmlFor="marketing" 
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex items-center gap-1"
                  >
                    {t('marketing_cookies')}
                    <Popover>
                      <PopoverTrigger>
                        <Info className="h-3.5 w-3.5 text-gray-500" />
                      </PopoverTrigger>
                      <PopoverContent className="w-80">
                        <p className="text-xs text-gray-500">
                          {t('marketing_cookies_description')}
                        </p>
                      </PopoverContent>
                    </Popover>
                  </label>
                  <p className="text-xs text-gray-500">
                    {t('marketing_cookies_info')}
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex items-center justify-between mt-2">
            <div className="flex items-center gap-1 text-xs text-gray-500">
              <ShieldCheck className="h-3.5 w-3.5" />
              <span>{t('gdpr_compliant')}</span>
            </div>
            <p className="text-xs text-gray-500">
              <a href="/cookies" className="underline hover:text-security-primary">
                {t('cookie_policy')}
              </a>
            </p>
          </div>
          
          <DialogFooter className="flex gap-2 sm:justify-between sm:space-x-0 mt-4">
            <div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  rejectAllCookies();
                  setShowDetails(false);
                }}
              >
                {t('reject_all')}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  acceptAllCookies();
                  setShowDetails(false);
                }}
              >
                {t('accept_all')}
              </Button>
            </div>
            <Button
              onClick={() => {
                handleSavePreferences();
                setShowDetails(false);
              }}
            >
              {t('save_preferences')}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CookieBanner;
