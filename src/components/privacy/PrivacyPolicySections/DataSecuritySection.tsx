
import React from 'react';
import PrivacyPolicySection from '../PrivacyPolicySection';

const DataSecuritySection: React.FC = () => {
  return (
    <PrivacyPolicySection title="8. Security of your data">
      <p className="mb-3">We implement <strong>strict security measures</strong> to protect your information:</p>
      <ul className="mb-4">
        <li className="flex items-start mb-2">
          <span className="text-security-success font-bold mr-2">✓</span>
          <span>Encryption of sensitive data</span>
        </li>
        <li className="flex items-start mb-2">
          <span className="text-security-success font-bold mr-2">✓</span>
          <span>Protection against attacks (firewall, 24/7 monitoring)</span>
        </li>
        <li className="flex items-start mb-2">
          <span className="text-security-success font-bold mr-2">✓</span>
          <span>Data access restricted to authorized personnel only</span>
        </li>
        <li className="flex items-start mb-2">
          <span className="text-security-success font-bold mr-2">✓</span>
          <span>Regular security audits</span>
        </li>
      </ul>
      <p className="mb-4">
        Despite these measures, <strong>no system is infallible</strong>. In case of a data breach, 
        we will inform you as soon as possible.
      </p>
    </PrivacyPolicySection>
  );
};

export default DataSecuritySection;
