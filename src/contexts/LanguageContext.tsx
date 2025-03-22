
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Language, translations, TranslationKeys } from '@/translations';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: keyof TranslationKeys) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
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
  
  // Update language state and localStorage
  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('language', lang);
  };
  
  // Translate function with fallback to English
  const t = (key: keyof TranslationKeys): string => {
    // Try to get translation in current language
    let translation = translations[language][key];
    
    // If translation is missing in current language, fallback to English
    if (!translation && language !== 'en') {
      translation = translations['en'][key];
    }
    
    // If still no translation, return the key as fallback
    if (!translation) {
      console.warn(`Missing translation: ${key} for language: ${language}`);
      return key as string;
    }
    
    return translation;
  };
  
  // Update document language attribute when language changes
  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);
  
  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
