import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Shield, FileSearch, HardDrive, Network, Clock, AlertTriangle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/contexts/LanguageContext';

declare global {
  interface Window {
    electron: {
      selectFile: () => Promise<string | null>;
      selectDirectory: () => Promise<string | null>;
      scanFile: (filePath: string) => Promise<any>;
      quarantineFile: (filePath: string) => Promise<any>;
      backupFiles: (directory: string) => Promise<any>;
      scanNetwork: () => Promise<any>;
      getSecurityLogs: (lines: number) => Promise<{logs: string[]}>;
      getSuspiciousProcesses: () => Promise<{processes: any[]}>;
    };
  }
}

const SecurityAgent = () => {
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const [selectedDirectory, setSelectedDirectory] = useState<string | null>(null);
  const [scanResult, setScanResult] = useState<any | null>(null);
  const [networkDevices, setNetworkDevices] = useState<any[]>([]);
  const [isScanning, setIsScanning] = useState(false);
  const [securityLogs, setSecurityLogs] = useState<string[]>([]);
  const [suspiciousProcesses, setSuspiciousProcesses] = useState<any[]>([]);
  const { toast } = useToast();
  const { t } = useLanguage();

  useEffect(() => {
    if (typeof window !== 'undefined' && window.electron) {
      // Load initial data
      loadSecurityLogs();
      loadSuspiciousProcesses();
    }
  }, []);

  const loadSecurityLogs = async () => {
    if (window.electron) {
      try {
        const response = await window.electron.getSecurityLogs(20);
        setSecurityLogs(response.logs || []);
      } catch (error) {
        console.error('Failed to load security logs:', error);
      }
    }
  };

  const loadSuspiciousProcesses = async () => {
    if (window.electron) {
      try {
        const response = await window.electron.getSuspiciousProcesses();
        setSuspiciousProcesses(response.processes || []);
      } catch (error) {
        console.error('Failed to load suspicious processes:', error);
      }
    }
  };

  const handleSelectFile = async () => {
    if (window.electron) {
      const filePath = await window.electron.selectFile();
      if (filePath) {
        setSelectedFile(filePath);
        setScanResult(null);
      }
    }
  };

  const handleSelectDirectory = async () => {
    if (window.electron) {
      const directoryPath = await window.electron.selectDirectory();
      if (directoryPath) {
        setSelectedDirectory(directoryPath);
      }
    }
  };

  const handleScanFile = async () => {
    if (!selectedFile || !window.electron) return;
    
    try {
      setIsScanning(true);
      const result = await window.electron.scanFile(selectedFile);
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
    if (!selectedFile || !window.electron) return;
    
    try {
      const result = await window.electron.quarantineFile(selectedFile);
      
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

  const handleBackupFiles = async () => {
    if (!selectedDirectory || !window.electron) return;
    
    try {
      setIsScanning(true);
      const result = await window.electron.backupFiles(selectedDirectory);
      
      toast({
        title: t('backup_complete'),
        description: result.message,
        variant: result.status === 'OK' ? 'default' : 'destructive',
      });
    } catch (error) {
      console.error('Backup failed:', error);
      toast({
        title: t('backup_failed'),
        description: String(error),
        variant: 'destructive',
      });
    } finally {
      setIsScanning(false);
    }
  };

  const handleScanNetwork = async () => {
    if (!window.electron) return;
    
    try {
      setIsScanning(true);
      const devices = await window.electron.scanNetwork();
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
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center space-x-2">
          <Shield className="h-6 w-6 text-security-primary" />
          <CardTitle>{t('security_agent')}</CardTitle>
        </div>
        <CardDescription>{t('security_agent_description')}</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="file-scan">
          <TabsList className="w-full mb-4">
            <TabsTrigger value="file-scan" className="flex-1">
              <FileSearch className="h-4 w-4 mr-2" />
              {t('file_scan')}
            </TabsTrigger>
            <TabsTrigger value="backup" className="flex-1">
              <HardDrive className="h-4 w-4 mr-2" />
              {t('backup')}
            </TabsTrigger>
            <TabsTrigger value="network" className="flex-1">
              <Network className="h-4 w-4 mr-2" />
              {t('network')}
            </TabsTrigger>
            <TabsTrigger value="logs" className="flex-1">
              <Clock className="h-4 w-4 mr-2" />
              {t('logs')}
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="file-scan">
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
                  <Button onClick={handleSelectFile}>{t('select_file')}</Button>
                </div>
              </div>
              
              <div className="flex space-x-2">
                <Button
                  onClick={handleScanFile}
                  disabled={!selectedFile || isScanning}
                  className="flex-grow"
                >
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
            </div>
          </TabsContent>
          
          <TabsContent value="backup">
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
                  <Button onClick={handleSelectDirectory}>{t('select_directory')}</Button>
                </div>
              </div>
              
              <Button
                onClick={handleBackupFiles}
                disabled={!selectedDirectory || isScanning}
                className="w-full"
              >
                {isScanning ? t('backing_up') : t('backup_files')}
              </Button>
            </div>
          </TabsContent>
          
          <TabsContent value="network">
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
          </TabsContent>
          
          <TabsContent value="logs">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="font-medium">{t('security_logs')}</h3>
                <Button variant="outline" size="sm" onClick={loadSecurityLogs}>
                  {t('refresh')}
                </Button>
              </div>
              
              <div className="bg-muted/30 rounded-md p-2 h-[200px] overflow-y-auto font-mono text-xs">
                {securityLogs.length > 0 ? (
                  securityLogs.map((log, index) => (
                    <div key={index} className="py-1">{log}</div>
                  ))
                ) : (
                  <div className="text-center text-muted-foreground py-4">
                    {t('no_logs_available')}
                  </div>
                )}
              </div>
              
              <Separator />
              
              <div className="flex justify-between items-center">
                <h3 className="font-medium">{t('suspicious_processes')}</h3>
                <Button variant="outline" size="sm" onClick={loadSuspiciousProcesses}>
                  {t('refresh')}
                </Button>
              </div>
              
              {suspiciousProcesses.length > 0 ? (
                <div className="border rounded-md overflow-hidden">
                  <table className="w-full">
                    <thead className="bg-muted/50">
                      <tr>
                        <th className="p-2 text-left font-medium text-muted-foreground">{t('name')}</th>
                        <th className="p-2 text-left font-medium text-muted-foreground">PID</th>
                        <th className="p-2 text-left font-medium text-muted-foreground">{t('status')}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {suspiciousProcesses.map((process, index) => (
                        <tr key={index} className="border-t">
                          <td className="p-2">{process.name}</td>
                          <td className="p-2">{process.pid}</td>
                          <td className="p-2">
                            <span className="px-2 py-1 text-xs font-medium rounded-full bg-red-100 text-red-800">
                              {process.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="text-center text-muted-foreground py-4 border rounded-md">
                  {t('no_suspicious_processes')}
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="text-sm text-muted-foreground">
        {t('security_agent_footer')}
      </CardFooter>
    </Card>
  );
};

export default SecurityAgent;
