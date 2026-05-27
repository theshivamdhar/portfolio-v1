import { useEffect, useRef } from 'react';
import { motion, type Variants } from 'framer-motion';
import Stamp from '../ui/Stamp';
import Ticker from '../ui/Ticker';
import Barcode from '../ui/Barcode';
import { tickerItems } from '../../data/content';

const NAME_CHARS = [
  { ch: 'S', cls: 'tilt-a' }, { ch: 'H', cls: 'tilt-b' }, { ch: 'I', cls: 'tilt-c' },
  { ch: 'V', cls: 'tilt-d' }, { ch: 'A', cls: 'tilt-e' }, { ch: 'M', cls: 'tilt-f' },
];
const SURNAME_CHARS = [
  { ch: 'D', cls: 'tilt-g' }, { ch: 'H', cls: 'tilt-h' }, { ch: 'A', cls: 'tilt-a amp' },
  { ch: 'R', cls: 'tilt-d' }, { ch: '.', cls: 'tilt-e', red: true },
];

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

const letterVariant: Variants = {
  hidden: { opacity: 0, y: 60 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: 0.1 + i * 0.04, duration: 0.6, ease: EASE },
  }),
};

const stampVariant: Variants = {
  hidden: { scale: 1.4, opacity: 0 },
  visible: (i: number) => ({
    scale: 1, opacity: 1,
    transition: { delay: 0.8 + i * 0.15, type: 'spring' as const, stiffness: 400, damping: 18 },
  }),
};

export default function Cover() {
  const nameRef = useRef<HTMLHeadingElement>(null);

  // Subtle mouse parallax on name
  useEffect(() => {
    const el = nameRef.current;
    if (!el) return;
    const onMove = (e: MouseEvent) => {
      const cx = window.innerWidth / 2, cy = window.innerHeight / 2;
      const dx = (e.clientX - cx) / cx;
      const dy = (e.clientY - cy) / cy;
      el.style.transform = `translate(${dx * 8}px, ${dy * 8}px)`;
    };
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  return (
    <section className="hero torn-bottom" data-section="hero" data-screen-label="01 Hero">
      <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true">
        <defs>
          <filter id="stamp-roughen">
            <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves={2} result="t" />
            <feDisplacementMap in="SourceGraphic" in2="t" scale={1.5} />
          </filter>
          <filter id="ink-bleed-soft">
            <feTurbulence type="fractalNoise" baseFrequency="0.6" numOctaves={2} result="t" />
            <feDisplacementMap in="SourceGraphic" in2="t" scale={0.9} />
          </filter>
        </defs>
      </svg>

      {/* faint background words */}
      <div className="hero-bg-words" aria-hidden="true">
        <motion.span
          style={{ top: '10%', left: '-4%', transform: 'rotate(45deg)' }}
          initial={{ opacity: 0 }} animate={{ opacity: 0.05 }}
          transition={{ delay: 1.2, duration: 1 }}
        >BUILD</motion.span>
        <motion.span
          style={{ top: '42%', left: '55%', transform: 'rotate(45deg)' }}
          initial={{ opacity: 0 }} animate={{ opacity: 0.05 }}
          transition={{ delay: 1.4, duration: 1 }}
        >SHIP</motion.span>
        <motion.span
          style={{ top: '68%', left: '8%', transform: 'rotate(45deg)' }}
          initial={{ opacity: 0 }} animate={{ opacity: 0.05 }}
          transition={{ delay: 1.6, duration: 1 }}
        >BREAK</motion.span>
      </div>

      {/* masthead */}
      <motion.div
        className="hero-masthead"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.6 }}
      >
        <div className="left">Vol. I &nbsp;·&nbsp; No. 01 &nbsp;·&nbsp; Greater Noida → The Internet</div>
        <div className="center">— THE PERSONAL EDITION —</div>
        <div className="right">May MMXXVI &nbsp;·&nbsp; free, always</div>
      </motion.div>
      <motion.div
        className="hero-masthead-thick"
        initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
        style={{ transformOrigin: 'left' }}
        transition={{ delay: 0.85, duration: 0.5, ease: 'easeOut' }}
      />

      {/* name */}
      <h1 className="hero-name ink-bleed" ref={nameRef}>
        <span style={{ display: 'block' }}>
          {NAME_CHARS.map(({ ch, cls }, i) => (
            <motion.span
              key={i} className={`letter ${cls}`}
              custom={i} variants={letterVariant}
              initial="hidden" animate="visible"
            >{ch}</motion.span>
          ))}
        </span>
        <span style={{ display: 'block' }}>
          {SURNAME_CHARS.map(({ ch, cls, red }, i) => (
            <motion.span
              key={i} className={`letter ${cls}`}
              custom={NAME_CHARS.length + i} variants={letterVariant}
              initial="hidden" animate="visible"
              style={red ? { color: 'var(--red)' } : undefined}
            >{ch}</motion.span>
          ))}
        </span>
      </h1>

      {/* photo */}
      <motion.figure
        className="hero-photo"
        initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9, duration: 0.7, ease: EASE }}
      >
        <span className="hp-tape left" />
        <span className="hp-tape right" />
        <img
          className="hp-img"
          src="/images/hero-life-wall.jpg"
          alt="Shivam at Laracon India 2026 in front of the LIFE Magazine signing wall"
        />
        <figcaption className="hp-caption">
          <span><span className="red">●</span>&nbsp; Plate I</span>
          <span className="center">
            The author, in front of the LIFE Magazine wall — Laracon.in 2026, Ahmedabad.
            <span style={{ display: 'block', marginTop: 4, fontSize: 12, color: 'var(--ink-mute)' }}>
              He wrote: &ldquo;vibe coding is the future.&rdquo; Nobody disagreed.
            </span>
          </span>
          <span>Photo · uncredited</span>
        </figcaption>
      </motion.figure>

      {/* stamps */}
      <div className="hero-stamps">
        {[
          { size: 'lg' as const, angle: -8, label: 'Builder' },
          { size: 'md' as const, angle: 5,  label: 'Ships Things' },
          { size: 'sm' as const, angle: -3, label: 'Est. 2005' },
        ].map((s, i) => (
          <motion.div key={s.label} custom={i} variants={stampVariant} initial="hidden" animate="visible">
            <Stamp size={s.size} angle={s.angle}>{s.label}</Stamp>
          </motion.div>
        ))}
      </div>

      <motion.span
        className="sticker hero-sticker"
        initial={{ opacity: 0, rotate: 0 }} animate={{ opacity: 1, rotate: -3 }}
        transition={{ delay: 1.1, duration: 0.5 }}
      >
        Greater Noida → Internet
      </motion.span>

      <div className="hero-sub">
        <motion.div
          className="hero-sub-left"
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0, duration: 0.6 }}
        >
          <span className="dropcap">A</span>
          twenty-year-old CS student from Greater Noida
          who builds things between naps. Vibe coder by default.
          Thinker when it is unavoidable. Ships things
          nobody asked for but people end up needing.
        </motion.div>
        <motion.div
          className="hero-sub-right"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ delay: 1.1, duration: 0.6 }}
        >
          <div>↓ on this issue</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6, textAlign: 'right', lineHeight: 1.6 }}>
            <span>01 &nbsp; Cover</span>
            <span>02 &nbsp; Philosophy</span>
            <span>03 &nbsp; Selected Work</span>
            <span>04 &nbsp; Where I&apos;ve been</span>
            <span>05 &nbsp; Beyond the screen</span>
            <span>06 &nbsp; Get in touch</span>
          </div>
        </motion.div>
      </div>

      <div className="hero-scroll-cue" aria-hidden="true">
        <span>scroll</span>
        <span className="line" />
        <span>↓</span>
      </div>

      <div className="hero-footer-block">
        <div className="barcode-row">
          <Barcode sku="SKU-SHIVAMDHAR-2005" width={240} height={48} className="big" />
          <span>One-of-one print run · do not photocopy · enjoy responsibly</span>
        </div>
        <Ticker items={tickerItems} />
      </div>
    </section>
  );
}
