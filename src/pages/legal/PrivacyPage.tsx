import { privacy } from '../../data/legal/privacy';
import { LegalPage } from './LegalPage';

export default function PrivacyPage() {
  return (
    <LegalPage
      path="/privacy-policy"
      eyebrow="Privacy policy"
      document={privacy}
      description="How UEMS Ventures processes and protects the personal information you share with us."
    />
  );
}
