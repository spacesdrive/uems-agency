import { Suspense, useLayoutEffect, useRef, useState, type ReactNode } from 'react';
import { useLocation, useNavigationType } from 'react-router';
import { Footer } from '../components/Footer/Footer';
import { Header } from '../components/Header/Header';
import { WhatsAppButton } from '../components/WhatsAppButton';

function PageFallback() {
  return <div style={{ minHeight: '100vh' }} aria-busy="true" />;
}

export function SiteLayout({ children }: { children: ReactNode }) {
  const { pathname, hash } = useLocation();
  const navigationType = useNavigationType();
  const firstRender = useRef(true);
  const [navigated, setNavigated] = useState(false);
  const mainRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    setNavigated(true);
    if (hash) {
      document.getElementById(decodeURIComponent(hash.slice(1)))?.scrollIntoView();
    } else if (navigationType !== 'POP') {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    }
    mainRef.current?.focus({ preventScroll: true });
  }, [pathname, hash, navigationType]);

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Header />
      <Suspense fallback={<PageFallback />}>
        <main id="main" ref={mainRef} tabIndex={-1} key={pathname} className={navigated ? 'page-enter' : undefined}>
          {children}
        </main>
      </Suspense>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
