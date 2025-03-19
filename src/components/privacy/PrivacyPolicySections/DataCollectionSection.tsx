
import React from 'react';
import PrivacyPolicySection from '../PrivacyPolicySection';

const DataCollectionSection: React.FC = () => {
  return (
    <PrivacyPolicySection title="2. What data do we collect?">
      <p className="mb-3">
        We only collect data necessary to provide our services and ensure the security of your account.
      </p>
      
      <h4 className="font-medium mt-4 mb-2">Automatically collected data:</h4>
      <ul className="list-disc pl-5 mb-4">
        <li>IP address</li>
        <li>Device and browser information</li>
        <li>Log data (connection and activity logs)</li>
      </ul>
      
      <h4 className="font-medium mt-4 mb-2">User-provided data:</h4>
      <ul className="list-disc pl-5 mb-4">
        <li>First and last name</li>
        <li>Email address (unique for each account)</li>
        <li>Payment information (via Stripe, Mollie, or PayPal – we do not store your banking details)</li>
        <li>Account preferences and settings</li>
      </ul>
    </PrivacyPolicySection>
  );
};

export default DataCollectionSection;
