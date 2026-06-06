"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Activity, ShieldCheck, Clock, Radio, Truck } from "lucide-react";

interface Hub {
  id: string;
  name: string;
  x: number; // percentage coordinate on SVG
  y: number; // percentage coordinate on SVG
  vehicles: number;
  temp: string;
  status: string;
  desc: string;
}

export default function TelemetryMap() {
  const [activeHub, setActiveHub] = useState<Hub>({
    id: "muscat",
    name: "Muscat Central HQ",
    x: 75,
    y: 32,
    vehicles: 250,
    temp: "+2.4°C Avg",
    status: "Optimal",
    desc: "Primary dispatch hub and cold storage operations for Muscat Governorate. Connects directly to Al Rusayl bottling plants.",
  });

  const hubs: Hub[] = [
    {
      id: "muscat",
      name: "Muscat Central HQ",
      x: 75,
      y: 32,
      vehicles: 250,
      temp: "+2.4°C Avg",
      status: "Optimal",
      desc: "Primary dispatch hub and cold storage operations for Muscat Governorate. Connects directly to Al Rusayl bottling plants.",
    },
    {
      id: "sohar",
      name: "Sohar Gateway Hub",
      x: 62,
      y: 18,
      vehicles: 120,
      temp: "+3.1°C Avg",
      status: "Optimal",
      desc: "Batinah corridor dispatch terminal. Facilitates high-volume cross-docking and direct transit links to UAE borders.",
    },
    {
      id: "salalah",
      name: "Salalah Southern Terminal",
      x: 28,
      y: 82,
      vehicles: 80,
      temp: "+1.9°C Avg",
      status: "Optimal",
      desc: "Dhofar Governorate dispatch base. Coordinates the long-haul coastal highway route and serves southern wholesale networks.",
    },
    {
      id: "nizwa",
      name: "Nizwa Interior Depot",
      x: 65,
      y: 42,
      vehicles: 50,
      temp: "+2.8°C Avg",
      status: "Optimal",
      desc: "Interior region depot servicing Dakhiliyah retailers. Specialized in cross-docking and remote distributor support.",
    },
  ];

  return (
    <section className="py-20 bg-chamber border-y border-border-glass relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <span className="font-sans text-xs font-semibold tracking-widest text-crimson uppercase flex items-center gap-2">
            <Radio className="h-4 w-4 text-crimson animate-pulse-slow" />
            Live Telemetry Dashboard
          </span>
          <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Nationwide Transit Fleet Operations
          </h2>
          <p className="mt-4 font-sans text-base text-silver max-w-2xl">
            Select a terminal on the geographic interface to preview real-time fleet telemetry, climate storage logs, and regional capacity metrics.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Map interface panel */}
          <div className="lg:col-span-7 glass-panel rounded-lg p-6 flex flex-col justify-center min-h-[400px] bg-obsidian relative">
            <div className="absolute top-4 right-4 flex items-center gap-1.5 text-xs font-sans text-silver bg-chamber px-2.5 py-1 rounded border border-border-glass">
              <Activity className="h-3.5 w-3.5 text-crimson" />
              Active System Telemetry
            </div>

            {/* Abstract Vector Map of Oman */}
            <div className="relative w-full h-[350px] md:h-[400px] border border-border-glass/40 rounded bg-chamber/20 overflow-hidden flex items-center justify-center">
              {/* Map grid lines */}
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#30363d1a_1px,transparent_1px),linear-gradient(to_bottom,#30363d1a_1px,transparent_1px)] bg-[size:30px_30px]" />
              
              {/* SVG Map Lines (connecting hubs) */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none">
                {/* Lines radiating from Muscat HQ */}
                <line x1={`${hubs[0].x}%`} y1={`${hubs[0].y}%`} x2={`${hubs[1].x}%`} y2={`${hubs[1].y}%`} stroke="#30363D" strokeWidth="1.5" strokeDasharray="4 4" />
                <line x1={`${hubs[0].x}%`} y1={`${hubs[0].y}%`} x2={`${hubs[3].x}%`} y2={`${hubs[3].y}%`} stroke="#30363D" strokeWidth="1.5" strokeDasharray="4 4" />
                <line x1={`${hubs[3].x}%`} y1={`${hubs[3].y}%`} x2={`${hubs[2].x}%`} y2={`${hubs[2].y}%`} stroke="#30363D" strokeWidth="1.5" strokeDasharray="4 4" />

                {/* Draw active telemetry route glow */}
                {activeHub.id !== "muscat" && (
                  <motion.line
                    x1={`${hubs[0].x}%`}
                    y1={`${hubs[0].y}%`}
                    x2={`${activeHub.x}%`}
                    y2={`${activeHub.y}%`}
                    stroke="#E5A93C"
                    strokeWidth="2"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.8, repeat: Infinity, repeatDelay: 1 }}
                  />
                )}
              </svg>

              {/* Hub Indicators */}
              {hubs.map((hub) => (
                <button
                  key={hub.id}
                  onClick={() => setActiveHub(hub)}
                  style={{ left: `${hub.x}%`, top: `${hub.y}%` }}
                  className="absolute -translate-x-1/2 -translate-y-1/2 group focus:outline-none z-10"
                >
                  {/* Outer pulse */}
                  <span className={`absolute inline-flex h-8 w-8 rounded-full opacity-30 animate-ping -left-2 -top-2 ${
                    activeHub.id === hub.id ? "bg-amber" : "bg-crimson/50"
                  }`} />
                  
                  {/* Hub Dot */}
                  <span className={`relative flex h-4 w-4 items-center justify-center rounded-full border border-white shadow ${
                    activeHub.id === hub.id ? "bg-amber" : "bg-crimson"
                  } group-hover:scale-125 transition-transform`} />
                  
                  {/* Hub tooltip */}
                  <span className="absolute left-6 -top-1 font-display text-xs font-bold text-white whitespace-nowrap bg-obsidian px-2 py-0.5 rounded border border-border-glass shadow opacity-80 group-hover:opacity-100 transition-opacity">
                    {hub.name.split(" ")[0]}
                  </span>
                </button>
              ))}

              <div className="absolute bottom-4 left-4 font-sans text-[10px] text-silver/60 uppercase">
                Oman Grid Overlay v4.1
              </div>
            </div>
          </div>

          {/* Telemetry metadata panel */}
          <div className="lg:col-span-5 flex flex-col gap-6 justify-between">
            {/* Hub stats card */}
            <div className="glass-panel rounded-lg p-8 flex-1 flex flex-col justify-between border-l-2 border-l-amber">
              <div>
                <span className="font-sans text-xs font-bold text-amber uppercase tracking-wider">
                  Terminal Analytics
                </span>
                <h3 className="mt-2 font-display text-2xl font-bold text-white">
                  {activeHub.name}
                </h3>
                <p className="mt-4 font-sans text-sm text-silver leading-relaxed">
                  {activeHub.desc}
                </p>
              </div>

              {/* Grid details */}
              <div className="grid grid-cols-2 gap-6 mt-8 pt-6 border-t border-border-glass/60">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded bg-obsidian border border-border-glass text-amber">
                    <Truck className="h-4 w-4" />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-sans text-[10px] text-silver uppercase">Active Fleet</span>
                    <span className="font-display text-base font-bold text-white">{activeHub.vehicles} Vehicles</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded bg-obsidian border border-border-glass text-crimson">
                    <Radio className="h-4 w-4" />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-sans text-[10px] text-silver uppercase">Storage Temp</span>
                    <span className="font-display text-base font-bold text-white">{activeHub.temp}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded bg-obsidian border border-border-glass text-white">
                    <ShieldCheck className="h-4 w-4" />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-sans text-[10px] text-silver uppercase">WMS Link</span>
                    <span className="font-display text-base font-bold text-white">{activeHub.status}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded bg-obsidian border border-border-glass text-amber">
                    <Clock className="h-4 w-4" />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-sans text-[10px] text-silver uppercase">Downtime</span>
                    <span className="font-display text-base font-bold text-white">0.00%</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick dashboard help banner */}
            <div className="glass-panel rounded-lg p-6 border-l-2 border-l-crimson bg-crimson/5">
              <h4 className="font-display text-sm font-bold text-white">
                Transit Alert: Muscat - Salalah Link
              </h4>
              <p className="font-sans text-xs text-silver mt-1.5 leading-relaxed">
                Coastal highway transit operating normally. Dynamic cold storage cooling active. Mean ambient outside air temperature logged at 44°C; interior cargo temperature maintained at stable 3.2°C.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
