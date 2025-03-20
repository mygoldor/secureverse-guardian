
/**
 * Script exécuté après l'empaquetage par electron-builder
 * Permet d'effectuer des opérations supplémentaires sur le package
 */

const path = require('path');
const fs = require('fs');

exports.default = async function(context) {
  // Récupérer des informations sur le package actuel
  const { appOutDir, packager, electronPlatformName, arch } = context;
  
  console.log(`AfterPack: Traitement pour ${electronPlatformName} ${arch}`);
  
  try {
    // Copier des raccourcis platform-specific
    if (electronPlatformName === 'win32') {
      await createWindowsShortcut(appOutDir, packager.appInfo.productName);
    } else if (electronPlatformName === 'darwin') {
      await createMacShortcut(appOutDir, packager.appInfo.productName);
    } else if (electronPlatformName === 'linux') {
      await createLinuxShortcut(appOutDir, packager.appInfo.productName);
    }
    
    console.log(`AfterPack: Traitement terminé avec succès`);
  } catch (error) {
    console.error('AfterPack: Erreur lors du traitement:', error);
  }
};

/**
 * Crée un raccourci Windows (.url) pour l'application
 */
async function createWindowsShortcut(appOutDir, productName) {
  const shortcutContent = `[InternetShortcut]
URL=https://app.guardia.com/dashboard
IconIndex=0
HotKey=0
IDList=`;

  const shortcutPath = path.join(appOutDir, 'resources', 'shortcuts');
  
  try {
    // Créer le dossier si nécessaire
    if (!fs.existsSync(shortcutPath)) {
      fs.mkdirSync(shortcutPath, { recursive: true });
    }
    
    // Écrire le fichier de raccourci
    fs.writeFileSync(path.join(shortcutPath, `${productName} Web.url`), shortcutContent);
    console.log(`Raccourci Windows créé avec succès`);
  } catch (error) {
    console.error('Erreur lors de la création du raccourci Windows:', error);
  }
}

/**
 * Crée un raccourci macOS (.webloc) pour l'application
 */
async function createMacShortcut(appOutDir, productName) {
  const weblocContent = `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
    <key>URL</key>
    <string>https://app.guardia.com/dashboard</string>
</dict>
</plist>`;

  const shortcutPath = path.join(appOutDir, 'resources', 'shortcuts');
  
  try {
    // Créer le dossier si nécessaire
    if (!fs.existsSync(shortcutPath)) {
      fs.mkdirSync(shortcutPath, { recursive: true });
    }
    
    // Écrire le fichier de raccourci
    fs.writeFileSync(path.join(shortcutPath, `${productName} Web.webloc`), weblocContent);
    console.log(`Raccourci macOS créé avec succès`);
  } catch (error) {
    console.error('Erreur lors de la création du raccourci macOS:', error);
  }
}

/**
 * Crée un raccourci Linux (.desktop) pour l'application
 */
async function createLinuxShortcut(appOutDir, productName) {
  const desktopContent = `[Desktop Entry]
Type=Application
Name=${productName} Web
Comment=Accéder à Guardia Security via le navigateur
Exec=xdg-open "https://app.guardia.com/dashboard"
Icon=guardia-icon
Terminal=false
Categories=Security;Utility;`;

  const shortcutPath = path.join(appOutDir, 'resources', 'shortcuts');
  
  try {
    // Créer le dossier si nécessaire
    if (!fs.existsSync(shortcutPath)) {
      fs.mkdirSync(shortcutPath, { recursive: true });
    }
    
    // Écrire le fichier de raccourci
    fs.writeFileSync(path.join(shortcutPath, `${productName.toLowerCase().replace(/\s+/g, '-')}-web.desktop`), desktopContent);
    console.log(`Raccourci Linux créé avec succès`);
  } catch (error) {
    console.error('Erreur lors de la création du raccourci Linux:', error);
  }
}
