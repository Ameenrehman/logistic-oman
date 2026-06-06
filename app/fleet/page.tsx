"use client";

import Image from "next/image";
import { Truck, ShieldCheck, Cpu, Anchor, FileDown } from "lucide-react";

export default function FleetPage() {
  const vehicleCategories = [
    {
      name: "Refrigerated Heavy Haulers",
      type: "Actros Multi-Temp Semi-Trailer",
      image: "/images/fleet_truck_close.png",
      specs: [
        { label: "Payload Capacity", value: "24,000 kg" },
        { label: "Pallet Capacity", value: "22 Industrial Pallets" },
        { label: "Temp Zones", value: "Dual (Frozen & Chilled)" },
        { label: "Telemetry Tracking", value: "Installed (Live)" },
      ],
      description: "Dedicated long-haul logistics. Connects Al Rusayl production plants with regional hubs in Salalah, Sohar, and GCC borders.",
    },
    {
      name: "Rigid Multi-Temp Box Trucks",
      type: "Mercedes-Benz Atego 1222",
      image: "/images/fleet_truck_close.png",
      specs: [
        { label: "Payload Capacity", value: "7,500 kg" },
        { label: "Pallet Capacity", value: "12 Standard Pallets" },
        { label: "Temp Range", value: "+2°C to +18°C" },
        { label: "Air Suspension", value: "Installed (Product Safety)" },
      ],
      description: "Inter-district regional deliveries. Optimized for transport between main depots and regional wholesalers and distribution hubs.",
    },
    {
      name: "Urban Cold Chain Vans",
      type: "Sprinter Refrigerated Van",
      image: "/images/fleet_truck_close.png",
      specs: [
        { label: "Payload Capacity", value: "2,200 kg" },
        { label: "Pallet Capacity", value: "4 Standard Pallets" },
        { label: "Urban Access", value: "Muscat Central Approved" },
        { label: "Quick-cool door curtains", value: "Installed (Product Freshness)" },
      ],
      description: "Last-mile retail distribution. Serves urban supermarket complexes, hypermarkets, and regional corner-shops daily.",
    },
  ];

  return (
    <div className="bg-obsidian text-white min-h-screen">
      {/* 1. Fleet Header */}
      <section className="py-24 border-b border-border-glass bg-radial-at-t from-crimson/5 via-transparent to-transparent">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <span className="font-sans text-xs font-semibold tracking-widest text-crimson uppercase">
            Transport Capabilities
          </span>
          <h1 className="mt-2 font-display text-4xl sm:text-5xl font-bold tracking-tight text-white">
            Nationwide Multi-Temperature Fleet
          </h1>
          <p className="mt-6 font-sans text-lg text-silver max-w-2xl mx-auto leading-relaxed">
            Our fleet consists of 500+ active refrigerated transport vehicles engineered specifically to manage beverage cargo integrity under severe outdoor temperatures.
          </p>
        </div>
      </section>

      {/* 2. Technical Fleet Showcase */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-16">
          {vehicleCategories.map((vehicle) => (
            <div
              key={vehicle.name}
              className="glass-panel rounded-lg overflow-hidden border border-border-glass bg-chamber/30 flex flex-col lg:flex-row items-stretch hover:border-amber/30 transition-colors"
            >
              {/* Image side */}
              <div className="w-full lg:w-2/5 min-h-[300px] relative">
                <Image
                  src={vehicle.image}
                  alt={vehicle.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-chamber via-transparent to-transparent" />
              </div>

              {/* Specs side */}
              <div className="p-8 lg:p-12 lg:w-3/5 flex flex-col justify-between">
                <div>
                  <span className="font-sans text-xs font-bold text-amber uppercase tracking-wider">
                    {vehicle.type}
                  </span>
                  <h3 className="mt-2 font-display text-2xl font-bold text-white">
                    {vehicle.name}
                  </h3>
                  <p className="mt-4 font-sans text-sm text-silver/90 leading-relaxed">
                    {vehicle.description}
                  </p>

                  {/* Specs Grid */}
                  <div className="grid grid-cols-2 gap-6 mt-8">
                    {vehicle.specs.map((spec) => (
                      <div key={spec.label} className="border-b border-border-glass/60 pb-3">
                        <span className="font-sans text-[10px] text-silver uppercase block">{spec.label}</span>
                        <span className="font-display text-sm font-bold text-white mt-1 block">{spec.value}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* SLA assurance */}
                <div className="mt-8 pt-6 border-t border-border-glass/60 flex items-center justify-between gap-4 flex-wrap">
                  <div className="flex items-center gap-2 text-xs font-sans text-silver">
                    <ShieldCheck className="h-4.5 w-4.5 text-crimson shrink-0" />
                    Strict Daily Technical & Sanitization Audit Complete
                  </div>
                  <button className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber hover:text-white transition-colors">
                    <FileDown className="h-4 w-4" /> Download SLA Sheet
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Safety & Telematics Banner */}
      <section className="py-20 bg-chamber border-t border-border-glass">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="font-sans text-xs font-bold text-crimson uppercase tracking-wider">
                Fleet Intelligence
              </span>
              <h2 className="mt-2 font-display text-3xl font-bold text-white">
                Telematics & GPS Safety Mandates
              </h2>
              <p className="mt-4 font-sans text-sm text-silver leading-relaxed">
                Every vehicle in the OBL fleet runs dynamic GPS trackers, route optimization navigation systems, and automated temperature alarm feeds. Dispatch coordinators monitor route deviations and safety triggers in real-time, ensuring shipments arrive on schedule.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="glass-panel p-6 rounded-lg">
                <Cpu className="h-6 w-6 text-amber mb-3" />
                <h4 className="font-display text-sm font-bold text-white">Smart Sensors</h4>
                <p className="font-sans text-xs text-silver mt-1.5 leading-relaxed">Real-time interior cargo diagnostics transmit coordinates and temperature metrics every 30 seconds.</p>
              </div>
              <div className="glass-panel p-6 rounded-lg">
                <Anchor className="h-6 w-6 text-amber mb-3" />
                <h4 className="font-display text-sm font-bold text-white">Compliance Locks</h4>
                <p className="font-sans text-xs text-silver mt-1.5 leading-relaxed">Automatic electronic door-locks operate under geofence rules, blocking loading bay doors until coordinates match delivery spots.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
