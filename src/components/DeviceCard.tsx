
import React from 'react';
import { Laptop, Smartphone, CheckCircle, AlertCircle } from 'lucide-react';

interface DeviceCardProps {
  deviceType: 'pc' | 'mobile';
  deviceName: string;
  lastActive: string;
  status: 'protected' | 'at-risk' | 'vulnerable';
}

const DeviceCard: React.FC<DeviceCardProps> = ({
  deviceType,
  deviceName,
  lastActive,
  status
}) => {
  const getDeviceIcon = () => {
    switch (deviceType) {
      case 'pc':
        return <Laptop className="h-10 w-10 text-security-primary" />;
      case 'mobile':
        return <Smartphone className="h-10 w-10 text-security-primary" />;
      default:
        return <Laptop className="h-10 w-10 text-security-primary" />;
    }
  };

  const getStatusIcon = () => {
    switch (status) {
      case 'protected':
        return <CheckCircle className="h-5 w-5 text-security-success" />;
      case 'at-risk':
        return <AlertCircle className="h-5 w-5 text-security-warning" />;
      case 'vulnerable':
        return <AlertCircle className="h-5 w-5 text-security-danger" />;
      default:
        return <CheckCircle className="h-5 w-5 text-security-success" />;
    }
  };

  const getStatusText = () => {
    switch (status) {
      case 'protected':
        return 'Protected';
      case 'at-risk':
        return 'At Risk';
      case 'vulnerable':
        return 'Vulnerable';
      default:
        return 'Protected';
    }
  };

  return (
    <div className="security-card p-4 flex items-center">
      <div className="mr-4">
        {getDeviceIcon()}
      </div>
      <div className="flex-grow">
        <h3 className="font-medium text-security-foreground">{deviceName}</h3>
        <p className="text-xs text-security-muted">Last active: {lastActive}</p>
      </div>
      <div className="flex items-center">
        {getStatusIcon()}
        <span className={`ml-1 text-sm ${
          status === 'protected' 
            ? 'text-security-success' 
            : status === 'at-risk' 
              ? 'text-security-warning' 
              : 'text-security-danger'
        }`}>
          {getStatusText()}
        </span>
      </div>
    </div>
  );
};

export default DeviceCard;
