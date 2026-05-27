import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import Stamp from '../ui/Stamp';
import Placeholder from '../ui/Placeholder';
import { projects } from '../../data/content';

function ProjectSpread({ p, idx, total }: { p: typeof projects[0]; idx: number; total: number }) {
  const reverse = idx % 2 === 1;
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-5% 0px' });

  return (
    <motion.article
      ref={ref}
      className={`proj-spread ${reverse ? 'reverse' : ''}`}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
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
              animate={inView ? { scale: 1, opacity: 1 } : {}}
              transition={{ delay: 0.3, type: 'spring', stiffness: 300, damping: 20 }}
            >Featured</motion.div>
          </div>
        )}
        <div className="stamp-overlay">
          <Stamp size="md" angle={reverse ? 6 : -6}>{p.stamp}</Stamp>
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
        {p.link ? (
          <a className="proj-link" href={`https://${p.link}`} target="_blank" rel="noreferrer">
            {p.link}&nbsp;&nbsp;→
          </a>
        ) : (
          <span className="proj-link" style={{ opacity: 0.45, cursor: 'default' }}>
            Read the case study&nbsp;&nbsp;→
          </span>
        )}
      </div>
    </motion.article>
  );
}

export default function Work() {
  const titleRef = useRef(null);
  const titleInView = useInView(titleRef, { once: true });

  return (
    <section className="sheet" data-section="projects" data-screen-label="03 Projects">
      <div className="sheet-inner">
        <header className="sec-head" style={{ alignItems: 'stretch' }}>
          <div className="sec-num ink-bleed">03</div>
          <div>
            <motion.div
              ref={titleRef}
              className="drop-block"
              style={{ fontSize: 'clamp(34px, 5vw, 64px)', marginBottom: 12 }}
              initial={{ x: -80, opacity: 0 }}
              animate={titleInView ? { x: 0, opacity: 1 } : {}}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
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
