
import React from 'react';
import { Facebook, Twitter, Linkedin } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';

const Footer = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  
  const handleNavigation = (sectionId: string) => {
    navigate('/');
    // Add a small delay to ensure the page loads before scrolling
    setTimeout(() => {
      const element = document.getElementById(sectionId);
      element?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };
  
  return (
    <footer className="bg-[#003366] text-white py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-2 mb-4">
              <img 
                src="/lovable-uploads/a79c46d3-f1c2-4593-967d-8c6176e58cbc.png" 
                alt="Guardia" 
                className="h-10 w-auto"
              />
              <span className="font-bold text-xl text-white">Guardia</span>
            </div>
            <p className="text-gray-300 text-sm">
              {t('hero_subtitle')}
            </p>
            <div className="pt-2">
              <span className="text-[#0099FF] font-bold">CYBERSECURITY SOLUTION</span>
            </div>
          </div>
          
          <div>
            <h4 className="font-bold text-lg mb-4">{t('navigation')}</h4>
            <ul className="space-y-2">
              <li>
                <Link 
                  to="/"
                  className="text-gray-300 hover:text-white transition-colors cursor-pointer text-left"
                >
                  {t('home')}
                </Link>
              </li>
              <li>
                <Link 
                  to="/#features"
                  className="text-gray-300 hover:text-white transition-colors cursor-pointer text-left"
                >
                  {t('features')}
                </Link>
              </li>
              <li>
                <Link 
                  to="/#pricing"
                  className="text-gray-300 hover:text-white transition-colors cursor-pointer text-left"
                >
                  {t('pricing')}
                </Link>
              </li>
              <li>
                <Link 
                  to="/#testimonials"
                  className="text-gray-300 hover:text-white transition-colors cursor-pointer text-left"
                >
                  {t('testimonials')}
                </Link>
              </li>
              <li>
                <Link 
                  to="/#contact"
                  className="text-gray-300 hover:text-white transition-colors cursor-pointer text-left"
                >
                  {t('contact')}
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold text-lg mb-4">{t('legal')}</h4>
            <ul className="space-y-2">
              <li><Link to="/mentions-legales" className="text-gray-300 hover:text-white transition-colors">{t('legal_mentions')}</Link></li>
              <li><Link to="/privacy" className="text-gray-300 hover:text-white transition-colors">{t('privacy_policy')}</Link></li>
              <li><Link to="/terms" className="text-gray-300 hover:text-white transition-colors">{t('terms_of_use')}</Link></li>
              <li><Link to="/cookies" className="text-gray-300 hover:text-white transition-colors">{t('cookie_management')}</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-gray-700 text-center md:flex md:justify-between md:items-center">
          <p className="text-sm text-gray-300">© {new Date().getFullYear()} Guardia Security. {t('rights_reserved')}.</p>
          <div className="mt-4 md:mt-0">
            <img src="/placeholder.svg" alt="Paiement sécurisé" className="h-8 inline-block" />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
