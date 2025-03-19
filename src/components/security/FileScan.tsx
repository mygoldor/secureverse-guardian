
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useLanguage } from '@/contexts/LanguageContext';
import FileScanner from './FileScanner';
import DirectoryScanner from './DirectoryScanner';
import ScanHistory from './ScanHistory';

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
  const [scanTab, setScanTab] = useState('file');
  const { t } = useLanguage();
  
  const handleRescan = (path: string, type: 'file' | 'directory') => {
    // Set the appropriate tab based on the item type
    setScanTab(type === 'file' ? 'file' : 'directory');
    
    // In a real implementation, we would need to:
    // 1. Set the selected file/directory in the appropriate scanner
    // 2. Trigger a scan automatically
    
    console.log(`Rescanning ${type}: ${path}`);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('file_scanner')}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Tabs value={scanTab} onValueChange={setScanTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="file">{t('file_scan')}</TabsTrigger>
            <TabsTrigger value="directory" disabled={!scanDirectory}>{t('directory_scan')}</TabsTrigger>
            <TabsTrigger value="history">{t('scan_history')}</TabsTrigger>
          </TabsList>
          
          <TabsContent value="file" className="space-y-4 pt-4">
            <FileScanner
              selectFile={selectFile}
              scanFile={scanFile}
              quarantineFile={quarantineFile}
            />
          </TabsContent>
          
          <TabsContent value="directory" className="space-y-4 pt-4">
            {selectDirectory && scanDirectory && (
              <DirectoryScanner
                selectDirectory={selectDirectory}
                scanDirectory={scanDirectory}
              />
            )}
          </TabsContent>
          
          <TabsContent value="history" className="space-y-4 pt-4">
            <ScanHistory onRescan={handleRescan} />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default FileScan;
