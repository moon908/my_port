"use client";

import React from "react";

interface Project {
  id: string;
  code: string;
  title: string;
  subtitle: string;
  status: string;
  description: string;
  features: string[];
  techStack: string[];
  links: {
    demo?: string;
    source?: string;
  };
  image: string;
  theme: {
    border: string;
    badge: string;
    iconBg: string;
    text: string;
  };
}

const projects: Project[] = [
  {
    id: "PRJ-001",
    code: "01",
    title: "Atheria AI",
    subtitle: "Agriculture Analysis",
    status: "Live",
    description: "An intelligent agriculture analysis platform providing crop health diagnostics and yield optimization insights.",
    features: [
      "Computer-vision based crop foliage disease identification models",
      "Geospatial soil composition and moisture analysis integrations",
      "Historical climatic data ingestion for predictive harvest forecasting",
      "Localized farm advisory generation via natural language generation"
    ],
    techStack: ["Next.js", "Python (PyTorch)", "FastAPI", "PostgreSQL", "Tailwind CSS"],
    links: {
      demo: "https://knowyourcrop.vercel.app",
      source: "https://github.com/moon908/crop_health"
    },
    image: "/project/project1.jpeg",
    theme: {
      border: "hover:border-violet-500/50 hover:shadow-[0_0_35px_rgba(139,92,246,0.08)]",
      badge: "border-violet-500/30 text-violet-400 bg-violet-950/20",
      iconBg: "bg-violet-950/30 border border-violet-500/20 text-violet-400",
      text: "text-violet-400 group-hover:text-violet-300"
    }
  },
  {
    id: "PRJ-002",
    code: "02",
    title: "ProjectFlow",
    subtitle: "Project Management",
    status: "Live",
    description: "A collaborative project management application featuring real-time visual boards and sprint tracking.",
    features: [
      "Dynamic real-time workflow synchronization using WebSocket subscriptions",
      "Detailed time-tracking and milestone velocity analytics dashboards",
      "Automated sprint planning and task backlog prioritization algorithms",
      "Seamless GitHub pull request status and commit event integrations"
    ],
    techStack: ["React", "Node.js (Express)", "MongoDB", "Socket.io", "Tailwind CSS"],
    links: {
      demo: "https://projectflow-beryl-theta.vercel.app",
      source: "https://github.com/moon908/project_mgmt"
    },
    image: "/project/project2.jpeg",
    theme: {
      border: "hover:border-blue-500/50 hover:shadow-[0_0_35px_rgba(59,130,246,0.08)]",
      badge: "border-blue-500/30 text-blue-400 bg-blue-950/20",
      iconBg: "bg-blue-950/30 border border-blue-500/20 text-blue-400",
      text: "text-blue-400 group-hover:text-blue-300"
    }
  },
  {
    id: "PRJ-003",
    code: "03",
    title: "AcuVad",
    subtitle: "Voice Activity Detector",
    status: "Live",
    description: "An advanced Voice Activity Detector (VAD) system designed to identify and isolate speech in audio streams.",
    features: [
      "Interactive live sensor drift calibration profiling views",
      "Sub-millisecond data logging pipelines using optimized database indexes",
      "Automatic anomaly identification and threshold alert triggers",
      "Custom hardware-in-the-loop validation script runner console"
    ],
    techStack: ["React", "Python", "SQLite", "Chart.js", "Tailwind CSS"],
    links: {
      demo: "https://acuvad.vercel.app",
      source: "https://github.com/moon908/vad_detail"
    },
    image: "/project/project3.jpeg",
    theme: {
      border: "hover:border-teal-500/50 hover:shadow-[0_0_35px_rgba(20,184,166,0.08)]",
      badge: "border-teal-500/30 text-teal-400 bg-teal-950/20",
      iconBg: "bg-teal-950/30 border border-teal-500/20 text-teal-400",
      text: "text-teal-400 group-hover:text-teal-300"
    }
  },
  {
    id: "PRJ-004",
    code: "04",
    title: "Spectra Analysis",
    subtitle: "Automatic Reporting Tool",
    status: "Live",
    description: "An automatic reporting tool visualizing frequency spectra, signal properties, and degradation metrics.",
    features: [
      "Fast Fourier Transform (FFT) signal wave visualization using WebGL",
      "Custom noise filtering and signal gain adjustment parameters",
      "Automated report export with interactive canvas rendering",
      "Kafka-based event streams processing high-frequency audio files"
    ],
    techStack: ["TypeScript", "WebGL", "Apache Kafka", "AWS Lambda", "Node.js"],
    links: {
      demo: "https://spectrareport.vercel.app",
      source: "https://github.com/moon908/reporting_tool"
    },
    image: "/chronos_engine.jpg",
    theme: {
      border: "hover:border-fuchsia-500/50 hover:shadow-[0_0_35px_rgba(217,70,239,0.08)]",
      badge: "border-fuchsia-500/30 text-fuchsia-400 bg-fuchsia-950/20",
      iconBg: "bg-fuchsia-950/30 border border-fuchsia-500/20 text-fuchsia-400",
      text: "text-fuchsia-400 group-hover:text-fuchsia-300"
    }
  },
  {
    id: "PRJ-005",
    code: "05",
    title: "Investo",
    subtitle: "Intelligent Investing Application",
    status: "Live",
    description: "An intelligent investing application offering algorithmic portfolio tracking and asset rebalancing.",
    features: [
      "Real-time market price feed integration via financial APIs",
      "Risk-adjusted performance profiling using Sharpe and Sortino ratios",
      "Interactive asset allocation rebalancing simulators",
      "Time-series transaction logs database with automated tax rollups"
    ],
    techStack: ["Next.js", "TypeScript", "Redis", "PostgreSQL", "Tailwind CSS"],
    links: {
      demo: "https://investo-six.vercel.app/",
      source: "https://github.com/moon908/investing_advice"
    },
    image: "/project/project5.jpeg",
    theme: {
      border: "hover:border-rose-500/50 hover:shadow-[0_0_35px_rgba(244,63,94,0.08)]",
      badge: "border-rose-500/30 text-rose-400 bg-rose-950/20",
      iconBg: "bg-rose-950/30 border border-rose-500/20 text-rose-400",
      text: "text-rose-400 group-hover:text-rose-300"
    }
  },
  {
    id: "PRJ-006",
    code: "06",
    title: "Robotics Workflow",
    subtitle: "Robotics Workflow Hub",
    status: "Live",
    description: "A decentralized edge orchestration hub coordinating serverless command workflows on robotic devices.",
    features: [
      "Decentralized control plane for container deployment on edge micro-units",
      "Sandboxed execution loops utilizing lightweight WebAssembly runtimes",
      "High-speed communication lines utilizing NATS pub/sub message brokers",
      "Real-time robotic state and joint velocity tracking dashboards"
    ],
    techStack: ["Rust", "WebAssembly", "NATS", "Prometheus", "Kubernetes"],
    links: {
      demo: "https://investo-six.vercel.app/",
      source: "https://github.com/moon908/investing_advice"
    },
    image: "/apex_core.jpg",
    theme: {
      border: "hover:border-cyan-500/50 hover:shadow-[0_0_35px_rgba(6,182,212,0.08)]",
      badge: "border-cyan-500/30 text-cyan-400 bg-cyan-950/20",
      iconBg: "bg-cyan-950/30 border border-cyan-500/20 text-cyan-400",
      text: "text-cyan-400 group-hover:text-cyan-300"
    }
  }
];

export default function Projects() {
  const [images, setImages] = React.useState<Record<string, string>>({});

  const handleImageUpload = (projectId: string, event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setImages((prev) => ({ ...prev, [projectId]: url }));
    }
  };

  return (
    <section id="projects" className="w-full bg-neutral-950 text-neutral-100 font-jetbrains relative py-24 px-6 md:px-12 border-t border-neutral-900/80 overflow-hidden">
      {/* Blueprint grid background */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.012)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.012)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none z-0" />
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-[120px] pointer-events-none z-0" />
      <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-indigo-500/5 rounded-full blur-[120px] pointer-events-none z-0" />

      <div className="relative z-10 max-w-7xl mx-auto w-full flex flex-col space-y-14">
        {/* Section Header */}
        <div className="reveal reveal-slide-up space-y-4 max-w-2xl pl-1">
          <div className="text-xs font-mono tracking-widest text-violet-400 font-semibold uppercase animate-pulse">
            // SYSTEMS: FULL_STACK_DEPLOYMENTS
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-neutral-100 select-none">
            Featured <span className="bg-gradient-to-r from-violet-400 to-blue-500 bg-clip-text text-transparent">Deployments</span>
          </h2>
          <p className="text-xs sm:text-sm text-neutral-400 font-mono">
            Architecting robust distributed systems, telemetry engines, and real-time operational interfaces across the complete lifecycle stack.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
          {projects.map((project, idx) => {
            const displayImage = images[project.id] || project.image;
            return (
              <div
                key={project.id}
                className={`reveal reveal-slide-up reveal-delay-${(idx + 1) * 100} flex flex-col justify-between bg-neutral-900/15 border border-neutral-900/80 backdrop-blur-md p-6 sm:p-8 rounded-2xl transition-all duration-300 ${project.theme.border} group relative`}
              >
                {/* Upper Section */}
                <div className="flex flex-col flex-1">
                  
                  {/* Card Header (Pills) */}
                  <div className="flex items-center justify-between mb-6 w-full">
                    {/* Number Badge */}
                    <div className={`px-2.5 py-1 rounded-md text-[10px] font-mono font-bold tracking-wider border ${project.theme.badge}`}>
                      {project.code}
                    </div>

                    {/* Status Badge */}
                    <div className="bg-neutral-950/40 border border-neutral-900/60 px-3 py-1 rounded-full text-[10px] font-mono text-neutral-400 flex items-center space-x-1.5">
                      <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_8px_#10b981]" />
                      <span>{project.status}</span>
                    </div>
                  </div>

                  {/* Card Content Layout */}
                  <div className="grid grid-cols-1 md:grid-cols-12 lg:grid-cols-1 gap-6 items-start flex-1">
                    
                    {/* Left Side: Project Image Preview */}
                    <div className="md:col-span-6 lg:col-span-1 relative w-full h-44 rounded-lg overflow-hidden border border-neutral-800 bg-neutral-950/40 group/upload cursor-pointer">
                      {displayImage ? (
                        <>
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={displayImage}
                            alt={project.title}
                            className="w-full h-full object-cover group-hover/upload:scale-105 transition-transform duration-500"
                          />
                          <div className="absolute inset-0 bg-neutral-950/70 opacity-0 group-hover/upload:opacity-100 transition-opacity flex items-center justify-center">
                            <span className="text-[10px] font-mono text-violet-400">
                              // CLICK_TO_REPLACE_IMAGE
                            </span>
                          </div>
                        </>
                      ) : (
                        <div className="text-center p-4 space-y-2">
                          <div className="text-neutral-500 text-xs font-mono group-hover/upload:text-violet-400 transition-colors">
                            [DRAG_AND_DROP_OR_CLICK]
                          </div>
                          <div className="text-[10px] text-neutral-600 font-mono">
                            PNG, JPG or WEBP (MAX 5MB)
                          </div>
                        </div>
                      )}
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleImageUpload(project.id, e)}
                        className="absolute inset-0 opacity-0 cursor-pointer z-10"
                      />
                    </div>

                    {/* Right Side: Details & Description */}
                    <div className="md:col-span-6 lg:col-span-1 flex flex-col items-start space-y-4">
                      {/* Circle Icon */}
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${project.theme.iconBg}`}>
                        {project.id === "PRJ-001" && (
                          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M4.9 19.1C1 15.2 1 8.8 4.9 4.9M19.1 4.9c3.9 3.9 3.9 10.3 0 14.2M8.4 15.6c-2-2-2-5.2 0-7.2M15.6 8.4c2 2 2 5.2 0 7.2M12 12h.01" />
                          </svg>
                        )}
                        {project.id === "PRJ-002" && (
                          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125v-3.75m16.5 0v3.75" />
                          </svg>
                        )}
                        {project.id === "PRJ-003" && (
                          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M8.284 16.284A3 3 0 0 0 12 15a3 3 0 0 0 3.716 1.284M5.457 13.457a6 6 0 0 1 8.543 0m-8.543 0a6 6 0 0 0 8.543 0M2.63 10.63a9 9 0 0 1 12.74 0m-12.74 0a9 9 0 0 0 12.74 0M12 18h.008v.008H12V18Z" />
                          </svg>
                        )}
                        {project.id === "PRJ-004" && (
                          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                          </svg>
                        )}
                        {project.id === "PRJ-005" && (
                          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.75c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.57-.598-3.75h-.152c-3.196 0-6.1-1.25-8.25-3.286Z" />
                          </svg>
                        )}
                        {project.id === "PRJ-006" && (
                          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 3v1.5M12 3v1.5m3.75-1.5v1.5M19 12h1.5m-1.5 3.75H21m-2-7.5H21M3 12h1.5m-.5 3.75H5m-2-7.5H5m3.75 13.5v1.5M12 17.25v1.5m3.75-1.5v1.5M6 6h12v12H6V6Z" />
                          </svg>
                        )}
                      </div>

                      {/* Text details */}
                      <div className="space-y-1.5 text-left font-mono">
                        <h3 className="text-lg sm:text-xl font-bold tracking-tight text-neutral-100 group-hover:text-blue-400 transition-colors duration-200">
                          {project.title}
                        </h3>
                        <div className="text-[10px] font-mono tracking-wide text-neutral-400 uppercase leading-snug">
                          {project.subtitle}
                        </div>
                        <p className="text-xs text-neutral-400 leading-relaxed pt-1">
                          {project.description}
                        </p>
                      </div>

                    </div>

                  </div>

                </div>

                {/* Lower Section */}
                <div className="mt-6 pt-6 border-t border-neutral-800/40">
                  {/* Links */}
                  <div className="flex items-center justify-between text-[10px] font-mono w-full">
                    {project.links.demo ? (
                      <a
                        href={project.links.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`font-semibold flex items-center space-x-1 group/demo transition-colors ${project.theme.text}`}
                      >
                        <span>Explore</span>
                        <span className="transform translate-y-[0.5px] group-hover/demo:translate-x-0.5 transition-transform select-none">→</span>
                      </a>
                    ) : (
                      <div />
                    )}
                    {project.links.source ? (
                      <a
                        href={project.links.source}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-neutral-400 hover:text-neutral-200 font-semibold flex items-center space-x-1.5 group/src transition-colors"
                      >
                        <span>View Source</span>
                        <span className="transform translate-y-[0.5px] group-hover/src:translate-x-0.5 transition-transform select-none">↗</span>
                        <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.137 20.162 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
                        </svg>
                      </a>
                    ) : (
                      <div />
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
