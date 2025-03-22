
import React from 'react';
import { Shield } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';

const Home = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-[#F9F9F9] flex flex-col items-center justify-center px-4 py-16">
      <div className="w-full max-w-4xl bg-white p-8 rounded-xl shadow-md text-center">
        <div className="flex flex-col items-center mb-8">
          <Shield className="h-12 w-12 text-[#003366] mb-4" />
          <h1 className="text-3xl font-bold text-[#003366]">Guardia</h1>
          <p className="text-lg text-gray-600 mt-2">
            {t('app_description') || 'Your trusted security solution'}
          </p>
        </div>

        <div className="space-y-6">
          <p className="text-gray-700">
            {t('welcome_message') || 'Welcome to Guardia, your comprehensive security solution. Please log in or create an account to access your dashboard.'}
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">
            <Link to="/login">
              <Button className="w-full sm:w-auto bg-[#003366] hover:bg-[#00509E] text-white">
                {t('login') || 'Login'}
              </Button>
            </Link>
            
            <Link to="/signup">
              <Button variant="outline" className="w-full sm:w-auto border-[#003366] text-[#003366] hover:bg-[#eef2f7]">
                {t('signup') || 'Create Account'}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
