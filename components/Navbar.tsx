"use client";

import React, { useState, useEffect } from "react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "./home", href: "#hero" },
    { name: "./about", href: "#about" },
    { name: "./research", href: "#research" },
    { name: "./projects", href: "#projects" },
    { name: "./methodology", href: "#methodology" },
    { name: "./contact", href: "#contact" },
  ];

  return (
    <nav
      className={`fixed left-1/2 -translate-x-1/2 z-50 w-[calc(100%-2rem)] max-w-7xl rounded-xl border font-mono transition-all duration-300 px-6 py-3.5 flex items-center justify-between ${
        scrolled
          ? "top-4 bg-neutral-950/70 backdrop-blur-md border-neutral-900/80 shadow-[0_4px_30px_rgba(0,0,0,0.5)]"
          : "top-6 bg-neutral-950/30 backdrop-blur-sm border-neutral-900/40"
      }`}
    >
      {/* Brand logo node */}
      <a href="#hero" className="flex items-center space-x-2 group">
        <span className="w-1.5 h-1.5 bg-violet-500 rounded-full group-hover:animate-ping" />
        <span className="text-xs font-bold tracking-widest text-neutral-300 group-hover:text-violet-400 transition-colors">
          [NODE // SIDDHESH_MOON]
        </span>
      </a>

      {/* Desktop Navigation links */}
      <div className="hidden md:flex items-center space-x-6 text-xs font-medium">
        {navLinks.map((link) => (
          <a
            key={link.name}
            href={link.href}
            className="text-neutral-400 hover:text-violet-400 transition-colors relative py-1 group"
          >
            {link.name}
            <span className="absolute bottom-0 left-0 w-full h-[1px] bg-violet-500/80 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300" />
          </a>
        ))}
      </div>

      {/* Status indicator on desktop */}
      <div className="hidden md:flex items-center space-x-3 text-[10px] text-neutral-500 tracking-wider">
        <span className="flex items-center space-x-1.5">
          <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
          <span className="text-emerald-400 font-semibold">SYS_ONLINE</span>
        </span>
      </div>

      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden flex flex-col justify-center items-center w-6 h-6 space-y-1 focus:outline-none cursor-pointer"
        aria-label="Toggle Menu"
      >
        <span
          className={`h-[1.5px] w-5 bg-neutral-300 rounded-full transition-transform duration-300 ${
            isOpen ? "transform rotate-45 translate-y-[5.5px]" : ""
          }`}
        />
        <span
          className={`h-[1.5px] w-5 bg-neutral-300 rounded-full transition-opacity duration-300 ${
            isOpen ? "opacity-0" : "opacity-100"
          }`}
        />
        <span
          className={`h-[1.5px] w-5 bg-neutral-300 rounded-full transition-transform duration-300 ${
            isOpen ? "transform -rotate-45 -translate-y-[5.5px]" : ""
          }`}
        />
      </button>

      {/* Mobile Dropdown Panel */}
      {isOpen && (
        <div className="absolute top-[calc(100%+0.5rem)] left-0 w-full bg-neutral-950/90 backdrop-blur-lg border border-neutral-900/95 rounded-xl p-4 flex flex-col space-y-3 shadow-2xl md:hidden reveal reveal-scale reveal-active">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="text-neutral-400 hover:text-violet-400 font-semibold py-2 px-3 hover:bg-neutral-900/40 rounded-lg text-xs font-mono transition-colors"
            >
              {link.name}
            </a>
          ))}
          <div className="border-t border-neutral-900 pt-3 flex items-center justify-between px-3 text-[10px] text-neutral-500">
            <span>SYS_ONLINE</span>
            <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
          </div>
        </div>
      )}
    </nav>
  );
}
