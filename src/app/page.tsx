"use client";

import { motion } from "motion/react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen canvas-grid">
      {/* Scrollable centered modal — same pattern as CardModal */}
      <motion.div
        className="min-h-full flex items-start justify-center py-12 sm:py-16 px-4 sm:px-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <motion.div
          className="relative w-full max-w-[680px] flex flex-col rounded-2xl overflow-hidden"
          style={{
            backgroundColor: "var(--card-bg)",
            border: "1px solid var(--card-border)",
            boxShadow:
              "0 25px 50px -12px rgba(0, 0, 0, 0.08), 0 0 0 1px rgba(0, 0, 0, 0.03)",
          }}
          initial={{ opacity: 0, scale: 0.96, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{
            type: "spring",
            damping: 30,
            stiffness: 400,
            mass: 0.8,
          }}
        >
          {/* Content */}
          <div className="px-8 md:px-16 py-14 md:py-20">
            {/* Title */}
            <h1
              className="text-3xl md:text-4xl font-semibold text-center tracking-tight"
              style={{
                fontFamily:
                  "var(--font-display, 'Plus Jakarta Sans', sans-serif)",
                color: "var(--text-primary)",
              }}
            >
              Teacher Workspace
            </h1>

            {/* Badge */}
            <div className="flex justify-center mt-4">
              <span
                className="inline-block px-4 py-1.5 text-sm font-medium rounded-full"
                style={{
                  color: "var(--accent)",
                  border: "1px solid rgba(0, 100, 255, 0.2)",
                }}
              >
                Brand Guidelines
              </span>
            </div>

            {/* Video illustration */}
            <div className="flex justify-center mt-10 mb-10">
              <div className="w-[240px] h-[240px] md:w-[280px] md:h-[280px] overflow-hidden rounded-lg">
                <video
                  src="/images/manifesto-illustration.mp4"
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-contain"
                />
              </div>
            </div>

            {/* Manifesto label */}
            <p
              className="text-center text-sm font-medium tracking-wide"
              style={{ color: "var(--text-primary)" }}
            >
              Manifesto
            </p>

            {/* Divider */}
            <div className="flex justify-center my-5">
              <div
                className="w-12 h-px"
                style={{ backgroundColor: "var(--card-border)" }}
              />
            </div>

            {/* Heading */}
            <h2
              className="text-2xl md:text-[28px] font-semibold leading-tight text-center"
              style={{
                fontFamily:
                  "var(--font-display, 'Plus Jakarta Sans', sans-serif)",
                color: "var(--text-primary)",
              }}
            >
              Utility-first at its core
              <br />
              Human-first at the surface
            </h2>

            {/* Body text — same style as CardModal paragraph sections */}
            <div className="mt-8 space-y-5">
              <p
                className="text-[15px] leading-relaxed"
                style={{ color: "var(--text-secondary)" }}
              >
                Teachers across Singapore navigate dozens of platforms, relearn
                seasonal workflows, and chase fragmented information &mdash; all
                before they can do what they actually came to do: teach. Their
                tools weren&rsquo;t built for how they actually work.
              </p>

              <p
                className="text-[15px] leading-relaxed"
                style={{ color: "var(--text-secondary)" }}
              >
                So we asked:{" "}
                <em style={{ color: "var(--text-primary)" }}>
                  what if the tool got out of the way?
                </em>
              </p>

              <p
                className="text-[15px] leading-relaxed"
                style={{ color: "var(--text-secondary)" }}
              >
                Teacher Workspace is utility-first at its core, human-first at
                the surface. Teachers move through tasks quickly and confidently
                &mdash; supported by a design that stays out of the way and
                simply works.
              </p>

              <p
                className="text-[15px] leading-relaxed"
                style={{ color: "var(--text-secondary)" }}
              >
                Brand matters here because how something looks is how it&rsquo;s
                understood before anyone reads a word. A teacher opening a new
                platform &mdash; already tired, already behind &mdash; makes a
                split-second judgment: is this for me? That judgment lives in the
                typeface, the whitespace, the tone. An approachable aesthetic
                reduces intimidation. Visual calm reduces cognitive load.
                Consistency builds trust. Brand is how we make the invisible
                promise visible: this was made with you in mind.
              </p>

              <div>
                <p
                  className="text-[15px] leading-relaxed mb-2"
                  style={{ color: "var(--text-secondary)" }}
                >
                  Four principles guide every decision:
                </p>
                <ul
                  className="list-disc pl-5 space-y-1 text-[15px] leading-relaxed"
                  style={{ color: "var(--text-secondary)" }}
                >
                  <li>
                    <span
                      className="font-medium"
                      style={{ color: "var(--text-primary)" }}
                    >
                      Utility by Default
                    </span>{" "}
                    &mdash; Function before form.
                  </li>
                  <li>
                    <span
                      className="font-medium"
                      style={{ color: "var(--text-primary)" }}
                    >
                      Kind at Surface
                    </span>{" "}
                    &mdash; Familiar, gentle, never intimidating.
                  </li>
                  <li>
                    <span
                      className="font-medium"
                      style={{ color: "var(--text-primary)" }}
                    >
                      Calm Guidance
                    </span>{" "}
                    &mdash; Elevate support when stakes are high.
                  </li>
                  <li>
                    <span
                      className="font-medium"
                      style={{ color: "var(--text-primary)" }}
                    >
                      Light Weight
                    </span>{" "}
                    &mdash; Responsive, never sluggish.
                  </li>
                </ul>
              </div>

              <p
                className="text-[15px] leading-relaxed"
                style={{ color: "var(--text-secondary)" }}
              >
                One test: Does this help teachers work faster with less stress?
                If not &mdash; we don&rsquo;t build it.
              </p>
            </div>

            {/* CTA Button */}
            <div className="flex justify-center mt-10">
              <Link
                href="/canvas"
                className="inline-flex items-center px-6 py-3 text-sm font-medium text-white rounded-full transition-colors"
                style={{
                  backgroundColor: "var(--accent)",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.backgroundColor =
                    "var(--accent-hover)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.backgroundColor = "var(--accent)")
                }
              >
                Open Brand Workspace
              </Link>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
