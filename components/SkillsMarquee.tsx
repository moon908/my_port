"use client";

import React from "react";

interface SkillItem {
  name: string;
  outlined: boolean;
}


const skillsRow2: SkillItem[] = [
  { name: "PLC/PID", outlined: true },
  { name: "ROBOTICS", outlined: false },
  { name: "CONTROL SYSTEMS", outlined: true },
  { name: "FUSION360", outlined: false },
  { name: "AUTONOMOUS NAVIGATION", outlined: false },
  { name: "ROS", outlined: true },
];

const skillsRow3: SkillItem[] = [
  { name: "NEXT.JS", outlined: false },
  { name: "REACT", outlined: true },
  { name: "TYPESCRIPT", outlined: false },
  { name: "NODE.JS", outlined: true },
  { name: "POSTGRESQL", outlined: false },
  { name: "PYTORCH", outlined: true },
  { name: "RESTAPIS", outlined: false },
  { name: "PYTHON", outlined: true },
];

const skillsRow1: SkillItem[] = [
  { name: "PROJECT MANAGEMENT", outlined: false },
  { name: "TEAM LEADERSHIP", outlined: true },
  { name: "STAKEHOLDER MANAGEMENT", outlined: false },
  { name: "STRATEGIC PLANNING", outlined: true },
  { name: "RISK MANAGEMENT", outlined: false },
  { name: "RESOURCE PLANNING", outlined: false },
];

export default function SkillsMarquee() {
  const renderRow = (items: SkillItem[]) => {
    return items.map((item, idx) => (
      <div key={idx} className="flex items-center space-x-6 sm:space-x-8 shrink-0">
        <span
          className={`text-3xl sm:text-5xl md:text-6xl font-black font-playfair tracking-tight uppercase select-none transition-all duration-300 ${item.outlined
            ? "text-transparent [-webkit-text-stroke:1px_rgba(255,255,255,0.25)] hover:[-webkit-text-stroke:1px_rgba(255,255,255,0.7)]"
            : "text-neutral-200 hover:text-white"
            }`}
        >
          {item.name}
        </span>
        <span className="text-xl sm:text-3xl md:text-4xl text-neutral-800 font-light select-none font-playfair">
          ○
        </span>
      </div>
    ));
  };

  return (
    <section className="w-full bg-neutral-950 py-8 sm:py-12 overflow-hidden border-t border-b border-neutral-900/50 relative">
      {/* Self-contained CSS for marquee animations */}
      <style>{`
        @keyframes marquee-left {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-100%); }
        }
        @keyframes marquee-right {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(0%); }
        }
        .animate-marquee-left {
          animation: marquee-left 40s linear infinite;
        }
        .animate-marquee-right {
          animation: marquee-right 40s linear infinite;
        }
      `}</style>

      {/* Fade masks for smooth edges */}
      <div className="absolute inset-y-0 left-0 w-24 sm:w-48 bg-gradient-to-r from-neutral-950 to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-24 sm:w-48 bg-gradient-to-l from-neutral-950 to-transparent z-10 pointer-events-none" />

      <div className="flex flex-col gap-6 sm:gap-8 relative z-0">
        {/* Row 1: Scrolling Left */}
        <div className="flex overflow-hidden select-none w-full">
          <div className="flex shrink-0 items-center justify-around min-w-full animate-marquee-left pr-8 sm:pr-12">
            {renderRow(skillsRow1)}
          </div>
          <div className="flex shrink-0 items-center justify-around min-w-full animate-marquee-left pr-8 sm:pr-12" aria-hidden="true">
            {renderRow(skillsRow1)}
          </div>
        </div>

        {/* Row 2: Scrolling Right */}
        <div className="flex overflow-hidden select-none w-full">
          <div className="flex shrink-0 items-center justify-around min-w-full animate-marquee-right pr-8 sm:pr-12">
            {renderRow(skillsRow2)}
          </div>
          <div className="flex shrink-0 items-center justify-around min-w-full animate-marquee-right pr-8 sm:pr-12" aria-hidden="true">
            {renderRow(skillsRow2)}
          </div>
        </div>

        {/* Row 3: Scrolling Left */}
        <div className="flex overflow-hidden select-none w-full">
          <div className="flex shrink-0 items-center justify-around min-w-full animate-marquee-left pr-8 sm:pr-12">
            {renderRow(skillsRow3)}
          </div>
          <div className="flex shrink-0 items-center justify-around min-w-full animate-marquee-left pr-8 sm:pr-12" aria-hidden="true">
            {renderRow(skillsRow3)}
          </div>
        </div>
      </div>
    </section>
  );
}
