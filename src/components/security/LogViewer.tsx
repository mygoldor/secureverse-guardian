
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useLanguage } from '@/contexts/LanguageContext';

interface LogViewerProps {
  getSecurityLogs: (lines: number) => Promise<{logs: string[]}>;
  getSuspiciousProcesses: () => Promise<{processes: any[]}>;
}

const LogViewer: React.FC<LogViewerProps> = ({ getSecurityLogs, getSuspiciousProcesses }) => {
  const [securityLogs, setSecurityLogs] = useState<string[]>([]);
  const [suspiciousProcesses, setSuspiciousProcesses] = useState<any[]>([]);
  const { t } = useLanguage();

  const loadSecurityLogs = async () => {
    try {
      const response = await getSecurityLogs(20);
      setSecurityLogs(response.logs || []);
    } catch (error) {
      console.error('Failed to load security logs:', error);
    }
  };

  const loadSuspiciousProcesses = async () => {
    try {
      const response = await getSuspiciousProcesses();
      setSuspiciousProcesses(response.processes || []);
    } catch (error) {
      console.error('Failed to load suspicious processes:', error);
    }
  };

  useEffect(() => {
    loadSecurityLogs();
    loadSuspiciousProcesses();
  }, []);

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="font-medium">{t('security_logs')}</h3>
        <Button variant="outline" size="sm" onClick={loadSecurityLogs}>
          {t('refresh')}
        </Button>
      </div>
      
      <div className="bg-muted/30 rounded-md p-2 h-[200px] overflow-y-auto font-mono text-xs">
        {securityLogs.length > 0 ? (
          securityLogs.map((log, index) => (
            <div key={index} className="py-1">{log}</div>
          ))
        ) : (
          <div className="text-center text-muted-foreground py-4">
            {t('no_logs_available')}
          </div>
        )}
      </div>
      
      <Separator />
      
      <div className="flex justify-between items-center">
        <h3 className="font-medium">{t('suspicious_processes')}</h3>
        <Button variant="outline" size="sm" onClick={loadSuspiciousProcesses}>
          {t('refresh')}
        </Button>
      </div>
      
      {suspiciousProcesses.length > 0 ? (
        <div className="border rounded-md overflow-hidden">
          <table className="w-full">
            <thead className="bg-muted/50">
              <tr>
                <th className="p-2 text-left font-medium text-muted-foreground">{t('name')}</th>
                <th className="p-2 text-left font-medium text-muted-foreground">PID</th>
                <th className="p-2 text-left font-medium text-muted-foreground">{t('status')}</th>
              </tr>
            </thead>
            <tbody>
              {suspiciousProcesses.map((process, index) => (
                <tr key={index} className="border-t">
                  <td className="p-2">{process.name}</td>
                  <td className="p-2">{process.pid}</td>
                  <td className="p-2">
                    <span className="px-2 py-1 text-xs font-medium rounded-full bg-red-100 text-red-800">
                      {process.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="text-center text-muted-foreground py-4 border rounded-md">
          {t('no_suspicious_processes')}
        </div>
      )}
    </div>
  );
};

export default LogViewer;
