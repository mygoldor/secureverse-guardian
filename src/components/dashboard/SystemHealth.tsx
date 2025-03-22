
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Clock, AlertCircle, CheckCircle } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const SystemHealth = () => {
  const { t } = useLanguage();
  
  const healthItems = [
    {
      icon: <Shield className="h-5 w-5 text-green-500" />,
      title: t('security_status'),
      status: t('protected'),
      statusColor: "text-green-500"
    },
    {
      icon: <Clock className="h-5 w-5 text-blue-500" />,
      title: t('uptime'),
      status: "3 " + t('days') + " 7 " + t('hours'),
      statusColor: "text-blue-500"
    },
    {
      icon: <AlertCircle className="h-5 w-5 text-amber-500" />,
      title: t('system_updates'),
      status: t('updates_available'),
      statusColor: "text-amber-500"
    },
    {
      icon: <CheckCircle className="h-5 w-5 text-green-500" />,
      title: t('disk_health'),
      status: t('good'),
      statusColor: "text-green-500"
    }
  ];
  
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
      {healthItems.map((item, index) => (
        <Card key={index}>
          <CardHeader className="pb-2 flex flex-row items-center justify-between">
            {item.icon}
            <CardTitle className="text-base">{item.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className={`text-lg font-semibold ${item.statusColor}`}>
              {item.status}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default SystemHealth;
