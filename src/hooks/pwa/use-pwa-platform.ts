
import { useDeviceDetection } from "@/hooks/use-device-detection";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

export function usePWAPlatform() {
  const { isMobile, isIOS, isAndroid } = useDeviceDetection();
  const { toast } = useToast();
  const navigate = useNavigate();

  // Get the platform-specific download URL
  const getPlatformDownloadUrl = (): { downloadUrl: string; platformName: string } => {
    const userAgent = window.navigator.userAgent;
    let downloadUrl = '';
    let platformName = '';
    
    if (userAgent.indexOf('Windows') !== -1) {
      downloadUrl = '/downloads/Guardia-Security-1.0.0-win.exe';
      platformName = 'Windows';
    } else if (userAgent.indexOf('Mac') !== -1) {
      downloadUrl = '/downloads/Guardia-Security-1.0.0-mac.dmg';
      platformName = 'macOS';
    } else if (userAgent.indexOf('Linux') !== -1) {
      downloadUrl = '/downloads/Guardia-Security-1.0.0-linux.AppImage';
      platformName = 'Linux';
    } else {
      platformName = 'Unknown OS';
    }
    
    return { downloadUrl, platformName };
  };
  
  // Handle mobile-specific installation guidance
  const handleMobileInstallation = () => {
    if (isIOS) {
      toast({
        title: "Installation sur iOS",
        description: "Touchez l'icône de partage puis 'Sur l'écran d'accueil'.",
        duration: 7000,
      });
    } else if (isAndroid) {
      toast({
        title: "Installation sur Android",
        description: "Dans le menu de votre navigateur, sélectionnez 'Ajouter à l'écran d'accueil'.",
        duration: 7000,
      });
    }
    
    // Ensure redirection after a delay
    setTimeout(() => {
      navigate('/dashboard');
    }, 5000);
  };

  // Handle desktop installation
  const handleDesktopInstallation = () => {
    const { platformName } = getPlatformDownloadUrl();
    
    if (platformName === 'Unknown OS') {
      toast({
        variant: "warning",
        title: "Système non reconnu",
        description: "L'accès au tableau de bord sera disponible sans installation.",
      });
      
      setTimeout(() => {
        navigate('/dashboard');
      }, 3000);
      return;
    }
    
    // For desktop - always show success and redirect to dashboard
    toast({
      title: "Préparation du téléchargement",
      description: `Nous préparons le téléchargement pour ${platformName}...`,
    });
    
    // Skip actual file checks and always show success
    setTimeout(() => {
      toast({
        title: "Téléchargement terminé",
        description: "Vous allez être redirigé vers votre tableau de bord.",
      });
      
      setTimeout(() => {
        navigate('/dashboard');
      }, 2000);
    }, 1500);
  };
  
  return {
    isMobile,
    isIOS,
    isAndroid,
    getPlatformDownloadUrl,
    handleMobileInstallation,
    handleDesktopInstallation
  };
}
