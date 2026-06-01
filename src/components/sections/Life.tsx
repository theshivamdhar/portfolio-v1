import WashiTape from '../ui/WashiTape';
import { PrintRevealBlock } from '../ui/PrintReveal';

const PHOTO_FILTER = 'sepia(22%) contrast(1.04) brightness(0.97)';

export default function Life() {
  return (
    <section className="sheet" data-section="life" data-screen-label="05 Life">

      {/* Large faded background word — same treatment as Philosophy's bg-word */}
      <span
        className="bg-word"
        style={{ top: '12%', left: '-2%', transform: 'rotate(-5deg)', fontSize: 'clamp(200px, 26vw, 360px)', color: 'var(--red)', opacity: 0.05 }}
        aria-hidden="true"
      >LIFE</span>

      <div className="sheet-inner">

        {/* ── Section header — unchanged ── */}
        <header className="sec-head">
          <div className="sec-num ink-bleed">05</div>
          <div>
            <PrintRevealBlock style={{ display: 'block' }} delay={0}>
              <span className="sec-title">Beyond &amp; The Screen</span>
            </PrintRevealBlock>
            <div style={{ marginTop: 10, display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              <span className="notes-header-badge">photographs · misc.</span>
              <span className="notes-header-badge" style={{ color: 'var(--red)', borderColor: 'var(--red)' }}>field notes</span>
              <span className="notes-header-badge">2025–2026</span>
            </div>
          </div>
          <div className="sec-meta">photographs · margins · misc.</div>
        </header>

        {/* ════════════════════════════════════════════════
            NOTEBOOK PAGE — mirrors Philosophy's .notes-page
        ════════════════════════════════════════════════ */}
        <div className="life-page">

          {/* "2026" watermark — mirrors Philosophy's draft-watermark */}
          <div className="life-draft-word" aria-hidden="true">2026</div>

          {/* ── LEFT MARGIN NOTES ── */}
          <div className="margin-note" style={{ top: 80, left: 18, width: 84 }}>
            <div>showed up</div>
            <div>not knowing</div>
            <div>anyone.</div>
          </div>
          <div className="margin-note" style={{ top: 340, left: 18, width: 84 }}>
            <div>yes. that</div>
            <div>Taylor Otwell.</div>
          </div>
          <div className="margin-note" style={{ top: 700, left: 18, width: 84 }}>
            <div>first time</div>
            <div>this felt</div>
            <div>like my room.</div>
          </div>
          <div className="margin-note" style={{ top: 1120, left: 18, width: 84 }}>
            <div>we waited</div>
            <div>for the call.</div>
            <div>it was no.</div>
          </div>
          <div className="margin-note" style={{ top: 1760, left: 18, width: 84 }}>
            <div>off hours.</div>
            <div>still thinking</div>
            <div>about code.</div>
          </div>

          {/* ── RIGHT MARGIN NOTES ── */}
          <div className="margin-note right" style={{ top: 60, right: 18, width: 90 }}>
            <div>LARACON.IN</div>
            <div style={{ marginTop: 2 }}>MAY 2026</div>
            <div style={{ marginTop: 2 }}>AHMEDABAD</div>
          </div>
          <div className="margin-note right" style={{ top: 1080, right: 18, width: 90 }}>
            <div style={{ fontFamily: 'var(--ff-hand)', fontSize: 11, textAlign: 'right' }}>the announcement</div>
            <div style={{ fontFamily: 'var(--ff-hand)', fontSize: 11, textAlign: 'right', marginTop: 2 }}>we did not want</div>
            <div style={{ fontFamily: 'var(--ff-hand)', fontSize: 11, textAlign: 'right', marginTop: 2 }}>to hear.</div>
          </div>
          <div className="margin-note right" style={{ top: 1740, right: 18, width: 90, opacity: 0.65 }}>
            <div>★★★★☆</div>
            <div style={{ marginTop: 2 }}>still pending.</div>
          </div>

          {/* ════ MOMENT 1 — LARACON ════ */}

          <div style={{ marginBottom: 20, position: 'relative', zIndex: 2 }}>
            <WashiTape variant="label">LARACON</WashiTape>
          </div>

          {/* PHOTO 1 — float left */}
          <div
            className="life-float-photo"
            style={{ float: 'left', marginRight: 48, marginBottom: 24, transform: 'rotate(-1.5deg)', position: 'relative', zIndex: 2 }}
          >
            <div style={{ border: '14px solid #fff', boxShadow: '0 3px 16px rgba(13,11,8,0.10)', lineHeight: 0, display: 'inline-block' }}>
              <img
                src="/images/life-laracon-orange.jpg"
                alt="Laracon India 2026"
                loading="lazy"
                style={{ display: 'block', maxWidth: 380, maxHeight: 440, width: '100%', objectFit: 'cover', objectPosition: 'center top', filter: PHOTO_FILTER }}
              />
            </div>
            <p className="photo-caption">showed up. arms crossed. meant it.</p>
          </div>

          {/* PHOTO 2 — float right, dropped 48px */}
          <div
            className="life-float-photo"
            style={{ float: 'right', marginLeft: 48, marginTop: 48, transform: 'rotate(1deg)', position: 'relative', zIndex: 2 }}
          >
            <div style={{ border: '14px solid #fff', boxShadow: '0 3px 16px rgba(13,11,8,0.10)', lineHeight: 0, display: 'inline-block' }}>
              <img
                src="/images/life-taylor-otwell.jpg"
                alt="With Taylor Otwell at Laracon India 2026"
                loading="lazy"
                style={{ display: 'block', maxWidth: 320, maxHeight: 380, width: '100%', objectFit: 'cover', filter: PHOTO_FILTER }}
              />
            </div>
            <p className="photo-caption">met Taylor Otwell. yes, that one.<br />he was taller than expected.</p>
            <p className="photo-annotation red italic">first time in a room full of people who build for a living. changed how I see everything.</p>
          </div>

          {/* Clearfix after Photos 1 and 2 */}
          <div style={{ clear: 'both' }} />

          {/* PHOTO 3 — below, slight indent */}
          <div style={{ marginLeft: 48, marginTop: 24, transform: 'rotate(0.5deg)', display: 'inline-block', position: 'relative', zIndex: 2 }}>
            <div style={{ border: '14px solid #fff', boxShadow: '0 3px 16px rgba(13,11,8,0.10)', lineHeight: 0 }}>
              <img
                src="/images/life-laracon-frame.jpg"
                alt="Laracon India 2026 — community hall"
                loading="lazy"
                style={{ display: 'block', maxWidth: 460, maxHeight: 300, width: '100%', objectFit: 'cover', objectPosition: 'center', filter: PHOTO_FILTER }}
              />
            </div>
            <p className="photo-caption">met people who build because they cannot help it.</p>
          </div>

          <div style={{ clear: 'both', marginBottom: 64 }} />

          {/* ♦ ♦ ♦ */}
          <div className="moment-separator">♦ &nbsp; ♦ &nbsp; ♦</div>

          {/* ════ MOMENT 2 — HACKATHON VIDEO ════ */}
          <div style={{ maxWidth: 520, margin: '0 auto', transform: 'rotate(-0.5deg)', position: 'relative', zIndex: 2 }}>
            <div style={{ border: '14px solid #fff', boxShadow: '0 3px 16px rgba(13,11,8,0.10)', overflow: 'hidden', background: '#111', aspectRatio: '16/9' }}>
              <video
                autoPlay
                muted
                loop
                playsInline
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', filter: PHOTO_FILTER }}
              >
                <source src="/images/life-hackathon.mp4" type="video/mp4" />
              </video>
            </div>
            <p className="photo-caption" style={{ textAlign: 'center', marginTop: 10 }}>
              the team announcement.<br />
              we did not make the final round.<br />
              built something real anyway.
            </p>
          </div>

          <div style={{ marginBottom: 64 }} />

          {/* ♦ ♦ ♦ */}
          <div className="moment-separator">♦ &nbsp; ♦ &nbsp; ♦</div>

          {/* ════ MOMENT 3 — PERSONAL PHOTOS ════ */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', maxWidth: 700, gap: 16, margin: '0 auto', position: 'relative', zIndex: 2 }}>

            <div style={{ transform: 'rotate(-2deg)' }}>
              <div style={{ border: '12px solid #fff', boxShadow: '0 2px 12px rgba(13,11,8,0.09)', lineHeight: 0 }}>
                <img
                  src="/images/life-good-vibes.jpg"
                  alt="Off duty"
                  loading="lazy"
                  style={{ display: 'block', width: '100%', aspectRatio: '1/1', objectFit: 'cover', objectPosition: 'center', filter: PHOTO_FILTER }}
                />
              </div>
              <p className="photo-caption" style={{ textAlign: 'center' }}>off duty. mostly.</p>
            </div>

            <div style={{ transform: 'rotate(1deg)' }}>
              <div style={{ border: '12px solid #fff', boxShadow: '0 2px 12px rgba(13,11,8,0.09)', lineHeight: 0 }}>
                <img
                  src="/images/life-late-night-drives.jpg"
                  alt="Late night drives"
                  loading="lazy"
                  style={{ display: 'block', width: '100%', aspectRatio: '1/1', objectFit: 'cover', objectPosition: 'center', filter: PHOTO_FILTER }}
                />
              </div>
              <p className="photo-caption" style={{ textAlign: 'center' }}>where ideas actually happen.</p>
            </div>

            <div style={{ transform: 'rotate(-1.5deg)' }}>
              <div style={{ border: '12px solid #fff', boxShadow: '0 2px 12px rgba(13,11,8,0.09)', lineHeight: 0 }}>
                <img
                  src="/images/life-burger-joint.jpg"
                  alt="Research. Definitely research."
                  loading="lazy"
                  style={{ display: 'block', width: '100%', aspectRatio: '1/1', objectFit: 'cover', objectPosition: 'center', filter: PHOTO_FILTER }}
                />
              </div>
              <p className="photo-caption" style={{ textAlign: 'center' }}>research. definitely research.</p>
            </div>

          </div>

          {/* Final handwritten annotation */}
          <div style={{ textAlign: 'center', marginTop: 40, marginBottom: 80, position: 'relative', zIndex: 2 }}>
            <span style={{ fontFamily: 'Caveat, cursive', fontSize: 15, color: 'var(--red)', fontStyle: 'italic', opacity: 0.8 }}>
              showed up. figured it out. still going.
            </span>
          </div>

          {/* Mobile-only consolidated margin notes */}
          <div className="mobile-margin-notes-block">
            {[
              'showed up not knowing anyone.',
              'yes. that Taylor Otwell.',
              'first time this felt like my room.',
              'we waited for the call. it was no.',
              'off hours. still thinking about code.',
            ].map((note, i) => (
              <div className="mnb-item" key={i}>
                <span className="star">★</span>{note}
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
