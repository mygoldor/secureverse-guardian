
import React from 'react';
import PrivacyPolicySection from '../PrivacyPolicySection';

const DataRetentionSection: React.FC = () => {
  return (
    <PrivacyPolicySection title="6. How long do we keep your data?">
      <p className="mb-3">We keep your data only for <strong>as long as necessary</strong> to provide our services:</p>
      <ul className="list-disc pl-5 mb-4">
        <li><strong>Account data</strong>: deleted <strong>6 months after termination</strong></li>
        <li><strong>Payment data</strong>: kept <strong>in accordance with legal obligations</strong></li>
        <li><strong>Connection logs</strong>: deleted after <strong>12 months</strong></li>
      </ul>
      <p className="mb-4">You can request <strong>deletion of your data</strong> at any time (see section 7).</p>
    </PrivacyPolicySection>
  );
};

export default DataRetentionSection;
