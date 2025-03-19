
import React from 'react';
import { ArrowLeft, FileText, FolderOpen, Calendar, Clock, Check, AlertTriangle, FileX, FolderX } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';
import { ScanHistoryItemType } from './ScanHistoryItem';
import { formatDistanceToNow, format } from 'date-fns';

interface ScanHistoryDetailProps {
  item: ScanHistoryItemType;
  onBack: () => void;
  onRescan?: (item: ScanHistoryItemType) => void;
}

const ScanHistoryDetail: React.FC<ScanHistoryDetailProps> = ({ 
  item, 
  onBack, 
  onRescan 
}) => {
  const { t } = useLanguage();
  const scanDate = new Date(item.timestamp);
  
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Button variant="ghost" size="sm" onClick={onBack} className="gap-1">
          <ArrowLeft className="h-4 w-4" />
          {t('back_to_history')}
        </Button>
        
        {onRescan && (
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => onRescan(item)}
          >
            {t('rescan')}
          </Button>
        )}
      </div>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center gap-2">
            {item.type === 'file' ? (
              <FileText className="h-5 w-5 text-blue-500" />
            ) : (
              <FolderOpen className="h-5 w-5 text-yellow-500" />
            )}
            {t('scan_details')}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <p className="text-sm text-gray-500">{t('item_type')}:</p>
                <p className="flex items-center">
                  {item.type === 'file' ? (
                    <>
                      <FileText className="h-4 w-4 mr-2 text-blue-500" />
                      {t('file')}
                    </>
                  ) : (
                    <>
                      <FolderOpen className="h-4 w-4 mr-2 text-yellow-500" />
                      {t('directory')}
                    </>
                  )}
                </p>
              </div>
              
              <div className="space-y-1">
                <p className="text-sm text-gray-500">{t('scan_status')}:</p>
                <p className="flex items-center">
                  {item.status === 'clean' ? (
                    <>
                      <Check className="h-4 w-4 mr-2 text-green-500" />
                      {t('clean')}
                    </>
                  ) : (
                    <>
                      <AlertTriangle className="h-4 w-4 mr-2 text-red-500" />
                      {t('threats_detected')}
                    </>
                  )}
                </p>
              </div>
              
              <div className="space-y-1">
                <p className="text-sm text-gray-500">{t('scan_date')}:</p>
                <p className="flex items-center">
                  <Calendar className="h-4 w-4 mr-2 text-gray-500" />
                  {format(scanDate, 'PPP')}
                </p>
              </div>
              
              <div className="space-y-1">
                <p className="text-sm text-gray-500">{t('scan_time')}:</p>
                <p className="flex items-center">
                  <Clock className="h-4 w-4 mr-2 text-gray-500" />
                  {format(scanDate, 'p')} ({formatDistanceToNow(scanDate, { addSuffix: true })})
                </p>
              </div>
            </div>
            
            <div className="space-y-1">
              <p className="text-sm text-gray-500">{t('path')}:</p>
              <p className="text-sm break-all font-mono p-2 bg-gray-100 rounded">{item.path}</p>
            </div>
            
            {item.status === 'threat' && item.threatsFound && item.threatsFound > 0 && (
              <div className="space-y-2">
                <p className="text-sm text-gray-500 font-medium">{t('threat_details')}:</p>
                <div className="p-3 bg-red-50 border border-red-200 rounded-md">
                  <div className="flex items-center mb-2">
                    {item.type === 'file' ? (
                      <FileX className="h-5 w-5 text-red-500 mr-2" />
                    ) : (
                      <FolderX className="h-5 w-5 text-red-500 mr-2" />
                    )}
                    <span className="text-red-700 font-medium">
                      {item.threatsFound} {item.threatsFound === 1 ? t('threat') : t('threats')} {t('detected')}
                    </span>
                  </div>
                  <ul className="ml-7 list-disc text-sm text-red-700">
                    <li>{t('suspicious_behavior')}</li>
                    <li>{t('malware_signature_match')}</li>
                  </ul>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ScanHistoryDetail;
