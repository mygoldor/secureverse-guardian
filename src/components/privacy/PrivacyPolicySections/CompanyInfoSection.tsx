
import React from 'react';
import PrivacyPolicySection from '../PrivacyPolicySection';

const CompanyInfoSection: React.FC = () => {
  return (
    <PrivacyPolicySection title="1. Who are we?">
      <p className="mb-4">
        Guardia is a cybersecurity solution designed to protect individuals and businesses against online threats. 
        We are responsible for processing the personal data we collect.
      </p>
      <div className="bg-gray-50 p-4 rounded-md mb-4">
        <h4 className="font-medium mb-2">Data controller contact information:</h4>
        <ul className="list-disc pl-5 space-y-1">
          <li><strong>Company name</strong>: Guardia Cybersecurity SRL</li>
          <li><strong>Address</strong>: 123 Security Street, 1000 Brussels, Belgium</li>
          <li><strong>Contact email</strong>: privacy@guardia-security.com</li>
        </ul>
      </div>
    </PrivacyPolicySection>
  );
};

export default CompanyInfoSection;
