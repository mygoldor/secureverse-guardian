
import React from 'react';
import { Button } from '@/components/ui/button';
import { ExternalLink } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface HelpLinkProps {
  showHelpLink: boolean;
  downloadError: boolean | undefined;
  onHelpClick: () => void;
}

const HelpLink: React.FC<HelpLinkProps> = ({ 
  showHelpLink, 
  downloadError, 
  onHelpClick 
}) => {
  const navigate = useNavigate();
  
  if (!(showHelpLink || downloadError)) {
    return null;
  }
  
  const handleClick = () => {
    navigate('/installation-guide');
    onHelpClick();
  };
  
  return (
    <div className="mt-4 text-center">
      <Button 
        variant="link" 
        onClick={handleClick}
        className="text-blue-600"
      >
        <ExternalLink className="h-4 w-4 mr-1" />
        Besoin d'aide pour l'installation ?
      </Button>
    </div>
  );
};

export default HelpLink;
