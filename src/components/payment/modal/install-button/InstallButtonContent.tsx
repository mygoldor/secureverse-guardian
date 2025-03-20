
import React from 'react';
import { InstallButtonContentProps } from '../types/installPwa';

const InstallButtonContent: React.FC<InstallButtonContentProps> = ({ isInstalling }) => {
  return (
    <>
      {isInstalling ? 'Installation en cours...' : 'Ajouter à l\'écran d\'accueil'}
    </>
  );
};

export default InstallButtonContent;
