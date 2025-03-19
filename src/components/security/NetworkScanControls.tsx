
import React from 'react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';

interface NetworkScanControlsProps {
  isScanning: boolean;
  isMonitoring: boolean;
  onScan: () => void;
  onStartMonitoring: () => void;
  onStopMonitoring: () => void;
}

const NetworkScanControls: React.FC<NetworkScanControlsProps> = ({
  isScanning,
  isMonitoring,
  onScan,
  onStartMonitoring,
  onStopMonitoring
}) => {
  const { t } = useLanguage();

  return (
    <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
      <Button
        onClick={onScan}
        disabled={isScanning || isMonitoring}
        className="w-full"
      >
        {isScanning ? t('scanning_network') : t('scan_network')}
      </Button>
      
      {!isMonitoring ? (
        <Button 
          onClick={onStartMonitoring} 
          disabled={isScanning}
          className="w-full"
        >
          {t('monitor_network')}
        </Button>
      ) : (
        <Button 
          onClick={onStopMonitoring} 
          variant="destructive"
          className="w-full"
        >
          {t('stop_monitoring')}
        </Button>
      )}
    </div>
  );
};

export default NetworkScanControls;
