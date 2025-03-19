
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Language = 'fr' | 'en' | 'es' | 'de' | 'it';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  fr: {
    // General
    'app_name': 'Guardia',
    'get_started': 'Commencer',
    'learn_more': 'En savoir plus',
    'contact_us': 'Contactez-nous',
    'login': 'Connexion',
    'logout': 'Déconnexion',
    'signup': 'Inscription',
    'email': 'Email',
    'password': 'Mot de passe',
    'confirm_password': 'Confirmer le mot de passe',
    'forgot_password': 'Mot de passe oublié ?',
    
    // Navigation
    'home': 'Accueil',
    'features': 'Fonctionnalités',
    'pricing': 'Tarifs',
    'about': 'À propos',
    'faq': 'FAQ',
    'blog': 'Blog',
    'testimonials': 'Témoignages',
    'contact': 'Contact',
    
    // Hero section
    'hero_title': 'Protection complète contre les menaces numériques',
    'hero_subtitle': 'Sécurisez vos appareils, données et vie privée avec notre solution de cybersécurité tout-en-un',
    'hero_cta': 'Essayer gratuitement',
    
    // Features section
    'features_title': 'Nos fonctionnalités',
    'feature_1_title': 'Protection en temps réel',
    'feature_1_description': 'Détection et neutralisation instantanée des menaces pour une protection continue',
    'feature_2_title': 'Confidentialité renforcée',
    'feature_2_description': 'Navigation privée et sécurisée, sans tracking ni surveillance',
    'feature_3_title': 'Analyse complète',
    'feature_3_description': 'Scan approfondi de vos fichiers et système pour identifier tout risque potentiel',
    
    // Testimonials section
    'testimonials_title': 'Ce que disent nos utilisateurs',
    'testimonial_quote_1': "Guardia a renforcé la sécurité de notre entreprise de manière simple et efficace. Un outil indispensable que je recommande vivement.",
    'testimonial_name_1': "Jean Dupont",
    'testimonial_title_1': "Dirigeant, TPE",
    'testimonial_quote_2': "Une solution facile à mettre en place et un support réactif. Nous nous sentons enfin protégés contre les cybermenaces.",
    'testimonial_name_2': "Marie Lemoine",
    'testimonial_title_2': "Particulier",
    'testimonial_quote_3': "Depuis que nous utilisons Guardia, nous avons évité plusieurs tentatives d'intrusion. Le meilleur investissement pour notre sécurité informatique.",
    'testimonial_name_3': "Thomas Martin",
    'testimonial_title_3': "DSI, PME",
    
    // Pricing section
    'pricing_title': 'Nos offres',
    'pricing_subtitle': 'Choisissez le plan qui répond à vos besoins',
    'monthly': 'Mensuel',
    'yearly': 'Annuel',
    'basic_plan': 'Essentiel',
    'pro_plan': 'Professionnel',
    'enterprise_plan': 'Entreprise',
    'month': 'mois',
    'year': 'an',
    'save_text': 'Économisez 20%',
    'billed_annually': 'Facturé annuellement',
    'current_plan': 'Votre forfait actuel',
    'select_plan': 'Sélectionner',
    'contact_sales': 'Contacter commercial',
    
    // CTA section
    'cta_title': 'Prêt à sécuriser votre vie numérique ?',
    'cta_subtitle': 'Rejoignez les milliers d\'utilisateurs qui font confiance à Guardia pour leur sécurité en ligne',
    'cta_button': 'Commencer votre essai gratuit',
    
    // Footer
    'rights_reserved': 'Tous droits réservés',
    'terms': 'Conditions d\'utilisation',
    'privacy': 'Politique de confidentialité',
    'cookies': 'Politique des cookies',
    'legal': 'Mentions légales',
    
    // Dashboard page
    'dashboard': 'Tableau de bord',
    'quick_scan': 'Analyse rapide',
    'change_language': 'Changer de langue',
  },
  en: {
    // General
    'app_name': 'Guardia',
    'get_started': 'Get Started',
    'learn_more': 'Learn More',
    'contact_us': 'Contact Us',
    'login': 'Login',
    'logout': 'Logout',
    'signup': 'Sign Up',
    'email': 'Email',
    'password': 'Password',
    'confirm_password': 'Confirm Password',
    'forgot_password': 'Forgot Password?',
    
    // Navigation
    'home': 'Home',
    'features': 'Features',
    'pricing': 'Pricing',
    'about': 'About',
    'faq': 'FAQ',
    'blog': 'Blog',
    'testimonials': 'Testimonials',
    'contact': 'Contact',
    
    // Hero section
    'hero_title': 'Complete Protection Against Digital Threats',
    'hero_subtitle': 'Secure your devices, data, and privacy with our all-in-one cybersecurity solution',
    'hero_cta': 'Try for Free',
    
    // Features section
    'features_title': 'Our Features',
    'feature_1_title': 'Real-time Protection',
    'feature_1_description': 'Instant detection and neutralization of threats for continuous protection',
    'feature_2_title': 'Enhanced Privacy',
    'feature_2_description': 'Private and secure browsing, without tracking or surveillance',
    'feature_3_title': 'Comprehensive Analysis',
    'feature_3_description': 'In-depth scan of your files and system to identify any potential risks',
    
    // Testimonials section
    'testimonials_title': 'What Our Users Say',
    'testimonial_quote_1': "Guardia has strengthened our company's security in a simple and effective way. An essential tool that I highly recommend.",
    'testimonial_name_1': "John Smith",
    'testimonial_title_1': "Manager, Small Business",
    'testimonial_quote_2': "An easy-to-implement solution with responsive support. We finally feel protected against cyber threats.",
    'testimonial_name_2': "Mary Johnson",
    'testimonial_title_2': "Individual User",
    'testimonial_quote_3': "Since we've been using Guardia, we've avoided several intrusion attempts. The best investment for our IT security.",
    'testimonial_name_3': "Thomas Wilson",
    'testimonial_title_3': "CIO, Medium Enterprise",
    
    // Pricing section
    'pricing_title': 'Our Plans',
    'pricing_subtitle': 'Choose the plan that meets your needs',
    'monthly': 'Monthly',
    'yearly': 'Yearly',
    'basic_plan': 'Essential',
    'pro_plan': 'Professional',
    'enterprise_plan': 'Enterprise',
    'month': 'month',
    'year': 'year',
    'save_text': 'Save 20%',
    'billed_annually': 'Billed annually',
    'current_plan': 'Your current plan',
    'select_plan': 'Select',
    'contact_sales': 'Contact Sales',
    
    // CTA section
    'cta_title': 'Ready to secure your digital life?',
    'cta_subtitle': 'Join thousands of users who trust Guardia for their online security',
    'cta_button': 'Start your free trial',
    
    // Footer
    'rights_reserved': 'All rights reserved',
    'terms': 'Terms of Service',
    'privacy': 'Privacy Policy',
    'cookies': 'Cookie Policy',
    'legal': 'Legal Notice',
    
    // Dashboard page
    'dashboard': 'Dashboard',
    'quick_scan': 'Quick Scan',
    'change_language': 'Change Language',
  },
  // Adding placeholder translations for the additional languages
  es: {
    // General
    'app_name': 'Guardia',
    'get_started': 'Comenzar',
    'learn_more': 'Saber más',
    'contact_us': 'Contáctenos',
    'login': 'Iniciar sesión',
    'logout': 'Cerrar sesión',
    'signup': 'Registrarse',
    'email': 'Correo electrónico',
    'password': 'Contraseña',
    'confirm_password': 'Confirmar contraseña',
    'forgot_password': '¿Olvidó su contraseña?',
    
    // Navigation
    'home': 'Inicio',
    'features': 'Características',
    'pricing': 'Precios',
    'about': 'Acerca de',
    'faq': 'Preguntas frecuentes',
    'blog': 'Blog',
    'testimonials': 'Testimonios',
    'contact': 'Contacto',
    
    // Dashboard page
    'dashboard': 'Panel de control',
    'quick_scan': 'Escaneo rápido',
    'change_language': 'Cambiar idioma',
  },
  de: {
    // General
    'app_name': 'Guardia',
    'get_started': 'Loslegen',
    'learn_more': 'Mehr erfahren',
    'contact_us': 'Kontaktieren Sie uns',
    'login': 'Anmelden',
    'logout': 'Abmelden',
    'signup': 'Registrieren',
    'email': 'E-Mail',
    'password': 'Passwort',
    'confirm_password': 'Passwort bestätigen',
    'forgot_password': 'Passwort vergessen?',
    
    // Navigation
    'home': 'Startseite',
    'features': 'Funktionen',
    'pricing': 'Preise',
    'about': 'Über uns',
    'faq': 'FAQ',
    'blog': 'Blog',
    'testimonials': 'Erfahrungsberichte',
    'contact': 'Kontakt',
    
    // Dashboard page
    'dashboard': 'Dashboard',
    'quick_scan': 'Schnellscan',
    'change_language': 'Sprache ändern',
  },
  it: {
    // General
    'app_name': 'Guardia',
    'get_started': 'Inizia',
    'learn_more': 'Scopri di più',
    'contact_us': 'Contattaci',
    'login': 'Accedi',
    'logout': 'Esci',
    'signup': 'Registrati',
    'email': 'Email',
    'password': 'Password',
    'confirm_password': 'Conferma password',
    'forgot_password': 'Password dimenticata?',
    
    // Navigation
    'home': 'Home',
    'features': 'Funzionalità',
    'pricing': 'Prezzi',
    'about': 'Chi siamo',
    'faq': 'FAQ',
    'blog': 'Blog',
    'testimonials': 'Testimonianze',
    'contact': 'Contatti',
    
    // Dashboard page
    'dashboard': 'Dashboard',
    'quick_scan': 'Scansione rapida',
    'change_language': 'Cambia lingua',
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Browser language detection
  const detectBrowserLanguage = (): Language => {
    const browserLang = navigator.language.split('-')[0];
    return browserLang === 'fr' ? 'fr' : 'en';
  };
  
  // Initialize with browser language or stored preference
  const [language, setLanguage] = useState<Language>(() => {
    const storedLang = localStorage.getItem('language');
    if (storedLang === 'fr' || storedLang === 'en') {
      return storedLang;
    }
    return detectBrowserLanguage();
  });
  
  // Translate function
  const t = (key: string): string => {
    const translation = translations[language][key as keyof (typeof translations)[typeof language]];
    if (!translation) {
      console.warn(`Missing translation: ${key} for language: ${language}`);
      // Return the key as fallback
      return key;
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
