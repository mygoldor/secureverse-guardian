
import React from 'react';
import PrivacyPolicySection from '../PrivacyPolicySection';

const LegalBasisSection: React.FC = () => {
  return (
    <PrivacyPolicySection title="4. Legal basis for processing">
      <p className="mb-3">We collect and process your data only when:</p>
      <ul className="list-disc pl-5 mb-4">
        <li><strong>You have given your consent</strong> (e.g., newsletter subscription)</li>
        <li><strong>Processing is necessary to perform our contract</strong> (e.g., providing an active subscription)</li>
        <li><strong>We have a legal obligation</strong> (e.g., tax and anti-fraud obligations)</li>
        <li><strong>We have a legitimate interest</strong> (e.g., improving the security of our service)</li>
      </ul>
    </PrivacyPolicySection>
  );
};

export default LegalBasisSection;
