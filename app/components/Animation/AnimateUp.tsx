'use client'

import React from 'react'
import { motion } from 'framer-motion'

interface AnimateUpProps {
  children: React.ReactNode
}

const AnimateUp = ({children}: AnimateUpProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: "easeOut", delay: 0.5 }}
      viewport={{ once: true }}
    >
      {children}
    </motion.div>
  )
}

export default AnimateUp