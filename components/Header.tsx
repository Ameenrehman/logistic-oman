"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { name: "Services", href: "/services" },
    { name: "Fleet", href: "/fleet" },
    { name: "Technology", href: "/technology" },
    { name: "Coverage", href: "/coverage" },
    { name: "About Us", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border-glass bg-obsidian/80 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          {/* Logo Section */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <Image
              src="/images/backlogologistics.png"
              alt="Al Yanabeea Al Adabah Logistics"
              width={200}
              height={40}
              className="h-8 sm:h-10 md:h-14 w-auto object-contain transition-transform duration-300 group-hover:scale-[1.02]"
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`font-sans text-sm font-medium tracking-wide transition-all duration-200 hover:text-amber hover:translate-y-[-1px] ${
                    isActive ? "text-crimson border-b border-crimson/50 pb-1" : "text-silver"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Action Button */}
          <div className="hidden md:flex items-center">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded bg-crimson px-5 py-2.5 font-sans text-sm font-semibold text-white hover:bg-amber hover:text-obsidian transition-all duration-300 shadow-lg shadow-crimson/10 hover:shadow-amber/10 hover:scale-[1.02]"
            >
              Request Quote
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden flex items-center justify-center min-w-[48px] min-h-[48px] rounded border border-border-glass text-white hover:text-amber hover:border-amber/30 transition-colors"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-border-glass bg-chamber/95 backdrop-blur-lg overflow-hidden"
          >
            <div className="space-y-2 px-4 py-6">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className={`block rounded px-4 py-3 font-sans text-base font-medium transition-colors ${
                      isActive
                        ? "bg-crimson/10 text-crimson border-l-2 border-crimson"
                        : "text-silver hover:bg-obsidian/50 hover:text-amber"
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
              <div className="pt-4 px-4">
                <Link
                  href="/contact"
                  onClick={() => setIsOpen(false)}
                  className="flex w-full items-center justify-center gap-2 rounded bg-crimson py-3 font-sans text-base font-semibold text-white hover:bg-amber hover:text-obsidian transition-colors"
                >
                  Request Quote
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
