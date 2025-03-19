
import React from 'react';
import { Shield, Clock, Bell, AlertCircle, BarChart2, FileText, Settings, CreditCard } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SecuritySummary from '@/components/dashboard/SecuritySummary';
import SecurityAlerts from '@/components/dashboard/SecurityAlerts';
import SecurityCharts from '@/components/dashboard/SecurityCharts';
import AnalysisHistory from '@/components/dashboard/AnalysisHistory';
import SecuritySettings from '@/components/dashboard/SecuritySettings';
import Subscription from '@/components/dashboard/Subscription';

const Dashboard = () => {
  return (
    <div className="min-h-screen flex flex-col bg-[#F9F9F9]">
      <Header />
      
      <main className="flex-grow py-6 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Résumé de la sécurité */}
          <section className="mb-8">
            <h2 className="text-xl font-bold mb-4 text-[#003366]">Résumé de la sécurité</h2>
            <SecuritySummary />
          </section>
          
          {/* Alertes de Sécurité */}
          <section className="mb-8">
            <h2 className="text-xl font-bold mb-4 text-[#003366]">Alertes récentes</h2>
            <SecurityAlerts />
          </section>
          
          {/* Graphiques de Sécurité */}
          <section className="mb-8">
            <h2 className="text-xl font-bold mb-4 text-[#003366]">Analyse des menaces</h2>
            <SecurityCharts />
          </section>
          
          {/* Historique des Analyses */}
          <section className="mb-8">
            <h2 className="text-xl font-bold mb-4 text-[#003366]">Historique des analyses</h2>
            <AnalysisHistory />
          </section>
          
          {/* Paramètres de sécurité */}
          <section className="mb-8">
            <h2 className="text-xl font-bold mb-4 text-[#003366]">Paramètres de sécurité</h2>
            <SecuritySettings />
          </section>
          
          {/* Abonnement et Facturation */}
          <section className="mb-8">
            <h2 className="text-xl font-bold mb-4 text-[#003366]">Mon abonnement</h2>
            <Subscription />
          </section>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Dashboard;
