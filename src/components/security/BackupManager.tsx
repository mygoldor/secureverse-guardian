
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface BackupManagerProps {
  selectDirectory: () => Promise<string | null>;
  backupFiles: (directory: string) => Promise<any>;
  listQuarantinedFiles?: () => Promise<string[]>;
  restoreFile?: (fileName: string) => Promise<any>;
  deleteFile?: (fileName: string) => Promise<any>;
}

const BackupManager: React.FC<BackupManagerProps> = ({ 
  selectDirectory, 
  backupFiles,
  listQuarantinedFiles,
  restoreFile,
  deleteFile
}) => {
  const [selectedDirectory, setSelectedDirectory] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [quarantinedFiles, setQuarantinedFiles] = useState<string[]>([]);
  const [selectedTab, setSelectedTab] = useState('backup');
  const [isLoadingQuarantine, setIsLoadingQuarantine] = useState(false);
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

  // Load quarantined files when switching to the quarantine tab
  const handleTabChange = (value: string) => {
    setSelectedTab(value);
    if (value === 'quarantine' && listQuarantinedFiles) {
      loadQuarantinedFiles();
    }
  };

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
            {isLoadingQuarantine ? (
              <div className="text-center py-4">{t('loading_quarantined_files')}</div>
            ) : quarantinedFiles.length === 0 ? (
              <div className="text-center py-4">{t('no_quarantined_files')}</div>
            ) : (
              <div className="border rounded-md overflow-hidden">
                <table className="min-w-full">
                  <thead>
                    <tr className="bg-muted">
                      <th className="text-left py-2 px-4">{t('file_name')}</th>
                      <th className="text-right py-2 px-4">{t('actions')}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {quarantinedFiles.map((file, index) => (
                      <tr key={index} className="border-t">
                        <td className="py-2 px-4">{file}</td>
                        <td className="py-2 px-4 text-right">
                          <div className="flex justify-end space-x-2">
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
                                {t('delete')}
                              </Button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
            
            <Button
              onClick={loadQuarantinedFiles}
              disabled={isLoadingQuarantine || !listQuarantinedFiles}
            >
              {t('refresh_quarantine')}
            </Button>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default BackupManager;
