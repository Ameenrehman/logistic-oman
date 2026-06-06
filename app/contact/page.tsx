"use client";

import RfqForm from "@/components/RfqForm";
import { Mail, Phone, MapPin, Building, Globe } from "lucide-react";

export default function ContactPage() {
  const offices = [
    {
      name: "Muscat Central Headquarters",
      address: "Road 4, Al Rusayl Industrial Area, Muscat, Oman",
      phone: "+968 2444 8888",
      email: "muscat.ops@yaclogistics.com",
    },
    {
      name: "Sohar Regional Terminal",
      address: "Sohar Industrial City Phase 3, Sohar, Oman",
      phone: "+968 2666 4444",
      email: "sohar.ops@yaclogistics.com",
    },
    {
      name: "Salalah Southern Depot",
      address: "Raysut Industrial Estate Road 2, Salalah, Oman",
      phone: "+968 2321 5555",
      email: "salalah.ops@yaclogistics.com",
    },
  ];

  return (
    <div className="bg-obsidian text-white min-h-screen">
      {/* 1. Header Hero */}
      <section className="py-24 border-b border-border-glass bg-radial-at-t from-crimson/5 via-transparent to-transparent">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <span className="font-sans text-xs font-semibold tracking-widest text-crimson uppercase">
            Get In Touch
          </span>
          <h1 className="mt-2 font-display text-4xl sm:text-5xl font-bold tracking-tight text-white">
            Connect With Our Logistics Team
          </h1>
          <p className="mt-6 font-sans text-lg text-silver max-w-2xl mx-auto leading-relaxed">
            Have questions about SLA specifications, storage rates, or shipping schedules? Reach out to our Muscat HQ or regional depots.
          </p>
        </div>
      </section>

      {/* 2. Form & Details Grid */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Contact Details Column */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <h2 className="font-display text-2xl font-bold text-white mb-4">
                Office Locations & Depots
              </h2>
              <p className="font-sans text-sm text-silver">
                Contact our local hubs directly for localized carrier coordinates, warehouse intakes, and dispatch logs.
              </p>
            </div>

            <div className="space-y-6">
              {offices.map((office) => (
                <div
                  key={office.name}
                  className="glass-panel p-6 rounded-lg border-l-2 border-l-amber hover:border-l-crimson transition-all"
                >
                  <h3 className="font-display text-base font-bold text-white mb-4 flex items-center gap-2">
                    <Building className="h-5 w-5 text-crimson" />
                    {office.name}
                  </h3>
                  <div className="space-y-3 font-sans text-xs text-silver">
                    <div className="flex gap-2.5">
                      <MapPin className="h-4.5 w-4.5 text-amber shrink-0" />
                      <span>{office.address}</span>
                    </div>
                    <div className="flex gap-2.5">
                      <Phone className="h-4.5 w-4.5 text-amber shrink-0" />
                      <span>{office.phone}</span>
                    </div>
                    <div className="flex gap-2.5">
                      <Mail className="h-4.5 w-4.5 text-amber shrink-0" />
                      <span>{office.email}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Quick help banner */}
            <div className="glass-panel p-6 rounded-lg border-l-2 border-l-crimson bg-crimson/5">
              <h4 className="font-display text-sm font-bold text-white flex items-center gap-2">
                <Globe className="h-4.5 w-4.5 text-crimson" />
                Global Brand Procurement
              </h4>
              <p className="font-sans text-xs text-silver mt-1.5 leading-relaxed">
                For multinational contract negotiations (FMCG bottling integration, nationwide dedicated supply chains), please contact our corporate relations desk directly at <span className="text-white font-semibold">corp@yaclogistics.com</span>.
              </p>
            </div>
          </div>

          {/* Form Column */}
          <div className="lg:col-span-7">
            <RfqForm />
          </div>
        </div>
      </section>
    </div>
  );
}
