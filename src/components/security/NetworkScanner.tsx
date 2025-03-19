
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/contexts/LanguageContext';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';

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
      
      // Fix: Use string interpolation or concatenation instead of passing an object parameter
      toast({
        title: t('network_scan_complete'),
        description: t('found_devices') + ': ' + devices.length,
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
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{t('ip_address') || 'IP'}</TableHead>
                <TableHead>{t('mac_address') || 'MAC'}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {networkDevices.map((device, index) => (
                <TableRow key={index}>
                  <TableCell>{device.ip}</TableCell>
                  <TableCell>{device.mac}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
};

export default NetworkScanner;
