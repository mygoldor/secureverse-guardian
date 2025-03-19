
import React from 'react';
import { Shield, Check, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

interface SecurityStatusProps {
  status: 'protected' | 'at-risk' | 'vulnerable';
  lastScan: string;
  issuesCount: number;
}

const SecurityStatus: React.FC<SecurityStatusProps> = ({
  status,
  lastScan,
  issuesCount
}) => {
  const getStatusColor = () => {
    switch (status) {
      case 'protected':
        return 'bg-security-success';
      case 'at-risk':
        return 'bg-security-warning';
      case 'vulnerable':
        return 'bg-security-danger';
      default:
        return 'bg-security-success';
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

  const getStatusIcon = () => {
    switch (status) {
      case 'protected':
        return <Check className="h-6 w-6 text-white" />;
      case 'at-risk':
      case 'vulnerable':
        return <AlertTriangle className="h-6 w-6 text-white" />;
      default:
        return <Check className="h-6 w-6 text-white" />;
    }
  };

  const getSecurityScore = () => {
    switch (status) {
      case 'protected':
        return 100;
      case 'at-risk':
        return 65;
      case 'vulnerable':
        return 30;
      default:
        return 100;
    }
  };

  return (
    <div className="security-card p-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between">
        <div className="flex items-center mb-4 md:mb-0">
          <div className={`status-pulse ${getStatusColor()} rounded-full p-3 mr-4`}>
            {getStatusIcon()}
          </div>
          <div>
            <h2 className="text-2xl font-bold text-security-foreground">Security Status</h2>
            <p className="text-security-muted">Your device is <span className={`font-medium ${status === 'protected' ? 'text-security-success' : status === 'at-risk' ? 'text-security-warning' : 'text-security-danger'}`}>{getStatusText()}</span></p>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row md:items-center gap-3">
          <span className="text-sm text-security-muted">Last scan: {lastScan}</span>
          <Button className="bg-security-primary hover:bg-security-secondary text-white">
            Full Scan
          </Button>
        </div>
      </div>
      
      <div className="mt-6">
        <div className="flex justify-between mb-2">
          <span className="text-sm font-medium text-security-foreground">Security Score</span>
          <span className="text-sm font-medium text-security-foreground">{getSecurityScore()}%</span>
        </div>
        <Progress 
          value={getSecurityScore()} 
          className={`h-2 ${status === 'protected' ? 'bg-gray-100' : status === 'at-risk' ? 'bg-gray-100' : 'bg-gray-100'}`}
          indicatorClassName={`${status === 'protected' ? 'bg-security-success' : status === 'at-risk' ? 'bg-security-warning' : 'bg-security-danger'}`}
        />
      </div>
      
      {issuesCount > 0 && (
        <div className="mt-4 p-3 bg-red-50 rounded-lg border border-red-100">
          <p className="text-red-700 text-sm">
            <span className="font-semibold">{issuesCount} issue{issuesCount > 1 ? 's' : ''} detected</span> - Your device needs attention
          </p>
        </div>
      )}
    </div>
  );
};

export default SecurityStatus;
