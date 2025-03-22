
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle, HardDrive, Cpu, RefreshCw } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const OptimizationTips = () => {
  const { t } = useLanguage();
  
  const tips = [
    {
      icon: <Cpu className="h-5 w-5 text-amber-500" />,
      title: t('reduce_background_processes'),
      description: t('close_unused_applications'),
      action: t('view_processes')
    },
    {
      icon: <HardDrive className="h-5 w-5 text-blue-500" />,
      title: t('clean_disk_space'),
      description: t('remove_temporary_files'),
      action: t('run_cleanup')
    },
    {
      icon: <AlertTriangle className="h-5 w-5 text-red-500" />,
      title: t('update_drivers'),
      description: t('outdated_graphics_driver'),
      action: t('update_now')
    },
    {
      icon: <RefreshCw className="h-5 w-5 text-green-500" />,
      title: t('optimize_startup'),
      description: t('too_many_startup_programs'),
      action: t('manage_startup')
    }
  ];
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {tips.map((tip, index) => (
        <Card key={index}>
          <CardHeader className="flex flex-row items-center space-x-3 pb-2">
            {tip.icon}
            <div>
              <CardTitle className="text-lg">{tip.title}</CardTitle>
              <CardDescription>{tip.description}</CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <button className="text-sm font-medium text-primary hover:underline">
              {tip.action}
            </button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default OptimizationTips;
