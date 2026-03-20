"use client";

import AnimateLeft from "@/app/components/Animation/AnimateLeft";
import { UserPlus, BellRing, Sparkles, BrainCircuit } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

const steps = [
  {
    tag: "01",
    icon: UserPlus,
    title: "Create Your Account",
    description:
      "Sign up and personalize your experience in under two minutes. No credit card, no fluff.",
    detail: "2 min setup",
  },
  {
    tag: "02",
    icon: BellRing,
    title: "Connect Your Alerts",
    description:
      "Forward your bank emails or grant Android SMS access. That's all we need to get started.",
    detail: "Bank emails or SMS",
  },
  {
    tag: "03",
    icon: Sparkles,
    title: "Automatic Tracking",
    description:
      "Manayja reads and categorizes your transactions the moment they land. Nothing manual, ever.",
    detail: "Zero manual entry",
  },
  {
    tag: "04",
    icon: BrainCircuit,
    title: "Smart Financial Guidance",
    description:
      "Your AI manager analyzes your habits and surfaces insights that actually help you stay in control.",
    detail: "AI-powered insights",
  },
];

export function HowItWorks() {
  return (
    <section className="bg-black pb-24 overflow-hidden rounded-b-[90px]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <AnimateLeft>
          <div className="mb-20 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div>
              <span className="inline-block text-orange font-mouser text-sm tracking-widest uppercase mb-3">
                How it works
              </span>
              <h2 className="font-mouser text-4xl md:text-5xl text-white leading-tight">
                Up and running
                <br />
                in four steps.
              </h2>
            </div>
            <p className="font-montserrat text-white/40 max-w-sm text-base leading-relaxed md:text-right">
              No complicated setup. No manual entry. Just connect, and Manayja
              takes it from there.
            </p>
          </div>
        </AnimateLeft>

        {/* Steps grid — 2 col on desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {steps.map((step, index) => {
            const Icon = step.icon;
            const isLarge = index === 0 || index === 3;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 0.5, y: 0 }}
                transition={{
                  duration: 1,
                  ease: "easeInOut",
                  delay: index * 0.2,
                }}
                viewport={{ once: true, margin: "-50px" }}
                className={`group relative flex flex-col justify-between gap-8 border border-white/[0.08] hover:border-orange/30 rounded-3xl p-8 transition-all duration-300 overflow-hidden cursor-pointer ease-in-out
                  ${isLarge ? "md:col-span-1 min-h-64" : "min-h-56"}
                  bg-white/[0.03] hover:bg-white/[0.06]`}
              >
                {/* Subtle corner glow on hover */}
                <div className="pointer-events-none absolute -top-10 -right-10 w-40 h-40 rounded-full bg-orange/0 group-hover:bg-orange/8 transition-all duration-500 blur-2xl" />

                {/* Top row */}
                <div className="flex items-start justify-between">
                  {/* Icon box */}
                  <div className="w-12 h-12 rounded-2xl bg-white/5 group-hover:bg-orange/15 border border-white/10 group-hover:border-orange/25 flex items-center justify-center transition-all duration-300">
                    <Icon className="w-5 h-5 text-white group-hover:text-orange transition-colors duration-300" />
                  </div>

                  {/* Step tag */}
                  <span className="font-mouser text-[11px] tracking-widest text-white/15 group-hover:text-orange/40 transition-colors duration-300 uppercase pt-1">
                    {step.tag}
                  </span>
                </div>

                {/* Bottom content */}
                <div className="flex flex-col gap-2">
                  <h3 className="font-montserrat font-semibold text-white text-xl leading-snug">
                    {step.title}
                  </h3>
                  <p className="font-montserrat text-sm text-white/45 leading-relaxed">
                    {step.description}
                  </p>

                  {/* Detail pill */}
                  <div className="mt-3 inline-flex items-center gap-2 w-fit">
                    <span className="w-1 h-1 rounded-full bg-orange/60" />
                    <span className="font-montserrat text-xs text-orange/70 font-medium tracking-wide">
                      {step.detail}
                    </span>
                  </div>
                </div>

                {/* Large background number — decorative */}
                <span className="pointer-events-none absolute -bottom-4 -right-2 font-mouser text-[7rem] leading-none text-white/[0.03] group-hover:text-white/[0.05] select-none transition-colors duration-300">
                  {step.tag}
                </span>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
