
import React from 'react';
import { Progress } from '@/components/ui/progress';
import { useLanguage } from '@/contexts/LanguageContext';

interface ScanProgressIndicatorProps {
  progress: number;
  statusMessage?: string;
}

const ScanProgressIndicator: React.FC<ScanProgressIndicatorProps> = ({ 
  progress, 
  statusMessage 
}) => {
  const { t } = useLanguage();
  
  return (
    <div className="space-y-2">
      <div className="flex justify-between text-sm">
        <span>{statusMessage || t('scanning')}</span>
        <span>{progress}%</span>
      </div>
      <Progress value={progress} />
    </div>
  );
};

export default ScanProgressIndicator;
