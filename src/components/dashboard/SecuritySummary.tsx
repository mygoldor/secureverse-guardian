
import React from 'react';
import { Shield, Clock, Check, AlertCircle, Cloud } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';

const SecuritySummary = () => {
  const { t } = useLanguage();

  return (
    <div className="dashboard-summary grid grid-cols-1 md:grid-cols-2 gap-4">
      <Card className="bg-[#E6F7FF]">
        <CardContent className="pt-6">
          <div className="flex items-center space-x-3">
            <Shield className="h-6 w-6 text-security-primary" />
            <h3 className="font-medium text-security-foreground">{t('real_time_protection')}</h3>
          </div>
          <div className="mt-3 flex items-center">
            <span className="stat text-[#00CC66] text-lg font-semibold">{t('active')}</span>
            <Check className="ml-2 h-5 w-5 text-[#00CC66]" />
          </div>
        </CardContent>
      </Card>
      
      <Card className="bg-[#E6F7FF]">
        <CardContent className="pt-6">
          <div className="flex items-center space-x-3">
            <Clock className="h-6 w-6 text-security-primary" />
            <h3 className="font-medium text-security-foreground">{t('last_scan')}</h3>
          </div>
          <div className="mt-3">
            <span className="stat text-lg font-semibold text-security-foreground">Aujourd'hui, 14:30</span>
          </div>
        </CardContent>
      </Card>
      
      <Card className="bg-[#E6F7FF]">
        <CardContent className="pt-6">
          <div className="flex items-center space-x-3">
            <AlertCircle className="h-6 w-6 text-security-primary" />
            <h3 className="font-medium text-security-foreground">{t('security_alerts')}</h3>
          </div>
          <div className="mt-3">
            <span className="stat text-lg font-semibold text-security-danger">3 {t('alerts')}</span>
          </div>
        </CardContent>
      </Card>
      
      <Card className="bg-[#E6F7FF]">
        <CardContent className="pt-6">
          <div className="flex items-center space-x-3">
            <Cloud className="h-6 w-6 text-security-primary" />
            <h3 className="font-medium text-security-foreground">{t('automatic_backup')}</h3>
          </div>
          <div className="mt-3 flex items-center">
            <span className="stat text-[#00CC66] text-lg font-semibold">{t('successful')}</span>
            <span className="ml-2 text-sm text-security-muted">{t('yesterday')}, 22:15</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SecuritySummary;
