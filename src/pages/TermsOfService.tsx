
import React from 'react';
import Header from '@/components/Header';
import { Separator } from '@/components/ui/separator';
import TermsContent from '@/components/terms/TermsContent';
import Footer from '@/components/Footer';

const TermsOfService = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <main className="flex-grow max-w-4xl mx-auto px-4 py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-security-foreground">Conditions Générales d'Utilisation</h1>
          <p className="text-security-muted mt-2">Dernière mise à jour : 1 juin 2023</p>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
          <TermsContent />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default TermsOfService;
