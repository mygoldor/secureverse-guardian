
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getPaymentAttempts } from '@/utils/stripeClient';
import { useToast } from '@/hooks/use-toast';
import { Download, CreditCard } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';

interface Payment {
  id: string;
  stripe_payment_id: string;
  amount: number;
  currency: string;
  status: string;
  created_at: string;
  plan_type: string;
  customer_email: string;
  last_four?: string;
  card_brand?: string;
}

const PaymentHistory: React.FC = () => {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        setIsLoading(true);
        
        // Get current user email
        const { data: userData } = await supabase.auth.getUser();
        const email = userData.user?.email;
        
        if (email) {
          const paymentsData = await getPaymentAttempts(email);
          setPayments(paymentsData);
        }
      } catch (error) {
        console.error('Error fetching payments:', error);
        toast({
          variant: "destructive",
          title: "Erreur",
          description: "Impossible de récupérer l'historique des paiements.",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchPayments();
  }, [toast]);

  const formatCurrency = (amount: number, currency: string) => {
    const formatter = new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: currency.toUpperCase(),
    });
    
    // Convert from cents to euros or other currency
    return formatter.format(amount / 100);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'succeeded':
        return <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">Payé</span>;
      case 'processing':
        return <span className="px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800">En cours</span>;
      case 'requires_payment_method':
        return <span className="px-2 py-1 text-xs font-medium rounded-full bg-yellow-100 text-yellow-800">En attente</span>;
      case 'failed':
        return <span className="px-2 py-1 text-xs font-medium rounded-full bg-red-100 text-red-800">Échec</span>;
      default:
        return <span className="px-2 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-800">{status}</span>;
    }
  };

  const getPlanLabel = (plan: string) => {
    return plan === 'yearly' ? 'Abonnement Annuel' : 'Abonnement Mensuel';
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-xl">Historique des Paiements</CardTitle>
        <Button variant="outline" size="sm" className="flex items-center">
          <Download className="h-4 w-4 mr-1" />
          Exporter
        </Button>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex justify-center py-4">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-security-primary"></div>
          </div>
        ) : payments.length === 0 ? (
          <div className="text-center py-6 text-gray-500">
            <CreditCard className="h-12 w-12 mx-auto mb-2 text-gray-400" />
            <p>Aucun paiement trouvé</p>
          </div>
        ) : (
          <div className="space-y-4">
            {payments.map((payment) => (
              <div key={payment.id} className="flex items-center justify-between p-3 border-b border-gray-100 last:border-0">
                <div className="flex items-center space-x-3">
                  <CreditCard className="h-5 w-5 text-security-muted" />
                  <div>
                    <p className="font-medium text-security-foreground">{formatDate(payment.created_at)}</p>
                    <p className="text-sm text-security-muted">{getPlanLabel(payment.plan_type)}</p>
                    {payment.last_four && (
                      <p className="text-xs text-security-muted">
                        {payment.card_brand} **** {payment.last_four}
                      </p>
                    )}
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <span className="font-medium">{formatCurrency(payment.amount, payment.currency)}</span>
                  {getStatusBadge(payment.status)}
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default PaymentHistory;
