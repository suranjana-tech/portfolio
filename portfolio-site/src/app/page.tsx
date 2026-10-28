"use client";

import Image from "next/image";
import {
  useEffect,
  useRef,
  useState,
  type MouseEvent as ReactMouseEvent,
  type ReactNode,
} from "react";
import { ContactForm } from "@/components/contact-form";

const ACHIEVEMENTS = [
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

function trackSpotlight(event: ReactMouseEvent<HTMLElement>) {
  const rect = event.currentTarget.getBoundingClientRect();
  event.currentTarget.style.setProperty("--spot-x", `${event.clientX - rect.left}px`);
  event.currentTarget.style.setProperty("--spot-y", `${event.clientY - rect.top}px`);
}

function CountUp({ to, active }: { to: number; active: boolean }) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    let frame = 0;
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (!active || reducedMotion) {
      frame = requestAnimationFrame(() => setValue(active ? to : 0));
      return () => cancelAnimationFrame(frame);
    }

    let start: number | null = null;
    const tick = (timestamp: number) => {
      if (start === null) {
        start = timestamp;
      }
      const progress = Math.min((timestamp - start) / 1300, 1);
      setValue(Math.round(to * (1 - Math.pow(1 - progress, 3))));
      if (progress < 1) {
        frame = requestAnimationFrame(tick);
      }
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [active, to]);

  return <>{value}</>;
}

const STAT_ICONS = {
  apps: (
    <>
      <rect x="3" y="3" width="7" height="7" rx="1.5" />
      <rect x="14" y="3" width="7" height="7" rx="1.5" />
      <rect x="3" y="14" width="7" height="7" rx="1.5" />
      <rect x="14" y="14" width="7" height="7" rx="1.5" />
    </>
  ),
  globe: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3c2.5 2.7 3.8 5.7 3.8 9s-1.3 6.3-3.8 9c-2.5-2.7-3.8-5.7-3.8-9S9.5 5.7 12 3Z" />
    </>
  ),
  trend: (
    <>
      <path d="m3 17 6-6 4 4 8-8" />
      <path d="M15 7h6v6" />
    </>
  ),
  zap: <path d="M13 2 4 14h7l-1 8 9-12h-7l1-8Z" />,
  database: (
    <>
      <ellipse cx="12" cy="5" rx="8" ry="3" />
      <path d="M4 5v6c0 1.7 3.6 3 8 3s8-1.3 8-3V5M4 11v6c0 1.7 3.6 3 8 3s8-1.3 8-3v-6" />
    </>
  ),
  languages: (
    <>
      <path d="m5 8 6 6M4 14l6-6 2-3M2 5h12M7 2h1" />
      <path d="m22 22-5-10-5 10M14 18h6" />
    </>
  ),
};

const STAT_TONES = {
  gold: {
    card: "bg-gradient-to-br from-[var(--gold-soft)] to-[#f7e7c4] text-[var(--pine-dark)] ring-[var(--gold)]/40 hover:ring-[var(--pine)]/50",
    tile: "bg-[var(--pine)] text-[var(--gold-soft)]",
    value: "text-[var(--pine-dark)]",
    label: "text-[var(--pine-dark)]",
    accent: "from-[var(--pine)] to-[var(--gold-deep)]",
    spotlight:
      "bg-[radial-gradient(240px_circle_at_var(--spot-x,50%)_var(--spot-y,50%),rgb(255_255_255/0.6),transparent_70%)]",
  },
  frost: {
    card: "bg-white/85 backdrop-blur-md text-[var(--pine-dark)] ring-white/70 hover:ring-[var(--gold)]/70",
    tile: "bg-[var(--gold-soft)] text-[var(--pine-dark)]",
    value: "text-[var(--pine-dark)]",
    label: "text-[#3d4a3d]",
    accent: "from-[var(--gold)] to-[var(--gold-soft)]",
    spotlight:
      "bg-[radial-gradient(240px_circle_at_var(--spot-x,50%)_var(--spot-y,50%),rgb(233_200_142/0.4),transparent_70%)]",
  },
  pine: {
    card: "bg-gradient-to-br from-[var(--pine)] to-[var(--pine-dark)] text-white ring-white/10 hover:ring-[var(--gold)]/60",
    tile: "bg-[var(--gold-soft)] text-[var(--pine-dark)]",
    value:
      "bg-gradient-to-r from-[var(--gold-soft)] to-white bg-clip-text text-transparent",
    label: "text-[#e6eee2]",
    accent: "from-[var(--gold)] to-[var(--gold-soft)]",
    spotlight:
      "bg-[radial-gradient(240px_circle_at_var(--spot-x,50%)_var(--spot-y,50%),rgb(233_200_142/0.28),transparent_70%)]",
  },
} as const;

type StatCardProps = {
  icon: ReactNode;
  countTo: number;
  prefix?: string;
  suffix?: string;
  unit?: string;
  srLabel: string;
  label: string;
  active: boolean;
  index: number;
  tone: keyof typeof STAT_TONES;
};

function StatCard({
  icon,
  countTo,
  prefix = "",
  suffix = "",
  unit = "",
  srLabel,
  label,
  active,
  index,
  tone,
}: StatCardProps) {
  const styles = STAT_TONES[tone];

  return (
    <div
      className={`h-full transform-gpu transition-[transform,opacity] duration-700 ease-out motion-reduce:transition-none ${
        active ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
      }`}
      style={{ transitionDelay: `${index * 140}ms` }}
    >
      <article
        onMouseMove={trackSpotlight}
        className={`group relative h-full overflow-hidden rounded-3xl p-4 shadow-lg ring-1 transition-[transform,box-shadow,--tw-ring-color] duration-300 hover:shadow-2xl motion-safe:hover:-translate-y-1.5 motion-reduce:transition-none sm:p-5 ${styles.card}`}
      >
        <span
          aria-hidden="true"
          className={`pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 motion-reduce:hidden ${styles.spotlight}`}
        />
        <span
          aria-hidden="true"
          className={`absolute inset-x-0 top-0 h-1 origin-left bg-gradient-to-r transition-transform duration-1000 ease-out motion-reduce:transition-none ${styles.accent} ${
            active ? "scale-x-100" : "scale-x-0"
          }`}
          style={{ transitionDelay: `${350 + index * 140}ms` }}
        />
        <div className="relative flex h-full items-center gap-4">
          <span
            aria-hidden="true"
            className={`flex size-12 shrink-0 items-center justify-center rounded-2xl shadow-md transition-transform duration-300 motion-safe:group-hover:-rotate-6 motion-safe:group-hover:scale-110 motion-reduce:transition-none ${styles.tile}`}
          >
            <svg
              className="size-6"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              {icon}
            </svg>
          </span>
          <div className="min-w-0">
            <h3
              className={`m-0 flex items-baseline gap-1.5 font-[family-name:var(--font-display)] text-4xl! leading-none font-normal ${styles.value}`}
            >
              <span className="sr-only">{srLabel}</span>
              <span aria-hidden="true">
                {prefix}
                <CountUp to={countTo} active={active} />
                {suffix}
              </span>
              {unit && (
                <span aria-hidden="true" className="text-xl">
                  {unit}
                </span>
              )}
            </h3>
            <p
              className={`mt-1.5 text-sm leading-snug font-semibold ${styles.label}`}
            >
              {label}
            </p>
          </div>
        </div>
      </article>
    </div>
  );
}

const HERO_STATS = [
  { value: "5+", label: "Years in frontend" },
  { value: "19", label: "Apps in one Nx platform" },
  { value: "42", label: "Countries served" },
];

const STACK_GROUPS = [
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

export default function Home() {
  const [activeSection, setActiveSection] = useState("home");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [profileSummaryAnimated, setProfileSummaryAnimated] = useState(false);
  const [inViewAnimations, setInViewAnimations] = useState({
    skills: false,
    impact: false,
    workflow: false,
    performance: false,
    stack: false,
    achievements: false,
    projects: false,
  });
  const profileHeadingRef = useRef<HTMLHeadingElement>(null);
  const profileSummaryRef = useRef<HTMLDivElement>(null);
  const profileAnimationFrameRef = useRef<number>(0);
  const profileAnimationTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const skillsSectionRef = useRef<HTMLElement>(null);
  const impactMetricsRef = useRef<HTMLDivElement>(null);
  const workflowGridRef = useRef<HTMLDivElement>(null);
  const performanceMetricsRef = useRef<HTMLDivElement>(null);
  const stackGridRef = useRef<HTMLDivElement>(null);
  const achievementsGridRef = useRef<HTMLDivElement>(null);
  const projectsGridRef = useRef<HTMLDivElement>(null);

  function selectSection(section: string) {
    if (profileAnimationFrameRef.current) {
      cancelAnimationFrame(profileAnimationFrameRef.current);
      profileAnimationFrameRef.current = 0;
    }
    if (profileAnimationTimeoutRef.current) {
      clearTimeout(profileAnimationTimeoutRef.current);
      profileAnimationTimeoutRef.current = null;
    }

    setActiveSection(section);
    setIsMenuOpen(false);

    requestAnimationFrame(() => {
      window.scrollTo({ top: 0, behavior: "instant" });
    });

    if (section === "profile") {
      setProfileSummaryAnimated(false);
      profileAnimationFrameRef.current = requestAnimationFrame(() => {
        profileAnimationTimeoutRef.current = setTimeout(() => {
          setProfileSummaryAnimated(true);
          profileAnimationTimeoutRef.current = null;
        }, 70);
        profileAnimationFrameRef.current = 0;
      });
      return;
    }

    setProfileSummaryAnimated(false);
  }

  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") {
      const animationFrame = requestAnimationFrame(() => {
        setInViewAnimations({
          skills: true,
          impact: true,
          workflow: true,
          performance: true,
          stack: true,
          achievements: true,
          projects: true,
        });
      });
      return () => cancelAnimationFrame(animationFrame);
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const animationKey = entry.target.getAttribute("data-animation-key");
          if (!animationKey) {
            return;
          }
          setInViewAnimations((current) => ({
            ...current,
            [animationKey]: entry.isIntersecting,
          }));
        });
      },
      {
        threshold: 0.3,
        rootMargin: "0px 0px -12% 0px",
      }
    );

    const animatedElements = [
      skillsSectionRef.current,
      impactMetricsRef.current,
      workflowGridRef.current,
      performanceMetricsRef.current,
      stackGridRef.current,
      achievementsGridRef.current,
      projectsGridRef.current,
    ];

    animatedElements.forEach((element) => {
      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    return () => {
      if (profileAnimationFrameRef.current) {
        cancelAnimationFrame(profileAnimationFrameRef.current);
      }
      if (profileAnimationTimeoutRef.current) {
        clearTimeout(profileAnimationTimeoutRef.current);
      }
    };
  }, []);

  const navItems = [
    { id: "home", label: "Home" },
    { id: "profile", label: "Profile" },
    { id: "experience", label: "Experience" },
    { id: "contact", label: "Contact" },
  ];

  const skills = [
    { label: "Front-End Development", value: 95 },
    { label: "UI Implementation", value: 88 },
    { label: "Responsive Design", value: 85 },
    { label: "Performance Optimization", value: 80 },
  ];

  const workflow = [
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

  const projects = [
    {
      name: "react-impact-portfolio",
      url: "https://github.com/suranjana-tech/react-impact-portfolio",
      description: "Portfolio showcasing my frontend work and experience.",
      language: "CSS",
      languageColor: "#663399",
    },
    {
      name: "Auth-project",
      url: "https://github.com/suranjana-tech/Auth-project",
      description: "A Next.js application with user authentication.",
      language: "JavaScript",
      languageColor: "#f1e05a",
    },
    {
      name: "Spotify-clone",
      url: "https://github.com/suranjana-tech/Spotify-clone",
      description: "A music streaming interface inspired by Spotify.",
      language: "JavaScript",
      languageColor: "#f1e05a",
    },
  ];

  const profileSummaryPoints = [
    "5+ years of frontend engineering across product and enterprise teams.",
    "Strong expertise in React, TypeScript, Nx, and Module Federation.",
    "Hands-on with accessibility, design systems, and performance tuning.",
  ];

  return (
    <main
      className={`portfolio slide-mode ${
        activeSection === "home"
          ? "[@media(min-width:981px)_and_(min-height:640px)]:h-dvh [@media(min-width:981px)_and_(min-height:640px)]:overflow-hidden"
          : ""
      }`}
    >
      <header className="global-nav sticky top-0 z-20 self-start border-b border-[var(--line)] bg-[var(--cream)]/95 px-4 py-3 text-[var(--pine-dark)] backdrop-blur-md sm:px-6 lg:px-10">
        <nav
          aria-label="Portfolio sections"
          className="flex flex-wrap items-center justify-between gap-x-6 gap-y-3"
          onKeyDown={(event) => {
            if (event.key === "Escape" && isMenuOpen) {
              setIsMenuOpen(false);
              event.currentTarget
                .querySelector<HTMLButtonElement>("#portfolio-menu-toggle")
                ?.focus();
            }
          }}
        >
          <button
            type="button"
            onClick={() => selectSection("home")}
            aria-label="Suranjana - Home"
            className="flex min-h-11 cursor-pointer items-center gap-3 rounded-md text-left focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--pine)]"
          >
            <span
              aria-hidden="true"
              className="flex size-10 items-center justify-center rounded-full bg-[var(--pine)] text-sm font-bold tracking-wide text-[var(--cream)]"
            >
              SG
            </span>
            <span className="text-lg font-bold tracking-tight">Suranjana</span>
          </button>
          <button
            id="portfolio-menu-toggle"
            type="button"
            aria-controls="portfolio-menu"
            aria-expanded={isMenuOpen}
            aria-label={isMenuOpen ? "Close main menu" : "Open main menu"}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="inline-flex size-11 cursor-pointer items-center justify-center rounded-lg border border-[var(--line)] hover:bg-[var(--pine)]/10 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--pine)] md:hidden"
          >
            <svg
              aria-hidden="true"
              className="size-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            >
              <path d={isMenuOpen ? "m6 6 12 12M6 18 18 6" : "M4 6h16M4 12h16M4 18h16"} />
            </svg>
          </button>
          <ul
            id="portfolio-menu"
            className={`${isMenuOpen ? "flex" : "hidden"} w-full flex-col gap-1 border-t border-[var(--line)] pt-3 md:flex md:w-auto md:flex-row md:items-center md:gap-2 md:border-0 md:pt-0`}
          >
            {navItems.map((item) => (
              <li key={item.id}>
                <button
                  type="button"
                  aria-current={activeSection === item.id ? "page" : undefined}
                  className={`group relative min-h-11 w-full cursor-pointer rounded-lg px-4 py-2.5 text-left text-sm font-semibold tracking-wide focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--pine)] motion-reduce:transition-none ${
                    item.id === "contact"
                      ? `inline-flex items-center justify-between gap-3 text-[var(--cream)] shadow-sm ring-inset ring-[var(--gold)] transition-[background-color,box-shadow,translate] duration-200 hover:bg-[var(--pine-dark)] hover:shadow-md motion-safe:hover:-translate-y-0.5 motion-safe:active:translate-y-0 ${
                          activeSection === item.id
                            ? "bg-[var(--pine-dark)] ring-2"
                            : "bg-[var(--pine)] ring-1 motion-safe:animate-contact-invite"
                        }`
                      : `transition-colors ${
                          activeSection === item.id
                            ? "bg-[var(--pine)]/10 text-[var(--pine-dark)] after:absolute after:inset-x-4 after:bottom-1 after:h-0.5 after:rounded-full after:bg-[var(--gold-deep)]"
                            : "text-[var(--pine)] hover:bg-[var(--pine)]/5 hover:text-[var(--pine-dark)]"
                        }`
                  }`}
                  onClick={() => selectSection(item.id)}
                >
                  {item.label}
                  {item.id === "contact" && (
                    <svg
                      aria-hidden="true"
                      className="size-4 text-[#e9c88e] transition-transform duration-200 motion-safe:group-hover:translate-x-0.5 motion-safe:group-focus-visible:translate-x-0.5 motion-reduce:transition-none"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M5 12h14m-6-6 6 6-6 6" />
                    </svg>
                  )}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </header>

      <div className="slide-deck">
        <section
          id="home"
          className={`hero panel panel-green slide-page [@media(min-width:981px)]:py-[clamp(1rem,3.5vh,3rem)]! ${
            activeSection === "home" ? "is-active" : ""
          }`}
        >
          <div className="hero-copy">
            <p className="name-badge">Suranjana Ghosh</p>
            <h1 className="[@media(min-width:981px)]:text-[length:clamp(2.25rem,min(6.2vw,10.5vh),5.8rem)]!">
              Senior Frontend Engineer
            </h1>
            <p className="lead">
              React, TypeScript and micro-frontend specialist with 5+ years of
              experience. I lead a 19-app Nx platform used by 3,000+
              organizations across 42 countries.
            </p>
            <dl className="mt-[clamp(0.75rem,2.2vh,1.5rem)] grid max-w-xl grid-cols-3 gap-2 sm:gap-3">
              {HERO_STATS.map((stat) => (
                <div
                  key={stat.label}
                  className="flex flex-col-reverse rounded-2xl bg-white/10 px-2 py-3 ring-1 ring-white/20 sm:px-4"
                >
                  <dt className="text-[11px] font-semibold leading-tight text-[#d9e4d4] sm:text-xs">
                    {stat.label}
                  </dt>
                  <dd className="font-[family-name:var(--font-display)] text-3xl leading-none text-white sm:text-4xl">
                    {stat.value}
                  </dd>
                </div>
              ))}
            </dl>
            <p className="mt-[clamp(0.75rem,2vh,1.25rem)] inline-flex items-center gap-2 rounded-full bg-[#e9c88e]/15 px-4 py-1.5 text-sm font-semibold text-[#f6efdd] ring-1 ring-[#e9c88e]/40">
              <span aria-hidden="true" className="size-2 rounded-full bg-[#e9c88e]" />
              Germany-ready · own visa/work permit in 5–8 weeks
            </p>
            <div className="mt-[clamp(0.75rem,2.2vh,1.5rem)] flex flex-wrap items-center gap-3">
              <a
                href="/Suranjana-Ghosh-CV.pdf"
                download="Suranjana-Ghosh-CV.pdf"
                className="group relative inline-flex min-h-12 items-center justify-center gap-3 overflow-hidden rounded-lg border border-transparent bg-[#e9c88e] px-6 py-3 text-base font-bold text-[var(--pine-dark)] transition-[background-color,box-shadow,translate] duration-200 hover:bg-[#f1d7a8] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#e9c88e] motion-safe:animate-profile-cta-glow motion-safe:hover:-translate-y-0.5 motion-safe:active:translate-y-0 motion-reduce:animate-none motion-reduce:transition-none"
              >
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-y-0 left-[-45%] w-2/5 -skew-x-12 bg-gradient-to-r from-transparent via-white/50 to-transparent motion-safe:animate-profile-cta-sheen motion-reduce:hidden"
                />
                <span className="relative z-10 inline-flex items-center gap-3">
                  Download CV
                  <svg
                    aria-hidden="true"
                    className="size-5 shrink-0 transition-transform duration-200 motion-safe:group-hover:translate-y-0.5 motion-safe:group-focus-visible:translate-y-0.5 motion-reduce:transition-none"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M12 4v11m0 0-4-4m4 4 4-4M5 20h14" />
                  </svg>
                </span>
              </a>
              <button
                type="button"
                aria-controls="profile"
                aria-label="Explore my profile section"
                onClick={() => {
                  selectSection("profile");
                  requestAnimationFrame(() => {
                    profileHeadingRef.current?.focus({ preventScroll: true });
                    profileHeadingRef.current?.scrollIntoView({
                      block: "start",
                      behavior: "instant",
                    });
                  });
                }}
                className="group inline-flex min-h-12 cursor-pointer items-center justify-center gap-3 rounded-lg border border-[#e9c88e]/70 px-6 py-3 text-base font-bold text-[#f6efdd] transition-colors duration-200 hover:border-[#e9c88e] hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#e9c88e] motion-reduce:transition-none"
              >
                Explore my profile
                <svg
                  aria-hidden="true"
                  className="size-5 shrink-0 transition-transform duration-200 motion-safe:group-hover:translate-x-1 motion-safe:group-focus-visible:translate-x-1 motion-reduce:transition-none"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M5 12h14m-6-6 6 6-6 6" />
                </svg>
              </button>
            </div>
          </div>
          <div className="hero-media">
            <Image
              src="https://res.cloudinary.com/dcjcmpfcv/image/upload/c_crop,w_2400,h_1800,x_942,y_1442/f_auto,q_auto,w_1400/v1793126589/IMG_6180_nkayg1"
              alt="Portrait of Suranjana Ghosh"
              fill
              priority
              sizes="(max-width: 980px) 100vw, 42vw"
              style={{ objectFit: "cover", objectPosition: "50% 45%" }}
              unoptimized
            />
          </div>
        </section>

        <section
          id="profile"
          className={`slide-page ${activeSection === "profile" ? "is-active" : ""}`}
        >
          <div className="merged-stack">
            <section className="panel panel-cream split">
              <div
                className={`media-block transform-gpu transition-all duration-700 ease-out motion-reduce:transition-none ${
                  activeSection === "profile"
                    ? "translate-x-0 opacity-100 motion-safe:scale-100"
                    : "-translate-x-4 opacity-0 motion-safe:scale-[0.97]"
                }`}
              >
                <Image
                  src="https://res.cloudinary.com/d0qqvjoy/image/upload/f_auto,q_auto/WhatsApp_Image_2026-09-29_at_7.52.50_PM_2"
                  alt="Portrait of Suranjana Ghosh"
                  width={1200}
                  height={900}
                  unoptimized
                />
              </div>
              <div
                ref={profileSummaryRef}
                className={`transform-gpu transition-all duration-700 ease-out motion-reduce:transition-none ${
                  profileSummaryAnimated
                    ? "translate-x-0 opacity-100"
                    : "translate-x-8 opacity-0"
                }`}
              >
                <h2
                  ref={profileHeadingRef}
                  tabIndex={-1}
                  className="scroll-mt-28 rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--gold-deep)]"
                >
                  About Me
                </h2>
                <p className="lead-dark">
                  I lead frontend architecture for large-scale enterprise
                  products, balancing usability, performance, accessibility, and
                  maintainability. I can provide my own visa/work permit for
                  Germany within 5-8 weeks and am currently serving my notice
                  period.
                </p>
                <h3 className="accent-title">Professional Summary</h3>
                <ul className="summary-list">
                  {profileSummaryPoints.map((point, index) => (
                    <li
                      key={point}
                      className={`transform-gpu transition-[transform,opacity,filter] duration-800 ease-out motion-safe:will-change-transform motion-reduce:transition-none ${
                        profileSummaryAnimated
                          ? "translate-x-0 opacity-100 blur-0"
                          : "translate-x-28 opacity-0 blur-[1px]"
                      }`}
                      style={{ transitionDelay: `${80 + index * 160}ms` }}
                    >
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            <section
              ref={skillsSectionRef}
              data-animation-key="skills"
              className="panel panel-split skills"
            >
              <div className="skills-intro">
                <div className="skills-photo">
                  <Image
                    src="https://images.unsplash.com/photo-1664575197229-3bbebc281874?auto=format&fit=crop&w=1200&q=80"
                    alt="Hands typing on a laptop at a light-colored desk"
                    width={1400}
                    height={900}
                    unoptimized
                  />
                </div>
                <h2>Technical Skills</h2>
                <p className="lead-dark">
                  A combination of front-end technologies, development tools,
                  and best practices used to build scalable and maintainable web
                  applications.
                </p>
              </div>
              <div className="skill-card">
                <h3 className="accent-title">Skill Highlights</h3>
                {skills.map((skill, index) => (
                  <div
                    key={skill.label}
                    className={`skill-row transition-all duration-700 ease-out motion-reduce:transition-none ${
                      inViewAnimations.skills
                        ? "translate-y-0 opacity-100"
                        : "translate-y-4 opacity-0"
                    }`}
                    style={{ transitionDelay: `${index * 110}ms` }}
                  >
                    <div className="skill-labels">
                      <span>{skill.label}</span>
                      <span>{skill.value}%</span>
                    </div>
                    <div className="meter">
                      <span
                        className="transition-[width] duration-1000 ease-out motion-reduce:transition-none"
                        style={{
                          width: `${inViewAnimations.skills ? skill.value : 0}%`,
                          transitionDelay: `${120 + index * 110}ms`,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className="panel panel-cream showcase projects-page">
              <h2>GitHub Projects</h2>
              <p className="lead-dark">
                A few selected projects highlighting my frontend work.
              </p>
              <div
                ref={projectsGridRef}
                data-animation-key="projects"
                className="projects-grid"
              >
                {projects.map((project, index) => (
                  <div
                    key={project.name}
                    className={`transform-gpu transition-[transform,opacity] duration-700 ease-out motion-reduce:transition-none ${
                      inViewAnimations.projects
                        ? "translate-y-0 opacity-100"
                        : "translate-y-10 opacity-0"
                    }`}
                    style={{ transitionDelay: `${index * 140}ms` }}
                  >
                    <article className="group relative flex h-full flex-col gap-4 overflow-hidden rounded-3xl border border-[var(--line)] bg-white p-6 shadow-sm transition-[transform,box-shadow,border-color] duration-300 before:absolute before:inset-x-0 before:top-0 before:h-1 before:bg-gradient-to-r before:from-[var(--pine)] before:to-[var(--gold)] hover:border-[var(--gold)] hover:shadow-xl focus-within:border-[var(--gold)] focus-within:shadow-xl motion-safe:hover:-translate-y-2 motion-reduce:transition-none">
                      <div className="flex items-center justify-between gap-3">
                        <span
                          aria-hidden="true"
                          className="flex size-11 items-center justify-center rounded-2xl bg-[var(--pine)] text-[var(--gold-soft)] transition-transform duration-300 motion-safe:group-hover:rotate-6 motion-safe:group-hover:scale-110 motion-reduce:transition-none"
                        >
                          <svg
                            className="size-6"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                          >
                            <path d="M12 .5a11.5 11.5 0 0 0-3.64 22.41c.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.37-3.88-1.37-.52-1.33-1.28-1.69-1.28-1.69-1.04-.71.08-.7.08-.7 1.16.08 1.76 1.19 1.76 1.19 1.03 1.76 2.7 1.25 3.36.96.1-.75.4-1.25.73-1.54-2.55-.29-5.24-1.28-5.24-5.68 0-1.25.45-2.28 1.18-3.08-.12-.29-.51-1.46.11-3.04 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.77 0c2.2-1.49 3.17-1.18 3.17-1.18.62 1.58.23 2.75.11 3.04.74.8 1.18 1.83 1.18 3.08 0 4.41-2.69 5.38-5.25 5.67.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 12 .5Z" />
                          </svg>
                        </span>
                        <span className="inline-flex items-center gap-2 rounded-full bg-[var(--cream)] px-3 py-1 text-sm font-semibold text-[var(--pine-dark)] ring-1 ring-[var(--line)]">
                          <span
                            aria-hidden="true"
                            className="size-2.5 rounded-full"
                            style={{ backgroundColor: project.languageColor }}
                          />
                          {project.language}
                        </span>
                      </div>
                      <h3 className="text-xl! font-bold break-words text-[var(--pine-dark)]">
                        {project.name}
                      </h3>
                      <p className="flex-1 leading-relaxed text-[#3d4a3d]">
                        {project.description}
                      </p>
                      <a
                        href={project.url}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 font-bold text-[var(--pine)] after:absolute after:inset-0 after:content-[''] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--gold-deep)]"
                      >
                        View Repository
                        <span className="sr-only">(opens in a new tab)</span>
                        <svg
                          aria-hidden="true"
                          className="size-5 transition-transform duration-300 motion-safe:group-hover:translate-x-1.5 motion-reduce:transition-none"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.8"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M5 12h14m-6-6 6 6-6 6" />
                        </svg>
                      </a>
                    </article>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </section>

        <section
          id="experience"
          className={`slide-page ${activeSection === "experience" ? "is-active" : ""}`}
        >
          <div className="merged-stack">
            <section className="panel panel-cream metrics impact">
              <div className="impact-copy">
                <span className="impact-star" aria-hidden="true">
                  &#10033;
                </span>
                <h2>Current Role Impact</h2>
                <p className="lead-dark">
                  Leading frontend architecture and a 5-member team for the
                  Clinisys Laboratory System, used by 3,000+ organizations
                  across 42 countries.
                </p>
              </div>
              <div
                ref={impactMetricsRef}
                data-animation-key="impact"
                className="metric-grid"
              >
                <StatCard
                  tone="gold"
                  index={0}
                  active={inViewAnimations.impact}
                  icon={STAT_ICONS.apps}
                  countTo={19}
                  srLabel="19"
                  label="Nx micro-frontend apps led"
                />
                <StatCard
                  tone="gold"
                  index={1}
                  active={inViewAnimations.impact}
                  icon={STAT_ICONS.globe}
                  countTo={42}
                  srLabel="42"
                  label="Countries served"
                />
                <StatCard
                  tone="pine"
                  index={2}
                  active={inViewAnimations.impact}
                  icon={STAT_ICONS.trend}
                  countTo={20}
                  prefix="+"
                  suffix="%"
                  srLabel="+20%"
                  label="Application performance improvement"
                />
              </div>
              <div className="impact-image">
                <Image
                  src="https://images.unsplash.com/photo-1664575197229-3bbebc281874?auto=format&fit=crop&w=1200&q=80"
                  alt="Hands working on a laptop"
                  fill
                  sizes="(max-width: 980px) 100vw, 38vw"
                  style={{ objectFit: "cover" }}
                  unoptimized
                />
              </div>
            </section>

            <section className="panel panel-green workflow bg-[radial-gradient(ellipse_at_top_right,var(--pine)_0%,var(--pine-dark)_75%)]!">
              <span
                aria-hidden="true"
                className="pointer-events-none absolute -top-24 -right-16 -z-10 size-80 rounded-full bg-[var(--gold)]/20 blur-3xl motion-safe:animate-float-slow"
              />
              <span
                aria-hidden="true"
                className="pointer-events-none absolute -bottom-28 -left-20 -z-10 size-80 rounded-full bg-[#6f9a68]/25 blur-3xl [animation-delay:-7s] motion-safe:animate-float-slow"
              />
              <div className="workflow-copy">
                <span className="workflow-star" aria-hidden="true">
                  &#10033;
                </span>
                <h2>Delivery Workflow</h2>
                <p className="lead">
                  Product-focused engineering lifecycle from architecture to
                  quality gates, with automation embedded throughout development
                  and review.
                </p>
              </div>
              <div
                ref={workflowGridRef}
                data-animation-key="workflow"
                className="workflow-grid"
              >
                {workflow.map((step, index) => (
                  <div
                    key={step.id}
                    className={`relative transform-gpu transition-[transform,opacity] duration-700 ease-out motion-reduce:transition-none ${
                      inViewAnimations.workflow
                        ? "translate-y-0 opacity-100"
                        : "translate-y-10 opacity-0"
                    }`}
                    style={{ transitionDelay: `${index * 140}ms` }}
                  >
                    {index < workflow.length - 1 && (
                      <span
                        aria-hidden="true"
                        className={`absolute top-full left-[calc(2.75rem-1px)] h-5 w-0.5 origin-top bg-gradient-to-b from-[var(--gold)] to-[var(--gold)]/20 transition-transform duration-700 ease-out motion-reduce:transition-none ${
                          inViewAnimations.workflow
                            ? "scale-y-100"
                            : "scale-y-0"
                        }`}
                        style={{ transitionDelay: `${500 + index * 200}ms` }}
                      />
                    )}
                    <article
                      onMouseMove={trackSpotlight}
                      className="group relative overflow-hidden rounded-3xl bg-white/[0.07] p-4 text-white shadow-lg ring-1 ring-white/15 backdrop-blur-sm transition-[transform,box-shadow,--tw-ring-color] duration-300 hover:shadow-2xl hover:ring-[var(--gold)]/60 motion-safe:hover:-translate-y-1.5 motion-reduce:transition-none sm:p-5"
                    >
                      <span
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-0 bg-[radial-gradient(260px_circle_at_var(--spot-x,50%)_var(--spot-y,50%),rgb(233_200_142/0.28),transparent_70%)] opacity-0 transition-opacity duration-300 group-hover:opacity-100 motion-reduce:hidden"
                      />
                      <div className="relative flex items-start gap-4">
                        <span
                          aria-hidden="true"
                          className="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-[var(--gold-soft)] font-[family-name:var(--font-display)] text-2xl leading-none text-[var(--pine-dark)] shadow-md transition-transform duration-300 motion-safe:group-hover:-rotate-6 motion-safe:group-hover:scale-110 motion-reduce:transition-none"
                        >
                          {step.id}
                        </span>
                        <div className="min-w-0">
                          <h3 className="text-xl! leading-tight font-bold text-white">
                            <span className="sr-only">Step {step.id}: </span>
                            {step.title}
                          </h3>
                          <p className="mt-1.5 leading-relaxed text-[#e6eee2]">
                            {step.text}
                          </p>
                        </div>
                      </div>
                    </article>
                  </div>
                ))}
              </div>
            </section>

            <section className="panel panel-cream performance">
              <div className="performance-copy">
                <h2>Performance Metrics</h2>
              </div>
              <div className="performance-image">
                <Image
                  src="https://res.cloudinary.com/d0qqvjoy/image/upload/f_auto/q_auto/kupuqqjvtis42194t68b"
                  alt="Laptop and notebook on a developer's desk"
                  fill
                  sizes="(max-width: 980px) 100vw, 48vw"
                  style={{ objectFit: "cover" }}
                  unoptimized
                />
              </div>
              <div
                ref={performanceMetricsRef}
                data-animation-key="performance"
                className="metric-row"
              >
                <StatCard
                  tone="frost"
                  index={0}
                  active={inViewAnimations.performance}
                  icon={STAT_ICONS.zap}
                  countTo={30}
                  prefix="+"
                  suffix="%"
                  srLabel="+30%"
                  label="Faster rendering through lazy loading and optimization"
                />
                <StatCard
                  tone="frost"
                  index={1}
                  active={inViewAnimations.performance}
                  icon={STAT_ICONS.database}
                  countTo={20}
                  prefix="+"
                  suffix="%"
                  srLabel="+20%"
                  label="More efficient data fetching through API and state refactors"
                />
                <StatCard
                  tone="pine"
                  index={2}
                  active={inViewAnimations.performance}
                  icon={STAT_ICONS.languages}
                  countTo={4}
                  unit="Languages"
                  srLabel="4 Languages"
                  label="Localization and global rollout with React i18next"
                />
              </div>
            </section>

            <section className="panel panel-split stack">
              <div className="stack-heading">
                <h2>Technology Stack</h2>
                <p>
                  Tools and systems I use to build scalable, maintainable
                  digital products.
                </p>
              </div>
              <div
                ref={stackGridRef}
                data-animation-key="stack"
                className="stack-grid"
              >
                {STACK_GROUPS.map((group, groupIndex) => (
                  <div
                    key={group.title}
                    className={`transform-gpu transition-[transform,opacity] duration-700 ease-out motion-reduce:transition-none ${
                      inViewAnimations.stack
                        ? "translate-y-0 opacity-100"
                        : "translate-y-10 opacity-0"
                    }`}
                    style={{ transitionDelay: `${groupIndex * 140}ms` }}
                  >
                    <article className="group relative flex h-full flex-col gap-5 overflow-hidden rounded-3xl bg-gradient-to-br from-[var(--pine)] to-[var(--pine-dark)] p-7 text-left text-white shadow-lg ring-1 ring-white/10 transition-[transform,box-shadow,--tw-ring-color] duration-300 before:pointer-events-none before:absolute before:-top-20 before:-right-20 before:size-56 before:rounded-full before:bg-[var(--gold)]/25 before:blur-3xl before:transition-transform before:duration-500 after:absolute after:inset-x-0 after:top-0 after:h-1 after:bg-gradient-to-r after:from-[var(--gold)] after:to-[var(--gold-soft)] hover:shadow-2xl hover:ring-[var(--gold)]/60 motion-safe:hover:-translate-y-2 motion-safe:hover:before:scale-150 motion-reduce:transition-none">
                      <div className="relative flex items-center gap-4">
                        <span
                          aria-hidden="true"
                          className="flex size-16 shrink-0 items-center justify-center rounded-2xl bg-[var(--gold-soft)] text-[var(--pine-dark)] shadow-md transition-transform duration-300 motion-safe:group-hover:-rotate-6 motion-safe:group-hover:scale-110 motion-reduce:transition-none"
                        >
                          <svg
                            className="size-9"
                            viewBox="0 0 64 64"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="3.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            {group.icon}
                          </svg>
                        </span>
                        <div>
                          <h3 className="text-2xl! leading-tight font-bold text-white">
                            {group.title}
                          </h3>
                          <p className="mt-1 text-sm text-[#d9e4d4]">
                            {group.blurb}
                          </p>
                        </div>
                      </div>
                      <ul className="relative flex flex-wrap gap-2">
                        {group.tools.map((tool, toolIndex) => (
                          <li
                            key={tool}
                            className={`transform-gpu transition-[transform,opacity] duration-500 ease-out motion-reduce:transition-none ${
                              inViewAnimations.stack
                                ? "translate-y-0 opacity-100"
                                : "translate-y-3 opacity-0"
                            }`}
                            style={{
                              transitionDelay: `${300 + groupIndex * 140 + toolIndex * 55}ms`,
                            }}
                          >
                            <span className="inline-block cursor-default rounded-full bg-white/10 px-3.5 py-1.5 text-sm font-medium text-[#f4f4f1] ring-1 ring-white/20 transition-colors duration-200 hover:bg-[var(--gold-soft)] hover:text-[var(--pine-dark)] hover:ring-transparent motion-reduce:transition-none">
                              {tool}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </article>
                  </div>
                ))}
              </div>
            </section>

            <section className="panel panel-green achievements relative isolate bg-[radial-gradient(ellipse_at_top_right,var(--pine)_0%,var(--pine-dark)_75%)]!">
              <span
                aria-hidden="true"
                className="pointer-events-none absolute -top-24 -right-16 -z-10 size-96 rounded-full bg-[var(--gold)]/20 blur-3xl motion-safe:animate-float-slow"
              />
              <span
                aria-hidden="true"
                className="pointer-events-none absolute -bottom-32 -left-20 -z-10 size-96 rounded-full bg-[#6f9a68]/25 blur-3xl [animation-delay:-7s] motion-safe:animate-float-slow"
              />
              <h2>Professional Achievements</h2>
              <span
                aria-hidden="true"
                className={`mb-4 block h-1 w-28 origin-left rounded-full bg-gradient-to-r from-[var(--gold)] to-[var(--gold-soft)] transition-transform duration-1000 ease-out motion-reduce:transition-none ${
                  inViewAnimations.achievements ? "scale-x-100" : "scale-x-0"
                }`}
              />
              <p className="lead">
                Highlights from 5+ years of frontend engineering across
                healthcare, retail, and AI workflow platforms.
              </p>
              <div
                ref={achievementsGridRef}
                data-animation-key="achievements"
                className="achievements-grid"
              >
                {ACHIEVEMENTS.map((item, index) => (
                  <div
                    key={item.label}
                    className={`transform-gpu transition-[transform,opacity] duration-700 ease-out motion-reduce:transition-none ${
                      inViewAnimations.achievements
                        ? "translate-y-0 opacity-100"
                        : "translate-y-10 opacity-0"
                    }`}
                    style={{ transitionDelay: `${index * 140}ms` }}
                  >
                    <article
                      onMouseMove={trackSpotlight}
                      className="group relative h-full overflow-hidden rounded-3xl bg-white/[0.07] p-7 text-white shadow-lg ring-1 ring-white/15 backdrop-blur-sm transition-[transform,box-shadow,--tw-ring-color] duration-300 hover:shadow-2xl hover:ring-[var(--gold)]/60 motion-safe:hover:-translate-y-2 motion-reduce:transition-none"
                    >
                      <span
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-0 bg-[radial-gradient(280px_circle_at_var(--spot-x,50%)_var(--spot-y,50%),rgb(233_200_142/0.28),transparent_70%)] opacity-0 transition-opacity duration-300 group-hover:opacity-100 motion-reduce:hidden"
                      />
                      <span
                        aria-hidden="true"
                        className={`absolute inset-x-0 top-0 h-1 origin-left bg-gradient-to-r from-[var(--gold)] to-[var(--gold-soft)] transition-transform duration-1000 ease-out motion-reduce:transition-none ${
                          inViewAnimations.achievements
                            ? "scale-x-100"
                            : "scale-x-0"
                        }`}
                        style={{ transitionDelay: `${350 + index * 140}ms` }}
                      />
                      <div className="relative flex flex-col gap-4">
                        <span
                          aria-hidden="true"
                          className="flex size-14 items-center justify-center rounded-2xl bg-[var(--gold-soft)] text-[var(--pine-dark)] shadow-md transition-transform duration-300 motion-safe:group-hover:-rotate-6 motion-safe:group-hover:scale-110 motion-reduce:transition-none"
                        >
                          <svg
                            className="size-7"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            {item.icon}
                          </svg>
                        </span>
                        <h3 className="m-0 bg-gradient-to-r from-[var(--gold-soft)] to-white bg-clip-text font-[family-name:var(--font-display)] text-4xl! leading-none font-normal break-words text-transparent sm:text-5xl!">
                          <span className="sr-only">{item.label}</span>
                          <span aria-hidden="true">
                            {item.countTo === null ? (
                              item.label
                            ) : (
                              <>
                                <CountUp
                                  to={item.countTo}
                                  active={inViewAnimations.achievements}
                                />
                                {item.suffix}
                                {item.unit}
                              </>
                            )}
                          </span>
                        </h3>
                        <p className="leading-relaxed text-[#e6eee2]">
                          {item.text}
                        </p>
                      </div>
                    </article>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </section>

        <section
          id="contact"
          className={`panel panel-cream contact slide-page ${
            activeSection === "contact" ? "is-active" : ""
          }`}
        >
          <div className="contact-layout">
            <div className="contact-copy">
              <h2>Get in Touch</h2>
              <p className="contact-intro">I&apos;d love to hear from you.</p>
              <p className="lead-dark">
                Open to frontend opportunities and product-focused
                collaborations. Share your idea or opportunity below.
              </p>
              <div className="contact-links">
                <a href="mailto:suranjanaghosh2312@gmail.com" className="cta">
                  suranjanaghosh2312@gmail.com
                </a>
                <a
                  href="/Suranjana-Ghosh-CV.pdf"
                  download="Suranjana-Ghosh-CV.pdf"
                  className="cta"
                >
                  Download CV (PDF)
                </a>
                <a
                  href="https://www.linkedin.com/in/sghoshsde/"
                  target="_blank"
                  rel="noreferrer"
                  className="cta"
                >
                  LinkedIn
                </a>
                <a
                  href="https://github.com/suranjana-tech"
                  target="_blank"
                  rel="noreferrer"
                  className="cta"
                >
                  GitHub
                </a>
              </div>
            </div>
            <ContactForm />
          </div>
        </section>
      </div>
    </main>
  );
}
