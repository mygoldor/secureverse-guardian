
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
    // Make sure the payment success flag is set
    sessionStorage.setItem('paymentSuccessful', 'true');
    
    // Make sure the installation choice flag is NOT set so the guide stays visible
    sessionStorage.removeItem('installationChoiceMade');
    
    // Navigate to the installation guide
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
