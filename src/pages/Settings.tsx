
import React, { useState } from 'react';
import Header from '@/components/Header';
import { Download, Upload, Bell, Moon, UserCheck } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import DataExportModal from '@/components/privacy/DataExportModal';

const Settings = () => {
  const [settings, setSettings] = useState({
    darkMode: false,
    notifications: true,
    autoUpdate: true,
    telemetry: false,
    cloudBackup: true,
    marketingEmails: false,
    dataCollection: false,
    biometricAuth: true,
  });

  const [dataExportModalOpen, setDataExportModalOpen] = useState(false);

  const handleToggleSetting = (key: keyof typeof settings) => {
    setSettings(prev => {
      const newSettings = { ...prev, [key]: !prev[key] };
      
      // Show toast for GDPR-related settings
      if (['telemetry', 'dataCollection', 'marketingEmails'].includes(key)) {
        toast.success(`${key} ${newSettings[key] ? 'enabled' : 'disabled'}`, {
          description: `Your preference has been saved in compliance with GDPR regulations.`,
        });
      }
      
      return newSettings;
    });
  };

  const handleExportData = () => {
    setDataExportModalOpen(true);
  };

  const handleDeleteData = () => {
    toast.success('Data deletion requested', {
      description: 'Your account data will be deleted within 30 days as per GDPR requirements.',
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-security-foreground">Settings</h1>
          <p className="text-security-muted mt-2">Manage your app preferences and privacy settings</p>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6">
            <h2 className="text-xl font-semibold mb-4">Application Settings</h2>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-security-foreground">Dark Mode</h3>
                  <p className="text-sm text-security-muted">Enable dark theme for the application</p>
                </div>
                <Switch 
                  checked={settings.darkMode}
                  onCheckedChange={() => handleToggleSetting('darkMode')}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-security-foreground">Notifications</h3>
                  <p className="text-sm text-security-muted">Receive alerts about security events</p>
                </div>
                <Switch 
                  checked={settings.notifications}
                  onCheckedChange={() => handleToggleSetting('notifications')}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-security-foreground">Automatic Updates</h3>
                  <p className="text-sm text-security-muted">Keep the application updated automatically</p>
                </div>
                <Switch 
                  checked={settings.autoUpdate}
                  onCheckedChange={() => handleToggleSetting('autoUpdate')}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-security-foreground">Cloud Backup</h3>
                  <p className="text-sm text-security-muted">Backup your settings to the cloud</p>
                </div>
                <Switch 
                  checked={settings.cloudBackup}
                  onCheckedChange={() => handleToggleSetting('cloudBackup')}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-security-foreground">Biometric Authentication</h3>
                  <p className="text-sm text-security-muted">Use fingerprint or face recognition for authentication</p>
                </div>
                <Switch 
                  checked={settings.biometricAuth}
                  onCheckedChange={() => handleToggleSetting('biometricAuth')}
                />
              </div>
            </div>
          </div>
          
          <Separator />
          
          <div className="p-6">
            <h2 className="text-xl font-semibold mb-4">Privacy Settings (GDPR Compliant)</h2>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-security-foreground">Data Collection</h3>
                  <p className="text-sm text-security-muted">Allow collection of anonymous usage data</p>
                </div>
                <Switch 
                  checked={settings.dataCollection}
                  onCheckedChange={() => handleToggleSetting('dataCollection')}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-security-foreground">Telemetry</h3>
                  <p className="text-sm text-security-muted">Send diagnostic information to improve the application</p>
                </div>
                <Switch 
                  checked={settings.telemetry}
                  onCheckedChange={() => handleToggleSetting('telemetry')}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-security-foreground">Marketing Emails</h3>
                  <p className="text-sm text-security-muted">Receive promotional emails and offers</p>
                </div>
                <Switch 
                  checked={settings.marketingEmails}
                  onCheckedChange={() => handleToggleSetting('marketingEmails')}
                />
              </div>
            </div>
            
            <div className="mt-8 space-y-4">
              <h3 className="font-medium text-security-foreground">Your Data Rights (GDPR)</h3>
              <div className="grid sm:grid-cols-2 gap-4 mt-2">
                <Button 
                  variant="outline" 
                  className="flex items-center" 
                  onClick={handleExportData}
                >
                  <Download className="mr-2 h-4 w-4" />
                  Export My Data
                </Button>
                <Button 
                  variant="outline" 
                  className="flex items-center text-security-danger hover:text-security-danger" 
                  onClick={handleDeleteData}
                >
                  <UserCheck className="mr-2 h-4 w-4" />
                  Delete My Data
                </Button>
              </div>
              <p className="text-sm text-security-muted mt-2">
                Per GDPR regulations, you can request a full export of your personal data or request complete deletion of all your data from our systems. Data deletion will result in the termination of your account.
              </p>
            </div>
          </div>
        </div>
      </main>
      
      <DataExportModal 
        open={dataExportModalOpen} 
        onOpenChange={setDataExportModalOpen} 
      />
    </div>
  );
};

export default Settings;
