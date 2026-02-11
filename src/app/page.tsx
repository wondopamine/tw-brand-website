"use client";

import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const stagger = {
  visible: {
    transition: { staggerChildren: 0.08 },
  },
};

export default function Home() {
  return (
    <div className="min-h-screen canvas-grid flex items-center justify-center px-4 py-16 md:py-24">
      {/* Centered card on grid background */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={stagger}
        className="w-full max-w-[680px] bg-[var(--card-bg)] rounded-2xl border border-[var(--card-border)] shadow-sm px-8 md:px-16 py-14 md:py-20"
      >
        {/* Title */}
        <motion.h1
          variants={fadeUp}
          transition={{ duration: 0.5 }}
          className="font-[family-name:var(--font-display)] text-3xl md:text-4xl font-semibold text-center tracking-tight"
        >
          Teacher Workspace
        </motion.h1>

        {/* Badge */}
        <motion.div
          variants={fadeUp}
          transition={{ duration: 0.5 }}
          className="flex justify-center mt-4"
        >
          <span className="inline-block px-4 py-1.5 text-sm font-medium text-[var(--accent)] border border-[var(--accent)]/20 rounded-full">
            Brand Guidelines
          </span>
        </motion.div>

        {/* Illustration */}
        <motion.div
          variants={fadeUp}
          transition={{ duration: 0.5 }}
          className="flex justify-center mt-10 mb-10"
        >
          <div className="relative w-[240px] h-[240px] md:w-[280px] md:h-[280px]">
            <Image
              src="/images/manifesto-illustration.png"
              alt="Teacher sitting at desk illustration"
              fill
              className="object-contain"
              priority
            />
          </div>
        </motion.div>

        {/* Manifesto label */}
        <motion.p
          variants={fadeUp}
          transition={{ duration: 0.5 }}
          className="text-center text-sm font-medium text-[var(--text-primary)] tracking-wide"
        >
          Manifesto
        </motion.p>

        {/* Divider */}
        <motion.div
          variants={fadeUp}
          transition={{ duration: 0.5 }}
          className="flex justify-center my-5"
        >
          <div className="w-12 h-px bg-[var(--card-border)]" />
        </motion.div>

        {/* Heading */}
        <motion.h2
          variants={fadeUp}
          transition={{ duration: 0.5 }}
          className="font-[family-name:var(--font-display)] text-2xl md:text-[28px] font-semibold leading-tight text-center"
        >
          Utility-first at its core
          <br />
          Human-first at the surface
        </motion.h2>

        {/* Body text */}
        <div className="mt-8 space-y-5 text-[15px] leading-relaxed text-[var(--text-secondary)]">
          <motion.p variants={fadeUp} transition={{ duration: 0.5 }}>
            Teachers across Singapore navigate dozens of platforms, relearn
            seasonal workflows, and chase fragmented information — all before
            they can do what they actually came to do: teach. Their tools
            weren&rsquo;t built for how they actually work.
          </motion.p>

          <motion.p variants={fadeUp} transition={{ duration: 0.5 }}>
            So we asked:{" "}
            <em className="text-[var(--text-primary)]">
              what if the tool got out of the way?
            </em>
          </motion.p>

          <motion.p variants={fadeUp} transition={{ duration: 0.5 }}>
            Teacher Workspace is utility-first at its core, human-first at the
            surface. Teachers move through tasks quickly and confidently —
            supported by a design that stays out of the way and simply works.
          </motion.p>

          <motion.p variants={fadeUp} transition={{ duration: 0.5 }}>
            Brand matters here because how something looks is how it&rsquo;s
            understood before anyone reads a word. A teacher opening a new
            platform — already tired, already behind — makes a split-second
            judgment: is this for me? That judgment lives in the typeface, the
            whitespace, the tone. An approachable aesthetic reduces
            intimidation. Visual calm reduces cognitive load. Consistency builds
            trust. Brand is how we make the invisible promise visible: this was
            made with you in mind.
          </motion.p>

          <motion.div variants={fadeUp} transition={{ duration: 0.5 }}>
            <p className="mb-2">Four principles guide every decision:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>
                <span className="text-[var(--text-primary)] font-medium">
                  Utility by Default
                </span>{" "}
                — Function before form.
              </li>
              <li>
                <span className="text-[var(--text-primary)] font-medium">
                  Kind at Surface
                </span>{" "}
                — Familiar, gentle, never intimidating.
              </li>
              <li>
                <span className="text-[var(--text-primary)] font-medium">
                  Calm Guidance
                </span>{" "}
                — Elevate support when stakes are high.
              </li>
              <li>
                <span className="text-[var(--text-primary)] font-medium">
                  Light Weight
                </span>{" "}
                — Responsive, never sluggish.
              </li>
            </ul>
          </motion.div>

          <motion.p variants={fadeUp} transition={{ duration: 0.5 }}>
            One test: Does this help teachers work faster with less stress? If
            not — we don&rsquo;t build it.
          </motion.p>
        </div>

        {/* CTA Button */}
        <motion.div
          variants={fadeUp}
          transition={{ duration: 0.5 }}
          className="flex justify-center mt-10"
        >
          <Link
            href="/canvas"
            className="inline-flex items-center px-6 py-3 text-sm font-medium text-white bg-[var(--accent)] hover:bg-[var(--accent-hover)] rounded-full transition-colors"
          >
            Open Brand Workspace
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}
