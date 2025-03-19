
import React from 'react';
import { Check } from 'lucide-react';

interface PlanOptionProps {
  title: string;
  price: string;
  period: string;
  isSelected: boolean;
  onSelect: () => void;
  discount?: string;
}

const PlanOption: React.FC<PlanOptionProps> = ({
  title,
  price,
  period,
  isSelected,
  onSelect,
  discount
}) => {
  return (
    <div 
      className={`border rounded-lg p-6 cursor-pointer transition-all ${
        isSelected 
          ? 'border-security-primary bg-blue-50 shadow-md' 
          : 'border-gray-200 hover:border-gray-300 hover:shadow'
      }`}
      onClick={onSelect}
    >
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-bold text-xl">{title}</h3>
        {isSelected && (
          <div className="bg-security-primary rounded-full p-1">
            <Check className="h-4 w-4 text-white" />
          </div>
        )}
      </div>
      
      <div className="mb-2">
        <span className="text-3xl font-bold">{price}</span>
        <span className="text-gray-600">{period}</span>
      </div>
      
      {discount && (
        <div className="inline-block bg-green-100 text-green-800 px-2 py-1 rounded text-sm font-medium">
          {discount}
        </div>
      )}
    </div>
  );
};

export default PlanOption;
