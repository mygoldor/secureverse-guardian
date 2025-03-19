
import React from 'react';
import { Button } from '@/components/ui/button';
import { Cookie } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface CookieBannerFullProps {
  onAccept: () => void;
  onReject: () => void;
}

const CookieBannerFull: React.FC<CookieBannerFullProps> = ({
  onAccept,
  onReject,
}) => {
  const { t } = useLanguage();

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between mb-1">
        <div className="flex items-center gap-1.5">
          <Cookie className="h-5 w-5 text-security-primary" />
          <span className="text-sm font-medium">{t('cookies')}</span>
        </div>
      </div>
      <p className="text-xs text-gray-600 dark:text-gray-300 mb-2">
        {t('cookie_preferences_description').substring(0, 100)}...
      </p>
      <div className="grid grid-cols-2 gap-2">
        <Button
          variant="outline"
          size="sm"
          className="text-xs border-destructive text-destructive hover:bg-destructive/10"
          onClick={onReject}
        >
          {t('reject')}
        </Button>
        <Button
          variant="default"
          size="sm"
          className="text-xs"
          onClick={onAccept}
        >
          {t('accept')}
        </Button>
      </div>
    </div>
  );
};

export default CookieBannerFull;
