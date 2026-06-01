import { motion } from 'framer-motion';
import React from 'react';

/**
 * PrintReveal — Wraps text children with a printing-press wipe animation.
 *
 * Each child line gets covered by a cream rectangle (matching --paper background)
 * that wipes away left→right on scroll-in (revealing text) and right←left on
 * scroll-out (hiding text again). Works bidirectionally via whileInView.
 *
 * Usage:
 *   <PrintReveal>
 *     <span>Line one</span>
 *     <span>Line two</span>
 *   </PrintReveal>
 *
 * Or for a single element:
 *   <PrintReveal as="h2" className="sec-title">Selected Works /</PrintReveal>
 */

interface PrintRevealProps {
  children: React.ReactNode;
  as?: keyof React.JSX.IntrinsicElements;
  className?: string;
  style?: React.CSSProperties;
  staggerDelay?: number; // ms between each line (default 80)
  baseDelay?: number;    // initial delay in seconds (default 0)
  color?: string;        // overlay color (default var(--paper))
}

const EASE = [0.76, 0, 0.24, 1] as [number, number, number, number];
const EASE_EXIT = [0.76, 0, 0.24, 1] as [number, number, number, number];

// For a single block (non-array children)
export function PrintRevealBlock({
  children,
  className = '',
  style = {},
  delay = 0,
  color = 'var(--paper)',
}: {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  delay?: number;
  color?: string;
}) {
  const overlayVariants = {
    // Overlay covers text from the right — text hidden
    hidden: { x: '0%' },
    // Overlay wipes right (exits right) — text revealed
    visible: {
      x: '101%',
      transition: { duration: 0.6, ease: EASE, delay },
    },
    // On scroll back up: overlay re-enters from left — text hidden again  
    exit: {
      x: '0%',
      transition: { duration: 0.36, ease: EASE_EXIT },
    },
  };

  return (
    <span className={`print-reveal-block ${className}`} style={{ position: 'relative', display: 'inline-block', overflow: 'hidden', ...style }}>
      <span className="print-reveal-content">{children}</span>
      <motion.span
        className="print-reveal-overlay"
        style={{
          position: 'absolute',
          inset: 0,
          background: color,
          transformOrigin: 'left center',
          zIndex: 2,
          pointerEvents: 'none',
        }}
        variants={overlayVariants}
        initial="hidden"
        whileInView="visible"
        exit="exit"
        viewport={{ once: true, amount: 0.1 }}
      />
    </span>
  );
}

// Wraps multiple children (lines) with staggered wipe
export default function PrintReveal({
  children,
  as: Tag = 'div',
  className = '',
  style = {},
  staggerDelay = 0.08,
  baseDelay = 0,
  color = 'var(--paper)',
}: PrintRevealProps) {
  const items = React.Children.toArray(children);

  const Wrapper = Tag as React.ElementType;

  if (items.length === 1) {
    return (
      <PrintRevealBlock className={className} style={style} delay={baseDelay} color={color}>
        {children}
      </PrintRevealBlock>
    );
  }

  return (
    <Wrapper className={className} style={style}>
      {items.map((child, i) => (
        <PrintRevealBlock key={i} delay={baseDelay + i * staggerDelay} color={color}>
          {child}
        </PrintRevealBlock>
      ))}
    </Wrapper>
  );
}
