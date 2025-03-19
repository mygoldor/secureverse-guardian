
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Shield, FileSearch, HardDrive, Network, Clock, Activity } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

// Import the component modules
import FileScan from './security/FileScan';
import BackupManager from './security/BackupManager';
import NetworkScanner from './security/NetworkScanner';
import LogViewer from './security/LogViewer';
import ProcessMonitor from './security/ProcessMonitor';

declare global {
  interface Window {
    electron: {
      selectFile: () => Promise<string | null>;
      selectDirectory: () => Promise<string | null>;
      scanFile: (filePath: string) => Promise<any>;
      scanDirectory?: (directoryPath: string) => Promise<any>;
      quarantineFile: (filePath: string) => Promise<any>;
      backupFiles: (directory: string) => Promise<any>;
      listQuarantinedFiles?: () => Promise<string[]>;
      restoreFile?: (fileName: string) => Promise<any>;
      deleteFile?: (fileName: string) => Promise<any>;
      scanQuarantinedFile?: (fileName: string) => Promise<any>;
      scanNetwork: () => Promise<any>;
      getBlockedIPs?: () => Promise<string[]>;
      blockIP?: (ip: string) => Promise<any>;
      unblockIP?: (ip: string) => Promise<any>;
      getSecurityLogs: (lines: number) => Promise<{logs: string[]}>;
      getSuspiciousProcesses: () => Promise<{processes: any[]}>;
      killProcess?: (pid: number) => Promise<any>;
      onThreatDetected?: (callback: (data: any) => void) => void;
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
            <TabsTrigger value="processes" className="flex-1">
              <Activity className="h-4 w-4 mr-2" />
              {t('processes')}
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
                selectDirectory={window.electron.selectDirectory}
                scanFile={window.electron.scanFile}
                scanDirectory={window.electron.scanDirectory}
                quarantineFile={window.electron.quarantineFile}
              />
            )}
          </TabsContent>
          
          <TabsContent value="backup">
            {window.electron && (
              <BackupManager
                selectDirectory={window.electron.selectDirectory}
                backupFiles={window.electron.backupFiles}
                listQuarantinedFiles={window.electron.listQuarantinedFiles}
                restoreFile={window.electron.restoreFile}
                deleteFile={window.electron.deleteFile}
                scanQuarantinedFile={window.electron.scanQuarantinedFile}
              />
            )}
          </TabsContent>
          
          <TabsContent value="network">
            {window.electron && (
              <NetworkScanner
                scanNetwork={window.electron.scanNetwork}
                getBlockedIPs={window.electron.getBlockedIPs}
                blockIP={window.electron.blockIP}
                unblockIP={window.electron.unblockIP}
              />
            )}
          </TabsContent>
          
          <TabsContent value="processes">
            {window.electron && (
              <ProcessMonitor 
                monitorProcesses={window.electron.getSuspiciousProcesses}
                killProcess={window.electron.killProcess}
                getBlockedIPs={window.electron.getBlockedIPs}
                blockIP={window.electron.blockIP}
                unblockIP={window.electron.unblockIP}
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
