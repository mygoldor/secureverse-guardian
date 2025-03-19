
import React from 'react';
import { Separator } from '@/components/ui/separator';

interface PrivacyPolicySectionProps {
  title: string;
  children: React.ReactNode;
}

const PrivacyPolicySection: React.FC<PrivacyPolicySectionProps> = ({ title, children }) => {
  return (
    <>
      <h3 className="text-xl font-semibold mb-3">{title}</h3>
      {children}
      <Separator className="my-6" />
    </>
  );
};

export default PrivacyPolicySection;
