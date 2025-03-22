
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from "@/components/ui/toaster";
import { AuthProvider } from '@/hooks/auth/AuthContext';
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

const App = () => {
  return (
    <React.StrictMode>
      <LanguageProvider>
        <AuthProvider>
          <Router>
            <Header />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/payment" element={<Payment />} />
              <Route path="/dashboard" element={<AuthGuard><Dashboard /></AuthGuard>} />
              <Route path="/protection" element={<Protection />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/performance" element={<Performance />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/mentions-legales" element={<MentionsLegales />} />
              <Route path="/cookies" element={<CookiesPolicy />} />
              <Route path="/terms" element={<TermsOfService />} />
              {/* Catch all route for pages that don't exist */}
              <Route path="*" element={<NotFound />} />
            </Routes>
            <Toaster />
          </Router>
        </AuthProvider>
      </LanguageProvider>
    </React.StrictMode>
  );
};

export default App;
