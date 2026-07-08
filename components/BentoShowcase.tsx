"use client";

import React from "react";

export default function BentoShowcase() {
  return (
    <section className="w-full bg-neutral-950 text-neutral-100 font-jetbrains relative py-24 px-6 md:px-12 border-t border-neutral-900/80 overflow-hidden">
      {/* Blueprint background grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.008)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.008)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none z-0" />
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-purple-600/5 rounded-full blur-[120px] pointer-events-none z-0" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-blue-600/5 rounded-full blur-[120px] pointer-events-none z-0" />

      <div className="relative z-10 max-w-7xl mx-auto w-full flex flex-col space-y-14">
        {/* Section Header */}
        <div className="reveal reveal-slide-up space-y-4 max-w-2xl border-l-2 border-violet-500 pl-4 sm:pl-6">
          <div className="text-xs font-mono tracking-widest text-violet-400 font-semibold uppercase animate-pulse">
            // PORTFOLIO: DESIGN_SHOWCASE
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-neutral-100 font-mono">
            UI/UX & Web Design
          </h2>
          <p className="text-sm text-neutral-400 font-mono">
            A curated grid showcase of my custom UI/UX and web layout designs.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 auto-rows-auto items-stretch">

          {/* Card 1: FRUITZ (Left Column - Spans 5 cols, 2 rows) */}
          <div className="reveal reveal-slide-up reveal-delay-100 lg:col-span-5 lg:row-span-2 bg-gradient-to-br from-[#f97316] to-[#fff7ed] rounded-3xl border border-orange-500/20 min-h-[350px] lg:min-h-[584px] relative overflow-hidden group shadow-xl hover:shadow-[0_0_35px_rgba(249,115,22,0.12)] transition-all duration-300">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/design/design1.png"
              alt="Fruitz Landing Page Design"
              className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
            />
            {/* Hover Actions overlay */}
            <div className="absolute inset-0 bg-neutral-950/60 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col sm:flex-row items-center justify-center gap-3 z-10">
              <a
                href="https://github.com/moon908/fruitjuice"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-neutral-900/90 border border-neutral-700/50 hover:border-orange-500/50 text-neutral-200 hover:text-white rounded-xl font-mono text-xs font-semibold flex items-center gap-1.5 transition-all duration-300 hover:scale-105"
              >
                <span>GIT_SOURCE</span>
                <span className="text-[10px]">↗</span>
              </a>
              <a
                href="https://fruitjuice-five.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-orange-600 hover:bg-orange-500 text-white rounded-xl font-mono text-xs font-semibold flex items-center gap-1.5 transition-all duration-300 hover:scale-105 shadow-[0_0_20px_rgba(249,115,22,0.3)] hover:shadow-[0_0_25px_rgba(249,115,22,0.5)]"
              >
                <span>OPEN_WEBSITE</span>
                <span className="text-[10px]">→</span>
              </a>
            </div>
          </div>

          {/* Card 2: HYDRA VR (Top Right - Spans 7 cols, 1 row) */}
          <div className="reveal reveal-slide-up reveal-delay-200 lg:col-span-7 bg-gradient-to-br from-[#f43f5e] via-[#a855f7] to-[#3b82f6] rounded-3xl border border-purple-500/20 min-h-[280px] relative overflow-hidden group shadow-xl hover:shadow-[0_0_35px_rgba(168,85,247,0.12)] transition-all duration-300">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/design/design2.png"
              alt="Hydra VR Landing Page Design"
              className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
            />
            {/* Hover Actions overlay */}
            <div className="absolute inset-0 bg-neutral-950/60 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col sm:flex-row items-center justify-center gap-3 z-10">
              <a
                href="https://github.com/moon908/hydra_vr"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-neutral-900/90 border border-neutral-700/50 hover:border-purple-500/50 text-neutral-200 hover:text-white rounded-xl font-mono text-xs font-semibold flex items-center gap-1.5 transition-all duration-300 hover:scale-105"
              >
                <span>GIT_SOURCE</span>
                <span className="text-[10px]">↗</span>
              </a>
              <a
                href="https://hydra-vr-chi.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white rounded-xl font-mono text-xs font-semibold flex items-center gap-1.5 transition-all duration-300 hover:scale-105 shadow-[0_0_20px_rgba(168,85,247,0.3)] hover:shadow-[0_0_25px_rgba(168,85,247,0.5)]"
              >
                <span>OPEN_WEBSITE</span>
                <span className="text-[10px]">→</span>
              </a>
            </div>
          </div>

          {/* Card 3: MOJITO (Bottom Right - Left - Spans 3 cols, 1 row) */}
          <div className="reveal reveal-slide-up reveal-delay-100 lg:col-span-3 bg-[#0a0f0d] rounded-3xl border border-[#1b2f24] min-h-[280px] relative overflow-hidden group shadow-xl hover:shadow-[0_0_35px_rgba(16,185,129,0.06)] transition-all duration-300">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/design/design3.png"
              alt="Mojito Landing Page Design"
              className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
            />
            {/* Hover Actions overlay */}
            <div className="absolute inset-0 bg-neutral-950/60 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col sm:flex-row items-center justify-center gap-3 z-10">
              <a
                href="https://github.com/moon908/gsap_cocktails"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-neutral-900/90 border border-neutral-700/50 hover:border-emerald-500/50 text-neutral-200 hover:text-white rounded-xl font-mono text-xs font-semibold flex items-center gap-1.5 transition-all duration-300 hover:scale-105"
              >
                <span>GIT_SOURCE</span>
                <span className="text-[10px]">↗</span>
              </a>
              <a
                href="https://gsap-cocktails-pi-five.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-mono text-xs font-semibold flex items-center gap-1.5 transition-all duration-300 hover:scale-105 shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:shadow-[0_0_25px_rgba(16,185,129,0.5)]"
              >
                <span>OPEN_WEBSITE</span>
                <span className="text-[10px]">→</span>
              </a>
            </div>
          </div>

          {/* Card 4: AURA STORE (Bottom Right - Right - Spans 4 cols, 1 row) */}
          <div className="reveal reveal-slide-up reveal-delay-200 lg:col-span-4 bg-gradient-to-br from-[#fcfcfc] to-[#e5e5e5] rounded-3xl border border-neutral-300 min-h-[280px] relative overflow-hidden group shadow-xl hover:shadow-[0_0_35px_rgba(0,0,0,0.04)] transition-all duration-300">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/design/design4.png"
              alt="Aura Store Landing Page Design"
              className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
            />
            {/* Hover Actions overlay */}
            <div className="absolute inset-0 bg-neutral-950/60 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col sm:flex-row items-center justify-center gap-3 z-10">
              <a
                href="https://github.com/moon908/street_wear"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-neutral-900/90 border border-neutral-700/50 hover:border-neutral-500/50 text-neutral-200 hover:text-white rounded-xl font-mono text-xs font-semibold flex items-center gap-1.5 transition-all duration-300 hover:scale-105"
              >
                <span>GIT_SOURCE</span>
                <span className="text-[10px]">↗</span>
              </a>
              <a
                href="https://street-wear-two.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-neutral-800 hover:bg-neutral-700 text-white rounded-xl font-mono text-xs font-semibold flex items-center gap-1.5 transition-all duration-300 hover:scale-105 shadow-[0_0_20px_rgba(0,0,0,0.3)] hover:shadow-[0_0_25px_rgba(0,0,0,0.5)]"
              >
                <span>OPEN_WEBSITE</span>
                <span className="text-[10px]">→</span>
              </a>
            </div>
          </div>

          {/* Card 5: MACBOOK PRO (Bottom Row - Spans 12 cols, 1 row) */}
          <div className="reveal reveal-slide-up reveal-delay-300 lg:col-span-12 bg-black rounded-3xl border border-neutral-900 min-h-[200px] lg:min-h-[300px] relative overflow-hidden group shadow-xl hover:border-neutral-800 transition-all duration-300">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/design/design5.png"
              alt="Desktop Pro Presentation Design"
              className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
            />
            {/* Hover Actions overlay */}
            <div className="absolute inset-0 bg-neutral-950/60 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col sm:flex-row items-center justify-center gap-3 z-10">
              <a
                href="https://github.com/moon908/apple-design-web-dev"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-neutral-900/90 border border-neutral-700/50 hover:border-violet-500/50 text-neutral-200 hover:text-white rounded-xl font-mono text-xs font-semibold flex items-center gap-1.5 transition-all duration-300 hover:scale-105"
              >
                <span>GIT_SOURCE</span>
                <span className="text-[10px]">↗</span>
              </a>
              <a
                href="https://apple-design-web-dev.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-violet-600 hover:bg-violet-500 text-white rounded-xl font-mono text-xs font-semibold flex items-center gap-1.5 transition-all duration-300 hover:scale-105 shadow-[0_0_20px_rgba(124,58,237,0.3)] hover:shadow-[0_0_25px_rgba(124,58,237,0.5)]"
              >
                <span>OPEN_WEBSITE</span>
                <span className="text-[10px]">→</span>
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
