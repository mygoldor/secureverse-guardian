
import React from 'react';
import { CreditCard, Check, Download, Calendar } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface Payment {
  id: number;
  date: string;
  amount: string;
  status: 'completed' | 'pending' | 'failed';
}

const Subscription = () => {
  const subscriptionData = {
    status: 'active',
    plan: 'Annuel',
    nextPayment: '15 août 2023',
    amount: '99,99 €'
  };
  
  const payments: Payment[] = [
    {
      id: 1,
      date: '15 juillet 2023',
      amount: '99,99 €',
      status: 'completed'
    },
    {
      id: 2,
      date: '15 juillet 2022',
      amount: '99,99 €',
      status: 'completed'
    },
    {
      id: 3,
      date: '15 juillet 2021',
      amount: '89,99 €',
      status: 'completed'
    }
  ];

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

  const getPaymentStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">Payé</span>;
      case 'pending':
        return <span className="px-2 py-1 text-xs font-medium rounded-full bg-yellow-100 text-yellow-800">En attente</span>;
      case 'failed':
        return <span className="px-2 py-1 text-xs font-medium rounded-full bg-red-100 text-red-800">Échec</span>;
      default:
        return null;
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card className="md:col-span-1">
        <CardContent className="pt-6">
          <div className="flex items-center space-x-3 mb-4">
            <CreditCard className="h-6 w-6 text-security-primary" />
            <h3 className="font-medium text-xl text-security-foreground">Mon abonnement</h3>
          </div>
          
          <div className="mt-4 space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-security-muted">Statut:</span>
              {getStatusBadge(subscriptionData.status)}
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-security-muted">Plan:</span>
              <span className="font-medium">{subscriptionData.plan}</span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-security-muted">Prochain paiement:</span>
              <span className="font-medium">{subscriptionData.nextPayment}</span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-security-muted">Montant:</span>
              <span className="font-medium">{subscriptionData.amount}</span>
            </div>
          </div>
          
          <div className="mt-6 pt-6 border-t border-gray-100 flex flex-col space-y-2">
            <Button variant="outline">Changer de plan</Button>
            <Button variant="outline" className="text-red-500 hover:text-red-700 hover:bg-red-50">
              Annuler l'abonnement
            </Button>
          </div>
        </CardContent>
      </Card>
      
      <Card className="md:col-span-2">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-medium text-security-foreground">Historique des paiements</h3>
            <Button variant="outline" size="sm" className="flex items-center">
              <Download className="h-4 w-4 mr-1" />
              Exporter
            </Button>
          </div>
          
          <div className="space-y-4">
            {payments.map((payment) => (
              <div key={payment.id} className="flex items-center justify-between p-3 border-b border-gray-100 last:border-0">
                <div className="flex items-center space-x-3">
                  <Calendar className="h-5 w-5 text-security-muted" />
                  <div>
                    <p className="font-medium text-security-foreground">{payment.date}</p>
                    <p className="text-sm text-security-muted">Plan Annuel</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <span className="font-medium">{payment.amount}</span>
                  {getPaymentStatusBadge(payment.status)}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Subscription;
