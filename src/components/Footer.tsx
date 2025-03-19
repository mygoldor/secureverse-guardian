
import React from 'react';
import { Facebook, Twitter, Linkedin, Mail, Phone, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';

const Footer = () => {
  const { t } = useLanguage();
  
  return (
    <footer className="bg-[#003366] text-white py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
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
              <li><a href="#hero" className="text-gray-300 hover:text-white transition-colors">{t('home')}</a></li>
              <li><a href="#features" className="text-gray-300 hover:text-white transition-colors">{t('features')}</a></li>
              <li><a href="#pricing" className="text-gray-300 hover:text-white transition-colors">{t('pricing')}</a></li>
              <li><a href="#testimonials" className="text-gray-300 hover:text-white transition-colors">{t('testimonials')}</a></li>
              <li><a href="#contact" className="text-gray-300 hover:text-white transition-colors">{t('contact')}</a></li>
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
          
          <div>
            <h4 className="font-bold text-lg mb-4">{t('contact')}</h4>
            <ul className="space-y-3">
              <li className="flex items-center">
                <MapPin className="h-5 w-5 mr-2 text-gray-300" />
                <span className="text-gray-300">{t('company_address')}</span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 mr-2 text-gray-300" />
                <span className="text-gray-300">+33 (0)1 23 45 67 89</span>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 mr-2 text-gray-300" />
                <span className="text-gray-300">contact@guardia-security.com</span>
              </li>
            </ul>
            
            <div className="mt-4 flex space-x-4">
              <a href="#" className="text-white hover:text-gray-300 transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-white hover:text-gray-300 transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-white hover:text-gray-300 transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
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
