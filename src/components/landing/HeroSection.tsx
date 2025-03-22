
import React, { useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useNavigate } from 'react-router-dom';

const HeroSection: React.FC = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  
  useEffect(() => {
    // Add event listeners directly to the buttons after component mounts
    const startButton = document.getElementById("start-button");
    const discoverButton = document.getElementById("discover-button");
    
    if (startButton) {
      startButton.addEventListener("click", function () {
        navigate('/signup'); // Redirect to signup page using React Router
      });
    }
    
    if (discoverButton) {
      discoverButton.addEventListener("click", function () {
        navigate('/signup'); // Redirect to signup page using React Router
      });
    }
    
    // Clean up event listeners when component unmounts
    return () => {
      const startButton = document.getElementById("start-button");
      const discoverButton = document.getElementById("discover-button");
      
      if (startButton) {
        startButton.removeEventListener("click", function () {
          window.location.href = "/signup";
        });
      }
      
      if (discoverButton) {
        discoverButton.removeEventListener("click", function () {
          window.location.href = "/signup";
        });
      }
    };
  }, [navigate]);
  
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
              id="start-button" 
              className="bg-white text-blue-700 hover:bg-blue-50 font-semibold py-3 px-6 rounded-md w-full sm:w-auto"
            >
              {t('get_started')}
            </button>
            <button 
              id="discover-button" 
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
