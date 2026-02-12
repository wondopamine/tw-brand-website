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
        className="text-3xl md:text-4xl lg:text-[60px] font-bold tracking-tight leading-[1.1]"
        style={{
          fontFamily: "var(--font-display, 'Plus Jakarta Sans', sans-serif)",
          color: "var(--accent)",
        }}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        {title}
        {subtitle && (
          <>
            <br />
            {subtitle}
          </>
        )}
      </motion.h1>
    </div>
  );
}
