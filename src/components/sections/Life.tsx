import { motion, useInView, type Variants } from 'framer-motion';
import { useRef, useState } from 'react';
import LazyVideo from '../ui/LazyVideo';
import Ticker from '../ui/Ticker';

const SCRAP_ITEMS = [
  { kind: 'polaroid', img: '/images/life-laracon-orange.jpg', label: 'LARACON INDIA 2026 · AHMEDABAD', caption: 'showed up. arms crossed. meant it.', pos: { left: '0%', top: '60px' }, rotate: -8, width: 240, z: 10 },
  { kind: 'polaroid', img: '/images/life-taylor-otwell.jpg', topLabel: 'LARACON INDIA 2026 · AHMEDABAD', label: 'Taylor Otwell · Laracon 2026', caption: 'met the guy who built Laravel. he was taller than expected.', pos: { left: '22%', top: '0' }, rotate: 1.5, width: 400, centerpiece: true, z: 50 },
  { kind: 'polaroid', img: '/images/life-laracon-frame.jpg', label: 'MARCH 2026 · AHMEDABAD', caption: 'met people who build because they cannot help it.', pos: { left: '62%', top: '80px' }, rotate: 6, width: 230, z: 12 },
  { kind: 'note', content: 'thing I learned from the hackathon: if you cannot decide between two features, cut both and ship faster.', pos: { left: '12%', top: '320px' }, rotate: 5, width: 220, z: 20 },
  { kind: 'stamp', content: 'Buildspace S5\n12 weeks · 1 shipped thing\n2024', pos: { left: '82%', top: '300px' }, rotate: 8, width: 220, z: 22 },
  { kind: 'handwritten', content: 'first real tech event. showed up not knowing anyone. left knowing this is my crowd.', pos: { left: '1%', top: '430px' }, rotate: -6, width: 230, size: 'sm', z: 30 },
  { kind: 'handwritten', content: 'Taylor Otwell. yes, that Taylor Otwell.', pos: { left: '26%', top: '500px' }, rotate: -4, width: 360, color: 'red', z: 55 },
  { kind: 'handwritten', content: 'the tote bag cost more than my train ticket.', pos: { left: '63%', top: '470px' }, rotate: 5, width: 230, size: 'sm', z: 30 },
  { kind: 'video', src: '/images/life-hackathon.mp4', topLabel: 'HACKATHON · TEAM ANNOUNCEMENT', caption: 'we did not make the final round. built something real anyway.', pos: { left: '4%', top: '660px' }, rotate: -7, width: 240, z: 40 },
  { kind: 'todo', title: 'to-do, eventually:', lines: ['— build something with 10k users', '— go to a real tech conference', '— figure out what I actually want', { text: 'call ma back', circled: true, prefix: '— ' }], pos: { left: '30%', top: '700px' }, rotate: 4, width: 250, z: 38 },
  { kind: 'ticket', pos: { left: '55%', top: '680px' }, rotate: -6, z: 42 },
  { kind: 'handwritten', content: '* the rejection was part of the education.', pos: { left: '1%', top: '1010px' }, rotate: -4, width: 280, color: 'red', size: 'sm', z: 45 },
  { kind: 'handwritten', content: 'still pending ↑', pos: { left: '33%', top: '1010px' }, rotate: -8, width: 180, color: 'red', z: 46 },
  { kind: 'notebook', img: '/images/life-good-vibes.jpg', topLabel: 'THE BUILDER, OFF DUTY', pos: { left: '0%', top: '1110px' }, rotate: -12, width: 250, z: 60 },
  { kind: 'notebook', img: '/images/life-late-night-drives.jpg', topLabel: 'WHERE IDEAS ACTUALLY HAPPEN', pos: { left: '22%', top: '1080px' }, rotate: 9, width: 240, z: 62 },
  { kind: 'notebook', img: '/images/life-burger-joint.jpg', topLabel: 'RESEARCH. DEFINITELY RESEARCH.', pos: { left: '48%', top: '1140px' }, rotate: -5, width: 240, z: 64 },
  { kind: 'polaroid', img: '/images/life-laracon-frame.jpg', label: 'AHMEDABAD', caption: 'more of the same. no regrets.', pos: { left: '72%', top: '1090px' }, rotate: 11, width: 210, z: 66 },
  { kind: 'handwritten', content: '* mostly vibes. occasionally code.', pos: { left: '24%', top: '1620px' }, rotate: -3, width: 420, z: 70 },
];

function ScrapItem({ it, i }: { it: typeof SCRAP_ITEMS[0]; i: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '0px 0px -5% 0px' });
  const [hovered, setHovered] = useState(false);
  const originalRotate = it.rotate ?? 0;
  const isCenterpiece = 'centerpiece' in it && it.centerpiece;

  const style: React.CSSProperties = {
    ...it.pos as React.CSSProperties,
    width: it.width,
    zIndex: it.z != null ? it.z : i,
  };

  const variants: Variants = {
    hidden: { opacity: 0, y: -40, rotate: originalRotate },
    visible: {
      opacity: 1, y: 0, rotate: originalRotate,
      transition: {
        delay: (isCenterpiece ? 0.4 : 0.1) + i * 0.04,
        duration: isCenterpiece ? 0.8 : 0.6,
        type: 'spring' as const, stiffness: isCenterpiece ? 120 : 200, damping: isCenterpiece ? 20 : 22,
      },
    },
  };

  const renderContent = () => {
    if (it.kind === 'polaroid') {
      return (
        <div className={`polaroid ${isCenterpiece ? 'centerpiece' : ''}`}>
          <span className="tape" />
          {isCenterpiece && 'topLabel' in it && it.topLabel && <div className="toplabel">{it.topLabel as string}</div>}
          <img className="scrap-img" src={it.img as string} alt={it.label as string} />
          <div className="caption">{it.caption as string}</div>
          {isCenterpiece && hovered && (
            <div style={{ position: 'absolute', bottom: -32, left: '50%', transform: 'translateX(-50%)', background: 'var(--ink)', color: 'var(--paper)', fontFamily: 'var(--ff-mono)', fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', padding: '4px 10px', whiteSpace: 'nowrap', pointerEvents: 'none' }}>
              yes, that Taylor Otwell.
            </div>
          )}
        </div>
      );
    }
    if (it.kind === 'video') {
      return (
        <div className="video-card">
          <span className="v-tape" />
          {'topLabel' in it && it.topLabel && <div className="v-toplabel">{it.topLabel as string}</div>}
          <div className="v-frame"><LazyVideo src={it.src as string} /></div>
          <div className="v-caption">{it.caption as string}</div>
        </div>
      );
    }
    if (it.kind === 'notebook') {
      return (
        <>
          {'topLabel' in it && it.topLabel && <div className="scrap-toplabel">{it.topLabel as string}</div>}
          <div className="scrap-notebook"><img src={it.img as string} alt="notebook page" /></div>
        </>
      );
    }
    if (it.kind === 'note') {
      return <div className="scrap-note">{it.content as string}</div>;
    }
    if (it.kind === 'todo') {
      const todoIt = it as { title: string; lines: (string | { text: string; circled: boolean; prefix: string })[] };
      return (
        <div className="scrap-note">
          <div>{todoIt.title}</div>
          {todoIt.lines.map((l, j) =>
            typeof l === 'string'
              ? <div key={j}>{l}</div>
              : <div key={j}>{l.prefix || ''}<span className="note-circled">{l.text}</span></div>
          )}
        </div>
      );
    }
    if (it.kind === 'ticket') {
      return (
        <div className="scrap-ticket">
          <div>ADMIT ONE</div>
          <div className="big">night shift</div>
          <div className="red">11:42pm — 03:08am</div>
          <div>row D · seat 14 · no refunds</div>
          <div style={{ marginTop: 8, fontFamily: 'var(--ff-serif)', textTransform: 'none', letterSpacing: 0, fontStyle: 'italic', fontSize: 12, color: 'rgba(243,236,222,0.78)' }}>
            seat 14. nobody else in the building. best night of the year.
          </div>
        </div>
      );
    }
    if (it.kind === 'stamp') {
      return (
        <div className="scrap-stamp">
          {(it.content as string).split('\n').map((l, j) => <div key={j}>{l}</div>)}
        </div>
      );
    }
    if (it.kind === 'handwritten') {
      return (
        <div className="scrap-handwritten messy" style={{ fontSize: it.size === 'sm' ? 23 : 36, color: it.color === 'red' ? 'var(--red)' : 'var(--ink)', lineHeight: 1.15 }}>
          <span style={{ color: 'var(--red)', marginRight: 8, fontFamily: 'var(--ff-display)', fontStyle: 'normal' }}>✦</span>
          {it.content as string}
        </div>
      );
    }
    return null;
  };

  const dynamicStyle = { ...style, zIndex: hovered ? 200 : (it.z ?? i) };

  return (
    <motion.div
      ref={ref}
      className={`scrap-item${isCenterpiece ? ' breakout' : ''}`}
      style={dynamicStyle}
      variants={variants}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      whileHover={{ rotate: 0, y: -6, scale: 1.04, transition: { type: 'spring' as const, stiffness: 300, damping: 22 } }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
    >
      {renderContent()}
    </motion.div>
  );
}

export default function Life() {
  return (
    <section className="sheet" data-section="life" data-screen-label="05 Life" style={{ paddingLeft: 70 }}>
      <div className="life-redbar" />
      <div className="life-megatype" aria-hidden="true">
        <span className="a">LIFE</span>
        <span className="b">LIFE</span>
      </div>
      <div className="sheet-inner">
        <header className="sec-head" style={{ alignItems: 'flex-end', borderBottom: '6px solid var(--red)' }}>
          <div className="sec-num ink-bleed">05</div>
          <h2 className="life-bigtitle">
            <span className="num">05</span>
            Beyond <span className="ampersand">&amp;</span> The Screen
          </h2>
          <div className="sec-meta">photographs · margins · misc.</div>
        </header>

        <p className="life-intro">
          A twenty-year-old CS student from Delhi.
          This is what the year looked like.
        </p>

        <div className="scrap chaos">
          {SCRAP_ITEMS.map((it, i) => <ScrapItem key={i} it={it} i={i} />)}
        </div>

        <div style={{ marginTop: 80 }}>
          <Ticker className="legal-ticker" items={['Photographs taken', 'Greater Noida', 'Ahmedabad', '2024–2026', 'All rights reserved', 'Probably not though']} />
        </div>
      </div>
    </section>
  );
}
