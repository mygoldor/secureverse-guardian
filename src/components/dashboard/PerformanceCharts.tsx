
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useLanguage } from '@/contexts/LanguageContext';

const PerformanceCharts = () => {
  const { t } = useLanguage();
  
  // Sample data for CPU usage over time
  const cpuData = [
    { time: '00:00', usage: 25 },
    { time: '01:00', usage: 30 },
    { time: '02:00', usage: 22 },
    { time: '03:00', usage: 28 },
    { time: '04:00', usage: 35 },
    { time: '05:00', usage: 40 },
    { time: '06:00', usage: 30 },
    { time: '07:00', usage: 42 },
    { time: '08:00', usage: 35 },
    { time: '09:00', usage: 28 },
    { time: '10:00', usage: 32 },
    { time: '11:00', usage: 38 },
  ];
  
  // Sample data for memory usage over time
  const memoryData = [
    { time: '00:00', usage: 40 },
    { time: '01:00', usage: 42 },
    { time: '02:00', usage: 45 },
    { time: '03:00', usage: 40 },
    { time: '04:00', usage: 38 },
    { time: '05:00', usage: 43 },
    { time: '06:00', usage: 48 },
    { time: '07:00', usage: 50 },
    { time: '08:00', usage: 52 },
    { time: '09:00', usage: 48 },
    { time: '10:00', usage: 45 },
    { time: '11:00', usage: 47 },
  ];
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>{t('cpu_usage_over_time')}</CardTitle>
        </CardHeader>
        <CardContent className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={cpuData}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis domain={[0, 100]} label={{ value: '%', angle: -90, position: 'insideLeft' }} />
              <Tooltip />
              <Line type="monotone" dataKey="usage" stroke="#4f46e5" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>{t('memory_usage_over_time')}</CardTitle>
        </CardHeader>
        <CardContent className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={memoryData}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis domain={[0, 100]} label={{ value: '%', angle: -90, position: 'insideLeft' }} />
              <Tooltip />
              <Line type="monotone" dataKey="usage" stroke="#10b981" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default PerformanceCharts;
