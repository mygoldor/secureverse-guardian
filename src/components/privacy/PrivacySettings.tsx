
import React from 'react';
import { UserCheck, Eye, Fingerprint, Trash2 } from 'lucide-react';
import PrivacySettingsCard from './PrivacySettingsCard';

interface PrivacySettingsProps {
  privacySettings: {
    trackingPrevention: boolean;
    cookiesManagement: boolean;
    passwordProtection: boolean;
    dataCleanup: boolean;
  };
  onTogglePrivacy: (key: string) => void;
}

const PrivacySettings: React.FC<PrivacySettingsProps> = ({ 
  privacySettings, 
  onTogglePrivacy 
}) => {
  return (
    <div className="grid md:grid-cols-2 gap-6 mb-10">
      <PrivacySettingsCard
        title="Tracking Prevention"
        description="Blocks third-party trackers that collect your browsing data across websites."
        icon={Eye}
        enabled={privacySettings.trackingPrevention}
        onToggle={() => onTogglePrivacy('trackingPrevention')}
        colorClass="text-security-primary"
      />
      
      <PrivacySettingsCard
        title="Cookie Management"
        description="Controls which websites can store cookies on your device and for how long."
        icon={Fingerprint}
        enabled={privacySettings.cookiesManagement}
        onToggle={() => onTogglePrivacy('cookiesManagement')}
        colorClass="text-security-danger"
      />
      
      <PrivacySettingsCard
        title="Password Protection"
        description="Monitors saved passwords and alerts you if they are found in data breaches."
        icon={UserCheck}
        enabled={privacySettings.passwordProtection}
        onToggle={() => onTogglePrivacy('passwordProtection')}
        colorClass="text-security-warning"
      />
      
      <PrivacySettingsCard
        title="Data Cleanup"
        description="Automatically deletes browsing history and temporary files to protect your privacy."
        icon={Trash2}
        enabled={privacySettings.dataCleanup}
        onToggle={() => onTogglePrivacy('dataCleanup')}
        colorClass="text-security-success"
      />
    </div>
  );
};

export default PrivacySettings;
