import { useEffect, useRef } from 'react';
import gsap from 'gsap';

interface PreloaderProps {
  onComplete: () => void;
  key?: string;
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        onComplete();
      }
    });

    // Simulate loading progress
    tl.to(progressRef.current, {
      width: '100%',
      duration: 2,
      ease: 'power3.inOut',
    })
    .to(textRef.current, {
      opacity: 0,
      y: -20,
      duration: 0.5,
      ease: 'power2.in',
    }, '-=0.2')
    .to(containerRef.current, {
      yPercent: -100,
      duration: 1,
      ease: 'power4.inOut',
    }, '-=0.1');

  }, [onComplete]);

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 z-[100] bg-[var(--color-bg-dark)] flex flex-col items-center justify-center"
    >
      <div className="w-full max-w-md px-8">
        <div ref={textRef} className="flex justify-between text-[var(--color-text-dark)] font-mono text-xs uppercase tracking-widest mb-4">
          <span>Loading Experience</span>
          <span>100%</span>
        </div>
        <div className="h-[1px] w-full bg-white/20 overflow-hidden">
          <div ref={progressRef} className="h-full w-0 bg-white" />
        </div>
      </div>
    </div>
  );
}
