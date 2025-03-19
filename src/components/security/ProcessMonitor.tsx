
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/contexts/LanguageContext';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import { Shield, AlertTriangle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface ProcessMonitorProps {
  monitorProcesses: () => Promise<any[]>;
  killProcess?: (pid: number) => Promise<any>;
}

const ProcessMonitor: React.FC<ProcessMonitorProps> = ({ 
  monitorProcesses, 
  killProcess 
}) => {
  const [processes, setProcesses] = useState<any[]>([]);
  const [isMonitoring, setIsMonitoring] = useState(false);
  const [monitorInterval, setMonitorInterval] = useState<NodeJS.Timeout | null>(null);
  const { toast } = useToast();
  const { t } = useLanguage();

  // Clean up on unmount
  useEffect(() => {
    return () => {
      if (monitorInterval) {
        clearInterval(monitorInterval);
      }
    };
  }, [monitorInterval]);

  const startMonitoring = async () => {
    setIsMonitoring(true);
    try {
      // Initial process check
      const processData = await monitorProcesses();
      setProcesses(processData);
      
      // Set up interval for continuous monitoring
      const interval = setInterval(async () => {
        try {
          const updatedProcesses = await monitorProcesses();
          setProcesses(updatedProcesses);
          
          // Check for suspicious processes
          const suspiciousProcesses = updatedProcesses.filter(p => p.status === 'Suspicious');
          if (suspiciousProcesses.length > 0) {
            toast({
              title: t('suspicious_process_detected'),
              description: `${suspiciousProcesses.length} ${t('suspicious_processes_found')}`,
              variant: 'destructive',
            });
          }
        } catch (error) {
          console.error('Process monitoring error:', error);
        }
      }, 10000); // Check every 10 seconds
      
      setMonitorInterval(interval);
      
      toast({
        title: t('process_monitoring_started'),
        description: t('monitoring_active'),
      });
    } catch (error) {
      console.error('Failed to start monitoring:', error);
      setIsMonitoring(false);
      
      toast({
        title: t('monitoring_failed'),
        description: String(error),
        variant: 'destructive',
      });
    }
  };

  const stopMonitoring = () => {
    if (monitorInterval) {
      clearInterval(monitorInterval);
      setMonitorInterval(null);
    }
    setIsMonitoring(false);
    
    toast({
      title: t('process_monitoring_stopped'),
      description: t('monitoring_inactive'),
    });
  };

  const handleKillProcess = async (pid: number) => {
    if (!killProcess) return;
    
    try {
      await killProcess(pid);
      
      // Update process list
      const updatedProcesses = processes.filter(p => p.pid !== pid);
      setProcesses(updatedProcesses);
      
      toast({
        title: t('process_terminated'),
        description: `${t('process_id')}: ${pid}`,
      });
    } catch (error) {
      console.error('Failed to kill process:', error);
      
      toast({
        title: t('process_termination_failed'),
        description: String(error),
        variant: 'destructive',
      });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('process_monitor')}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex space-x-2">
          {!isMonitoring ? (
            <Button onClick={startMonitoring} className="w-full">
              {t('start_monitoring')}
            </Button>
          ) : (
            <Button onClick={stopMonitoring} variant="destructive" className="w-full">
              {t('stop_monitoring')}
            </Button>
          )}
        </div>
        
        {processes.length > 0 && (
          <div className="border rounded-md overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{t('process_name')}</TableHead>
                  <TableHead>{t('process_id')}</TableHead>
                  <TableHead>{t('cpu_usage')}</TableHead>
                  <TableHead>{t('memory_usage')}</TableHead>
                  <TableHead>{t('status')}</TableHead>
                  <TableHead>{t('actions')}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {processes.map((process, index) => (
                  <TableRow key={index} className={process.status === 'Suspicious' ? 'bg-red-50' : ''}>
                    <TableCell>{process.name}</TableCell>
                    <TableCell>{process.pid}</TableCell>
                    <TableCell>{process.cpu_usage}</TableCell>
                    <TableCell>{process.memory_usage}</TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        {process.status === 'Suspicious' ? (
                          <>
                            <AlertTriangle className="h-4 w-4 text-red-600 mr-1" />
                            <span className="text-red-600">{t('suspicious')}</span>
                          </>
                        ) : (
                          <>
                            <Shield className="h-4 w-4 text-green-600 mr-1" />
                            <span>{t('normal')}</span>
                          </>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      {killProcess && process.status === 'Suspicious' && (
                        <Button 
                          variant="destructive" 
                          size="sm" 
                          onClick={() => handleKillProcess(process.pid)}
                        >
                          {t('terminate')}
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ProcessMonitor;
