import React, { useEffect, useRef, useState } from 'react';
import { FiUser } from 'react-icons/fi';

const YouTracker = () => {
  const youRef = useRef(null);
  const [enabled, setEnabled] = useState(false);

  // Only enable on devices that actually have a mouse/fine pointer.
  // (maxTouchPoints is > 0 on many laptops with touchscreens, so we base the
  //  decision on the pointer media queries instead — pure touch phones report
  //  "coarse" and stay disabled.)
  useEffect(() => {
    if (typeof window.matchMedia !== 'function') {
      setEnabled(!('ontouchstart' in window) && navigator.maxTouchPoints === 0);
      return;
    }
    const fine = window.matchMedia('(pointer: fine)').matches;
    const anyFine = window.matchMedia('(any-pointer: fine)').matches;
    setEnabled(fine || anyFine);
  }, []);

  useEffect(() => {
    if (!enabled) return;

    let rafId;
    let currentX = window.innerWidth;
    let currentY = window.innerHeight;
    let targetX = window.innerWidth;
    let targetY = window.innerHeight;
    let started = false;
    let lastColorCheck = 0;

    const luminanceOf = ({ r, g, b }) => {
      const lin = (c) => {
        c = c / 255;
        return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
      };
      return 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);
    };

    // Walk up ancestors blending translucent backgrounds onto an opaque base
    const effectiveBackground = (el) => {
      let r = 255, g = 255, b = 255;
      let current = el;
      let depth = 0;
      while (current && depth < 15 && current !== document.documentElement) {
        const cs = window.getComputedStyle(current);
        const bg = cs.backgroundColor;
        if (bg && bg !== 'transparent' && !bg.startsWith('rgba(0, 0, 0, 0)')) {
          const m = bg.match(/[\d.]+/g);
          if (m && m.length >= 3) {
            const a = m.length >= 4 ? Math.min(1, parseFloat(m[3])) : 1;
            r = +m[0] * a + r * (1 - a);
            g = +m[1] * a + g * (1 - a);
            b = +m[2] * a + b * (1 - a);
          }
        }
        current = current.parentElement;
        depth++;
      }
      return { r, g, b };
    };

    const applyContrast = (bg) => {
      const now = performance.now();
      if (now - lastColorCheck < 60) return;
      lastColorCheck = now;
      if (!youRef.current) return;
      youRef.current.dataset.dark = luminanceOf(bg) > 0.5 ? '1' : '0';
    };

    const handleMouseMove = (e) => {
      targetX = e.clientX;
      targetY = e.clientY;
      started = true;
    };

    const loop = () => {
      if (started && youRef.current) {
        currentX += (targetX - currentX) * 0.14;
        currentY += (targetY - currentY) * 0.14;
        youRef.current.style.transform =
          `translate3d(${currentX}px, ${currentY}px, 0)`;
        youRef.current.style.opacity = '1';

        const el = document.elementFromPoint(targetX, targetY);
        if (el) {
          applyContrast(effectiveBackground(el));
        }
      }
      rafId = requestAnimationFrame(loop);
    };

    window.addEventListener('mousemove', handleMouseMove);
    rafId = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(rafId);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div
      ref={youRef}
      data-dark="1"
      className="you-tracker fixed top-0 left-0 z-[200] pointer-events-none opacity-0"
      style={{ willChange: 'transform' }}
    >
      <div className="you-tracker-badge flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border shadow-lg transition-colors duration-300">
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
        <FiUser className="w-3 h-3" />
        <span className="tracking-wider">YOU</span>
      </div>
    </div>
  );
};

export default YouTracker;
