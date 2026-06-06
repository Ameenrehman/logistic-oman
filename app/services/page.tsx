"use client";

import { motion } from "framer-motion";
import { Thermometer, Warehouse, Truck, ShieldCheck, CheckCircle2, Award, Clock } from "lucide-react";
import Image from "next/image";

export default function ServicesPage() {
  const categories = [
    {
      title: "Multi-Temperature Cold Chain",
      icon: Thermometer,
      desc: "Critical transit solutions for high-value refreshments, dairy, and food goods. We strictly adhere to WHO and brand cold-storage rules.",
      specs: [
        { label: "Deep Freeze", value: "Below -18°C", desc: "Ice creams and frozen beverage concentrates." },
        { label: "Chilled Operations", value: "+2°C to +8°C", desc: "Premium dairy products, juices, and raw syrups." },
        { label: "Ambient Controlled", value: "+15°C to +25°C", desc: "Carbonated soft drinks, mineral water, and canned goods." },
      ],
      details: "Our entire vehicle fleet is fitted with dynamic compressor systems and telemetry loggers, generating live alerts if thermal levels drift by more than 0.5°C.",
    },
    {
      title: "Automated Warehousing",
      icon: Warehouse,
      desc: "Massive scale hubs in Muscat and Sohar designed for rapid stock rotation, inventory control, and cross-docking operations.",
      specs: [
        { label: "Storage Capacity", value: "15,000+ Pallets", desc: "Dedicated spaces with high-rise racking configurations." },
        { label: "Integration", value: "API-driven WMS", desc: "Direct stock updates to client ERP platforms." },
        { label: "Cross-Docking", value: "Under 4 Hours", desc: "Rapid intake, sorting, and dispatch schedules." },
      ],
      details: "Equipped with dock levelers, automated inventory scanners, and back-up power generators, guaranteeing 100% operational uptime.",
    },
    {
      title: "FMCG Route-to-Market",
      icon: Truck,
      desc: "Comprehensive last-mile distribution connecting global brands to hypermarkets, local co-ops, and retail networks across Oman.",
      specs: [
        { label: "Governorates", value: "11 Out of 11", desc: "Complete national geographic coverage." },
        { label: "Daily Deliveries", value: "350+ Routes", desc: "Consistent route operations to primary commerce corridors." },
        { label: "Compliance Audits", value: "Daily Checklist", desc: "Cleanliness, driver safety, and document verification." },
      ],
      details: "Operating scheduled daily supply corridors between Muscat HQ, Al Batinah hubs, and Salalah distribution centers.",
    },
  ];

  return (
    <div className="bg-obsidian text-white min-h-screen">
      {/* 1. Services Header */}
      <section className="py-24 border-b border-border-glass bg-radial-at-t from-crimson/5 via-transparent to-transparent">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <span className="font-sans text-xs font-semibold tracking-widest text-crimson uppercase">
            Core Competencies
          </span>
          <h1 className="mt-2 font-display text-4xl sm:text-5xl font-bold tracking-tight text-white animate-fade-in">
            Enterprise Logistics Services
          </h1>
          <p className="mt-6 font-sans text-lg text-silver max-w-2xl mx-auto leading-relaxed">
            We provide specialized, high-volume supply chain solutions tailored specifically for global beverage conglomerates and fast-moving consumer goods.
          </p>
        </div>
      </section>

      {/* 2. Detailed Service Offerings */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-24">
          {categories.map((cat, idx) => {
            const Icon = cat.icon;
            return (
              <div
                key={cat.title}
                className={`flex flex-col lg:flex-row gap-12 items-stretch ${
                  idx % 2 === 1 ? "lg:flex-row-reverse" : ""
                }`}
              >
                {/* Text details */}
                <div className="lg:w-1/2 flex flex-col justify-between">
                  <div>
                    <div className="flex h-12 w-12 items-center justify-center rounded bg-chamber border border-border-glass text-amber mb-6">
                      <Icon className="h-6 w-6" />
                    </div>
                    <h2 className="font-display text-3xl font-bold text-white mb-4">
                      {cat.title}
                    </h2>
                    <p className="font-sans text-base text-silver leading-relaxed mb-6">
                      {cat.desc}
                    </p>
                    <p className="font-sans text-sm text-silver/80 leading-relaxed pl-4 border-l-2 border-l-crimson mb-8">
                      {cat.details}
                    </p>
                  </div>

                  {/* Trust indicator */}
                  <div className="flex items-center gap-2 text-xs font-sans text-amber font-semibold">
                    <ShieldCheck className="h-4 w-4 text-amber" />
                    Guaranteed SLA Level 99.8% Compliance
                  </div>
                </div>

                {/* Technical specifications grid */}
                <div className="lg:w-1/2 glass-panel p-8 rounded-lg flex flex-col justify-center bg-chamber/50">
                  <h3 className="font-display text-lg font-bold text-white mb-6 uppercase tracking-wider">
                    Technical Specifications
                  </h3>
                  <div className="space-y-6">
                    {cat.specs.map((spec) => (
                      <div
                        key={spec.label}
                        className="flex justify-between items-start border-b border-border-glass/60 pb-4 last:border-0 last:pb-0"
                      >
                        <div>
                          <span className="font-display text-sm font-bold text-white">{spec.label}</span>
                          <p className="font-sans text-xs text-silver mt-1">{spec.desc}</p>
                        </div>
                        <span className="font-display text-base font-bold text-amber text-right shrink-0">
                          {spec.value}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 3. SLA & Operational Assurance */}
      <section className="py-20 bg-chamber border-t border-border-glass">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-white mb-4">
            Custom Cold Storage & Logistics Agreements
          </h2>
          <p className="font-sans text-sm text-silver max-w-xl mx-auto mb-8">
            Need dedicated warehouse space, custom cross-dock routes, or co-branded refrigerated fleets? We draft tailored Service Level Agreements matching global standards.
          </p>
          <button className="inline-flex items-center gap-2 rounded bg-crimson px-6 py-3 font-sans text-sm font-semibold text-white hover:bg-amber hover:text-obsidian transition-colors">
            Initiate Service Assessment
          </button>
        </div>
      </section>
    </div>
  );
}
