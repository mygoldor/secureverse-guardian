
import React, { useEffect, useState } from 'react';
import { CreditCard, Check, Download, Calendar } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { getSuccessfulPayments, getPaymentStats } from '@/utils/stripe';
import { useToast } from '@/hooks/use-toast';
import PaymentHistory from './PaymentHistory';

interface Payment {
  id: string;
  created_at: string;
  amount: number;
  currency: string;
  status: string;
  plan_type: string;
}

interface SubscriptionStats {
  totalSpent: number;
  subscriptionsCount: number;
  latestPayment: Payment | null;
}

const Subscription = () => {
  const [stats, setStats] = useState<SubscriptionStats>({
    totalSpent: 0,
    subscriptionsCount: 0,
    latestPayment: null
  });
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchSubscriptionData = async () => {
      try {
        setIsLoading(true);
        const paymentStats = await getPaymentStats();
        setStats(paymentStats);
      } catch (error) {
        console.error('Error fetching subscription data:', error);
        toast({
          variant: "destructive",
          title: "Erreur",
          description: "Impossible de récupérer les données d'abonnement.",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchSubscriptionData();
  }, [toast]);

  const getSubscriptionStatus = () => {
    if (stats.latestPayment) {
      return stats.latestPayment.status === 'succeeded' ? 'active' : 'inactive';
    }
    return 'inactive';
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">Actif</span>;
      case 'inactive':
        return <span className="px-2 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-800">Inactif</span>;
      case 'expired':
        return <span className="px-2 py-1 text-xs font-medium rounded-full bg-red-100 text-red-800">Expiré</span>;
      default:
        return null;
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR',
    }).format(amount);
  };

  const getNextPaymentDate = () => {
    if (!stats.latestPayment) return 'Pas d\'abonnement actif';
    
    const latestPaymentDate = new Date(stats.latestPayment.created_at);
    const nextPaymentDate = new Date(latestPaymentDate);
    
    if (stats.latestPayment.plan_type === 'yearly') {
      nextPaymentDate.setFullYear(nextPaymentDate.getFullYear() + 1);
    } else {
      nextPaymentDate.setMonth(nextPaymentDate.getMonth() + 1);
    }
    
    return nextPaymentDate.toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  const getCurrentPlan = () => {
    if (!stats.latestPayment) return 'Aucun';
    return stats.latestPayment.plan_type === 'yearly' ? 'Annuel' : 'Mensuel';
  };

  const getCurrentAmount = () => {
    if (!stats.latestPayment) return '0,00 €';
    return formatCurrency(stats.latestPayment.amount / 100);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card className="md:col-span-1">
        <CardContent className="pt-6">
          <div className="flex items-center space-x-3 mb-4">
            <CreditCard className="h-6 w-6 text-security-primary" />
            <h3 className="font-medium text-xl text-security-foreground">Mon abonnement</h3>
          </div>
          
          {isLoading ? (
            <div className="flex justify-center py-4">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-security-primary"></div>
            </div>
          ) : (
            <>
              <div className="mt-4 space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-security-muted">Statut:</span>
                  {getStatusBadge(getSubscriptionStatus())}
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-security-muted">Plan:</span>
                  <span className="font-medium">{getCurrentPlan()}</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-security-muted">Prochain paiement:</span>
                  <span className="font-medium">{getNextPaymentDate()}</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-security-muted">Montant:</span>
                  <span className="font-medium">{getCurrentAmount()}</span>
                </div>
              </div>
              
              <div className="mt-6 pt-6 border-t border-gray-100 flex flex-col space-y-2">
                <Button variant="outline">Changer de plan</Button>
                <Button variant="outline" className="text-red-500 hover:text-red-700 hover:bg-red-50">
                  Annuler l'abonnement
                </Button>
              </div>
            </>
          )}
        </CardContent>
      </Card>
      
      <div className="md:col-span-2">
        <PaymentHistory />
      </div>
    </div>
  );
};

export default Subscription;
