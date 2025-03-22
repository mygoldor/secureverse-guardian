
import React, { useEffect } from 'react';
import HeroSection from '@/components/landing/HeroSection';
import FeaturesSection from '@/components/landing/FeaturesSection';
import PricingSection from '@/components/landing/PricingSection';
import TestimonialsSection from '@/components/landing/TestimonialsSection';
import CtaSection from '@/components/landing/CtaSection';
import LandingHeader from '@/components/landing/LandingHeader';
import Footer from '@/components/Footer';
import { useLanguage } from '@/contexts/LanguageContext';

const Home = () => {
  const { t } = useLanguage();

  // Handle smooth scrolling for anchor links
  useEffect(() => {
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLAnchorElement;
      
      if (target.tagName === 'A' && target.hash && target.hash.startsWith('#')) {
        e.preventDefault();
        const element = document.querySelector(target.hash);
        
        if (element) {
          window.scrollTo({
            top: element.getBoundingClientRect().top + window.scrollY - 80, // Account for header height
            behavior: 'smooth'
          });
        }
      }
    };

    document.addEventListener('click', handleAnchorClick);
    
    return () => {
      document.removeEventListener('click', handleAnchorClick);
    };
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <LandingHeader />
      <main>
        <HeroSection />
        <div id="features" className="scroll-mt-24">
          <FeaturesSection />
        </div>
        <div id="testimonials" className="scroll-mt-24">
          <TestimonialsSection />
        </div>
        <div id="pricing" className="scroll-mt-24">
          <PricingSection />
        </div>
        <div id="contact" className="scroll-mt-24">
          <CtaSection />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Home;
