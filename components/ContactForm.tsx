"use client";

import React, { useState } from "react";

export default function ContactForm() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"IDLE" | "TRANSMITTING" | "SUCCESS" | "ERROR">("IDLE");
  const [errorText, setErrorText] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setStatus("TRANSMITTING");
    setErrorText("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus("SUCCESS");
        setFormData({ name: "", email: "", message: "" });

        // Reset state back to IDLE after a delay
        setTimeout(() => {
          setStatus("IDLE");
        }, 5000);
      } else {
        setStatus("ERROR");
        setErrorText(data.error || "Failed to transmit message payload.");
      }
    } catch (err: any) {
      console.error(err);
      setStatus("ERROR");
      setErrorText("Network error. Could not connect to telemetry gateway.");
    }
  };

  return (
    <section id="contact" className="w-full bg-neutral-950 text-neutral-100 font-jetbrains relative py-24 px-6 md:px-12 border-t border-neutral-900/80 overflow-hidden">
      {/* Blueprint grid overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.008)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.008)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none z-0" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-violet-600/5 rounded-full blur-[120px] pointer-events-none z-0" />

      <div className="relative z-10 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

        {/* Left Column: Metadata & Spec Details */}
        <div className="reveal reveal-slide-left lg:col-span-5 space-y-6">
          <div className="space-y-4 max-w-md border-l-2 border-violet-500 pl-4 sm:pl-6">
            <div className="text-xs font-mono tracking-widest text-violet-400 font-semibold uppercase animate-pulse">
              // ESTABLISH_COMMUNICATION: CONTACT_GATEWAY
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-neutral-100">
              Get in Touch
            </h2>
            <p className="text-sm text-neutral-400 font-mono">
              Transmit a message payload through the secure channel. I will route a response back to your node shortly.
            </p>
          </div>

          {/* Secure telemetry metrics card */}
          <div className="bg-neutral-900/30 border border-neutral-900 rounded-2xl p-5 space-y-4 max-w-md backdrop-blur-md">
            <div className="text-[10px] font-mono text-neutral-500 uppercase tracking-wider border-b border-neutral-800/40 pb-2 flex justify-between items-center">
              <span>CONNECTION_STATUS</span>
              <span className="flex items-center space-x-1.5">
                <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-ping"></span>
                <span className="text-emerald-400 font-bold">SECURE_SSL</span>
              </span>
            </div>

            <div className="space-y-2.5 text-xs font-mono text-neutral-400">
              <div className="flex justify-between">
                <span className="text-neutral-500">DOMAIN_NAME:</span>
                <span>siddhesh-moon.vercel.app</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-500">LOCATION:</span>
                <span>Maharashtra ,India</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-500">EMAIL_TUNNEL:</span>
                <a href="mailto:siddheshmoon908@gmail.com" className="text-violet-400 hover:underline">
                  siddheshmoon908@gmail.com
                </a>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-500">PHONE_NUMBER:</span>
                <span className="text-violet-400 hover:underline">(+91) 8010347901</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: HTML Form */}
        <form onSubmit={handleSubmit} className="reveal reveal-slide-right lg:col-span-7 bg-neutral-900/20 border border-neutral-800/80 backdrop-blur-md rounded-2xl p-6 sm:p-8 space-y-6 relative overflow-hidden w-full max-w-2xl">
          {/* Drafting crosshairs */}
          <div className="absolute top-2 left-2 w-2 h-2 border-t border-l border-neutral-800" />
          <div className="absolute top-2 right-2 w-2 h-2 border-t border-r border-neutral-800" />
          <div className="absolute bottom-2 left-2 w-2 h-2 border-b border-l border-neutral-800" />
          <div className="absolute bottom-2 right-2 w-2 h-2 border-b border-r border-neutral-800" />

          {/* Form Header */}
          <div className="flex justify-between items-center text-[10px] font-mono text-neutral-500 border-b border-neutral-800/40 pb-3">
            <span>PACKET_FORM_PAYLOAD</span>
            <span>SYSTEM: ONLINE</span>
          </div>

          <div className="space-y-5">
            {/* Input Name */}
            <div className="space-y-2">
              <label htmlFor="name" className="block text-[10px] font-mono text-neutral-200 uppercase tracking-widest">
                [01. SENDER_NAME]
              </label>
              <input
                id="name"
                type="text"
                required
                disabled={status === "TRANSMITTING"}
                value={formData.name}
                onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                placeholder="Enter your name"
                className="w-full bg-neutral-950/60 border border-neutral-800 focus:border-violet-500 focus:ring-1 focus:ring-violet-500 rounded-xl px-4 py-3 text-sm font-mono placeholder-neutral-700 focus:outline-none transition-all duration-350 disabled:opacity-50"
              />
            </div>

            {/* Input Email */}
            <div className="space-y-2">
              <label htmlFor="email" className="block text-[10px] font-mono text-neutral-200 uppercase tracking-widest">
                [02. SENDER_EMAIL]
              </label>
              <input
                id="email"
                type="email"
                required
                disabled={status === "TRANSMITTING"}
                value={formData.email}
                onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                placeholder="name@domain.com"
                className="w-full bg-neutral-950/60 border border-neutral-800 focus:border-violet-500 focus:ring-1 focus:ring-violet-500 rounded-xl px-4 py-3 text-sm font-mono placeholder-neutral-700 focus:outline-none transition-all duration-350 disabled:opacity-50"
              />
            </div>

            {/* Input Message */}
            <div className="space-y-2">
              <label htmlFor="message" className="block text-[10px] font-mono text-neutral-200 uppercase tracking-widest">
                [03. MESSAGE_PAYLOAD]
              </label>
              <textarea
                id="message"
                required
                rows={5}
                disabled={status === "TRANSMITTING"}
                value={formData.message}
                onChange={(e) => setFormData((prev) => ({ ...prev, message: e.target.value }))}
                placeholder="Describe project details or message payload..."
                className="w-full bg-neutral-950/60 border border-neutral-800 focus:border-violet-500 focus:ring-1 focus:ring-violet-500 rounded-xl px-4 py-3 text-sm font-mono placeholder-neutral-700 focus:outline-none transition-all duration-350 disabled:opacity-50 resize-none"
              />
            </div>
          </div>

          {/* Form Actions / Feedback Banner */}
          <div className="pt-2 border-t border-neutral-800/40 flex flex-col space-y-4">

            {/* Submit Button */}
            {status === "IDLE" && (
              <button
                type="submit"
                className="w-full bg-violet-950/40 hover:bg-violet-900/40 border border-violet-500/50 hover:border-violet-500 text-violet-400 hover:text-violet-300 font-semibold px-6 py-3.5 rounded-xl text-xs font-mono tracking-wider transition-all duration-300 shadow-[0_0_15px_rgba(139,92,246,0.05)] hover:shadow-[0_0_20px_rgba(139,92,246,0.15)] flex items-center justify-center gap-2 cursor-pointer group"
              >
                <span>TRANSMIT_MESSAGE</span>
                <span className="transform translate-y-[0.5px] group-hover:translate-x-0.5 transition-transform select-none">→</span>
              </button>
            )}

            {/* Transmitting Telemetry feedback */}
            {status === "TRANSMITTING" && (
              <div className="w-full bg-neutral-950/80 border border-violet-500/30 rounded-xl p-3 flex flex-col items-center justify-center space-y-2">
                <div className="flex items-center space-x-2 text-[10px] font-mono text-violet-400">
                  <svg className="animate-spin h-3 w-3 text-violet-400" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" className="opacity-25" />
                    <path fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  <span>CONNECTING_TO_SENDER ... // TRANSMITTING_PACKET</span>
                </div>
                <div className="w-full bg-neutral-900 h-1 rounded-full overflow-hidden">
                  <div className="bg-violet-500 h-full w-2/3 animate-[pulse_1.5s_infinite]" />
                </div>
              </div>
            )}

            {/* Success feedback */}
            {status === "SUCCESS" && (
              <div className="w-full bg-emerald-950/20 border border-emerald-500/40 rounded-xl p-4 flex items-center space-x-3 text-xs font-mono text-emerald-400">
                <svg className="w-4 h-4 text-emerald-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                <div className="flex-1">
                  <div className="font-bold">PACKET_TRANSMITTED_SUCCESSFULLY</div>
                  <div className="text-[10px] text-emerald-500 mt-0.5">Telemetry log confirmed. Node handshake established.</div>
                </div>
              </div>
            )}

            {/* Error feedback */}
            {status === "ERROR" && (
              <div className="space-y-3">
                <div className="w-full bg-red-950/20 border border-red-500/40 rounded-xl p-4 flex items-center space-x-3 text-xs font-mono text-red-400">
                  <svg className="w-4 h-4 text-red-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                  <div className="flex-1">
                    <div className="font-bold">TRANSMISSION_FAILED</div>
                    <div className="text-[10px] text-red-500 mt-0.5">{errorText}</div>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setStatus("IDLE")}
                  className="w-full bg-neutral-900 border border-neutral-800 hover:border-neutral-700 text-neutral-350 font-mono text-[9px] py-2.5 rounded-xl cursor-pointer transition-all hover:text-white text-center"
                >
                  // DISMISS_AND_RETRY
                </button>
              </div>
            )}
          </div>
        </form>

      </div>
    </section>
  );
}
