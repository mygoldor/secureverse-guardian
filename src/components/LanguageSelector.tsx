
import React from 'react';
import { Globe } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useLocation } from 'react-router-dom';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const LanguageSelector = () => {
  const { language, setLanguage, t } = useLanguage();
  const location = useLocation();
  
  // Check if we're on the landing page
  const isLandingPage = location.pathname === '/landing';

  // Define language label mapping
  const languageLabels = {
    'en': 'English',
    'fr': 'Français',
    'es': 'Español',
    'de': 'Deutsch',
    'it': 'Italiano'
  };

  return (
    <div className="language-selector">
      <Select
        value={language}
        onValueChange={(value) => setLanguage(value as 'fr' | 'en' | 'es' | 'de' | 'it')}
      >
        <SelectTrigger 
          className={`w-[130px] ${
            isLandingPage 
              ? 'bg-transparent border-0 text-white hover:bg-white/10 hover:text-white focus:ring-0' 
              : 'bg-transparent border-0 text-white hover:bg-white/10 hover:text-white focus:ring-0'
          }`}
        >
          <div className="flex items-center space-x-2">
            <Globe className="h-4 w-4" />
            <SelectValue placeholder={t('change_language')} />
          </div>
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="fr">Français</SelectItem>
          <SelectItem value="en">English</SelectItem>
          <SelectItem value="es">Español</SelectItem>
          <SelectItem value="de">Deutsch</SelectItem>
          <SelectItem value="it">Italiano</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default LanguageSelector;
