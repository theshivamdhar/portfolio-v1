import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { tools } from '../../data/content';

function FadeIn({ children, delay = 0, className = '', style = {} }: {
  children: React.ReactNode; delay?: number; className?: string; style?: React.CSSProperties;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-10% 0px' });
  return (
    <motion.div
      ref={ref} className={className} style={style}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

export default function Philosophy() {
  const sectionRef = useRef(null);

  return (
    <section className="sheet" data-section="philosophy" data-screen-label="02 Philosophy" ref={sectionRef}>
      <span
        className="bg-word"
        style={{ top: '8%', left: '-4%', transform: 'rotate(-8deg)', fontSize: 'clamp(220px, 28vw, 460px)' }}
        aria-hidden="true"
      >PHILOSOPHY</span>

      <div className="sheet-inner">
        <header className="sec-head">
          <div className="sec-num ink-bleed">02</div>
          <div>
            <div className="sec-title">On Making, &amp; Other Quiet Religions</div>
            <div style={{ marginTop: 10, display: 'flex', gap: 8 }}>
              <span className="notes-header-badge">notebook · spiral-bound</span>
              <span className="notes-header-badge" style={{ color: 'var(--red)', borderColor: 'var(--red)' }}>2 a.m. edition</span>
              <span className="notes-header-badge">pen · cheap red bic</span>
            </div>
          </div>
          <div className="sec-meta">page 14 / 14 · used</div>
        </header>

        <div className="notes-page">
          {/* LEFT MARGIN */}
          <div className="margin-note" style={{ top: 30, left: 18, width: 84 }}>
            <div className="star">★ ★ ★ ★ ☆</div>
            <div style={{ marginTop: 4 }}>note to self:</div>
            <div style={{ marginTop: 2, color: 'var(--ink)' }}>re-read this when you are tired and forget why.</div>
          </div>
          <div className="margin-note" style={{ top: 360, left: 18, width: 84 }}>
            <div>note to self:</div>
            <div style={{ marginTop: 2, color: 'var(--ink)' }}>the boring parts are where most of the taste lives.</div>
          </div>
          <div className="margin-note" style={{ top: 740, left: 18, width: 84 }}>
            <div>note to self:</div>
            <div style={{ marginTop: 2, color: 'var(--ink)' }}>stop deleting drafts. ship them ugly.</div>
          </div>
          <div className="margin-note" style={{ top: 1100, left: 18, width: 84 }}>
            <div>note to self:</div>
            <div style={{ marginTop: 2, color: 'var(--ink)' }}>the itch is the gift. do not waste the itch.</div>
          </div>

          {/* RIGHT MARGIN */}
          <div className="margin-note right" style={{ top: 30, right: 18, width: 90 }}>
            <div>p. 14</div>
            <div style={{ marginTop: 2 }}>★ entry no.7</div>
            <div style={{ marginTop: 2 }}>28 may 2026</div>
          </div>
          <div className="margin-note right" style={{ top: 280, right: 18, width: 90 }}>
            <div>★★★★★</div>
            <div style={{ marginTop: 2 }}>this one is real.</div>
          </div>
          <div className="margin-note right" style={{ top: 640, right: 18, width: 90 }}>
            <div>03:14 a.m.</div>
            <div style={{ marginTop: 2 }}>fridge is empty</div>
            <div style={{ marginTop: 2 }}>commit anyway</div>
          </div>
          <div className="margin-note right" style={{ top: 980, right: 18, width: 90 }}>
            <div>★ ★ ★ ☆ ☆</div>
            <div style={{ marginTop: 2 }}>not sure yet.</div>
          </div>

          {/* coffee stain */}
          <div className="coffee-stain" style={{ top: 280, right: 280 }} />

          {/* main statements */}
          <FadeIn className="notes-item" style={{ top: 40, left: 160, transform: 'rotate(-3deg)' }}>
            <div className="notes-statement" style={{ fontSize: 52 }}>
              <span className="circle">Build</span>
              {' from '}
              <span className="strike">curriculum</span>
              <span className="add">confusion</span>.
            </div>
          </FadeIn>

          <FadeIn className="notes-item" style={{ top: 200, left: 220, transform: 'rotate(2deg)' }} delay={0.05}>
            <div className="notes-statement" style={{ fontSize: 44, color: 'var(--ink-soft)' }}>
              The best tool is the one that{' '}
              <span className="underline">ships fastest</span>.
            </div>
          </FadeIn>

          <FadeIn className="notes-item" style={{ top: 360, left: 150, transform: 'rotate(-2deg)' }} delay={0.1}>
            <div className="notes-statement" style={{ fontSize: 48 }}>
              Ship before it is{' '}
              <span className="strike">perfect</span>
              <span className="add">good</span>.
              <br />
              <span style={{ fontSize: '0.7em', display: 'inline-block', marginTop: 6 }}>
                Then make it good <em style={{ color: 'var(--red)', fontStyle: 'italic' }}>in public</em>.
              </span>
            </div>
          </FadeIn>

          <FadeIn className="notes-item" style={{ top: 600, left: 200, transform: 'rotate(3deg)' }} delay={0.15}>
            <div className="notes-statement" style={{ fontSize: 56 }}>
              I build because I{' '}
              <span style={{ color: 'var(--red)', fontWeight: 700 }}>cannot stop</span>{' '}
              <span className="strike">trying</span>
              <span className="add">building</span>.
            </div>
          </FadeIn>

          {/* field note card */}
          <FadeIn className="notes-item paper-card" style={{ top: 820, left: 170, transform: 'rotate(-2deg)', background: 'var(--ink)', color: 'var(--paper)', padding: '22px 24px', width: 340 }} delay={0.2}>
            <div style={{ fontFamily: 'var(--ff-mono)', fontSize: 10, letterSpacing: '0.28em', color: 'rgba(243,236,222,0.5)', marginBottom: 6 }}>
              FIELD NOTE — pinned to page
            </div>
            <div style={{ fontFamily: 'var(--ff-display)', fontSize: 48, lineHeight: 1, color: 'var(--paper)' }}>
              2&nbsp;a.m.
            </div>
            <div style={{ fontFamily: 'var(--ff-serif)', fontStyle: 'italic', fontSize: 16, marginTop: 6, color: 'rgba(243,236,222,0.85)' }}>
              is when the good ideas show up, wearing borrowed clothes
              and asking if anyone has ramen.
            </div>
          </FadeIn>

          {/* scribbled arrow */}
          <svg className="scribble-arrow" style={{ top: 760, left: 540, width: 180, height: 120 }} viewBox="0 0 180 120" fill="none">
            <path d="M170 12 Q 130 10, 100 25 T 50 60 Q 35 70, 30 90" stroke="currentColor" strokeWidth="3" fill="none" strokeLinecap="round" />
            <path d="M30 90 L 38 78 M 30 90 L 44 92" stroke="currentColor" strokeWidth="3" fill="none" strokeLinecap="round" />
          </svg>
          <div className="notes-item" style={{ top: 740, left: 700, transform: 'rotate(-6deg)', width: 220 }}>
            <div className="scrap-handwritten" style={{ color: 'var(--red)', fontSize: 26, lineHeight: 1.1 }}>
              ← THIS one matters most.
            </div>
          </div>

          {/* big pull quote */}
          <FadeIn className="notes-item" style={{ top: 1080, left: 180, transform: 'rotate(-2deg)', maxWidth: '70%' }} delay={0.25}>
            <div className="notes-pullquote">
              Sleeps a lot.<br />
              <em>Ships when awake.</em>
              <span className="bang">!!!</span>
              <svg className="doodle-star" viewBox="0 0 64 64" fill="none">
                <path d="M32 4 L37 26 L60 26 L41 40 L48 62 L32 48 L16 62 L23 40 L4 26 L27 26 Z"
                  stroke="currentColor" strokeWidth="3" fill="none" strokeLinejoin="round" />
              </svg>
            </div>
          </FadeIn>

          {/* sticky note */}
          <motion.div
            className="notes-item"
            style={{ top: 60, right: 130, transform: 'rotate(5deg)' }}
            initial={{ y: -60, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ type: 'spring', stiffness: 260, damping: 20, delay: 0.3 }}
          >
            <div className="notes-sticky">
              <h4>tools i actually use rn:</h4>
              <ul>
                <li>Claude Code</li>
                <li>Antigravity</li>
                <li>Lovable</li>
                <li>React + FastAPI</li>
                <li>Electron</li>
                <li>Figma <span style={{ color: 'var(--red)' }}>(sometimes)</span></li>
                <li className="strike-rj">VS Code</li>
                <li>Anything that doesn&apos;t fight me</li>
              </ul>
            </div>
          </motion.div>

          {/* small asides */}
          <div className="notes-item" style={{ top: 540, left: 220, transform: 'rotate(-1deg)', width: 380 }}>
            <div className="scrap-handwritten" style={{ color: 'var(--red)', fontSize: 24, lineHeight: 1 }}>
              ✦ this took me a year to admit.
            </div>
          </div>
          <div className="notes-item" style={{ top: 460, right: 140, transform: 'rotate(-7deg)', width: 220 }}>
            <div className="scrap-handwritten" style={{ color: 'var(--red)', fontSize: 22, lineHeight: 1.05 }}>
              still true. annoyingly.
            </div>
          </div>
          <div className="notes-item" style={{ top: 920, right: 110, transform: 'rotate(2deg)', maxWidth: 320 }}>
            <div className="scrap-handwritten" style={{ fontSize: 24, lineHeight: 1.1, color: 'var(--ink)' }}>
              vibes are a craft.<br />
              <span style={{ color: 'var(--red)' }}>also</span> a craft.<br />
              the difference between alive<br />
              and dead is rarely the<br />
              framework — it is the<br />
              <span className="notes-statement"><span className="circle">taste</span></span><br />
              you spend on the parts<br />
              nobody will see.
            </div>
          </div>

          <div className="draft-watermark">DRAFT</div>
        </div>

        {/* tools marquee */}
        <div className="tools-strip">
          <div className="tools-strip-head">
            <span className="smallcaps" style={{ color: 'var(--red)' }}>Tools of the trade</span>
            <span className="mono" style={{ fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--ink-mute)' }}>kit · spec · subject to change without notice</span>
          </div>
          <div className="tools-marquee">
            <div className="tools-track">
              {[...tools, ...tools].map((t, i) => (
                <span className="tool-tag" key={i}>
                  <span className="tool-dot">●</span>{t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
