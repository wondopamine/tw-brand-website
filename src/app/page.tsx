"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="min-h-screen">
      <motion.div
        className="min-h-full flex flex-col items-center py-12 sm:py-16 px-4 sm:px-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        {/* ===== Title + Badge — outside the card ===== */}
        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            type: "spring",
            damping: 30,
            stiffness: 400,
            mass: 0.8,
          }}
        >
          <h1 className="font-display text-3xl md:text-4xl font-semibold tracking-tight text-text-primary">
            Brand Operating System
          </h1>

          <div className="flex justify-center mt-4">
            <span className="inline-block px-4 py-1.5 text-sm font-medium rounded-lg text-accent border border-accent/20">
              for Teacher &amp; School portfolio
            </span>
          </div>
        </motion.div>

        {/* ===== Manifesto Card — starts from video ===== */}
        <motion.div
          className="relative w-full max-w-[680px] flex flex-col rounded-2xl overflow-hidden bg-card-bg border border-card-border shadow-[0_25px_50px_-12px_rgba(0,0,0,0.08),0_0_0_1px_rgba(0,0,0,0.03)]"
          initial={{ opacity: 0, scale: 0.96, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{
            type: "spring",
            damping: 30,
            stiffness: 400,
            mass: 0.8,
            delay: 0.05,
          }}
        >
          {/* Content */}
          <div className="px-8 md:px-16 py-14 md:py-20">
            {/* Video illustration */}
            <div className="flex justify-center mb-10">
              <div className="w-[240px] h-[240px] md:w-[280px] md:h-[280px] overflow-hidden rounded-lg">
                <video
                  src="/images/manifesto-illustration.mp4"
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-contain"
                  onError={(e) => {
                    (e.currentTarget as HTMLVideoElement).style.display = "none";
                  }}
                />
              </div>
            </div>

            {/* Manifesto label */}
            <p className="text-center text-sm font-medium tracking-wide text-text-primary">
              Manifesto
            </p>

            {/* Divider */}
            <div className="flex justify-center my-5">
              <div className="w-12 h-px bg-card-border" />
            </div>

            {/* Heading */}
            <h2 className="font-display text-2xl md:text-[28px] font-semibold leading-tight text-center text-text-primary">
              Utility-first at its core
              <br />
              Human-first at the surface
            </h2>

            {/* Body text */}
            <div className="mt-8 space-y-5">
              <p className="text-[15px] leading-relaxed text-text-secondary">
                Teachers across Singapore navigate dozens of platforms, relearn
                seasonal workflows, and chase fragmented information &mdash; all
                before they can do what they actually came to do: teach. Their
                tools weren&rsquo;t built for how they actually work.
              </p>

              <p className="text-[15px] leading-relaxed text-text-secondary">
                So we asked:{" "}
                <em className="text-text-primary">
                  what if the tool got out of the way?
                </em>
              </p>

              <p className="text-[15px] leading-relaxed text-text-secondary">
                The Teacher &amp; School portfolio is utility-first at its core,
                human-first at the surface. Every product we build for teachers
                &mdash; Teacher Workspace as the flagship, alongside the
                supporting products in the portfolio &mdash; moves teachers
                through their day with less friction and more confidence.
              </p>

              <p className="text-[15px] leading-relaxed text-text-secondary">
                Brand matters here because how something looks is how it&rsquo;s
                understood before anyone reads a word. A teacher opening a new
                platform &mdash; already tired, already behind &mdash; makes a
                split-second judgment: is this for me? That judgment lives in the
                typeface, the whitespace, the tone. An approachable aesthetic
                reduces intimidation. Visual calm reduces cognitive load.
                Consistency builds trust. Brand is how we make the invisible
                promise visible: this was made with you in mind.
              </p>

              <p className="text-[15px] leading-relaxed text-text-secondary">
                One test: Does this help teachers work faster with less stress?
                If not &mdash; we don&rsquo;t build it.
              </p>
            </div>

            {/* CTA Button */}
            <div className="flex justify-center mt-10">
              <Button
                size="cta"
                variant="default"
                nativeButton={false}
                render={<Link href="/canvas">Open the Brand Canvas</Link>}
              />
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
