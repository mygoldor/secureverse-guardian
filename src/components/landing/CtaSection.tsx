
import React from 'react';
import { Link } from 'react-router-dom';
import { Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';

const CtaSection = () => {
  const { t } = useLanguage();
  
  return (
    <section id="contact" className="py-16 md:py-24 px-4 bg-gradient-to-r from-[#003366] to-[#0099FF]">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">{t('ready_to_protect')}</h2>
        <p className="text-xl text-gray-200 mb-8">{t('signup_now')}</p>
        
        <div className="bg-white p-8 rounded-xl shadow-lg">
          <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
            <input 
              type="email" 
              placeholder="Votre adresse e-mail" 
              className="flex-grow px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0099FF]"
            />
            <Link to="/signup">
              <Button className="bg-[#00CC66] hover:bg-[#00AA55] text-white px-6">
                S'inscrire
              </Button>
            </Link>
          </div>
          <p className="text-gray-500 text-sm mt-4">Aucun engagement nécessaire, annulez à tout moment.</p>
        </div>
        
        <div className="mt-8 flex justify-center items-center space-x-8">
          <div className="flex flex-col items-center">
            <div className="bg-white/10 p-3 rounded-full mb-2">
              <Shield className="h-6 w-6 text-white" />
            </div>
            <p className="text-white text-sm">Protection totale</p>
          </div>
          <div className="flex flex-col items-center">
            <div className="bg-white/10 p-3 rounded-full mb-2">
              <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <p className="text-white text-sm">Installation rapide</p>
          </div>
          <div className="flex flex-col items-center">
            <div className="bg-white/10 p-3 rounded-full mb-2">
              <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
              </svg>
            </div>
            <p className="text-white text-sm">Garantie 30 jours</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CtaSection;
