"use client";

import AnimateLeft from "@/app/components/Animation/AnimateLeft";
import AnimateUp from "@/app/components/Animation/AnimateUp";
import { motion } from "framer-motion";
import { User, Users, Briefcase } from "lucide-react";

const benefitGroups = [
  {
    icon: User,
    tag: "01",
    title: "For Individuals",
    subtitle: "Your money, your rules.",
    accent: "bg-accent text-black",
    pill: "bg-accent text-primary",
    benefits: [
      "Track personal spending and income effortlessly",
      "Receive personalized savings recommendations",
      "Set and achieve financial goals with AI guidance",
      "Identify areas to reduce unnecessary expenses",
      "Plan for major life events and purchases",
    ],
  },
  {
    icon: Users,
    tag: "02",
    title: "For Families",
    subtitle: "Everyone on the same page.",
    accent: "bg-orange text-white",
    pill: "bg-orange/10 text-orange",
    benefits: [
      "Coordinate finances across multiple family members",
      "Create shared savings goals and track progress",
      "Manage household expenses with custom categories",
      "Plan for education, vacations, and family needs",
      "Keep everyone accountable with shared insights",
    ],
  },
  {
    icon: Briefcase,
    tag: "03",
    title: "For Businesses",
    subtitle: "Less admin. More clarity.",
    accent: "bg-accent text-black",
    pill: "bg-accent text-primary",
    benefits: [
      "Track business expenses and revenue streams",
      "Forecast cash flow with AI-powered predictions",
      "Categorize tax-deductible expenses automatically",
      "Generate financial reports with a single click",
      "Manage team spending with custom permissions",
    ],
  },
];

export function Benefits() {
  return (
    <AnimateUp>
      <section className="py-24 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          {/* Header */}
          <AnimateLeft>
            <div className="mb-20 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
              <div>
                <span className="inline-block text-orange font-mouser text-sm tracking-widest uppercase mb-3">
                  Who it's for
                </span>
                <h2 className="font-mouser text-4xl md:text-5xl text-primary leading-tight">
                  Fits your life.
                  <br />
                  Whatever that looks like.
                </h2>
              </div>
              <p className="text-gray-400 font-montserrat max-w-sm text-base leading-relaxed md:text-right">
                Solo saver, busy household, or growing business Manayja adapts
                to how you actually live and work.
              </p>
            </div>
          </AnimateLeft>

          {/* Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {benefitGroups.map((group, index) => {
              const Icon = group.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, ease: "easeOut", delay: index * 0.3 }}
                  viewport={{ once: true }}
                  className="group bg-white  border border-primary/8 hover:border-primary/20 rounded-2xl p-8 flex flex-col gap-8 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-1 cursor-pointer ease-in-out"
                >
                  {/* Card top */}
                  <div className="flex items-start justify-between">
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center ${group.accent}`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="font-mouser text-xs text-primary/20 tracking-wider pt-1">
                      {group.tag}
                    </span>
                  </div>

                  {/* Title block */}
                  <div>
                    <h3 className="font-montserrat font-semibold text-primary text-xl mb-1">
                      {group.title}
                    </h3>
                    <p
                      className={`font-montserrat text-xs font-medium px-2.5 py-1 rounded-full inline-block ${group.pill}`}
                    >
                      {group.subtitle}
                    </p>
                  </div>

                  {/* Benefit list */}
                  <ul className="flex flex-col gap-3">
                    {group.benefits.map((benefit, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-orange flex-shrink-0" />
                        <span className="font-montserrat text-sm text-gray-600 leading-relaxed">
                          {benefit}
                        </span>
                      </li>
                    ))}
                  </ul>

                  {/* Bottom index line */}
                  <div className="mt-auto pt-4 border-t border-primary/8">
                    <span className="font-montserrat text-xs text-gray-400">
                      {group.benefits.length} features included
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    </AnimateUp>
  );
}
