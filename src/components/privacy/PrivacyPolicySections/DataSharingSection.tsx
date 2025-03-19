
import React from 'react';
import PrivacyPolicySection from '../PrivacyPolicySection';

const DataSharingSection: React.FC = () => {
  return (
    <PrivacyPolicySection title="5. Who do we share your data with?">
      <p className="mb-3 font-medium">Your data is <strong>never sold</strong>. We share it only with:</p>
      <ul className="list-disc pl-5 mb-4">
        <li><strong>Payment providers</strong>: Stripe, Mollie, PayPal (for secure payment processing)</li>
        <li><strong>Hosting and infrastructure</strong>: Combell (for secure data storage)</li>
        <li><strong>Analytics services</strong>: (optional) Google Analytics, Matomo (with IP anonymization enabled)</li>
      </ul>
      <p className="mb-4">We require these partners to comply with applicable laws and protect your data.</p>
    </PrivacyPolicySection>
  );
};

export default DataSharingSection;
