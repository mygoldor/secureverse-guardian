
import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Monitor, ShieldBan, Cloud, Search, ChartBar, ArrowRight, Facebook, Twitter, Linkedin, Mail, Phone, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Footer from '@/components/Footer';
import { useLanguage } from '@/contexts/LanguageContext';
import LanguageSelector from '@/components/LanguageSelector';

const Landing = () => {
  const { t } = useLanguage();
  
  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <header className="w-full bg-[#003366] py-4 px-4 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-2">
            <Shield className="h-8 w-8 text-white" />
            <span className="font-bold text-2xl text-white">Guardia</span>
          </Link>
          
          <nav className="hidden md:flex items-center space-x-6">
            <a href="#hero" className="text-white hover:text-gray-300 transition-colors">{t('home')}</a>
            <a href="#features" className="text-white hover:text-gray-300 transition-colors">{t('features')}</a>
            <a href="#pricing" className="text-white hover:text-gray-300 transition-colors">{t('pricing')}</a>
            <a href="#testimonials" className="text-white hover:text-gray-300 transition-colors">{t('testimonials')}</a>
            <a href="#contact" className="text-white hover:text-gray-300 transition-colors">{t('contact')}</a>
            <Link to="/login" className="text-white hover:text-gray-300 transition-colors">{t('login')}</Link>
          </nav>
          
          <div className="flex items-center space-x-3">
            <LanguageSelector />
            <Button className="bg-[#0099FF] hover:bg-[#007ACC] text-white" onClick={() => window.location.href='/signup'}>
              {t('get_started')}
            </Button>
            <Button variant="ghost" size="icon" className="md:hidden text-white">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>
            </Button>
          </div>
        </div>
      </header>
      
      {/* Hero Section */}
      <section id="hero" className="relative py-20 md:py-32 px-4 bg-gradient-to-r from-[#003366] to-[#0099FF]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="text-left">
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">{t('hero_title')}</h1>
            <p className="text-xl text-gray-200 mb-8">{t('hero_subtitle')}</p>
            <Link to="/signup">
              <Button className="bg-[#00CC66] hover:bg-[#00AA55] text-white text-lg px-8 py-6">
                {t('discover_guardia')} <ArrowRight className="ml-2" />
              </Button>
            </Link>
          </div>
          <div className="hidden md:block">
            <img 
              src="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b" 
              alt={t('computer_security')} 
              className="rounded-lg shadow-xl" 
            />
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section id="features" className="py-16 md:py-24 px-4 bg-[#F9F9F9]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-[#003366] text-center mb-12">{t('key_features')}</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <div className="bg-[#0099FF] text-white p-3 rounded-full inline-block mb-4">
                <Monitor className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold text-[#003366] mb-2">{t('real_time_monitoring')}</h3>
              <p className="text-gray-600">{t('real_time_monitoring_desc')}</p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <div className="bg-[#00CC66] text-white p-3 rounded-full inline-block mb-4">
                <ShieldBan className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold text-[#003366] mb-2">{t('malware_protection')}</h3>
              <p className="text-gray-600">{t('malware_protection_desc')}</p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <div className="bg-[#0099FF] text-white p-3 rounded-full inline-block mb-4">
                <Cloud className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold text-[#003366] mb-2">{t('auto_backup')}</h3>
              <p className="text-gray-600">{t('auto_backup_desc')}</p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <div className="bg-[#00CC66] text-white p-3 rounded-full inline-block mb-4">
                <Search className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold text-[#003366] mb-2">{t('vulnerability_analysis')}</h3>
              <p className="text-gray-600">{t('vulnerability_analysis_desc')}</p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <div className="bg-[#0099FF] text-white p-3 rounded-full inline-block mb-4">
                <ChartBar className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold text-[#003366] mb-2">{t('security_reports')}</h3>
              <p className="text-gray-600">{t('security_reports_desc')}</p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <div className="bg-[#00CC66] text-white p-3 rounded-full inline-block mb-4">
                <Shield className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold text-[#003366] mb-2">{t('multi_device_protection')}</h3>
              <p className="text-gray-600">{t('multi_device_protection_desc')}</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Testimonials */}
      <section id="testimonials" className="py-16 md:py-24 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-[#003366] text-center mb-12">{t('testimonials_title')}</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-[#F5F5F5] p-6 rounded-xl shadow-sm">
              <div className="flex flex-col space-y-4">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg key={star} className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                    </svg>
                  ))}
                </div>
                <p className="text-gray-600 italic">"Guardia a renforcé la sécurité de notre entreprise de manière simple et efficace. Un outil indispensable que je recommande vivement."</p>
                <div>
                  <p className="font-bold text-[#003366]">Jean Dupont</p>
                  <p className="text-sm text-gray-500">Dirigeant, TPE</p>
                </div>
              </div>
            </div>
            
            <div className="bg-[#F5F5F5] p-6 rounded-xl shadow-sm">
              <div className="flex flex-col space-y-4">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg key={star} className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                    </svg>
                  ))}
                </div>
                <p className="text-gray-600 italic">"Une solution facile à mettre en place et un support réactif. Nous nous sentons enfin protégés contre les cybermenaces."</p>
                <div>
                  <p className="font-bold text-[#003366]">Marie Lemoine</p>
                  <p className="text-sm text-gray-500">Particulier</p>
                </div>
              </div>
            </div>
            
            <div className="bg-[#F5F5F5] p-6 rounded-xl shadow-sm">
              <div className="flex flex-col space-y-4">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg key={star} className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                    </svg>
                  ))}
                </div>
                <p className="text-gray-600 italic">"Depuis que nous utilisons Guardia, nous avons évité plusieurs tentatives d'intrusion. Le meilleur investissement pour notre sécurité informatique."</p>
                <div>
                  <p className="font-bold text-[#003366]">Thomas Martin</p>
                  <p className="text-sm text-gray-500">DSI, PME</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="text-center mt-10">
            <Button className="bg-[#0099FF] hover:bg-[#007ACC] text-white">
              Rejoignez-les aujourd'hui
            </Button>
          </div>
        </div>
      </section>
      
      {/* Pricing */}
      <section id="pricing" className="py-16 md:py-24 px-4 bg-[#F9F9F9]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-[#003366] text-center mb-4">Nos Tarifs</h2>
          <p className="text-lg text-center text-gray-600 mb-12 max-w-3xl mx-auto">
            Choisissez le plan qui correspond le mieux à vos besoins. Tous nos plans incluent nos fonctionnalités de sécurité essentielles pour vous protéger en ligne.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow border-t-4 border-[#0099FF]">
              <h3 className="text-2xl font-bold text-[#003366] mb-2">Plan mensuel</h3>
              <p className="text-gray-600 mb-4">Parfait pour les utilisateurs qui préfèrent une flexibilité mensuelle sans engagement à long terme.</p>
              <div className="mb-4">
                <span className="text-4xl font-bold text-[#003366]">9,99 €</span>
                <span className="text-gray-500">/mois</span>
              </div>
              <p className="text-gray-600 mb-6">Fonctionnalités complètes, mises à jour régulières et support 24/7.</p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-[#00CC66] mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span>Protection complète</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-[#00CC66] mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span>Mises à jour automatiques</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-[#00CC66] mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span>Support 24/7</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-[#00CC66] mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span>3 appareils</span>
                </li>
              </ul>
              <Link to="/signup">
                <Button className="w-full bg-[#0099FF] hover:bg-[#007ACC] text-white">
                  Choisir ce plan
                </Button>
              </Link>
            </div>
            
            <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow border-t-4 border-[#00CC66] relative">
              <div className="absolute top-0 right-0 bg-[#00CC66] text-white text-xs font-bold px-3 py-1 rounded-br-lg rounded-tl-lg">ÉCONOMISEZ 2 MOIS</div>
              <h3 className="text-2xl font-bold text-[#003366] mb-2">Plan annuel</h3>
              <p className="text-gray-600 mb-4">Notre offre la plus populaire avec une réduction importante pour un engagement annuel.</p>
              <div className="mb-4">
                <span className="text-4xl font-bold text-[#003366]">99,99 €</span>
                <span className="text-gray-500">/an</span>
              </div>
              <p className="text-gray-600 mb-6">Protection premium avec des avantages exclusifs pour nos abonnés annuels.</p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-[#00CC66] mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span>Protection complète</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-[#00CC66] mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span>Mises à jour automatiques</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-[#00CC66] mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span>Support prioritaire 24/7</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-[#00CC66] mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span>5 appareils</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-[#00CC66] mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span>Économisez 2 mois</span>
                </li>
              </ul>
              <Link to="/signup">
                <Button className="w-full bg-[#00CC66] hover:bg-[#00AA55] text-white">
                  Choisir ce plan
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA / Signup */}
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
      
      <Footer />
    </div>
  );
};

export default Landing;
