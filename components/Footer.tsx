"use client";

import React, { useState, useEffect } from "react";

export default function Footer() {
  const [systemStats, setSystemStats] = useState({
    latency: "14ms",
    memory: "2.4MB / 16MB",
    uptime: "0.00s",
  });

  // Telemetry simulation ticker
  useEffect(() => {
    const startTime = Date.now();
    const timer = setInterval(() => {
      const elapsed = (Date.now() - startTime) / 1000;
      setSystemStats((prev) => ({
        ...prev,
        uptime: `${elapsed.toFixed(2)}s`,
        latency: `${Math.floor(10 + Math.random() * 8)}ms`,
      }));
    }, 100);
    return () => clearInterval(timer);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="w-full bg-neutral-950 text-neutral-100 font-jetbrains relative py-12 px-6 md:px-12 border-t border-neutral-900/80 overflow-hidden">
      {/* Blueprint grid overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.005)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.005)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none z-0" />

      {/* Subtle violet/blue ambient glow */}
      <div className="absolute bottom-0 left-10 w-72 h-72 bg-violet-600/5 rounded-full blur-[120px] pointer-events-none z-0" />
      <div className="absolute top-0 right-10 w-72 h-72 bg-blue-600/5 rounded-full blur-[120px] pointer-events-none z-0" />

      <div className="relative z-10 max-w-7xl mx-auto w-full flex flex-col space-y-10">

        {/* Top telemetry divider info */}
        <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-neutral-900 pb-8 gap-6 text-[10px] text-neutral-500 tracking-wider">
          <div className="flex items-center space-x-3">
            <span className="w-1.5 h-1.5 bg-violet-500 rounded-full animate-pulse"></span>
            <span>NODE_INFO: PORTFOLIO_V4_SECURE</span>
            <span className="text-neutral-800">|</span>
            <span>SYS_STATUS: READY</span>
          </div>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <div className="flex items-center space-x-1">
              <span className="text-neutral-600">PING_LATENCY:</span>
              <span className="text-emerald-400 font-semibold">{systemStats.latency}</span>
            </div>
            <div className="flex items-center space-x-1">
              <span className="text-neutral-600">CLIENT_UPTIME:</span>
              <span className="text-violet-400 font-semibold">{systemStats.uptime}</span>
            </div>
            <div className="flex items-center space-x-1">
              <span className="text-neutral-600">MEM_HEAP:</span>
              <span className="text-blue-400 font-semibold">{systemStats.memory}</span>
            </div>
          </div>
        </div>

        {/* Center Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">

          {/* Main info column */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center space-x-2 text-xs font-mono text-violet-400 font-semibold">
              <span>// INITIATE_HANDSHAKE:</span>
              <span className="text-neutral-400">SIDDHESH_MOON</span>
            </div>
            <p className="text-xs text-neutral-400 max-w-sm leading-relaxed">
              Multi-disciplinary engineer focusing on satellite telemetry dashboards, secure mesh networks, and high-performance temporal mapping systems.
            </p>
          </div>

          {/* Directory navigation */}
          <div className="md:col-span-3 space-y-3">
            <div className="text-[10px] uppercase tracking-widest text-neutral-500 font-bold border-b border-neutral-900 pb-1 max-w-[120px]">
              [NAVIGATION]
            </div>
            <ul className="space-y-1.5 text-xs text-neutral-400 font-mono">
              <li>
                <a href="#hero" className="hover:text-violet-400 transition-colors">
                  &gt; ./home
                </a>
              </li>
              <li>
                <a href="#research" className="hover:text-violet-400 transition-colors">
                  &gt; ./research
                </a>
              </li>
              <li>
                <a href="#projects" className="hover:text-violet-400 transition-colors">
                  &gt; ./projects
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-violet-400 transition-colors">
                  &gt; ./contact
                </a>
              </li>
            </ul>
          </div>

          {/* Social Links / Nodes */}
          <div className="md:col-span-4 space-y-3">
            <div className="text-[10px] uppercase tracking-widest text-neutral-500 font-bold border-b border-neutral-900 pb-1 max-w-[120px]">
              [PORT_NODES]
            </div>
            <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm sm:text-base font-mono">
              <a
                href="https://www.linkedin.com/in/siddhesh-moon/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-neutral-400 hover:text-violet-400 flex items-center space-x-2.5 group transition-colors"
              >
                <svg
                  className="w-[18px] h-[18px] text-violet-500 group-hover:text-violet-400 transition-colors"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                  <rect x="2" y="9" width="4" height="12" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
                <span>LINKEDIN_LINK</span>
              </a>
              <a
                href="/resume/Siddhesh_GenResume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="text-neutral-400 hover:text-violet-400 flex items-center space-x-2.5 group transition-colors"
              >
                <svg
                  className="w-[18px] h-[18px] text-violet-500 group-hover:text-violet-400 transition-colors"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                  <line x1="16" y1="13" x2="8" y2="13" />
                  <line x1="16" y1="17" x2="8" y2="17" />
                </svg>
                <span>RESUME_LINK</span>
              </a>
            </div>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="border-t border-neutral-900 pt-8 mt-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-[10px] font-mono text-neutral-500">
            <span>© {new Date().getFullYear()} SIDDHESH MOON. TELEMETRY NODE. ALL RIGHTS RESERVED.</span>
          </div>

          {/* Scroll to top button */}
          <button
            onClick={scrollToTop}
            className="group px-4 py-2 bg-neutral-900 hover:bg-neutral-900/80 border border-neutral-800 hover:border-violet-500/50 text-[10px] font-mono text-neutral-400 hover:text-violet-400 rounded-lg cursor-pointer transition-all duration-300 flex items-center space-x-2"
          >
            <span>[INITIATE_UPWARD_THRUST]</span>
            <span className="transform group-hover:-translate-y-0.5 transition-transform">▲</span>
          </button>
        </div>

      </div>
    </footer>
  );
}
