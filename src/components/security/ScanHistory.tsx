
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';
import ScanHistoryList from './ScanHistoryList';
import ScanHistoryDetail from './ScanHistoryDetail';
import { ScanHistoryItemType } from './ScanHistoryItem';

// Mock data for demonstration - in a real app, this would come from backend/storage
const mockScanHistory: ScanHistoryItemType[] = [
  {
    id: '1',
    type: 'file',
    path: 'C:/Users/Documents/report.pdf',
    timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(), // 30 minutes ago
    status: 'clean'
  },
  {
    id: '2',
    type: 'directory',
    path: 'C:/Users/Downloads',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString(), // 3 hours ago
    status: 'threat',
    threatsFound: 2
  },
  {
    id: '3',
    type: 'file',
    path: 'C:/Program Files/setup.exe',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), // 1 day ago
    status: 'threat',
    threatsFound: 1
  },
  {
    id: '4',
    type: 'directory',
    path: 'C:/Users/Pictures',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(), // 2 days ago
    status: 'clean'
  },
  {
    id: '5',
    type: 'file',
    path: 'C:/Users/Documents/contract.docx',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3).toISOString(), // 3 days ago
    status: 'clean'
  },
  {
    id: '6',
    type: 'directory',
    path: 'C:/Users/Music',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 4).toISOString(), // 4 days ago
    status: 'clean'
  }
];

interface ScanHistoryProps {
  onRescan?: (path: string, type: 'file' | 'directory') => void;
}

const ScanHistory: React.FC<ScanHistoryProps> = ({ onRescan }) => {
  const { t } = useLanguage();
  const [scanHistory, setScanHistory] = useState<ScanHistoryItemType[]>([]);
  const [selectedItem, setSelectedItem] = useState<ScanHistoryItemType | null>(null);
  
  // Load scan history data on component mount
  useEffect(() => {
    // In a real app, this would fetch from backend or local storage
    setScanHistory(mockScanHistory);
  }, []);
  
  const handleSelectItem = (item: ScanHistoryItemType) => {
    setSelectedItem(item);
  };
  
  const handleBackToList = () => {
    setSelectedItem(null);
  };
  
  const handleRescan = (item: ScanHistoryItemType) => {
    if (onRescan) {
      onRescan(item.path, item.type);
    }
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('scan_history')}</CardTitle>
      </CardHeader>
      <CardContent>
        {selectedItem ? (
          <ScanHistoryDetail 
            item={selectedItem} 
            onBack={handleBackToList}
            onRescan={onRescan ? handleRescan : undefined}
          />
        ) : (
          <ScanHistoryList 
            scanHistory={scanHistory} 
            onSelectItem={handleSelectItem} 
          />
        )}
      </CardContent>
    </Card>
  );
};

export default ScanHistory;
