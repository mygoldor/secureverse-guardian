
// PWA installation event interface
export interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{
    outcome: 'accepted' | 'dismissed';
    platform: string;
  }>;
  prompt(): Promise<void>;
}

export interface InstallPWAButtonProps {
  deferredPrompt: BeforeInstallPromptEvent | null;
  onInstall: () => void;
}

export interface InstallPWAIconProps {
  isInstalling: boolean;
}

export interface InstallButtonContentProps {
  isInstalling: boolean;
}
