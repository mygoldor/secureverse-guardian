
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import HeroSection from '@/components/landing/HeroSection';
import FeaturesSection from '@/components/landing/FeaturesSection';
import TestimonialsSection from '@/components/landing/TestimonialsSection';
import PricingSection from '@/components/landing/PricingSection';
import CtaSection from '@/components/landing/CtaSection';
import LandingHeader from '@/components/landing/LandingHeader';
import Footer from '@/components/Footer';

const Home: React.FC = () => {
  return (
    <div className="min-h-screen">
      <LandingHeader />
      <HeroSection />
      <FeaturesSection />
      <TestimonialsSection />
      <PricingSection />
      <CtaSection />
      <Footer />
    </div>
  );
};

export default Home;
