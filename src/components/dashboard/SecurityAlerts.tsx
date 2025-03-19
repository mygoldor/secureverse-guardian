
import React from 'react';
import { AlertTriangle, Info, CheckCircle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface Alert {
  id: number;
  type: string;
  priority: 'high' | 'medium' | 'low';
  description: string;
  date: string;
  action: string;
}

const SecurityAlerts = () => {
  const alerts: Alert[] = [
    {
      id: 1,
      type: 'Tentative de phishing détectée',
      priority: 'high',
      description: 'Une tentative de connexion suspecte a été détectée sur votre compte',
      date: 'Aujourd\'hui, 10:23',
      action: 'Changer votre mot de passe'
    },
    {
      id: 2,
      type: 'Logiciel potentiellement malveillant',
      priority: 'medium',
      description: 'Un programme suspect a été détecté sur votre appareil',
      date: 'Hier, 15:45',
      action: 'Analyser et mettre en quarantaine'
    },
    {
      id: 3,
      type: 'Mise à jour de sécurité disponible',
      priority: 'low',
      description: 'Une mise à jour de sécurité importante est disponible pour votre système',
      date: 'Il y a 2 jours',
      action: 'Mettre à jour maintenant'
    }
  ];

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'high':
        return <span className="px-2 py-1 text-xs font-medium rounded-full bg-red-100 text-red-800">Haute priorité</span>;
      case 'medium':
        return <span className="px-2 py-1 text-xs font-medium rounded-full bg-orange-100 text-orange-800">Priorité moyenne</span>;
      case 'low':
        return <span className="px-2 py-1 text-xs font-medium rounded-full bg-yellow-100 text-yellow-800">Priorité basse</span>;
      default:
        return null;
    }
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'high':
        return <AlertTriangle className="h-5 w-5 text-red-500" />;
      case 'medium':
        return <AlertTriangle className="h-5 w-5 text-orange-500" />;
      case 'low':
        return <Info className="h-5 w-5 text-yellow-500" />;
      default:
        return null;
    }
  };

  return (
    <Card className="alerts">
      <CardContent className="pt-6">
        {alerts.length > 0 ? (
          <div className="space-y-4">
            {alerts.map((alert) => (
              <div key={alert.id} className="alert-item p-4 border-b border-gray-200 last:border-0">
                <div className="flex items-start">
                  <div className="mr-3">
                    {getPriorityIcon(alert.priority)}
                  </div>
                  <div className="flex-grow">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-2">
                      <h4 className="font-medium text-security-foreground">{alert.type}</h4>
                      {getPriorityBadge(alert.priority)}
                    </div>
                    <p className="text-sm text-security-muted mb-2">{alert.description}</p>
                    <p className="text-xs text-security-muted mb-3">{alert.date}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-security-primary">
                        {alert.action}
                      </span>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          En savoir plus
                        </Button>
                        <Button variant="outline" size="sm" className="flex items-center">
                          <CheckCircle className="h-4 w-4 mr-1" />
                          Résolu
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-8">
            <CheckCircle className="h-12 w-12 text-green-500 mb-3" />
            <p className="text-lg font-medium text-security-foreground">Aucune alerte active</p>
            <p className="text-sm text-security-muted">Votre système est actuellement sécurisé</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default SecurityAlerts;
