"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { ShieldCheck, Truck, CheckCircle2, Award, MapPin } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const PANELS = [
  {
    title: "National Logistics Grid Online",
    subtitle: "Visibility & Control",
    desc: "Every delivery begins with visibility. The nationwide distribution network lights up, establishing secure routing pathways across Oman's primary transit corridors.",
    stat: "National Grid Active",
    icon: Award,
    bg: "/images/hero_oman_transit.png",
  },
  {
    title: "Cold Chain Intelligence",
    subtitle: "Continuous Thermal Monitoring",
    desc: "Temperature integrity is continuously monitored. High-precision IoT sensors stream thermal, humidity, and location logs from our insulated trailer modules.",
    stat: "±0.2°C Temperature Precision",
    icon: ShieldCheck,
    bg: "/images/cold-chain-trailer-interrior-1920w.webp",
  },
  {
    title: "Real-Time Fleet Telemetry",
    subtitle: "Pre-Flight Verification",
    desc: "Every shipment is cryptographically verified before deployment. Route parameters, driver credentials, cargo security, and cooling stability are fully audited.",
    stat: "Secure Gate Locked",
    icon: CheckCircle2,
    bg: "/images/control_center_tech.png",
  },
  {
    title: "Nationwide Distribution Network",
    subtitle: "Transit Corridors",
    desc: "One truck. One network. Nationwide reach. Connecting Muscat, Sohar, Nizwa, Duqm, and Salalah through a unified digital routing and scheduling platform.",
    stat: "1,100 km Seamless Link",
    icon: MapPin,
    bg: "/images/oman-network-map-1920w.webp",
    is3D: false,
  },
  {
    title: "Verified Cold-Chain Delivery",
    subtitle: "SLA Integrity Met",
    desc: "Deliveries arrive at hypermarkets and wholesale chains with verified cold-chain integrity. Cargo doors slide open to release chilled stock under full compliance.",
    stat: "100% SLA Maintained",
    icon: Truck,
    bg: "/images/cargo-door-opening-1920w.webp",
    is3D: false,
  },
  {
    title: "Operational Excellence Ledger",
    subtitle: "Measurable Intelligence",
    desc: "Every movement becomes measurable intelligence. Historical temperature logs and transit statistics are committed directly to our enterprise customer dashboard.",
    stat: "99.8% Success Rate",
    icon: Award,
    bg: "",
    is3D: false,
  },
];

const STAGE_LOGS = [
  [
    { time: "12:04:11", tag: "GRID", type: "info", text: "SULTANATE LOGISTICS GRID OVERVIEW ACTIVE" },
    { time: "12:04:15", tag: "NODE", type: "success", text: "MUSCAT OPERATIONS HUB SYNCED" },
    { time: "12:04:18", tag: "GPS", type: "info", text: "GPS CONSTELLATION SECURE CONNECTION ESTABLISHED" },
  ],
  [
    { time: "12:09:22", tag: "THERM", type: "success", text: "INSULATED TRAILER SENSOR COMMS: NOMINAL" },
    { time: "12:09:25", tag: "TEMP", type: "success", text: "INTERNAL CHILL LOCKED: +2.0C" },
    { time: "12:09:28", tag: "HUMID", type: "success", text: "HUMIDITY INDEX STABILIZED AT 48%" },
  ],
  [
    { time: "12:14:02", tag: "GATE", type: "info", text: "DISPATCH SEQUENCE INITIATED" },
    { time: "12:14:05", tag: "RFID", type: "success", text: "PALLET LEDGER SIGNED & LOCKED" },
    { time: "12:14:08", tag: "AUTH", type: "success", text: "OPERATOR VERIFIED BY WMS" },
  ],
  [
    { time: "12:21:40", tag: "ROUTE", type: "info", text: "SAMAIL HIGHWAY TRANSIT CORRIDOR ACTIVE" },
    { time: "12:21:44", tag: "TELE", type: "warning", text: "DESERT AMBIENT: +44.5C" },
    { time: "12:21:47", tag: "SLA", type: "success", text: "THERMAL ENVELOPE STABLE" },
  ],
  [
    { time: "12:28:15", tag: "NODE", type: "info", text: "SOLEDAD REGIONAL DEPOT INTAKE" },
    { time: "12:28:18", tag: "LOCK", type: "success", text: "GEOFENCE DE-SEALING APPROVED" },
    { time: "12:28:20", tag: "DELV", type: "success", text: "CARGO UNLOAD - SLA MET: 100%" },
  ],
  [
    { time: "12:35:01", tag: "LEDG", type: "success", text: "DELIVERY COMMITTED TO PLATFORM" },
    { time: "12:35:04", tag: "KPI", type: "success", text: "99.8% COMPLIANCE REGISTERED" },
    { time: "12:35:08", tag: "SYS", type: "success", text: "NATIONAL DASHBOARD COMPILED" },
  ],
];

const KPI_DATA = [
  { label: "Delivery Success", value: "99.8%", color: "text-emerald" },
  { label: "Cases Delivered", value: "24M+", color: "text-white" },
  { label: "Smart Fleet", value: "500+ Vehicles", color: "text-amber" },
  { label: "Monitoring Status", value: "24/7 Active", color: "text-sky-400" },
];

function PanelContent({ panel, logs, isDashboard }: { panel: typeof PANELS[0]; logs: typeof STAGE_LOGS[0]; isDashboard: boolean }) {
  const IconComponent = panel.icon;

  if (isDashboard) {
    return (
      <div className="max-w-2xl w-full space-y-8 mx-auto px-4">
        <div className="text-center">
          <span className="font-sans text-xs font-semibold tracking-widest text-crimson uppercase">Operational Ledger Summary</span>
          <h3 className="mt-2 font-display text-3xl md:text-4xl font-bold text-white">{panel.title}</h3>
          <p className="mt-3 font-sans text-xs text-silver leading-relaxed max-w-lg mx-auto">{panel.desc}</p>
        </div>
        <div className="grid grid-cols-2 gap-4 max-w-xl mx-auto">
          {KPI_DATA.map((kpi) => (
            <div key={kpi.label} className="bg-chamber p-5 rounded border border-border-glass/40 shadow-md">
              <span className="font-sans text-[9px] text-silver uppercase block mb-1">{kpi.label}</span>
              <span className={`font-display text-xl font-bold ${kpi.color}`}>{kpi.value}</span>
            </div>
          ))}
        </div>
        <p className="text-center font-sans text-[10px] text-silver/50 italic">
          ✓ Network verified and compliant with FDA and local cold-chain standard procedures.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-md">
      <span className="font-sans text-xs font-semibold tracking-widest text-crimson uppercase">{panel.subtitle}</span>
      <h3 className="mt-2 font-display text-2xl md:text-3xl font-bold text-white leading-snug">{panel.title}</h3>
      <p className="mt-4 font-sans text-xs md:text-sm text-silver leading-relaxed">{panel.desc}</p>
      <div className="mt-6 flex items-center gap-3 bg-chamber/90 backdrop-blur-sm p-4 rounded border border-border-glass">
        <div className="flex h-10 w-10 items-center justify-center rounded bg-obsidian text-amber shrink-0">
          <IconComponent className="h-5 w-5" />
        </div>
        <div className="flex flex-col">
          <span className="font-sans text-[10px] text-silver uppercase">SLA METRIC</span>
          <span className="font-display text-xs md:text-sm font-bold text-white">{panel.stat}</span>
        </div>
      </div>
      <div className="mt-8 font-mono text-[9px] text-silver/70 space-y-1 bg-obsidian/80 backdrop-blur-md p-3 rounded border border-border-glass/40">
        {logs.map((log, i) => (
          <div key={i} className="flex items-center gap-2">
            <span className="text-silver/40">[{log.time}]</span>
            <span className={log.type === "success" ? "text-emerald" : log.type === "warning" ? "text-amber" : "text-sky-400"}>{log.tag}</span>
            <span className="text-white/80 truncate">{log.text}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function StorytellingTimeline() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // Mobile fallback
  if (isMobile) {
    return (
      <section className="py-20 bg-obsidian border-y border-border-glass relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff03_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none" />
        <div className="relative z-10 px-4 max-w-lg mx-auto">
          <div className="mb-12 text-center">
            <span className="font-sans text-xs font-semibold tracking-widest text-crimson uppercase">Oman Cold Chain Intelligence</span>
            <h2 className="mt-2 font-display text-2xl font-bold text-white">National Logistics Ledger</h2>
            <p className="mt-2 font-sans text-xs text-silver">Browse the technology powering Coca-Cola and FMCG distribution en-route across Oman.</p>
          </div>
          <div className="space-y-6">
            {PANELS.map((p, idx) => {
              const I = p.icon;
              return (
                <div key={p.title} className="glass-panel rounded-lg p-5 bg-chamber/90 border border-border-glass/40 shadow-xl">
                  <div className="flex justify-between items-start mb-3">
                    <span className="font-sans text-xs text-amber font-semibold uppercase tracking-wider">{p.subtitle}</span>
                    <span className="font-mono text-xs text-silver/40">0{idx + 1} / 06</span>
                  </div>
                  <h3 className="font-display text-base font-bold text-white mb-2">{p.title}</h3>
                  <p className="font-sans text-sm text-silver leading-relaxed mb-4">{p.desc}</p>
                  <div className="pt-3 border-t border-border-glass/30 flex items-center gap-2">
                    <div className="flex h-7 w-7 items-center justify-center rounded bg-obsidian border border-border-glass/40 text-amber">
                      <I className="h-3.5 w-3.5" />
                    </div>
                    <span className="font-mono text-xs font-bold text-white">{p.stat}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    );
  }

  return <DesktopTimeline />;
}

function DesktopTimeline() {
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);
  const setRef = useCallback((i: number) => (el: HTMLDivElement | null) => { sectionRefs.current[i] = el; }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      sectionRefs.current.forEach((section, i) => {
        if (!section) return;

        const bgParallax = section.querySelector("[data-parallax]") as HTMLElement;
        const content = section.querySelector("[data-content]") as HTMLElement;
        const panelInner = section.querySelector("[data-panel]") as HTMLElement;

        // Pin the section
        ScrollTrigger.create({
          trigger: section,
          start: "top top",
          end: "bottom bottom",
          pin: true,
          pinSpacing: false,
          invalidateOnRefresh: true,
        });

        // Parallax background (scrubs as you scroll through this section)
        if (bgParallax) {
          gsap.fromTo(bgParallax,
            { y: "15%", scale: 1.1 },
            {
              y: "-15%", scale: 1,
              ease: "none",
              scrollTrigger: {
                trigger: section,
                start: "top bottom",
                end: "bottom top",
                scrub: 1.5,
              },
            }
          );
        }

        // Content fade-in
        if (content) {
          gsap.fromTo(content,
            { y: 40, opacity: 0 },
            {
              y: 0, opacity: 1,
              ease: "power2.out",
              scrollTrigger: {
                trigger: section,
                start: "top 80%",
                end: "top 30%",
                scrub: 1,
              },
            }
          );
        }

        // 3D panel fade (for the 3D sections)
        if (panelInner) {
          gsap.fromTo(panelInner,
            { opacity: 0.6, scale: 0.92 },
            {
              opacity: 1, scale: 1,
              ease: "power1.out",
              scrollTrigger: {
                trigger: section,
                start: "top 85%",
                end: "top 35%",
                scrub: 1,
              },
            }
          );
        }

        // Section label / index indicator
        const indexEl = section.querySelector("[data-index]") as HTMLElement;
        if (indexEl) {
          gsap.fromTo(indexEl,
            { opacity: 0, x: -20 },
            {
              opacity: 0.15, x: 0,
              ease: "power2.out",
              scrollTrigger: {
                trigger: section,
                start: "top 80%",
                end: "top 40%",
                scrub: 1,
              },
            }
          );
        }
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div>
      {/* Fixed progress bar */}
      <div className="fixed top-0 left-0 w-full h-[3px] z-[100] bg-obsidian/80 backdrop-blur-sm">
        <div className="h-full bg-gradient-to-r from-crimson to-amber origin-left scale-x-0" id="timeline-progress" />
      </div>

      {PANELS.map((panel, i) => {
        const isDashboard = i === PANELS.length - 1;
        const panelNum = `0${i + 1}`.slice(-2);

        return (
          <section
            key={panel.title}
            ref={setRef(i)}
            className="relative h-screen w-full bg-obsidian overflow-hidden"
          >
            {/* Section index label */}
            <div
              data-index
              className="absolute top-8 left-8 z-30 font-mono text-6xl md:text-8xl font-bold text-white"
              style={{ opacity: 0 }}
            >
              {panelNum}
            </div>

            {/* Background layer */}
            {!isDashboard && panel.bg && (
              <div className="absolute inset-0 z-0 overflow-hidden">
                <div data-parallax className="absolute inset-0 w-full h-[130%] top-0">
                  <Image src={panel.bg} alt="" fill className="object-cover" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-obsidian/90 via-obsidian/50 to-obsidian/80" />
                <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-transparent to-obsidian/30" />
              </div>
            )}

            {/* Light grid overlay */}
            <div className="absolute inset-0 z-2 bg-[radial-gradient(#ffffff03_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none" />

            {/* Content */}
            <div
              className={`relative z-10 h-full flex items-center ${isDashboard ? "justify-center" : "justify-start"} p-8 md:p-16 lg:p-24`}
            >
              <div data-content className="w-full" style={{ opacity: 0 }}>
                <PanelContent panel={panel} logs={STAGE_LOGS[i]} isDashboard={isDashboard} />
              </div>
            </div>
          </section>
        );
      })}

      {/* Progress bar animation */}
      <ProgressBarInit />
    </div>
  );
}

function ProgressBarInit() {
  useEffect(() => {
    const progressEl = document.getElementById("timeline-progress");
    if (!progressEl) return;

    gsap.to(progressEl, {
      scaleX: 1,
      ease: "none",
      scrollTrigger: {
        trigger: document.body,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.5,
      },
    });
  }, []);

  return null;
}
