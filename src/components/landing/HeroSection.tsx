
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useNavigate } from 'react-router-dom';

const HeroSection: React.FC = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  
  const handleGetStarted = () => {
    console.log("Get Started clicked");
    // Navigate directly to signup without any automatic redirections there
    navigate('/signup');
  };
  
  const handleDiscover = () => {
    console.log("Discover clicked");
    // Navigate directly to signup without any automatic redirections there
    navigate('/signup');
  };
  
  return (
    <section className="relative py-20 overflow-hidden bg-gradient-to-b from-blue-800 to-blue-900 text-white">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white">
            {t('hero_title')}
          </h1>
          <p className="text-xl mb-10 text-blue-100">
            {t('hero_subtitle')}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-4">
            <button 
              onClick={handleGetStarted}
              className="bg-white text-blue-700 hover:bg-blue-50 font-semibold py-3 px-6 rounded-md w-full sm:w-auto"
            >
              {t('get_started')}
            </button>
            <button 
              onClick={handleDiscover}
              className="bg-transparent border border-white text-white hover:bg-white/10 font-semibold py-3 px-6 rounded-md w-full sm:w-auto"
            >
              {t('discover_guardia')}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
