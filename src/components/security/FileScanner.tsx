
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Shield, Search, AlertTriangle } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/contexts/LanguageContext';

interface FileScannerProps {
  selectFile: () => Promise<string | null>;
  scanFile: (filePath: string) => Promise<any>;
  quarantineFile: (filePath: string) => Promise<any>;
}

const FileScanner: React.FC<FileScannerProps> = ({ 
  selectFile, 
  scanFile, 
  quarantineFile 
}) => {
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const [scanResult, setScanResult] = useState<any | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const { toast } = useToast();
  const { t } = useLanguage();

  const handleSelectFile = async () => {
    const filePath = await selectFile();
    if (filePath) {
      setSelectedFile(filePath);
      setScanResult(null);
    }
  };

  const handleScanFile = async () => {
    if (!selectedFile) return;
    
    try {
      setIsScanning(true);
      setScanProgress(10); // Start progress
      const result = await scanFile(selectedFile);
      setScanProgress(100); // Complete progress
      setScanResult(result);
      
      toast({
        title: t('scan_complete'),
        description: result.status === 'OK' 
          ? t('no_threats_found') 
          : t('threats_found'),
        variant: result.status === 'OK' ? 'default' : 'destructive',
      });
    } catch (error) {
      console.error('Scan failed:', error);
      toast({
        title: t('scan_failed'),
        description: String(error),
        variant: 'destructive',
      });
    } finally {
      setIsScanning(false);
    }
  };

  const handleQuarantineFile = async () => {
    if (!selectedFile) return;
    
    try {
      const result = await quarantineFile(selectedFile);
      
      toast({
        title: t('quarantine_complete'),
        description: result.message,
        variant: result.status === 'OK' ? 'default' : 'destructive',
      });
      
      if (result.status === 'OK') {
        setSelectedFile(null);
        setScanResult(null);
      }
    } catch (error) {
      console.error('Quarantine failed:', error);
      toast({
        title: t('quarantine_failed'),
        description: String(error),
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label>{t('selected_file')}</Label>
        <div className="flex space-x-2">
          <Input 
            value={selectedFile || ''}
            readOnly
            placeholder={t('no_file_selected')}
            className="flex-grow"
          />
          <Button 
            onClick={handleSelectFile}
            className="whitespace-nowrap"
          >
            <Search className="h-4 w-4 mr-2" />
            {t('select_file')}
          </Button>
        </div>
      </div>
      
      {isScanning && (
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>{t('scanning')}</span>
            <span>{scanProgress}%</span>
          </div>
          <Progress value={scanProgress} />
        </div>
      )}
      
      <div className="flex space-x-2">
        <Button
          onClick={handleScanFile}
          disabled={!selectedFile || isScanning}
          className="flex-grow"
        >
          <Shield className="h-4 w-4 mr-2" />
          {isScanning ? t('scanning') : t('scan_file')}
        </Button>
        
        {scanResult && scanResult.status !== 'OK' && (
          <Button
            onClick={handleQuarantineFile}
            variant="destructive"
          >
            {t('quarantine_file')}
          </Button>
        )}
      </div>
      
      {scanResult && <ScanResultDisplay scanResult={scanResult} t={t} />}
    </div>
  );
};

interface ScanResultDisplayProps {
  scanResult: any;
  t: (key: string) => string;
}

const ScanResultDisplay: React.FC<ScanResultDisplayProps> = ({ scanResult, t }) => {
  return (
    <div className={`p-4 rounded-md ${
      scanResult.status === 'OK' 
        ? 'bg-green-50 border border-green-200' 
        : 'bg-red-50 border border-red-200'
    }`}>
      <div className="flex items-start">
        <div className={`rounded-full p-2 ${
          scanResult.status === 'OK' ? 'bg-green-100' : 'bg-red-100'
        } mr-3`}>
          {scanResult.status === 'OK' ? (
            <Shield className="h-5 w-5 text-green-600" />
          ) : (
            <AlertTriangle className="h-5 w-5 text-red-600" />
          )}
        </div>
        <div>
          <h4 className="font-medium">{scanResult.status === 'OK' ? t('file_safe') : t('file_unsafe')}</h4>
          <p className="text-sm mt-1">{t('file')}: {scanResult.file_path}</p>
          {scanResult.raisons && scanResult.raisons.length > 0 && (
            <div className="mt-2">
              <p className="text-sm font-medium">{t('reasons')}:</p>
              <ul className="text-sm list-disc list-inside">
                {scanResult.raisons.map((reason: string, index: number) => (
                  <li key={index}>{reason}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FileScanner;
