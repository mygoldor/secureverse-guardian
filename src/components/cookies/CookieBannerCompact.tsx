
import React from 'react';
import { Button } from '@/components/ui/button';
import { Cookie, Settings } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface CookieBannerCompactProps {
  onAccept: () => void;
  onReject: () => void;
  onPreferences?: () => void;
}

const CookieBannerCompact: React.FC<CookieBannerCompactProps> = ({
  onAccept,
  onReject,
  onPreferences,
}) => {
  const { t } = useLanguage();

  return (
    <div className="flex items-center gap-2">
      <Cookie className="h-3 w-3 text-security-primary" />
      <div className="flex items-center gap-1">
        <Button
          variant="outline"
          size="sm"
          className="text-[10px] h-5 px-1.5 border-destructive text-destructive hover:bg-destructive/10"
          onClick={onReject}
        >
          {t('reject')}
        </Button>
        <Button
          variant="default"
          size="sm"
          className="text-[10px] h-5 px-1.5"
          onClick={onAccept}
        >
          {t('accept')}
        </Button>
        {onPreferences && (
          <Button
            variant="ghost"
            size="icon"
            className="h-5 w-5"
            onClick={onPreferences}
            title={t('preferences')}
          >
            <Settings className="h-3 w-3" />
          </Button>
        )}
      </div>
    </div>
  );
};

export default CookieBannerCompact;
