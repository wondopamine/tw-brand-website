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
};
