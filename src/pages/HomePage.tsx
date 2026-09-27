import { Seo } from '../components/Seo';
import { homeMeta, profileServices, services } from '../data/home';
import { site } from '../data/site';
import { ContactSection } from '../sections/ContactSection';
import { Approach } from '../sections/home/Approach';
import { Destinations } from '../sections/home/Destinations';
import { Founder } from '../sections/home/Founder';
import { HomeHero } from '../sections/home/HomeHero';
import { Insights } from '../sections/home/Insights';
import { MediaGrid } from '../sections/home/MediaGrid';
import { Metrics } from '../sections/home/Metrics';
import { Reviews } from '../sections/home/Reviews';
import { TeamAffiliations } from '../sections/home/TeamAffiliations';
import { WhyUems } from '../sections/home/WhyUems';

const organisation = {
  '@context': 'https://schema.org',
  '@type': 'EducationalOrganization',
  name: site.name,
  alternateName: site.fullName,
  url: site.url,
  logo: `${site.url}/images/brand-logo.webp`,
  email: site.email,
  telephone: site.phones.map((p) => p.display),
  foundingDate: '2009',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '416 Marathon Max, LBS Marg, Mulund West',
    addressLocality: 'Mumbai',
    postalCode: '400080',
    addressCountry: 'IN',
  },
  sameAs: site.socials.map((s) => s.href),
};

export default function HomePage() {
  return (
    <>
      <Seo title={homeMeta.title} description={homeMeta.description} path="/" jsonLd={organisation} />
      <HomeHero />
      <WhyUems index={1} />
      <MediaGrid index={2} id="services-title" label="What we do" title="Our services" items={services} />
      <Approach index={3} />
      <Metrics index={4} />
      <Destinations index={5} />
      <MediaGrid
        index={6}
        id="profile-title"
        label={profileServices.label}
        title={profileServices.title}
        intro={profileServices.intro}
        items={profileServices.items}
      />
      <Founder index={7} />
      <Reviews index={8} />
      <Insights index={9} />
      <TeamAffiliations index={10} />
      <ContactSection index={11} />
    </>
  );
}
