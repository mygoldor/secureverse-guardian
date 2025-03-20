
import React from 'react';

interface BrowserInstructionsProps {
  browserType: 'ios' | 'chrome' | 'edge' | 'firefox' | 'android' | 'default';
}

const BrowserInstructions: React.FC<BrowserInstructionsProps> = ({ browserType }) => {
  switch (browserType) {
    case 'ios':
      return (
        <div className="space-y-2 mt-2">
          <h4 className="font-medium">Instructions pour Safari sur iOS:</h4>
          <ol className="list-decimal pl-5 text-sm">
            <li>Touchez l'icône de partage <span className="inline-block px-2 py-1 bg-gray-100 rounded">􀈂</span> en bas de l'écran</li>
            <li>Faites défiler et touchez "Sur l'écran d'accueil"</li>
            <li>Touchez "Ajouter" en haut à droite</li>
          </ol>
        </div>
      );
    case 'chrome':
      return (
        <div className="space-y-2 mt-2">
          <h4 className="font-medium">Instructions pour Chrome:</h4>
          <ol className="list-decimal pl-5 text-sm">
            <li>Cliquez sur les trois points ⋮ en haut à droite</li>
            <li>Sélectionnez "Installer Guardia..."</li>
          </ol>
        </div>
      );
    case 'edge':
      return (
        <div className="space-y-2 mt-2">
          <h4 className="font-medium">Instructions pour Edge:</h4>
          <ol className="list-decimal pl-5 text-sm">
            <li>Cliquez sur les trois points ... en haut à droite</li>
            <li>Sélectionnez "Applications" puis "Installer cette application"</li>
          </ol>
        </div>
      );
    case 'firefox':
      return (
        <div className="space-y-2 mt-2">
          <h4 className="font-medium">Instructions pour Firefox:</h4>
          <ol className="list-decimal pl-5 text-sm">
            <li>Firefox ne prend pas entièrement en charge l'installation des PWA</li>
            <li>Vous pouvez ajouter un marque-page ou créer un raccourci manuellement</li>
          </ol>
        </div>
      );
    case 'android':
      return (
        <div className="space-y-2 mt-2">
          <h4 className="font-medium">Instructions pour Android:</h4>
          <ol className="list-decimal pl-5 text-sm">
            <li>Touchez les trois points ⋮ en haut à droite</li>
            <li>Sélectionnez "Installer l'application" ou "Ajouter à l'écran d'accueil"</li>
          </ol>
        </div>
      );
    default:
      return (
        <div className="space-y-2 mt-2">
          <h4 className="font-medium">Instructions générales:</h4>
          <ol className="list-decimal pl-5 text-sm">
            <li>Recherchez l'option "Installer" dans le menu de votre navigateur</li>
            <li>Ou utilisez la fonction "Ajouter à l'écran d'accueil"</li>
          </ol>
        </div>
      );
  }
};

export default BrowserInstructions;
