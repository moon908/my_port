"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ResearchPaper } from "@/data/papers";

interface PaperDocViewProps {
  paper: ResearchPaper;
}

export default function PaperDocView({ paper }: PaperDocViewProps) {
  const [activeSection, setActiveSection] = useState("overview");

  useEffect(() => {
    const sections = ["overview", "abstract", "introduction", "methodology", "results", "references"];
    
    const observerOptions = {
      root: null,
      rootMargin: "-20% 0px -60% 0px", // triggers when section is in reading view
      threshold: 0,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    sections.forEach((sectionId) => {
      const element = document.getElementById(sectionId);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [paper]);

  const sectionsList = [
    { id: "overview", label: "00. OVERVIEW" },
    { id: "abstract", label: "01. ABSTRACT" },
    { id: "introduction", label: "02. INTRODUCTION" },
    { id: "methodology", label: "03. METHODOLOGY" },
    { id: "results", label: "04. RESULTS" },
    { id: "references", label: "05. REFERENCES" },
  ];

  return (
    <div className="bg-neutral-950 min-h-screen text-neutral-100 font-jetbrains relative selection:bg-blue-500/30 selection:text-blue-200 overflow-x-hidden">
      {/* Subtle blueprint grid background */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.008)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.008)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none z-0" />
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-[150px] pointer-events-none z-0" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-indigo-500/5 rounded-full blur-[150px] pointer-events-none z-0" />

      {/* Main Container */}
      <div className="relative z-10 flex max-w-7xl mx-auto w-full min-h-screen border-x border-neutral-900/50 bg-neutral-950/60 backdrop-blur-md">
        
        {/* Left Sidebar - Sticky Navigation */}
        <aside className="hidden md:block w-64 shrink-0 border-r border-neutral-900/60 p-8 h-screen sticky top-0 overflow-y-auto">
          <div className="space-y-8">
            {/* Back home */}
            <Link
              href="/"
              className="text-xs font-mono text-neutral-400 hover:text-blue-400 flex items-center space-x-2 group/back"
            >
              <span>←</span>
              <span className="group-hover/back:-translate-x-1 transition-transform">// RETURN_HOME</span>
            </Link>

            {/* Document Navigation */}
            <div className="space-y-4">
              <div className="text-[10px] font-mono tracking-widest text-neutral-600 uppercase font-semibold">
                DOCUMENT SECTIONS
              </div>
              <nav className="flex flex-col space-y-2 text-xs font-mono">
                {sectionsList.map((sec) => (
                  <a
                    key={sec.id}
                    href={`#${sec.id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      document.getElementById(sec.id)?.scrollIntoView({ behavior: "smooth" });
                      setActiveSection(sec.id);
                    }}
                    className={`pl-3 py-1 border-l-2 transition-all duration-200 ${
                      activeSection === sec.id
                        ? "text-blue-400 border-blue-500 font-semibold"
                        : "text-neutral-500 border-transparent hover:text-neutral-300 hover:border-neutral-800"
                    }`}
                  >
                    {sec.label}
                  </a>
                ))}
              </nav>
            </div>

            {/* Document Telemetry Specs */}
            <div className="space-y-3 pt-6 border-t border-neutral-900">
              <div className="text-[10px] font-mono tracking-widest text-neutral-600 uppercase font-semibold">
                TELEMETRY FEED
              </div>
              <div className="space-y-2 text-[10px] font-mono text-neutral-500">
                <div className="flex justify-between">
                  <span>REF:</span>
                  <span className="text-neutral-300">{paper.ref}</span>
                </div>
                <div className="flex justify-between">
                  <span>STATUS:</span>
                  <span className="text-emerald-500">{paper.status}</span>
                </div>
                <div className="flex justify-between">
                  <span>DATE:</span>
                  <span className="text-neutral-300">{paper.date.replaceAll(".", "-")}</span>
                </div>
              </div>
            </div>
          </div>
        </aside>

        {/* Main Document Panel */}
        <main className="flex-1 p-6 sm:p-10 md:p-16 max-w-4xl overflow-y-auto space-y-12">
          {/* Header Mobile / Navigation shortcut */}
          <div className="md:hidden flex items-center justify-between pb-6 border-b border-neutral-900">
            <Link
              href="/"
              className="text-xs font-mono text-neutral-400 hover:text-blue-400 flex items-center space-x-1"
            >
              <span>←</span>
              <span>HOME</span>
            </Link>
            <span className="text-[10px] font-mono text-emerald-400">{paper.status}</span>
          </div>

          {/* Section: Overview */}
          <section id="overview" className="space-y-6 pt-4 scroll-mt-20">
            <div className="space-y-3">
              <div className="text-xs font-mono text-blue-400 uppercase tracking-widest font-semibold flex items-center space-x-2">
                <span>{paper.journal}</span>
                <span className="text-neutral-700">•</span>
                <span>{paper.date}</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-neutral-100 font-mono leading-tight">
                {paper.title}
              </h1>
            </div>

            {/* Meta Tags Row */}
            <div className="flex flex-wrap gap-1.5">
              {paper.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-0.5 bg-neutral-900 border border-neutral-800/80 rounded text-[10px] font-mono text-neutral-400"
                >
                  {tag}
                </span>
              ))}
            </div>
            
            {/* DOI Box */}
            <div className="flex items-center space-x-3 p-3 bg-neutral-900/20 border border-neutral-900 rounded-lg text-xs font-mono">
              <span className="text-neutral-500">DOI_LINK:</span>
              <a
                href={`https://doi.org/${paper.doi}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-300 break-all"
              >
                https://doi.org/{paper.doi}
              </a>
            </div>
          </section>

          {/* Section: Abstract */}
          <section id="abstract" className="space-y-4 pt-4 border-t border-neutral-900/60 scroll-mt-20">
            <h2 className="text-xs font-bold font-mono tracking-widest text-neutral-400 uppercase flex items-center space-x-2">
              <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
              <span>ABSTRACT SUMMARY</span>
            </h2>
            <div className="bg-neutral-900/20 border border-neutral-900 p-6 rounded-lg relative overflow-hidden">
              <div className="absolute top-0 left-0 h-full w-[2px] bg-blue-500/80" />
              <p className="text-xs sm:text-sm font-mono text-neutral-300 leading-relaxed">
                {paper.abstract}
              </p>
            </div>
          </section>

          {/* Section: Introduction */}
          <section id="introduction" className="space-y-4 pt-4 border-t border-neutral-900/60 scroll-mt-20">
            <h2 className="text-md font-bold font-mono text-neutral-100 flex items-center space-x-3">
              <span className="text-blue-500 text-sm">01.</span>
              <span className="uppercase tracking-wider">Introduction</span>
            </h2>
            <p className="text-neutral-300 text-sm sm:text-base leading-relaxed font-sans font-light">
              {paper.introduction}
            </p>
          </section>

          {/* Section: Methodology */}
          <section id="methodology" className="space-y-4 pt-4 border-t border-neutral-900/60 scroll-mt-20">
            <h2 className="text-md font-bold font-mono text-neutral-100 flex items-center space-x-3">
              <span className="text-blue-500 text-sm">02.</span>
              <span className="uppercase tracking-wider">Methodology</span>
            </h2>
            <p className="text-neutral-300 text-sm sm:text-base leading-relaxed font-sans font-light">
              {paper.methodology}
            </p>
          </section>

          {/* Section: Results */}
          <section id="results" className="space-y-4 pt-4 border-t border-neutral-900/60 scroll-mt-20">
            <h2 className="text-md font-bold font-mono text-neutral-100 flex items-center space-x-3">
              <span className="text-blue-500 text-sm">03.</span>
              <span className="uppercase tracking-wider">Results & Observations</span>
            </h2>
            <p className="text-neutral-300 text-sm sm:text-base leading-relaxed font-sans font-light">
              {paper.results}
            </p>
          </section>

          {/* Section: References */}
          <section id="references" className="space-y-4 pt-4 border-t border-neutral-900/60 scroll-mt-20">
            <h2 className="text-xs font-bold font-mono tracking-widest text-neutral-400 uppercase flex items-center space-x-2">
              <span className="w-1.5 h-1.5 bg-neutral-600 rounded-full"></span>
              <span>REFERENCES SYSTEM</span>
            </h2>
            <ol className="list-decimal pl-5 space-y-3 font-mono text-xs text-neutral-500">
              {paper.references.map((ref, idx) => (
                <li key={idx} className="pl-1">
                  <span className="text-neutral-400">{ref}</span>
                </li>
              ))}
            </ol>
          </section>
        </main>
      </div>
    </div>
  );
}
