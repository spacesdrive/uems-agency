import { PageHero } from '../components/PageHero';
import { Seo } from '../components/Seo';
import { site } from '../data/site';
import { ContactSection } from '../sections/ContactSection';

const path = '/contact-us';

export default function ContactPage() {
  return (
    <>
      <Seo
        title="Contact Us"
        description={`Contact UEMS Ventures in Mulund West, Mumbai. Call ${site.phones[0].display} or ${site.phones[1].display}, email ${site.email}, or send an enquiry — we respond within 24 hours.`}
        path={path}
      />
      <PageHero
        path={path}
        hero={{
          eyebrow: 'Contact us',
          title: 'Fill the form — we’ll get back within 24 hours',
          lead: [
            'Please complete the details below and click submit. Our expert team will get in touch with you within 24 hours to answer all your queries.',
          ],
          actions: [
            { label: 'Book appointment', to: site.appointmentUrl },
            { label: `Call ${site.phones[0].display}`, to: site.phones[0].href, variant: 'outline' },
          ],
        }}
      />
      <ContactSection />
    </>
  );
}
