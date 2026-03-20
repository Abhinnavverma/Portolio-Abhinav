import { useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'motion/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const PROJECTS_DATA: Record<string, any> = {
  'modeling': {
    title: 'Modeling Agency',
    client: 'Modeling Agency',
    role: 'Creative Development',
    stack: 'React, GSAP, Tailwind',
    heroVideo: 'https://player.vimeo.com/video/1175416913',
    problem: 'The agency needed a digital presence that matched the premium, high-fashion nature of their talent. Their existing site was slow and generic.',
    objective: 'Design and engineer an immersive portfolio experience that feels like a high-end editorial magazine while maintaining sub-2-second load times.',
    processImages: [
      'https://images.unsplash.com/photo-1583394838336-acd977736f90?q=80&w=2000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=2000&auto=format&fit=crop'
    ],
    outcome: 'Delivered a highly interactive, fluid web experience that increased client inquiries by 60% within the first month of launch.',
    next: 'aurora'
  },
  'aurora': {
    title: 'Aurora Skin',
    client: 'Aurora Botanicals',
    role: 'Front-End Engineering',
    stack: 'Next.js, WebGL, Framer Motion',
    heroVideo: 'https://player.vimeo.com/video/1175416951',
    problem: 'A premium skincare brand struggling to convey the tactile, organic feel of their products through a standard e-commerce template.',
    objective: 'Rebuild their platform to communicate luxury and trust while feeling modern, accessible, and technologically advanced.',
    processImages: [
      'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?q=80&w=2000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?q=80&w=2000&auto=format&fit=crop'
    ],
    outcome: 'Secured a 40% decrease in bounce rate and significantly elevated the brand perception in the digital space.',
    next: 'breakpoint'
  },
  'breakpoint': {
    title: 'Breakpoint Dev',
    client: 'Breakpoint Studio',
    role: 'Motion Design, Engineering',
    stack: 'React, Three.js, GSAP',
    heroVideo: 'https://player.vimeo.com/video/1175416886',
    problem: 'A digital studio needed a landing page that visually represented their focus on deep-tech and modern web infrastructure.',
    objective: 'Create an immersive, WebGL-driven experience that explains complex technical concepts through interactive 3D data visualization.',
    processImages: [
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2000&auto=format&fit=crop'
    ],
    outcome: 'Shipped platform 2 weeks ahead of schedule, establishing a new benchmark for technical agency portfolios.',
    next: 'modeling'
  }
};

export default function CaseStudy() {
  const { id } = useParams();
  const project = id ? PROJECTS_DATA[id] : null;
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);

  useEffect(() => {
    if (!project) return;
    
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
  }, [project]);

  if (!project) return <div className="min-h-screen flex items-center justify-center text-white">Project not found.</div>;

  return (
    <div className="bg-[var(--color-bg-light)] min-h-screen text-[var(--color-text-light)]" ref={containerRef}>
      
      {/* HERO */}
      <div className="relative h-screen w-full overflow-hidden">
        <motion.div style={{ y }} className="absolute inset-0 top-[-10%] h-[120%] pointer-events-none">
          <iframe 
            src={`${project.heroVideo}?background=1&autoplay=1&loop=1&byline=0&title=0`}
            allow="autoplay; fullscreen"
            className="w-[150%] h-[150%] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          />
        </motion.div>
        <div className="absolute inset-0 bg-black/30" />
        <div className="absolute bottom-10 left-6 md:left-20 text-white">
          <h1 className="text-6xl md:text-9xl font-serif tracking-tighter uppercase mb-4">{project.title}</h1>
          <div className="font-mono text-xs tracking-widest uppercase opacity-80">
            {project.role}
          </div>
        </div>
      </div>

      {/* THE BRIEF */}
      <div className="py-32 px-6 md:px-20 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          <div className="md:col-span-4 font-mono text-xs uppercase tracking-widest opacity-50">
            The Brief
            <div className="mt-8 space-y-4">
              <div>
                <span className="block opacity-50 mb-1">Client</span>
                <span className="opacity-100 text-sm">{project.client}</span>
              </div>
              <div>
                <span className="block opacity-50 mb-1">Stack</span>
                <span className="opacity-100 text-sm">{project.stack}</span>
              </div>
            </div>
          </div>
          <div className="md:col-span-8 text-xl md:text-3xl font-serif leading-relaxed">
            <p className="mb-8 reveal-text">
              <strong className="font-sans text-sm uppercase tracking-widest block mb-4 opacity-50">The Problem</strong>
              {project.problem}
            </p>
            <p className="reveal-text">
              <strong className="font-sans text-sm uppercase tracking-widest block mb-4 opacity-50">The Objective</strong>
              {project.objective}
            </p>
          </div>
        </div>
      </div>

      {/* THE PROCESS */}
      <div className="px-6 md:px-20 max-w-7xl mx-auto pb-32">
        <div className="font-mono text-xs uppercase tracking-widest opacity-50 mb-12">The Process</div>
        <div className="space-y-12 md:space-y-24">
          {project.processImages.map((img: string, i: number) => (
            <div key={i} className="relative h-[50vh] md:h-[80vh] w-full overflow-hidden rounded-2xl">
              <img 
                src={img} 
                alt={`Process ${i + 1}`} 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
          ))}
        </div>
      </div>

      {/* THE OUTCOME */}
      <div className="py-32 px-6 md:px-20 bg-[var(--color-bg-dark)] text-[var(--color-text-dark)]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-12">
          <div className="md:col-span-4 font-mono text-xs uppercase tracking-widest opacity-50">
            The Outcome
          </div>
          <div className="md:col-span-8">
            <h2 className="text-4xl md:text-6xl font-serif tracking-tighter reveal-text">
              {project.outcome}
            </h2>
          </div>
        </div>
      </div>

      {/* NEXT PROJECT */}
      <Link 
        to={`/case-study/${project.next}`}
        className="block h-[50vh] flex flex-col items-center justify-center bg-[var(--color-bg-light)] text-[var(--color-text-light)] group cursor-pointer relative overflow-hidden"
      >
        <div className="font-mono text-xs uppercase tracking-widest opacity-50 mb-8">Next Project</div>
        <h2 className="text-6xl md:text-9xl font-serif tracking-tighter uppercase group-hover:scale-105 transition-transform duration-700">
          {PROJECTS_DATA[project.next].title}
        </h2>
        <div className="absolute bottom-10 flex items-center gap-4 font-sans text-sm uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          View Case Study <ArrowRight className="w-4 h-4" />
        </div>
      </Link>

    </div>
  );
}
