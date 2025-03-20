
import React from 'react';
import { Download, HelpCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface InstallButtonsProps {
  onInstall: () => void;
  onHelp: () => void;
}

const InstallButtons: React.FC<InstallButtonsProps> = ({ onInstall, onHelp }) => {
  return (
    <div className="flex space-x-2 mt-3">
      <Button
        size="sm"
        onClick={onInstall}
      >
        <Download className="h-4 w-4 mr-1" />
        Installer
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={onHelp}
      >
        <HelpCircle className="h-4 w-4 mr-1" />
        Aide
      </Button>
    </div>
  );
};

export default InstallButtons;
