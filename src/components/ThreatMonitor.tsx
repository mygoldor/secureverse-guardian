
import React from 'react';
import { Shield, AlertCircle, BarChart2 } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface Threat {
  id: number;
  type: string;
  source: string;
  time: string;
  status: 'blocked' | 'detected' | 'quarantined';
}

interface ThreatMonitorProps {
  threats: Threat[];
  totalBlocked: number;
}

const ThreatMonitor: React.FC<ThreatMonitorProps> = ({
  threats,
  totalBlocked
}) => {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'blocked':
        return <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">Blocked</span>;
      case 'detected':
        return <span className="px-2 py-1 text-xs font-medium rounded-full bg-yellow-100 text-yellow-800">Detected</span>;
      case 'quarantined':
        return <span className="px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800">Quarantined</span>;
      default:
        return <span className="px-2 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-800">Unknown</span>;
    }
  };

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Shield className="h-5 w-5 text-security-primary" />
            <CardTitle>Threat Monitor</CardTitle>
          </div>
          <div className="flex items-center space-x-1 bg-security-success bg-opacity-15 px-2 py-1 rounded-full">
            <Shield className="h-4 w-4 text-security-success" />
            <span className="text-xs font-medium text-security-success">{totalBlocked} Threats Blocked</span>
          </div>
        </div>
        <CardDescription>Recent security events on your device</CardDescription>
      </CardHeader>
      <CardContent>
        {threats.length > 0 ? (
          <div className="space-y-3 mt-2">
            {threats.map((threat) => (
              <div key={threat.id} className="flex items-start p-3 rounded-lg bg-gray-50">
                <AlertCircle className="h-5 w-5 text-security-danger mt-0.5 mr-3" />
                <div className="flex-grow">
                  <div className="flex justify-between">
                    <h4 className="font-medium text-security-foreground">{threat.type}</h4>
                    {getStatusBadge(threat.status)}
                  </div>
                  <p className="text-xs text-security-muted mt-1">Source: {threat.source}</p>
                  <p className="text-xs text-security-muted">{threat.time}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-6">
            <Shield className="h-10 w-10 text-security-success mb-2" />
            <p className="text-sm font-medium text-security-foreground">No threats detected</p>
            <p className="text-xs text-security-muted">Your device is currently secure</p>
          </div>
        )}
        
        <div className="mt-4 pt-4 border-t border-gray-100">
          <button className="w-full flex items-center justify-center text-sm text-security-primary hover:text-security-secondary transition-colors">
            <BarChart2 className="h-4 w-4 mr-1" />
            View full security report
          </button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ThreatMonitor;
