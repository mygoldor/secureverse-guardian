
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SecuritySummary from '@/components/dashboard/SecuritySummary';
import SecurityAlerts from '@/components/dashboard/SecurityAlerts';
import SecurityCharts from '@/components/dashboard/SecurityCharts';
import AnalysisHistory from '@/components/dashboard/AnalysisHistory';
import SecuritySettings from '@/components/dashboard/SecuritySettings';
import Subscription from '@/components/dashboard/Subscription';
import QuickScan from '@/components/QuickScan';
import { useLanguage } from '@/contexts/LanguageContext';

const Dashboard = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen flex flex-col bg-[#F9F9F9]">
      <Header />
      
      <main className="flex-grow py-6 px-4">
        <div className="max-w-7xl mx-auto">
          <section className="mb-8">
            <h2 className="text-xl font-bold mb-4 text-[#003366]">{t('security_summary')}</h2>
            <SecuritySummary />
          </section>
          
          <section className="mb-8">
            <h2 className="text-xl font-bold mb-4 text-[#003366]">{t('analyse_rapide')}</h2>
            <QuickScan />
          </section>
          
          <section className="mb-8">
            <h2 className="text-xl font-bold mb-4 text-[#003366]">{t('recent_alerts')}</h2>
            <SecurityAlerts />
          </section>
          
          <section className="mb-8">
            <h2 className="text-xl font-bold mb-4 text-[#003366]">{t('threat_analysis')}</h2>
            <SecurityCharts />
          </section>
          
          <section className="mb-8">
            <h2 className="text-xl font-bold mb-4 text-[#003366]">{t('analysis_history')}</h2>
            <AnalysisHistory />
          </section>
          
          <section className="mb-8">
            <h2 className="text-xl font-bold mb-4 text-[#003366]">{t('security_settings')}</h2>
            <SecuritySettings />
          </section>
          
          <section className="mb-8">
            <h2 className="text-xl font-bold mb-4 text-[#003366]">{t('my_subscription')}</h2>
            <Subscription />
          </section>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Dashboard;
