
import React, { createContext, useState, useContext, ReactNode } from 'react';

// Define the available languages
export type Language = 'fr' | 'en' | 'es' | 'de' | 'it';

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
  },
  es: {
    // Dashboard sections
    'dashboard': 'Panel de Control',
    'security_summary': 'Resumen de Seguridad',
    'recent_alerts': 'Alertas Recientes',
    'threat_analysis': 'Análisis de Amenazas',
    'analysis_history': 'Historial de Análisis',
    'security_settings': 'Configuración de Seguridad',
    'my_subscription': 'Mi Suscripción',
    
    // Security Summary
    'real_time_protection': 'Protección en Tiempo Real',
    'active': 'Activa',
    'last_scan': 'Último Análisis Realizado',
    'security_alerts': 'Alertas de Seguridad Recientes',
    'alerts': 'alertas',
    'automatic_backup': 'Copia de Seguridad Automática',
    'successful': 'Exitosa',
    'yesterday': 'Ayer',
    
    // Security Alerts
    'phishing_attempt': 'Intento de Phishing Detectado',
    'malicious_software': 'Software Potencialmente Malicioso',
    'security_update': 'Actualización de Seguridad Disponible',
    'high_priority': 'Alta Prioridad',
    'medium_priority': 'Prioridad Media',
    'low_priority': 'Prioridad Baja',
    'learn_more': 'Más Información',
    'resolved': 'Resuelto',
    
    // Security Charts
    'blocked_attacks': 'Ataques Bloqueados',
    'vulnerability_types': 'Tipos de Vulnerabilidades Detectadas',
    'alert_reaction_time': 'Tiempo de Reacción a las Alertas (minutos)',
    
    // Common actions
    'change_language': 'Cambiar Idioma',
    'quick_scan': 'Análisis Rápido',
    'download_report': 'Descargar Informe',
    'view_all': 'Ver Todo',
    
    // Landing page
    'home': 'Inicio',
    'features': 'Características',
    'pricing': 'Precios',
    'testimonials': 'Testimonios',
    'contact': 'Contacto',
    'login': 'Iniciar Sesión',
    'get_started': 'Comenzar Ahora',
    'hero_title': 'Protege tus datos, asegura tu futuro con Guardia',
    'hero_subtitle': 'La solución de ciberseguridad plug-and-play para individuos y empresas.',
    'discover_guardia': 'Descubre Guardia',
    'computer_security': 'Seguridad Informática',
    'key_features': 'Características Clave de Guardia',
    'real_time_monitoring': 'Monitoreo en Tiempo Real',
    'real_time_monitoring_desc': 'Detección instantánea de amenazas y alertas de actividad sospechosa en tu red.',
    'malware_protection': 'Protección contra Malware',
    'malware_protection_desc': 'Bloqueo efectivo de virus, ransomware y otro software malicioso antes de que llegue a tus datos.',
    'auto_backup': 'Copia de Seguridad Automática',
    'auto_backup_desc': 'Respaldo seguro de tus archivos importantes en la nube con cifrado de extremo a extremo.',
    'vulnerability_analysis': 'Análisis de Vulnerabilidad',
    'vulnerability_analysis_desc': 'Detección proactiva de fallos de seguridad en tu sistema y recomendaciones para corregirlos.',
    'security_reports': 'Informes de Seguridad',
    'security_reports_desc': 'Informes detallados y paneles personalizados para seguir tu nivel de seguridad.',
    'multi_device_protection': 'Protección Multi-dispositivo',
    'multi_device_protection_desc': 'Asegura todos tus dispositivos con una única solución, compatible con PC, Mac, iOS y Android.',
    'testimonials_title': 'Ellos Confían en Nosotros',
    'our_pricing': 'Nuestros Precios',
    'ready_to_protect': '¿Listo para proteger tus datos?',
    'signup_now': 'Regístrate ahora y obtén un período de prueba gratuito de 7 días.'
  },
  de: {
    // Dashboard sections
    'dashboard': 'Dashboard',
    'security_summary': 'Sicherheitsübersicht',
    'recent_alerts': 'Aktuelle Warnungen',
    'threat_analysis': 'Bedrohungsanalyse',
    'analysis_history': 'Analysehistorie',
    'security_settings': 'Sicherheitseinstellungen',
    'my_subscription': 'Mein Abonnement',
    
    // Security Summary
    'real_time_protection': 'Echtzeit-Schutz',
    'active': 'Aktiv',
    'last_scan': 'Letzter Scan durchgeführt',
    'security_alerts': 'Aktuelle Sicherheitswarnungen',
    'alerts': 'Warnungen',
    'automatic_backup': 'Automatisches Backup',
    'successful': 'Erfolgreich',
    'yesterday': 'Gestern',
    
    // Security Alerts
    'phishing_attempt': 'Phishing-Versuch erkannt',
    'malicious_software': 'Potenziell schädliche Software',
    'security_update': 'Sicherheitsupdate verfügbar',
    'high_priority': 'Hohe Priorität',
    'medium_priority': 'Mittlere Priorität',
    'low_priority': 'Niedrige Priorität',
    'learn_more': 'Mehr erfahren',
    'resolved': 'Gelöst',
    
    // Security Charts
    'blocked_attacks': 'Blockierte Angriffe',
    'vulnerability_types': 'Arten erkannter Schwachstellen',
    'alert_reaction_time': 'Reaktionszeit auf Warnungen (Minuten)',
    
    // Common actions
    'change_language': 'Sprache ändern',
    'quick_scan': 'Schnellscan',
    'download_report': 'Bericht herunterladen',
    'view_all': 'Alle anzeigen',
    
    // Landing page
    'home': 'Startseite',
    'features': 'Funktionen',
    'pricing': 'Preise',
    'testimonials': 'Referenzen',
    'contact': 'Kontakt',
    'login': 'Anmelden',
    'get_started': 'Jetzt starten',
    'hero_title': 'Schützen Sie Ihre Daten, sichern Sie Ihre Zukunft mit Guardia',
    'hero_subtitle': 'Die Plug-and-Play-Cybersicherheitslösung für Einzelpersonen und Unternehmen.',
    'discover_guardia': 'Entdecken Sie Guardia',
    'computer_security': 'Computersicherheit',
    'key_features': 'Guardia Hauptfunktionen',
    'real_time_monitoring': 'Echtzeit-Überwachung',
    'real_time_monitoring_desc': 'Sofortige Bedrohungserkennung und Warnungen bei verdächtigen Aktivitäten in Ihrem Netzwerk.',
    'malware_protection': 'Malware-Schutz',
    'malware_protection_desc': 'Effektive Blockierung von Viren, Ransomware und anderer schädlicher Software, bevor sie Ihre Daten erreichen.',
    'auto_backup': 'Automatisches Backup',
    'auto_backup_desc': 'Sichere Sicherung Ihrer wichtigen Dateien in der Cloud mit Ende-zu-Ende-Verschlüsselung.',
    'vulnerability_analysis': 'Schwachstellenanalyse',
    'vulnerability_analysis_desc': 'Proaktive Erkennung von Sicherheitslücken in Ihrem System und Empfehlungen zur Behebung.',
    'security_reports': 'Sicherheitsberichte',
    'security_reports_desc': 'Detaillierte Berichte und angepasste Dashboards zur Verfolgung Ihres Sicherheitsniveaus.',
    'multi_device_protection': 'Multi-Geräte-Schutz',
    'multi_device_protection_desc': 'Sichern Sie alle Ihre Geräte mit einer einzigen Lösung, kompatibel mit PC, Mac, iOS und Android.',
    'testimonials_title': 'Sie vertrauen uns',
    'our_pricing': 'Unsere Preise',
    'ready_to_protect': 'Bereit, Ihre Daten zu schützen?',
    'signup_now': 'Melden Sie sich jetzt an und erhalten Sie eine kostenlose 7-Tage-Testphase.'
  },
  it: {
    // Dashboard sections
    'dashboard': 'Cruscotto',
    'security_summary': 'Riepilogo Sicurezza',
    'recent_alerts': 'Avvisi Recenti',
    'threat_analysis': 'Analisi delle Minacce',
    'analysis_history': 'Cronologia Analisi',
    'security_settings': 'Impostazioni di Sicurezza',
    'my_subscription': 'Il Mio Abbonamento',
    
    // Security Summary
    'real_time_protection': 'Protezione in Tempo Reale',
    'active': 'Attiva',
    'last_scan': 'Ultima Scansione Effettuata',
    'security_alerts': 'Avvisi di Sicurezza Recenti',
    'alerts': 'avvisi',
    'automatic_backup': 'Backup Automatico',
    'successful': 'Riuscito',
    'yesterday': 'Ieri',
    
    // Security Alerts
    'phishing_attempt': 'Tentativo di Phishing Rilevato',
    'malicious_software': 'Software Potenzialmente Malevolo',
    'security_update': 'Aggiornamento di Sicurezza Disponibile',
    'high_priority': 'Alta Priorità',
    'medium_priority': 'Media Priorità',
    'low_priority': 'Bassa Priorità',
    'learn_more': 'Scopri di più',
    'resolved': 'Risolto',
    
    // Security Charts
    'blocked_attacks': 'Attacchi Bloccati',
    'vulnerability_types': 'Tipi di Vulnerabilità Rilevate',
    'alert_reaction_time': 'Tempo di Reazione agli Avvisi (minuti)',
    
    // Common actions
    'change_language': 'Cambia Lingua',
    'quick_scan': 'Scansione Rapida',
    'download_report': 'Scarica Rapporto',
    'view_all': 'Visualizza Tutto',
    
    // Landing page
    'home': 'Home',
    'features': 'Funzionalità',
    'pricing': 'Prezzi',
    'testimonials': 'Testimonianze',
    'contact': 'Contatti',
    'login': 'Accedi',
    'get_started': 'Inizia Ora',
    'hero_title': 'Proteggi i tuoi dati, assicura il tuo futuro con Guardia',
    'hero_subtitle': 'La soluzione di cybersecurity plug-and-play per individui e aziende.',
    'discover_guardia': 'Scopri Guardia',
    'computer_security': 'Sicurezza Informatica',
    'key_features': 'Funzionalità Chiave di Guardia',
    'real_time_monitoring': 'Monitoraggio in Tempo Reale',
    'real_time_monitoring_desc': 'Rilevamento istantaneo delle minacce e avvisi in caso di attività sospette sulla tua rete.',
    'malware_protection': 'Protezione da Malware',
    'malware_protection_desc': 'Blocco efficace di virus, ransomware e altri software malevoli prima che raggiungano i tuoi dati.',
    'auto_backup': 'Backup Automatico',
    'auto_backup_desc': 'Backup sicuro dei tuoi file importanti nel cloud con crittografia end-to-end.',
    'vulnerability_analysis': 'Analisi delle Vulnerabilità',
    'vulnerability_analysis_desc': 'Rilevamento proattivo delle falle di sicurezza nel tuo sistema e consigli per correggerle.',
    'security_reports': 'Rapporti di Sicurezza',
    'security_reports_desc': 'Rapporti dettagliati e pannelli personalizzati per monitorare il tuo livello di sicurezza.',
    'multi_device_protection': 'Protezione Multi-dispositivo',
    'multi_device_protection_desc': 'Proteggi tutti i tuoi dispositivi con un\'unica soluzione, compatibile con PC, Mac, iOS e Android.',
    'testimonials_title': 'Chi si Fida di Noi',
    'our_pricing': 'I Nostri Prezzi',
    'ready_to_protect': 'Pronto a proteggere i tuoi dati?',
    'signup_now': 'Iscriviti ora e ottieni un periodo di prova gratuito di 7 giorni.'
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
