
import React, { useState } from 'react';
import { ShieldCheck, Lock, Eye, Wifi, Monitor, Activity, Settings } from 'lucide-react';
import Header from '@/components/Header';
import SecurityStatus from '@/components/SecurityStatus';
import ProtectionCard from '@/components/ProtectionCard';
import DeviceCard from '@/components/DeviceCard';
import ThreatMonitor from '@/components/ThreatMonitor';
import QuickScan from '@/components/QuickScan';
import Footer from '@/components/Footer';
import { useToast } from '@/components/ui/use-toast';

const Index = () => {
  const { toast } = useToast();
  
  const [securityFeatures, setSecurityFeatures] = useState({
    antivirus: true,
    firewall: true,
    phishing: true,
    vpn: false,
  });

  const toggleFeature = (feature: keyof typeof securityFeatures) => {
    setSecurityFeatures(prev => {
      const newState = { ...prev, [feature]: !prev[feature] };
      
      // Show toast notification
      toast({
        title: newState[feature] ? `${feature} protection enabled` : `${feature} protection disabled`,
        description: newState[feature] 
          ? `Your device is now protected against ${feature} threats.` 
          : `Your device is no longer protected against ${feature} threats.`,
        variant: newState[feature] ? 'default' : 'destructive',
      });
      
      return newState;
    });
  };

  // Mock threats data
  const threats = [
    {
      id: 1,
      type: 'Phishing Attempt',
      source: 'malicious-website.com',
      time: 'Today, 14:32',
      status: 'blocked' as const,
    },
    {
      id: 2,
      type: 'Suspicious Connection',
      source: '192.168.1.245',
      time: 'Today, 11:17',
      status: 'blocked' as const,
    },
    {
      id: 3,
      type: 'Potentially Unwanted Program',
      source: 'download.exe',
      time: 'Yesterday, 19:04',
      status: 'quarantined' as const,
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-security-background">
      <Header />
      
      <main className="flex-grow py-6 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Main Status Section */}
          <div className="mb-8">
            <SecurityStatus 
              status="protected" 
              lastScan="Today, 09:45 AM" 
              issuesCount={0} 
            />
          </div>
          
          {/* Protection Features Grid */}
          <div className="mb-8">
            <h2 className="text-xl font-bold mb-4">Protection</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <ProtectionCard 
                title="Antivirus" 
                description="Protect against malware and viruses" 
                icon={ShieldCheck} 
                enabled={securityFeatures.antivirus} 
                onToggle={() => toggleFeature('antivirus')} 
                color="text-security-primary"
              />
              <ProtectionCard 
                title="Firewall" 
                description="Block unauthorized network access" 
                icon={Lock} 
                enabled={securityFeatures.firewall} 
                onToggle={() => toggleFeature('firewall')} 
                color="text-security-secondary"
              />
              <ProtectionCard 
                title="Anti-Phishing" 
                description="Prevent phishing and fraudulent sites" 
                icon={Eye} 
                enabled={securityFeatures.phishing} 
                onToggle={() => toggleFeature('phishing')} 
                color="text-security-accent"
              />
              <ProtectionCard 
                title="VPN" 
                description="Secure your connection on public networks" 
                icon={Wifi} 
                enabled={securityFeatures.vpn} 
                onToggle={() => toggleFeature('vpn')} 
                color="text-purple-500"
              />
            </div>
          </div>
          
          {/* Devices Section */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Protected Devices</h2>
              <button className="text-sm text-security-primary hover:text-security-secondary">Add Device</button>
            </div>
            <div className="space-y-3">
              <DeviceCard 
                deviceType="pc" 
                deviceName="Main Workstation" 
                lastActive="Now" 
                status="protected" 
              />
              <DeviceCard 
                deviceType="mobile" 
                deviceName="iPhone 13" 
                lastActive="2 hours ago" 
                status="protected" 
              />
              <DeviceCard 
                deviceType="pc" 
                deviceName="Work Laptop" 
                lastActive="Yesterday" 
                status="at-risk" 
              />
            </div>
          </div>
          
          {/* Two-column Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <ThreatMonitor threats={threats} totalBlocked={12} />
            <QuickScan />
          </div>
          
          {/* Security Tips */}
          <div className="mb-8 p-5 security-card border-l-4 border-l-security-primary">
            <h2 className="text-lg font-bold mb-2 flex items-center">
              <Activity className="h-5 w-5 mr-2 text-security-primary" />
              Security Tip
            </h2>
            <p className="text-security-muted">
              Enable two-factor authentication on all your important accounts to add an extra layer of security. This helps prevent unauthorized access even if your password is compromised.
            </p>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
