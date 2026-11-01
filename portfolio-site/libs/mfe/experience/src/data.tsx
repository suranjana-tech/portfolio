export const EXPERIENCE_ACHIEVEMENTS = [
  {
    countTo: 5,
    suffix: "+",
    unit: " Years",
    label: "5+ Years",
    text: "Frontend project experience in production environments",
    icon: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 2" />
      </>
    ),
  },
  {
    countTo: 3,
    suffix: "",
    unit: " Domains",
    label: "3 Domains",
    text: "Healthcare, Retail, and AI/ML data operations",
    icon: (
      <>
        <path d="m12 3 9 5-9 5-9-5 9-5Z" />
        <path d="m3 12 9 5 9-5M3 16.5l9 5 9-5" />
      </>
    ),
  },
  {
    countTo: null,
    suffix: "",
    unit: "",
    label: "WCAG 2.1/2.2",
    text: "Accessibility-first engineering with global product readiness",
    icon: (
      <>
        <path d="M12 3 4 6v6c0 4.5 3.2 8 8 9 4.8-1 8-4.5 8-9V6l-8-3Z" />
        <path d="m9 12 2 2 4-4" />
      </>
    ),
  },
];

export const EXPERIENCE_WORKFLOW = [
  {
    id: "01",
    title: "Research & Planning",
    text: "Defining architecture, analyzing users, and mapping technical requirements.",
  },
  {
    id: "02",
    title: "UI Implementation",
    text: "Translating design specs into responsive, reusable components.",
  },
  {
    id: "03",
    title: "Testing & Optimization",
    text: "Debugging, cross-browser audits, and performance fine-tuning.",
  },
];

export const EXPERIENCE_STACK_GROUPS = [
  {
    title: "Architecture",
    blurb: "How I structure large-scale apps",
    tools: [
      "Micro-frontends",
      "Module Federation",
      "Nx monorepo",
      "Atomic Design",
      "Design systems",
      "Storybook",
    ],
    icon: (
      <>
        <rect x="8" y="8" width="48" height="38" rx="4" />
        <path d="M8 18h48M26 51h12m-10-5v5m8-5v5" />
        <path d="M15 26h12v14H15zm18 0h16m-16 7h16m-16 7h16" />
      </>
    ),
  },
  {
    title: "Engineering Stack",
    blurb: "What I build products with",
    tools: [
      "React",
      "TypeScript",
      "Redux",
      "TanStack Query",
      "Node.js",
      "REST",
      "GraphQL",
      "Vite",
      "Webpack",
    ],
    icon: (
      <>
        <rect x="8" y="8" width="48" height="48" rx="4" />
        <path d="M8 19h48" />
        <path d="m25 31-8 8 8 8m14-16 8 8-8 8m-4-18-6 20" />
      </>
    ),
  },
  {
    title: "Quality & DevOps",
    blurb: "How I ship with confidence",
    tools: [
      "Jest",
      "React Testing Library",
      "Playwright",
      "Cypress",
      "SonarQube",
      "Azure DevOps",
      "Docker",
      "AI-assisted dev",
    ],
    icon: (
      <>
        <circle cx="32" cy="32" r="24" />
        <path d="m21 33 8 8 15-17" />
      </>
    ),
  },
];
