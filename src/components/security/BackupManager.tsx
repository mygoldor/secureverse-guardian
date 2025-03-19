
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/contexts/LanguageContext';

interface BackupManagerProps {
  selectDirectory: () => Promise<string | null>;
  backupFiles: (directory: string) => Promise<any>;
}

const BackupManager: React.FC<BackupManagerProps> = ({ selectDirectory, backupFiles }) => {
  const [selectedDirectory, setSelectedDirectory] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
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
    </div>
  );
};

export default BackupManager;
