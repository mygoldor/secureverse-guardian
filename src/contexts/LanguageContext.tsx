
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Language, translations, TranslationKeys } from '@/translations';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: keyof TranslationKeys) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Make sure this is defined properly as a React functional component
export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Browser language detection
  const detectBrowserLanguage = (): Language => {
    const browserLang = navigator.language.split('-')[0];
    if (browserLang === 'fr' || browserLang === 'es' || browserLang === 'de' || browserLang === 'it') {
      return browserLang as Language;
    }
    return 'en';
  };
  
  // Initialize with browser language or stored preference
  const [language, setLanguage] = useState<Language>(() => {
    const storedLang = localStorage.getItem('language') as Language | null;
    if (storedLang && (storedLang === 'fr' || storedLang === 'en' || storedLang === 'es' || storedLang === 'de' || storedLang === 'it')) {
      return storedLang;
    }
    return detectBrowserLanguage();
  });
  
  // Translate function
  const t = (key: keyof TranslationKeys): string => {
    const translation = translations[language][key];
    if (!translation) {
      console.warn(`Missing translation: ${key} for language: ${language}`);
      // Return the key as fallback
      return key as string;
    }
    return translation;
  };
  
  // Update localStorage when language changes
  useEffect(() => {
    localStorage.setItem('language', language);
    // Update document language attribute
    document.documentElement.lang = language;
  }, [language]);
  
  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
