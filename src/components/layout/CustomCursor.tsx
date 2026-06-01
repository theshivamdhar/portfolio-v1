import { useEffect, useRef, useState } from 'react';

/**
 * CustomCursor — Red dot + trailing ring cursor.
 *
 * NEW: Red ink dot trail (interaction #4)
 *   - Object pool of 12 pre-created dots
 *   - Created every 40ms of movement
 *   - Each dot: 2–4px circle, red accent, fades over 600ms
 *   - Organic feel via random sizing
 *   - Disabled on touch devices & prefers-reduced-motion
 *
 * Stamp cursor state (interaction #10 easter egg):
 *   - When body has class "cursor-stamp", show stamp emoji cursor
 */

const POOL_SIZE = 12;
const DOT_INTERVAL_MS = 40;
const DOT_FADE_MS = 600;

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [hovering, setHovering] = useState(false);
  const [stampMode, setStampMode] = useState(false);
  const ringPos = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number>(0);

  // Ink dot trail pool
  const dotPoolRef = useRef<HTMLDivElement[]>([]);
  const poolIndexRef = useRef(0);
  const lastDotTimeRef = useRef(0);
  const lastMousePos = useRef({ x: -999, y: -999 });
  const isMovingRef = useRef(false);
  const idleTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isTouch) return;

    // ─── Create dot pool ───
    if (!isReducedMotion) {
      const pool: HTMLDivElement[] = [];
      for (let i = 0; i < POOL_SIZE; i++) {
        const d = document.createElement('div');
        d.className = 'ink-dot';
        d.style.cssText = `
          position: fixed;
          border-radius: 50%;
          pointer-events: none;
          z-index: 99997;
          opacity: 0;
          transform: translate(-50%, -50%);
          background: var(--red, #C92A1C);
          will-change: opacity, transform;
        `;
        document.body.appendChild(d);
        pool.push(d);
      }
      dotPoolRef.current = pool;
    }

    let mouseX = 0, mouseY = 0;

    const spawnDot = (x: number, y: number) => {
      if (isReducedMotion) return;
      const now = performance.now();
      if (now - lastDotTimeRef.current < DOT_INTERVAL_MS) return;
      lastDotTimeRef.current = now;

      const dot = dotPoolRef.current[poolIndexRef.current % POOL_SIZE];
      if (!dot) return;
      poolIndexRef.current++;

      // Random size 2–4px
      const size = 2 + Math.random() * 2;
      dot.style.width = `${size}px`;
      dot.style.height = `${size}px`;
      dot.style.left = `${x}px`;
      dot.style.top = `${y}px`;
      dot.style.opacity = '0.6';
      dot.style.animation = 'none';
      // Force reflow so animation restarts
      void dot.offsetWidth;
      dot.style.animation = `inkDotFade ${DOT_FADE_MS}ms ease-out forwards`;
    };

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      if (dotRef.current) {
        dotRef.current.style.left = mouseX + 'px';
        dotRef.current.style.top = mouseY + 'px';
      }

      // Spawn trail dot
      const dx = mouseX - lastMousePos.current.x;
      const dy = mouseY - lastMousePos.current.y;
      const moved = Math.sqrt(dx * dx + dy * dy);
      if (moved > 2) {
        lastMousePos.current = { x: mouseX, y: mouseY };
        isMovingRef.current = true;
        spawnDot(mouseX, mouseY);
        // Reset idle timer
        if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
        idleTimerRef.current = setTimeout(() => {
          isMovingRef.current = false;
        }, 150);
      }
    };

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
    const tick = () => {
      ringPos.current.x = lerp(ringPos.current.x, mouseX, 0.12);
      ringPos.current.y = lerp(ringPos.current.y, mouseY, 0.12);
      if (ringRef.current) {
        ringRef.current.style.left = ringPos.current.x + 'px';
        ringRef.current.style.top = ringPos.current.y + 'px';
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);

    const onOver = (e: MouseEvent) => {
      const t = e.target as Element;
      setHovering(!!(t?.closest('a, button, [role="button"], .scrap-item, .proj-link')));
    };

    // Watch for body stamp-cursor class (easter egg)
    const observer = new MutationObserver(() => {
      setStampMode(document.body.classList.contains('cursor-stamp'));
    });
    observer.observe(document.body, { attributes: true, attributeFilter: ['class'] });

    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseover', onOver);

    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseover', onOver);
      cancelAnimationFrame(rafRef.current);
      observer.disconnect();
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
      // Clean up dot pool
      dotPoolRef.current.forEach(d => d.parentNode?.removeChild(d));
    };
  }, []);

  if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) return null;

  return (
    <>
      <div
        ref={dotRef}
        className={`custom-cursor-dot${hovering ? ' hovering' : ''}${stampMode ? ' stamp-mode' : ''}`}
      />
      <div
        ref={ringRef}
        className={`custom-cursor-ring${hovering ? ' hovering' : ''}${stampMode ? ' stamp-mode' : ''}`}
      />
    </>
  );
}
