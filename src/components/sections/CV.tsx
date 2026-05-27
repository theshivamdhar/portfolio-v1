import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { experience, education } from '../../data/content';

export default function CV() {
  const riderRef = useRef(null);
  const inView = useInView(riderRef, { once: true, margin: '-5% 0px' });

  return (
    <section className="sheet" data-section="experience" data-screen-label="04 Experience">
      <div className="sheet-inner">
        <header className="sec-head">
          <div className="sec-num ink-bleed">04</div>
          <div className="sec-title">Where I&apos;ve Been, &amp; Whom I&apos;ve Bothered</div>
          <div className="sec-meta">CV · Tour rider</div>
        </header>

        <motion.div
          className="rider"
          ref={riderRef}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="rider-head">
            <h3 className="title">
              Artist Rider — <em>Shivam Dhar</em>
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
                  animate={inView ? { x: 0, opacity: 1 } : {}}
                  transition={{ delay: 0.1 + i * 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                >
                  <div className="req">{e.reqLabel}</div>
                  <h5 className="name">{e.org}</h5>
                  <dl className="row">
                    <dt>Role</dt><dd>{e.role}</dd>
                    <dt>Duration</dt><dd>{e.period}</dd>
                    <dt>Status</dt>
                    <dd className={e.status === 'active' ? 'status-active' : ''}>
                      {e.status === 'active' ? '● Active' : 'Wrapped'}
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
                  animate={inView ? { x: 0, opacity: 1 } : {}}
                  transition={{ delay: 0.2 + i * 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
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
                animate={inView ? { x: 0, opacity: 1 } : {}}
                transition={{ delay: 0.3, duration: 0.5 }}
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
                animate={inView ? { x: 0, opacity: 1 } : {}}
                transition={{ delay: 0.4, duration: 0.5 }}
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
                animate={inView ? { x: 0, opacity: 1 } : {}}
                transition={{ delay: 0.5, duration: 0.5 }}
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
                animate={inView ? { x: 0, opacity: 1 } : {}}
                transition={{ delay: 0.6, duration: 0.5 }}
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

          <motion.div
            className="approved-stamp"
            initial={{ scale: 1.4, opacity: 0, rotate: -8 }}
            animate={inView ? { scale: 1, opacity: 0.78, rotate: -8 } : {}}
            transition={{ delay: 0.7, type: 'spring', stiffness: 300, damping: 20 }}
          >
            APPROVED
            <span className="sub">witnessed · 28 may 2026</span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
