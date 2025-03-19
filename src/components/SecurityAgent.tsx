
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Shield, FileSearch, HardDrive, Network, Clock } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

// Import the new component modules
import FileScan from './security/FileScan';
import BackupManager from './security/BackupManager';
import NetworkScanner from './security/NetworkScanner';
import LogViewer from './security/LogViewer';

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
  const { t } = useLanguage();

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
            {window.electron && (
              <FileScan 
                selectFile={window.electron.selectFile}
                scanFile={window.electron.scanFile}
                quarantineFile={window.electron.quarantineFile}
              />
            )}
          </TabsContent>
          
          <TabsContent value="backup">
            {window.electron && (
              <BackupManager
                selectDirectory={window.electron.selectDirectory}
                backupFiles={window.electron.backupFiles}
              />
            )}
          </TabsContent>
          
          <TabsContent value="network">
            {window.electron && (
              <NetworkScanner
                scanNetwork={window.electron.scanNetwork}
              />
            )}
          </TabsContent>
          
          <TabsContent value="logs">
            {window.electron && (
              <LogViewer
                getSecurityLogs={window.electron.getSecurityLogs}
                getSuspiciousProcesses={window.electron.getSuspiciousProcesses}
              />
            )}
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
