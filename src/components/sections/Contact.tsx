import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import Ticker from '../ui/Ticker';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', note: '' });
  const [sent, setSent] = useState(false);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-5% 0px' });

  const lineupItems = [
    { cls: 'headliner', handle: 'Headliner · GitHub', text: 'theshivamdhar', href: 'https://github.com/theshivamdhar' },
    { cls: 'main', handle: 'Main support · Email', text: 'workwithshivamd@gmail.com', href: 'mailto:workwithshivamd@gmail.com' },
    { cls: 'support', handle: 'Support act · X / Twitter', text: 'x.com/theshivamdhar', href: 'https://x.com/theshivamdhar' },
    { cls: 'opening', handle: 'Opening · Location', text: 'Greater Noida, India', href: null },
  ];

  return (
    <section className="sheet torn-top" data-section="contact" data-screen-label="06 Contact" ref={ref}>
      <div className="sheet-inner">
        <header className="sec-head" style={{ marginBottom: 32 }}>
          <div className="sec-num ink-bleed">06</div>
          <div className="sec-title">The Last Page</div>
          <div className="sec-meta">end matter · colophon below</div>
        </header>

        <div className="contact-head-wrap">
          <motion.h2
            className="contact-head runoff ink-bleed"
            initial={{ clipPath: 'inset(0 100% 0 0)' }}
            animate={inView ? { clipPath: 'inset(0 0% 0 0)' } : {}}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            let&apos;s build <em>something</em> small &amp; <span style={{ fontStyle: 'italic' }}>good.</span>
          </motion.h2>
        </div>

        <div className="contact-grid">
          <ul className="contact-lineup extreme">
            {lineupItems.map((li, i) => (
              <motion.li
                key={li.handle}
                className={li.cls}
                initial={{ opacity: 0, x: -30 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.2 + i * 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              >
                <span className="handle">{li.handle}</span>
                {li.href ? (
                  <a href={li.href} target={li.href.startsWith('http') ? '_blank' : undefined} rel="noreferrer">{li.text}</a>
                ) : li.text}
              </motion.li>
            ))}
          </ul>

          <motion.div
            className="paper-card contact-card"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 14 }}>
              <div className="smallcaps" style={{ color: 'var(--red)' }}>or, the slow way</div>
              <div className="mono" style={{ fontSize: 11, color: 'var(--ink-mute)', letterSpacing: '0.16em', textTransform: 'uppercase' }}>form &middot; no.&nbsp;01</div>
            </div>

            {sent ? (
              <div style={{ padding: '32px 6px' }}>
                <div className="display" style={{ fontSize: 36, lineHeight: 1, color: 'var(--red)' }}>thanks.</div>
                <p style={{ fontStyle: 'italic', marginTop: 12, color: 'var(--ink-soft)' }}>
                  I&apos;ll write back within 48 hours, unless I&apos;m asleep, in which case&nbsp;72.
                </p>
                <button onClick={() => { setSent(false); setForm({ name: '', email: '', note: '' }); }} style={{ marginTop: 18 }}>
                  send another
                </button>
              </div>
            ) : (
              <form onSubmit={(e) => { e.preventDefault(); setSent(true); }}>
                <div className="form-row">
                  <label>Your name</label>
                  <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="who's writing?" required />
                </div>
                <div className="form-row">
                  <label>Address for reply</label>
                  <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="you@somewhere" required />
                </div>
                <div className="form-row">
                  <label>What&apos;s on your mind</label>
                  <textarea value={form.note} onChange={(e) => setForm({ ...form, note: e.target.value })} placeholder="keep it short. keep it real." required />
                </div>
                <button type="submit">Send</button>
              </form>
            )}
          </motion.div>
        </div>

        <footer className="colophon">
          <div>
            <div className="col-name">Shivam Dhar</div>
            <div style={{ marginTop: 6 }}>Personal Edition · Vol. I</div>
            <div>Set in DM Serif, Crimson, &amp; Special Elite</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div>Printed on the open web</div>
            <div style={{ marginTop: 6 }}>No animals harmed</div>
            <div>One (1) parent moderately inconvenienced</div>
          </div>
          <div className="right">
            <div>MMXXVI</div>
            <div style={{ marginTop: 6 }}>Hand-coded in Delhi</div>
            <div>Last updated · today, probably</div>
          </div>
        </footer>

        <div style={{ marginTop: 36 }}>
          <Ticker className="legal-ticker" items={['Shivam Dhar', 'Computer Science', 'IILM University', 'Greater Noida', '2026', 'All rights reserved', 'github.com/theshivamdhar', 'Hand-coded with minimal sleep']} />
        </div>
      </div>
    </section>
  );
}
