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
import SimpleCookieBanner from '@/components/cookies/SimpleCookieBanner';

const App = () => {
  return (
    <LanguageProvider>
      <AuthProvider>
        <Router>
          <Routes>
            {/* Home route without additional header */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/payment" element={<Payment />} />
            <Route path="/dashboard" element={
              <AuthGuard>
                <Header />
                <Dashboard />
              </AuthGuard>
            } />
            <Route path="/protection" element={
              <AuthGuard>
                <Header />
                <Protection />
              </AuthGuard>
            } />
            <Route path="/privacy" element={
              <AuthGuard>
                <Header />
                <Privacy />
              </AuthGuard>
            } />
            <Route path="/performance" element={
              <AuthGuard>
                <Header />
                <Performance />
              </AuthGuard>
            } />
            <Route path="/settings" element={
              <AuthGuard>
                <Header />
                <Settings />
              </AuthGuard>
            } />
            <Route path="/mentions-legales" element={
              <AuthGuard>
                <Header />
                <MentionsLegales />
              </AuthGuard>
            } />
            <Route path="/cookies" element={
              <AuthGuard>
                <Header />
                <CookiesPolicy />
              </AuthGuard>
            } />
            <Route path="/terms" element={
              <AuthGuard>
                <Header />
                <TermsOfService />
              </AuthGuard>
            } />
            {/* Catch all route for pages that don't exist */}
            <Route path="*" element={<NotFound />} />
          </Routes>
          <SimpleCookieBanner />
          <Toaster />
        </Router>
      </AuthProvider>
    </LanguageProvider>
  );
};

export default App;
