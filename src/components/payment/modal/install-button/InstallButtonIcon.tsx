
import React from 'react';
import { Loader2, Plus } from 'lucide-react';
import { InstallPWAIconProps } from '../types/installPwa';

const InstallButtonIcon: React.FC<InstallPWAIconProps> = ({ isInstalling }) => {
  if (isInstalling) {
    return <Loader2 className="h-4 w-4 mr-2 animate-spin" />;
  }
  
  return <Plus className="h-4 w-4 mr-2" />;
};

export default InstallButtonIcon;
