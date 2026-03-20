import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function Cursor() {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    // Set initial position
    gsap.set(cursor, { xPercent: -50, yPercent: -50 });

    const moveCursor = (e: MouseEvent) => {
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.15,
        ease: 'power2.out',
      });
    };

    const handleHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isClickable = target.closest('a, button, input, textarea, select, [data-cursor="pointer"]');
      
      if (isClickable) {
        gsap.to(cursor, {
          scale: 2.5,
          backgroundColor: 'transparent',
          border: '1px solid rgba(244, 244, 240, 0.5)',
          mixBlendMode: 'difference',
          duration: 0.3,
        });
      } else {
        gsap.to(cursor, {
          scale: 1,
          backgroundColor: 'rgba(244, 244, 240, 1)',
          border: 'none',
          mixBlendMode: 'difference',
          duration: 0.3,
        });
      }
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseover', handleHover);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleHover);
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className="fixed top-0 left-0 w-4 h-4 rounded-full bg-[var(--color-text-dark)] pointer-events-none z-50 mix-blend-difference hidden md:block"
      style={{ transform: 'translate(-50%, -50%)' }}
    />
  );
}
