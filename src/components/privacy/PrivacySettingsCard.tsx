
import React from 'react';
import { LucideIcon } from 'lucide-react';
import ProtectionCard from '@/components/ProtectionCard';

interface PrivacySettingCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  enabled: boolean;
  onToggle: () => void;
  colorClass: string;
}

const PrivacySettingsCard: React.FC<PrivacySettingCardProps> = ({
  title,
  description,
  icon,
  enabled,
  onToggle,
  colorClass
}) => {
  return (
    <ProtectionCard
      title={title}
      description={description}
      icon={icon}
      enabled={enabled}
      onToggle={onToggle}
      color={colorClass}
    />
  );
};

export default PrivacySettingsCard;
