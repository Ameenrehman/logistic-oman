"use client";

import Image from "next/image";
import { Cpu, Terminal, Radio, ShieldAlert, CheckSquare } from "lucide-react";

export default function TechnologyPage() {
  const techPillars = [
    {
      title: "Real-Time WMS (Warehouse Management)",
      icon: Cpu,
      desc: "Our API-driven WMS monitors stock intake and dispatch. Enterprise clients receive automated stock reports and low-inventory alerts directly to their ERP systems.",
      points: ["API integration (SAP, Oracle, Microsoft Dynamics)", "FIFO (First-In, First-Out) automated sorting", "Automated batch code logs for traceability"],
    },
    {
      title: "Active Cold Chain Telemetry",
      icon: Radio,
      desc: "We monitor temperatures using cellular IoT loggers placed inside trucks and cold rooms. Live data is streamed to our central dashboard 24/7.",
      points: ["Real-time alerts via SMS and Email for temperature drift", "Automatic backup cooling triggers", "Historical compliance reports saved for 12 months"],
    },
    {
      title: "Route Optimization Engine",
      icon: Terminal,
      desc: "Our custom navigation system processes local traffic patterns and weather metrics to plot the fastest transit times between Muscat bottling facilities and regional depots.",
      points: ["Dynamic route adjustment capabilities", "15% reduction in average transit times", "Automatic driver shift tracking"],
    },
  ];

  return (
    <div className="bg-obsidian text-white min-h-screen">
      {/* 1. Header Hero */}
      <section className="py-24 border-b border-border-glass bg-radial-at-t from-crimson/5 via-transparent to-transparent">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <span className="font-sans text-xs font-semibold tracking-widest text-crimson uppercase">
            Operations Telemetry
          </span>
          <h1 className="mt-2 font-display text-4xl sm:text-5xl font-bold tracking-tight text-white animate-fade-in">
            Enterprise Cold-Chain Technology
          </h1>
          <p className="mt-6 font-sans text-lg text-silver max-w-2xl mx-auto leading-relaxed">
            Eliminating traditional logistics black boxes. We provide transparent telemetry tracking across every node of your beverage supply chain.
          </p>
        </div>
      </section>

      {/* 2. Control Center Showcase (Image highlight) */}
      <section className="py-16 bg-chamber border-b border-border-glass">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-lg overflow-hidden border border-border-glass bg-obsidian flex flex-col lg:flex-row items-center relative min-h-[350px]">
            {/* Image section */}
            <div className="w-full lg:w-1/2 h-64 lg:h-full min-h-[350px] relative">
              <Image
                src="/images/control_center_tech.png"
                alt="Logistics Operations Control Room"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-obsidian via-transparent to-transparent" />
            </div>

            {/* Description side */}
            <div className="p-8 lg:p-12 lg:w-1/2 z-10 flex flex-col justify-center">
              <span className="font-sans text-xs font-bold text-amber uppercase tracking-wider">
                Muscat Central Command
              </span>
              <h3 className="mt-2 font-display text-2xl font-bold text-white">
                Live Operations Telemetry Room
              </h3>
              <p className="mt-4 font-sans text-sm text-silver leading-relaxed">
                Our central command monitors dispatch routes, cargo temperature levels, and vehicle diagnostics in real-time. This active tracking ensures high SLA safety standard checks across all national cargo movements.
              </p>
              <div className="mt-6 flex items-center gap-2 text-xs font-sans text-silver">
                <ShieldAlert className="h-4 w-4 text-crimson shrink-0" />
                Automatic emergency dispatch team active 24/7/365
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Tech pillars details */}
      <section className="py-20 bg-obsidian">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-16">
          {techPillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div
                key={pillar.title}
                className={`flex flex-col lg:flex-row gap-12 items-center ${
                  idx % 2 === 1 ? "lg:flex-row-reverse" : ""
                }`}
              >
                <div className="lg:w-1/2">
                  <div className="flex h-12 w-12 items-center justify-center rounded bg-chamber border border-border-glass text-amber mb-6">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h2 className="font-display text-2xl sm:text-3xl font-bold text-white">
                    {pillar.title}
                  </h2>
                  <p className="mt-4 font-sans text-sm sm:text-base text-silver leading-relaxed">
                    {pillar.desc}
                  </p>
                </div>

                <div className="lg:w-1/2 glass-panel p-8 rounded-lg">
                  <h4 className="font-display text-sm font-bold text-white uppercase tracking-wider mb-6">
                    Feature Capabilities
                  </h4>
                  <ul className="space-y-4">
                    {pillar.points.map((point) => (
                      <li key={point} className="flex items-start gap-3 text-xs text-silver">
                        <CheckSquare className="h-4 w-4 text-crimson shrink-0 mt-0.5" />
                        <span className="leading-relaxed">{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
