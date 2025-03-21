
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useLanguage } from '@/contexts/LanguageContext';
import { Shield, Eye, EyeOff } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { signUpUser } from '@/utils/authUtils';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { t } = useLanguage();
  const { toast } = useToast();
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Basic validation
    if (password !== confirmPassword) {
      toast({
        title: t('passwords_dont_match'),
        description: t('passwords_dont_match'),
        variant: "destructive",
      });
      setIsLoading(false);
      return;
    }
    
    // Call the signup function
    const result = await signUpUser(email, password, name);
    
    if (result.success) {
      toast({
        title: t('signup_success'),
        description: t('signup_success'),
      });
      
      // Redirect to payment page to complete subscription
      navigate('/payment');
    } else {
      toast({
        title: t('error'),
        description: result.error instanceof Error ? result.error.message : t('error'),
        variant: "destructive",
      });
    }
    
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#F9F9F9] flex flex-col items-center justify-center px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-md">
        <div className="flex flex-col items-center mb-6">
          <Link to="/" className="flex items-center space-x-2 mb-6">
            <Shield className="h-8 w-8 text-[#003366]" />
            <span className="font-bold text-2xl text-[#003366]">Guardia</span>
          </Link>
          <h2 className="text-2xl font-bold text-[#003366] text-center">{t('create_account_guardia') as string}</h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">{t('full_name') as string}</Label>
            <Input 
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={t('enter_your_name') as string}
              required
              className="w-full"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">{t('email_address') as string}</Label>
            <Input 
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t('enter_your_email') as string}
              required
              className="w-full"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">{t('password') as string}</Label>
            <div className="relative">
              <Input 
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder={t('enter_your_password') as string}
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

          <div className="space-y-2">
            <Label htmlFor="confirmPassword">{t('confirm_password') as string}</Label>
            <div className="relative">
              <Input 
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder={t('confirm_your_password') as string}
                required
                className="w-full pr-10 text-foreground"
              />
              <button 
                type="button"
                onClick={toggleConfirmPasswordVisibility}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
              >
                {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
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
                {t('signup') as string}
              </span>
            ) : (
              t('create_account') as string
            )}
          </Button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            {t('already_have_account') as string} {' '}
            <Link to="/login" className="text-[#003366] hover:underline">
              {t('login') as string}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
