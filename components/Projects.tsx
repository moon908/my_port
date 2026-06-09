"use client";

import React from "react";

interface Project {
  id: string;
  code: string;
  title: string;
  status: string;
  description: string;
  features: string[];
  techStack: string[];
  links: {
    demo?: string;
    source?: string;
  };
}

const projects: Project[] = [
  {
    id: "PRJ-001",
    code: "AETHER-DASH-X",
    title: "Aether Control: High-Frequency Satellite Telemetry Dashboard",
    status: "DEPLOYED // SECURE",
    description: "",
    features: [
      "Low-latency telemetry streaming via custom WebSocket brokers",
      "Interactive 3D orbital trajectory simulation using Three.js / WebGL",
      "High-throughput caching layer with Redis to optimize database read cycles",
      "Robust relational logging schema in PostgreSQL with automated partition rollups"
    ],
    techStack: ["Next.js 16", "Three.js", "WebSockets", "Redis", "PostgreSQL", "Tailwind CSS"],
    links: {
      demo: "https://demo.aether.siddhesh.space",
      source: "https://github.com/siddheshmoon/aether-telemetry"
    }
  },
  {
    id: "PRJ-002",
    code: "HELIOS-CONSENSUS",
    title: "Helios DB: Distributed Consensus Ledger for Deep-Space Logistics",
    status: "ACTIVE // OPERATIONAL",
    description: "",
    features: [
      "Custom consensus protocol implementation utilizing Rust-based RPC nodes",
      "Resilient high-write Cassandra cluster architecture for transaction integrity",
      "Automated infrastructure containerization using Docker and Kubernetes",
      "Comprehensive telemetry tracking via Prometheus and Grafana dashboards"
    ],
    techStack: ["React", "Rust (Actix-web)", "Cassandra", "gRPC", "Kubernetes", "Docker"],
    links: {
      demo: "https://demo.helios.siddhesh.space",
      source: "https://github.com/siddheshmoon/helios-ledger"
    }
  },
  {
    id: "PRJ-003",
    code: "ZEPHYR-MESH-Y",
    title: "Zephyr Link: Secure Sub-Orbital Mesh Communication Network",
    status: "ACTIVE // COMM_ESTABLISHED",
    description: "",
    features: [
      "Custom UDP packet multiplexing for sub-orbital vehicle links",
      "Peer-to-peer routing algorithm with automatic dynamic network topology discovery",
      "AES-GCM-256 low-overhead firmware encryption module",
      "Grafana integration for live signal degradation profiling"
    ],
    techStack: ["Go", "WebRTC", "Protobuf", "Grafana", "Docker"],
    links: {
      demo: "https://demo.zephyr.siddhesh.space",
      source: "https://github.com/siddheshmoon/zephyr-mesh"
    }
  },
  {
    id: "PRJ-004",
    code: "CHRONOS-TEMPORAL",
    title: "Chronos Engine: Real-Time Spatial Event Temporal Mapping Engine",
    status: "DEPLOYED // SYNCHRONIZED",
    description: "",
    features: [
      "High-performance time-series database index modeling",
      "Decoupled event streaming using Apache Kafka pipelines",
      "WebGL visual timeline renderer using custom shader materials",
      "Autoscaling serverless execution routines in AWS Lambda"
    ],
    techStack: ["TypeScript", "Apache Kafka", "WebGL", "AWS Lambda", "Node.js"],
    links: {
      demo: "https://demo.chronos.siddhesh.space",
      source: "https://github.com/siddheshmoon/chronos-engine"
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
        <div className="reveal reveal-slide-up space-y-4 max-w-2xl border-l-2 border-blue-500 pl-4 sm:pl-6">
          <div className="text-xs font-mono tracking-widest text-blue-400 font-semibold uppercase animate-pulse">
            // SYSTEMS: FULL_STACK_DEPLOYMENTS
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-neutral-100">
            Featured Deployments
          </h2>
          <p className="text-sm text-neutral-400 font-mono">
            Architecting robust distributed systems, telemetry engines, and real-time operational interfaces across the complete lifecycle stack.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {projects.map((project, idx) => (
            <div
              key={project.id}
              className={`reveal reveal-slide-up reveal-delay-${(idx + 1) * 100} flex flex-col justify-between bg-neutral-900/30 border border-neutral-800/80 backdrop-blur-md p-6 sm:p-8 rounded-xl hover:border-blue-500/50 transition-all duration-300 hover:shadow-[0_0_35px_rgba(59,130,246,0.06)] group relative`}
            >
              {/* Upper Section */}
              <div>


                {/* Image Upload Area */}
                <div className="mb-6 relative w-full h-44 rounded-lg overflow-hidden border border-dashed border-neutral-800 hover:border-blue-500/50 bg-neutral-950/40 transition-colors flex flex-col items-center justify-center group/upload cursor-pointer">
                  {images[project.id] ? (
                    <>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={images[project.id]}
                        alt={project.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-neutral-950/70 opacity-0 group-hover/upload:opacity-100 transition-opacity flex items-center justify-center">
                        <span className="text-[10px] font-mono text-blue-400">
                          // CLICK_TO_REPLACE_IMAGE
                        </span>
                      </div>
                    </>
                  ) : (
                    <div className="text-center p-4 space-y-2">
                      <div className="text-neutral-500 text-xs font-mono group-hover/upload:text-blue-400 transition-colors">
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
                    className="absolute inset-0 opacity-0 cursor-pointer"
                  />
                </div>

                {/* Title */}
                <div className="mb-4">
                  <h3 className="text-lg sm:text-xl font-bold tracking-tight text-neutral-100 font-mono group-hover:text-blue-400 transition-colors duration-200 leading-snug">
                    {project.title}
                  </h3>
                </div>

                {/* Description */}
                {project.description && (
                  <p className="text-xs text-neutral-400 leading-relaxed font-mono mb-6">
                    {project.description}
                  </p>
                )}


              </div>

              {/* Lower Section */}
              <div className="mt-4 pt-6 border-t border-neutral-800/40 space-y-5">
                {/* Tech Stack Pills */}
                <div className="flex flex-wrap gap-1.5">
                  {project.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-0.5 bg-neutral-950 border border-neutral-800/60 rounded text-[9px] font-mono text-neutral-400 hover:text-neutral-300 transition-colors"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Links */}
                <div className="flex items-center space-x-6 text-[10px] font-mono">
                  {project.links.demo && (
                    <a
                      href={project.links.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-400 hover:text-blue-300 font-semibold flex items-center space-x-1 group/demo transition-colors"
                    >
                      <span>EXECUTE_RUN</span>
                      <span className="transform translate-y-[0.5px] group-hover/demo:translate-x-0.5 transition-transform select-none">→</span>
                    </a>
                  )}
                  {project.links.source && (
                    <a
                      href={project.links.source}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-neutral-400 hover:text-neutral-200 font-semibold flex items-center space-x-1 group/src transition-colors"
                    >
                      <span>OPEN_SOURCE</span>
                      <span className="transform translate-y-[0.5px] group-hover/src:translate-x-0.5 transition-transform select-none">↗</span>
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
