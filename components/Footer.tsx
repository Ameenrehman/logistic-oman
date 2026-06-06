import Link from "next/link";
import Image from "next/image";
import { Mail, Phone, MapPin, Award, CheckCircle, ShieldCheck } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const services = [
    { name: "Cold Chain Logistics", href: "/services" },
    { name: "FMCG Distribution", href: "/services" },
    { name: "Warehousing & Cross-Dock", href: "/services" },
    { name: "Fleet Management", href: "/fleet" },
  ];

  const company = [
    { name: "About Us", href: "/about" },
    { name: "Fleet Capabilities", href: "/fleet" },
    { name: "Technology Portal", href: "/technology" },
    { name: "Regional Coverage", href: "/coverage" },
  ];

  const contact = [
    { text: "info@yaclogistics.com", icon: Mail },
    { text: "+968 2444 8888", icon: Phone },
    { text: "Al Rusayl Industrial Area, Muscat, Sultanate of Oman", icon: MapPin },
  ];

  return (
    <footer className="border-t border-border-glass bg-chamber text-silver py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Company Brief & Badges */}
          <div className="flex flex-col gap-6">
            <Link href="/" className="flex items-center gap-2.5">
              <Image
                src="/images/backlogologistics.png"
                alt="Al Yanabeea Al Adabah Logistics"
                width={220}
                height={44}
                className="h-11 w-auto object-contain"
              />
            </Link>
            <p className="font-sans text-sm leading-relaxed text-silver/80">
              Al Yanabeea Al Adabah Logistics (YAC) is Oman's premier multi-temperature logistics provider. Operating nationwide fleets and automated storage infrastructure to power global FMCG brands.
            </p>
            {/* Certifications row */}
            <div className="flex items-center gap-4 pt-2">
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-obsidian border border-border-glass text-[11px] font-semibold text-amber">
                <Award className="h-3.5 w-3.5" />
                ISO 9001
              </div>
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-obsidian border border-border-glass text-[11px] font-semibold text-amber">
                <Award className="h-3.5 w-3.5" />
                HACCP
              </div>
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-obsidian border border-border-glass text-[11px] font-semibold text-amber">
                <Award className="h-3.5 w-3.5" />
                ISO 22000
              </div>
            </div>
          </div>

          {/* Quick Links: Services */}
          <div>
            <h3 className="font-display text-sm font-bold tracking-widest text-white uppercase mb-6">
              Services
            </h3>
            <ul className="space-y-4">
              {services.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="font-sans text-sm hover:text-amber transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links: Company */}
          <div>
            <h3 className="font-display text-sm font-bold tracking-widest text-white uppercase mb-6">
              Company
            </h3>
            <ul className="space-y-4">
              {company.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="font-sans text-sm hover:text-amber transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h3 className="font-display text-sm font-bold tracking-widest text-white uppercase mb-6">
              Oman HQ
            </h3>
            <ul className="space-y-4">
              {contact.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <li key={idx} className="flex gap-3 text-sm">
                    <Icon className="h-5 w-5 text-crimson shrink-0" />
                    <span className="font-sans leading-relaxed text-silver/90">{item.text}</span>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="border-t border-border-glass/60 pt-8 mt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs">
          <p className="font-sans text-silver/60">
            &copy; {currentYear} Al Yanabeea Al Adabah Logistics. All rights reserved.
          </p>
          <div className="flex gap-6 font-sans text-silver/60">
            <Link href="/" className="hover:text-amber transition-colors">Privacy Policy</Link>
            <Link href="/" className="hover:text-amber transition-colors">Terms of Service</Link>
            <Link href="/contact" className="hover:text-amber transition-colors">Enterprise Inquiry</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
