
import React from 'react';
import { Monitor, ShieldBan, Cloud, Search, ChartBar, Shield } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const FeatureCard = ({ 
  icon: Icon, 
  bgColor, 
  title, 
  description 
}: { 
  icon: React.ComponentType<any>; 
  bgColor: string; 
  title: string; 
  description: string; 
}) => (
  <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
    <div className={`${bgColor} text-white p-3 rounded-full inline-block mb-4`}>
      <Icon className="h-8 w-8" />
    </div>
    <h3 className="text-xl font-bold text-[#003366] mb-2">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);

const FeaturesSection = () => {
  const { t } = useLanguage();
  
  const features = [
    {
      icon: Monitor,
      bgColor: "bg-[#0099FF]",
      title: t('real_time_monitoring'),
      description: t('real_time_monitoring_desc')
    },
    {
      icon: ShieldBan,
      bgColor: "bg-[#00CC66]",
      title: t('malware_protection'),
      description: t('malware_protection_desc')
    },
    {
      icon: Cloud,
      bgColor: "bg-[#0099FF]",
      title: t('auto_backup'),
      description: t('auto_backup_desc')
    },
    {
      icon: Search,
      bgColor: "bg-[#00CC66]",
      title: t('vulnerability_analysis'),
      description: t('vulnerability_analysis_desc')
    },
    {
      icon: ChartBar,
      bgColor: "bg-[#0099FF]",
      title: t('security_reports'),
      description: t('security_reports_desc')
    },
    {
      icon: Shield,
      bgColor: "bg-[#00CC66]",
      title: t('multi_device_protection'),
      description: t('multi_device_protection_desc')
    }
  ];
  
  return (
    <section id="features" className="py-16 md:py-24 px-4 bg-[#F9F9F9]">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-[#003366] text-center mb-12">{t('key_features')}</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              bgColor={feature.bgColor}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
