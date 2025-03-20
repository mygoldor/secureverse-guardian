
# Guardia Security - Build & Distribution Guide

Ce document fournit des instructions pour la construction et la distribution de l'application Guardia Security, y compris les options pour l'application native et l'application web progressive (PWA).

## Prérequis

- Node.js 14 ou supérieur
- Python 3.6 ou supérieur
- npm ou yarn comme gestionnaire de packages

## Build de développement

Pour exécuter Guardia en mode développement:

```bash
# Installer les dépendances (première fois uniquement)
npm install

# Démarrer le serveur de développement
npm run electron:dev
```

## Build de production

### Application native

Pour construire Guardia pour la distribution en tant qu'application native:

```bash
# Construire l'application React
npm run build

# Empaqueter l'application complète pour la distribution
npm run electron:build
```

Les applications empaquetées seront disponibles dans le répertoire `release`, prêtes pour la distribution. Selon votre système d'exploitation, vous trouverez:

- Windows: installateur `.exe` et/ou package `.msi`
- macOS: image disque `.dmg` et/ou archive `.zip`
- Linux: package `.AppImage` et/ou `.deb`

### Application Web Progressive (PWA)

Guardia est également disponible en tant qu'Application Web Progressive, permettant aux utilisateurs d'installer l'application depuis leur navigateur sans passer par les magasins d'applications.

Pour déployer la version PWA:

```bash
# Construire l'application React avec support PWA
npm run build

# Déployer sur votre serveur web
# (Utilisez votre méthode de déploiement préférée)
```

#### Prérequis pour les PWA:

- Un certificat SSL valide pour servir le contenu en HTTPS
- Configuration correcte des en-têtes HTTP pour le service worker
- Support du service worker par le navigateur de l'utilisateur

## Signature de code

### Pourquoi signer votre application

La signature de code de votre application est une étape de sécurité importante qui:
- Vérifie l'authenticité de votre application
- Supprime les avertissements de sécurité des navigateurs et des systèmes d'exploitation
- Crée de la confiance avec vos utilisateurs
- Empêche la falsification de votre application

### Comment signer votre application

#### 1. Obtenir un certificat de signature de code

Achetez un certificat de signature de code auprès d'une autorité de certification (CA) de confiance:
- [DigiCert](https://www.digicert.com/code-signing/)
- [Sectigo](https://sectigo.com/ssl-certificates-tls/code-signing)
- [GlobalSign](https://www.globalsign.com/en/code-signing-certificate)

#### 2. Configurer electron-builder pour la signature de code

Ajoutez ce qui suit à votre configuration `electron-builder.yml`:

```yaml
# Pour Windows
win:
  # ... configuration existante
  certificateFile: "./path/to/certificate.pfx"
  certificatePassword: "${CERTIFICATE_PASSWORD}"
  signAndEditExecutable: true

# Pour macOS
mac:
  # ... configuration existante
  hardenedRuntime: true
  gatekeeperAssess: false
  entitlements: "./build/entitlements.mac.plist"
  entitlementsInherit: "./build/entitlements.mac.plist"
  identity: "Developer ID Application: Your Company Name (YOUR_TEAM_ID)"
```

#### 3. Sécuriser le mot de passe du certificat

Pour les environnements CI/CD, stockez le mot de passe de votre certificat en tant que variable d'environnement sécurisée.

#### 4. Builder avec la signature de code

```bash
# Sur Windows
set CERTIFICATE_PASSWORD=your-password
npm run electron:build

# Sur macOS/Linux
export CERTIFICATE_PASSWORD=your-password
npm run electron:build
```

## Distribution Web et PWA

### Configuration du Service Worker

Le service worker est configuré pour:
- Mettre en cache les ressources clés pour un fonctionnement hors ligne
- Gérer les notifications push
- Fournir une expérience fiable même avec une connectivité intermittente

### Options d'installation

Guardia offre plusieurs options d'installation:

1. **Application native**: Installation traditionnelle via un installateur (.exe, .dmg, etc.)
2. **PWA**: Installation directement depuis le navigateur
3. **Raccourcis desktop**: Création de raccourcis pour accéder rapidement à l'application

### Raccourcis Bureau

Des raccourcis sont générés pour tous les systèmes d'exploitation principaux:
- Windows: fichiers `.url`
- macOS: fichiers `.webloc`
- Linux: fichiers `.desktop`

Pour distribuer ces raccourcis:

```bash
# Inclus dans la build complète ou
# Généré dynamiquement par l'application web
```

## Vérification

Pour vérifier votre build:

1. Naviguez vers le répertoire `release`
2. Installez l'application en utilisant l'installateur approprié pour votre plateforme
3. Exécutez l'application installée et confirmez que toutes les fonctionnalités fonctionnent correctement
4. Vérifiez que la signature numérique est valide en vérifiant les propriétés du fichier

## Dépannage

Si vous rencontrez des problèmes avec le processus de build:

- Assurez-vous que toutes les dépendances sont correctement installées
- Vérifiez que Python est dans votre PATH
- Vérifiez que les dépendances Python dans `requirements.txt` sont installées
- Pour les problèmes de signature de code, vérifiez que votre certificat est valide et correctement configuré

### Problèmes de PWA

- Le service worker ne s'installe pas: Assurez-vous que vous servez le contenu en HTTPS
- L'installation ne fonctionne pas: Vérifiez que le manifeste contient toutes les informations requises
- Les notifications ne fonctionnent pas: Vérifiez les permissions du navigateur

Pour un dépannage avancé, consultez la documentation d'electron-builder à: https://www.electron.build/
