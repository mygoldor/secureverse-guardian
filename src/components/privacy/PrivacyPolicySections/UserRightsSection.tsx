
import React from 'react';
import PrivacyPolicySection from '../PrivacyPolicySection';

const UserRightsSection: React.FC = () => {
  return (
    <PrivacyPolicySection title="7. What are your rights?">
      <p className="mb-3">In accordance with GDPR, you have the following rights:</p>
      <ul className="mb-4">
        <li className="flex items-start mb-2">
          <span className="text-security-success font-bold mr-2">✓</span>
          <span><strong>Access</strong>: know what data we hold about you</span>
        </li>
        <li className="flex items-start mb-2">
          <span className="text-security-success font-bold mr-2">✓</span>
          <span><strong>Rectification</strong>: correct your personal information</span>
        </li>
        <li className="flex items-start mb-2">
          <span className="text-security-success font-bold mr-2">✓</span>
          <span><strong>Deletion</strong>: request deletion of your data (right to be forgotten)</span>
        </li>
        <li className="flex items-start mb-2">
          <span className="text-security-success font-bold mr-2">✓</span>
          <span><strong>Objection</strong>: refuse certain processing</span>
        </li>
        <li className="flex items-start mb-2">
          <span className="text-security-success font-bold mr-2">✓</span>
          <span><strong>Portability</strong>: retrieve your data in a machine-readable format</span>
        </li>
        <li className="flex items-start mb-2">
          <span className="text-security-success font-bold mr-2">✓</span>
          <span><strong>Restriction of processing</strong>: request temporary freeze of data use</span>
        </li>
      </ul>
      
      <h4 className="font-medium mt-4 mb-2">How to exercise your rights?</h4>
      <p className="mb-4">
        You can exercise your rights in two ways:
      </p>
      <ul className="mb-4 pl-5">
        <li className="mb-2">
          <strong>Settings page</strong>: Use the "Export My Data" and "Delete My Data" options in your account settings.
        </li>
        <li className="mb-2">
          <strong>Contact us</strong>: Email <strong>info@cybergard.eu</strong>
        </li>
      </ul>
      <p className="mb-4">
        We will process your request within <strong>30 days maximum</strong> as required by GDPR.
      </p>
      <p className="mb-4">
        If you believe we are not respecting your rights, you can file a complaint with the 
        <strong> Data Protection Authority</strong> (https://www.gegevensbeschermingsautoriteit.be).
      </p>
    </PrivacyPolicySection>
  );
};

export default UserRightsSection;
