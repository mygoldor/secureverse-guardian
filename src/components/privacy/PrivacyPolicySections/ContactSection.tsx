
import React from 'react';
import PrivacyPolicySection from '../PrivacyPolicySection';

const ContactSection: React.FC = () => {
  return (
    <PrivacyPolicySection title="11. Contact">
      <p className="mb-3">If you have any questions, you can contact us at:</p>
      <p className="mb-4">
        📩 <strong>Email</strong>: info@cybergard.eu
      </p>
      
      <p className="mt-8 text-center font-medium">
        This policy fully complies with <strong>GDPR</strong> and ensures <strong>transparency</strong> regarding the use of your data.
      </p>
    </PrivacyPolicySection>
  );
};

export default ContactSection;
