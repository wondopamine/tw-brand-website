"use client";

import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";

const pillars = [
  {
    number: "01",
    title: "Clarity",
    description:
      "Every element should communicate its purpose immediately. No ambiguity, no guessing. Teachers should know exactly what they\u2019re looking at and what to do next.",
    icon: "\u25CB", // circle
  },
  {
    number: "02",
    title: "Action Oriented",
    description:
      "Design that drives action. Teachers are busy \u2014 every interaction should move them forward. Reduce friction, surface next steps, and respect their time.",
    icon: "\u2192", // arrow
  },
  {
    number: "03",
    title: "Kindness & Humanity",
    description:
      "Technology that feels human. Warm, approachable, and respectful of the people who use it. Our product should feel like a helpful colleague, not a cold machine.",
    icon: "\u2661", // heart
  },
  {
    number: "04",
    title: "Delight",
    description:
      "Moments of unexpected joy. Small touches that make the experience feel crafted with care. Delight is the cherry on top of a solid, trustworthy foundation.",
    icon: "\u2726", // star
  },
];

const principles = [
  {
    number: "01",
    title: "Utility by Default",
    description:
      "Everything we build must be useful first. Aesthetics, delight, and brand expression are layered on top of a foundation of genuine utility.",
    prioritize: [
      "Core functionality that saves teachers time",
      "Clear information hierarchy",
      "Accessible, universal design patterns",
    ],
    deprioritize: [
      "Decorative elements that don\u2019t serve function",
      "Novel interactions that require learning",
      "Brand expression that compromises usability",
    ],
  },
  {
    number: "02",
    title: "Kind at Surface",
    description:
      "The surface layer \u2014 what teachers see and touch first \u2014 must always communicate warmth, care, and respect.",
    prioritize: [
      "Warm, encouraging language",
      "Gentle error states with clear next steps",
      "Approachable visual design",
    ],
    deprioritize: [
      "Technical error codes or stack traces",
      "Cold, transactional language",
      "Intimidating or complex UI chrome",
    ],
  },
  {
    number: "03",
    title: "Calm Guidance",
    description:
      "Like a calm, knowledgeable colleague, we surface the right information at the right time. Progressive disclosure is our default pattern.",
    prioritize: [
      "Progressive disclosure and contextual help",
      "Sensible defaults that reduce decisions",
      "White space and visual breathing room",
    ],
    deprioritize: [
      "Showing all options at once",
      "Modal interruptions for non-critical info",
      "Dense, information-heavy layouts",
    ],
  },
  {
    number: "04",
    title: "Light Weight",
    description:
      "Both in feel and in load. Teacher Workspace should feel fast, responsive, and unburdened. Every added element must justify its existence.",
    prioritize: [
      "Fast load times and snappy interactions",
      "Minimal visual clutter",
      "Simple, focused task flows",
    ],
    deprioritize: [
      "Heavy imagery or background media",
      "Multi-step processes when single-step is possible",
      "Dense dashboards with competing elements",
    ],
  },
];

const voiceAttributes = {
  weAre: [
    "Warm but not sappy",
    "Clear but not cold",
    "Helpful but not pushy",
    "Professional but not stiff",
    "Confident but not arrogant",
  ],
  weAreNot: [
    "Corporate-speak or jargon-heavy",
    "Overly casual or slang-filled",
    "Condescending or preachy",
    "Vague or wishy-washy",
    "Salesy or hype-driven",
  ],
};

const teacherQuotes = [
  {
    quote:
      "I need something that just works. I don\u2019t have time to figure out complicated software.",
    author: "Middle school teacher",
  },
  {
    quote:
      "The best tools feel like they were made by someone who understands what my day actually looks like.",
    author: "High school teacher",
  },
  {
    quote:
      "I want to feel safe trying new features. If I make a mistake, I need to know I can undo it easily.",
    author: "Elementary school teacher",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

const stagger = {
  visible: {
    transition: { staggerChildren: 0.1 },
  },
};

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[var(--canvas-bg)] text-[var(--text-primary)]">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-[var(--canvas-bg)]/80 border-b border-[var(--card-border)]">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <span className="font-[family-name:var(--font-display)] font-semibold text-lg">
            Teacher Workspace
          </span>
          <Link
            href="/"
            className="text-sm text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors"
          >
            Brand Canvas &rarr;
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-40 pb-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={stagger}
          >
            <motion.div
              variants={fadeUp}
              transition={{ duration: 0.6 }}
              className="inline-block mb-8 px-5 py-2 text-sm font-medium text-[var(--accent)] bg-[var(--accent-light)] border border-[var(--accent)]/15 rounded-full"
            >
              Brand Manifesto
            </motion.div>

            <motion.h1
              variants={fadeUp}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-[family-name:var(--font-display)] text-5xl md:text-7xl font-semibold tracking-tight leading-[1.1] mb-6"
            >
              Kind Utility
            </motion.h1>

            <motion.p
              variants={fadeUp}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl md:text-2xl text-[var(--text-secondary)] leading-relaxed max-w-2xl mx-auto mb-12"
            >
              Teacher Workspace sits at the intersection of high utility and
              high warmth. Tools that are powerful yet feel personal, efficient
              yet humane.
            </motion.p>

            {/* Quadrant visual */}
            <motion.div
              variants={fadeUp}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="max-w-md mx-auto"
            >
              <div className="relative aspect-square border border-[var(--card-border)] rounded-2xl bg-[var(--card-bg)] p-8">
                {/* Axes */}
                <div className="absolute left-1/2 top-8 bottom-8 w-px bg-[var(--card-border)]" />
                <div className="absolute top-1/2 left-8 right-8 h-px bg-[var(--card-border)]" />

                {/* Labels */}
                <span className="absolute top-3 left-1/2 -translate-x-1/2 text-xs text-[var(--text-secondary)] uppercase tracking-widest">
                  Warmth
                </span>
                <span className="absolute bottom-3 right-4 text-xs text-[var(--text-secondary)] uppercase tracking-widest">
                  Utility
                </span>

                {/* Quadrant labels */}
                <span className="absolute top-12 left-10 text-xs text-[var(--text-secondary)]/60">
                  High Warmth
                  <br />
                  Low Utility
                </span>
                <span className="absolute bottom-12 left-10 text-xs text-[var(--text-secondary)]/60">
                  Low Warmth
                  <br />
                  Low Utility
                </span>
                <span className="absolute bottom-12 right-10 text-xs text-[var(--text-secondary)]/60 text-right">
                  Low Warmth
                  <br />
                  High Utility
                </span>

                {/* TW position — top-right */}
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.8, type: "spring", stiffness: 200 }}
                  className="absolute top-[22%] right-[18%] flex flex-col items-center"
                >
                  <div className="w-4 h-4 rounded-full bg-[var(--accent)] shadow-lg shadow-[var(--accent)]/30" />
                  <span className="mt-2 text-xs font-semibold text-[var(--accent)]">
                    TW
                  </span>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Photo strip */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              {
                src: "/images/teachers-classroom.jpg",
                alt: "Teacher guiding students with tablets in classroom",
              },
              {
                src: "/images/teachers-classroom-2.png",
                alt: "Teacher leaning in to help students",
              },
              {
                src: "/images/teachers-classroom-3.png",
                alt: "Teacher engaging with students using tablets",
              },
            ].map((img, i) => (
              <motion.div
                key={img.src}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="relative aspect-[16/10] rounded-2xl overflow-hidden bg-[var(--card-border)]"
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-cover"
                />
              </motion.div>
            ))}
          </div>
          <p className="text-center text-sm text-[var(--text-secondary)] mt-6">
            Real classrooms, real teachers &mdash; every design decision starts
            here.
          </p>
        </div>
      </section>

      {/* Four Pillars */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={stagger}
          >
            <motion.p
              variants={fadeUp}
              transition={{ duration: 0.5 }}
              className="text-sm font-medium text-[var(--accent)] uppercase tracking-widest mb-3"
            >
              Manifesto
            </motion.p>
            <motion.h2
              variants={fadeUp}
              transition={{ duration: 0.5 }}
              className="font-[family-name:var(--font-display)] text-3xl md:text-4xl font-semibold mb-16"
            >
              The Four Pillars
            </motion.h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {pillars.map((pillar, i) => (
              <motion.div
                key={pillar.number}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="group relative p-8 rounded-2xl border border-[var(--card-border)] bg-[var(--card-bg)] hover:border-[var(--accent)]/30 transition-colors"
              >
                <div className="flex items-start gap-4 mb-4">
                  <span className="flex-shrink-0 w-10 h-10 rounded-xl bg-[var(--accent-light)] text-[var(--accent)] flex items-center justify-center text-lg">
                    {pillar.icon}
                  </span>
                  <div>
                    <span className="text-xs text-[var(--text-secondary)] font-medium">
                      {pillar.number}
                    </span>
                    <h3 className="font-[family-name:var(--font-display)] text-xl font-semibold">
                      {pillar.title}
                    </h3>
                  </div>
                </div>
                <p className="text-[var(--text-secondary)] leading-relaxed">
                  {pillar.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Kind Utility in Action */}
      <section className="py-24 px-6 bg-[var(--accent-light)]/30">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={stagger}
          >
            <motion.h2
              variants={fadeUp}
              transition={{ duration: 0.5 }}
              className="font-[family-name:var(--font-display)] text-3xl md:text-4xl font-semibold mb-16 text-center"
            >
              Kind Utility in Action
            </motion.h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: "Approachable",
                items: [
                  "First impressions that welcome rather than overwhelm",
                  "Low barrier to entry",
                  "Familiar patterns adapted thoughtfully",
                ],
              },
              {
                title: "Frictionless",
                items: [
                  "Smooth, intuitive flows",
                  "Respect teachers\u2019 limited time and cognitive load",
                  "Progressive disclosure over information overload",
                ],
              },
              {
                title: "Safe",
                items: [
                  "Confidence to explore without fear",
                  "Forgiving interfaces with easy undo",
                  "Clear consequences before destructive actions",
                ],
              },
              {
                title: "Reliable",
                items: [
                  "Consistent behavior that builds trust over time",
                  "Teachers can depend on it every day",
                  "Predictable patterns across the product",
                ],
              },
            ].map((col, i) => (
              <motion.div
                key={col.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="p-6 rounded-2xl bg-[var(--card-bg)] border border-[var(--card-border)]"
              >
                <h3 className="font-[family-name:var(--font-display)] font-semibold text-lg mb-4">
                  {col.title}
                </h3>
                <ul className="space-y-3">
                  {col.items.map((item) => (
                    <li
                      key={item}
                      className="text-sm text-[var(--text-secondary)] leading-relaxed flex gap-2"
                    >
                      <span className="text-[var(--accent)] mt-0.5 flex-shrink-0">
                        &bull;
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Teacher Quotes */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={stagger}
          >
            <motion.p
              variants={fadeUp}
              transition={{ duration: 0.5 }}
              className="text-sm font-medium text-[var(--accent)] uppercase tracking-widest mb-3"
            >
              Always From Teachers
            </motion.p>
            <motion.h2
              variants={fadeUp}
              transition={{ duration: 0.5 }}
              className="font-[family-name:var(--font-display)] text-3xl md:text-4xl font-semibold mb-4"
            >
              What Teachers Tell Us
            </motion.h2>
            <motion.p
              variants={fadeUp}
              transition={{ duration: 0.5 }}
              className="text-[var(--text-secondary)] text-lg mb-16 max-w-2xl"
            >
              Every design decision begins with a simple question: does this
              serve teachers?
            </motion.p>
          </motion.div>

          <div className="space-y-6">
            {teacherQuotes.map((q, i) => (
              <motion.blockquote
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="relative pl-8 border-l-3 border-[var(--accent)] py-4"
              >
                <p className="text-lg md:text-xl leading-relaxed text-[var(--text-primary)] mb-2">
                  &ldquo;{q.quote}&rdquo;
                </p>
                <cite className="text-sm text-[var(--text-secondary)] not-italic">
                  &mdash; {q.author}
                </cite>
              </motion.blockquote>
            ))}
          </div>
        </div>
      </section>

      {/* Brand Principles */}
      <section className="py-24 px-6 bg-[var(--card-bg)]">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={stagger}
          >
            <motion.p
              variants={fadeUp}
              transition={{ duration: 0.5 }}
              className="text-sm font-medium text-[var(--accent)] uppercase tracking-widest mb-3"
            >
              Guiding Every Decision
            </motion.p>
            <motion.h2
              variants={fadeUp}
              transition={{ duration: 0.5 }}
              className="font-[family-name:var(--font-display)] text-3xl md:text-4xl font-semibold mb-6"
            >
              Brand Principles
            </motion.h2>
            <motion.p
              variants={fadeUp}
              transition={{ duration: 0.5 }}
              className="text-[var(--text-secondary)] text-lg mb-16 max-w-2xl"
            >
              Ordered by priority &mdash; when principles conflict,
              higher-priority principles take precedence.
            </motion.p>
          </motion.div>

          <div className="space-y-8">
            {principles.map((p, i) => (
              <motion.div
                key={p.number}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                className="p-8 rounded-2xl border border-[var(--card-border)] bg-[var(--canvas-bg)]"
              >
                <div className="flex items-baseline gap-3 mb-3">
                  <span className="text-sm font-medium text-[var(--accent)]">
                    {p.number}
                  </span>
                  <h3 className="font-[family-name:var(--font-display)] text-xl font-semibold">
                    {p.title}
                  </h3>
                </div>
                <p className="text-[var(--text-secondary)] leading-relaxed mb-6 max-w-3xl">
                  {p.description}
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-sm font-semibold text-emerald-600 mb-3 uppercase tracking-wide">
                      Prioritize
                    </h4>
                    <ul className="space-y-2">
                      {p.prioritize.map((item) => (
                        <li
                          key={item}
                          className="text-sm text-[var(--text-secondary)] flex gap-2"
                        >
                          <span className="text-emerald-500">+</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-red-400 mb-3 uppercase tracking-wide">
                      Deprioritize
                    </h4>
                    <ul className="space-y-2">
                      {p.deprioritize.map((item) => (
                        <li
                          key={item}
                          className="text-sm text-[var(--text-secondary)] flex gap-2"
                        >
                          <span className="text-red-400">&minus;</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Voice & Tone */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={stagger}
          >
            <motion.p
              variants={fadeUp}
              transition={{ duration: 0.5 }}
              className="text-sm font-medium text-[var(--accent)] uppercase tracking-widest mb-3"
            >
              Communication
            </motion.p>
            <motion.h2
              variants={fadeUp}
              transition={{ duration: 0.5 }}
              className="font-[family-name:var(--font-display)] text-3xl md:text-4xl font-semibold mb-4"
            >
              Voice & Tone
            </motion.h2>
            <motion.p
              variants={fadeUp}
              transition={{ duration: 0.5 }}
              className="text-[var(--text-secondary)] text-lg mb-16 max-w-2xl"
            >
              Our voice is the consistent personality behind everything we
              write. Our tone shifts depending on context &mdash; but the voice
              remains the same.
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5 }}
              className="p-8 rounded-2xl border border-[var(--card-border)] bg-[var(--card-bg)]"
            >
              <h3 className="font-[family-name:var(--font-display)] font-semibold text-lg mb-6">
                We Are
              </h3>
              <ul className="space-y-3">
                {voiceAttributes.weAre.map((item) => (
                  <li
                    key={item}
                    className="text-[var(--text-secondary)] flex gap-3 items-center"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="p-8 rounded-2xl border border-[var(--card-border)] bg-[var(--card-bg)]"
            >
              <h3 className="font-[family-name:var(--font-display)] font-semibold text-lg mb-6">
                We Are Not
              </h3>
              <ul className="space-y-3">
                {voiceAttributes.weAreNot.map((item) => (
                  <li
                    key={item}
                    className="text-[var(--text-secondary)] flex gap-3 items-center"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--card-border)] flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Trust Equation highlight */}
      <section className="py-24 px-6 bg-[var(--accent)] text-white">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-sm font-medium uppercase tracking-widest mb-6 text-white/70">
              The Trust Equation
            </p>
            <h2 className="font-[family-name:var(--font-display)] text-3xl md:text-4xl font-semibold mb-6 leading-tight">
              Perceived Quality = Functional Reliability + Visual Polish
            </h2>
            <p className="text-lg text-white/80 max-w-2xl mx-auto">
              When both are high, teachers move from tolerance to advocacy. Good
              design builds trust. Visual quality signals reliability &mdash; the
              difference between a tool teachers tolerate and one they love.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Design Empathy Principles */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={stagger}
          >
            <motion.h2
              variants={fadeUp}
              transition={{ duration: 0.5 }}
              className="font-[family-name:var(--font-display)] text-3xl md:text-4xl font-semibold mb-12"
            >
              Design Principles Rooted in Empathy
            </motion.h2>
          </motion.div>

          <div className="space-y-4">
            {[
              "Observe before designing \u2014 spend time in classrooms",
              "Test with real teachers, not proxies",
              "Respect the constraints of the teaching profession",
              "Celebrate the craft of teaching in our visual language",
              "Default to simplicity \u2014 complexity is the enemy of a busy teacher",
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                className="flex gap-4 items-start p-5 rounded-xl border border-[var(--card-border)] bg-[var(--card-bg)]"
              >
                <span className="w-8 h-8 rounded-lg bg-[var(--accent-light)] text-[var(--accent)] flex items-center justify-center text-sm font-semibold flex-shrink-0">
                  {i + 1}
                </span>
                <p className="text-[var(--text-primary)] leading-relaxed">
                  {item}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 px-6 border-t border-[var(--card-border)]">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <span className="font-[family-name:var(--font-display)] font-semibold">
              Teacher Workspace
            </span>
            <span className="text-[var(--text-secondary)] ml-2 text-sm">
              by TransformX
            </span>
          </div>
          <Link
            href="/"
            className="text-sm text-[var(--accent)] hover:text-[var(--accent-hover)] transition-colors"
          >
            Explore Brand Canvas &rarr;
          </Link>
        </div>
      </footer>
    </div>
  );
}
