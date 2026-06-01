import { useRef, useCallback } from 'react';

/**
 * useMagnet — attach to any button/link for magnetic cursor pull.
 * Returns { ref, onMouseMove, onMouseLeave } to spread onto the element.
 *
 * Behaviour:
 *   - Within 60px radius: element translates toward cursor (max 12px)
 *   - Movement proportional to distance (closer = stronger pull)
 *   - On leave: spring snap-back via CSS transition
 *   - Uses translate3d for GPU acceleration
 *   - Disabled on touch devices & prefers-reduced-motion
 */

const RADIUS = 60;
const MAX_SHIFT = 12;

function isReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function isTouch() {
  return window.matchMedia('(pointer: coarse)').matches;
}

export function useMagnet() {
  const ref = useRef<HTMLElement>(null);

  const onMouseMove = useCallback((e: React.MouseEvent) => {
    if (isReducedMotion() || isTouch()) return;
    const el = ref.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = e.clientX - cx;
    const dy = e.clientY - cy;
    const dist = Math.sqrt(dx * dx + dy * dy);

    if (dist < RADIUS) {
      // Closer = stronger pull. Linear falloff from RADIUS→0
      const strength = (1 - dist / RADIUS);
      const tx = dx * strength * (MAX_SHIFT / RADIUS) * 2;
      const ty = dy * strength * (MAX_SHIFT / RADIUS) * 2;

      el.style.transition = 'transform 0.1s ease-out';
      el.style.transform = `translate3d(${tx}px,${ty}px,0)`;
    }
  }, []);

  const onMouseLeave = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    // Spring snap-back: stiffness≈300, damping≈20 feel via transition timing
    el.style.transition = 'transform 0.5s cubic-bezier(0.34,1.56,0.64,1)';
    el.style.transform = 'translate3d(0,0,0)';
  }, []);

  // Check if on parent element enter (within 60px but not necessarily over it)
  const onMouseEnterParent = useCallback((e: React.MouseEvent) => {
    if (isReducedMotion() || isTouch()) return;
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = e.clientX - cx;
    const dy = e.clientY - cy;
    const dist = Math.sqrt(dx * dx + dy * dy);
    if (dist < RADIUS) {
      const strength = (1 - dist / RADIUS);
      const tx = dx * strength * (MAX_SHIFT / RADIUS) * 2;
      const ty = dy * strength * (MAX_SHIFT / RADIUS) * 2;
      el.style.transition = 'transform 0.1s ease-out';
      el.style.transform = `translate3d(${tx}px,${ty}px,0)`;
    }
  }, []);

  return { ref, onMouseMove, onMouseLeave, onMouseEnterParent };
}
