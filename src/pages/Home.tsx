import { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import MagneticButton from '../components/MagneticButton';
import { ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const PROJECTS = [
  {
    id: '01',
    title: 'Modeling Agency',
    tags: ['Creative Development', 'Interactive UI'],
    video: 'https://player.vimeo.com/video/1175416913',
    link: '/case-study/modeling'
  },
  {
    id: '02',
    title: 'Aurora Skin',
    tags: ['E-Commerce', 'WebGL'],
    video: 'https://player.vimeo.com/video/1175416951',
    link: '/case-study/aurora'
  },
  {
    id: '03',
    title: 'Breakpoint Dev',
    tags: ['Portfolio', 'Motion Design'],
    video: 'https://player.vimeo.com/video/1175416886',
    link: '/case-study/breakpoint'
  }
];

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const worksRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, 300]);

  const { scrollYProgress: worksScrollProgress } = useScroll({
    target: worksRef,
  });
  const worksX = useTransform(worksScrollProgress, [0, 1], ["0%", "-66.666%"]);

  useEffect(() => {
    // Hero text reveal
    const ctx = gsap.context(() => {
      gsap.from('.hero-text-line', {
        y: 100,
        opacity: 0,
        duration: 1.2,
        stagger: 0.1,
        ease: 'power4.out',
        delay: 0.5,
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="bg-[var(--color-bg-dark)] min-h-screen text-[var(--color-text-dark)]">
      {/* HERO SECTION */}
      <section ref={heroRef} className="relative h-screen flex flex-col justify-center px-6 md:px-20 overflow-hidden">
        {/* Video Background */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <video 
            autoPlay 
            muted 
            loop 
            playsInline 
            className="w-full h-full object-cover opacity-50"
          >
            <source src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260217_030345_246c0224-10a4-422c-b324-070b7c0eceda.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[var(--color-bg-dark)]/50 to-[var(--color-bg-dark)]" />
        </div>

        <div className="relative z-10 max-w-7xl">
          <h1 className="text-[12vw] md:text-[8vw] leading-[0.9] tracking-tighter font-serif uppercase">
            <div className="overflow-hidden"><div className="hero-text-line">Abhinav</div></div>
            <div className="overflow-hidden"><div className="hero-text-line flex items-center gap-4 md:gap-8">
              <span className="italic font-light">Verma</span>
              <div className="h-[2px] w-16 md:w-32 bg-white/50 mt-4" />
            </div></div>
            <div className="overflow-hidden"><div className="hero-text-line">Creative Dev.</div></div>
          </h1>
          
          <div className="mt-12 md:mt-24 flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
            <p className="font-sans text-sm md:text-base max-w-md text-white/70 leading-relaxed">
              I build premium, interactive digital experiences for designers and forward-thinking brands. 
              Uncompromising art direction meets flawless technical execution.
            </p>
            <MagneticButton onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}>
              Explore Works <ArrowRight className="ml-2 w-4 h-4" />
            </MagneticButton>
          </div>
        </div>
      </section>

      {/* SELECTED WORKS (Horizontal Scroll) */}
      <section ref={worksRef} className="h-[300vh] bg-[var(--color-bg-light)] text-[var(--color-text-light)] relative">
        <div className="sticky top-0 h-screen flex items-center overflow-hidden">
          <motion.div style={{ x: worksX }} className="flex w-[300vw] h-full">
            {PROJECTS.map((project, index) => (
              <div key={project.id} className="work-item w-screen h-full flex flex-col justify-center px-6 md:px-20 relative">
                <div className="absolute top-10 left-6 md:left-20 font-mono text-xs tracking-widest uppercase">
                  Selected Works — {index + 1}/{PROJECTS.length}
                </div>
                
                <div className="flex flex-col md:flex-row gap-12 md:gap-24 items-center w-full max-w-7xl mx-auto">
                  <div className="w-full md:w-1/2 order-2 md:order-1">
                    <h2 className="text-5xl md:text-8xl font-serif tracking-tighter mb-6">{project.title}</h2>
                    <div className="flex flex-wrap gap-4 mb-12">
                      {project.tags.map(tag => (
                        <span key={tag} className="px-4 py-2 border border-black/20 rounded-full text-xs uppercase tracking-widest font-sans">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <a href={project.link} className="group flex items-center gap-4 font-sans text-sm uppercase tracking-widest hover:opacity-70 transition-opacity">
                      View Case Study 
                      <span className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center group-hover:scale-110 transition-transform">
                        <ArrowRight className="w-4 h-4" />
                      </span>
                    </a>
                  </div>
                  
                  <div className="w-full md:w-1/2 order-1 md:order-2 h-[40vh] md:h-[70vh] relative overflow-hidden rounded-2xl group pointer-events-none">
                    <iframe 
                      src={`${project.video}?background=1&autoplay=1&loop=1&byline=0&title=0`}
                      allow="autoplay; fullscreen"
                      className="w-[150%] h-[150%] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-80 group-hover:scale-105 transition-transform duration-1000"
                    />
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* SERVICES / CAPABILITIES */}
      <section className="py-32 px-6 md:px-20 bg-[var(--color-bg-dark)]">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start mb-24">
            <h2 className="text-4xl md:text-6xl font-serif tracking-tighter mb-8 md:mb-0">Capabilities</h2>
            <p className="max-w-md text-white/70 font-sans text-sm leading-relaxed">
              I specialize in bridging the gap between high-end design and robust engineering. 
              My focus is on creating beautiful, performant web experiences for designers and agencies.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
            {[
              { title: 'Creative Development', desc: 'Translating static designs into fluid, interactive digital experiences.' },
              { title: 'Interactive UI', desc: 'Crafting complex micro-interactions and smooth page transitions.' },
              { title: 'Technical Excellence', desc: 'Performant, scalable codebases built with React, Next.js, and WebGL.' }
            ].map((service, i) => (
              <div key={i} className="border-t border-white/20 pt-8">
                <div className="font-mono text-xs text-white/50 mb-8">0{i + 1}</div>
                <h3 className="text-2xl font-serif mb-4">{service.title}</h3>
                <p className="text-white/70 font-sans text-sm leading-relaxed">{service.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER CTA */}
      <section className="h-screen flex flex-col items-center justify-center px-6 text-center relative overflow-hidden">
        <motion.div style={{ y }} className="absolute inset-0 z-0 opacity-20">
          <img 
            src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop" 
            alt="Abstract Architecture" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </motion.div>
        
        <div className="relative z-10 flex flex-col items-center">
          <h2 className="text-[10vw] leading-none font-serif tracking-tighter uppercase mb-12">
            Let's Build<br />
            <span className="italic font-light">Something</span><br />
            Unreasonable.
          </h2>
          
          <MagneticButton onClick={() => navigator.clipboard.writeText('vabhinav029@gmail.com')} className="bg-white text-black hover:bg-transparent hover:text-white">
            vabhinav029@gmail.com
          </MagneticButton>
          
          <div className="mt-24 flex gap-8 font-mono text-xs uppercase tracking-widest text-white/50">
            <a href="https://github.com/" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">GitHub</a>
            <a href="https://linkedin.com/" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">LinkedIn</a>
            <a href="https://upwork.com/" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">Upwork</a>
          </div>
        </div>
      </section>
    </div>
  );
}
