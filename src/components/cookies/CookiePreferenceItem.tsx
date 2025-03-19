
import React from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover';
import { Info } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { TranslationKeys } from '@/translations';

interface CookiePreferenceItemProps {
  id: string;
  title: keyof TranslationKeys;
  description: keyof TranslationKeys;
  info: keyof TranslationKeys;
  checked: boolean;
  onChange?: () => void;
  disabled?: boolean;
}

const CookiePreferenceItem: React.FC<CookiePreferenceItemProps> = ({
  id,
  title,
  description,
  info,
  checked,
  onChange,
  disabled = false,
}) => {
  const { t } = useLanguage();

  return (
    <div className="flex items-start space-x-3">
      <Checkbox 
        id={id} 
        checked={checked} 
        onCheckedChange={onChange} 
        disabled={disabled}
      />
      <div className="grid gap-1.5">
        <label 
          htmlFor={id} 
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex items-center gap-1"
        >
          {t(title)}
          <Popover>
            <PopoverTrigger>
              <Info className="h-3.5 w-3.5 text-gray-500" />
            </PopoverTrigger>
            <PopoverContent className="w-80">
              <p className="text-xs text-gray-500">
                {t(description)}
              </p>
            </PopoverContent>
          </Popover>
        </label>
        <p className="text-xs text-gray-500">
          {t(info)}
        </p>
      </div>
    </div>
  );
};

export default CookiePreferenceItem;
