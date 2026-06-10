import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const NAV_OFFSET = 72; // sticky navbar height

export default function ScrollToHash() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const id = hash.replace('#', '');
      // Wait a tick so the target section is mounted (e.g. after route change).
      const timer = setTimeout(() => {
        const el = document.getElementById(id);
        if (el) {
          const y =
            el.getBoundingClientRect().top + window.scrollY - NAV_OFFSET;
          window.scrollTo({ top: y, behavior: 'smooth' });
        }
      }, 80);
      return () => clearTimeout(timer);
    }

    window.scrollTo({ top: 0, left: 0 });
  }, [pathname, hash]);

  return null;
}
