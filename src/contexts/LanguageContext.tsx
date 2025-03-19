
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
    'view_all': 'Voir tout',
    
    // Landing page
    'home': 'Accueil',
    'features': 'Fonctionnalités',
    'pricing': 'Tarifs',
    'testimonials': 'Témoignages',
    'contact': 'Contact',
    'login': 'Connexion',
    'get_started': 'Démarrer maintenant',
    'hero_title': 'Protégez vos données, sécurisez votre avenir avec Guardia',
    'hero_subtitle': 'La solution de cybersécurité plug-and-play pour les particuliers et les entreprises.',
    'discover_guardia': 'Découvrez Guardia',
    'computer_security': 'Sécurité informatique',
    'key_features': 'Fonctionnalités clés de Guardia',
    'real_time_monitoring': 'Surveillance en temps réel',
    'real_time_monitoring_desc': 'Détection instantanée des menaces et alertes en cas d\'activité suspecte sur votre réseau.',
    'malware_protection': 'Protection contre les malwares',
    'malware_protection_desc': 'Blocage efficace des virus, ransomwares et autres logiciels malveillants avant qu\'ils n\'atteignent vos données.',
    'auto_backup': 'Sauvegarde automatique',
    'auto_backup_desc': 'Sauvegarde sécurisée de vos fichiers importants dans le cloud avec chiffrement de bout en bout.',
    'vulnerability_analysis': 'Analyse de vulnérabilité',
    'vulnerability_analysis_desc': 'Détection proactive des failles de sécurité dans votre système et recommandations pour les corriger.',
    'security_reports': 'Rapports de sécurité',
    'security_reports_desc': 'Rapports détaillés et tableaux de bord personnalisés pour suivre votre niveau de sécurité.',
    'multi_device_protection': 'Protection multi-appareils',
    'multi_device_protection_desc': 'Sécurisez tous vos appareils avec une seule solution, compatible PC, Mac, iOS et Android.',
    'testimonials_title': 'Ils nous font confiance',
    'our_pricing': 'Nos Tarifs',
    'ready_to_protect': 'Prêt à protéger vos données ?',
    'signup_now': 'Inscrivez-vous maintenant et bénéficiez d\'une période d\'essai gratuite de 7 jours.'
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
    'view_all': 'View All',
    
    // Landing page
    'home': 'Home',
    'features': 'Features',
    'pricing': 'Pricing',
    'testimonials': 'Testimonials',
    'contact': 'Contact',
    'login': 'Login',
    'get_started': 'Get Started',
    'hero_title': 'Protect your data, secure your future with Guardia',
    'hero_subtitle': 'The plug-and-play cybersecurity solution for individuals and businesses.',
    'discover_guardia': 'Discover Guardia',
    'computer_security': 'Computer Security',
    'key_features': 'Guardia Key Features',
    'real_time_monitoring': 'Real-time Monitoring',
    'real_time_monitoring_desc': 'Instant threat detection and alerts for suspicious activity on your network.',
    'malware_protection': 'Malware Protection',
    'malware_protection_desc': 'Effective blocking of viruses, ransomware and other malicious software before they reach your data.',
    'auto_backup': 'Automatic Backup',
    'auto_backup_desc': 'Secure backup of your important files in the cloud with end-to-end encryption.',
    'vulnerability_analysis': 'Vulnerability Analysis',
    'vulnerability_analysis_desc': 'Proactive detection of security flaws in your system and recommendations to fix them.',
    'security_reports': 'Security Reports',
    'security_reports_desc': 'Detailed reports and customized dashboards to track your security level.',
    'multi_device_protection': 'Multi-device Protection',
    'multi_device_protection_desc': 'Secure all your devices with a single solution, compatible with PC, Mac, iOS and Android.',
    'testimonials_title': 'They Trust Us',
    'our_pricing': 'Our Pricing',
    'ready_to_protect': 'Ready to protect your data?',
    'signup_now': 'Sign up now and get a 7-day free trial period.'
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
