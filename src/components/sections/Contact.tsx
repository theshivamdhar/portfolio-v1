import { motion } from 'framer-motion';
import { useState } from 'react';
import Ticker from '../ui/Ticker';
import { PrintRevealBlock } from '../ui/PrintReveal';
import { useMagnet } from '../../hooks/useMagnet';
import WashiTape from '../ui/WashiTape';
import TornEdge from '../ui/TornEdge';
import Barcode from '../ui/Barcode';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', note: '' });
  const [sent, setSent] = useState(false);

  const lineupItems = [
    { cls: 'headliner', handle: 'Headliner · GitHub', text: 'theshivamdhar', href: 'https://github.com/theshivamdhar' },
    { cls: 'main', handle: 'Main support · Email', text: 'workwithshivamd@gmail.com', href: 'mailto:workwithshivamd@gmail.com' },
    { cls: 'support', handle: 'Support act · X / Twitter', text: 'x.com/theshivamdhar', href: 'https://x.com/theshivamdhar' },
    { cls: 'opening', handle: 'Opening · Location', text: 'Greater Noida, India', href: null },
  ];

  const { ref: emailRef, onMouseMove: emailMouseMove, onMouseLeave: emailMouseLeave } = useMagnet();
  const { ref: sendRef, onMouseMove: sendMouseMove, onMouseLeave: sendMouseLeave } = useMagnet();

  return (
    <>
      {/* Torn paper edge — cream Life section to dark Contact */}
      <TornEdge direction="cream-to-dark" />

      <section className="dark-section" data-section="contact" data-screen-label="06 Contact" style={{ padding: 0 }}>
        {/* Washi tape strip — top of dark section, full width */}
        <WashiTape variant="horizontal" />

        <div style={{ padding: '80px 48px 0', maxWidth: 'var(--w-page)', margin: '0 auto' }}>
          <header className="sec-head" style={{ marginBottom: 32 }}>
            <div className="sec-num ink-bleed">06</div>
            <div>
              <PrintRevealBlock style={{ display: 'block' }} delay={0}>
                <span className="sec-title">The Last Page</span>
              </PrintRevealBlock>
            </div>
            <div className="sec-meta">end matter · colophon below</div>
          </header>

          {/* Headline — contained, no bleed */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <h2 className="contact-head-dark" style={{ fontSize: 'clamp(56px, 8vw, 110px)' }}>
              let&apos;s build<br />
              <em>something</em><br />
              small &amp; <span className="red-word">good.</span>
            </h2>
          </motion.div>

          {/* Sticky note — in-flow, between headline and links */}
          <motion.div
            className="contact-sticky-inflow"
            initial={{ opacity: 0, scale: 0.9, rotate: -4 }}
            whileInView={{ opacity: 1, scale: 1, rotate: -2 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ delay: 0.4, type: 'spring', stiffness: 300, damping: 20 }}
            aria-hidden="true"
          >
            preferred: email. i read everything. i just reply slowly.
          </motion.div>

          {/* Full-width rule */}
          <div style={{ height: 1, background: 'var(--dark-rule)', margin: '0 0 0' }} />

          {/* Contact grid — links + form */}
          <div className="contact-grid" style={{ position: 'relative', marginTop: 40 }}>
            <ul className="contact-lineup extreme">
              {lineupItems.map((li, i) => (
                <motion.li
                  key={li.handle}
                  className={li.cls}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.1 }}
                  transition={{ delay: 0.2 + i * 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                >
                  <span className="handle">{li.handle}</span>
                  {li.href ? (
                    li.href.startsWith('mailto:') ? (
                      <a
                        ref={emailRef as React.Ref<HTMLAnchorElement>}
                        href={li.href}
                        onMouseMove={emailMouseMove}
                        onMouseLeave={emailMouseLeave}
                        style={{ display: 'inline-block' }}
                      >
                        {li.text}
                      </a>
                    ) : (
                      <a href={li.href} target="_blank" rel="noreferrer">{li.text}</a>
                    )
                  ) : li.text}
                </motion.li>
              ))}
            </ul>

            <motion.div
              className="contact-card-dark"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ delay: 0.4, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="form-header">
                <div className="form-header-left">or, the slow way</div>
                <div className="form-header-right">form &middot; no.&nbsp;01</div>
              </div>

              {sent ? (
                <div style={{ padding: '32px 6px' }}>
                  <div className="display" style={{ fontSize: 36, lineHeight: 1, color: 'var(--red)' }}>thanks.</div>
                  <p style={{ fontStyle: 'italic', marginTop: 12, color: 'var(--dark-secondary)' }}>
                    I&apos;ll write back within 48 hours, unless I&apos;m asleep, in which case&nbsp;72.
                  </p>
                  <button
                    onClick={() => { setSent(false); setForm({ name: '', email: '', note: '' }); }}
                    style={{ marginTop: 18 }}
                  >
                    send another
                  </button>
                </div>
              ) : (
                <form onSubmit={(e) => { e.preventDefault(); setSent(true); }}>
                  <div className="form-row">
                    <label htmlFor="contact-name">Your name</label>
                    <input
                      id="contact-name"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="who's writing?"
                      required
                    />
                  </div>
                  <div className="form-row">
                    <label htmlFor="contact-email">Address for reply</label>
                    <input
                      id="contact-email"
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="you@somewhere"
                      required
                    />
                  </div>
                  <div className="form-row">
                    <label htmlFor="contact-note">What&apos;s on your mind</label>
                    <textarea
                      id="contact-note"
                      value={form.note}
                      onChange={(e) => setForm({ ...form, note: e.target.value })}
                      placeholder="keep it short. keep it real."
                      required
                    />
                  </div>
                  <button
                    ref={sendRef as React.Ref<HTMLButtonElement>}
                    type="submit"
                    onMouseMove={sendMouseMove}
                    onMouseLeave={sendMouseLeave}
                  >
                    Send
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        </div>

        {/* Barcode — moved from Cover */}
        <div style={{ padding: '60px 48px 0', maxWidth: 'var(--w-page)', margin: '0 auto' }}>
          <Barcode sku="SKU-SHIVAMDHAR-2025" width={200} height={40} className="barcode-dark" />
          <div style={{ fontFamily: 'var(--ff-mono)', fontSize: 8, letterSpacing: '0.18em', color: 'var(--dark-secondary)', marginTop: 6, textTransform: 'uppercase' }}>
            SKU-SHIVAMDHAR-2025
          </div>
        </div>

        {/* Colophon */}
        <div style={{ padding: '40px 48px 80px', maxWidth: 'var(--w-page)', margin: '0 auto' }}>
          <div style={{ height: 1, background: 'var(--dark-rule)', margin: '0 0 20px' }} />
          <div className="dark-colophon-row1">
            PRINTED ON THE OPEN WEB &nbsp;·&nbsp; SHIVAM DHAR &nbsp;·&nbsp; GREATER NOIDA &nbsp;·&nbsp; MMXXVI
          </div>
          <div className="dark-colophon-row2">
            <span className="name">Shivam Dhar</span>
            <span className="year">MMXXVI</span>
          </div>
        </div>

        <div style={{ paddingBottom: 0 }}>
          <Ticker
            className="legal-ticker"
            items={['Shivam Dhar', 'Computer Science', 'IILM University', 'Greater Noida', '2026', 'All rights reserved', 'github.com/theshivamdhar', 'Hand-coded with minimal sleep']}
          />
        </div>
      </section>
    </>
  );
}
