
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ShieldCheck } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import CookiePreferenceItem from './CookiePreferenceItem';

interface CookiePreferencesDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  preferences: {
    essential: boolean;
    functional: boolean;
    analytics: boolean;
    marketing: boolean;
  };
  onPreferenceChange: (category: 'essential' | 'functional' | 'analytics' | 'marketing') => void;
  onSavePreferences: () => void;
  onAcceptAll: () => void;
  onRejectAll: () => void;
}

const CookiePreferencesDialog: React.FC<CookiePreferencesDialogProps> = ({
  open,
  onOpenChange,
  preferences,
  onPreferenceChange,
  onSavePreferences,
  onAcceptAll,
  onRejectAll,
}) => {
  const { t } = useLanguage();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <span role="img" aria-label="cookie">🍪</span>
            {t('cookie_management')}
          </DialogTitle>
        </DialogHeader>
        
        <div className="py-4">
          <p className="text-sm text-gray-500 mb-4">
            {t('cookie_preferences_description')}
          </p>
          
          <div className="space-y-4">
            {/* Essential cookies */}
            <CookiePreferenceItem
              id="essential"
              title="essential_cookies"
              description="essential_cookies_description"
              info="essential_cookies_required"
              checked={preferences.essential}
              disabled
            />
            
            {/* Functional cookies */}
            <CookiePreferenceItem
              id="functional"
              title="functional_cookies"
              description="functional_cookies_description"
              info="functional_cookies_info"
              checked={preferences.functional}
              onChange={() => onPreferenceChange('functional')}
            />
            
            {/* Analytics cookies */}
            <CookiePreferenceItem
              id="analytics"
              title="analytics_cookies"
              description="analytics_cookies_description"
              info="analytics_cookies_info"
              checked={preferences.analytics}
              onChange={() => onPreferenceChange('analytics')}
            />
            
            {/* Marketing cookies */}
            <CookiePreferenceItem
              id="marketing"
              title="marketing_cookies"
              description="marketing_cookies_description"
              info="marketing_cookies_info"
              checked={preferences.marketing}
              onChange={() => onPreferenceChange('marketing')}
            />
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
                onRejectAll();
                onOpenChange(false);
              }}
            >
              {t('reject_all')}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                onAcceptAll();
                onOpenChange(false);
              }}
            >
              {t('accept_all')}
            </Button>
          </div>
          <Button
            onClick={() => {
              onSavePreferences();
              onOpenChange(false);
            }}
          >
            {t('save_preferences')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CookiePreferencesDialog;
