import { motion } from 'framer-motion';
import Stamp from '../ui/Stamp';
import Placeholder from '../ui/Placeholder';
import { useMagnet } from '../../hooks/useMagnet';
import WashiTape from '../ui/WashiTape';
import { projects } from '../../data/content';

// ─── Stamp Slam Animation (Interaction #1) ────────────────────────────────────
// Hidden: scale(2) opacity(0) rotate(-15deg)
// Stamp slam animation timing
// Visible: scale(1) opacity(1) rotate(-8deg) with spring
// Exit (60% duration): scale(2) opacity(0) rotate(-15deg), easeOut, no spring

function SlamStamp({ angle, children }: { angle: number; children: React.ReactNode }) {
  const isReducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (isReducedMotion) {
    return <Stamp size="md" angle={angle}>{children}</Stamp>;
  }

  return (
    <motion.div
      initial={{ scale: 2, opacity: 0, rotate: -15 }}
      whileInView={{ scale: 1, opacity: 1, rotate: angle }}
      exit={{ scale: 2, opacity: 0, rotate: -15 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{
        default: {
          type: 'spring',
          stiffness: 400,
          damping: 15,
          delay: 0.4, // 400ms after card appears
        },
        // Exit overridden via custom CSS shadow trick:
        // We use onViewportLeave to set a faster exit
      }}
      style={{
        display: 'inline-block',
        filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0))',
      }}
    >
      <Stamp size="md" angle={0}>{children}</Stamp>
    </motion.div>
  );
}

// Bidirectional card entrance/exit
// Entrance: 0.7s, Exit: 0.42s (60%)

function ProjectSpread({ p, idx, total }: { p: typeof projects[0]; idx: number; total: number }) {
  const reverse = idx % 2 === 1;
  const isReducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Magnetic "Read the case study" link
  const { ref: linkRef, onMouseMove: linkMouseMove, onMouseLeave: linkMouseLeave } = useMagnet();

  return (
    <motion.article
      className={`proj-spread ${reverse ? 'reverse' : ''}`}
      initial={isReducedMotion ? {} : { opacity: 0, x: -60 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{
        duration: 0.7,
        ease: [0.22, 1, 0.36, 1],
      }}
    >

      <div className="proj-media">
        <div className="proj-edition xl">
          Ed. {String(idx + 1).padStart(2, '0')}<span className="of">/ {String(total).padStart(2, '0')}</span>
        </div>
        {p.img ? (
          <motion.div
            className={`proj-image ${p.mobile ? 'mobile' : ''}`}
            whileHover={{ y: -8 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          >
            {/* Corner tape — top-left of project image */}
            <WashiTape
              variant="corner"
              width={40}
              style={{ top: 8, left: -4, zIndex: 5 }}
            />
            <img src={p.img} alt={`${p.name} — ${p.media}`} />
          </motion.div>
        ) : (
          <Placeholder label={p.media} tone={p.tone} />
        )}
        {p.featured && (
          <div className="featured-overlay">
            <motion.div
              className="fe-bar xl"
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ delay: 0.3, type: 'spring', stiffness: 300, damping: 20 }}
            >Featured</motion.div>
          </div>
        )}
        {/* Stamp Slam (Interaction #1) */}
        <div className="stamp-overlay">
          <SlamStamp angle={reverse ? 6 : -6}>{p.stamp}</SlamStamp>
        </div>
        <div className="proj-meta-strip">
          <span><span className="dot">●</span> {p.tags[0]}</span>
          <span>&middot;</span>
          <span>Fig.&nbsp;{p.n}</span>
          <span>&middot;</span>
          <span style={{ textTransform: 'uppercase', letterSpacing: '0.2em' }}>{p.media}</span>
        </div>
      </div>

      <div className="proj-text">
        <div className="proj-feature-tag">{p.tag}</div>
        <h3 className="proj-name">{p.name}<span style={{ color: 'var(--red)' }}>.</span></h3>
        <p className="proj-dek">{p.dek}</p>
        <div className="proj-body">
          {p.body.map((para, i) => <p key={i}>{para}</p>)}
        </div>
        <div className="proj-tags">
          {p.tags.map((t, i) => (
            <span className={`t ${i === 0 ? 'red' : ''}`} key={t}>{t}</span>
          ))}
        </div>
        {p.aside && (
          <div className="proj-aside">{p.aside}</div>
        )}
        {p.link ? (
          <a
            ref={linkRef as React.Ref<HTMLAnchorElement>}
            className="proj-link"
            href={`https://${p.link}`}
            target="_blank"
            rel="noreferrer"
            onMouseMove={linkMouseMove}
            onMouseLeave={linkMouseLeave}
          >
            {p.link}&nbsp;&nbsp;→
          </a>
        ) : (
          <span
            ref={linkRef as React.Ref<HTMLSpanElement>}
            className="proj-link"
            style={{ opacity: 0.45, cursor: 'default' }}
            onMouseMove={linkMouseMove}
            onMouseLeave={linkMouseLeave}
          >
            Read the case study&nbsp;&nbsp;→
          </span>
        )}
      </div>
    </motion.article>
  );
}

export default function Work() {
  return (
    <section className="sheet" data-section="projects" data-screen-label="03 Projects">
      <div className="sheet-inner">
        <header className="sec-head" style={{ alignItems: 'stretch' }}>
          <div className="sec-num ink-bleed">03</div>
          <div>
            <motion.div
              className="drop-block"
              style={{ fontSize: 'clamp(34px, 5vw, 64px)', marginBottom: 12, display: 'inline-block' }}
              initial={{ x: -80, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: [0, 0, 0.2, 1] }}
            >
              Selected Works /
            </motion.div>
            <div className="sec-title" style={{ fontSize: 'clamp(28px, 3.4vw, 44px)', marginTop: 4 }}>
              in chronological disarray
            </div>
          </div>
          <div className="sec-meta">5 of ∞ · the rest live on github</div>
        </header>

        {projects.map((p, i) => (
          <div key={p.name}>
            <ProjectSpread p={p} idx={i} total={projects.length} />
            {i < projects.length - 1 && (
              <div className="dingbat-divider">
                <span className="line" />
                <span>✦</span>
                <span>✦</span>
                <span>✦</span>
                <span className="line" />
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
