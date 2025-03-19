
import React, { useState } from 'react';
import Header from '@/components/Header';
import PrivacySettings from '@/components/privacy/PrivacySettings';
import PrivacyPolicy from '@/components/privacy/PrivacyPolicy';

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
      <main className="max-w-7xl mx-auto px-4 py-8 text-gray-800">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Privacy</h1>
          <p className="text-gray-500 mt-2">Manage how your data is collected and used in compliance with GDPR regulations.</p>
        </div>
        
        <PrivacySettings 
          privacySettings={privacySettings} 
          onTogglePrivacy={handleTogglePrivacy} 
        />
        
        <PrivacyPolicy />
      </main>
    </div>
  );
};

export default Privacy;
