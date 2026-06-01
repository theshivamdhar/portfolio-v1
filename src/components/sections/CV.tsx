import { motion, useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { experience, education } from '../../data/content';
import { PrintRevealBlock } from '../ui/PrintReveal';
// Bidirectional timing: entrance 0.5s, exit 0.3s (60%)
const ENTRANCE = { duration: 0.5, ease: [0.22, 1, 0.36, 1] as [number,number,number,number] };

// ─── Typewriter for "Shivam Dhar" ────────────────────────────────────────────
const TYPEWRITER_TEXT = 'Shivam Dhar';

function TypewriterName({ trigger }: { trigger: boolean }) {
  const [displayed, setDisplayed] = useState('');
  const [showCursor, setShowCursor] = useState(false);
  const isReducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  useEffect(() => {
    if (!trigger) return;
    if (isReducedMotion) {
      setDisplayed(TYPEWRITER_TEXT);
      return;
    }

    setDisplayed('');
    setShowCursor(true);
    let i = 0;

    const interval = setInterval(() => {
      i++;
      setDisplayed(TYPEWRITER_TEXT.slice(0, i));
      if (i >= TYPEWRITER_TEXT.length) {
        clearInterval(interval);
        // Cursor blinks 3 times then disappears (3 × 500ms = 1500ms)
        setTimeout(() => setShowCursor(false), 1600);
      }
    }, 72);

    return () => clearInterval(interval);
  }, [trigger, isReducedMotion]);

  if (isReducedMotion) {
    return <em style={{ color: 'var(--red)', fontStyle: 'italic' }}>{TYPEWRITER_TEXT}</em>;
  }

  return (
    <em style={{ color: 'var(--red)', fontStyle: 'italic' }}>
      {displayed}
      {showCursor && <span className="typewriter-cursor" />}
    </em>
  );
}

// ─── SVG circle around "ACTIVE" word ─────────────────────────────────────────
function CircledWord({ children, trigger }: { children: React.ReactNode; trigger: boolean }) {
  return (
    <span className="active-circled">
      {children}
      <svg
        className="svg-circle-annotation"
        style={{ position: 'absolute', top: '-6px', left: '-10px', width: 'calc(100% + 20px)', height: 'calc(100% + 12px)' }}
        viewBox="0 0 80 28"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <ellipse
          className={`svg-circle-path${trigger ? ' animate' : ''}`}
          cx="40" cy="14" rx="36" ry="11"
          strokeDasharray="240"
          strokeDashoffset={trigger ? undefined : 240}
        />
      </svg>
    </span>
  );
}

export default function CV() {
  const riderRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(riderRef, { once: true, amount: 0.1 });

  return (
    <section className="sheet" data-section="experience" data-screen-label="04 Experience">
      <div className="sheet-inner" style={{ position: 'relative' }}>
        <header className="sec-head">
          <div className="sec-num ink-bleed">04</div>
          <div>
            <PrintRevealBlock style={{ display: 'block' }} delay={0}>
              <span className="sec-title">Where I&apos;ve Been, &amp; Whom I&apos;ve Bothered</span>
            </PrintRevealBlock>
          </div>
          <div className="sec-meta">CV · Tour rider</div>
        </header>

        {/* Bidirectional rider container */}
        <motion.div
          className="rider"
          ref={riderRef}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.05 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          style={{ position: 'relative' }}
        >
          {/* Washi tape — left edge of Artist Rider box, full height, 22px wide */}
          <div aria-hidden="true" style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 22, background: 'var(--red)', zIndex: 1, pointerEvents: 'none' }} />
          {/* CV margin note — rotated left side */}
          <div className="cv-margin-note" aria-hidden="true">
            this is the honest version.
          </div>

          {/* Coffee stain overlapping APPROVED stamp area */}
          <motion.div
            className="cv-coffee-stain"
            style={{
              bottom: '10%',
              right: '3%',
              transform: 'rotate(12deg)',
            }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ delay: 1.4, duration: 0.8 }}
            aria-hidden="true"
          />

          <div className="rider-head">
            <h3 className="title">
              Artist Rider — <TypewriterName trigger={isInView} />
            </h3>
            <dl className="rider-meta">
              <div><dt>Tour</dt><dd>Greater Noida → The Internet</dd></div>
              <div><dt>Season</dt><dd>2024 — Present</dd></div>
              <div><dt>Document Ref</dt><dd>SD-CV-2026-V1</dd></div>
              <div><dt>Issued</dt><dd className="red">28 May 2026 · Delhi</dd></div>
            </dl>
          </div>
          <div className="rider-rule" />

          <div className="rider-cols">
            {/* COL 1 — Experience */}
            <div className="rider-col">
              <div className="col-num">I.</div>
              <h4 className="col-head">Performance History</h4>
              {experience.map((e, i) => (
                <motion.div
                  className="rider-entry"
                  key={e.org}
                  initial={{ x: -30, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  viewport={{ once: true, amount: 0.1 }}
                  transition={{ delay: 0.1 + i * 0.1, ...ENTRANCE }}
                >
                  <div className="req">{e.reqLabel}</div>
                  <h5 className="name">{e.org}</h5>
                  <dl className="row">
                    <dt>Role</dt><dd>{e.role}</dd>
                    <dt>Duration</dt><dd>{e.period}</dd>
                    <dt>Status</dt>
                    <dd className={e.status === 'active' ? 'status-active' : ''}>
                      {e.status === 'active' ? (
                        <CircledWord trigger={isInView}>● Active</CircledWord>
                      ) : 'Wrapped'}
                    </dd>
                  </dl>
                  {e.note && <p className="notes">{e.note}</p>}
                </motion.div>
              ))}
            </div>

            {/* COL 2 — Education */}
            <div className="rider-col">
              <div className="col-num">II.</div>
              <h4 className="col-head">Technical Specifications</h4>
              {education.map((e, i) => (
                <motion.div
                  className="rider-entry"
                  key={e.org}
                  initial={{ x: -30, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  viewport={{ once: true, amount: 0.1 }}
                  transition={{ delay: 0.2 + i * 0.1, ...ENTRANCE }}
                >
                  <div className="req">{e.reqLabel}</div>
                  <h5 className="name">{e.org}</h5>
                  <dl className="row">
                    <dt>Capacity</dt><dd>{e.degree}</dd>
                    <dt>Status</dt>
                    <dd className={e.status === 'active' ? 'status-active' : ''}>
                      {e.status === 'active' ? '● Currently performing' : 'Wrapped'}
                    </dd>
                    {e.set && <><dt>Set</dt><dd>{e.set}</dd></>}
                    {!e.set && <><dt>Season</dt><dd>{e.period}</dd></>}
                  </dl>
                  {e.note && <p className="notes">{e.note}</p>}
                </motion.div>
              ))}
            </div>

            {/* COL 3 — Hospitality */}
            <div className="rider-col">
              <div className="col-num">III.</div>
              <h4 className="col-head">Hospitality Requirements</h4>

              <motion.div
                className="rider-entry"
                initial={{ x: -30, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ delay: 0.3, ...ENTRANCE }}
              >
                <div className="req">Required on arrival</div>
                <ul className="rider-list">
                  <li>Interesting problems</li>
                  <li>People who actually ship things</li>
                  <li>A fast internet connection</li>
                  <li>Strong opinions, loosely held</li>
                  <li className="check">Coffee. The real kind.</li>
                </ul>
              </motion.div>

              <motion.div
                className="rider-entry"
                initial={{ x: -30, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ delay: 0.4, ...ENTRANCE }}
              >
                <div className="req">Technical rider</div>
                <ul className="rider-list">
                  <li className="check">Claude Code · Antigravity · Lovable</li>
                  <li className="check">React · FastAPI · Electron · Python</li>
                  <li className="check">Canva · Figma · Wix Studio</li>
                  <li className="check">ChatGPT · Gemini · Shopify · Git</li>
                </ul>
              </motion.div>

              <motion.div
                className="rider-entry"
                initial={{ x: -30, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ delay: 0.5, ...ENTRANCE }}
              >
                <div className="req">Languages spoken</div>
                <dl className="row">
                  <dt>Hindi</dt><dd>Native</dd>
                  <dt>English</dt><dd>Fluent</dd>
                  <dt>Sarcasm</dt><dd className="status-active">● First language</dd>
                </dl>
              </motion.div>

              <motion.div
                className="rider-entry"
                style={{ borderBottom: 0 }}
                initial={{ x: -30, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ delay: 0.6, ...ENTRANCE }}
              >
                <div className="req">Management contact</div>
                <p className="notes" style={{ fontStyle: 'normal', fontFamily: 'var(--ff-mono)', fontSize: 12, letterSpacing: '0.04em', lineHeight: 1.65 }}>
                  workwithshivamd@gmail.com<br />
                  <span style={{ color: 'var(--ink-mute)' }}>
                    available for bookings, collabs, and
                    interesting problems only.
                  </span>
                </p>
              </motion.div>
            </div>
          </div>

          <div className="rider-footer">
            <span>This rider is legally binding in at least two countries · probably</span>
            <span className="sig">Shivam Dhar</span>
          </div>

          {/* APPROVED stamp — slam with ink spread */}
          <motion.div
            className="approved-stamp"
            initial={{ scale: 1.4, opacity: 0, rotate: -15 }}
            whileInView={{ scale: 1, opacity: 0.78, rotate: -8 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{
              delay: 0.8,
              type: 'spring',
              stiffness: 400,
              damping: 15,
            }}
            style={{ position: 'absolute', bottom: '12%', right: '6%', zIndex: 5 }}
          >
            APPROVED
            <span className="sub">witnessed · 28 may 2026</span>
            {/* Ink spread radial effect */}
            <div
              className="ink-spread"
              style={{
                width: 120,
                height: 120,
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
              }}
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
