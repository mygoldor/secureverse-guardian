
/**
 * Utilitaire pour générer des raccourcis pour différentes plateformes
 */

// Fonction pour générer un fichier .url pour Windows
export const generateWindowsShortcut = (appUrl: string, shortcutName: string = 'Guardia Security'): string => {
  return `[InternetShortcut]
URL=${appUrl}
IconIndex=0
HotKey=0
IDList=
IconFile=%ProgramFiles%\\Guardia Security\\resources\\app\\public\\icons\\guardia-icon-512.png`;
};

// Fonction pour générer un fichier .webloc pour macOS
export const generateMacShortcut = (appUrl: string): string => {
  return `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
    <key>URL</key>
    <string>${appUrl}</string>
</dict>
</plist>`;
};

// Fonction pour générer un fichier .desktop pour Linux
export const generateLinuxShortcut = (appUrl: string, shortcutName: string = 'Guardia Security'): string => {
  return `[Desktop Entry]
Type=Application
Name=${shortcutName}
Comment=Solution de sécurité Guardia
Exec=xdg-open "${appUrl}"
Icon=${appUrl}/icons/guardia-icon-512.png
Terminal=false
Categories=Security;Utility;`;
};

// Fonction pour créer et télécharger un raccourci selon la plateforme
export const createPlatformShortcut = () => {
  const appUrl = window.location.origin;
  let fileContent = '';
  let fileName = '';
  let fileType = '';
  
  // Détecter la plateforme
  const platform = navigator.platform.toLowerCase();
  
  if (platform.includes('win')) {
    // Windows
    fileContent = generateWindowsShortcut(appUrl);
    fileName = 'Guardia_Security.url';
    fileType = 'application/x-mswinurl';
  } else if (platform.includes('mac')) {
    // macOS
    fileContent = generateMacShortcut(appUrl);
    fileName = 'Guardia_Security.webloc';
    fileType = 'application/xml';
  } else if (platform.includes('linux')) {
    // Linux
    fileContent = generateLinuxShortcut(appUrl);
    fileName = 'Guardia_Security.desktop';
    fileType = 'application/x-desktop';
  } else {
    // Plateforme inconnue - utiliser Windows par défaut
    fileContent = generateWindowsShortcut(appUrl);
    fileName = 'Guardia_Security.url';
    fileType = 'application/x-mswinurl';
  }
  
  // Créer un Blob avec le contenu du fichier
  const blob = new Blob([fileContent], { type: fileType });
  
  // Créer une URL pour le Blob
  const url = URL.createObjectURL(blob);
  
  // Créer un élément a pour télécharger le fichier
  const link = document.createElement('a');
  link.href = url;
  link.download = fileName;
  document.body.appendChild(link);
  
  // Cliquer sur le lien pour télécharger le fichier
  link.click();
  
  // Nettoyer
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
  
  return fileName;
};

// Fonction pour vérifier si l'application est déjà installée
export const isAppInstalled = (): boolean => {
  return window.matchMedia('(display-mode: standalone)').matches 
    || (window.navigator as any).standalone === true;
};
