
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

const App = () => {
  return (
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
            {/* Catch all route for pages that don't exist */}
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Toaster />
        </Router>
      </AuthProvider>
    </LanguageProvider>
  );
};

export default App;
