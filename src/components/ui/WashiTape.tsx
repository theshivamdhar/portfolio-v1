import { motion } from 'framer-motion';

type WashiVariant = 'horizontal' | 'vertical' | 'label' | 'corner';

interface WashiTapeProps {
  variant: WashiVariant;
  width?: number | string;
  height?: number | string;
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  animate?: boolean;
  delay?: number;
}

const ROUGH_FILTER_ID = 'washi-rough';

const roughFilter = (
  <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true">
    <defs>
      <filter id={ROUGH_FILTER_ID} x="-5%" y="-30%" width="110%" height="160%">
        <feTurbulence type="fractalNoise" baseFrequency="0.85 0.12" numOctaves={2} result="noise" />
        <feDisplacementMap in="SourceGraphic" in2="noise" scale={2.5} xChannelSelector="R" yChannelSelector="G" />
      </filter>
    </defs>
  </svg>
);

const tapeStyle: React.CSSProperties = {
  backgroundColor: 'var(--red)',
  height: 22,
  position: 'relative',
  overflow: 'visible',
};

const noiseOverlay: React.CSSProperties = {
  position: 'absolute',
  inset: 0,
  backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='22'><filter id='g'><feTurbulence baseFrequency='0.85' numOctaves='2'/><feColorMatrix values='0 0 0 0 0.78 0 0 0 0 0.15 0 0 0 0 0.1 0 0 0 0.18 0'/></filter><rect width='100%' height='100%' filter='url(%23g)'/></svg>")`,
  mixBlendMode: 'multiply',
  pointerEvents: 'none',
  zIndex: 1,
};

const textStyle: React.CSSProperties = {
  fontFamily: 'var(--ff-hand)',
  color: '#fff',
  fontSize: 12,
  fontWeight: 500,
  position: 'relative',
  zIndex: 2,
  lineHeight: 1,
};

export default function WashiTape({
  variant,
  width,
  height,
  children,
  className = '',
  style,
  animate = false,
  delay = 0,
}: WashiTapeProps) {
  if (variant === 'horizontal') {
    const el = (
      <div
        className={`washi-tape washi-horizontal ${className}`}
        style={{ ...tapeStyle, width: width ?? '100%', ...style }}
      >
        <div style={noiseOverlay} aria-hidden="true" />
      </div>
    );
    if (!animate) return el;
    return (
      <motion.div
        className={`washi-tape washi-horizontal ${className}`}
        style={{ ...tapeStyle, width: width ?? '100%', transformOrigin: 'left', ...style }}
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ delay, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        <div style={noiseOverlay} aria-hidden="true" />
      </motion.div>
    );
  }

  if (variant === 'vertical') {
    const el = (
      <div
        className={`washi-tape washi-vertical ${className}`}
        style={{
          ...tapeStyle,
          width: 22,
          height: height ?? 200,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          ...style,
        }}
      >
        <div style={noiseOverlay} aria-hidden="true" />
        {children && (
          <span style={{ ...textStyle, writingMode: 'vertical-rl', transform: 'rotate(180deg)', letterSpacing: '0.1em' }}>
            {children}
          </span>
        )}
      </div>
    );
    if (!animate) return el;
    return (
      <motion.div
        className={`washi-tape washi-vertical ${className}`}
        style={{
          ...tapeStyle,
          width: 22,
          height: height ?? 200,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          ...style,
        }}
        initial={{ y: '-100%', opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay, type: 'spring', stiffness: 320, damping: 28 }}
      >
        <div style={noiseOverlay} aria-hidden="true" />
        {children && (
          <span style={{ ...textStyle, writingMode: 'vertical-rl', transform: 'rotate(180deg)', letterSpacing: '0.1em' }}>
            {children}
          </span>
        )}
      </motion.div>
    );
  }

  if (variant === 'label') {
    return (
      <div
        className={`washi-tape washi-label ${className}`}
        style={{
          ...tapeStyle,
          display: 'inline-flex',
          alignItems: 'center',
          padding: '0 16px',
          width: 'auto',
          height: 22,
          ...style,
        }}
      >
        <div style={noiseOverlay} aria-hidden="true" />
        {children && (
          <span style={{ ...textStyle, whiteSpace: 'nowrap' }}>
            {children}
          </span>
        )}
      </div>
    );
  }

  if (variant === 'corner') {
    return (
      <>
        {roughFilter}
        <div
          className={`washi-tape washi-corner ${className}`}
          style={{
            ...tapeStyle,
            width: width ?? 40,
            height: 22,
            transform: 'rotate(45deg)',
            transformOrigin: 'center',
            position: 'absolute',
            filter: `url(#${ROUGH_FILTER_ID})`,
            ...style,
          }}
        >
          <div style={noiseOverlay} aria-hidden="true" />
        </div>
      </>
    );
  }

  return null;
}
