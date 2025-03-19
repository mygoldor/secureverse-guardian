
import React, { useState } from 'react';
import Header from '@/components/Header';
import { Activity, Zap, HardDrive, Cpu } from 'lucide-react';
import ProtectionCard from '@/components/ProtectionCard';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const performanceData = [
  { name: 'Mon', cpu: 30, memory: 45, disk: 20 },
  { name: 'Tue', cpu: 40, memory: 50, disk: 25 },
  { name: 'Wed', cpu: 35, memory: 40, disk: 22 },
  { name: 'Thu', cpu: 50, memory: 65, disk: 30 },
  { name: 'Fri', cpu: 45, memory: 55, disk: 28 },
  { name: 'Sat', cpu: 30, memory: 40, disk: 20 },
  { name: 'Sun', cpu: 25, memory: 35, disk: 18 },
];

const Performance = () => {
  const [performanceSettings, setPerformanceSettings] = useState({
    startupOptimization: true,
    diskCleaner: false,
    memoryOptimization: true,
    systemMonitoring: true,
  });

  const handleTogglePerformance = (key: keyof typeof performanceSettings) => {
    setPerformanceSettings(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-security-foreground">Performance</h1>
          <p className="text-security-muted mt-2">Monitor and optimize your system's performance</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 mb-8">
          <h2 className="text-xl font-semibold mb-4">System Performance</h2>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={performanceData}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="cpu" stackId="1" stroke="#8884d8" fill="#8884d8" />
                <Area type="monotone" dataKey="memory" stackId="2" stroke="#82ca9d" fill="#82ca9d" />
                <Area type="monotone" dataKey="disk" stackId="3" stroke="#ffc658" fill="#ffc658" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        <div className="grid md:grid-cols-2 gap-6">
          <ProtectionCard
            title="Startup Optimization"
            description="Manages startup programs to improve system boot time."
            icon={Zap}
            enabled={performanceSettings.startupOptimization}
            onToggle={() => handleTogglePerformance('startupOptimization')}
            color="text-security-primary"
          />
          
          <ProtectionCard
            title="Disk Cleaner"
            description="Removes temporary files to free up disk space and improve performance."
            icon={HardDrive}
            enabled={performanceSettings.diskCleaner}
            onToggle={() => handleTogglePerformance('diskCleaner')}
            color="text-security-danger"
          />
          
          <ProtectionCard
            title="Memory Optimization"
            description="Manages memory usage to keep your system running smoothly."
            icon={Activity}
            enabled={performanceSettings.memoryOptimization}
            onToggle={() => handleTogglePerformance('memoryOptimization')}
            color="text-security-warning"
          />
          
          <ProtectionCard
            title="System Monitoring"
            description="Continuously monitors system resources and alerts you of potential issues."
            icon={Cpu}
            enabled={performanceSettings.systemMonitoring}
            onToggle={() => handleTogglePerformance('systemMonitoring')}
            color="text-security-success"
          />
        </div>
      </main>
    </div>
  );
};

export default Performance;
