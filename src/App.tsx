import { useState, useEffect, useMemo } from 'react';
import GrainOverlay from './components/layout/GrainOverlay';
import CustomCursor from './components/layout/CustomCursor';
import SmoothScroll from './components/layout/SmoothScroll';
import Navbar, { SECTIONS } from './components/layout/Navbar';
import ScrollIndicator from './components/layout/ScrollIndicator';
import Cover from './components/sections/Cover';
import Philosophy from './components/sections/Philosophy';
import Work from './components/sections/Work';
import CV from './components/sections/CV';
import Life from './components/sections/Life';
import Contact from './components/sections/Contact';

export default function App() {
  const [active, setActive] = useState('hero');
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    function onScroll() {
      const vh = window.innerHeight;
      const scrollY = window.scrollY;
      const docH = document.documentElement.scrollHeight - vh;
      setProgress(Math.min(1, Math.max(0, scrollY / Math.max(1, docH))));

      let bestId = SECTIONS[0].id;
      let bestDist = Infinity;
      for (const s of SECTIONS) {
        const el = document.querySelector(`[data-section="${s.id}"]`);
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        const center = rect.top + rect.height / 2;
        const dist = Math.abs(center - vh / 2);
        if (dist < bestDist) { bestDist = dist; bestId = s.id; }
      }
      setActive(bestId);
    }
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  function jumpTo(id: string) {
    const el = document.querySelector(`[data-section="${id}"]`);
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY - 8;
    window.scrollTo({ top, behavior: 'smooth' });
  }

  const activeIdx = useMemo(
    () => Math.max(0, SECTIONS.findIndex(s => s.id === active)),
    [active]
  );

  return (
    <>
      <SmoothScroll />
      <GrainOverlay />
      <CustomCursor />
      <Navbar active={active} onJump={jumpTo} />
      <ScrollIndicator progress={progress} activeIdx={activeIdx} sections={SECTIONS} />

      <Cover />
      <Philosophy />
      <Work />
      <CV />
      <Life />
      <Contact />
    </>
  );
}
