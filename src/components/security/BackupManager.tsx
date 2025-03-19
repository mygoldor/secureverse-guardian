
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Shield, AlertCircle, Trash2, RotateCcw } from 'lucide-react';

interface BackupManagerProps {
  selectDirectory: () => Promise<string | null>;
  backupFiles: (directory: string) => Promise<any>;
  listQuarantinedFiles?: () => Promise<string[]>;
  restoreFile?: (fileName: string) => Promise<any>;
  deleteFile?: (fileName: string) => Promise<any>;
  scanQuarantinedFile?: (fileName: string) => Promise<any>;
}

const BackupManager: React.FC<BackupManagerProps> = ({ 
  selectDirectory, 
  backupFiles,
  listQuarantinedFiles,
  restoreFile,
  deleteFile,
  scanQuarantinedFile
}) => {
  const [selectedDirectory, setSelectedDirectory] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [quarantinedFiles, setQuarantinedFiles] = useState<string[]>([]);
  const [selectedTab, setSelectedTab] = useState('backup');
  const [isLoadingQuarantine, setIsLoadingQuarantine] = useState(false);
  const [scanResults, setScanResults] = useState<{[key: string]: any}>({});
  const { toast } = useToast();
  const { t } = useLanguage();

  const handleSelectDirectory = async () => {
    const directoryPath = await selectDirectory();
    if (directoryPath) {
      setSelectedDirectory(directoryPath);
    }
  };

  const handleBackupFiles = async () => {
    if (!selectedDirectory) return;
    
    try {
      setIsProcessing(true);
      const result = await backupFiles(selectedDirectory);
      
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
      setIsProcessing(false);
    }
  };

  const loadQuarantinedFiles = async () => {
    if (!listQuarantinedFiles) return;
    
    try {
      setIsLoadingQuarantine(true);
      const files = await listQuarantinedFiles();
      setQuarantinedFiles(files);
      
      // Reset scan results when loading new files
      setScanResults({});
    } catch (error) {
      console.error('Failed to load quarantined files:', error);
      toast({
        title: t('quarantine_load_failed'),
        description: String(error),
        variant: 'destructive',
      });
    } finally {
      setIsLoadingQuarantine(false);
    }
  };

  const handleRestoreFile = async (fileName: string) => {
    if (!restoreFile) return;
    
    try {
      await restoreFile(fileName);
      
      // Update the list of quarantined files
      setQuarantinedFiles(prevFiles => prevFiles.filter(file => file !== fileName));
      
      toast({
        title: t('file_restored'),
        description: fileName,
      });
    } catch (error) {
      console.error('Failed to restore file:', error);
      toast({
        title: t('file_restore_failed'),
        description: String(error),
        variant: 'destructive',
      });
    }
  };

  const handleDeleteFile = async (fileName: string) => {
    if (!deleteFile) return;
    
    try {
      await deleteFile(fileName);
      
      // Update the list of quarantined files
      setQuarantinedFiles(prevFiles => prevFiles.filter(file => file !== fileName));
      
      toast({
        title: t('file_deleted'),
        description: fileName,
      });
    } catch (error) {
      console.error('Failed to delete file:', error);
      toast({
        title: t('file_delete_failed'),
        description: String(error),
        variant: 'destructive',
      });
    }
  };

  const handleScanQuarantinedFile = async (fileName: string) => {
    if (!scanQuarantinedFile) return;
    
    try {
      const result = await scanQuarantinedFile(fileName);
      
      // Store the scan result for this file
      setScanResults(prev => ({
        ...prev,
        [fileName]: result
      }));
      
      toast({
        title: t('file_scan_complete'),
        description: result.status === 'OK' ? t('file_safe') : t('file_unsafe'),
        variant: result.status === 'OK' ? 'default' : 'destructive',
      });
    } catch (error) {
      console.error('Failed to scan file:', error);
      toast({
        title: t('file_scan_failed'),
        description: String(error),
        variant: 'destructive',
      });
    }
  };

  // Load quarantined files when switching to the quarantine tab
  const handleTabChange = (value: string) => {
    setSelectedTab(value);
    if (value === 'quarantine' && listQuarantinedFiles) {
      loadQuarantinedFiles();
    }
  };

  useEffect(() => {
    // Load quarantined files on initial mount if needed
    if (selectedTab === 'quarantine' && listQuarantinedFiles) {
      loadQuarantinedFiles();
    }
  }, []); // Empty dependency array means this runs once on mount

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('security_management')}</CardTitle>
        <CardDescription>{t('backup_and_quarantine')}</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={selectedTab} onValueChange={handleTabChange}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="backup">{t('backup')}</TabsTrigger>
            <TabsTrigger value="quarantine" disabled={!listQuarantinedFiles}>{t('quarantine')}</TabsTrigger>
          </TabsList>
          
          <TabsContent value="backup" className="space-y-4 pt-4">
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
              disabled={!selectedDirectory || isProcessing}
              className="w-full"
            >
              {isProcessing ? t('backing_up') : t('backup_files')}
            </Button>
          </TabsContent>
          
          <TabsContent value="quarantine" className="space-y-4 pt-4">
            <div className="flex justify-between items-center">
              <h3 className="text-md font-medium">{t('quarantined_files')}</h3>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={loadQuarantinedFiles} 
                disabled={isLoadingQuarantine || !listQuarantinedFiles}
              >
                <RotateCcw className="h-4 w-4 mr-2" />
                {t('refresh')}
              </Button>
            </div>
            
            {isLoadingQuarantine ? (
              <div className="text-center py-4">{t('loading_quarantined_files')}</div>
            ) : quarantinedFiles.length === 0 ? (
              <div className="text-center py-8">
                <Shield className="h-12 w-12 mx-auto text-green-500 mb-2" />
                <div className="text-lg font-medium">{t('no_quarantined_files')}</div>
                <div className="text-sm text-muted-foreground">{t('no_threats_in_quarantine')}</div>
              </div>
            ) : (
              <div className="space-y-3">
                {quarantinedFiles.map((file, index) => (
                  <div key={index} className="border rounded-md p-4">
                    <div className="flex items-start space-x-3">
                      <AlertCircle className="h-5 w-5 text-red-500 mt-0.5" />
                      <div className="flex-grow space-y-2">
                        <div>
                          <h4 className="font-medium truncate">{file}</h4>
                          {scanResults[file] && (
                            <div className={`text-sm mt-1 ${
                              scanResults[file].status === 'OK' ? 'text-green-600' : 'text-red-600'
                            }`}>
                              {scanResults[file].status === 'OK' ? t('safe') : t('unsafe')}
                            </div>
                          )}
                        </div>
                        
                        <div className="flex flex-wrap gap-2">
                          {restoreFile && (
                            <Button 
                              size="sm" 
                              variant="outline" 
                              onClick={() => handleRestoreFile(file)}
                            >
                              {t('restore')}
                            </Button>
                          )}
                          {deleteFile && (
                            <Button 
                              size="sm" 
                              variant="destructive" 
                              onClick={() => handleDeleteFile(file)}
                            >
                              <Trash2 className="h-4 w-4 mr-1" />
                              {t('delete')}
                            </Button>
                          )}
                          {scanQuarantinedFile && (
                            <Button 
                              size="sm" 
                              variant="secondary" 
                              onClick={() => handleScanQuarantinedFile(file)}
                            >
                              {t('scan_file')}
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default BackupManager;
