"use client";

import React from "react";

import Link from "next/link";
import { papers } from "@/data/papers";

export default function ResearchPapers() {
  return (
    <section id="research" className="w-full bg-neutral-950 text-neutral-100 font-jetbrains relative py-20 px-6 md:px-12 border-t border-neutral-900/80 overflow-hidden">
      {/* Blueprint grid background */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.012)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,00.012)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none z-0" />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-[100px] pointer-events-none z-0" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-emerald-500/5 rounded-full blur-[100px] pointer-events-none z-0" />

      <div className="relative z-10 max-w-7xl mx-auto w-full flex flex-col space-y-12">
        {/* Section Header */}
        <div className="reveal reveal-slide-up space-y-4 max-w-2xl border-l-2 border-emerald-500 pl-4 sm:pl-6">
          <div className="text-xs font-mono tracking-widest text-emerald-400 font-semibold uppercase">
            // DATA_LOGS: PUBLICATIONS & ARCHIVE
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-neutral-100">
            Research & Publications
          </h2>
          <p className="text-sm text-neutral-400 font-mono">
            Peer-reviewed papers and conference contributions focusing on aerospace dynamics, celestial telemetry, and micro-propulsion architectures.
          </p>
        </div>

        {/* Papers List */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {papers.map((paper, idx) => (
            <div
              key={paper.id}
              className={`reveal reveal-slide-up reveal-delay-${(idx + 1) * 100} flex flex-col justify-between bg-neutral-900/30 border border-neutral-800/80 backdrop-blur-md p-6 rounded-xl hover:border-neutral-700/80 transition-all duration-300 hover:shadow-[0_0_30px_rgba(59,130,246,0.05)] group relative`}
            >
              {/* Top Row: Ref */}
              <div className="flex justify-between items-center text-[10px] font-mono text-neutral-500 mb-4 pb-3 border-b border-neutral-800/40">
                <span className="text-neutral-400 font-semibold">{`[REF: ${paper.ref}]`}</span>
              </div>

              {/* Middle Section: Title, Abstract */}
              <div className="space-y-3 flex-1">
                <h3 className="text-md font-bold tracking-tight text-neutral-100 font-mono group-hover:text-blue-400 transition-colors duration-200 leading-snug">
                  {paper.title}
                </h3>
                <p className="text-xs text-neutral-400 leading-relaxed font-mono pt-1">
                  {paper.abstract}
                </p>
              </div>

              {/* Bottom Section: Tags and DOI */}
              <div className="mt-6 space-y-4">
                {/* Tags */}
                <div className="flex flex-wrap gap-1.5">
                  {paper.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 bg-neutral-950 border border-neutral-800/50 rounded text-[9px] font-mono text-neutral-500 hover:text-neutral-400 transition-colors"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Footer and Read Link */}
                <div className="flex items-center justify-between pt-3 border-t border-neutral-800/40 text-[10px] font-mono">
                  <span className="text-neutral-500">{`DOI: ${paper.doi}`}</span>
                  <Link
                    href={`/papers/${paper.id}`}
                    className="text-blue-400 hover:text-blue-300 font-semibold flex items-center space-x-1 group/link transition-colors"
                  >
                    <span>READ_DOC</span>
                    <span className="transform translate-y-[0.5px] group-hover/link:translate-x-0.5 transition-transform select-none">→</span>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
