import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    // Anchored navigation (e.g. /#achievements) — position at the target
    // section instead of the top of the page.
    if (hash) {
      const id = hash.replace('#', '');
      let attempts = 0;
      const scrollToTarget = () => {
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        } else if (attempts < 20) {
          attempts += 1;
          window.requestAnimationFrame(scrollToTarget);
        }
      };
      scrollToTarget();
      return;
    }

    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [pathname, hash]);

  return null;
}
