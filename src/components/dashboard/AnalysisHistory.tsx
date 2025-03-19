
import React from 'react';
import { Download, Check, AlertCircle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface Analysis {
  id: number;
  date: string;
  status: 'success' | 'failure';
  threatsDetected: number;
  threatsResolved: number;
  threatTypes: string[];
}

const AnalysisHistory = () => {
  const analyses: Analysis[] = [
    {
      id: 1,
      date: '15 juillet 2023, 14:30',
      status: 'success',
      threatsDetected: 3,
      threatsResolved: 3,
      threatTypes: ['Phishing', 'Malware']
    },
    {
      id: 2,
      date: '10 juillet 2023, 09:15',
      status: 'success',
      threatsDetected: 1,
      threatsResolved: 1,
      threatTypes: ['Vulnérabilité système']
    },
    {
      id: 3,
      date: '5 juillet 2023, 19:45',
      status: 'failure',
      threatsDetected: 5,
      threatsResolved: 2,
      threatTypes: ['Malware', 'Phishing', 'Intrusion']
    }
  ];

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="space-y-4">
          {analyses.map((analysis) => (
            <div key={analysis.id} className="p-4 border-b border-gray-200 last:border-0">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-2">
                <div className="flex items-center space-x-2">
                  {analysis.status === 'success' ? (
                    <Check className="h-5 w-5 text-green-500" />
                  ) : (
                    <AlertCircle className="h-5 w-5 text-red-500" />
                  )}
                  <h4 className="font-medium text-security-foreground">Analyse du {analysis.date}</h4>
                </div>
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                  analysis.status === 'success' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-red-100 text-red-800'
                }`}>
                  {analysis.status === 'success' ? 'Succès' : 'Échec'}
                </span>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-3">
                <div>
                  <p className="text-sm text-security-muted">Menaces détectées: <span className="font-medium">{analysis.threatsDetected}</span></p>
                  <p className="text-sm text-security-muted">Menaces résolues: <span className="font-medium">{analysis.threatsResolved}</span></p>
                </div>
                <div>
                  <p className="text-sm text-security-muted">Types de menaces:</p>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {analysis.threatTypes.map((type, index) => (
                      <span key={index} className="px-2 py-1 text-xs rounded-full bg-gray-100">{type}</span>
                    ))}
                  </div>
                </div>
              </div>
              
              <Button variant="outline" size="sm" className="flex items-center">
                <Download className="h-4 w-4 mr-1" />
                Télécharger le rapport
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default AnalysisHistory;
