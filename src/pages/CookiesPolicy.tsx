
import React from 'react';
import Footer from '@/components/Footer';
import CookiesPolicyContent from '@/components/cookies/CookiesPolicyContent';

const CookiesPolicy: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-7xl mx-auto px-4 py-8 text-gray-800">
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
          <CookiesPolicyContent />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CookiesPolicy;
