
import React, { useState, useEffect } from 'react';
import Footer from '@/components/Footer';
import LandingHeader from '@/components/landing/LandingHeader';
import HeroSection from '@/components/landing/HeroSection';
import FeaturesSection from '@/components/landing/FeaturesSection';
import TestimonialsSection from '@/components/landing/TestimonialsSection';
import PricingSection from '@/components/landing/PricingSection';
import CtaSection from '@/components/landing/CtaSection';
import { useToast } from '@/hooks/use-toast';

const Landing = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    // Initialize page with error handling
    try {
      // Simulate loading to ensure components are properly mounted
      const timer = setTimeout(() => {
        setIsLoading(false);
        console.log('Landing page loaded successfully');
      }, 300);
      
      return () => clearTimeout(timer);
    } catch (err) {
      console.error('Error initializing landing page:', err);
      setError(err instanceof Error ? err : new Error('Unknown error loading page'));
      setIsLoading(false);
      
      toast({
        variant: "destructive",
        title: "Erreur de chargement",
        description: "Une erreur s'est produite lors du chargement de la page. Veuillez réessayer.",
      });
    }
  }, [toast]);

  // Display loading state
  if (isLoading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-white">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-security-primary"></div>
      </div>
    );
  }

  // Display error state if there's an error
  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white p-4">
        <h2 className="text-2xl font-bold text-red-600 mb-4">Une erreur s'est produite</h2>
        <p className="text-gray-600 mb-6">Nous ne pouvons pas charger la page en ce moment. Veuillez réessayer plus tard.</p>
        <button 
          className="px-4 py-2 bg-security-primary text-white rounded hover:bg-security-primary/90"
          onClick={() => window.location.reload()}
        >
          Actualiser la page
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
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

export default Landing;
