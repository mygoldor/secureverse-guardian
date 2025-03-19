
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import MentionsLegalesContent from '@/components/mentions/MentionsLegalesContent';

const MentionsLegales: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="max-w-7xl mx-auto px-4 py-8 text-gray-800">
        <div className="mt-8 bg-white rounded-lg shadow-sm border border-gray-100 p-6">
          <MentionsLegalesContent />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default MentionsLegales;
