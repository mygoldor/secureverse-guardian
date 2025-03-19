
import React from 'react';
import { formatDistanceToNow } from 'date-fns';
import { File, Folder, Check, AlertTriangle, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';

export interface ScanHistoryItemType {
  id: string;
  type: 'file' | 'directory';
  path: string;
  timestamp: string;
  status: 'clean' | 'threat';
  threatsFound?: number;
}

interface ScanHistoryItemProps {
  item: ScanHistoryItemType;
  onSelect: (item: ScanHistoryItemType) => void;
}

const ScanHistoryItem: React.FC<ScanHistoryItemProps> = ({ item, onSelect }) => {
  const { t } = useLanguage();
  
  const timeAgo = formatDistanceToNow(new Date(item.timestamp), { addSuffix: true });
  
  return (
    <div className="p-4 border-b border-gray-100 hover:bg-gray-50 transition-colors">
      <div className="flex items-start justify-between">
        <div className="flex items-start space-x-3">
          <div className="mt-1">
            {item.type === 'file' ? (
              <File className="h-5 w-5 text-blue-500" />
            ) : (
              <Folder className="h-5 w-5 text-yellow-500" />
            )}
          </div>
          
          <div>
            <h4 className="font-medium text-sm text-gray-900">{item.path}</h4>
            <div className="flex items-center mt-1 space-x-2">
              <Clock className="h-3 w-3 text-gray-500" />
              <span className="text-xs text-gray-500">{timeAgo}</span>
              
              {item.status === 'clean' ? (
                <div className="flex items-center text-green-600">
                  <Check className="h-3 w-3 mr-1" />
                  <span className="text-xs">{t('clean')}</span>
                </div>
              ) : (
                <div className="flex items-center text-red-600">
                  <AlertTriangle className="h-3 w-3 mr-1" />
                  <span className="text-xs">
                    {item.threatsFound} {item.threatsFound === 1 ? t('threat') : t('threats')}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
        
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => onSelect(item)}
        >
          {t('details')}
        </Button>
      </div>
    </div>
  );
};

export default ScanHistoryItem;
