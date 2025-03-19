
import React, { createContext, useState, useEffect, useContext } from 'react';
import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

interface LanguageContextProps {
  language: string;
  setLanguage: (lang: string) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextProps>({
  language: 'en',
  setLanguage: () => {},
  t: (key: string) => key,
});

export const useLanguage = () => useContext(LanguageContext);

export const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
  const [language, setLanguage] = useState('en');

  useEffect(() => {
    i18next
      .use(LanguageDetector)
      .use(initReactI18next)
      .init({
        debug: false,
        fallbackLng: 'en',
        interpolation: {
          escapeValue: false,
        },
        resources: {
          en: {
            translation: {
              change_language: "Change Language",
              dashboard: "Dashboard",
              quick_scan: "Quick Scan",
              home: "Home",
              features: "Features",
              pricing: "Pricing",
              testimonials: "Testimonials",
              contact: "Contact",
              login: "Login",
              get_started: "Get Started",
              hero_title: "Protect Your Digital Life with Guardia",
              hero_subtitle: "Comprehensive cybersecurity solutions for individuals and businesses.",
              computer_security: "Computer Security",
              key_features: "Key Features",
              real_time_monitoring: "Real-Time Monitoring",
              real_time_monitoring_desc: "24/7 monitoring to detect and prevent threats in real-time.",
              malware_protection: "Malware Protection",
              malware_protection_desc: "Advanced protection against viruses, spyware, and other malware.",
              auto_backup: "Automatic Backup",
              auto_backup_desc: "Regular backups to ensure your data is always safe and recoverable.",
              vulnerability_analysis: "Vulnerability Analysis",
              vulnerability_analysis_desc: "Proactive scanning to identify and fix security vulnerabilities.",
              security_reports: "Security Reports",
              security_reports_desc: "Detailed reports to keep you informed about your security status.",
              multi_device_protection: "Multi-Device Protection",
              multi_device_protection_desc: "Protect all your devices with a single Guardia subscription.",
              testimonials_title: "What Our Clients Say",
              ready_to_protect: "Ready to Protect Your Digital World?",
              signup_now: "Sign up now and get comprehensive protection against cyber threats.",
              login_to_guardia: "Log in to Guardia",
              email_address: "Email address",
              password: "Password",
              enter_your_password: "Enter your password",
              forgot_password: "Forgot password?",
              create_account: "Create an account",
              create_account_guardia: "Create an account with Guardia",
              full_name: "Full name",
              enter_your_name: "Enter your full name",
              confirm_password: "Confirm password",
              confirm_your_password: "Confirm your password",
              already_have_account: "Already have an account?",
              passwords_dont_match: "Passwords don't match",
              passwords_dont_match_desc: "Please ensure both passwords are identical",
              signup_success: "Account created successfully",
              signup_success_desc: "Welcome to Guardia! You can now log in.",
              enter_your_email: "Enter your email",
              cancel_anytime: "No commitment required, cancel anytime.",
              full_protection: "Total protection",
              quick_installation: "Quick installation",
              thirty_day_guarantee: "30-day guarantee",
              discover_guardia: "Discover Guardia"
            }
          },
          fr: {
            translation: {
              change_language: "Changer de Langue",
              dashboard: "Tableau de Bord",
              quick_scan: "Analyse Rapide",
              home: "Accueil",
              features: "Fonctionnalités",
              pricing: "Tarification",
              testimonials: "Témoignages",
              contact: "Contact",
              login: "Se Connecter",
              get_started: "Commencer",
              hero_title: "Protégez Votre Vie Numérique avec Guardia",
              hero_subtitle: "Solutions complètes de cybersécurité pour particuliers et entreprises.",
              computer_security: "Sécurité Informatique",
              key_features: "Fonctionnalités Clés",
              real_time_monitoring: "Surveillance en Temps Réel",
              real_time_monitoring_desc: "Surveillance 24/7 pour détecter et prévenir les menaces en temps réel.",
              malware_protection: "Protection Anti-Malware",
              malware_protection_desc: "Protection avancée contre les virus, les logiciels espions et autres malwares.",
              auto_backup: "Sauvegarde Automatique",
              auto_backup_desc: "Sauvegardes régulières pour garantir que vos données sont toujours en sécurité et récupérables.",
              vulnerability_analysis: "Analyse des Vulnérabilités",
              vulnerability_analysis_desc: "Analyse proactive pour identifier et corriger les vulnérabilités de sécurité.",
              security_reports: "Rapports de Sécurité",
              security_reports_desc: "Rapports détaillés pour vous tenir informé de votre statut de sécurité.",
              multi_device_protection: "Protection Multi-Appareils",
              multi_device_protection_desc: "Protégez tous vos appareils avec un seul abonnement Guardia.",
              testimonials_title: "Ce Que Disent Nos Clients",
              ready_to_protect: "Prêt à Protéger Votre Monde Numérique ?",
              signup_now: "Inscrivez-vous maintenant et bénéficiez d'une protection complète contre les cybermenaces.",
              login_to_guardia: "Se connecter à Guardia",
              email_address: "Adresse e-mail",
              password: "Mot de passe",
              enter_your_password: "Entrez votre mot de passe",
              forgot_password: "Mot de passe oublié ?",
              create_account: "Créer un compte",
              create_account_guardia: "Créer un compte avec Guardia",
              full_name: "Nom complet",
              enter_your_name: "Entrez votre nom complet",
              confirm_password: "Confirmer le mot de passe",
              confirm_your_password: "Confirmez votre mot de passe",
              already_have_account: "Vous avez déjà un compte ?",
              passwords_dont_match: "Les mots de passe ne correspondent pas",
              passwords_dont_match_desc: "Veuillez vous assurer que les deux mots de passe sont identiques",
              signup_success: "Compte créé avec succès",
              signup_success_desc: "Bienvenue chez Guardia ! Vous pouvez maintenant vous connecter.",
              enter_your_email: "Entrez votre email",
              cancel_anytime: "Aucun engagement nécessaire, annulez à tout moment.",
              full_protection: "Protection totale",
              quick_installation: "Installation rapide",
              thirty_day_guarantee: "Garantie 30 jours",
              discover_guardia: "Découvrir Guardia"
            }
          },
          es: {
            translation: {
              change_language: "Cambiar Idioma",
              dashboard: "Panel de Control",
              quick_scan: "Análisis Rápido",
              home: "Inicio",
              features: "Características",
              pricing: "Precios",
              testimonials: "Testimonios",
              contact: "Contacto",
              login: "Iniciar Sesión",
              get_started: "Comenzar",
              hero_title: "Proteja Su Vida Digital con Guardia",
              hero_subtitle: "Soluciones integrales de ciberseguridad para individuos y empresas.",
              computer_security: "Seguridad Informática",
              key_features: "Características Clave",
              real_time_monitoring: "Monitoreo en Tiempo Real",
              real_time_monitoring_desc: "Monitoreo 24/7 para detectar y prevenir amenazas en tiempo real.",
              malware_protection: "Protección Anti-Malware",
              malware_protection_desc: "Protección avanzada contra virus, spyware y otro malware.",
              auto_backup: "Copia de Seguridad Automática",
              auto_backup_desc: "Copias de seguridad regulares para garantizar que sus datos estén siempre seguros y recuperables.",
              vulnerability_analysis: "Análisis de Vulnerabilidades",
              vulnerability_analysis_desc: "Análisis proactivo para identificar y corregir las vulnerabilidades de seguridad.",
              security_reports: "Informes de Seguridad",
              security_reports_desc: "Informes detallados para mantenerle informado sobre su estado de seguridad.",
              multi_device_protection: "Protección Multi-Dispositivo",
              multi_device_protection_desc: "Proteja todos sus dispositivos con una sola suscripción a Guardia.",
              testimonials_title: "Lo Que Dicen Nuestros Clientes",
              ready_to_protect: "¿Listo para Proteger Su Mundo Digital?",
              signup_now: "Regístrese ahora y obtenga protección integral contra las ciberamenazas.",
              login_to_guardia: "Iniciar sesión en Guardia",
              email_address: "Dirección de correo electrónico",
              password: "Contraseña",
              enter_your_password: "Introduzca su contraseña",
              forgot_password: "¿Olvidó su contraseña?",
              create_account: "Crear una cuenta",
              create_account_guardia: "Crear una cuenta con Guardia",
              full_name: "Nombre completo",
              enter_your_name: "Introduzca su nombre completo",
              confirm_password: "Confirmar contraseña",
              confirm_your_password: "Confirme su contraseña",
              already_have_account: "¿Ya tiene una cuenta?",
              passwords_dont_match: "Las contraseñas no coinciden",
              passwords_dont_match_desc: "Por favor, asegúrese de que ambas contraseñas sean idénticas",
              signup_success: "Cuenta creada con éxito",
              signup_success_desc: "¡Bienvenido a Guardia! Ahora puede iniciar sesión.",
              enter_your_email: "Introduce tu correo electrónico",
              cancel_anytime: "Sin compromiso, cancela cuando quieras.",
              full_protection: "Protección total",
              quick_installation: "Instalación rápida",
              thirty_day_guarantee: "Garantía de 30 días",
              discover_guardia: "Descubrir Guardia"
            }
          },
          de: {
            translation: {
              change_language: "Sprache ändern",
              dashboard: "Dashboard",
              quick_scan: "Schnellscan",
              home: "Startseite",
              features: "Funktionen",
              pricing: "Preise",
              testimonials: "Erfahrungsberichte",
              contact: "Kontakt",
              login: "Anmelden",
              get_started: "Loslegen",
              hero_title: "Schützen Sie Ihr digitales Leben mit Guardia",
              hero_subtitle: "Umfassende Cybersicherheitslösungen für Privatpersonen und Unternehmen.",
              computer_security: "Computersicherheit",
              key_features: "Hauptfunktionen",
              real_time_monitoring: "Echtzeitüberwachung",
              real_time_monitoring_desc: "24/7-Überwachung, um Bedrohungen in Echtzeit zu erkennen und zu verhindern.",
              malware_protection: "Malware-Schutz",
              malware_protection_desc: "Erweiterter Schutz vor Viren, Spyware und anderer Malware.",
              auto_backup: "Automatische Sicherung",
              auto_backup_desc: "Regelmäßige Backups, um sicherzustellen, dass Ihre Daten immer sicher und wiederherstellbar sind.",
              vulnerability_analysis: "Schwachstellenanalyse",
              vulnerability_analysis_desc: "Proaktives Scannen, um Sicherheitslücken zu identifizieren und zu beheben.",
              security_reports: "Sicherheitsberichte",
              security_reports_desc: "Detaillierte Berichte, um Sie über Ihren Sicherheitsstatus auf dem Laufenden zu halten.",
              multi_device_protection: "Multi-Geräte-Schutz",
              multi_device_protection_desc: "Schützen Sie alle Ihre Geräte mit einem einzigen Guardia-Abonnement.",
              testimonials_title: "Was unsere Kunden sagen",
              ready_to_protect: "Sind Sie bereit, Ihre digitale Welt zu schützen?",
              signup_now: "Melden Sie sich jetzt an und erhalten Sie umfassenden Schutz vor Cyber-Bedrohungen.",
              login_to_guardia: "Bei Guardia anmelden",
              email_address: "E-Mail-Adresse",
              password: "Passwort",
              enter_your_password: "Geben Sie Ihr Passwort ein",
              forgot_password: "Passwort vergessen?",
              create_account: "Konto erstellen",
              create_account_guardia: "Erstellen Sie ein Konto bei Guardia",
              full_name: "Vollständiger Name",
              enter_your_name: "Geben Sie Ihren vollständigen Namen ein",
              confirm_password: "Passwort bestätigen",
              confirm_your_password: "Bestätigen Sie Ihr Passwort",
              already_have_account: "Haben Sie bereits ein Konto?",
              passwords_dont_match: "Passwörter stimmen nicht überein",
              passwords_dont_match_desc: "Bitte stellen Sie sicher, dass beide Passwörter identisch sind",
              signup_success: "Konto erfolgreich erstellt",
              signup_success_desc: "Willkommen bei Guardia! Sie können sich jetzt anmelden.",
              enter_your_email: "Geben Sie Ihre E-Mail ein",
              cancel_anytime: "Keine Verpflichtung, jederzeit kündbar.",
              full_protection: "Vollständiger Schutz",
              quick_installation: "Schnelle Installation",
              thirty_day_guarantee: "30 Tage Garantie",
              discover_guardia: "Guardia entdecken"
            }
          },
          it: {
            translation: {
              change_language: "Cambia Lingua",
              dashboard: "Pannello di Controllo",
              quick_scan: "Scansione Rapida",
              home: "Home",
              features: "Caratteristiche",
              pricing: "Prezzi",
              testimonials: "Testimonianze",
              contact: "Contatto",
              login: "Accedi",
              get_started: "Inizia",
              hero_title: "Proteggi la Tua Vita Digitale con Guardia",
              hero_subtitle: "Soluzioni complete di cybersecurity per privati e aziende.",
              computer_security: "Sicurezza Informatica",
              key_features: "Caratteristiche Chiave",
              real_time_monitoring: "Monitoraggio in Tempo Reale",
              real_time_monitoring_desc: "Monitoraggio 24/7 per rilevare e prevenire minacce in tempo reale.",
              malware_protection: "Protezione Anti-Malware",
              malware_protection_desc: "Protezione avanzata contro virus, spyware e altri malware.",
              auto_backup: "Backup Automatico",
              auto_backup_desc: "Backup regolari per garantire che i tuoi dati siano sempre al sicuro e recuperabili.",
              vulnerability_analysis: "Analisi delle Vulnerabilità",
              vulnerability_analysis_desc: "Scansione proattiva per identificare e correggere le vulnerabilità di sicurezza.",
              security_reports: "Rapporti di Sicurezza",
              security_reports_desc: "Rapporti dettagliati per tenerti informato sul tuo stato di sicurezza.",
              multi_device_protection: "Protezione Multi-Dispositivo",
              multi_device_protection_desc: "Proteggi tutti i tuoi dispositivi con un singolo abbonamento a Guardia.",
              testimonials_title: "Cosa dicono i nostri clienti",
              ready_to_protect: "Pronto a Proteggere il Tuo Mondo Digitale?",
              signup_now: "Iscriviti ora e ottieni una protezione completa contro le minacce informatiche.",
              login_to_guardia: "Accedi a Guardia",
              email_address: "Indirizzo email",
              password: "Password",
              enter_your_password: "Inserisci la tua password",
              forgot_password: "Password dimenticata?",
              create_account: "Crea un account",
              create_account_guardia: "Crea un account con Guardia",
              full_name: "Nome completo",
              enter_your_name: "Inserisci il tuo nome completo",
              confirm_password: "Conferma password",
              confirm_your_password: "Conferma la tua password",
              already_have_account: "Hai già un account?",
              passwords_dont_match: "Le password non corrispondono",
              passwords_dont_match_desc: "Assicurati che entrambe le password siano identiche",
              signup_success: "Account creato con successo",
              signup_success_desc: "Benvenuto in Guardia! Ora puoi accedere.",
              enter_your_email: "Inserisci la tua email",
              cancel_anytime: "Nessun impegno richiesto, annulla in qualsiasi momento.",
              full_protection: "Protezione totale",
              quick_installation: "Installazione rapida",
              thirty_day_guarantee: "Garanzia di 30 giorni",
              discover_guardia: "Scopri Guardia"
            }
          }
        },
      });

    setLanguage(i18next.language);

    i18next.on('languageChanged', (lng) => {
      setLanguage(lng);
    });
  }, []);

  const t = (key: string) => i18next.t(key);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export default LanguageContext;
