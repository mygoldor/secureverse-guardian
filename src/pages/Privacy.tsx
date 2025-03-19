
import React, { useState } from 'react';
import Header from '@/components/Header';
import { UserCheck, Eye, Fingerprint, Trash2 } from 'lucide-react';
import ProtectionCard from '@/components/ProtectionCard';

const Privacy = () => {
  const [privacySettings, setPrivacySettings] = useState({
    trackingPrevention: true,
    cookiesManagement: true,
    passwordProtection: false,
    dataCleanup: true,
  });

  const handleTogglePrivacy = (key: keyof typeof privacySettings) => {
    setPrivacySettings(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-security-foreground">Privacy</h1>
          <p className="text-security-muted mt-2">Manage how your data is collected and used in compliance with GDPR regulations.</p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-6">
          <ProtectionCard
            title="Tracking Prevention"
            description="Blocks third-party trackers from collecting your browsing data across sites."
            icon={Eye}
            enabled={privacySettings.trackingPrevention}
            onToggle={() => handleTogglePrivacy('trackingPrevention')}
            color="text-security-primary"
          />
          
          <ProtectionCard
            title="Cookies Management"
            description="Controls which websites can store cookies on your device and for how long."
            icon={Fingerprint}
            enabled={privacySettings.cookiesManagement}
            onToggle={() => handleTogglePrivacy('cookiesManagement')}
            color="text-security-danger"
          />
          
          <ProtectionCard
            title="Password Protection"
            description="Monitors saved passwords and alerts you if they're found in data breaches."
            icon={UserCheck}
            enabled={privacySettings.passwordProtection}
            onToggle={() => handleTogglePrivacy('passwordProtection')}
            color="text-security-warning"
          />
          
          <ProtectionCard
            title="Data Cleanup"
            description="Automatically removes browsing history and temporary files to protect privacy."
            icon={Trash2}
            enabled={privacySettings.dataCleanup}
            onToggle={() => handleTogglePrivacy('dataCleanup')}
            color="text-security-success"
          />
        </div>
        
        <div className="mt-10 p-6 bg-white rounded-lg shadow-sm border border-gray-100">
          <h2 className="text-xl font-semibold mb-4">GDPR Compliance Information</h2>
          <p className="text-security-muted mb-4">
            In accordance with the General Data Protection Regulation (GDPR), we provide you with full control over your personal data.
            You have the right to access, rectify, delete, and restrict the processing of your data.
          </p>
          <div className="space-y-2">
            <h3 className="font-medium">Your Rights Include:</h3>
            <ul className="list-disc pl-5 text-security-muted">
              <li>The right to access your personal data</li>
              <li>The right to rectify inaccurate personal data</li>
              <li>The right to erasure ("right to be forgotten")</li>
              <li>The right to restrict processing of your data</li>
              <li>The right to data portability</li>
              <li>The right to object to processing of your data</li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Privacy;
