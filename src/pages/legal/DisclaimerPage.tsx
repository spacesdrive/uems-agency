import { Button } from '../../components/Button';
import { site } from '../../data/site';
import { LegalPage } from './LegalPage';

export default function DisclaimerPage() {
  return (
    <LegalPage
      path="/disclaimer"
      eyebrow="Disclaimer"
      title="Disclaimer"
      noIndex
      description="The UEMS Ventures website disclaimer."
    >
      <div style={{ display: 'grid', gap: 24, justifyItems: 'start' }}>
        <p className="t-lead">Our disclaimer is coming soon.</p>
        <p className="t-body">
          For any questions in the meantime, email <a className="inline-link" href={`mailto:${site.email}`}>{site.email}</a> or call{' '}
          <a className="inline-link" href={site.phones[0].href}>
            {site.phones[0].display}
          </a>
          .
        </p>
        <Button to="/contact-us" label="Contact us" />
      </div>
    </LegalPage>
  );
}
