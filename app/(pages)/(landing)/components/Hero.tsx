"use client";

import { motion } from "framer-motion";

export function Hero() {
  return (
    <div className="lg:min-h-screen flex flex-col bg-black pb-10">
      <main className=" bg-white rounded-b-[60px] lg:rounded-b-[90px] w-full">
        <div className="flex flex-col items-center px-6 pb-16 flex-1 pt-16 max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 1.2 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.5 }}
            viewport={{ once: true }}
            className="relative w-full  rounded-[20px] overflow-hidden"
            style={{ height: "clamp(280px, 45vw, 520px)" }}
          >
            <img
              src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=1200&q=80&fit=crop"
              alt="Group of young people using phones and laptops outdoors"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#021A24] via-transparent to-transparent opacity-70" />
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: "easeOut", delay: 1 }}
              viewport={{ once: true }}
              className="absolute bottom-5 right-5 lg:bottom-10 lg:right-10 bg-white lg:h-16 lg:w-80 h-8 w-40 rounded-full"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.5 }}
            viewport={{ once: true }}
            className="mt-12 space-y-4"
          >
            <h1 className="font-black text-[clamp(2rem,5vw,3.5rem)] leading-tight text-[#021A24] text-center font-mouser">
              Take control of your money with{" "}
              <span className="text-[#FF6800] capitalize">manayja.</span>
            </h1>
            <motion.p
              initial={{ opacity: 0,  }}
              whileInView={{ opacity: 1, }}
              transition={{ duration: 1, ease: "easeOut", delay: 0.9 }}
              viewport={{ once: true }}
              className="text-md lg:text-lg font-montserrat text-gray-700  mx-auto text-center"
            >
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: "easeInOut", delay: 1.2 }}
                viewport={{ once: true }}
                className="font-semibold bg-orange/30 px-1"
              >
                Track your spending
              </motion.span>
              ,{" "}
              <motion.span 
              initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: "easeInOut", delay: 1.7 }}
                viewport={{ once: true }}
              className="font-semibold bg-blue/30 px-1">set budgets</motion.span>
              , and{" "}
              <motion.span 
              initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: "easeInOut", delay: 2 }}
                viewport={{ once: true }}
              className="font-semibold bg-green/30 px-1">
                achieve your financial goals
              </motion.span>
              with ease. <br />{" "}
              <span>
                Join us today and start your journey to financial freedom!
              </span>
            </motion.p>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
