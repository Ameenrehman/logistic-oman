"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Shield, Award, CheckCircle, FileText, Users, Clock } from "lucide-react";

export default function AboutPage() {
  const certifications = [
    { name: "HACCP Food Safety", code: "HACCP-2026-OM", desc: "Gold standard compliance for global food and beverage supply chains." },
    { name: "ISO 22000:2018", code: "ISO-22000-FSMS", desc: "International food safety management standard registration." },
    { name: "ISO 9001:2015", code: "ISO-9001-QMS", desc: "Quality management systems certification across all 11 governorates." },
  ];

  const milestones = [
    { year: "2012", title: "Foundation & First Fleet", desc: "Launched operations in Muscat with 15 refrigerated beverage vans." },
    { year: "2016", title: "National Expansion", desc: "Established regional terminals in Sohar and Salalah, expanding fleet to 150+." },
    { year: "2020", title: "Bottling Integration", desc: "Secured lead logistics partnership with Coca-Cola Oman operations." },
    { year: "2024", title: "Automated Cold Chain", desc: "Opened the new Al Rusayl automated storage facility with 10k+ pallets capacity." },
  ];

  const leaders = [
    { name: "Fahad Al Said", role: "Chief Executive Officer", bio: "20+ years of logistics leadership in the GCC region." },
    { name: "Amna Al Balushi", role: "Chief Operating Officer", bio: "Former supply chain director for leading FMCG manufacturers." },
    { name: "David Miller", role: "Cold Chain Technical Director", bio: "Specialist in refrigeration engineering and telemetry platforms." },
  ];

  return (
    <div className="bg-obsidian text-white min-h-screen">
      {/* 1. Header Hero */}
      <section className="py-24 border-b border-border-glass bg-radial-at-t from-crimson/5 via-transparent to-transparent">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <span className="font-sans text-xs font-semibold tracking-widest text-crimson uppercase">
            Corporate Profile
          </span>
          <h1 className="mt-2 font-display text-4xl sm:text-5xl font-bold tracking-tight text-white">
            Pioneering Beverage Distribution in Oman
          </h1>
          <p className="mt-6 font-sans text-lg text-silver max-w-2xl mx-auto leading-relaxed">
            Founded in Muscat, we have grown into the Sultanate's premier cold-chain logistics provider, delivering critical volume assurance to global beverage leaders.
          </p>
        </div>
      </section>

      {/* 2. Operations Scale Stats */}
      <section className="py-16 bg-chamber border-b border-border-glass">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 glass-panel rounded-lg border-l-2 border-l-amber">
              <Clock className="h-8 w-8 text-amber mb-4" />
              <h3 className="font-display text-lg font-bold text-white">Est. 2012</h3>
              <p className="font-sans text-sm text-silver mt-2">Over a decade of unbroken logistics service across Oman.</p>
            </div>
            <div className="p-8 glass-panel rounded-lg border-l-2 border-l-crimson">
              <Users className="h-8 w-8 text-crimson mb-4" />
              <h3 className="font-display text-lg font-bold text-white">450+ Professionals</h3>
              <p className="font-sans text-sm text-silver mt-2">Expert drivers, dispatchers, and cold-chain engineers.</p>
            </div>
            <div className="p-8 glass-panel rounded-lg border-l-2 border-l-white">
              <Shield className="h-8 w-8 text-white mb-4" />
              <h3 className="font-display text-lg font-bold text-white">Gold Standard Safety</h3>
              <p className="font-sans text-sm text-silver mt-2">Daily audits and compliance standards mirroring global leaders.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Interactive Milestones Timeline */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h2 className="font-display text-3xl font-bold text-white">Our Journey</h2>
            <p className="mt-2 font-sans text-sm text-silver">Key milestones marking our path to operational dominance.</p>
          </div>

          <div className="relative border-l border-border-glass max-w-3xl mx-auto pl-8 space-y-12">
            {milestones.map((milestone, idx) => (
              <div key={milestone.year} className="relative">
                <span className="absolute -left-12 top-1.5 flex h-8 w-8 items-center justify-center rounded-full border border-amber/30 bg-chamber text-xs font-bold text-amber">
                  {milestone.year}
                </span>
                <h3 className="font-display text-lg font-bold text-white">{milestone.title}</h3>
                <p className="font-sans text-sm text-silver mt-2 leading-relaxed">{milestone.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Compliance & Certifications Vault */}
      <section className="py-20 bg-chamber border-y border-border-glass">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5">
              <span className="font-sans text-xs font-semibold tracking-widest text-crimson uppercase">
                Quality Credentials
              </span>
              <h2 className="mt-2 font-display text-3xl font-bold text-white">
                Compliance & Quality Audits
              </h2>
              <p className="mt-4 font-sans text-sm text-silver leading-relaxed">
                We maintain active certifications to satisfy global procurement demands. All documentation is audited annually by independent international testing bodies.
              </p>
              <div className="mt-6">
                <button className="inline-flex items-center gap-2 rounded bg-crimson px-5 py-2.5 font-sans text-xs font-semibold text-white hover:bg-amber hover:text-obsidian transition-colors">
                  <FileText className="h-4 w-4" />
                  Download Credentials PDF
                </button>
              </div>
            </div>

            <div className="lg:col-span-7 flex flex-col gap-4">
              {certifications.map((cert) => (
                <div key={cert.name} className="glass-panel p-6 rounded-lg border-l-2 border-l-amber flex gap-4 items-start">
                  <Award className="h-6 w-6 text-amber shrink-0 mt-0.5" />
                  <div>
                    <div className="flex justify-between items-center gap-2 flex-wrap">
                      <h4 className="font-display text-base font-bold text-white">{cert.name}</h4>
                      <span className="font-sans text-[10px] bg-obsidian px-2 py-0.5 rounded border border-border-glass text-silver uppercase">{cert.code}</span>
                    </div>
                    <p className="font-sans text-xs text-silver mt-1.5 leading-relaxed">{cert.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 5. Leadership Profile Grid */}
      <section className="py-20 bg-obsidian">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h2 className="font-display text-3xl font-bold text-white">Operational Leadership</h2>
            <p className="mt-2 font-sans text-sm text-silver">The team directing our national supply chain.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {leaders.map((leader) => (
              <div key={leader.name} className="glass-panel p-8 rounded-lg flex flex-col justify-between hover:border-amber/40 transition-colors">
                <div>
                  <h3 className="font-display text-lg font-bold text-white">{leader.name}</h3>
                  <span className="font-sans text-xs text-crimson uppercase tracking-wider font-semibold block mt-1">{leader.role}</span>
                  <p className="font-sans text-sm text-silver mt-4 leading-relaxed">{leader.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
