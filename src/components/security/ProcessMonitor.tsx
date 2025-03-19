
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
import { Shield, AlertTriangle, Ban, RefreshCw } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface ProcessMonitorProps {
  monitorProcesses: () => Promise<any[]>;
  killProcess?: (pid: number) => Promise<any>;
  getBlockedIPs?: () => Promise<string[]>;
  blockIP?: (ip: string) => Promise<any>;
  unblockIP?: (ip: string) => Promise<any>;
}

const ProcessMonitor: React.FC<ProcessMonitorProps> = ({ 
  monitorProcesses, 
  killProcess,
  getBlockedIPs,
  blockIP,
  unblockIP
}) => {
  const [processes, setProcesses] = useState<any[]>([]);
  const [blockedIPs, setBlockedIPs] = useState<string[]>([]);
  const [newIP, setNewIP] = useState('');
  const [isMonitoring, setIsMonitoring] = useState(false);
  const [monitorInterval, setMonitorInterval] = useState<NodeJS.Timeout | null>(null);
  const [activeTab, setActiveTab] = useState('processes');
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

  // Load blocked IPs on tab change
  useEffect(() => {
    if (activeTab === 'firewall' && getBlockedIPs) {
      loadBlockedIPs();
    }
  }, [activeTab]);

  const loadBlockedIPs = async () => {
    if (!getBlockedIPs) return;
    
    try {
      const ips = await getBlockedIPs();
      setBlockedIPs(ips);
    } catch (error) {
      console.error('Failed to load blocked IPs:', error);
    }
  };

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

  const handleBlockIP = async () => {
    if (!blockIP || !newIP.trim()) return;
    
    try {
      await blockIP(newIP.trim());
      setBlockedIPs(prev => [...prev, newIP.trim()]);
      setNewIP('');
      
      toast({
        title: t('ip_blocked'),
        description: newIP.trim(),
      });
    } catch (error) {
      console.error('Failed to block IP:', error);
      
      toast({
        title: t('ip_block_failed'),
        description: String(error),
        variant: 'destructive',
      });
    }
  };

  const handleUnblockIP = async (ip: string) => {
    if (!unblockIP) return;
    
    try {
      await unblockIP(ip);
      setBlockedIPs(prev => prev.filter(blockedIP => blockedIP !== ip));
      
      toast({
        title: t('ip_unblocked'),
        description: ip,
      });
    } catch (error) {
      console.error('Failed to unblock IP:', error);
      
      toast({
        title: t('ip_unblock_failed'),
        description: String(error),
        variant: 'destructive',
      });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('security_monitor')}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="w-full">
            <TabsTrigger value="processes" className="flex-1">
              {t('process_monitor')}
            </TabsTrigger>
            <TabsTrigger 
              value="firewall" 
              className="flex-1"
              disabled={!getBlockedIPs || !blockIP || !unblockIP}
            >
              {t('firewall')}
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="processes" className="space-y-4">
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
          </TabsContent>
          
          <TabsContent value="firewall" className="space-y-4">
            <div className="flex space-x-2">
              <input
                type="text"
                value={newIP}
                onChange={(e) => setNewIP(e.target.value)}
                placeholder={t('enter_ip_address')}
                className="flex-grow px-3 py-2 border rounded-md"
              />
              <Button onClick={handleBlockIP} disabled={!newIP.trim()}>
                {t('block_ip')}
              </Button>
              <Button variant="outline" onClick={loadBlockedIPs}>
                <RefreshCw className="h-4 w-4" />
              </Button>
            </div>
            
            {blockedIPs.length > 0 ? (
              <div className="border rounded-md overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>{t('ip_address')}</TableHead>
                      <TableHead>{t('actions')}</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {blockedIPs.map((ip, index) => (
                      <TableRow key={index}>
                        <TableCell className="flex items-center">
                          <Ban className="h-4 w-4 text-red-600 mr-2" />
                          {ip}
                        </TableCell>
                        <TableCell>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            onClick={() => handleUnblockIP(ip)}
                          >
                            {t('unblock')}
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            ) : (
              <div className="text-center py-4 border rounded-md">
                {t('no_blocked_ips')}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default ProcessMonitor;
