import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SecuritySettings from '@/components/dashboard/SecuritySettings';

const Settings = () => {
  return (
    <div className="min-h-screen flex flex-col bg-[#F9F9F9]">
      <Header />
      
      <main className="flex-grow py-6 px-4">
        <div className="max-w-7xl mx-auto">
          <section className="mb-8">
            <h2 className="text-xl font-bold mb-4 text-[#003366]">Security Settings</h2>
            <SecuritySettings />
          </section>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Settings;
