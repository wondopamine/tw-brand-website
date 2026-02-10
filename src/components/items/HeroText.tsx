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
          fontFamily: "var(--font-display, 'Sora', sans-serif)",
          color: "var(--text-primary)",
        }}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        {title}
      </motion.h1>
      {subtitle && (
        <motion.p
          className="mt-4 text-xl md:text-2xl lg:text-3xl font-medium tracking-wide"
          style={{
            fontFamily: "var(--font-display, 'Sora', sans-serif)",
            color: "var(--text-secondary)",
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
}
