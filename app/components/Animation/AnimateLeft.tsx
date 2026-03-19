import React from "react";
import { motion } from "framer-motion";

interface AnimateLeftProps {
  children: React.ReactNode;
}

const AnimateLeft = ({ children }: AnimateLeftProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 40 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 1, ease: "easeOut" }}
      viewport={{ once: true }}
    >
      {children}
    </motion.div>
  );
};

export default AnimateLeft;
