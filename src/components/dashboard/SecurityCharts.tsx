
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent
} from '@/components/ui/chart';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line
} from 'recharts';

const SecurityCharts = () => {
  // Données pour le graphique des attaques bloquées
  const attacksData = [
    { name: 'Jan', value: 12 },
    { name: 'Fév', value: 19 },
    { name: 'Mar', value: 15 },
    { name: 'Avr', value: 21 },
    { name: 'Mai', value: 18 },
    { name: 'Juin', value: 24 },
    { name: 'Juil', value: 30 },
  ];
  
  // Données pour le diagramme circulaire des vulnérabilités
  const vulnerabilitiesData = [
    { name: 'Phishing', value: 45 },
    { name: 'Malware', value: 25 },
    { name: 'Vulnérabilité', value: 20 },
    { name: 'Autres', value: 10 },
  ];
  
  // Données pour le graphique de temps de réaction
  const reactionTimeData = [
    { name: 'Semaine 1', value: 24 },
    { name: 'Semaine 2', value: 18 },
    { name: 'Semaine 3', value: 15 },
    { name: 'Semaine 4', value: 12 },
    { name: 'Semaine 5', value: 10 },
  ];
  
  const COLORS = ['#0088FE', '#FF8042', '#FFBB28', '#00C49F'];

  return (
    <div className="charts grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card>
        <CardContent className="pt-6">
          <h3 className="font-medium mb-4 text-security-foreground">Attaques bloquées</h3>
          <div className="h-64">
            <ChartContainer 
              config={{ blue: { color: '#0088FE' } }}
              className="h-full w-full"
            >
              <BarChart data={attacksData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip content={<ChartTooltipContent />} />
                <Bar dataKey="value" fill="#0088FE" name="Attaques bloquées" />
              </BarChart>
            </ChartContainer>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="pt-6">
          <h3 className="font-medium mb-4 text-security-foreground">Types de vulnérabilités détectées</h3>
          <div className="h-64">
            <ChartContainer 
              config={{ 
                phishing: { color: '#0088FE' },
                malware: { color: '#FF8042' },
                vulnerability: { color: '#FFBB28' },
                other: { color: '#00C49F' }
              }}
              className="h-full w-full"
            >
              <PieChart>
                <Pie
                  data={vulnerabilitiesData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {vulnerabilitiesData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip content={<ChartTooltipContent />} />
              </PieChart>
            </ChartContainer>
          </div>
        </CardContent>
      </Card>
      
      <Card className="md:col-span-2">
        <CardContent className="pt-6">
          <h3 className="font-medium mb-4 text-security-foreground">Temps de réaction aux alertes (minutes)</h3>
          <div className="h-64">
            <ChartContainer 
              config={{ reaction: { color: '#00C49F' } }}
              className="h-full w-full"
            >
              <LineChart data={reactionTimeData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip content={<ChartTooltipContent />} />
                <Line type="monotone" dataKey="value" stroke="#00C49F" name="Temps de réaction" />
              </LineChart>
            </ChartContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SecurityCharts;
