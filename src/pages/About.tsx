import { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -100]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.reveal-text', {
        y: 50,
        opacity: 0,
        duration: 1,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="bg-[var(--color-bg-dark)] min-h-screen text-[var(--color-text-dark)] pt-32 md:pt-48 px-6 md:px-20">
      <div className="max-w-7xl mx-auto" ref={containerRef}>
        
        <h1 className="text-[8vw] leading-[0.9] font-serif tracking-tighter uppercase mb-24">
          <div className="overflow-hidden"><div className="reveal-text">The Intersection</div></div>
          <div className="overflow-hidden"><div className="reveal-text flex items-center gap-8">
            <span className="italic font-light">Of Design</span>
            <div className="h-[1px] w-32 bg-white/50 mt-4" />
          </div></div>
          <div className="overflow-hidden"><div className="reveal-text">& Engineering.</div></div>
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 mb-32">
          <div className="font-mono text-xs uppercase tracking-widest text-white/50">
            My Philosophy
          </div>
          <div className="text-xl md:text-3xl font-serif leading-relaxed">
            <p className="mb-8 reveal-text">
              I am Abhinav Verma, a creative developer specializing in bringing high-end designs to life. 
              I believe that a beautiful interface is worthless if it performs poorly.
            </p>
            <p className="text-white/70 reveal-text">
              With a deep foundation in computer science and scalable systems, I ensure that every 
              beautiful interface is backed by flawless, performant code. I bridge the gap between 
              aesthetic rigor and technical excellence.
            </p>
          </div>
        </div>

        <div className="relative h-[60vh] md:h-[80vh] w-full overflow-hidden rounded-2xl mb-32">
          <motion.img 
            style={{ y }}
            src="https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=2069&auto=format&fit=crop" 
            alt="Architecture" 
            className="w-full h-[120%] object-cover absolute top-[-10%]"
            referrerPolicy="no-referrer"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 mb-32 border-t border-white/20 pt-16">
          {[
            { title: 'Precision', desc: 'Mathematical rigor applied to typography, spacing, and layout grids. No pixel is placed without intent.' },
            { title: 'Aesthetic Rigor', desc: 'Uncompromising art direction that elevates brands above their competitors through cinematic visual storytelling.' },
            { title: 'Technical Excellence', desc: 'Performant, accessible, and scalable codebases built with React, WebGL, and modern CSS architecture.' }
          ].map((item, i) => (
            <div key={i} className="reveal-text">
              <div className="font-mono text-xs text-white/50 mb-8">0{i + 1}</div>
              <h3 className="text-2xl font-serif mb-4">{item.title}</h3>
              <p className="text-white/70 font-sans text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
