import { useRef } from 'react';

interface TickerProps {
  items: string[];
  className?: string;
}

/**
 * Ticker — Scrolling marquee strip.
 *
 * Interaction #8: Speeds up on hover
 *   - Default: 30s per full loop
 *   - Hover: 8s per full loop (transition: 300ms ease)
 *   - Leave: returns to 30s (transition: 600ms ease, slower return)
 *   - Subtle blur(0.5px) during acceleration
 */
export default function Ticker({ items, className = '' }: TickerProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const isReducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const handleMouseEnter = () => {
    if (isReducedMotion) return;
    const el = trackRef.current;
    if (!el) return;
    el.style.transition = 'animation-duration 300ms ease, filter 300ms ease';
    el.style.animationDuration = '8s';
    el.style.filter = 'blur(0.5px)';
  };

  const handleMouseLeave = () => {
    const el = trackRef.current;
    if (!el) return;
    el.style.transition = 'animation-duration 600ms ease, filter 600ms ease';
    el.style.animationDuration = '30s';
    el.style.filter = 'blur(0)';
  };

  const half = items.map((t, i) => (
    <span key={i} style={{ display: 'inline-flex', alignItems: 'center', gap: 18 }}>
      {t}
      <span className="dot">●</span>
    </span>
  ));

  return (
    <div
      className={`ticker ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div ref={trackRef} className="ticker-track ticker-speed">
        <span>{half}</span>
        <span>{half}</span>
      </div>
    </div>
  );
}
