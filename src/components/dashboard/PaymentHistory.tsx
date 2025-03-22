
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Download, FileText, Clock } from 'lucide-react';
import { getPaymentAttempts } from '@/utils/stripe';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface Payment {
  id: string;
  created_at: string;
  amount: number;
  currency: string;
  status: string;
  plan_type: string;
}

const PaymentHistory = () => {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  
  useEffect(() => {
    const fetchPaymentHistory = async () => {
      try {
        setIsLoading(true);
        
        // Get the current user's email
        const { data: userData, error: userError } = await supabase.auth.getUser();
        
        if (userError) throw userError;
        
        const email = userData.user?.email;
        if (!email) {
          throw new Error('User email not found');
        }
        
        // Get payment attempts for the user's email
        const paymentData = await getPaymentAttempts(email);
        setPayments(paymentData);
      } catch (error) {
        console.error('Error fetching payment history:', error);
        toast({
          variant: "destructive",
          title: "Erreur",
          description: "Impossible de récupérer l'historique des paiements.",
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchPaymentHistory();
  }, [toast]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };
  
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR',
    }).format(amount / 100); // Convert cents to euros
  };
  
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'succeeded':
        return <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">Réussi</span>;
      case 'pending':
        return <span className="px-2 py-1 text-xs font-medium rounded-full bg-yellow-100 text-yellow-800">En attente</span>;
      case 'failed':
        return <span className="px-2 py-1 text-xs font-medium rounded-full bg-red-100 text-red-800">Échoué</span>;
      default:
        return <span className="px-2 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-800">{status}</span>;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <FileText className="h-5 w-5 text-security-primary" />
          <span>Historique des Paiements</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex justify-center py-4">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-security-primary"></div>
          </div>
        ) : payments.length === 0 ? (
          <div className="text-center py-6 text-gray-500">
            <Clock className="h-12 w-12 mx-auto mb-3 text-gray-300" />
            <p>Aucun historique de paiement disponible</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="px-4 py-3 text-left font-medium text-gray-500">Date</th>
                  <th className="px-4 py-3 text-left font-medium text-gray-500">Plan</th>
                  <th className="px-4 py-3 text-left font-medium text-gray-500">Montant</th>
                  <th className="px-4 py-3 text-left font-medium text-gray-500">Statut</th>
                  <th className="px-4 py-3 text-right font-medium text-gray-500">Action</th>
                </tr>
              </thead>
              <tbody>
                {payments.map((payment) => (
                  <tr key={payment.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="px-4 py-3">{formatDate(payment.created_at)}</td>
                    <td className="px-4 py-3 capitalize">{payment.plan_type}</td>
                    <td className="px-4 py-3">{formatCurrency(payment.amount)}</td>
                    <td className="px-4 py-3">{getStatusBadge(payment.status)}</td>
                    <td className="px-4 py-3 text-right">
                      <button 
                        className="text-blue-600 hover:text-blue-800"
                        title="Télécharger la facture"
                      >
                        <Download className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default PaymentHistory;
