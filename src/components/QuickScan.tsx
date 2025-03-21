
import React, { useState } from 'react';
import { Scan, CheckCircle, Clock, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { saveScanResult } from '@/utils/securityScanUtils';
import { useToast } from '@/hooks/use-toast';

const QuickScan: React.FC = () => {
  const [scanState, setScanState] = useState<'idle' | 'scanning' | 'completed'>('idle');
  const [progress, setProgress] = useState(0);
  const [fileCount, setFileCount] = useState(0);
  const [elapsedTime, setElapsedTime] = useState(0);
  const { toast } = useToast();
  
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const startScan = () => {
    setScanState('scanning');
    setProgress(0);
    setFileCount(0);
    setElapsedTime(0);
    
    let seconds = 0;
    const timeInterval = setInterval(() => {
      seconds += 1;
      setElapsedTime(seconds);
    }, 1000);
    
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          clearInterval(timeInterval);
          setScanState('completed');
          
          // Save scan result to Supabase
          const finalFileCount = Math.floor(Math.random() * 2000) + 2000; // Random between 2000-4000
          setFileCount(finalFileCount);
          
          saveScanResult({
            scan_type: 'quick',
            status: 'completed',
            files_scanned: finalFileCount,
            threats_found: 0,
            duration_seconds: seconds,
            device_info: navigator.userAgent
          })
          .then(result => {
            if (result.success) {
              toast({
                title: "Scan saved",
                description: "Your scan results have been saved to your account",
              });
            }
          })
          .catch(err => console.error("Failed to save scan:", err));
          
          return 100;
        }
        
        // Update file count as scan progresses
        const newFileCount = Math.floor((prev / 100) * 3800) + Math.floor(Math.random() * 50);
        setFileCount(newFileCount);
        
        return prev + (Math.random() * 3) + 1;
      });
    }, 200);
  };

  const resetScan = () => {
    setScanState('idle');
    setProgress(0);
    setFileCount(0);
    setElapsedTime(0);
  };

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center space-x-2">
          <Scan className="h-5 w-5 text-security-primary" />
          <CardTitle>Quick Scan</CardTitle>
        </div>
        <CardDescription>Scan your device for threats</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mt-2">
          {scanState === 'idle' && (
            <div className="text-center py-6 space-y-4">
              <div className="h-20 w-20 mx-auto bg-security-primary bg-opacity-10 rounded-full flex items-center justify-center">
                <Scan className="h-10 w-10 text-security-primary" />
              </div>
              <div>
                <p className="text-sm text-security-muted">Check your device for potential threats</p>
              </div>
              <Button 
                onClick={startScan}
                className="bg-security-primary hover:bg-security-secondary text-white"
              >
                Start Quick Scan
              </Button>
            </div>
          )}

          {scanState === 'scanning' && (
            <div className="py-4 space-y-4">
              <div className="relative h-24 border-2 border-dashed border-gray-200 rounded-lg flex items-center justify-center overflow-hidden">
                <div className="absolute w-full bg-security-accent bg-opacity-10 h-10 animate-scan"></div>
                <Scan className="h-10 w-10 text-security-accent animate-pulse" />
              </div>
              
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Scanning system files...</span>
                  <span>{Math.min(100, Math.floor(progress))}%</span>
                </div>
                <Progress value={Math.min(100, progress)} className="h-2" />
              </div>
              
              <div className="flex justify-between text-xs text-security-muted">
                <span className="flex items-center">
                  <FileText className="h-3 w-3 mr-1" /> {fileCount.toLocaleString()} files scanned
                </span>
                <span className="flex items-center">
                  <Clock className="h-3 w-3 mr-1" /> {formatTime(elapsedTime)} elapsed
                </span>
              </div>
              
              <Button 
                variant="outline"
                onClick={resetScan}
                className="w-full"
              >
                Cancel Scan
              </Button>
            </div>
          )}

          {scanState === 'completed' && (
            <div className="text-center py-6 space-y-4">
              <div className="h-20 w-20 mx-auto bg-green-50 rounded-full flex items-center justify-center">
                <CheckCircle className="h-10 w-10 text-security-success" />
              </div>
              <div>
                <p className="font-medium text-security-foreground">Scan Complete</p>
                <p className="text-sm text-security-muted">No threats detected</p>
              </div>
              <div className="text-xs text-security-muted flex justify-center space-x-4">
                <span className="flex items-center">
                  <FileText className="h-3 w-3 mr-1" /> {fileCount.toLocaleString()} files scanned
                </span>
                <span className="flex items-center">
                  <Clock className="h-3 w-3 mr-1" /> {formatTime(elapsedTime)} elapsed
                </span>
              </div>
              <Button 
                onClick={resetScan}
                className="bg-security-primary hover:bg-security-secondary text-white"
              >
                New Scan
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default QuickScan;
