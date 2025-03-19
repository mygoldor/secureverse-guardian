import React from 'react';
import { AlertTriangle, Info, CheckCircle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';

interface Alert {
  id: number;
  type: string;
  priority: 'high' | 'medium' | 'low';
  description: string;
  date: string;
  action: string;
}

const SecurityAlerts = () => {
  const { t } = useLanguage();

  const alerts: Alert[] = [
    {
      id: 1,
      type: t('phishing_attempt_detected'),
      priority: 'high',
      description: t('suspicious_login_detected'),
      date: t('today_time').replace('{time}', '10:23'),
      action: t('change_password')
    },
    {
      id: 2,
      type: t('potential_malware'),
      priority: 'medium',
      description: t('suspicious_program_detected'),
      date: t('yesterday_time').replace('{time}', '15:45'),
      action: t('scan_and_quarantine')
    },
    {
      id: 3,
      type: t('security_update_available'),
      priority: 'low',
      description: t('important_security_update'),
      date: t('days_ago').replace('{days}', '2'),
      action: t('update_now')
    }
  ];

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'high':
        return <span className="px-2 py-1 text-xs font-medium rounded-full bg-red-100 text-red-800">{t('high_priority')}</span>;
      case 'medium':
        return <span className="px-2 py-1 text-xs font-medium rounded-full bg-orange-100 text-orange-800">{t('medium_priority')}</span>;
      case 'low':
        return <span className="px-2 py-1 text-xs font-medium rounded-full bg-yellow-100 text-yellow-800">{t('low_priority')}</span>;
      default:
        return null;
    }
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'high':
        return <AlertTriangle className="h-5 w-5 text-red-500" />;
      case 'medium':
        return <AlertTriangle className="h-5 w-5 text-orange-500" />;
      case 'low':
        return <Info className="h-5 w-5 text-yellow-500" />;
      default:
        return null;
    }
  };

  return (
    <Card className="alerts">
      <CardContent className="pt-6">
        {alerts.length > 0 ? (
          <div className="space-y-4">
            {alerts.map((alert) => (
              <div key={alert.id} className="alert-item p-4 border-b border-gray-200 last:border-0">
                <div className="flex items-start">
                  <div className="mr-3">
                    {getPriorityIcon(alert.priority)}
                  </div>
                  <div className="flex-grow">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-2">
                      <h4 className="font-medium text-security-foreground">{alert.type}</h4>
                      {getPriorityBadge(alert.priority)}
                    </div>
                    <p className="text-sm text-security-muted mb-2">{alert.description}</p>
                    <p className="text-xs text-security-muted mb-3">{alert.date}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-security-primary">
                        {alert.action}
                      </span>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          {t('learn_more')}
                        </Button>
                        <Button variant="outline" size="sm" className="flex items-center">
                          <CheckCircle className="h-4 w-4 mr-1" />
                          {t('resolved')}
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-8">
            <CheckCircle className="h-12 w-12 text-green-500 mb-3" />
            <p className="text-lg font-medium text-security-foreground">{t('no_active_alerts')}</p>
            <p className="text-sm text-security-muted">{t('system_secure')}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default SecurityAlerts;
