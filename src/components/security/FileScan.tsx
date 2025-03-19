
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Shield, AlertTriangle, Search, FileHeart, Folder } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface FileScanProps {
  selectFile: () => Promise<string | null>;
  selectDirectory?: () => Promise<string | null>;
  scanFile: (filePath: string) => Promise<any>;
  scanDirectory?: (directoryPath: string) => Promise<any>;
  quarantineFile: (filePath: string) => Promise<any>;
}

const FileScan: React.FC<FileScanProps> = ({ 
  selectFile, 
  selectDirectory,
  scanFile, 
  scanDirectory,
  quarantineFile 
}) => {
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const [selectedDirectory, setSelectedDirectory] = useState<string | null>(null);
  const [scanResult, setScanResult] = useState<any | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [scanTab, setScanTab] = useState('file');
  const { toast } = useToast();
  const { t } = useLanguage();

  const handleSelectFile = async () => {
    const filePath = await selectFile();
    if (filePath) {
      setSelectedFile(filePath);
      setScanResult(null);
    }
  };

  const handleSelectDirectory = async () => {
    if (!selectDirectory) return;
    
    const directoryPath = await selectDirectory();
    if (directoryPath) {
      setSelectedDirectory(directoryPath);
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
    <Card>
      <CardHeader>
        <CardTitle>{t('file_scanner')}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Tabs value={scanTab} onValueChange={setScanTab}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="file">{t('file_scan')}</TabsTrigger>
            <TabsTrigger value="directory" disabled={!scanDirectory}>{t('directory_scan')}</TabsTrigger>
          </TabsList>
          
          <TabsContent value="file" className="space-y-4 pt-4">
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
            
            {scanResult && (
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
            )}
          </TabsContent>
          
          <TabsContent value="directory" className="space-y-4 pt-4">
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
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>{t('scanning_directory')}</span>
                  <span>{scanProgress}%</span>
                </div>
                <Progress value={scanProgress} />
              </div>
            )}
            
            <Button
              onClick={handleScanDirectory}
              disabled={!selectedDirectory || isScanning || !scanDirectory}
              className="w-full"
            >
              <FileHeart className="h-4 w-4 mr-2" />
              {isScanning ? t('scanning') : t('scan_directory')}
            </Button>
            
            {scanResult && scanTab === 'directory' && (
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
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default FileScan;
