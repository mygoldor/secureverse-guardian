
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useLanguage } from '@/contexts/LanguageContext';
import { Shield, Eye, EyeOff } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { t } = useLanguage();
  const navigate = useNavigate();
  const { toast } = useToast();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate authentication
    setTimeout(() => {
      // For demo purposes, consider any login as successful
      // In a real app, you would verify credentials with a backend
      
      // Store user information in localStorage
      const userData = {
        id: 'user-123',
        email: email,
        name: 'Demo User',
        isAuthenticated: true,
        subscriptionActive: false // Default to false - requires payment
      };
      
      localStorage.setItem('user', JSON.stringify(userData));
      
      toast({
        title: "Connexion réussie",
        description: "Vous êtes maintenant connecté.",
      });
      
      setIsLoading(false);
      
      // Redirect to payment page since subscription is not active
      navigate('/payment');
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-[#F9F9F9] flex flex-col items-center justify-center px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-md">
        <div className="flex flex-col items-center mb-6">
          <Link to="/" className="flex items-center space-x-2 mb-6">
            <Shield className="h-8 w-8 text-[#003366]" />
            <span className="font-bold text-2xl text-[#003366]">Guardia</span>
          </Link>
          <h2 className="text-2xl font-bold text-[#003366] text-center">{t('login_to_guardia')}</h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">{t('email_address')}</Label>
            <Input 
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t('enter_your_email')}
              required
              className="w-full"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">{t('password')}</Label>
            <div className="relative">
              <Input 
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder={t('enter_your_password')}
                required
                className="w-full pr-10 text-foreground"
              />
              <button 
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <Button 
            type="submit" 
            className="w-full bg-[#003366] hover:bg-[#00509E] text-white"
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="flex items-center">
                <span className="animate-spin mr-2 h-4 w-4 border-2 border-white border-t-transparent rounded-full" />
                {t('login')}
              </span>
            ) : (
              t('login')
            )}
          </Button>
        </form>

        <div className="mt-6 text-center space-y-2">
          <Link to="/forgot-password" className="text-sm text-[#003366] hover:underline block">
            {t('forgot_password')}
          </Link>
          <Link to="/signup" className="text-sm text-[#003366] hover:underline block">
            {t('create_account')}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
