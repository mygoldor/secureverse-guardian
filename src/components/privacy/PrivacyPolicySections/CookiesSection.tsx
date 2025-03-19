
import React from 'react';
import PrivacyPolicySection from '../PrivacyPolicySection';

const CookiesSection: React.FC = () => {
  return (
    <PrivacyPolicySection title="9. Cookies and tracking">
      <p className="mb-3">Guardia uses cookies only to:</p>
      <ul className="list-disc pl-5 mb-4">
        <li>Ensure proper website functioning (essential cookies)</li>
        <li>Remember your preferences (functional cookies)</li>
        <li>Improve performance and security (anonymized analytical cookies)</li>
      </ul>
      <p className="mb-4">
        <strong>You can refuse cookies</strong> via your browser settings or our cookie management banner.
      </p>
    </PrivacyPolicySection>
  );
};

export default CookiesSection;
