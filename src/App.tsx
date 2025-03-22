
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
            {/* Header component is now only rendered for authenticated routes */}
            <Routes>
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
                <>
                  <Header />
                  <Protection />
                </>
              } />
              <Route path="/privacy" element={
                <>
                  <Header />
                  <Privacy />
                </>
              } />
              <Route path="/performance" element={
                <>
                  <Header />
                  <Performance />
                </>
              } />
              <Route path="/settings" element={
                <>
                  <Header />
                  <Settings />
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
            <Toaster />
          </Router>
        </AuthProvider>
      </LanguageProvider>
    </React.StrictMode>
  );
};

export default App;
