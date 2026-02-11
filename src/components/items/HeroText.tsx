"use client";

import { motion } from "motion/react";

interface HeroTextProps {
  title: string;
  subtitle?: string;
}

export default function HeroText({ title, subtitle }: HeroTextProps) {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center select-none">
      <motion.h1
        className="text-6xl md:text-8xl lg:text-[120px] font-bold tracking-tight leading-none"
        style={{
          fontFamily: "var(--font-display, 'Plus Jakarta Sans', sans-serif)",
          color: "var(--text-primary)",
        }}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        {title}
      </motion.h1>
      {subtitle && (
        <motion.div
          className="mt-6"
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
        >
          <span
            className="hero-badge"
            style={{
              fontFamily: "var(--font-display, 'Plus Jakarta Sans', sans-serif)",
            }}
          >
            {subtitle}
          </span>
        </motion.div>
      )}
    </div>
  );
}
