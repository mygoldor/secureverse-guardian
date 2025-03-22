
import React from 'react';
import OneMonthPayment from '@/components/payment/OneMonthPayment';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

const OneMonthPaymentPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const handleSuccess = () => {
    toast({
      title: "Success!",
      description: "You've successfully subscribed to our monthly plan.",
    });
    
    // Navigate to dashboard after successful payment
    setTimeout(() => {
      navigate('/dashboard');
    }, 2000);
  };
  
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <main className="flex-grow container mx-auto py-12 px-4">
        <h1 className="text-3xl font-bold text-center mb-8">Get Your Monthly Subscription</h1>
        <div className="max-w-md mx-auto">
          <OneMonthPayment onSuccess={handleSuccess} />
        </div>
      </main>
    </div>
  );
};

export default OneMonthPaymentPage;
