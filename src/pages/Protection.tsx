
import React, { useState } from 'react';
import Header from '@/components/Header';
import { Shield, RefreshCcw, Lock, Eye } from 'lucide-react';
import ProtectionCard from '@/components/ProtectionCard';

const Protection = () => {
  const [protectionSettings, setProtectionSettings] = useState({
    malwareProtection: true,
    firewallProtection: true,
    vulnerabilityScan: false,
    ransomwareProtection: true,
  });

  const handleToggleProtection = (key: keyof typeof protectionSettings) => {
    setProtectionSettings(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-security-foreground">Protection</h1>
          <button className="flex items-center text-security-primary hover:text-security-secondary">
            <RefreshCcw className="h-4 w-4 mr-1" />
            <span>Run Quick Scan</span>
          </button>
        </div>
        
        <div className="grid md:grid-cols-2 gap-6">
          <ProtectionCard
            title="Malware Protection"
            description="Actively monitors and blocks malicious software from running on your device."
            icon={Shield}
            enabled={protectionSettings.malwareProtection}
            onToggle={() => handleToggleProtection('malwareProtection')}
            color="text-security-primary"
          />
          
          <ProtectionCard
            title="Firewall Protection"
            description="Controls network traffic and blocks unauthorized access to your device."
            icon={Lock}
            enabled={protectionSettings.firewallProtection}
            onToggle={() => handleToggleProtection('firewallProtection')}
            color="text-security-danger"
          />
          
          <ProtectionCard
            title="Vulnerability Scan"
            description="Scans for security vulnerabilities in your system and applications."
            icon={Eye}
            enabled={protectionSettings.vulnerabilityScan}
            onToggle={() => handleToggleProtection('vulnerabilityScan')}
            color="text-security-warning"
          />
          
          <ProtectionCard
            title="Ransomware Protection"
            description="Prevents ransomware from encrypting your personal files."
            icon={Shield}
            enabled={protectionSettings.ransomwareProtection}
            onToggle={() => handleToggleProtection('ransomwareProtection')}
            color="text-security-success"
          />
        </div>
      </main>
    </div>
  );
};

export default Protection;
