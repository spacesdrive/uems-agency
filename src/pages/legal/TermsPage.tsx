import { terms } from '../../data/legal/terms';
import { LegalPage } from './LegalPage';

export default function TermsPage() {
  return (
    <LegalPage
      path="/terms-conditions"
      eyebrow="Terms & conditions"
      document={terms}
      description="Terms and conditions for using the UEMS Ventures website, operated by Freydiya Educare Services Private Limited."
    />
  );
}
