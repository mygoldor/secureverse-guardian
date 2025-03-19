
import React, { useState } from 'react';
import { Search, Calendar, ArrowUp, ArrowDown } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import ScanHistoryItem, { ScanHistoryItemType } from './ScanHistoryItem';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';

interface ScanHistoryListProps {
  scanHistory: ScanHistoryItemType[];
  onSelectItem: (item: ScanHistoryItemType) => void;
}

const ScanHistoryList: React.FC<ScanHistoryListProps> = ({ scanHistory, onSelectItem }) => {
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  
  // Filter and sort scan history items
  const filteredItems = scanHistory
    .filter(item => 
      item.path.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      const dateA = new Date(a.timestamp).getTime();
      const dateB = new Date(b.timestamp).getTime();
      return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
    });
  
  // Paginate items
  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
  const paginatedItems = filteredItems.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  
  const toggleSortOrder = () => {
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };
  
  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <div className="relative flex-grow">
          <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder={t('search_scans')}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-8"
          />
        </div>
        <Button
          variant="outline"
          size="icon"
          onClick={toggleSortOrder}
          title={sortOrder === 'asc' ? t('sort_newest') : t('sort_oldest')}
        >
          {sortOrder === 'asc' ? (
            <ArrowUp className="h-4 w-4" />
          ) : (
            <ArrowDown className="h-4 w-4" />
          )}
        </Button>
        <Button variant="outline" size="icon" title={t('calendar_view')}>
          <Calendar className="h-4 w-4" />
        </Button>
      </div>
      
      <div className="border rounded-md">
        {paginatedItems.length > 0 ? (
          paginatedItems.map(item => (
            <ScanHistoryItem
              key={item.id}
              item={item}
              onSelect={onSelectItem}
            />
          ))
        ) : (
          <div className="p-8 text-center text-gray-500">
            {searchQuery ? t('no_matching_scans') : t('no_scan_history')}
          </div>
        )}
      </div>
      
      {totalPages > 1 && (
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious 
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                aria-disabled={currentPage === 1}
                className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
              />
            </PaginationItem>
            
            {Array.from({ length: totalPages }).map((_, i) => (
              <PaginationItem key={i}>
                <PaginationLink
                  isActive={currentPage === i + 1}
                  onClick={() => setCurrentPage(i + 1)}
                >
                  {i + 1}
                </PaginationLink>
              </PaginationItem>
            ))}
            
            <PaginationItem>
              <PaginationNext
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                aria-disabled={currentPage === totalPages}
                className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  );
};

export default ScanHistoryList;
