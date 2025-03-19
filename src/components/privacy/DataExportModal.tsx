
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { Download, Loader2 } from 'lucide-react';

interface DataExportModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const DataExportModal: React.FC<DataExportModalProps> = ({ open, onOpenChange }) => {
  const [isExporting, setIsExporting] = useState(false);
  
  const handleExportData = async () => {
    setIsExporting(true);
    
    try {
      // Simulate API call to generate export - in a real app, this would call your backend
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Create dummy data for demonstration
      const userData = {
        personalInfo: {
          name: "John Doe",
          email: "john.doe@example.com",
          accountCreated: "2023-01-15",
        },
        preferences: {
          darkMode: false,
          notifications: true,
          marketingConsent: false,
        },
        activities: [
          { type: "login", date: "2023-05-10T14:32:10Z", ipAddress: "192.168.1.1" },
          { type: "scan", date: "2023-05-12T09:45:22Z", result: "No threats detected" },
        ]
      };
      
      // Convert data to JSON and prepare for download
      const dataStr = JSON.stringify(userData, null, 2);
      const dataUri = `data:application/json;charset=utf-8,${encodeURIComponent(dataStr)}`;
      
      // Create and trigger download
      const exportFileDefaultName = `guardia-data-export-${new Date().toISOString().slice(0, 10)}.json`;
      const linkElement = document.createElement('a');
      linkElement.setAttribute('href', dataUri);
      linkElement.setAttribute('download', exportFileDefaultName);
      linkElement.click();
      
      toast.success('Data export successful', {
        description: 'Your personal data has been exported successfully.'
      });
      
      onOpenChange(false);
    } catch (error) {
      toast.error('Export failed', {
        description: 'There was an error exporting your data. Please try again.'
      });
    } finally {
      setIsExporting(false);
    }
  };
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Export Personal Data</DialogTitle>
          <DialogDescription>
            In accordance with GDPR, you can download all the personal data we hold about you.
          </DialogDescription>
        </DialogHeader>
        
        <div className="py-4">
          <h4 className="text-sm font-medium mb-2">The export will include:</h4>
          <ul className="list-disc pl-5 space-y-1 text-sm">
            <li>Your account information</li>
            <li>Your preferences and settings</li>
            <li>Activity history and logs</li>
            <li>Any other personal data associated with your account</li>
          </ul>
          
          <p className="mt-4 text-sm text-muted-foreground">
            The export will be in JSON format, which can be viewed in any text editor.
            The process may take a few moments to complete.
          </p>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleExportData} disabled={isExporting}>
            {isExporting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Exporting...
              </>
            ) : (
              <>
                <Download className="mr-2 h-4 w-4" />
                Export Data
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DataExportModal;
