"use client";

import { MapPin, Truck, ShieldCheck, Route, Clock } from "lucide-react";

export default function CoveragePage() {
  const hubs = [
    {
      name: "Muscat Central HQ",
      role: "Primary Bottling & Packing Command",
      location: "Al Rusayl Industrial Area",
      transitTimes: [
        { dest: "Sohar Hub", time: "2.5 Hours", type: "Express Corridor" },
        { dest: "Salalah Terminal", time: "10 Hours", type: "Coastal Transit" },
        { dest: "Nizwa Depot", time: "1.5 Hours", type: "Interior Route" },
      ],
    },
    {
      name: "Sohar Gateway Hub",
      role: "North Batinah Hub & UAE Border Link",
      location: "Sohar Industrial City",
      transitTimes: [
        { dest: "Muscat HQ", time: "2.5 Hours", type: "Express Corridor" },
        { dest: "Al Ain Border (UAE)", time: "1.5 Hours", type: "Cross-Border Transit" },
        { dest: "Buraimi Depot", time: "2 Hours", type: "Regional Route" },
      ],
    },
    {
      name: "Salalah Southern Terminal",
      role: "Dhofar Governorate Dispatch Hub",
      location: "Raysut Industrial Estate",
      transitTimes: [
        { dest: "Muscat HQ", time: "10 Hours", type: "Coastal Transit" },
        { dest: "Thumrait Depot", time: "1 Hour", type: "Local Corridor" },
        { dest: "Duqm Port Area", time: "6 Hours", type: "Coastal Link" },
      ],
    },
  ];

  return (
    <div className="bg-obsidian text-white min-h-screen">
      {/* 1. Header Hero */}
      <section className="py-24 border-b border-border-glass bg-radial-at-t from-crimson/5 via-transparent to-transparent">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <span className="font-sans text-xs font-semibold tracking-widest text-crimson uppercase">
            Distribution Network
          </span>
          <h1 className="mt-2 font-display text-4xl sm:text-5xl font-bold tracking-tight text-white animate-fade-in">
            Nationwide Logistics Coverage
          </h1>
          <p className="mt-6 font-sans text-lg text-silver max-w-2xl mx-auto leading-relaxed">
            Connecting Oman's primary commerce centers. Operating daily schedules across all 11 Governorates, from Musandam to Dhofar.
          </p>
        </div>
      </section>

      {/* 2. Hub Grid Details */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-white">
              Primary Dispatch Terminals & Transit Times
            </h2>
            <p className="font-sans text-sm text-silver mt-2 max-w-xl">
              We operate three major central terminals to minimize shipping intervals. Review standard transit times below:
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {hubs.map((hub) => (
              <div
                key={hub.name}
                className="glass-panel p-8 rounded-lg flex flex-col justify-between border-l-2 border-l-amber hover:border-l-crimson transition-all"
              >
                <div>
                  <span className="font-sans text-[10px] text-amber uppercase tracking-wider block font-bold">
                    {hub.role}
                  </span>
                  <h3 className="mt-2 font-display text-xl font-bold text-white flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-crimson" />
                    {hub.name}
                  </h3>
                  <span className="font-sans text-xs text-silver mt-1 block">
                    {hub.location}
                  </span>

                  {/* Transit times list */}
                  <div className="mt-8 space-y-4">
                    <h4 className="font-display text-xs font-bold text-white uppercase tracking-wider">
                      Standard Transit Times
                    </h4>
                    {hub.transitTimes.map((t) => (
                      <div key={t.dest} className="flex justify-between items-center border-b border-border-glass/40 pb-2 last:border-0 last:pb-0">
                        <div>
                          <span className="font-sans text-xs text-silver">{t.dest}</span>
                          <span className="font-sans text-[9px] text-silver/60 block mt-0.5">{t.type}</span>
                        </div>
                        <span className="font-display text-xs font-bold text-white flex items-center gap-1.5 shrink-0 text-right">
                          <Clock className="h-3.5 w-3.5 text-crimson" />
                          {t.time}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-8 pt-4 border-t border-border-glass/40 flex items-center gap-2 text-[10px] font-sans text-silver">
                  <ShieldCheck className="h-4 w-4 text-crimson shrink-0" />
                  SLA tracking enabled for this terminal
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Cross-Border GCC Transit */}
      <section className="py-20 bg-chamber border-t border-border-glass">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="font-sans text-xs font-bold text-crimson uppercase tracking-wider">
                Cross-Border Scope
              </span>
              <h2 className="mt-2 font-display text-3xl font-bold text-white">
                GCC Cross-Border Integration
              </h2>
              <p className="mt-4 font-sans text-sm text-silver leading-relaxed">
                We extend our logistics services beyond Oman. Operating scheduled line-haul corridors to the United Arab Emirates and Saudi Arabia via approved border clearing crossings, ensuring seamless transit for regional beverage distributors.
              </p>
            </div>
            <div className="glass-panel p-8 rounded-lg flex flex-col justify-between border-l-2 border-l-amber">
              <h3 className="font-display text-lg font-bold text-white mb-4 flex items-center gap-2">
                <Route className="h-5 w-5 text-amber" />
                Regional Border Clearance
              </h3>
              <p className="font-sans text-xs text-silver leading-relaxed">
                Our custom border clearing agents handle health certificates, food safety documentation, and customs clearance procedures at GCC border posts, preventing delay penalties.
              </p>
              <div className="mt-6 flex items-center gap-4 text-xs font-sans text-white font-bold">
                <div className="flex items-center gap-1.5">
                  <Truck className="h-4 w-4 text-crimson" /> UAE: 1-2 Days
                </div>
                <div className="flex items-center gap-1.5">
                  <Truck className="h-4 w-4 text-crimson" /> Saudi Arabia: 3-4 Days
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
