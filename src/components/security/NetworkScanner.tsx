
import React, { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import NetworkScanControls from './NetworkScanControls';
import NetworkDevicesTable from './NetworkDevicesTable';

interface NetworkDevice {
  ip: string;
  mac: string;
  status?: string;
  blocked?: boolean;
}

interface NetworkScannerProps {
  scanNetwork: () => Promise<any>;
  getBlockedIPs?: () => Promise<string[]>;
  blockIP?: (ip: string) => Promise<any>;
  unblockIP?: (ip: string) => Promise<any>;
}

const NetworkScanner: React.FC<NetworkScannerProps> = ({ 
  scanNetwork, 
  getBlockedIPs, 
  blockIP, 
  unblockIP 
}) => {
  const [networkDevices, setNetworkDevices] = useState<NetworkDevice[]>([]);
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
        <NetworkScanControls
          isScanning={isScanning}
          isMonitoring={isMonitoring}
          onScan={handleScanNetwork}
          onStartMonitoring={startNetworkMonitoring}
          onStopMonitoring={stopNetworkMonitoring}
        />
        
        {networkDevices.length > 0 && (
          <NetworkDevicesTable 
            devices={networkDevices} 
            onBlockIP={blockIP ? handleBlockIP : undefined} 
          />
        )}
      </CardContent>
    </Card>
  );
};

export default NetworkScanner;
