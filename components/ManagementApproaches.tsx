"use client";

import React, { useState } from "react";

interface ApproachPhase {
  name: string;
  desc: string;
}

interface ApproachMetric {
  label: string;
  value: string;
}

interface Approach {
  id: string;
  category: "PLANNING" | "RESEARCH" | "MANAGEMENT" | "RISK";
  ref: string;
  title: string;
  description: string;
  codeHeader: string;
  phases: ApproachPhase[];
  metrics: ApproachMetric[];
  svgIcon: React.ReactNode;
  pagerUrl: string;
}

export default function ManagementApproaches() {
  const [activeTab, setActiveTab] = useState<string>("APP-001");

  const approaches: Approach[] = [
    {
      id: "APP-001",
      category: "PLANNING",
      ref: "HUB-OPS",
      title: "Last-Mile Operations Hub, E-commerce",
      description: "Last-mile delivery is the most expensive stage of logistics, yet it is often managed reactively. Inefficient routing, manual processes, poor asset utilization, and last-minute changes cause delivery delays, higher return-to-sender (RTS) rates, increased costs, and reduced customer satisfaction, especially during peak demand.",
      codeHeader: "// HUB_LOGISTICS: LAST_MILE_DISPATCH",
      pagerUrl: "/pager/pager_lastmile_process.pdf",
      metrics: [
        { label: "DISPATCH_LATENCY", value: "< 4.2 Min" },
        { label: "ROUTE_EFFICIENCY", value: "98.7%" }
      ],
      phases: [
        { name: "Phase 01: Route Optimization", desc: "Implementing machine learning models for dynamic route planning to eliminate manual dispatch errors." },
        { name: "Phase 02: Capacity Allocation", desc: "Maximizing asset utilization through automated vehicle capacity matching and dynamic scheduling." },
        { name: "Phase 03: RTS Minimization", desc: "Enforcing delivery window adjustments and digital proof-of-delivery to actively reduce return rates." }
      ],
      svgIcon: (
        <svg viewBox="0 0 200 120" className="w-full h-full stroke-violet-500/80 fill-none stroke-[1.5]" xmlns="http://www.w3.org/2000/svg">
          {/* Blueprint background grid */}
          <path d="M 0 20 L 200 20 M 0 60 L 200 60 M 0 100 L 200 100 M 40 0 L 40 120 M 100 0 L 100 120 M 160 0 L 160 120" className="stroke-neutral-800/40" strokeDasharray="2 2" />

          {/* Central Hub */}
          <rect x="85" y="45" width="30" height="30" rx="3" className="fill-neutral-950 stroke-violet-500" />
          <text x="100" y="63" className="fill-violet-400 font-mono text-[8px] font-bold text-center" textAnchor="middle">HUB_01</text>

          {/* Satellites / Destinations */}
          <circle cx="30" cy="30" r="8" className="fill-neutral-950 stroke-violet-500/60" />
          <text x="30" y="33" className="fill-neutral-400 font-mono text-[7px] text-center" textAnchor="middle">D1</text>

          <circle cx="30" cy="90" r="8" className="fill-neutral-950 stroke-violet-500/60" />
          <text x="30" y="93" className="fill-neutral-400 font-mono text-[7px] text-center" textAnchor="middle">D2</text>

          <circle cx="170" cy="60" r="8" className="fill-neutral-950 stroke-violet-500/60" />
          <text x="170" y="63" className="fill-neutral-400 font-mono text-[7px] text-center" textAnchor="middle">D3</text>

          {/* Route lines */}
          <path d="M 85 55 L 38 33" className="stroke-violet-500/40" strokeDasharray="3 3" />
          <path d="M 85 65 L 38 87" className="stroke-violet-500/40" strokeDasharray="3 3" />
          <path d="M 115 60 L 162 60" className="stroke-violet-500" />

          {/* Dynamic delivery pulse */}
          <circle r="2.5" className="fill-violet-400 animate-ping">
            <animateMotion dur="2.5s" repeatCount="indefinite" path="M 115 60 L 162 60" />
          </circle>
        </svg>
      )
    },
    {
      id: "APP-002",
      category: "RESEARCH",
      ref: "AUTO-SCM",
      title: "Supply Chain Automotive Assembly",
      description: "Door assembly is a critical bottleneck in automotive manufacturing. Current operations rely on manual part logistics, unpredictable supply arrivals, and labor-intensive station setups. High defect rates due to misaligned parts, missing fasteners, or incorrect door variants (LH/RH, trim levels) cause rework, line stoppages, and warranty claims. Peak production targets are rarely met due to assembly delays and supply chain inefficiencies. Traceability gaps lead to quality escapes and difficulty root-causing assembly failures.",
      codeHeader: "// ASSEMBLY_LINE: JIT_SYNCHRONIZATION",
      pagerUrl: "/pager/pager_door_car.pdf",
      metrics: [
        { label: "LINE_DOWNTIME", value: "0.00%" },
        { label: "BUFFER_ACCURACY", value: "99.9%" }
      ],
      phases: [
        { name: "Phase 01: Parts Synchronization", desc: "Aligning sequence-based component delivery times with assembly schedules to reduce setup delays." },
        { name: "Phase 02: Variant & Fastener Checks", desc: "Utilizing vision-guided validation to prevent LH/RH door mismatches and missing fasteners." },
        { name: "Phase 03: Quality Traceability Logs", desc: "Recording digital torque, weld, and fitment signatures to avoid quality escapes and speed root-causing." }
      ],
      svgIcon: (
        <svg viewBox="0 0 200 120" className="w-full h-full stroke-violet-500/80 fill-none stroke-[1.5]" xmlns="http://www.w3.org/2000/svg">
          <path d="M 0 20 L 200 20 M 0 60 L 200 60 M 0 100 L 200 100 M 40 0 L 40 120 M 100 0 L 100 120 M 160 0 L 160 120" className="stroke-neutral-800/40" strokeDasharray="2 2" />

          {/* Conveyor Line */}
          <line x1="20" y1="70" x2="180" y2="70" className="stroke-neutral-700" strokeWidth="2" />
          
          {/* Conveyor Rollers */}
          <circle cx="40" cy="70" r="4" className="fill-neutral-950 stroke-neutral-500" />
          <circle cx="80" cy="70" r="4" className="fill-neutral-950 stroke-neutral-500" />
          <circle cx="120" cy="70" r="4" className="fill-neutral-950 stroke-neutral-500" />
          <circle cx="160" cy="70" r="4" className="fill-neutral-950 stroke-neutral-500" />

          {/* Robotic Arm */}
          <path d="M 100 20 L 100 45 L 85 60" className="stroke-violet-500" strokeWidth="2" />
          <circle cx="100" cy="20" r="3" className="fill-violet-400" />
          <circle cx="100" cy="45" r="2.5" className="fill-violet-400" />
          <path d="M 80 57 L 85 60 L 82 65" className="stroke-violet-400" />

          {/* Assembling component */}
          <rect x="75" y="65" width="10" height="8" rx="1" className="fill-neutral-950 stroke-violet-500" />

          <text x="140" y="35" className="fill-violet-400/70 font-mono text-[7px]">JIT_ACTIVE</text>
          <line x1="100" y1="20" x2="135" y2="33" className="stroke-violet-500/20" strokeDasharray="2 2" />
        </svg>
      )
    },
    {
      id: "APP-003",
      category: "MANAGEMENT",
      ref: "OPS-EXCELLENCE",
      title: "Operations Team Excellence",
      description: "Fast-paced operations in fulfillment centers, dark stores, and logistics hubs often rely on verbal task assignments or whiteboards, making coordination reactive and inefficient. Poor visibility, shifting priorities, scattered data, and ineffective shift handoffs lead to missed targets, higher overtime, safety risks, and operator burnout.",
      codeHeader: "// PERFORMANCE: TEAM_OPTIMIZATION",
      pagerUrl: "/pager/pager_team_management.pdf",
      metrics: [
        { label: "FRONT_LINE_SAFETY", value: "100%" },
        { label: "RESPONSE_SPEED", value: "< 1.5 Mins" }
      ],
      phases: [
        { name: "Phase 01: Centralized Digital Board", desc: "Replacing whiteboards and verbal handoffs with real-time digital priority queues for clear operations visibility." },
        { name: "Phase 02: Dynamic Rebalancing", desc: "Orchestrating active labor and workload shifts dynamically to prevent operator burnout and overtime." },
        { name: "Phase 03: Unified Shift Handoffs", desc: "Standardizing shift transition logs to document open bottlenecks, safety audits, and task handovers." }
      ],
      svgIcon: (
        <svg viewBox="0 0 200 120" className="w-full h-full stroke-violet-500/80 fill-none stroke-[1.5]" xmlns="http://www.w3.org/2000/svg">
          <path d="M 0 20 L 200 20 M 0 60 L 200 60 M 0 100 L 200 100 M 40 0 L 40 120 M 100 0 L 100 120 M 160 0 L 160 120" className="stroke-neutral-800/40" strokeDasharray="2 2" />

          {/* Performance chart line */}
          <path d="M 20 90 L 60 80 L 100 45 L 140 35 L 180 15" className="stroke-violet-500" strokeWidth="2" />
          
          {/* Chart Nodes */}
          <circle cx="20" cy="90" r="3" className="fill-neutral-950 stroke-violet-400" />
          <circle cx="60" cy="80" r="3" className="fill-neutral-950 stroke-violet-400" />
          <circle cx="100" cy="45" r="3" className="fill-neutral-950 stroke-violet-400" />
          <circle cx="140" cy="35" r="3" className="fill-neutral-950 stroke-violet-400" />
          <circle cx="180" cy="15" r="4" className="fill-violet-400" />

          {/* Target dotted limit */}
          <line x1="20" y1="30" x2="180" y2="30" className="stroke-neutral-700/80" strokeDasharray="3 3" />
          <text x="25" y="25" className="fill-neutral-500 font-mono text-[7px]">GOAL_SLA</text>

          <text x="140" y="55" className="fill-violet-400 font-mono text-[8px] font-bold">99.8%</text>
        </svg>
      )
    }
  ];

  const activeApproach = approaches.find((app) => app.id === activeTab) || approaches[0];

  return (
    <section id="methodology" className="w-full bg-neutral-950 text-neutral-100 font-jetbrains relative py-20 px-6 md:px-12 border-t border-neutral-900/80 overflow-hidden">
      {/* Blueprint grid background */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none z-0" />
      <div className="absolute top-0 right-1/3 w-96 h-96 bg-violet-600/5 rounded-full blur-[100px] pointer-events-none z-0" />
      <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-indigo-600/5 rounded-full blur-[100px] pointer-events-none z-0" />

      <div className="relative z-10 max-w-7xl mx-auto w-full flex flex-col space-y-12">
        {/* Section Header */}
        <div className="reveal reveal-slide-up space-y-4 max-w-2xl border-l-2 border-violet-500 pl-4 sm:pl-6">
          <div className="text-xs font-mono tracking-widest text-violet-400 font-semibold uppercase">
            // ORG_LOGS: PROCESSES & GOVERNANCE
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-neutral-100">
            Management & Methodologies
          </h2>
          <p className="text-sm text-neutral-400 font-mono">
            How I structure research, orchestrate project pipelines, define engineering boundaries, and guarantee reliability across high-stakes initiatives.
          </p>
        </div>

        {/* Dynamic Interactive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Selector Sidebar */}
          <div className="lg:col-span-4 flex flex-col h-full space-y-3">
            {approaches.map((app, idx) => (
              <button
                key={app.id}
                onClick={() => setActiveTab(app.id)}
                className={`reveal reveal-slide-left reveal-delay-${(idx + 1) * 100} lg:flex-1 w-full text-left p-4 rounded-xl border font-mono transition-all duration-300 flex flex-col justify-between relative overflow-hidden group cursor-pointer ${activeTab === app.id
                  ? "bg-violet-950/20 border-violet-500/50 shadow-[0_0_20px_rgba(139,92,246,0.08)]"
                  : "bg-neutral-900/10 border-neutral-800/80 hover:border-neutral-700/80 hover:bg-neutral-900/20"
                  }`}
              >
                {/* Visual indicator line on the left of active card */}
                <div
                  className={`absolute left-0 top-0 bottom-0 w-[3px] bg-violet-500 transition-transform duration-300 ${activeTab === app.id ? "scale-y-100" : "scale-y-0"
                    }`}
                />

                <div className="flex justify-between items-center text-[10px] text-neutral-500 mb-2">
                  <span className="font-semibold text-neutral-400">{`[REF: ${app.ref}]`}</span>
                  <span className={`px-1.5 py-0.5 rounded border text-[8px] font-bold ${activeTab === app.id ? "border-violet-500/30 text-violet-400 bg-violet-950/40" : "border-neutral-800 text-neutral-500 bg-neutral-950"
                    }`}>
                    {app.category}
                  </span>
                </div>

                <h3 className={`text-sm font-bold tracking-tight transition-colors duration-200 ${activeTab === app.id ? "text-violet-400" : "text-neutral-200 group-hover:text-neutral-100"
                  }`}>
                  {app.title}
                </h3>
              </button>
            ))}
          </div>

          {/* Details Card */}
          <div className="reveal reveal-scale lg:col-span-8 bg-neutral-900/20 border border-neutral-800/80 backdrop-blur-md rounded-xl p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden">
            {/* Corner crosshairs for technical drafting aesthetic */}
            <div className="absolute top-2 left-2 w-2 h-2 border-t border-l border-neutral-800" />
            <div className="absolute top-2 right-2 w-2 h-2 border-t border-r border-neutral-800" />
            <div className="absolute bottom-2 left-2 w-2 h-2 border-b border-l border-neutral-800" />
            <div className="absolute bottom-2 right-2 w-2 h-2 border-b border-r border-neutral-800" />

            <div key={activeTab} className="reveal reveal-scale">
              {/* Header row */}
              <div className="flex justify-between items-center text-[10px] font-mono text-neutral-500 mb-6 pb-3 border-b border-neutral-800/40">
                <span className="text-violet-400 font-semibold">{activeApproach.codeHeader}</span>
                <span className="text-neutral-500">{`SYSTEM_STATE: OPERATIONAL`}</span>
              </div>

              {/* Grid content */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
                {/* Description & Phases */}
                <div className="md:col-span-7 space-y-6">
                  <p className="text-xs text-neutral-300 leading-relaxed font-mono">
                    {activeApproach.description}
                  </p>

                  <div className="pt-2 pb-4">
                    <a
                      href={activeApproach.pagerUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex px-4 py-2 bg-violet-950/40 hover:bg-violet-900/40 border border-violet-500/50 hover:border-violet-500 rounded-lg text-xs font-mono text-violet-400 hover:text-violet-300 font-semibold items-center space-x-2 transition-all duration-300 shadow-[0_0_15px_rgba(139,92,246,0.05)] hover:shadow-[0_0_20px_rgba(139,92,246,0.15)] group cursor-pointer"
                    >
                      <span>OPEN_ONE_PAGER</span>
                      <span className="transform translate-y-[0.5px] group-hover:translate-x-0.5 transition-transform select-none">→</span>
                    </a>
                  </div>

                  <div className="space-y-3">
                    <div className="text-[10px] font-mono text-neutral-500 uppercase tracking-wider">
                      PROCESS_FLOW // MILESTONES
                    </div>
                    <div className="relative border-l border-neutral-800/80 pl-4 ml-1.5 space-y-4">
                      {activeApproach.phases.map((phase, idx) => (
                        <div key={idx} className="relative group/phase">
                          {/* Dot indicator */}
                          <div className="absolute -left-[20.5px] top-[4px] w-2 h-2 rounded-full bg-neutral-950 border border-violet-500 group-hover/phase:bg-violet-400 transition-colors" />

                          <h4 className="text-xs font-bold font-mono text-neutral-200 group-hover/phase:text-violet-400 transition-colors">
                            {phase.name}
                          </h4>
                          <p className="text-[11px] text-neutral-400 font-mono mt-0.5 leading-relaxed">
                            {phase.desc}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* SVG Visualizer */}
                <div className="md:col-span-5 flex flex-col items-center justify-center border border-neutral-800/50 rounded-lg p-4 bg-neutral-950/30 min-h-[160px]">
                  <div className="text-[9px] font-mono text-neutral-500 mb-3 uppercase tracking-wider self-start">
                    [REALTIME_SCHEMATIC]
                  </div>
                  <div className="w-full max-w-[180px] h-[110px] flex items-center justify-center">
                    {activeApproach.svgIcon}
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
