import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ShieldCheck, CheckCircle2, ChevronDown } from "lucide-react";
import TrustDashboard from "@/components/TrustDashboard";
import ServicesPanel from "@/components/ServicesPanel";
import TelemetryMap from "@/components/TelemetryMap";
import RfqForm from "@/components/RfqForm";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-obsidian text-white">
      {/* 1. HERO SECTION */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden border-b border-border-glass">
        {/* Background Image with warm overlay */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/hero_oman_transit.png"
            alt="OBL fleet driving through Oman"
            fill
            className="object-cover object-right md:object-center"
            priority
            sizes="100vw"
          />
          {/* Vignette & Gradients to guarantee text readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-obsidian via-obsidian/70 to-transparent md:bg-gradient-to-r md:from-obsidian/95 md:via-obsidian/60 md:to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-transparent to-transparent" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24 flex flex-col items-start justify-center">
          <div className="max-w-2xl">
            {/* Tagline label */}
            <div className="inline-flex items-center gap-2 rounded bg-crimson/15 border border-crimson/30 px-3 py-1 text-xs font-semibold text-crimson uppercase tracking-widest mb-6 animate-pulse-slow">
              <ShieldCheck className="h-4 w-4" />
              Sultanate of Oman Nationwide Network
            </div>
            
            {/* Display Heading */}
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.1]">
              Oman's Beverage Backbone: <br />
              <span className="text-amber">Scale-Assured</span> Cold Chain
            </h1>
            
            {/* Subcopy */}
            <p className="mt-6 font-sans text-base sm:text-lg text-silver/90 leading-relaxed max-w-xl">
              Powering Coca-Cola and global FMCG distribution with strict temperature compliance, 500+ refrigerated vehicles, and real-time operations tracking.
            </p>

            {/* CTAs */}
            <div className="mt-10 flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 rounded bg-crimson px-6 py-3.5 font-sans text-sm font-semibold text-white hover:bg-amber hover:text-obsidian transition-colors shadow-lg shadow-crimson/20"
              >
                Request Enterprise Quote
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/services"
                className="inline-flex items-center justify-center gap-2 rounded bg-chamber border border-border-glass px-6 py-3.5 font-sans text-sm font-semibold text-white hover:border-amber transition-colors"
              >
                Explore Logistics Grid
              </Link>
            </div>
          </div>
        </div>

        {/* Scroll down indicator */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1.5 opacity-60">
          <span className="font-sans text-[10px] uppercase tracking-widest text-silver">Scroll Down</span>
          <ChevronDown className="h-4 w-4 text-amber animate-bounce" />
        </div>
      </section>

      {/* 2. TRUST & METRICS DASHBOARD */}
      <TrustDashboard />

      {/* 3. THREE.JS storytelling island placeholder section */}
      <section className="py-24 bg-obsidian border-b border-border-glass relative overflow-hidden flex flex-col items-center justify-center min-h-[500px]">
        {/* Radial grid layout */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#30363d12_1px,transparent_1px),linear-gradient(to_bottom,#30363d12_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />
        <div className="absolute inset-0 bg-radial-at-c from-amber/5 via-transparent to-transparent pointer-events-none" />

        <div className="relative z-10 mx-auto max-w-4xl px-4 text-center">
          <span className="font-sans text-xs font-semibold tracking-widest text-amber uppercase">
            3D Storytelling Experience
          </span>
          <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
            The Journey of Refreshment Across Oman
          </h2>
          <p className="mt-4 font-sans text-base text-silver/80 max-w-xl mx-auto">
            Our upcoming interactive WebGL engine maps the exact timeline of a beverage bottle—from Rusayl production facilities, storage vaults, to consumer refreshment.
          </p>

          {/* Graphical placeholder representing a premium WebGL loader */}
          <div className="mt-12 glass-panel rounded-lg p-10 max-w-2xl mx-auto border border-dashed border-border-glass bg-chamber/50 relative overflow-hidden flex flex-col items-center gap-6">
            <div className="relative flex h-16 w-16 items-center justify-center rounded-full border border-amber/30 bg-amber/5 text-amber animate-pulse">
              <span className="absolute inline-flex h-full w-full rounded-full bg-amber/10 opacity-70 animate-ping" />
              <ShieldCheck className="h-8 w-8" />
            </div>
            
            <div className="space-y-1">
              <span className="font-display text-lg font-bold text-white block">
                Three.js Storytelling Island
              </span>
              <span className="font-sans text-xs text-silver block">
                WebGL initialization pending Stage 5 integration.
              </span>
            </div>
            
            <div className="flex flex-wrap justify-center gap-4 text-xs font-sans text-silver">
              <div className="flex items-center gap-1.5 px-3 py-1 rounded bg-obsidian border border-border-glass">
                <CheckCircle2 className="h-3.5 w-3.5 text-crimson" /> Production Line
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1 rounded bg-obsidian border border-border-glass">
                <CheckCircle2 className="h-3.5 w-3.5 text-crimson" /> Warehouse
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1 rounded bg-obsidian border border-border-glass">
                <CheckCircle2 className="h-3.5 w-3.5 text-crimson" /> Transit Fleet
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1 rounded bg-obsidian border border-border-glass">
                <CheckCircle2 className="h-3.5 w-3.5 text-crimson" /> Destination
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. SERVICES PANEL */}
      <ServicesPanel />

      {/* 5. TELEMETRY MAP */}
      <TelemetryMap />

      {/* 6. RFQ FORM */}
      <RfqForm />
    </div>
  );
}
