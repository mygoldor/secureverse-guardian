import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PerformanceSummary from '@/components/dashboard/PerformanceSummary';
import PerformanceCharts from '@/components/dashboard/PerformanceCharts';
import OptimizationTips from '@/components/dashboard/OptimizationTips';
import SystemHealth from '@/components/dashboard/SystemHealth';
import { useLanguage } from '@/contexts/LanguageContext';

const Performance = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen flex flex-col bg-[#F9F9F9]">
      <Header />
      
      <main className="flex-grow py-6 px-4">
        <div className="max-w-7xl mx-auto">
          <section className="mb-8">
            <h2 className="text-xl font-bold mb-4 text-[#003366]">{t('performance_summary')}</h2>
            <PerformanceSummary />
          </section>
          
          <section className="mb-8">
            <h2 className="text-xl font-bold mb-4 text-[#003366]">{t('performance_charts')}</h2>
            <PerformanceCharts />
          </section>
          
          <section className="mb-8">
            <h2 className="text-xl font-bold mb-4 text-[#003366]">{t('optimization_tips')}</h2>
            <OptimizationTips />
          </section>
          
          <section className="mb-8">
            <h2 className="text-xl font-bold mb-4 text-[#003366]">{t('system_health')}</h2>
            <SystemHealth />
          </section>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Performance;
