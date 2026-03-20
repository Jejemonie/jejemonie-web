"use client";

import AnimateLeft from "@/app/components/Animation/AnimateLeft";
import { motion } from "framer-motion";
import {
  TrendingUp,
  BarChart3,
  Bell,
  Link,
  RefreshCw,
  Shield,
} from "lucide-react";

const features = [
  {
    icon: TrendingUp,
    tag: "01",
    title: "AI-Powered Insights",
    description:
      "Your money has a story. We help you read it spotting patterns, flagging habits, and nudging you toward goals that actually stick.",
    highlight: "Personalized to you",
  },
  {
    icon: BarChart3,
    tag: "02",
    title: "Advanced Analytics",
    description:
      "No more squinting at spreadsheets. Beautiful charts that make your financial health feel less like homework and more like progress.",
    highlight: "Clear at a glance",
  },
  {
    icon: Bell,
    tag: "03",
    title: "Smart Alerts",
    description:
      "We tap you on the shoulder before things get messy unusual charges, upcoming bills, budget wins worth celebrating.",
    highlight: "Always heads-up",
  },
  {
    icon: Link,
    tag: "04",
    title: "Seamless Integrations",
    description:
      "Your accounts, cards, and wallets all talking to each other. One dashboard. Zero tab-switching. Total clarity.",
    highlight: "Everything, one place",
  },
  {
    icon: RefreshCw,
    tag: "05",
    title: "Auto-Categorization",
    description:
      "Every transaction sorted the moment it lands. Coffee, rent, that impulse buy filed away so you don't have to think twice.",
    highlight: "Works while you sleep",
  },
  {
    icon: Shield,
    tag: "06",
    title: "Bank-Level Security",
    description:
      "Enterprise-grade encryption, always on. Your data stays yours private, protected, and never sold.",
    highlight: "Locked tight",
  },
];

export function Features() {
  return (
    <section className="bg-black py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <AnimateLeft>
          <div className="mb-20 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div>
              <span className="inline-block text-[#F87315] font-mouser text-sm tracking-widest uppercase mb-3">
                What we do
              </span>
              <h2 className="font-mouser text-4xl md:text-5xl text-[#FFF7ED] leading-tight">
                Built for real life,
                <br />
                not spreadsheets.
              </h2>
            </div>
            <p className="text-[#FFF7ED]/40 font-montserrat max-w-sm text-base leading-relaxed md:text-right">
              Six features working quietly behind the scenes so you can stay
              focused on what matters.
            </p>
          </div>
        </AnimateLeft>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-black/10 rounded-2xl overflow-hidden border border-black/10">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 1,
                  ease: "easeInOut",
                  delay: index * 0.2,
                }}
                viewport={{ once: true }}
                className="group bg-[#F87315] hover:bg-[#FFF7ED] transition-colors duration-300 p-8 flex flex-col gap-5 relative cursor-pointer"
              >
                {/* Top row: icon + number */}
                <div className="flex items-center justify-between">
                  <div className="w-11 h-11 rounded-xl bg-white flex items-center justify-center text-black group-hover:text-white group-hover:bg-[#F87315] transition-colors duration-300">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="font-mouser text-xs text-blue/20 group-hover:text-[#F87315]/40 transition-colors duration-300 tracking-wider">
                    {feature.tag}
                  </span>
                </div>

                {/* Text */}
                <div className="flex flex-col gap-2">
                  <h3 className="font-montserrat font-semibold text-white group-hover:text-black text-lg leading-snug">
                    {feature.title}
                  </h3>
                  <p className="font-montserrat text-white group-hover:text-gray-500 text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </div>

                {/* Highlight pill */}
                <div className="mt-auto">
                  <span className="inline-block font-montserrat text-xs font-medium text-white group-hover:text-[#F87315] group-hover:bg-[#F87315]/10 bg-black/10 px-3 py-1 rounded-full">
                    {feature.highlight}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
