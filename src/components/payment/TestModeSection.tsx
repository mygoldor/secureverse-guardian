
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';

interface TestModeSectionProps {
  testMode: boolean;
  testCardNumber: string;
  onTestModeChange: (checked: boolean) => void;
  onTestCardNumberChange: (cardNumber: string) => void;
}

const TestModeSection: React.FC<TestModeSectionProps> = ({
  testMode,
  testCardNumber,
  onTestModeChange,
  onTestCardNumberChange
}) => {
  return (
    <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
      <div className="flex items-center space-x-2 mb-4">
        <Checkbox 
          id="test-mode" 
          checked={testMode} 
          onCheckedChange={(checked) => onTestModeChange(checked === true)}
        />
        <Label htmlFor="test-mode" className="font-medium">
          Mode Test
        </Label>
      </div>
      
      {testMode && (
        <div className="space-y-3">
          <div className="space-y-1">
            <Label htmlFor="card-number">Numéro de Carte Test</Label>
            <Input
              id="card-number"
              value={testCardNumber}
              onChange={(e) => onTestCardNumberChange(e.target.value)}
              placeholder="4242424242424242"
              className="font-mono"
            />
          </div>
          <div className="text-xs text-slate-500 space-y-1">
            <p>Cartes de Test:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Succès: 4242424242424242</li>
              <li>Refusée: 4000000000000002</li>
              <li>Refus générique: 4000000000000101</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default TestModeSection;
