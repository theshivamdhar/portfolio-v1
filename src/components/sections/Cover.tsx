import { useEffect, useRef, useState, useCallback } from 'react';
import { motion, useAnimate, type Variants } from 'framer-motion';
import Stamp from '../ui/Stamp';
import Ticker from '../ui/Ticker';
import WashiTape from '../ui/WashiTape';
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

// ─── Easter Egg: Web Audio stamp sound ───────────────────────────────────────
function playStampSound() {
  try {
    const ctx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.type = 'sine';
    osc.frequency.setValueAtTime(120, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(40, ctx.currentTime + 0.08);
    gain.gain.setValueAtTime(0.35, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.3);
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.3);
    setTimeout(() => ctx.close(), 500);
  } catch {
    // Web Audio not available — fail silently
  }
}

// ─── Easter Egg: Receipt popup ────────────────────────────────────────────────
function EasterEggReceipt({ visible }: { visible: boolean }) {
  const now = new Date();
  const dateStr = now.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }).toUpperCase();

  return (
    <motion.div
      className="easter-receipt"
      initial={{ opacity: 0, y: -20, rotate: -2 }}
      animate={visible ? { opacity: 1, y: 0, rotate: -1.5 } : { opacity: 0, y: -20, rotate: -2 }}
      transition={{ type: 'spring', stiffness: 400, damping: 20 }}
      aria-hidden="true"
    >
      <div className="er-border-top" />
      <div className="er-line er-title">BUILDER CERTIFICATION ISSUED</div>
      <div className="er-line">TO: SHIVAM DHAR</div>
      <div className="er-line">DATE: {dateStr}, PROBABLY</div>
      <div className="er-line">VALIDITY: UNTIL NEXT NAP</div>
      <div className="er-dots">• • • • • • • • • • • • • • • • •</div>
      <div className="er-line er-small">KEEP THIS RECEIPT. YOU EARNED IT.</div>
    </motion.div>
  );
}

// ─── Stamp impressions that fly across hero ───────────────────────────────────
interface StampImpression { id: number; x: number; y: number; rotate: number; }

export default function Cover() {
  const nameRef = useRef<HTMLHeadingElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const [scope, animate] = useAnimate();
  const shakeTriggered = useRef(false);

  // Easter egg state
  const [impressions, setImpressions] = useState<StampImpression[]>([]);
  const [receiptVisible, setReceiptVisible] = useState(false);
  const eggCounter = useRef(0);

  // Hero shake after name reveal — fires once on load
  useEffect(() => {
    if (shakeTriggered.current) return;
    shakeTriggered.current = true;
    const lastLetterDelay = 0.1 + (NAME_CHARS.length + SURNAME_CHARS.length - 1) * 0.04;
    const totalRevealTime = (lastLetterDelay + 0.6) * 1000;

    const timer = setTimeout(async () => {
      if (!scope.current) return;
      const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (reducedMotion) return;
      await animate(scope.current, {
        x: [0, -4, 3, -2, 1, 0],
        y: [0, 2, -1, 1, 0, 0],
      }, {
        duration: 0.4,
        ease: 'linear',
      });
    }, totalRevealTime + 100);

    return () => clearTimeout(timer);
  }, [animate, scope]);

  // Mouse parallax on name
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

  // Easter egg: Builder stamp clicked
  const handleBuilderClick = useCallback(() => {
    const hero = heroRef.current;
    if (!hero) return;

    eggCounter.current++;

    const count = 5 + Math.floor(Math.random() * 2);
    const newImpressions: StampImpression[] = Array.from({ length: count }, (_, i) => ({
      id: eggCounter.current * 100 + i,
      x: 8 + Math.random() * 75,
      y: 10 + Math.random() * 70,
      rotate: (Math.random() - 0.5) * 40,
    }));
    setImpressions(newImpressions);
    setReceiptVisible(true);
    document.body.classList.add('cursor-stamp');
    setTimeout(() => document.body.classList.remove('cursor-stamp'), 3000);
    playStampSound();
    setTimeout(() => setImpressions([]), 1600);
    setTimeout(() => setReceiptVisible(false), 2000);
  }, []);

  return (
    <section className="hero torn-bottom" data-section="hero" data-screen-label="01 Hero" ref={heroRef}>
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

      {/* Easter egg: stamp impressions */}
      {impressions.map((imp) => (
        <motion.div
          key={imp.id}
          className="egg-stamp-impression"
          style={{ left: `${imp.x}%`, top: `${imp.y}%`, rotate: imp.rotate }}
          initial={{ opacity: 0, scale: 2 }}
          animate={{ opacity: [0, 0.7, 0.7, 0], scale: [2, 1, 1, 0.9] }}
          transition={{ duration: 1.5, times: [0, 0.15, 0.7, 1], ease: 'easeOut' }}
        >
          BUILDER
        </motion.div>
      ))}

      {/* Easter egg: receipt popup */}
      <EasterEggReceipt visible={receiptVisible} />

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

      {/* name — wrapped in useAnimate scope for hero shake */}
      <h1 className="hero-name ink-bleed" ref={nameRef}>
        <span ref={scope} style={{ display: 'contents' }}>
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
        </span>
      </h1>

      {/* ── Two-column body: photo (left 65%) + stamps (right 35%) ── */}
      <div className="hero-body-grid">
        {/* Left: hero photo */}
        <motion.div
          className="hero-body-left"
          initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.7, ease: EASE }}
        >
          <figure className="hero-photo" style={{ width: '100%', maxWidth: '100%', margin: 0 }}>
            {/* WashiTape corner on top-left of photo */}
            <WashiTape
              variant="corner"
              style={{ top: -14, left: 20, zIndex: 5 }}
            />
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
              </span>
              <span>Photo · uncredited</span>
            </figcaption>
          </figure>
        </motion.div>

        {/* Right: stamps + washi tape label */}
        <div className="hero-body-right">
          <div className="hero-stamps-col">
            {[
              { size: 'lg' as const, angle: -8, label: 'Builder', isBuilder: true },
              { size: 'md' as const, angle: 5,  label: 'Ships Things', isBuilder: false },
              { size: 'sm' as const, angle: -3, label: 'Est. 2005', isBuilder: false },
            ].map((s, i) => (
              <motion.div
                key={s.label}
                custom={i}
                variants={stampVariant}
                initial="hidden"
                animate="visible"
                onClick={s.isBuilder ? handleBuilderClick : undefined}
                style={s.isBuilder ? { cursor: 'pointer' } : undefined}
                title={s.isBuilder ? 'Click me...' : undefined}
              >
                <Stamp size={s.size} angle={s.angle}>{s.label}</Stamp>
              </motion.div>
            ))}
          </div>

          {/* Greater Noida sticker */}
          <motion.span
            className="sticker"
            style={{ transform: 'rotate(-3deg)', alignSelf: 'flex-end' }}
            initial={{ opacity: 0, rotate: 0 }} animate={{ opacity: 1, rotate: -3 }}
            transition={{ delay: 1.1, duration: 0.5 }}
          >
            Greater Noida → Internet
          </motion.span>

          {/* Washi tape vertical strip — right edge, slides in */}
          <div className="washi-vertical-wrap">
            <WashiTape
              variant="vertical"
              height={200}
              animate
              delay={1.4}
              style={{ position: 'relative' }}
            >
              2026
            </WashiTape>
          </div>
        </div>
      </div>

      <div className="hero-scroll-cue" aria-hidden="true">
        <span>scroll</span>
        <span className="line" />
        <span>↓</span>
      </div>

      {/* Margin annotation — bottom left */}
      <motion.div
        className="hero-margin-annotation"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
        transition={{ delay: 2, duration: 0.8 }}
        aria-hidden="true"
      >
        note to self: stop tweaking. ship it.
      </motion.div>

      <div className="hero-footer-block">
        <Ticker items={tickerItems} />
      </div>
    </section>
  );
}
