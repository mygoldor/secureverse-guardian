
import React from 'react';
import { Button } from '@/components/ui/button';
import { Cookie } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface CookieBannerCompactProps {
  onAccept: () => void;
  onReject: () => void;
}

const CookieBannerCompact: React.FC<CookieBannerCompactProps> = ({
  onAccept,
  onReject,
}) => {
  const { t } = useLanguage();

  return (
    <>
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
      </div>
    </>
  );
};

export default CookieBannerCompact;
