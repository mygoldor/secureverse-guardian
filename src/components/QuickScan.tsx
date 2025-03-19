
import React, { useState } from 'react';
import { Scan, CheckCircle, Clock, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const QuickScan: React.FC = () => {
  const [scanState, setScanState] = useState<'idle' | 'scanning' | 'completed'>('idle');
  const [progress, setProgress] = useState(0);

  const startScan = () => {
    setScanState('scanning');
    setProgress(0);
    
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setScanState('completed');
          return 100;
        }
        return prev + 5;
      });
    }, 200);
  };

  const resetScan = () => {
    setScanState('idle');
    setProgress(0);
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
                  <span>{progress}%</span>
                </div>
                <Progress value={progress} className="h-2" />
              </div>
              
              <div className="flex justify-between text-xs text-security-muted">
                <span className="flex items-center">
                  <FileText className="h-3 w-3 mr-1" /> 1,248 files scanned
                </span>
                <span className="flex items-center">
                  <Clock className="h-3 w-3 mr-1" /> 00:42 elapsed
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
                  <FileText className="h-3 w-3 mr-1" /> 3,862 files scanned
                </span>
                <span className="flex items-center">
                  <Clock className="h-3 w-3 mr-1" /> 01:24 elapsed
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
