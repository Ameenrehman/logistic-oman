"use client";

import { useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { CheckCircle2, Shield, Truck, Map, Database, Award } from "lucide-react";

import SpotlightCard from "./SpotlightCard";

// CountUp helper component
function CountUp({ value, suffix = "" }: { value: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  useEffect(() => {
    if (inView) {
      let start = 0;
      const duration = 2000; // 2 seconds
      const end = value;
      const stepTime = Math.max(Math.floor(duration / end), 15);
      
      const timer = setInterval(() => {
        start += Math.ceil(end / (duration / stepTime));
        if (start >= end) {
          setCount(end);
          clearInterval(timer);
        } else {
          setCount(start);
        }
      }, stepTime);
      
      return () => clearInterval(timer);
    }
  }, [inView, value]);

  return (
    <span ref={ref} className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-amber">
      {count}
      {suffix}
    </span>
  );
}

export default function TrustDashboard() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const kpis = [
    { label: "Oman Governorates Covered", value: 11, suffix: "", icon: Map, desc: "100% nationwide geographic distribution reach" },
    { label: "Certified Multi-Temp Vehicles", value: 500, suffix: "+", icon: Truck, desc: "Refrigerated and box fleets for cold-chain safety" },
    { label: "Cases Distributed Monthly", value: 10, suffix: "M+", icon: Database, desc: "Massive scale logistics and cross-dock throughput" },
  ];

  const clientLogos = [
    { name: "Coca-Cola Oman", role: "Official Distribution Partner" },
    { name: "Areej Vegetable Oils", role: "Logistics Vendor" },
    { name: "Oman Refreshment Co.", role: "Cold Chain Operator" },
    { name: "Al Maha Foods", role: "Primary Supply Partner" },
  ];

  return (
    <section ref={ref} className="py-20 bg-chamber border-y border-border-glass relative overflow-hidden">
      <div className="absolute inset-0 bg-radial-at-t from-crimson/5 via-transparent to-transparent pointer-events-none" />
      
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <span className="font-sans text-xs font-semibold tracking-widest text-crimson uppercase">
            Enterprise Scale
          </span>
          <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Oman's Verified Beverage Supply Network
          </h2>
          <p className="mt-4 font-sans text-base text-silver max-w-2xl mx-auto">
            Directly addressing global brand criteria with modern multi-temperature fleets, nationwide networks, and international food safety standards.
          </p>
        </div>

        {/* KPI Panel */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {kpis.map((kpi, idx) => {
            const Icon = kpi.icon;
            return (
              <motion.div
                key={kpi.label}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="h-full"
              >
                <SpotlightCard
                  glowColor="rgba(229, 169, 60, 0.15)"
                  borderColor="rgba(229, 169, 60, 0.4)"
                  className="p-8 rounded-lg flex flex-col items-center text-center border-l-2 border-l-amber/60 hover:border-l-crimson md:hover:scale-[1.02] transition-all duration-300 h-full"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded bg-obsidian border border-border-glass text-crimson mb-4">
                    <Icon className="h-6 w-6" />
                  </div>
                  <CountUp value={kpi.value} suffix={kpi.suffix} />
                  <h3 className="mt-3 font-display text-lg font-bold text-white">
                    {kpi.label}
                  </h3>
                  <p className="mt-2 font-sans text-sm text-silver/80">
                    {kpi.desc}
                  </p>
                </SpotlightCard>
              </motion.div>
            );
          })}
        </div>

        {/* Trust Badges & Partner Row */}
        <div className="border-t border-border-glass/50 pt-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Certifications Block */}
            <div className="lg:col-span-5 flex flex-col gap-4">
              <h4 className="font-display text-base font-bold text-white uppercase tracking-wider">
                Regulatory Compliance Certifications
              </h4>
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-3 text-sm text-silver">
                  <CheckCircle2 className="h-5 w-5 text-crimson shrink-0" />
                  <span><strong>HACCP Compliance</strong>: Approved for global beverage supply lines.</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-silver">
                  <CheckCircle2 className="h-5 w-5 text-crimson shrink-0" />
                  <span><strong>ISO 22000:2018</strong>: Certified Food Safety Management Systems.</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-silver">
                  <CheckCircle2 className="h-5 w-5 text-crimson shrink-0" />
                  <span><strong>ISO 9001:2015</strong>: Nationwide quality assurance standards.</span>
                </div>
              </div>
            </div>

            {/* Client Badges */}
            <div className="lg:col-span-7">
              <h4 className="font-display text-sm font-bold text-silver/60 uppercase tracking-widest mb-6 lg:text-right">
                Trusted by Industry Leaders
              </h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {clientLogos.map((client) => (
                  <div
                    key={client.name}
                    className="flex flex-col items-center justify-center p-4 rounded bg-obsidian border border-border-glass text-center hover:border-amber/40 transition-colors"
                  >
                    <span className="font-display text-sm font-bold text-white">{client.name}</span>
                    <span className="font-sans text-[10px] text-silver mt-1">{client.role}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
