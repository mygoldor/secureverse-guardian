import React from 'react';
import { Link } from 'react-router-dom';
import HeroSection from '@/components/HeroSection';
import FeaturesSection from '@/components/FeaturesSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import Footer from '@/components/Footer';
import { CreditCard } from 'lucide-react';

const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-white text-gray-800">
      <HeroSection />
      <FeaturesSection />
      <TestimonialsSection />
      <Footer />
      <div className="mt-8">
        <Link
          to="/one-month-payment"
          className="inline-flex items-center px-6 py-3 bg-security-primary hover:bg-security-primary/90 text-white font-medium rounded-lg shadow-md"
        >
          <CreditCard className="w-5 h-5 mr-2" />
          Get One-Month Subscription
        </Link>
      </div>
    </div>
  );
};

export default Home;
