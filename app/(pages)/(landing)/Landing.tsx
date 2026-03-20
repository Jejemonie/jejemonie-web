"use client";

import React from "react";
import { Hero } from "./components/Hero";
import { Features } from "./components/Features";
import { CTASection } from "./components/CTASection";
import { Benefits } from "./components/Benefits";
import { Footer } from "./components/Footer";
import { HowItWorks } from "./components/HowItWorks";
import AnimateUp from "@/app/components/Animation/AnimateUp";
import AnimateDown from "@/app/components/Animation/AnimateDown";

const Landing = () => {
  return (
    <div>
      <AnimateDown>
        <Hero />
      </AnimateDown>

      <AnimateDown>
        <Features />
        <HowItWorks />
      </AnimateDown>

      <Benefits />

      <AnimateUp>
        <CTASection />
        <Footer />
      </AnimateUp>
    </div>
  );
};

export default Landing;
