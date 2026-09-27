import { Seo } from '../components/Seo';
import { homeMeta, profileServices, services } from '../data/home';
import { site } from '../data/site';
import { ContactSection } from '../sections/ContactSection';
import { Accelerator } from '../sections/home/Accelerator';
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
  address: [
    {
      '@type': 'PostalAddress',
      streetAddress: '416 Marathon Max, LBS Marg, Mulund West',
      addressLocality: 'Mumbai',
      postalCode: '400080',
      addressCountry: 'IN',
    },
    {
      '@type': 'PostalAddress',
      streetAddress: '526/368 Sussex Street',
      addressLocality: 'Sydney',
      addressRegion: 'NSW',
      postalCode: '2000',
      addressCountry: 'AU',
    },
  ],
  sameAs: site.socials.map((s) => s.href),
};

export default function HomePage() {
  return (
    <>
      <Seo title={homeMeta.title} description={homeMeta.description} path="/" jsonLd={organisation} />
      <HomeHero />
      <MediaGrid index={1} id="services-title" label="What we do" title="Study abroad, career counselling & migration" items={services} />
      <Accelerator index={2} />
      <WhyUems index={3} />
      <Approach index={4} />
      <Metrics index={5} />
      <Destinations index={6} />
      <MediaGrid
        index={7}
        id="profile-title"
        label={profileServices.label}
        title={profileServices.title}
        intro={profileServices.intro}
        items={profileServices.items}
      />
      <Founder index={8} />
      <Reviews index={9} />
      <Insights index={10} />
      <TeamAffiliations index={11} />
      <ContactSection index={12} />
    </>
  );
}
