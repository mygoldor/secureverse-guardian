
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';

const PlanFeature = ({ children }: { children: React.ReactNode }) => (
  <li className="flex items-start">
    <svg className="w-5 h-5 text-[#00CC66] mr-2 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
    </svg>
    <div className="text-gray-700">
      {children}
    </div>
  </li>
);

const PricingSection = () => {
  const { t } = useLanguage();
  
  return (
    <section id="pricing" className="py-16 md:py-24 px-4 bg-[#F9F9F9]">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-[#003366] text-center mb-4">{t('pricing_title')}</h2>
        <p className="text-lg text-center text-gray-600 mb-12 max-w-3xl mx-auto">
          {t('pricing_subtitle')}
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Monthly Plan */}
          <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow border-t-4 border-[#0099FF]">
            <h3 className="text-2xl font-bold text-[#003366] mb-2">{t('monthly_plan')}</h3>
            <p className="text-gray-600 mb-4">{t('monthly_plan_description')}</p>
            <div className="mb-4">
              <span className="text-4xl font-bold text-[#003366]">{t('monthly_price')}</span>
            </div>
            <p className="text-gray-600 mb-6">{t('features_title')}</p>
            <ul className="space-y-3 mb-8">
              <PlanFeature>
                <strong className="text-[#003366] font-semibold">{t('feature_1_title')}</strong>
                <p>{t('feature_1_description')}</p>
              </PlanFeature>
              <PlanFeature>
                <strong className="text-[#003366] font-semibold">{t('feature_2_title')}</strong>
                <p>{t('feature_2_description')}</p>
              </PlanFeature>
              <PlanFeature>
                <strong className="text-[#003366] font-semibold">{t('real_time_monitoring')}</strong>
                <p>{t('real_time_monitoring_desc')}</p>
              </PlanFeature>
              <PlanFeature>
                <strong className="text-[#003366] font-semibold">{t('malware_protection')}</strong>
                <p>{t('malware_protection_desc')}</p>
              </PlanFeature>
            </ul>
            <Link to="/signup">
              <Button className="w-full bg-[#0099FF] hover:bg-[#007ACC] text-white">
                {t('choose_plan')}
              </Button>
            </Link>
          </div>
          
          {/* Annual Plan */}
          <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow border-t-4 border-[#00CC66] relative">
            <div className="absolute top-0 right-0 bg-[#00CC66] text-white text-xs font-bold px-3 py-1 rounded-br-lg rounded-tl-lg">{t('save_with_yearly')}</div>
            <h3 className="text-2xl font-bold text-[#003366] mb-2">{t('yearly_plan')}</h3>
            <p className="text-gray-600 mb-4">{t('yearly_plan_description')}</p>
            <div className="mb-4">
              <span className="text-4xl font-bold text-[#003366]">{t('yearly_price')}</span>
            </div>
            <p className="text-gray-600 mb-6">{t('features_title')}</p>
            <ul className="space-y-3 mb-8">
              <PlanFeature>
                <strong className="text-[#003366] font-semibold">{t('feature_1_title')}</strong>
                <p>{t('feature_1_description')}</p>
              </PlanFeature>
              <PlanFeature>
                <strong className="text-[#003366] font-semibold">{t('feature_2_title')}</strong>
                <p>{t('feature_2_description')}</p>
              </PlanFeature>
              <PlanFeature>
                <strong className="text-[#003366] font-semibold">{t('auto_backup')}</strong>
                <p>{t('auto_backup_desc')}</p>
              </PlanFeature>
              <PlanFeature>
                <strong className="text-[#003366] font-semibold">{t('vulnerability_analysis')}</strong>
                <p>{t('vulnerability_analysis_desc')}</p>
              </PlanFeature>
              <PlanFeature>
                <strong className="text-[#003366] font-semibold">{t('save_text')}</strong>
                <p>{t('save_with_yearly')}</p>
              </PlanFeature>
            </ul>
            <Link to="/signup">
              <Button className="w-full bg-[#00CC66] hover:bg-[#00AA55] text-white">
                {t('choose_plan')}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
