
import React from 'react';
import { Separator } from '@/components/ui/separator';

interface PrivacyPolicySectionProps {
  title: string;
  children: React.ReactNode;
}

const PrivacyPolicySection: React.FC<PrivacyPolicySectionProps> = ({ title, children }) => {
  return (
    <>
      <h3 className="text-xl font-semibold mb-3 text-gray-900">{title}</h3>
      <div className="text-gray-800">
        {children}
      </div>
      <Separator className="my-6" />
    </>
  );
};

export default PrivacyPolicySection;
