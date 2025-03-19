import React, { useState, useEffect } from 'react';
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
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertTriangle, Shield } from 'lucide-react';

interface NetworkScannerProps {
  scanNetwork: () => Promise<any>;
  getBlockedIPs?: () => Promise<string[]>;
  blockIP?: (ip: string) => Promise<any>;
  unblockIP?: (ip: string) => Promise<any>;
}

const NetworkScanner: React.FC<NetworkScannerProps> = ({ scanNetwork, getBlockedIPs, blockIP, unblockIP }) => {
  const [networkDevices, setNetworkDevices] = useState<any[]>([]);
  const [isScanning, setIsScanning] = useState(false);
  const [monitorInterval, setMonitorInterval] = useState<NodeJS.Timeout | null>(null);
  const [isMonitoring, setIsMonitoring] = useState(false);
  const { toast } = useToast();
  const { t } = useLanguage();

  // Clean up on unmount
  useEffect(() => {
    return () => {
      if (monitorInterval) {
        clearInterval(monitorInterval);
      }
    };
  }, [monitorInterval]);

  const handleScanNetwork = async () => {
    try {
      setIsScanning(true);
      const devices = await scanNetwork();
      setNetworkDevices(Array.isArray(devices) ? devices : []);
      
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

  const startNetworkMonitoring = async () => {
    try {
      setIsMonitoring(true);
      
      // Initial scan
      await handleScanNetwork();
      
      // Set up interval for continuous monitoring
      const interval = setInterval(async () => {
        try {
          const devices = await scanNetwork();
          const newDevices = Array.isArray(devices) ? devices : [];
          
          // Check for new devices
          if (networkDevices.length > 0 && newDevices.length > networkDevices.length) {
            const diff = newDevices.length - networkDevices.length;
            toast({
              title: t('new_devices_detected'),
              description: `${diff} ${t('new_devices_on_network')}`,
            });
          }
          
          // Check for suspicious devices (if they have a 'status' field)
          const suspiciousDevices = newDevices.filter(d => d.status === 'Suspicious');
          if (suspiciousDevices.length > 0) {
            toast({
              title: t('suspicious_connection_detected'),
              description: `${suspiciousDevices.length} ${t('suspicious_devices_found')}`,
              variant: 'destructive',
            });
          }
          
          setNetworkDevices(newDevices);
        } catch (error) {
          console.error('Network monitoring error:', error);
        }
      }, 30000); // Check every 30 seconds
      
      setMonitorInterval(interval);
      
      toast({
        title: t('network_monitoring_started'),
        description: t('monitoring_active'),
      });
    } catch (error) {
      console.error('Failed to start monitoring:', error);
      setIsMonitoring(false);
      
      toast({
        title: t('monitoring_failed'),
        description: String(error),
        variant: 'destructive',
      });
    }
  };

  const stopNetworkMonitoring = () => {
    if (monitorInterval) {
      clearInterval(monitorInterval);
      setMonitorInterval(null);
    }
    setIsMonitoring(false);
    
    toast({
      title: t('network_monitoring_stopped'),
      description: t('monitoring_inactive'),
    });
  };

  const handleBlockIP = async (ip: string) => {
    if (!blockIP) return;
    
    try {
      await blockIP(ip);
      
      toast({
        title: t('ip_blocked'),
        description: `${t('ip_address')}: ${ip}`,
      });
      
      // Update the status in the UI
      setNetworkDevices(prevDevices => 
        prevDevices.map(device => 
          device.ip === ip 
            ? { ...device, blocked: true }
            : device
        )
      );
    } catch (error) {
      console.error('Failed to block IP:', error);
      
      toast({
        title: t('ip_block_failed'),
        description: String(error),
        variant: 'destructive',
      });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('network_scanner')}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
          <Button
            onClick={handleScanNetwork}
            disabled={isScanning || isMonitoring}
            className="w-full"
          >
            {isScanning ? t('scanning_network') : t('scan_network')}
          </Button>
          
          {!isMonitoring ? (
            <Button 
              onClick={startNetworkMonitoring} 
              disabled={isScanning}
              className="w-full"
            >
              {t('monitor_network')}
            </Button>
          ) : (
            <Button 
              onClick={stopNetworkMonitoring} 
              variant="destructive"
              className="w-full"
            >
              {t('stop_monitoring')}
            </Button>
          )}
        </div>
        
        {networkDevices.length > 0 && (
          <div className="border rounded-md overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{t('ip_address') || 'IP'}</TableHead>
                  <TableHead>{t('mac_address') || 'MAC'}</TableHead>
                  <TableHead>{t('status')}</TableHead>
                  {blockIP && <TableHead>{t('actions')}</TableHead>}
                </TableRow>
              </TableHeader>
              <TableBody>
                {networkDevices.map((device, index) => (
                  <TableRow key={index} className={device.status === 'Suspicious' ? 'bg-red-50' : ''}>
                    <TableCell>{device.ip}</TableCell>
                    <TableCell>{device.mac}</TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        {device.status === 'Suspicious' ? (
                          <>
                            <AlertTriangle className="h-4 w-4 text-red-600 mr-1" />
                            <span className="text-red-600">{t('suspicious')}</span>
                          </>
                        ) : device.blocked ? (
                          <span className="text-orange-600">{t('blocked')}</span>
                        ) : (
                          <>
                            <Shield className="h-4 w-4 text-green-600 mr-1" />
                            <span>{t('normal')}</span>
                          </>
                        )}
                      </div>
                    </TableCell>
                    {blockIP && (
                      <TableCell>
                        {!device.blocked && (
                          <Button 
                            variant="destructive" 
                            size="sm" 
                            onClick={() => handleBlockIP(device.ip)}
                            disabled={device.blocked}
                          >
                            {t('block_ip')}
                          </Button>
                        )}
                      </TableCell>
                    )}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default NetworkScanner;
