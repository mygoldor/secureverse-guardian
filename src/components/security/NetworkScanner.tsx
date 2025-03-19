
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/contexts/LanguageContext';

interface NetworkScannerProps {
  scanNetwork: () => Promise<any>;
}

const NetworkScanner: React.FC<NetworkScannerProps> = ({ scanNetwork }) => {
  const [networkDevices, setNetworkDevices] = useState<any[]>([]);
  const [isScanning, setIsScanning] = useState(false);
  const { toast } = useToast();
  const { t } = useLanguage();

  const handleScanNetwork = async () => {
    try {
      setIsScanning(true);
      const devices = await scanNetwork();
      setNetworkDevices(Array.isArray(devices) ? devices : []);
      
      toast({
        title: t('network_scan_complete'),
        description: t('found_devices', { count: devices.length }),
      });
    } catch (error) {
      console.error('Network scan failed:', error);
      toast({
        title: t('network_scan_failed'),
        description: String(error),
        variant: 'destructive',
      });
    } finally {
      setIsScanning(false);
    }
  };

  return (
    <div className="space-y-4">
      <Button
        onClick={handleScanNetwork}
        disabled={isScanning}
        className="w-full"
      >
        {isScanning ? t('scanning_network') : t('scan_network')}
      </Button>
      
      {networkDevices.length > 0 && (
        <div className="border rounded-md overflow-hidden">
          <table className="w-full">
            <thead className="bg-muted/50">
              <tr>
                <th className="p-2 text-left font-medium text-muted-foreground">IP</th>
                <th className="p-2 text-left font-medium text-muted-foreground">MAC</th>
              </tr>
            </thead>
            <tbody>
              {networkDevices.map((device, index) => (
                <tr key={index} className="border-t">
                  <td className="p-2">{device.ip}</td>
                  <td className="p-2">{device.mac}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default NetworkScanner;
