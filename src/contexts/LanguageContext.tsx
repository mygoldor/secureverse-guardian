
import React, { createContext, useState, useContext, ReactNode } from 'react';

// Define the available languages
export type Language = 'fr' | 'en';

// Define the shape of the context value
interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

// Create the context with a default value
const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Define the translations
const translations: Record<Language, Record<string, string>> = {
  fr: {
    // Dashboard sections
    'dashboard': 'Tableau de bord',
    'security_summary': 'Résumé de la sécurité',
    'recent_alerts': 'Alertes récentes',
    'threat_analysis': 'Analyse des menaces',
    'analysis_history': 'Historique des analyses',
    'security_settings': 'Paramètres de sécurité',
    'my_subscription': 'Mon abonnement',
    
    // Security Summary
    'real_time_protection': 'Protection en temps réel',
    'active': 'Active',
    'last_scan': 'Dernière analyse effectuée',
    'security_alerts': 'Alertes de sécurité récentes',
    'alerts': 'alertes',
    'automatic_backup': 'Sauvegarde automatique',
    'successful': 'Réussie',
    'yesterday': 'Hier',
    
    // Security Alerts
    'phishing_attempt': 'Tentative de phishing détectée',
    'malicious_software': 'Logiciel potentiellement malveillant',
    'security_update': 'Mise à jour de sécurité disponible',
    'high_priority': 'Haute priorité',
    'medium_priority': 'Priorité moyenne',
    'low_priority': 'Priorité basse',
    'learn_more': 'En savoir plus',
    'resolved': 'Résolu',
    
    // Security Charts
    'blocked_attacks': 'Attaques bloquées',
    'vulnerability_types': 'Types de vulnérabilités détectées',
    'alert_reaction_time': 'Temps de réaction aux alertes (minutes)',
    
    // Common actions
    'change_language': 'Changer la langue',
    'quick_scan': 'Analyse rapide',
    'download_report': 'Télécharger le rapport',
    'view_all': 'Voir tout'
  },
  en: {
    // Dashboard sections
    'dashboard': 'Dashboard',
    'security_summary': 'Security Summary',
    'recent_alerts': 'Recent Alerts',
    'threat_analysis': 'Threat Analysis',
    'analysis_history': 'Analysis History',
    'security_settings': 'Security Settings',
    'my_subscription': 'My Subscription',
    
    // Security Summary
    'real_time_protection': 'Real-time Protection',
    'active': 'Active',
    'last_scan': 'Last Scan Performed',
    'security_alerts': 'Recent Security Alerts',
    'alerts': 'alerts',
    'automatic_backup': 'Automatic Backup',
    'successful': 'Successful',
    'yesterday': 'Yesterday',
    
    // Security Alerts
    'phishing_attempt': 'Phishing Attempt Detected',
    'malicious_software': 'Potentially Malicious Software',
    'security_update': 'Security Update Available',
    'high_priority': 'High Priority',
    'medium_priority': 'Medium Priority',
    'low_priority': 'Low Priority',
    'learn_more': 'Learn More',
    'resolved': 'Resolved',
    
    // Security Charts
    'blocked_attacks': 'Blocked Attacks',
    'vulnerability_types': 'Types of Detected Vulnerabilities',
    'alert_reaction_time': 'Alert Reaction Time (minutes)',
    
    // Common actions
    'change_language': 'Change Language',
    'quick_scan': 'Quick Scan',
    'download_report': 'Download Report',
    'view_all': 'View All'
  }
};

// Create the provider component
export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('fr');

  // Translate function
  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

// Create a hook to use the language context
export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
