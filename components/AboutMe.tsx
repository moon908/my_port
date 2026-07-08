"use client";

import React, { useEffect, useRef, useState } from "react";

// Sub-component: Interactive Particle Network Canvas
function ParticleNetwork() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = 0;
    let height = 0;

    // Generate 3D sphere points
    const points3D: { x: number; y: number; z: number }[] = [];
    const numPoints = 24;
    const radius3D = 90;
    for (let i = 0; i < numPoints; i++) {
      const phi = Math.acos(-1 + (2 * i) / numPoints);
      const theta = Math.sqrt(numPoints * Math.PI) * phi;
      points3D.push({
        x: Math.cos(theta) * Math.sin(phi) * radius3D,
        y: Math.sin(theta) * Math.sin(phi) * radius3D,
        z: Math.cos(phi) * radius3D,
      });
    }

    // Generate background floating particles
    const bgParticles: { x: number; y: number; vx: number; vy: number; r: number }[] = [];
    const numBgParticles = 15;

    const resize = () => {
      if (!canvas || !containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = width * window.devicePixelRatio;
      canvas.height = height * window.devicePixelRatio;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);

      bgParticles.length = 0;
      for (let i = 0; i < numBgParticles; i++) {
        bgParticles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.3,
          r: Math.random() * 1.5 + 0.5,
        });
      }
    };

    resize();
    window.addEventListener("resize", resize);

    const mouse = { x: -1000, y: -1000, active: false };
    const handleMouseMove = (e: MouseEvent) => {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
      mouse.active = true;
    };
    const handleMouseLeave = () => {
      mouse.active = false;
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener("mousemove", handleMouseMove);
      container.addEventListener("mouseleave", handleMouseLeave);
    }

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    let isReduced = mediaQuery.matches;
    const handleReducedMotionChange = (e: MediaQueryListEvent) => {
      isReduced = e.matches;
    };
    mediaQuery.addEventListener("change", handleReducedMotionChange);

    let rx = 0;
    let ry = 0;

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw background drifting particles
      ctx.fillStyle = "rgba(139, 92, 246, 0.15)";
      bgParticles.forEach((p) => {
        if (!isReduced) {
          p.x += p.vx;
          p.y += p.vy;

          if (p.x < 0) p.x = width;
          if (p.x > width) p.x = 0;
          if (p.y < 0) p.y = height;
          if (p.y > height) p.y = 0;

          if (mouse.active) {
            const dx = mouse.x - p.x;
            const dy = mouse.y - p.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 100) {
              p.x += (dx / dist) * 0.2;
              p.y += (dy / dist) * 0.2;
            }
          }
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      });

      // Update sphere angles
      if (!isReduced) {
        rx += 0.002;
        ry += 0.003;
      } else {
        rx = 0.6;
        ry = 0.9;
      }

      const cosX = Math.cos(rx);
      const sinX = Math.sin(rx);
      const cosY = Math.cos(ry);
      const sinY = Math.sin(ry);

      const centerX = width / 2;
      const centerY = height / 2;

      // Project 3D nodes
      const projected = points3D.map((p) => {
        const x1 = p.x * cosY - p.z * sinY;
        const z1 = p.x * sinY + p.z * cosY;

        const y2 = p.y * cosX - z1 * sinX;
        const z2 = p.y * sinX + z1 * cosX;

        const depth = 250;
        const perspective = depth / (depth + z2);

        return {
          x: centerX + x1 * perspective,
          y: centerY + y2 * perspective,
          z: z2,
          r: 2.2 * perspective,
        };
      });

      // Draw mesh grid lines
      ctx.lineWidth = 0.5;
      for (let i = 0; i < projected.length; i++) {
        for (let j = i + 1; j < projected.length; j++) {
          const pt1 = points3D[i];
          const pt2 = points3D[j];

          const dx = pt1.x - pt2.x;
          const dy = pt1.y - pt2.y;
          const dz = pt1.z - pt2.z;
          const dist3D = Math.sqrt(dx * dx + dy * dy + dz * dz);

          if (dist3D < 55) {
            const p1 = projected[i];
            const p2 = projected[j];

            const avgZ = (p1.z + p2.z) / 2;
            const depthAlpha = Math.max(0.04, Math.min(0.35, (75 - avgZ) / 150));

            ctx.strokeStyle = `rgba(139, 92, 246, ${depthAlpha})`;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      }

      // Draw nodes
      projected.forEach((p) => {
        const zRatio = (p.z + radius3D) / (2 * radius3D);
        const alpha = Math.max(0.2, 1 - zRatio * 0.6);
        ctx.fillStyle = `rgba(167, 139, 250, ${alpha})`;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();

        if (p.z < -10) {
          ctx.fillStyle = "rgba(139, 92, 246, 0.08)";
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.r * 2, 0, Math.PI * 2);
          ctx.fill();
        }
      });

      // Draw dynamic mouse links
      if (mouse.active && !isReduced) {
        projected.forEach((p) => {
          const dx = mouse.x - p.x;
          const dy = mouse.y - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 90) {
            const alpha = (1 - dist / 90) * 0.2;
            ctx.strokeStyle = `rgba(59, 130, 246, ${alpha})`;
            ctx.lineWidth = 0.7;
            ctx.beginPath();
            ctx.moveTo(mouse.x, mouse.y);
            ctx.lineTo(p.x, p.y);
            ctx.stroke();
          }
        });

        // Glowing pointer reticle
        ctx.strokeStyle = "rgba(59, 130, 246, 0.35)";
        ctx.lineWidth = 0.85;
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, 5, 0, Math.PI * 2);
        ctx.stroke();
      }

      if (!isReduced) {
        animationFrameId = requestAnimationFrame(draw);
      }
    };

    if (!isReduced) {
      animationFrameId = requestAnimationFrame(draw);
    } else {
      draw();
    }

    return () => {
      window.removeEventListener("resize", resize);
      if (container) {
        container.removeEventListener("mousemove", handleMouseMove);
        container.removeEventListener("mouseleave", handleMouseLeave);
      }
      mediaQuery.removeEventListener("change", handleReducedMotionChange);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div ref={containerRef} className="w-full h-full absolute inset-0 pointer-events-none select-none">
      <canvas ref={canvasRef} className="absolute inset-0 block opacity-40" />
    </div>
  );
}

// Sub-component: Staggered Count-Up Counter
interface CounterProps {
  target: number;
  duration?: number;
  suffix?: string;
}

function Counter({ target, duration = 1500, suffix = "" }: CounterProps) {
  const [count, setCount] = useState(0);
  const elementRef = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const isReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (isReduced) {
      setTimeout(() => setCount(target), 0);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !started.current) {
          started.current = true;
          let startTimestamp: number | null = null;
          const animate = (timestamp: number) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const elapsed = timestamp - startTimestamp;
            const progress = Math.min(elapsed / duration, 1);

            const easeProgress = progress * (2 - progress);
            setCount(Math.floor(easeProgress * target));

            if (progress < 1) {
              requestAnimationFrame(animate);
            } else {
              setCount(target);
            }
          };
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.1 }
    );

    const el = elementRef.current;
    if (el) {
      observer.observe(el);
    }

    return () => {
      if (el) observer.unobserve(el);
      observer.disconnect();
    };
  }, [target, duration]);

  return <span ref={elementRef}>{count}{suffix}</span>;
}

// Sub-component: Magnetic Link Button
interface MagneticButtonProps {
  href: string;
  variant: "primary" | "secondary";
  children: React.ReactNode;
  download?: boolean;
  target?: string;
  rel?: string;
}

function MagneticButton({ href, variant, children, download, target, rel }: MagneticButtonProps) {
  const buttonRef = useRef<HTMLAnchorElement>(null);
  const [coords, setCoords] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const isReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (isReduced || !buttonRef.current) return;

    const rect = buttonRef.current.getBoundingClientRect();
    const x = e.clientX - (rect.left + rect.width / 2);
    const y = e.clientY - (rect.top + rect.height / 2);

    setCoords({ x: x * 0.25, y: y * 0.25 });
  };

  const handleMouseLeave = () => {
    setCoords({ x: 0, y: 0 });
  };

  const isPrimary = variant === "primary";

  return (
    <a
      ref={buttonRef}
      href={href}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      download={download}
      target={target || (download ? "_blank" : undefined)}
      rel={rel || (download ? "noopener noreferrer" : undefined)}
      style={{
        transform: `translate(${coords.x}px, ${coords.y}px)`,
        transition: coords.x === 0 && coords.y === 0 ? "transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)" : "none",
      }}
      className={`px-5 py-2.5 rounded-xl font-mono text-[10px] sm:text-xs font-semibold tracking-wider uppercase transition-all duration-300 block text-center select-none cursor-pointer ${
        isPrimary
          ? "bg-violet-600 hover:bg-violet-500 text-white shadow-md shadow-violet-600/20 hover:shadow-violet-600/30 hover:scale-[1.01]"
          : "border border-neutral-800 text-neutral-400 hover:border-neutral-700 hover:text-white hover:bg-neutral-900/40 hover:scale-[1.01]"
      }`}
    >
      {children}
    </a>
  );
}

// Main Component: AboutMe Section
export default function AboutMe() {
  return (
    <section id="about" className="w-full bg-neutral-950 text-neutral-100 font-jetbrains relative py-20 sm:py-24 px-6 md:px-12 border-t border-neutral-900/80 overflow-hidden">
      {/* Blueprint grid background */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.006)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.006)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none z-0" />
      
      {/* Ambient background glows */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-violet-900/4 rounded-full blur-[160px] pointer-events-none z-0" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-blue-950/4 rounded-full blur-[160px] pointer-events-none z-0" />

      {/* Floating animation keyframes and spin rules */}
      <style>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes float-pfp {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-6px); }
        }
        .animate-spin-slow {
          animation: spin-slow 80s linear infinite;
        }
        .animate-float-pfp {
          animation: float-pfp 6s ease-in-out infinite;
        }
      `}</style>

      <div className="relative z-10 max-w-7xl xl:max-w-[1440px] 2xl:max-w-[1600px] mx-auto w-full flex flex-col space-y-16 sm:space-y-20">
        
        {/* Main Grid Layout: Profile Card (Left) vs Content (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          
          {/* Left Column: Glassmorphism Profile Card */}
          <div className="reveal reveal-slide-up lg:col-span-4 bg-neutral-900/25 border border-neutral-900 backdrop-blur-md rounded-[28px] p-6 sm:p-8 flex flex-col items-center relative hover:border-violet-500/15 hover:shadow-[0_0_50px_rgba(139,92,246,0.04)] transition-all duration-300 h-full">
            
            {/* Open to Opportunities Badge */}
            <div className="absolute top-4 right-4 flex items-center space-x-2 bg-neutral-950/70 border border-neutral-800/60 px-3 py-1 rounded-full text-[9px] font-mono text-neutral-400">
              <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
              <span>Open to Opportunities</span>
            </div>

            {/* Profile Avatar with Floating Particle Effect */}
            <div className="relative mt-8 mb-6 flex items-center justify-center w-80 h-80 sm:w-96 sm:h-96 shrink-0">
              {/* Dashed ring */}
              <div className="absolute inset-0 rounded-full border border-dashed border-violet-500/25 animate-spin-slow" />
              
              {/* Background canvas particles inside card */}
              <ParticleNetwork />

              {/* Profile Image with subtle background color glow */}
              <div className="w-[225px] h-[225px] sm:w-[270px] sm:h-[270px] rounded-full overflow-hidden border-2 border-violet-500/50 p-1 relative bg-gradient-to-b from-violet-600/20 to-neutral-950 flex items-center justify-center animate-float-pfp shadow-xl shadow-black/85">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/photo.jpeg"
                  alt="Siddhesh Moon"
                  className="w-[94%] h-[94%] object-cover rounded-full"
                />
              </div>

              {/* Floating Orbit Icons */}
              {/* Left Code Icon */}
              <div className="absolute top-7 left-7 sm:top-10 sm:left-10 w-8 h-8 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center text-violet-400 hover:text-white hover:border-violet-500/40 transition-colors shadow-md">
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75 22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3-4.5 16.5" />
                </svg>
              </div>
              
              {/* Right Brain Icon */}
              <div className="absolute top-7 right-7 sm:top-10 sm:right-10 w-8 h-8 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center text-violet-400 hover:text-white hover:border-violet-500/40 transition-colors shadow-md">
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 18a3.75 3.75 0 0 0 .495-7.467 5.99 5.99 0 0 0-1.925 3.546 5.974 5.974 0 0 1-2.133-1A3.75 3.75 0 0 0 12 18Z" />
                </svg>
              </div>

              {/* Bottom-Left Graph Icon */}
              <div className="absolute bottom-7 left-7 sm:bottom-10 sm:left-10 w-8 h-8 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center text-violet-400 hover:text-white hover:border-violet-500/40 transition-colors shadow-md">
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v5.25c0 .621-.504 1.125-1.125 1.125h-2.25A1.125 1.125 0 0 1 3 18.375v-5.25ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125v-9.75ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v14.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z" />
                </svg>
              </div>

              {/* Bottom-Right DB Icon */}
              <div className="absolute bottom-7 right-7 sm:bottom-10 sm:right-10 w-8 h-8 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center text-violet-400 hover:text-white hover:border-violet-500/40 transition-colors shadow-md">
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0v3.75" />
                </svg>
              </div>
            </div>

            {/* Profile Info Details */}
            <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-white font-playfair mb-1.5 select-none">
              <span className="text-violet-400">Siddhesh</span> Moon
            </h3>
            <div className="text-[10px] sm:text-xs font-mono tracking-wider text-neutral-400 uppercase mb-4 text-center">
              Operations | AI Engineering | Data Analytics
            </div>
            
            <p className="text-center text-xs sm:text-sm text-neutral-400 font-mono leading-relaxed mb-6 max-w-[300px] sm:max-w-[320px]">
              I transform data and operations into intelligent, scalable solutions that drive real business impact.
            </p>

            <div className="w-full h-[1px] bg-neutral-900/80 mb-6" />

            {/* List Contact Details */}
            <div className="w-full space-y-4 text-left font-mono text-xs sm:text-sm text-neutral-400">
              <div className="flex items-center space-x-3">
                <span className="text-violet-400 text-sm sm:text-base">📍</span>
                <span>Maharashtra, India</span>
              </div>
              <div className="flex items-center space-x-3">
                <span className="text-violet-400 text-sm sm:text-base">✉️</span>
                <a href="mailto:siddheshmoon908@gmail.com" className="hover:text-white transition-colors truncate max-w-[220px] sm:max-w-[260px]">siddheshmoon908@gmail.com</a>
              </div>
              <div className="flex items-center space-x-3">
                <span className="text-violet-400 text-sm sm:text-base">📞</span>
                <a href="tel:+918010347901" className="hover:text-white transition-colors">(+91) 8010347901</a>
              </div>
              <div className="flex items-center space-x-3">
                <span className="text-violet-400 text-sm sm:text-base">🔗</span>
                <a href="https://www.linkedin.com/in/siddhesh-moon/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors truncate max-w-[220px] sm:max-w-[260px]">linkedin.com/in/siddhesh-moon</a>
              </div>
            </div>

          </div>

          {/* Right Column: Title, Quote, Description, Stats & Competencies */}
          <div className="lg:col-span-8 flex flex-col space-y-8 lg:space-y-10">
            
            {/* Header Title block */}
            <div className="reveal reveal-slide-up space-y-4">
              <span className="text-[10px] font-mono tracking-widest text-violet-400 font-semibold uppercase animate-pulse">
                {"// ABOUT_ME"}
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-neutral-100 select-none">
                About <span className="text-violet-400">Me</span>
              </h2>
              <div className="border-l-2 border-violet-500 pl-4 sm:pl-5 my-1">
                <p className="text-xs sm:text-sm font-semibold tracking-wide text-neutral-300 font-mono">
                  Building intelligent solutions at the intersection of operations, AI, and data.
                </p>
              </div>
            </div>

            {/* Paragraph Bio Description */}
            <div className="reveal reveal-slide-up reveal-delay-100 space-y-4 text-xs sm:text-sm text-neutral-400 font-mono leading-relaxed">
              <p>
                {"I'm a technology professional with expertise in Operations Management, AI Engineering, Data Analytics, and Team Leadership. I enjoy solving complex business problems by combining data, automation, and modern AI to build scalable, efficient solutions."}
              </p>
              <p>
                {"My experience spans leading operations, managing cross-functional teams, developing AI-powered applications, and turning data into actionable insights. I'm passionate about optimizing processes, driving measurable impact, and building products that bridge technology and business."}
              </p>
              <p>
                {"I believe the best solutions come from a balance of analytical thinking, technical execution, and strong leadership."}
              </p>
            </div>

            {/* 4 Statistics Highlights Cards */}
            <div className="reveal reveal-slide-up reveal-delay-200 grid grid-cols-2 sm:grid-cols-4 gap-4">
              
              {/* Card 1: Projects Built */}
              <div className="bg-neutral-900/30 border border-neutral-900/60 p-4.5 rounded-2xl flex flex-col space-y-2 hover:border-violet-500/20 transition-all duration-300 hover:shadow-[0_0_15px_rgba(139,92,246,0.03)]">
                <div className="w-7 h-7 rounded-lg bg-neutral-950/60 border border-neutral-800/80 flex items-center justify-center shrink-0">
                  <svg className="w-4 h-4 text-violet-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 0 1-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 0 0 6.16-12.12A14.98 14.98 0 0 0 9.59 2.58a14.98 14.98 0 0 0-6.16 12.12A14.98 14.98 0 0 0 9.59 20.88v-4.8m5.84-1.71a3 3 0 1 1-5.84 0M19.5 4.5h.008v.008H19.5V4.5Z" />
                  </svg>
                </div>
                <div className="space-y-0.5 font-mono">
                  <div className="text-xl sm:text-2xl font-extrabold text-white font-playfair tracking-tight">
                    <Counter target={10} suffix="+" />
                  </div>
                  <div className="text-[9px] font-semibold text-neutral-300 uppercase tracking-wide">Projects Built</div>
                  <div className="text-[8px] text-neutral-500">End-to-end solutions</div>
                </div>
              </div>

              {/* Card 2: Tech Used */}
              <div className="bg-neutral-900/30 border border-neutral-900/60 p-4.5 rounded-2xl flex flex-col space-y-2 hover:border-violet-500/20 transition-all duration-300 hover:shadow-[0_0_15px_rgba(139,92,246,0.03)]">
                <div className="w-7 h-7 rounded-lg bg-neutral-950/60 border border-neutral-800/80 flex items-center justify-center shrink-0">
                  <svg className="w-4 h-4 text-violet-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75 22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3-4.5 16.5" />
                  </svg>
                </div>
                <div className="space-y-0.5 font-mono">
                  <div className="text-xl sm:text-2xl font-extrabold text-white font-playfair tracking-tight">
                    <Counter target={20} suffix="+" />
                  </div>
                  <div className="text-[9px] font-semibold text-neutral-300 uppercase tracking-wide">Technologies Used</div>
                  <div className="text-[8px] text-neutral-500">Across modern stack</div>
                </div>
              </div>

              {/* Card 3: Teams Led */}
              <div className="bg-neutral-900/30 border border-neutral-900/60 p-4.5 rounded-2xl flex flex-col space-y-2 hover:border-violet-500/20 transition-all duration-300 hover:shadow-[0_0_15px_rgba(139,92,246,0.03)]">
                <div className="w-7 h-7 rounded-lg bg-neutral-950/60 border border-neutral-800/80 flex items-center justify-center shrink-0">
                  <svg className="w-4 h-4 text-violet-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.109A3.318 3.318 0 0 1 11.682 22.5h-.364a3.318 3.318 0 0 1-3.318-3.263v-.111c0-1.113.285-2.16.786-3.07M12.75 7.5a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM3.706 16.128A3.333 3.333 0 0 1 1 12.875v-.111c0-1.282.787-2.395 1.954-2.842a12.062 12.062 0 0 1 10.742 0c1.167.447 1.954 1.56 1.954 2.842v.111a3.333 3.333 0 0 1-2.706 3.253m-1.077 0a3.318 3.318 0 0 0 .506-1.573V14.25c0-.621-.504-1.125-1.125-1.125H8.625A1.125 1.125 0 0 0 7.5 14.25v.11c0 .592.162 1.144.506 1.573Z" />
                  </svg>
                </div>
                <div className="space-y-0.5 font-mono">
                  <div className="text-xl sm:text-2xl font-extrabold text-white font-playfair tracking-tight">
                    <Counter target={5} suffix="+" />
                  </div>
                  <div className="text-[9px] font-semibold text-neutral-300 uppercase tracking-wide">Teams Led</div>
                  <div className="text-[8px] text-neutral-500">Cross-functional teams</div>
                </div>
              </div>

              {/* Card 4: Continuous Learner */}
              <div className="bg-neutral-900/30 border border-neutral-900/60 p-4.5 rounded-2xl flex flex-col space-y-2 hover:border-violet-500/20 transition-all duration-300 hover:shadow-[0_0_15px_rgba(139,92,246,0.03)]">
                <div className="w-7 h-7 rounded-lg bg-neutral-950/60 border border-neutral-800/80 flex items-center justify-center shrink-0">
                  <svg className="w-4 h-4 text-violet-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="m3.75 13.5 10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z" />
                  </svg>
                </div>
                <div className="space-y-0.5 font-mono">
                  <div className="text-xl sm:text-2xl font-extrabold text-white font-playfair tracking-tight">
                    <Counter target={100} suffix="%" />
                  </div>
                  <div className="text-[9px] font-semibold text-neutral-300 uppercase tracking-wide">Continuous Learner</div>
                  <div className="text-[8px] text-neutral-500">Always evolving</div>
                </div>
              </div>

            </div>

            {/* Key Competencies Matrix (4 columns/cards) */}
            <div className="reveal reveal-slide-up reveal-delay-300 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              
              {/* Competency 1: Operations */}
              <div className="bg-neutral-900/20 border border-neutral-900 p-5 rounded-2xl flex flex-col space-y-4 hover:border-violet-500/15 transition-all duration-300">
                <div className="flex items-center space-x-2.5">
                  <div className="w-7 h-7 rounded-md bg-neutral-950 border border-neutral-800/60 flex items-center justify-center shrink-0">
                    <svg className="w-4 h-4 text-violet-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.43l-1.003.828c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.43l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 0 1 0-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.28Z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                    </svg>
                  </div>
                  <h4 className="text-xs sm:text-sm font-bold font-mono uppercase tracking-widest text-neutral-200">Operations</h4>
                </div>
                <ul className="space-y-2.5 text-xs font-mono text-neutral-400">
                  <li className="flex items-center space-x-2">
                    <span className="text-violet-500 text-xs font-bold">✓</span>
                    <span>Process Optimization</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <span className="text-violet-500 text-xs font-bold">✓</span>
                    <span>Workflow Automation</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <span className="text-violet-500 text-xs font-bold">✓</span>
                    <span>Business Strategy</span>
                  </li>
                </ul>
              </div>

              {/* Competency 2: AI Engineering */}
              <div className="bg-neutral-900/20 border border-neutral-900 p-5 rounded-2xl flex flex-col space-y-4 hover:border-violet-500/15 transition-all duration-300">
                <div className="flex items-center space-x-2.5">
                  <div className="w-7 h-7 rounded-md bg-neutral-950 border border-neutral-800/60 flex items-center justify-center shrink-0">
                    <svg className="w-4 h-4 text-violet-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 3v1.5M12 3v1.5m3.75-1.5v1.5M19 12h1.5m-1.5 3.75H21m-2-7.5H21M3 12h1.5m-.5 3.75H5m-2-7.5H5m3.75 13.5v1.5M12 17.25v1.5m3.75-1.5v1.5M6 6h12v12H6V6Z" />
                    </svg>
                  </div>
                  <h4 className="text-xs sm:text-sm font-bold font-mono uppercase tracking-widest text-neutral-200">AI Engineering</h4>
                </div>
                <ul className="space-y-2.5 text-xs font-mono text-neutral-400">
                  <li className="flex items-center space-x-2">
                    <span className="text-violet-500 text-xs font-bold">✓</span>
                    <span>ML/DL Workflow</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <span className="text-violet-500 text-xs font-bold">✓</span>
                    <span>AI Application Dev</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <span className="text-violet-500 text-xs font-bold">✓</span>
                    <span>LLM Integration</span>
                  </li>
                </ul>
              </div>

              {/* Competency 3: Data Analytics */}
              <div className="bg-neutral-900/20 border border-neutral-900 p-5 rounded-2xl flex flex-col space-y-4 hover:border-violet-500/15 transition-all duration-300">
                <div className="flex items-center space-x-2.5">
                  <div className="w-7 h-7 rounded-md bg-neutral-950 border border-neutral-800/60 flex items-center justify-center shrink-0">
                    <svg className="w-4 h-4 text-violet-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v5.25c0 .621-.504 1.125-1.125 1.125h-2.25A1.125 1.125 0 0 1 3 18.375v-5.25ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125v-9.75ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v14.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z" />
                    </svg>
                  </div>
                  <h4 className="text-xs sm:text-sm font-bold font-mono uppercase tracking-widest text-neutral-200">Data Analytics</h4>
                </div>
                <ul className="space-y-2.5 text-xs font-mono text-neutral-400">
                  <li className="flex items-center space-x-2">
                    <span className="text-violet-500 text-xs font-bold">✓</span>
                    <span>Data Analysis</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <span className="text-violet-500 text-xs font-bold">✓</span>
                    <span>Visualization</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <span className="text-violet-500 text-xs font-bold">✓</span>
                    <span>Insight Generation</span>
                  </li>
                </ul>
              </div>

              {/* Competency 4: Leadership */}
              <div className="bg-neutral-900/20 border border-neutral-900 p-5 rounded-2xl flex flex-col space-y-4 hover:border-violet-500/15 transition-all duration-300">
                <div className="flex items-center space-x-2.5">
                  <div className="w-7 h-7 rounded-md bg-neutral-950 border border-neutral-800/60 flex items-center justify-center shrink-0">
                    <svg className="w-4 h-4 text-violet-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m0 0-.003-.031c0-.225.012-.447.037-.666A11.944 11.944 0 0 0 12 15c2.17 0 4.207.576 5.963 1.584A6.062 6.062 0 0 0 18 18.72m-12 0a9.094 9.094 0 0 1-3.741-.479 3 3 0 0 1 4.682-2.72m.94 3.198.002.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c2.17 0 4.207-.576 5.963-1.584A6.062 6.062 0 0 1 12 15c-2.17 0-4.207.576-5.963 1.584A6.062 6.062 0 0 1 12 15ZM12 11.25a3.375 3.375 0 1 0 0-6.75 3.375 3.375 0 0 0 0 6.75ZM9.75 14.25a.75.75 0 0 1 .75-.75h3a.75.75 0 0 1 .75.75v.03a11.99 11.99 0 0 1-4.5 0v-.03Z" />
                    </svg>
                  </div>
                  <h4 className="text-xs sm:text-sm font-bold font-mono uppercase tracking-widest text-neutral-200">Leadership</h4>
                </div>
                <ul className="space-y-2.5 text-xs font-mono text-neutral-400">
                  <li className="flex items-center space-x-2">
                    <span className="text-violet-500 text-xs font-bold">✓</span>
                    <span>Team Management</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <span className="text-violet-500 text-xs font-bold">✓</span>
                    <span>Stakeholder Collab</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <span className="text-violet-500 text-xs font-bold">✓</span>
                    <span>Project Delivery</span>
                  </li>
                </ul>
              </div>

            </div>

            {/* Bottom Call to Action Card */}
            <div className="reveal reveal-slide-up border border-neutral-900 bg-neutral-900/10 p-6 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-6 hover:border-violet-500/10 transition-all duration-300 relative overflow-hidden">
              
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 rounded-full bg-violet-500/10 border border-violet-500/20 flex items-center justify-center text-violet-400 shrink-0">
                  <svg className="w-5 h-5 transform -rotate-45" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
                  </svg>
                </div>
                <div className="space-y-1 text-left">
                  <h4 className="text-sm font-bold text-white font-mono leading-none">{"Let's Build Something Impactful"}</h4>
                  <p className="text-[11px] text-neutral-400 font-mono leading-normal max-w-xl">
                    {"I'm always open to discussing new opportunities, innovative ideas, or collaborations that create real impact."}
                  </p>
                </div>
              </div>

              {/* Action CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto shrink-0 font-mono">
                <MagneticButton href="#contact" variant="primary">
                  <span className="flex items-center justify-center space-x-1">
                    <span>{"Let's Connect"}</span>
                    <span>→</span>
                  </span>
                </MagneticButton>
                <MagneticButton href="/resume/Siddhesh_GenResume.pdf" variant="secondary" target="_blank" rel="noopener noreferrer">
                  <span className="flex items-center justify-center space-x-1.5">
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                    </svg>
                    <span>View Resume</span>
                  </span>
                </MagneticButton>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
