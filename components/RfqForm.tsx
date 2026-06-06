"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowLeft, Send, CheckCircle2, AlertCircle } from "lucide-react";

export default function RfqForm() {
  const [step, setStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    companyName: "",
    contactName: "",
    email: "",
    phone: "",
    volume: "medium", // low, medium, high
    tempRequirement: "ambient", // ambient, chilled, frozen, multi
    coverageNeeded: "national", // regional, national, gcc
    customNotes: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateStep = (currentStep: number) => {
    const newErrors: Record<string, string> = {};
    if (currentStep === 1) {
      if (!formData.companyName.trim()) newErrors.companyName = "Company name is required";
      if (!formData.contactName.trim()) newErrors.contactName = "Contact name is required";
      if (!formData.email.trim()) {
        newErrors.email = "Email is required";
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = "Please enter a valid corporate email";
      }
      if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(step)) {
      setStep(step + 1);
    }
  };

  const handlePrev = () => {
    setStep(step - 1);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateStep(2)) {
      // Mock submit
      setIsSubmitted(true);
    }
  };

  return (
    <section className="py-20 bg-obsidian relative">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <span className="font-sans text-xs font-semibold tracking-widest text-crimson uppercase">
            Procurement Portal
          </span>
          <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Request an Enterprise Service SLA
          </h2>
          <p className="mt-4 font-sans text-base text-silver">
            Complete our standard logistics evaluation form, and our cold-chain coordinators will deliver a custom proposal within 24 hours.
          </p>
        </div>

        <div className="glass-panel rounded-lg p-8 md:p-12 relative overflow-hidden">
          {/* Progress bar & Step badges */}
          <div className="mb-10">
            <div className="flex justify-between items-center mb-4 text-xs font-sans font-semibold text-silver/60">
              <span className={step >= 1 ? "text-amber transition-colors duration-300" : "transition-colors duration-300"}>1. Corporate Details</span>
              <span className={step >= 2 ? "text-amber transition-colors duration-300" : "transition-colors duration-300"}>2. Operations Scope</span>
              <span className={isSubmitted ? "text-amber transition-colors duration-300" : "transition-colors duration-300"}>3. Completed</span>
            </div>
            <div className="w-full bg-border-glass h-1.5 rounded-full relative overflow-hidden">
              <motion.div
                className="bg-amber h-full"
                initial={{ width: "33%" }}
                animate={{ width: isSubmitted ? "100%" : `${step === 1 ? 33 : 66}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </div>

          <AnimatePresence mode="wait">
            {!isSubmitted ? (
              <form onSubmit={handleSubmit} className="space-y-6">
                {step === 1 && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-6"
                  >
                    <h3 className="font-display text-xl font-bold text-white mb-6">
                      Step 1: Corporate Details
                    </h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="flex flex-col gap-2">
                        <label htmlFor="companyName" className="font-display text-sm font-semibold text-white">
                          Company / Brand Name
                        </label>
                        <input
                          type="text"
                          id="companyName"
                          name="companyName"
                          value={formData.companyName}
                          onChange={handleInputChange}
                          className={`rounded bg-chamber border p-3 font-sans text-sm text-white focus:outline-none focus:ring-1 transition-all duration-300 ${
                            errors.companyName 
                              ? "border-crimson focus:border-crimson focus:ring-crimson/30 focus:shadow-[0_0_15px_rgba(227,27,35,0.15)]" 
                              : "border-border-glass focus:border-amber focus:ring-amber/30 focus:shadow-[0_0_15px_rgba(229,169,60,0.15)]"
                          }`}
                          placeholder="e.g. Coca-Cola Bottlers"
                        />
                        {errors.companyName && (
                          <span className="text-xs text-crimson flex items-center gap-1">
                            <AlertCircle className="h-3.5 w-3.5" />
                            {errors.companyName}
                          </span>
                        )}
                      </div>

                      <div className="flex flex-col gap-2">
                        <label htmlFor="contactName" className="font-display text-sm font-semibold text-white">
                          Representative Name
                        </label>
                        <input
                          type="text"
                          id="contactName"
                          name="contactName"
                          value={formData.contactName}
                          onChange={handleInputChange}
                          className={`rounded bg-chamber border p-3 font-sans text-sm text-white focus:outline-none focus:ring-1 transition-all duration-300 ${
                            errors.contactName 
                              ? "border-crimson focus:border-crimson focus:ring-crimson/30 focus:shadow-[0_0_15px_rgba(227,27,35,0.15)]" 
                              : "border-border-glass focus:border-amber focus:ring-amber/30 focus:shadow-[0_0_15px_rgba(229,169,60,0.15)]"
                          }`}
                          placeholder="e.g. Salim Al Harthy"
                        />
                        {errors.contactName && (
                          <span className="text-xs text-crimson flex items-center gap-1">
                            <AlertCircle className="h-3.5 w-3.5" />
                            {errors.contactName}
                          </span>
                        )}
                      </div>

                      <div className="flex flex-col gap-2">
                        <label htmlFor="email" className="font-display text-sm font-semibold text-white">
                          Corporate Email Address
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className={`rounded bg-chamber border p-3 font-sans text-sm text-white focus:outline-none focus:ring-1 transition-all duration-300 ${
                            errors.email 
                              ? "border-crimson focus:border-crimson focus:ring-crimson/30 focus:shadow-[0_0_15px_rgba(227,27,35,0.15)]" 
                              : "border-border-glass focus:border-amber focus:ring-amber/30 focus:shadow-[0_0_15px_rgba(229,169,60,0.15)]"
                          }`}
                          placeholder="salim@brand.com"
                        />
                        {errors.email && (
                          <span className="text-xs text-crimson flex items-center gap-1">
                            <AlertCircle className="h-3.5 w-3.5" />
                            {errors.email}
                          </span>
                        )}
                      </div>

                      <div className="flex flex-col gap-2">
                        <label htmlFor="phone" className="font-display text-sm font-semibold text-white">
                          Contact Phone Number
                        </label>
                        <input
                          type="text"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className={`rounded bg-chamber border p-3 font-sans text-sm text-white focus:outline-none focus:ring-1 transition-all duration-300 ${
                            errors.phone 
                              ? "border-crimson focus:border-crimson focus:ring-crimson/30 focus:shadow-[0_0_15px_rgba(227,27,35,0.15)]" 
                              : "border-border-glass focus:border-amber focus:ring-amber/30 focus:shadow-[0_0_15px_rgba(229,169,60,0.15)]"
                          }`}
                          placeholder="+968 9999 9999"
                        />
                        {errors.phone && (
                          <span className="text-xs text-crimson flex items-center gap-1">
                            <AlertCircle className="h-3.5 w-3.5" />
                            {errors.phone}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex justify-end pt-4">
                      <button
                        type="button"
                        onClick={handleNext}
                        className="inline-flex items-center gap-2 rounded bg-crimson px-6 py-3 font-sans text-sm font-semibold text-white hover:bg-amber hover:text-obsidian transition-colors"
                      >
                        Next: Logistics Scope
                        <ArrowRight className="h-4 w-4" />
                      </button>
                    </div>
                  </motion.div>
                )}

                {step === 2 && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-6"
                  >
                    <h3 className="font-display text-xl font-bold text-white mb-6">
                      Step 2: Logistics Requirements
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="flex flex-col gap-2">
                        <label htmlFor="volume" className="font-display text-sm font-semibold text-white">
                          Estimated Monthly Cases
                        </label>
                        <select
                          id="volume"
                          name="volume"
                          value={formData.volume}
                          onChange={handleInputChange}
                          className="rounded bg-chamber border border-border-glass p-3 font-sans text-sm text-white focus:outline-none focus:ring-1 focus:border-amber focus:ring-amber/30 focus:shadow-[0_0_15px_rgba(229,169,60,0.15)] transition-all duration-300"
                        >
                          <option value="low">Under 100,000 cases</option>
                          <option value="medium">100,000 - 500,000 cases</option>
                          <option value="high">500,000+ cases</option>
                        </select>
                      </div>

                      <div className="flex flex-col gap-2">
                        <label htmlFor="tempRequirement" className="font-display text-sm font-semibold text-white">
                          Temperature Standards
                        </label>
                        <select
                          id="tempRequirement"
                          name="tempRequirement"
                          value={formData.tempRequirement}
                          onChange={handleInputChange}
                          className="rounded bg-chamber border border-border-glass p-3 font-sans text-sm text-white focus:outline-none focus:ring-1 focus:border-amber focus:ring-amber/30 focus:shadow-[0_0_15px_rgba(229,169,60,0.15)] transition-all duration-300"
                        >
                          <option value="ambient">Ambient (Dry Cargo)</option>
                          <option value="chilled">Chilled (+2°C to +8°C)</option>
                          <option value="frozen">Frozen (Below -18°C)</option>
                          <option value="multi">Multi-Temperature Complex</option>
                        </select>
                      </div>

                      <div className="flex flex-col gap-2 md:col-span-2">
                        <label htmlFor="coverageNeeded" className="font-display text-sm font-semibold text-white">
                          Geographic Distribution Needs
                        </label>
                        <select
                          id="coverageNeeded"
                          name="coverageNeeded"
                          value={formData.coverageNeeded}
                          onChange={handleInputChange}
                          className="rounded bg-chamber border border-border-glass p-3 font-sans text-sm text-white focus:outline-none focus:ring-1 focus:border-amber focus:ring-amber/30 focus:shadow-[0_0_15px_rgba(229,169,60,0.15)] transition-all duration-300"
                        >
                          <option value="regional">Regional (Muscat Governorate Only)</option>
                          <option value="national">Nationwide (All Oman Governorates)</option>
                          <option value="gcc">Cross-Border GCC transit (Oman/UAE/Saudi Arabia)</option>
                        </select>
                      </div>

                      <div className="flex flex-col gap-2 md:col-span-2">
                        <label htmlFor="customNotes" className="font-display text-sm font-semibold text-white">
                          Special Requirements or Handling Details
                        </label>
                        <textarea
                          id="customNotes"
                          name="customNotes"
                          rows={4}
                          value={formData.customNotes}
                          onChange={handleInputChange}
                          className="rounded bg-chamber border border-border-glass p-3 font-sans text-sm text-white focus:outline-none focus:ring-1 focus:border-amber focus:ring-amber/30 focus:shadow-[0_0_15px_rgba(229,169,60,0.15)] transition-all duration-300 resize-none"
                          placeholder="Outline specific schedules, custom warehouse SLA expectations, or integration needs..."
                        />
                      </div>
                    </div>

                    <div className="flex justify-between pt-4 border-t border-border-glass/40">
                      <button
                        type="button"
                        onClick={handlePrev}
                        className="inline-flex items-center gap-2 rounded bg-chamber border border-border-glass px-6 py-3 font-sans text-sm font-semibold text-white hover:border-amber transition-colors"
                      >
                        <ArrowLeft className="h-4 w-4" />
                        Back
                      </button>
                      <button
                        type="submit"
                        className="inline-flex items-center gap-2 rounded bg-crimson px-6 py-3 font-sans text-sm font-semibold text-white hover:bg-amber hover:text-obsidian transition-colors"
                      >
                        Submit Request
                        <Send className="h-4 w-4" />
                      </button>
                    </div>
                  </motion.div>
                )}
              </form>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12 flex flex-col items-center gap-6"
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-amber/10 border border-amber/30 text-amber">
                  <CheckCircle2 className="h-10 w-10" />
                </div>
                <div>
                  <h3 className="font-display text-2xl font-bold text-white">
                    RFQ Received Successfully
                  </h3>
                  <p className="font-sans text-sm text-silver mt-2 max-w-md mx-auto leading-relaxed">
                    Thank you, Salim. Your reference number is <strong>YAC-2026-8902</strong>. A logistics account coordinator has been assigned to evaluate your requirements and will reach out shortly.
                  </p>
                </div>
                <button
                  onClick={() => {
                    setIsSubmitted(false);
                    setStep(1);
                    setFormData({
                      companyName: "",
                      contactName: "",
                      email: "",
                      phone: "",
                      volume: "medium",
                      tempRequirement: "ambient",
                      coverageNeeded: "national",
                      customNotes: "",
                    });
                  }}
                  className="rounded border border-border-glass bg-chamber px-6 py-2.5 font-sans text-xs font-semibold text-white hover:border-amber transition-colors"
                >
                  Submit Another Quote
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
