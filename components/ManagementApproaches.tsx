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
}

export default function ManagementApproaches() {
  const [activeTab, setActiveTab] = useState<string>("APP-001");

  const approaches: Approach[] = [
    {
      id: "APP-001",
      category: "PLANNING",
      ref: "MBSE-CORE",
      title: "Model-Based Systems Planning",
      description: "Decomposing complex aerospace software architecture into verified requirements and deterministic interfaces. We construct comprehensive digital twins and interface control structures prior to physical synthesis.",
      codeHeader: "// SYSTEM_ARCH: MBSE_PARADIGM",
      metrics: [
        { label: "VERIFICATION_COVERAGE", value: "100.0%" },
        { label: "INTERFACE_DRIFT_RATE", value: "0.00%" }
      ],
      phases: [
        { name: "Phase 01: Requirement Traceability", desc: "Formal mapping of every software function back to payload constraint vectors." },
        { name: "Phase 02: Interface Control (ICD)", desc: "Strict verification contracts for all module interfaces preventing boundary friction." },
        { name: "Phase 03: Digital Twin Simulation", desc: "Running system binaries in virtual environments to catch structural conflicts early." }
      ],
      svgIcon: (
        <svg viewBox="0 0 200 120" className="w-full h-full stroke-violet-500/80 fill-none stroke-[1.5]" xmlns="http://www.w3.org/2000/svg">
          {/* Blueprint background grid */}
          <path d="M 0 20 L 200 20 M 0 60 L 200 60 M 0 100 L 200 100 M 40 0 L 40 120 M 100 0 L 100 120 M 160 0 L 160 120" className="stroke-neutral-800/40" strokeDasharray="2 2" />

          {/* System Nodes */}
          <rect x="25" y="45" width="30" height="30" rx="3" className="fill-neutral-950 stroke-violet-500" />
          <text x="40" y="63" className="fill-violet-400 font-mono text-[8px] font-bold text-center" textAnchor="middle">SYS_A</text>

          <rect x="85" y="15" width="30" height="30" rx="3" className="fill-neutral-950 stroke-violet-500" />
          <text x="100" y="33" className="fill-violet-400 font-mono text-[8px] font-bold text-center" textAnchor="middle">SYS_B</text>

          <rect x="85" y="75" width="30" height="30" rx="3" className="fill-neutral-950 stroke-violet-500" />
          <text x="100" y="93" className="fill-violet-400 font-mono text-[8px] font-bold text-center" textAnchor="middle">SYS_C</text>

          <rect x="145" y="45" width="30" height="30" rx="3" className="fill-neutral-950 stroke-violet-500" />
          <text x="160" y="63" className="fill-violet-400 font-mono text-[8px] font-bold text-center" textAnchor="middle">SYS_D</text>

          {/* Connections */}
          <path d="M 55 60 L 85 30" className="stroke-violet-500/80" strokeDasharray="3 3" />
          <path d="M 55 60 L 85 90" className="stroke-violet-500/80" />
          <path d="M 115 30 L 145 60" className="stroke-violet-500/80" />
          <path d="M 115 90 L 145 60" className="stroke-violet-500/80" strokeDasharray="3 3" />

          {/* Diagnostic Pulse */}
          <circle r="3" className="fill-violet-400 animate-ping">
            <animateMotion dur="3s" repeatCount="indefinite" path="M 55 60 L 85 90 L 145 60" />
          </circle>
        </svg>
      )
    },
    {
      id: "APP-002",
      category: "RESEARCH",
      ref: "SITL-VALIDATION",
      title: "Simulation-In-The-Loop Research",
      description: "Testing theoretical orbital maneuvers and machine learning telemetry models inside high-fidelity environments. We ensure mathematical correctness translates seamlessly to bare-metal target hardware.",
      codeHeader: "// RES_LOGS: DYNAMIC_SIMULATION",
      metrics: [
        { label: "PREDICTION_ACCURACY", value: "99.4%" },
        { label: "INFERENCE_LATENCY", value: "0.85ms" }
      ],
      phases: [
        { name: "Phase 01: Theoretical Bounds", desc: "Proving numerical convergence limits using Lyapunov stability criteria." },
        { name: "Phase 02: Software-in-the-Loop", desc: "Simulating high-density swarm trajectories with random wind/J2 perturbations." },
        { name: "Phase 03: Hardware-in-the-Loop", desc: "Deploying and profiling execution footprints on physical ARM Cortex microcontrollers." }
      ],
      svgIcon: (
        <svg viewBox="0 0 200 120" className="w-full h-full stroke-violet-500/80 fill-none stroke-[1.5]" xmlns="http://www.w3.org/2000/svg">
          <path d="M 0 20 L 200 20 M 0 60 L 200 60 M 0 100 L 200 100 M 40 0 L 40 120 M 100 0 L 100 120 M 160 0 L 160 120" className="stroke-neutral-800/40" strokeDasharray="2 2" />

          {/* Signal / Simulation wave */}
          <path d="M 10 90 Q 50 10 90 90 T 170 90" className="stroke-neutral-700/80" strokeDasharray="4 2" />
          <path d="M 10 90 Q 50 20 90 85 T 170 90" className="stroke-violet-500" />

          {/* Data Points */}
          <circle cx="50" cy="20" r="3" className="fill-violet-500" />
          <circle cx="90" cy="85" r="3" className="fill-violet-400" />
          <circle cx="130" cy="25" r="3" className="fill-violet-500" />

          {/* Sweep Line */}
          <line x1="90" y1="0" x2="90" y2="120" className="stroke-violet-500/30" />
          <text x="94" y="15" className="fill-violet-400/70 font-mono text-[7px]">TIME: 0.85ms</text>
        </svg>
      )
    },
    {
      id: "APP-003",
      category: "MANAGEMENT",
      ref: "AGILE-GOV",
      title: "Decentralized & Agile Operations",
      description: "Managing interdisciplinary workflows with high autonomy. We focus on short iteration loops, automated feedback metrics, and contract-first API alignment to reduce team-to-team integration delay.",
      codeHeader: "// EXEC_LOGS: COLLABORATIVE_AGILE",
      metrics: [
        { label: "INTEGRATION_LATENCY", value: "< 2.5 Hrs" },
        { label: "DEVELOPER_AUTONOMY", value: "9.8 / 10" }
      ],
      phases: [
        { name: "Phase 01: Micro-Sprints & ICDs", desc: "Scoping tasks into 1-week cycles anchored by strict Interface Control Documents." },
        { name: "Phase 02: Continuous Integration (CI)", desc: "Immediate testing on physical sandbox configurations when code changes." },
        { name: "Phase 03: Post-Mortem Analytics", desc: "Automated analysis of commit velocity and structural errors to optimize future sprints." }
      ],
      svgIcon: (
        <svg viewBox="0 0 200 120" className="w-full h-full stroke-violet-500/80 fill-none stroke-[1.5]" xmlns="http://www.w3.org/2000/svg">
          <path d="M 0 20 L 200 20 M 0 60 L 200 60 M 0 100 L 200 100 M 40 0 L 40 120 M 100 0 L 100 120 M 160 0 L 160 120" className="stroke-neutral-800/40" strokeDasharray="2 2" />

          {/* Recursive flow / loop */}
          <path d="M 100 60 C 60 10, 140 10, 100 60" className="stroke-violet-500" />
          <path d="M 100 60 C 60 110, 140 110, 100 60" className="stroke-violet-500" strokeDasharray="4 2" />

          {/* Arrowheads */}
          <path d="M 104 22 L 96 22 L 100 15 Z" className="fill-violet-500 stroke-none" />
          <path d="M 96 98 L 104 98 L 100 105 Z" className="fill-violet-500 stroke-none" />

          <circle cx="100" cy="60" r="6" className="fill-neutral-950 stroke-violet-400" />
          <text x="100" y="63" className="fill-violet-300 font-mono text-[7px] font-bold" textAnchor="middle">GIT</text>
        </svg>
      )
    },
    {
      id: "APP-004",
      category: "RISK",
      ref: "FMECA-MITIGATE",
      title: "Failure Modes & Risk Mitigation",
      description: "Formulating rigorous defensive software checks and system-level fail-safes. We design systems to survive telemetry losses, bit-flips, and physical sub-system degradation.",
      codeHeader: "// FAIL_SAFE: RISK_MITIGATION",
      metrics: [
        { label: "PAYLOAD_REDUNDANCY", value: "3N Active" },
        { label: "SYSTEM_MTBF", value: "> 50k Hrs" }
      ],
      phases: [
        { name: "Phase 01: FMECA Fault Logging", desc: "Registering every potential component crash alongside its severity score." },
        { name: "Phase 02: Dynamic Fault Injection", desc: "Purposely disabling telemetry pathways in virtual runs to observe fallback behavior." },
        { name: "Phase 03: Safe-State Initialization", desc: "Configuring firmware to lock hardware into stable, low-power states on warning flags." }
      ],
      svgIcon: (
        <svg viewBox="0 0 200 120" className="w-full h-full stroke-violet-500/80 fill-none stroke-[1.5]" xmlns="http://www.w3.org/2000/svg">
          <path d="M 0 20 L 200 20 M 0 60 L 200 60 M 0 100 L 200 100 M 40 0 L 40 120 M 100 0 L 100 120 M 160 0 L 160 120" className="stroke-neutral-800/40" strokeDasharray="2 2" />

          {/* Shield Outline */}
          <path d="M 70 30 L 130 30 L 130 65 C 130 90, 100 105, 100 105 C 100 105, 70 90, 70 65 Z" className="fill-neutral-950 stroke-violet-500" />

          {/* Intermittent sweep scan */}
          <line x1="75" y1="50" x2="125" y2="50" className="stroke-violet-400/40 animate-pulse" />
          <line x1="75" y1="70" x2="125" y2="70" className="stroke-violet-400/40 animate-pulse" />

          <text x="100" y="64" className="fill-violet-400 font-mono text-[9px] font-bold" textAnchor="middle">SECURE</text>
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
                    <button
                      type="button"
                      onClick={() => {
                        console.log(`Open one-pager clicked for: ${activeApproach.id}`);
                      }}
                      className="inline-flex px-4 py-2 bg-violet-950/40 hover:bg-violet-900/40 border border-violet-500/50 hover:border-violet-500 rounded-lg text-xs font-mono text-violet-400 hover:text-violet-300 font-semibold items-center space-x-2 transition-all duration-300 shadow-[0_0_15px_rgba(139,92,246,0.05)] hover:shadow-[0_0_20px_rgba(139,92,246,0.15)] group cursor-pointer"
                    >
                      <span>OPEN_ONE_PAGER</span>
                      <span className="transform translate-y-[0.5px] group-hover:translate-x-0.5 transition-transform select-none">→</span>
                    </button>
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
