
import React from 'react';
import { Globe } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const LanguageSelector = () => {
  const { language, setLanguage, t } = useLanguage();

  return (
    <div className="language-selector">
      <Select
        value={language}
        onValueChange={(value) => setLanguage(value as 'fr' | 'en')}
      >
        <SelectTrigger className="w-[130px] bg-transparent border-0 text-white hover:bg-white/10 hover:text-white focus:ring-0">
          <div className="flex items-center space-x-2">
            <Globe className="h-4 w-4" />
            <SelectValue placeholder={t('change_language')} />
          </div>
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="fr">Français</SelectItem>
          <SelectItem value="en">English</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default LanguageSelector;
