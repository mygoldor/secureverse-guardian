
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useLanguage } from '@/contexts/LanguageContext';
import FileScanner from './FileScanner';
import DirectoryScanner from './DirectoryScanner';

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
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default FileScan;
