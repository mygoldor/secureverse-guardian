
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from "@/components/ui/toaster";
import { AuthProvider } from '@/hooks/useAuth';
import Login from '@/pages/Login';
import Signup from '@/pages/Signup';
import Dashboard from '@/pages/Dashboard';
import Header from '@/components/Header';
import AuthGuard from '@/components/guards/AuthGuard';
import Payment from '@/pages/Payment';
import Home from '@/pages/Home';
import NotFound from '@/pages/NotFound';
import { LanguageProvider } from '@/contexts/LanguageContext';
import Protection from '@/pages/Protection';
import Privacy from '@/pages/Privacy';
import Performance from '@/pages/Performance';
import Settings from '@/pages/Settings';
import MentionsLegales from '@/pages/MentionsLegales';
import CookiesPolicy from '@/pages/CookiesPolicy';
import TermsOfService from '@/pages/TermsOfService';
import { CookieConsentProvider } from '@/contexts/CookieConsentContext';
import SimpleCookieBanner from '@/components/cookies/SimpleCookieBanner';
import OneMonthPaymentPage from './pages/OneMonthPayment';

const App: React.FC = () => {
  return (
    <Router>
      <LanguageProvider>
        <AuthProvider>
          <CookieConsentProvider>
            <Routes>
              {/* Home route without additional header */}
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/payment" element={<Payment />} />
              <Route path="/one-month-payment" element={<OneMonthPaymentPage />} />
              
              {/* Protected routes that require authentication and subscription */}
              <Route path="/dashboard" element={
                <AuthGuard>
                  <Dashboard />
                </AuthGuard>
              } />
              <Route path="/protection" element={
                <AuthGuard>
                  <Protection />
                </AuthGuard>
              } />
              <Route path="/performance" element={
                <AuthGuard>
                  <Performance />
                </AuthGuard>
              } />
              <Route path="/settings" element={
                <AuthGuard>
                  <Settings />
                </AuthGuard>
              } />
              
              {/* Legal pages - publicly accessible */}
              <Route path="/privacy" element={
                <>
                  <Header />
                  <Privacy />
                </>
              } />
              <Route path="/mentions-legales" element={
                <>
                  <Header />
                  <MentionsLegales />
                </>
              } />
              <Route path="/cookies" element={
                <>
                  <Header />
                  <CookiesPolicy />
                </>
              } />
              <Route path="/terms" element={
                <>
                  <Header />
                  <TermsOfService />
                </>
              } />
              
              {/* Catch all route for pages that don't exist */}
              <Route path="*" element={<NotFound />} />
            </Routes>
            <SimpleCookieBanner />
            <Toaster />
          </CookieConsentProvider>
        </AuthProvider>
      </LanguageProvider>
    </Router>
  );
};

export default App;
