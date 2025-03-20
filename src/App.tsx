
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { CookieConsentProvider } from "@/contexts/CookieConsentContext";
import CookieBanner from "@/components/cookies/CookieBanner";
import NotFound from "./pages/NotFound";
import Protection from "./pages/Protection";
import Privacy from "./pages/Privacy";
import Performance from "./pages/Performance";
import Settings from "./pages/Settings";
import TermsOfService from "./pages/TermsOfService";
import CookiesPolicy from "./pages/CookiesPolicy";
import MentionsLegales from "./pages/MentionsLegales";
import Landing from "./pages/Landing";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Payment from "./pages/Payment";
import InstallationGuide from "./pages/InstallationGuide";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <LanguageProvider>
      <CookieConsentProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/protection" element={<Protection />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/performance" element={<Performance />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/payment" element={<Payment />} />
              <Route path="/terms" element={<TermsOfService />} />
              <Route path="/cookies" element={<CookiesPolicy />} />
              <Route path="/mentions-legales" element={<MentionsLegales />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/installation-guide" element={<InstallationGuide />} />
              {/* Ancienne route pour maintenir la compatibilité */}
              <Route path="/help/installation-guide" element={<Navigate to="/installation-guide" replace />} />
              {/* Redirect any unknown routes to the 404 page */}
              <Route path="*" element={<NotFound />} />
            </Routes>
            <CookieBanner />
          </BrowserRouter>
        </TooltipProvider>
      </CookieConsentProvider>
    </LanguageProvider>
  </QueryClientProvider>
);

export default App;
