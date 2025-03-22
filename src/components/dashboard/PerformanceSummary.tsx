
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useLanguage } from '@/contexts/LanguageContext';

const PerformanceSummary = () => {
  const { t } = useLanguage();
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">{t('cpu_usage')}</CardTitle>
          <CardDescription>Intel Core i7 @ 3.40GHz</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">32%</span>
              <span className="text-sm font-medium">1.2 GHz</span>
            </div>
            <Progress value={32} className="h-2" />
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">{t('memory_usage')}</CardTitle>
          <CardDescription>16GB DDR4</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">45%</span>
              <span className="text-sm font-medium">7.2 GB</span>
            </div>
            <Progress value={45} className="h-2" />
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">{t('disk_usage')}</CardTitle>
          <CardDescription>SSD 500GB</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">65%</span>
              <span className="text-sm font-medium">325 GB</span>
            </div>
            <Progress value={65} className="h-2" />
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">{t('network_usage')}</CardTitle>
          <CardDescription>Gigabit Ethernet</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">12%</span>
              <span className="text-sm font-medium">12 MB/s</span>
            </div>
            <Progress value={12} className="h-2" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PerformanceSummary;
