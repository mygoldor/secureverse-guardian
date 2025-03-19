import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { FileHeart, Folder } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/contexts/LanguageContext';
import ScanProgressIndicator from './ScanProgressIndicator';

interface DirectoryScannerProps {
  selectDirectory: () => Promise<string | null>;
  scanDirectory: (directoryPath: string) => Promise<any>;
}

const DirectoryScanner: React.FC<DirectoryScannerProps> = ({ 
  selectDirectory,
  scanDirectory
}) => {
  const [selectedDirectory, setSelectedDirectory] = useState<string | null>(null);
  const [scanResult, setScanResult] = useState<any | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const { toast } = useToast();
  const { t } = useLanguage();

  const handleSelectDirectory = async () => {
    if (!selectDirectory) return;
    
    const directoryPath = await selectDirectory();
    if (directoryPath) {
      setSelectedDirectory(directoryPath);
      setScanResult(null);
    }
  };

  const handleScanDirectory = async () => {
    if (!selectedDirectory || !scanDirectory) return;
    
    try {
      setIsScanning(true);
      setScanProgress(5); // Start progress
      
      // Start the scan (assuming it may take time for large directories)
      const scanPromise = scanDirectory(selectedDirectory);
      
      // Simulate progress updates while waiting for the scan to complete
      let progress = 5;
      const progressInterval = setInterval(() => {
        progress += Math.floor(Math.random() * 10) + 1;
        if (progress > 95) {
          progress = 95;
          clearInterval(progressInterval);
        }
        setScanProgress(progress);
      }, 800);
      
      // Wait for scan to complete
      const result = await scanPromise;
      clearInterval(progressInterval);
      setScanProgress(100);
      setScanResult(result);
      
      // Show toast with results
      if (result.threatsFound && result.threatsFound > 0) {
        toast({
          title: t('threats_detected'),
          description: `${result.threatsFound} ${t('threats_found_in_directory')}`,
          variant: 'destructive',
        });
      } else {
        toast({
          title: t('scan_complete'),
          description: t('no_threats_found_in_directory'),
        });
      }
    } catch (error) {
      console.error('Directory scan failed:', error);
      toast({
        title: t('scan_failed'),
        description: String(error),
        variant: 'destructive',
      });
    } finally {
      setIsScanning(false);
      setScanProgress(0);
    }
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label>{t('selected_directory')}</Label>
        <div className="flex space-x-2">
          <Input 
            value={selectedDirectory || ''}
            readOnly
            placeholder={t('no_directory_selected')}
            className="flex-grow"
          />
          <Button 
            onClick={handleSelectDirectory}
            className="whitespace-nowrap"
          >
            <Folder className="h-4 w-4 mr-2" />
            {t('select_directory')}
          </Button>
        </div>
      </div>
      
      {isScanning && (
        <ScanProgressIndicator 
          progress={scanProgress}
          statusMessage={t('scanning_directory')}
        />
      )}
      
      <Button
        onClick={handleScanDirectory}
        disabled={!selectedDirectory || isScanning || !scanDirectory}
        className="w-full"
      >
        <FileHeart className="h-4 w-4 mr-2" />
        {isScanning ? t('scanning') : t('scan_directory')}
      </Button>
      
      {scanResult && (
        <DirectoryScanResult scanResult={scanResult} t={t} />
      )}
    </div>
  );
};

interface DirectoryScanResultProps {
  scanResult: any;
  t: (key: string) => string;
}

const DirectoryScanResult: React.FC<DirectoryScanResultProps> = ({ scanResult, t }) => {
  return (
    <div className="p-4 rounded-md border">
      <h4 className="font-medium">{t('scan_results')}</h4>
      <div className="mt-2 space-y-2">
        <p>{t('files_scanned')}: {scanResult.filesScanned || 0}</p>
        <p>{t('threats_found')}: {scanResult.threatsFound || 0}</p>
        {scanResult.threatsFound > 0 && scanResult.threatsList && (
          <div>
            <p className="font-medium">{t('detected_threats')}:</p>
            <ul className="list-disc list-inside">
              {scanResult.threatsList.map((threat: any, index: number) => (
                <li key={index}>
                  {threat.path} - {threat.reason}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default DirectoryScanner;
