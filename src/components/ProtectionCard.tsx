
import React from 'react';
import { LucideIcon } from 'lucide-react';
import { Switch } from '@/components/ui/switch';

interface ProtectionCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  enabled: boolean;
  onToggle: () => void;
  color: string;
}

const ProtectionCard: React.FC<ProtectionCardProps> = ({
  title,
  description,
  icon: Icon,
  enabled,
  onToggle,
  color
}) => {
  return (
    <div className="security-card p-5 flex items-start">
      <div className="mr-4">
        <div className={`p-3 rounded-lg ${color} bg-opacity-15`}>
          <Icon className={`h-6 w-6 ${color}`} />
        </div>
      </div>
      <div className="flex-grow">
        <div className="flex justify-between items-start">
          <h3 className="font-semibold text-security-foreground">{title}</h3>
          <Switch checked={enabled} onCheckedChange={onToggle} />
        </div>
        <p className="mt-1 text-sm text-security-muted">{description}</p>
      </div>
    </div>
  );
};

export default ProtectionCard;
