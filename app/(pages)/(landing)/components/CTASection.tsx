"use client";

import { useRouter } from "next/navigation";
import { ArrowRight, Sparkles, Clock } from "lucide-react";
import { motion } from "framer-motion";

const perks = [
  { label: "Free forever plan" },
  { label: "No credit card needed" },
  { label: "Set up in under 2 minutes" },
];

export function CTASection() {
  const router = useRouter();

  return (
    <section className="bg-[#F87315] py-24 overflow-hidden rounded-t-[90px]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left — copy + actions */}
          <motion.div 
          initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: "easeOut", delay: 1 }}
      viewport={{ once: true }}
          className="flex flex-col gap-8">
            <div>
              <span className="inline-block text-accent font-mouser text-sm tracking-widest uppercase mb-4">
                Get started
              </span>
              <h2 className="font-mouser text-4xl md:text-5xl text-white leading-tight">
                Your finances,
                <br />
                finally under control.
              </h2>
            </div>

            <p className="font-manrope text-white text-base leading-relaxed max-w-md">
              Manayja is just getting started — and so is the best time to jump
              in. Be among the first to shape how it works, and take control of
              your money while you're at it.
            </p>

            {/* Perks */}
            <ul className="flex flex-col gap-2">
              {perks.map((perk, i) => (
                <li
                  key={i}
                  className="flex items-center gap-3 font-manrope text-sm text-white"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0" />
                  {perk.label}
                </li>
              ))}
            </ul>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => router.push("/signup")}
                className="group bg-[#FFF7ED] text-orange hover:bg-accent/90 font-montserrat font-semibold text-sm py-3.5 px-7 rounded-xl hover:-translate-y-1 ease-in-out transition-all duration-300 flex items-center justify-center gap-2"
              >
                Create Free Account
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </button>
              <button
                onClick={() => router.push("/login")}
                className="bg-white/10 hover:bg-white/15 text-white font-montserrat font-semibold text-sm py-3.5 px-7 rounded-xl hover:-translate-y-1 ease-in-out transition-all duration-300 border border-white/10"
              >
                Sign In
              </button>
            </div>
          </motion.div>

          {/* Right — early access card */}
          <div className="bg-[#FFF7ED] border border-white/10 rounded-2xl p-8 flex flex-col gap-8">
            {/* Badge */}
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-[#F87315] flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <span className="font-mouser text-[#F87315] text-sm tracking-wide">
                Early Access
              </span>
            </div>

            {/* Message */}
            <div className="flex flex-col gap-3">
              <h3 className="font-montserrat font-semibold text-[#F87315] text-xl leading-snug">
                Be part of building something better.
              </h3>
              <p className="font-manrope text-[#F87315] text-sm leading-relaxed">
                We're in early days — no inflated user counts, no fake
                testimonials. Just a focused tool built to genuinely help you
                manage money better. Your feedback will shape every feature that
                comes next.
              </p>
            </div>

            {/* What to expect */}
            <div className="flex flex-col gap-3">
              <p className="font-manrope text-xs font-semibold text-[#F87315] uppercase tracking-widest">
                What to expect
              </p>
              {[
                "A clean, distraction-free dashboard",
                "AI insights that actually make sense",
                "Direct line to the team building it",
                "Features shaped by real user needs",
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-orange/80 flex-shrink-0" />
                  <span className="font-manrope text-sm text-[#F87315]/80 leading-relaxed">
                    {item}
                  </span>
                </div>
              ))}
            </div>

            {/* Footer note */}
            <div className="mt-auto pt-5 border-t border-white/10 flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#F87315]/90 flex-shrink-0" />
              <p className="font-manrope text-xs text-[#F87315]/90 leading-relaxed">
                Early access is free. No commitments, cancel anytime.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
