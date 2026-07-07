"use client";

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";

// Dynamically import the 3D Earth to prevent SSR/Hydration errors
const EarthGlobe = dynamic(() => import("@/components/EarthGlobe"), {
    ssr: false,
});

export default function Home() {
    const [line1, setLine1] = useState("");
    const [line2, setLine2] = useState("");
    const [showCursor1, setShowCursor1] = useState(true);
    const [showCursor2, setShowCursor2] = useState(false);

    const [metrics, setMetrics] = useState({
        orbit: 0,
        lat: "45.1092° N",
        lon: "123.4091° W",
    });

    const text1 = "👋, My Name is Siddhesh Moon";
    const text2 = "I'm a Engineer";

    useEffect(() => {
        let index1 = 0;
        let index2 = 0;
        let timer1: ReturnType<typeof setTimeout>;
        let timer2: ReturnType<typeof setTimeout>;

        const typeLine1 = () => {
            if (index1 < text1.length) {
                setLine1(text1.substring(0, index1 + 1));
                index1++;
                timer1 = setTimeout(typeLine1, 80);
            } else {
                setShowCursor1(false);
                setShowCursor2(true);
                timer2 = setTimeout(typeLine2, 80);
            }
        };

        const typeLine2 = () => {
            if (index2 < text2.length) {
                setLine2(text2.substring(0, index2 + 1));
                index2++;
                timer2 = setTimeout(typeLine2, 85);
            }
        };

        timer1 = setTimeout(typeLine1, 500);

        return () => {
            clearTimeout(timer1);
            clearTimeout(timer2);
        };
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            setMetrics({
                orbit: (Date.now() / 200) % 360,
                lat: (45.1092 + Math.sin(Date.now() / 12000) * 0.05).toFixed(4) + "° N",
                lon: (123.4091 + Math.cos(Date.now() / 12000) * 0.05).toFixed(4) + "° W",
            });
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <main id="hero" className="min-h-screen w-full bg-neutral-950 text-neutral-100 font-jetbrains selection:bg-blue-500/30 selection:text-blue-200 relative flex flex-col justify-between overflow-x-hidden">
            {/* 3D Earth Background canvas - absolute and z-0 */}
            <div className="reveal reveal-scale absolute inset-y-0 left-0 w-full lg:w-[145%] z-0 overflow-hidden" style={{ transitionDuration: "1500ms" }}>
                <EarthGlobe />
            </div>

            {/* Ambient background decoration */}
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-neutral-800 to-transparent z-10 pointer-events-none" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_40%_-20%,rgba(59,130,246,0.03),rgba(255,255,255,0))] pointer-events-none" />

            {/* Main Grid Layout Container - pointer-events-none to let drag reach the canvas */}
            <div className="relative z-10 flex-1 max-w-7xl mx-auto w-full px-6 md:px-12 flex flex-col justify-center py-8 pointer-events-none">

                {/* Hero split layout */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center my-auto py-6 w-full">

                    {/* Left Column: Scientist Command Terminal - pointer-events-auto so user can interact */}
                    <div className="reveal reveal-slide-up lg:col-span-6 flex flex-col space-y-6 text-left pointer-events-auto bg-neutral-900/30 border border-neutral-800/80 backdrop-blur-md p-6 sm:p-8 rounded-xl shadow-[0_0_50px_rgba(0,0,0,0.8)] max-w-lg" style={{ transitionDuration: "1200ms" }}>
                        {/* Terminal Title Bar */}
                        <div className="flex items-center justify-between border-b border-neutral-800/80 pb-4 text-xs font-mono tracking-wider text-neutral-400">
                            <div className="flex items-center space-x-2">
                                <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
                                <span className="font-semibold text-neutral-300">TELEMETRY: ONLINE</span>
                            </div>
                            <div className="font-semibold text-neutral-400">NODE_ID: #8890-ALPHA</div>
                        </div>

                        {/* Terminal Content / Typewriter */}
                        <div className="space-y-4 font-mono">
                            <div className="flex items-start space-x-2">
                                <span className="text-emerald-500 font-bold select-none">&gt;</span>
                                <h1 className="text-lg sm:text-xl md:text-2xl font-bold tracking-tight leading-relaxed text-neutral-100 min-h-[3.6em] sm:min-h-[2.4em]">
                                    {line1}
                                    {showCursor1 && <span className="animate-pulse font-normal text-emerald-400">_</span>}
                                </h1>
                            </div>
                            {line1.length >= text1.length && (
                                <div className="flex items-start space-x-2">
                                    <span className="text-blue-500 font-bold select-none">&gt;</span>
                                    <p className="text-md sm:text-lg font-semibold tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400 min-h-[1.5em] leading-relaxed">
                                        {line2}
                                        {showCursor2 && <span className="text-emerald-400 animate-pulse font-normal">_</span>}
                                    </p>
                                </div>
                            )}
                        </div>

                        {/* Telemetry Metrics Panel */}
                        <div className="border-t border-neutral-800/80 pt-4 mt-2">
                            <div className="text-[10px] font-mono tracking-widest text-neutral-500 uppercase mb-2">LIVE METRICS FEED</div>
                            <div className="grid grid-cols-2 gap-x-6 gap-y-2 text-xs font-mono text-neutral-400">
                                <div className="flex justify-between border-b border-neutral-800/30 pb-1">
                                    <span className="text-neutral-500">ORBIT_ROTATION:</span>
                                    <span className="text-neutral-300">{metrics.orbit.toFixed(2)}°</span>
                                </div>
                                <div className="flex justify-between border-b border-neutral-800/30 pb-1">
                                    <span className="text-neutral-500">GEO_LAT:</span>
                                    <span className="text-neutral-300">{metrics.lat}</span>
                                </div>
                                <div className="flex justify-between border-b border-neutral-800/30 pb-1">
                                    <span className="text-neutral-500">ALTITUDE:</span>
                                    <span className="text-emerald-400 font-semibold">4,200 KM</span>
                                </div>
                                <div className="flex justify-between border-b border-neutral-800/30 pb-1">
                                    <span className="text-neutral-500">GEO_LON:</span>
                                    <span className="text-neutral-300">{metrics.lon}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Centered 3D Globe placeholder - pointer-events-none to let dragging pass through */}
                    <div className="lg:col-span-6 relative w-full h-[350px] sm:h-[450px] lg:h-[550px] flex items-center justify-center pointer-events-none">
                        {/* Empty space that allows click-through to the Earth behind it */}
                    </div>

                </div>
            </div>
        </main>
    );
}
