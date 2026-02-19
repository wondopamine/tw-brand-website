export interface ModalSection {
  type: "heading" | "paragraph" | "list" | "quote" | "divider" | "highlight-box" | "two-column" | "quadrant";
  title?: string;
  content?: string;
  items?: string[];
  columns?: { title: string; items: string[] }[];
  quadrantLabels?: {
    topLeft: string;
    topRight: string;
    bottomLeft: string;
    bottomRight: string;
    xAxis: string;
    yAxis: string;
  };
  variant?: "accent" | "warning" | "success" | "neutral";
}

export interface ModalContent {
  id: string;
  title: string;
  subtitle?: string;
  sections: ModalSection[];
}

export const modalContents: Record<string, ModalContent> = {
  aesthetics: {
    id: "aesthetics",
    title: "Why Aesthetic Matters?",
    subtitle: "Design as a trust signal",
    sections: [
      {
        type: "paragraph",
        content:
          "Good design builds trust. When teachers open a tool that looks thoughtful and polished, they feel confident it was built with the same care applied to its functionality. Visual quality signals reliability \u2014 the difference between a tool teachers tolerate and one they love.",
      },
      { type: "divider" },
      {
        type: "heading",
        title: "Design Builds Confidence",
      },
      {
        type: "paragraph",
        content:
          "Teachers interact with dozens of digital tools daily. In a landscape of clunky, utilitarian ed-tech, visual quality becomes a differentiator. A polished interface tells teachers: \u201CWe care about your experience as much as the outcome.\u201D",
      },
      {
        type: "highlight-box",
        title: "The Trust Equation",
        content:
          "Perceived Quality = Functional Reliability + Visual Polish. When both are high, teachers move from tolerance to advocacy.",
        variant: "accent",
      },
      { type: "divider" },
      {
        type: "heading",
        title: "Visual Quality as a Signal",
      },
      {
        type: "list",
        items: [
          "Thoughtful typography communicates professionalism",
          "Consistent spacing creates a sense of calm and order",
          "Intentional color use guides attention without overwhelming",
          "Polished micro-interactions signal craftsmanship",
        ],
      },
      { type: "divider" },
      {
        type: "heading",
        title: "What This Means in Practice",
      },
      {
        type: "paragraph",
        content:
          "Every pixel matters. From the border-radius on our buttons to the easing curves on our animations, each design decision should reinforce the feeling that Teacher Workspace is a premium, trustworthy tool built by people who understand and respect the teaching profession.",
      },
    ],
  },

  "about-guidelines": {
    id: "about-guidelines",
    title: "About TW Brand Guidelines",
    subtitle: "Scope and purpose of this document",
    sections: [
      {
        type: "heading",
        title: "This Document Is About",
      },
      {
        type: "list",
        items: [
          "Defining the visual and verbal identity of Teacher Workspace",
          "Establishing consistent design principles across all touchpoints",
          "Providing actionable guidelines for brand expression",
          "Aligning the team on what makes TW feel like TW",
          "Serving as a living reference for designers, developers, and content creators",
        ],
      },
      { type: "divider" },
      {
        type: "heading",
        title: "This Document Is NOT About",
      },
      {
        type: "list",
        items: [
          "Comprehensive UI component specifications (see FlowDS design system)",
          "Detailed interaction patterns or micro-interaction specs",
          "Marketing strategy or go-to-market plans",
          "Specific product feature documentation",
          "Rigid rules that stifle creativity \u2014 these are guidelines, not handcuffs",
        ],
      },
      { type: "divider" },
      {
        type: "highlight-box",
        title: "A Living Document",
        content:
          "Brand guidelines evolve with the product. This document captures our current understanding and will be updated as Teacher Workspace grows and matures. If something feels off or outdated, speak up.",
        variant: "neutral",
      },
    ],
  },

  manifesto: {
    id: "manifesto",
    title: "Manifesto",
    subtitle: "Utility-first at its core. Human-first at the surface.",
    sections: [
      {
        type: "paragraph",
        content:
          "Teachers across Singapore navigate dozens of platforms, relearn seasonal workflows, and chase fragmented information \u2014 all before they can do what they actually came to do: teach. Their tools weren\u2019t built for how they actually work.",
      },
      {
        type: "paragraph",
        content:
          "So we asked: what if the tool got out of the way?",
      },
      {
        type: "paragraph",
        content:
          "Teacher Workspace is utility-first at its core, human-first at the surface. Teachers move through tasks quickly and confidently \u2014 supported by a design that stays out of the way and simply works.",
      },
      {
        type: "paragraph",
        content:
          "Brand matters here because how something looks is how it\u2019s understood before anyone reads a word. A teacher opening a new platform \u2014 already tired, already behind \u2014 makes a split-second judgment: is this for me? That judgment lives in the typeface, the whitespace, the tone. An approachable aesthetic reduces intimidation. Visual calm reduces cognitive load. Consistency builds trust. Brand is how we make the invisible promise visible: this was made with you in mind.",
      },
      { type: "divider" },
      {
        type: "heading",
        title: "Four Principles Guide Every Decision",
      },
      {
        type: "highlight-box",
        title: "Utility by Default",
        content:
          "Function before form. Everything we build must be useful first. If it doesn\u2019t help a teacher do their job better, it doesn\u2019t ship.",
        variant: "accent",
      },
      {
        type: "highlight-box",
        title: "Kind at Surface",
        content:
          "Familiar, gentle, never intimidating. The surface layer \u2014 what teachers see and touch first \u2014 must always communicate warmth, care, and respect.",
        variant: "accent",
      },
      {
        type: "highlight-box",
        title: "Calm Guidance",
        content:
          "Elevate support when stakes are high. Like a calm, knowledgeable colleague, we surface the right information at the right time.",
        variant: "accent",
      },
      {
        type: "highlight-box",
        title: "Light Weight",
        content:
          "Responsive, never sluggish. Both in feel and in load. Every added element must justify its existence.",
        variant: "accent",
      },
      {
        type: "paragraph",
        content:
          "One test: Does this help teachers work faster with less stress? If not \u2014 we don\u2019t build it.",
      },
      { type: "divider" },
      {
        type: "heading",
        title: "Kind Utility in Action",
      },
      {
        type: "paragraph",
        content:
          "Teacher Workspace sits at the intersection of high utility and high warmth. We call this Kind Utility \u2014 tools that are powerful yet feel personal, efficient yet humane.",
      },
      {
        type: "quadrant",
        quadrantLabels: {
          topLeft: "High Warmth\nLow Utility",
          topRight: "High Warmth\nHigh Utility",
          bottomLeft: "Low Warmth\nLow Utility",
          bottomRight: "Low Warmth\nHigh Utility",
          xAxis: "Utility",
          yAxis: "Warmth",
        },
      },
      {
        type: "two-column",
        columns: [
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
        ],
      },
      {
        type: "two-column",
        columns: [
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
        ],
      },
    ],
  },

  "always-from-teachers": {
    id: "always-from-teachers",
    title: "Always From Teachers",
    subtitle: "Our design philosophy starts and ends with teachers",
    sections: [
      {
        type: "paragraph",
        content:
          "Every design decision at Teacher Workspace begins with a simple question: does this serve teachers? We don\u2019t design for administrators, investors, or trends. We design for the person standing in front of a classroom.",
      },
      { type: "divider" },
      {
        type: "heading",
        title: "What Teachers Tell Us",
      },
      {
        type: "quote",
        content:
          "I need something that just works. I don\u2019t have time to figure out complicated software.",
        title: "Middle school teacher",
      },
      {
        type: "quote",
        content:
          "The best tools feel like they were made by someone who understands what my day actually looks like.",
        title: "High school teacher",
      },
      {
        type: "quote",
        content:
          "I want to feel safe trying new features. If I make a mistake, I need to know I can undo it easily.",
        title: "Elementary school teacher",
      },
      { type: "divider" },
      {
        type: "heading",
        title: "Design Principles Rooted in Empathy",
      },
      {
        type: "list",
        items: [
          "Observe before designing \u2014 spend time in classrooms",
          "Test with real teachers, not proxies",
          "Respect the constraints of the teaching profession (time, energy, budget)",
          "Celebrate the craft of teaching in our visual language",
          "Default to simplicity \u2014 complexity is the enemy of a busy teacher",
        ],
      },
    ],
  },

  "voice-tone": {
    id: "voice-tone",
    title: "Voice & Tone",
    subtitle: "How we sound when we speak",
    sections: [
      {
        type: "paragraph",
        content:
          "Our voice is the consistent personality behind everything we write. Our tone shifts depending on context \u2014 but the voice remains the same. Think of it like a person: their personality stays constant, but how they speak changes based on whether they\u2019re celebrating, explaining, or apologizing.",
      },
      { type: "divider" },
      {
        type: "heading",
        title: "Voice Attributes",
      },
      {
        type: "two-column",
        columns: [
          {
            title: "We Are",
            items: [
              "Warm but not sappy",
              "Clear but not cold",
              "Helpful but not pushy",
              "Professional but not stiff",
              "Confident but not arrogant",
            ],
          },
          {
            title: "We Are Not",
            items: [
              "Corporate-speak or jargon-heavy",
              "Overly casual or slang-filled",
              "Condescending or preachy",
              "Vague or wishy-washy",
              "Salesy or hype-driven",
            ],
          },
        ],
      },
      { type: "divider" },
      {
        type: "heading",
        title: "Tone Spectrum",
      },
      {
        type: "paragraph",
        content:
          "Our tone adapts to context. In moments of success, we\u2019re celebratory. In error states, we\u2019re calm and helpful. In onboarding, we\u2019re encouraging. The underlying warmth and clarity remain constant.",
      },
      {
        type: "highlight-box",
        title: "Placeholder: MailChimp Voice & Tone Model",
        content:
          "We use a model inspired by MailChimp\u2019s Voice & Tone guide. Content is mapped across contexts (success, error, onboarding, settings, etc.) with specific tone guidelines for each. This section will be expanded with TW-specific examples.\n\nFor now, reference MailChimp\u2019s Content Style Guide as our north star for voice and tone principles.",
        variant: "neutral",
      },
      { type: "divider" },
      {
        type: "heading",
        title: "Writing Tips",
      },
      {
        type: "list",
        items: [
          "Use second person (\u201Cyou\u201D) to speak directly to teachers",
          "Lead with the benefit, not the feature",
          "Keep sentences short \u2014 one idea per sentence",
          "Use active voice over passive voice",
          "Avoid ed-tech jargon unless universally understood",
          "When in doubt, read it out loud \u2014 if it sounds robotic, rewrite it",
        ],
      },
    ],
  },

  "brand-principles": {
    id: "brand-principles",
    title: "Brand Principles",
    subtitle: "The four pillars that guide every decision",
    sections: [
      {
        type: "paragraph",
        content:
          "Our brand principles are the compass that guides every design, copy, and product decision. They are ordered by priority \u2014 when principles conflict, higher-priority principles take precedence.",
      },
      { type: "divider" },
      {
        type: "highlight-box",
        title: "01 \u2014 Utility by Default",
        content:
          "Everything we build must be useful first. Aesthetics, delight, and brand expression are layered on top of a foundation of genuine utility. If it doesn\u2019t help a teacher do their job better, it doesn\u2019t ship.",
        variant: "accent",
      },
      {
        type: "heading",
        title: "Trade-off Framework: Utility by Default",
      },
      {
        type: "two-column",
        columns: [
          {
            title: "Prioritize",
            items: [
              "Core functionality that saves teachers time",
              "Clear information hierarchy",
              "Accessible, universal design patterns",
              "Performance and reliability",
            ],
          },
          {
            title: "Deprioritize",
            items: [
              "Decorative elements that don\u2019t serve function",
              "Complex animations that slow perceived speed",
              "Novel interactions that require learning",
              "Brand expression that compromises usability",
            ],
          },
        ],
      },
      { type: "divider" },
      {
        type: "highlight-box",
        title: "02 \u2014 Kind at Surface",
        content:
          "The surface layer \u2014 what teachers see and touch first \u2014 must always communicate warmth, care, and respect. This means friendly copy, inviting colors, approachable typography, and interfaces that feel like they were made by someone who cares.",
        variant: "accent",
      },
      {
        type: "heading",
        title: "Trade-off Framework: Kind at Surface",
      },
      {
        type: "two-column",
        columns: [
          {
            title: "Prioritize",
            items: [
              "Warm, encouraging language",
              "Gentle error states with clear next steps",
              "Celebratory success moments",
              "Approachable visual design",
            ],
          },
          {
            title: "Deprioritize",
            items: [
              "Technical error codes or stack traces",
              "Cold, transactional language",
              "Dismissive or generic error messages",
              "Intimidating or complex UI chrome",
            ],
          },
        ],
      },
      { type: "divider" },
      {
        type: "highlight-box",
        title: "03 \u2014 Calm Guidance",
        content:
          "Teacher Workspace should guide without overwhelming. Like a calm, knowledgeable colleague, we surface the right information at the right time. Progressive disclosure is our default pattern \u2014 show less, reveal more on demand.",
        variant: "accent",
      },
      {
        type: "heading",
        title: "Trade-off Framework: Calm Guidance",
      },
      {
        type: "two-column",
        columns: [
          {
            title: "Prioritize",
            items: [
              "Progressive disclosure and contextual help",
              "Sensible defaults that reduce decisions",
              "Quiet, non-intrusive feedback",
              "White space and visual breathing room",
            ],
          },
          {
            title: "Deprioritize",
            items: [
              "Showing all options at once",
              "Modal interruptions for non-critical info",
              "Dense, information-heavy layouts",
              "Aggressive notifications or badges",
            ],
          },
        ],
      },
      { type: "divider" },
      {
        type: "highlight-box",
        title: "04 \u2014 Light Weight",
        content:
          "Both in feel and in load. Teacher Workspace should feel fast, responsive, and unburdened. This applies to perceived performance, visual density, cognitive load, and emotional weight. Every added element must justify its existence.",
        variant: "accent",
      },
      {
        type: "heading",
        title: "Trade-off Framework: Light Weight",
      },
      {
        type: "two-column",
        columns: [
          {
            title: "Prioritize",
            items: [
              "Fast load times and snappy interactions",
              "Minimal visual clutter",
              "Simple, focused task flows",
              "Light color palettes and generous white space",
            ],
          },
          {
            title: "Deprioritize",
            items: [
              "Heavy imagery or background media",
              "Multi-step processes when single-step is possible",
              "Dense dashboards with competing elements",
              "Dark, heavy visual themes as default",
            ],
          },
        ],
      },
    ],
  },

  "design-principles": {
    id: "design-principles",
    title: "Product Design Principles",
    subtitle: "Seven principles that guide every product design decision at Teacher Workspace",
    sections: [
      {
        type: "paragraph",
        content:
          "These principles are compass headings, not railroad tracks. They guide direction while leaving room for judgment, context, and creativity. Each principle includes its inherent tension, common anti-patterns, and a quick litmus test.",
      },
      { type: "divider" },

      // ===== Philosophy =====
      {
        type: "heading",
        title: "Philosophy",
      },
      {
        type: "paragraph",
        content:
          "Teacher Workspace exists to remove friction from teaching. Every design decision should be evaluated against a simple question: does this help a teacher do their job with less effort and more confidence?",
      },
      {
        type: "paragraph",
        content:
          "These principles are ordered by priority. When principles conflict, the higher-priority principle wins. Not every screen will exercise every principle, and that\u2019s okay \u2014 what matters is that no screen violates any of them without conscious, documented reasoning.",
      },
      { type: "divider" },

      // ===== Principle 1: Platform First =====
      {
        type: "highlight-box",
        title: "01 \u2014 Platform First",
        content:
          "Design for the system, not the screen. Every component, pattern, and decision should strengthen the platform as a whole. A feature that solves one problem but fragments the experience is a net negative.",
        variant: "accent",
      },
      {
        type: "two-column",
        columns: [
          {
            title: "The Tension",
            items: [
              "Moving fast on individual features vs. maintaining platform coherence",
              "Team autonomy vs. shared patterns",
            ],
          },
          {
            title: "Anti-patterns",
            items: [
              "Building one-off solutions that can\u2019t be reused",
              "Skipping the design system because \u201Cit\u2019s faster\u201D",
              "Designing features in isolation without considering adjacent workflows",
            ],
          },
        ],
      },
      {
        type: "paragraph",
        content:
          "Litmus test: Could another team reuse what you just built? If not, why not?",
      },
      { type: "divider" },

      // ===== Principle 2: Design for One Teacher =====
      {
        type: "highlight-box",
        title: "02 \u2014 Design for One Teacher",
        content:
          "Anchor every design in a specific teacher\u2019s real workflow. Abstract \u201Cusers\u201D lead to abstract solutions. Name the teacher, describe their Tuesday afternoon, and design for that moment.",
        variant: "accent",
      },
      {
        type: "two-column",
        columns: [
          {
            title: "The Tension",
            items: [
              "Specificity vs. scalability",
              "Designing for one persona vs. serving a diverse user base",
            ],
          },
          {
            title: "Anti-patterns",
            items: [
              "Designing for \u201Cteachers\u201D instead of Ms. Lim who teaches P5 Math",
              "Validating with stakeholder opinions instead of user observation",
              "Building for edge cases before nailing the core path",
            ],
          },
        ],
      },
      {
        type: "paragraph",
        content:
          "Litmus test: Can you name the teacher and the specific moment this design serves?",
      },
      { type: "divider" },

      // ===== Principle 3: Earn the Feature =====
      {
        type: "highlight-box",
        title: "03 \u2014 Earn the Feature",
        content:
          "Every feature must justify its existence through observed need, not assumed value. The bar for adding is high; the bar for removing is low. When in doubt, leave it out.",
        variant: "accent",
      },
      {
        type: "two-column",
        columns: [
          {
            title: "The Tension",
            items: [
              "Moving fast vs. being disciplined",
              "Stakeholder requests vs. user evidence",
            ],
          },
          {
            title: "Anti-patterns",
            items: [
              "Building features because a stakeholder asked for them",
              "Adding \u201Cjust in case\u201D options",
              "Equating feature count with product value",
            ],
          },
        ],
      },
      {
        type: "paragraph",
        content:
          "Litmus test: What\u2019s the user evidence that this feature is needed? If you can\u2019t cite it, park it.",
      },
      { type: "divider" },

      // ===== Principle 4: Name the Tradeoff =====
      {
        type: "highlight-box",
        title: "04 \u2014 Name the Tradeoff",
        content:
          "Every design decision has a cost. Make that cost visible, document it, and own it. \u201CWe chose X because Y, knowing it means Z\u201D is better than \u201CWe didn\u2019t think about it.\u201D",
        variant: "accent",
      },
      {
        type: "two-column",
        columns: [
          {
            title: "The Tension",
            items: [
              "Speed of decision vs. thoroughness of analysis",
              "Optimism vs. intellectual honesty",
            ],
          },
          {
            title: "Anti-patterns",
            items: [
              "Presenting designs without listing what you gave up",
              "Treating tradeoffs as failures instead of informed choices",
              "Avoiding hard conversations about constraints",
            ],
          },
        ],
      },
      {
        type: "paragraph",
        content:
          "Litmus test: Can you articulate what this design sacrifices and why that\u2019s acceptable?",
      },
      { type: "divider" },

      // ===== Principle 5: Coherence over Completeness =====
      {
        type: "highlight-box",
        title: "05 \u2014 Coherence over Completeness",
        content:
          "A smaller, coherent experience beats a comprehensive but fragmented one. Ship less, but make what you ship feel like one product. Consistency is a feature.",
        variant: "accent",
      },
      {
        type: "two-column",
        columns: [
          {
            title: "The Tension",
            items: [
              "Feature breadth vs. experience depth",
              "Shipping fast vs. shipping together",
            ],
          },
          {
            title: "Anti-patterns",
            items: [
              "Launching features that feel like they belong to different products",
              "Inconsistent terminology, patterns, or interaction models across modules",
              "Prioritising coverage over craft",
            ],
          },
        ],
      },
      {
        type: "paragraph",
        content:
          "Litmus test: If a teacher used Feature A and then Feature B, would they feel like the same product?",
      },
      { type: "divider" },

      // ===== Principle 6: Invisible Seams =====
      {
        type: "highlight-box",
        title: "06 \u2014 Invisible Seams",
        content:
          "Teachers shouldn\u2019t see where one team\u2019s work ends and another\u2019s begins. Cross-module transitions, data handoffs, and navigation should feel seamless. The org chart should never leak into the UX.",
        variant: "accent",
      },
      {
        type: "two-column",
        columns: [
          {
            title: "The Tension",
            items: [
              "Team ownership boundaries vs. user journey continuity",
              "API design constraints vs. UX flow",
            ],
          },
          {
            title: "Anti-patterns",
            items: [
              "Users need to re-enter information when moving between modules",
              "Visible loading states at module boundaries that break flow",
              "Different teams using different navigation paradigms",
            ],
          },
        ],
      },
      {
        type: "paragraph",
        content:
          "Litmus test: Can a teacher complete a cross-module task without noticing the boundary?",
      },
      { type: "divider" },

      // ===== Principle 7: Default to Less =====
      {
        type: "highlight-box",
        title: "07 \u2014 Default to Less",
        content:
          "Reduce cognitive load relentlessly. Fewer options, fewer steps, fewer words. Every element on screen should earn its place. Progressive disclosure is a first principle, not a fallback.",
        variant: "accent",
      },
      {
        type: "two-column",
        columns: [
          {
            title: "The Tension",
            items: [
              "Simplicity vs. power-user needs",
              "Hiding features vs. making them discoverable",
            ],
          },
          {
            title: "Anti-patterns",
            items: [
              "Showing all options upfront because \u201Csome users might need them\u201D",
              "Multi-step wizards when a smart default would suffice",
              "Dense settings pages with rarely-changed options",
            ],
          },
        ],
      },
      {
        type: "paragraph",
        content:
          "Litmus test: Can you remove one more thing from this screen without losing essential function?",
      },
      { type: "divider" },

      // ===== Decision Matrix =====
      {
        type: "heading",
        title: "Decision Matrix: When Principles Conflict",
      },
      {
        type: "paragraph",
        content:
          "Principles are prioritised 1\u20137. When they conflict, the higher-priority principle takes precedence. Always document why a lower-priority principle was deprioritised.",
      },
      {
        type: "list",
        items: [
          "Platform First > any individual feature need",
          "Design for One Teacher > abstract generalisations",
          "Earn the Feature > stakeholder assumptions",
          "Name the Tradeoff > sweeping decisions under the rug",
          "Coherence > Completeness",
          "Invisible Seams > team-boundary convenience",
          "Default to Less > feature-cramming instincts",
        ],
      },
      { type: "divider" },

      // ===== Design Debt Taxonomy =====
      {
        type: "heading",
        title: "Design Debt Taxonomy",
      },
      {
        type: "paragraph",
        content:
          "Not all design debt is equal. Classify and triage using these three tiers:",
      },
      {
        type: "two-column",
        columns: [
          {
            title: "Critical Debt",
            items: [
              "Violates principles 1\u20133",
              "Actively harms user experience",
              "Must be addressed in current or next sprint",
            ],
          },
          {
            title: "Structural Debt",
            items: [
              "Violates principles 4\u20135",
              "Creates compounding inconsistency",
              "Should be scheduled within the quarter",
            ],
          },
        ],
      },
      {
        type: "highlight-box",
        title: "Cosmetic Debt",
        content:
          "Violates principles 6\u20137. Noticeable but not harmful. Track and address opportunistically during related work.",
        variant: "neutral",
      },
      { type: "divider" },

      // ===== Quality Covenant =====
      {
        type: "heading",
        title: "Quality Covenant",
      },
      {
        type: "paragraph",
        content:
          "As a product design team, we commit to these standards:",
      },
      {
        type: "list",
        items: [
          "No design ships without being evaluated against all 7 principles",
          "Every design document includes a \u201CTradeoffs\u201D section",
          "Design reviews explicitly reference principle numbers",
          "Quarterly retros include a \u201Cprinciple health check\u201D",
          "New team members are onboarded with real examples, not just this document",
          "Principles are reviewed and updated annually based on what we\u2019ve learned",
        ],
      },
    ],
  },
};
