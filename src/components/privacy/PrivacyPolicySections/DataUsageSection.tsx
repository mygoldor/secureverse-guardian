
import React from 'react';
import PrivacyPolicySection from '../PrivacyPolicySection';

const DataUsageSection: React.FC = () => {
  return (
    <PrivacyPolicySection title="3. Why do we collect your data?">
      <p className="mb-3">We use your data only to:</p>
      <ul className="mb-4">
        <li className="flex items-start mb-2">
          <span className="text-security-success font-bold mr-2">✓</span>
          <span>Manage and secure your account</span>
        </li>
        <li className="flex items-start mb-2">
          <span className="text-security-success font-bold mr-2">✓</span>
          <span>Provide our services and ensure their proper functioning</span>
        </li>
        <li className="flex items-start mb-2">
          <span className="text-security-success font-bold mr-2">✓</span>
          <span>Improve user experience and our features</span>
        </li>
        <li className="flex items-start mb-2">
          <span className="text-security-success font-bold mr-2">✓</span>
          <span>Send you security notifications and reports</span>
        </li>
        <li className="flex items-start mb-2">
          <span className="text-security-success font-bold mr-2">✓</span>
          <span>Comply with our legal obligations and prevent fraud</span>
        </li>
      </ul>
    </PrivacyPolicySection>
  );
};

export default DataUsageSection;
