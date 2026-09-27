import { useLocation } from 'react-router';
import { PageHero } from '../components/PageHero';
import { Seo } from '../components/Seo';

export default function NotFoundPage() {
  const { pathname } = useLocation();
  return (
    <>
      <Seo title="Page not found" description="The page you are looking for could not be found." path={pathname} noIndex />
      <PageHero
        path={pathname}
        hero={{
          eyebrow: 'Error 404',
          title: 'We couldn’t find that page',
          lead: ['The page may have moved or no longer exists. Try one of these instead, or get in touch and we’ll help.'],
          actions: [
            { label: 'Back to home', to: '/' },
            { label: 'Study abroad', to: '/study-abroad-consultants', variant: 'outline' },
            { label: 'Contact us', to: '/contact-us', variant: 'outline' },
          ],
        }}
      />
    </>
  );
}
