"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { ArrowRight, Thermometer, Warehouse, Truck, RefreshCw, BarChart2, CheckSquare } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function ServicesPanel() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const services = [
    {
      title: "Multi-Temperature Cold Chain",
      icon: Thermometer,
      desc: "Comprehensive climate-controlled transit for temperature-sensitive beverages, ensuring brand freshness across extreme summer climates.",
      features: ["Refrigerated (-18°C to +4°C)", "Ambient & Chilled capacity", "Real-time temperature loggers"],
      accentColor: "border-l-crimson",
    },
    {
      title: "Automated Warehousing",
      icon: Warehouse,
      desc: "Massive storage facilities optimized for fast sorting, pallet systems, inventory technology, and cross-docking operations.",
      features: ["WMS tracking systems", "10,000+ pallet slots in Muscat", "24/7 automated security security"],
      accentColor: "border-l-amber",
    },
    {
      title: "Route-to-Market Distribution",
      icon: Truck,
      desc: "Direct deliveries to retail chains, wholesalers, and hypermarkets across every district in Oman, backed by scale-assured timetables.",
      features: ["Daily governorate routes", "Coca-Cola level compliance", "Dedicated delivery schedules"],
      accentColor: "border-l-white",
    },
  ];

  return (
    <section ref={ref} className="py-20 bg-obsidian relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
          <div className="lg:col-span-6">
            <span className="font-sans text-xs font-semibold tracking-widest text-crimson uppercase">
              Operations Ecosystem
            </span>
            <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
              End-to-End Beverage Supply Integration
            </h2>
            <p className="mt-4 font-sans text-base text-silver">
              We manage the entire logistics lifecycle. From state-of-the-art production facility intakes to automated warehousing, and refrigerated nationwide distribution.
            </p>
          </div>
          <div className="lg:col-span-6 flex flex-col sm:flex-row gap-4 sm:justify-end">
            <Link
              href="/services"
              className="inline-flex items-center justify-center gap-2 rounded bg-chamber border border-border-glass px-6 py-3 font-sans text-sm font-semibold text-white hover:border-amber transition-colors"
            >
              Explore Services
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 rounded bg-crimson px-6 py-3 font-sans text-sm font-semibold text-white hover:bg-amber hover:text-obsidian transition-colors"
            >
              Request Custom SLA
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((svc, idx) => {
            const Icon = svc.icon;
            return (
              <motion.div
                key={svc.title}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className={`glass-panel p-8 rounded-lg flex flex-col justify-between border-l-4 ${svc.accentColor} hover:scale-[1.02] transition-transform duration-300`}
              >
                <div>
                  <div className="flex h-12 w-12 items-center justify-center rounded bg-obsidian border border-border-glass text-amber mb-6">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="font-display text-xl font-bold text-white mb-4">
                    {svc.title}
                  </h3>
                  <p className="font-sans text-sm text-silver/90 leading-relaxed mb-6">
                    {svc.desc}
                  </p>
                  <ul className="space-y-3 mb-8">
                    {svc.features.map((feat) => (
                      <li key={feat} className="flex items-center gap-2 text-xs text-silver">
                        <CheckSquare className="h-4 w-4 text-crimson shrink-0" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <Link
                  href="/services"
                  className="inline-flex items-center gap-1 text-xs font-semibold text-amber hover:text-white transition-colors group mt-auto"
                >
                  Technical Specifications
                  <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>
            );
          })}
        </div>

        {/* Mid-section Highlight Panel */}
        <div className="mt-16 rounded-lg overflow-hidden border border-border-glass bg-chamber relative min-h-[300px] flex flex-col lg:flex-row items-center">
          <div className="p-8 lg:p-12 lg:w-1/2 z-10">
            <span className="font-sans text-xs font-bold text-amber uppercase tracking-wider">
              Safety & Standards
            </span>
            <h3 className="mt-2 font-display text-2xl font-bold text-white">
              Coca-Cola Gold Standard Compliance
            </h3>
            <p className="mt-4 font-sans text-sm text-silver leading-relaxed">
              We operate under global brand mandates. Every delivery vehicle undergoes daily sanitization audits, temperature logs are archived for 12 months, and backup refrigerated trailers are stationed at every major terminal.
            </p>
            <div className="mt-6">
              <Link
                href="/about"
                className="inline-flex items-center gap-2 text-sm font-semibold text-crimson hover:text-amber transition-colors"
              >
                Review Our Safety Audits
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
          
          <div className="w-full lg:w-1/2 h-64 lg:h-full min-h-[300px] relative">
            <Image
              src="/images/warehouse_automated.png"
              alt="Beverage Logistics Warehouse"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-chamber via-transparent to-transparent" />
          </div>
        </div>
      </div>
    </section>
  );
}
