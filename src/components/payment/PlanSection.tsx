
import React from 'react';
import PlanOption from '@/components/payment/PlanOption';

interface PlanSectionProps {
  selectedPlan: 'monthly' | 'yearly';
  onPlanChange: (plan: 'monthly' | 'yearly') => void;
}

const PlanSection: React.FC<PlanSectionProps> = ({ selectedPlan, onPlanChange }) => {
  return (
    <section className="mb-12 text-center">
      <h2 className="text-3xl font-bold mb-6 text-security-primary">Protégez vos appareils dès aujourd'hui</h2>
      
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <PlanOption
          title="Mensuel"
          price="9,99€"
          period="/mois"
          isSelected={selectedPlan === 'monthly'}
          onSelect={() => onPlanChange('monthly')}
        />
        
        <PlanOption
          title="Annuel"
          price="99,99€"
          period="/an"
          isSelected={selectedPlan === 'yearly'}
          onSelect={() => onPlanChange('yearly')}
          discount="2 mois offerts"
        />
      </div>
    </section>
  );
};

export default PlanSection;
