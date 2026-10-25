"use client";

import Image from "next/image";
import { useState } from "react";
import { ContactForm } from "@/components/contact-form";

export default function Home() {
  const [activeSection, setActiveSection] = useState("cover");

  const navItems = [
    { id: "cover", label: "Home" },
    { id: "profile", label: "Profile" },
    { id: "skills", label: "Skills" },
    { id: "projects", label: "Projects" },
    { id: "impact", label: "Impact" },
    { id: "workflow", label: "Workflow" },
    { id: "performance", label: "Performance" },
    { id: "stack", label: "Stack" },
    { id: "achievements", label: "Wins" },
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
    },
    {
      name: "Auth-project",
      url: "https://github.com/suranjana-tech/Auth-project",
      description: "A Next.js application with user authentication.",
      language: "JavaScript",
    },
    {
      name: "Spotify-clone",
      url: "https://github.com/suranjana-tech/Spotify-clone",
      description: "A music streaming interface inspired by Spotify.",
      language: "JavaScript",
    },
  ];

  return (
    <main className="portfolio slide-mode">
      <header className="global-nav panel panel-green">
        <p className="hero-brand">Suranjana</p>
        <nav aria-label="Portfolio sections">
          {navItems.map((item) => (
            <button
              key={item.id}
              type="button"
              className={activeSection === item.id ? "is-active" : ""}
              onClick={() => setActiveSection(item.id)}
            >
              {item.label}
            </button>
          ))}
        </nav>
      </header>

      <div className="slide-deck">
        <section
          id="cover"
          className={`hero panel panel-green slide-page ${
            activeSection === "cover" ? "is-active" : ""
          }`}
        >
          <div className="hero-copy">
            <p className="name-badge">Suranjana Ghosh</p>
            <h1>Senior Frontend Engineer Portfolio</h1>
            <p className="lead">
              React, TypeScript, and micro-frontend specialist with 5+ years of
              experience building scalable, high-performance products for global
              users. Based in Bengaluru, India.
            </p>
          </div>
          <div className="hero-media">
            <Image
              src="https://res.cloudinary.com/d0qqvjoy/image/upload/f_auto/q_auto/kupuqqjvtis42194t68b"
              alt="Minimalist desk workspace"
              fill
              sizes="(max-width: 980px) 100vw, 42vw"
              style={{ objectFit: "cover" }}
              unoptimized
            />
          </div>
        </section>

        <section
          id="profile"
          className={`panel panel-cream split slide-page ${
            activeSection === "profile" ? "is-active" : ""
          }`}
        >
          <div className="media-block">
            <Image
              src="https://res.cloudinary.com/d0qqvjoy/image/upload/f_auto,q_auto/WhatsApp_Image_2026-09-29_at_7.52.50_PM_2"
              alt="Portrait of Suranjana Ghosh"
              width={1200}
              height={900}
              unoptimized
            />
          </div>
          <div>
            <h2>About Me</h2>
            <p className="lead-dark">
              I lead frontend architecture for large-scale enterprise products,
              balancing usability, performance, accessibility, and
              maintainability. I can provide my own visa/work permit for Germany
              within 5-8 weeks and am currently serving my notice period.
            </p>
            <h3 className="accent-title">Professional Summary</h3>
            <ul className="summary-list">
              <li>
                5+ years of frontend engineering across product and enterprise
                teams.
              </li>
              <li>
                Strong expertise in React, TypeScript, Nx, and Module
                Federation.
              </li>
              <li>
                Hands-on with accessibility, design systems, and performance
                tuning.
              </li>
            </ul>
          </div>
        </section>

        <section
          id="skills"
          className={`panel panel-split skills slide-page ${
            activeSection === "skills" ? "is-active" : ""
          }`}
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
              A combination of front-end technologies, development tools, and
              best practices used to build scalable and maintainable web
              applications.
            </p>
          </div>
          <div className="skill-card">
            <h3 className="accent-title">Professional Summary</h3>
            {skills.map((skill) => (
              <div key={skill.label} className="skill-row">
                <div className="skill-labels">
                  <span>{skill.label}</span>
                  <span>{skill.value}%</span>
                </div>
                <div className="meter">
                  <span style={{ width: `${skill.value}%` }} />
                </div>
              </div>
            ))}
          </div>
        </section>

        <section
          id="impact"
          className={`panel panel-cream metrics impact slide-page ${
            activeSection === "impact" ? "is-active" : ""
          }`}
        >
          <div className="impact-copy">
            <span className="impact-star" aria-hidden="true">&#10033;</span>
            <h2>Current Role Impact</h2>
            <p className="lead-dark">
              Leading a 19-app Nx platform for Clinisys Laboratory System,
              serving 3,000+ organizations across 42 countries.
            </p>
          </div>
          <div className="metric-grid">
            <article>
              <h3 className="impact-badge"><span>19 Apps</span></h3>
              <p>Across 5 core product areas</p>
            </article>
            <article>
              <h3 className="impact-badge"><span>5 Members</span></h3>
              <p>Team leadership and mentoring</p>
            </article>
            <article>
              <h3>+20%</h3>
              <p>Performance gain through shared architecture</p>
            </article>
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

        <section
          id="workflow"
          className={`panel panel-green workflow slide-page ${
            activeSection === "workflow" ? "is-active" : ""
          }`}
        >
          <div className="workflow-copy">
            <span className="workflow-star" aria-hidden="true">&#10033;</span>
            <h2>Delivery Workflow</h2>
            <p className="lead">
              Product-focused engineering lifecycle from architecture to quality
              gates, with automation embedded throughout development and review.
            </p>
          </div>
          <div className="workflow-grid">
            {workflow.map((step) => (
              <article key={step.id}>
                <p className="step-id">{step.id}</p>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section
          id="performance"
          className={`panel panel-cream performance slide-page ${
            activeSection === "performance" ? "is-active" : ""
          }`}
        >
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
          <div className="metric-row">
            <article>
              <h3>+30%</h3>
              <p>Faster rendering through lazy loading and optimization</p>
            </article>
            <article>
              <h3>+20%</h3>
              <p>More efficient data fetching through API and state refactors</p>
            </article>
            <article>
              <h3>4 Languages</h3>
              <p>Localization and global rollout with React i18next</p>
            </article>
          </div>
        </section>

        <section
          id="stack"
          className={`panel panel-split stack slide-page ${
            activeSection === "stack" ? "is-active" : ""
          }`}
        >
          <div className="stack-heading">
            <h2>Technology Stack</h2>
            <p>
              Tools and systems I use to build scalable, maintainable digital
              products.
            </p>
          </div>
          <div className="stack-grid">
            <article>
              <div className="stack-icon" aria-hidden="true">
                <svg viewBox="0 0 64 64" fill="none">
                  <rect x="8" y="8" width="48" height="38" rx="2" />
                  <path d="M8 16h48M13 12h2m4 0h2m4 0h2M14 23h9v7h-9zm0 11h9v7h-9zm13-11h23m-23 6h23m-23 5h23m-23 6h23M26 51h12m-10-5v5m8-5v5" />
                </svg>
              </div>
              <h3>Architecture</h3>
              <p>
                Micro-frontends, Module Federation, Nx, atomic design, and
                scalable design systems.
              </p>
            </article>
            <article>
              <div className="stack-icon" aria-hidden="true">
                <svg viewBox="0 0 64 64" fill="none">
                  <rect x="8" y="8" width="48" height="48" rx="2" />
                  <path d="M8 17h48m-42-5h2m4 0h2m4 0h2" />
                  <path d="m25 29-8 8 8 8m14-16 8 8-8 8m-4-18-6 20" />
                </svg>
              </div>
              <h3>Engineering Stack</h3>
              <p>
                React, TypeScript, Redux, TanStack Query, Node.js, REST,
                GraphQL, Vite, and Webpack.
              </p>
            </article>
            <article>
              <div className="stack-icon" aria-hidden="true">
                <svg viewBox="0 0 64 64" fill="none">
                  <rect x="8" y="8" width="48" height="48" rx="2" />
                  <path d="M8 17h48m-42-5h2m4 0h2m4 0h2" />
                  <circle cx="32" cy="37" r="14" />
                  <ellipse cx="32" cy="37" rx="6" ry="14" />
                  <path d="M18 37h28m-25-9c6 3 16 3 22 0m-22 18c6-3 16-3 22 0" />
                </svg>
              </div>
              <h3>Quality &amp; DevOps</h3>
              <p>
                Jest, RTL, Playwright, Cypress, SonarQube, Azure DevOps, Docker,
                and AI-assisted development.
              </p>
            </article>
          </div>
        </section>

        <section
          id="projects"
          className={`panel panel-cream showcase projects-page slide-page ${
            activeSection === "projects" ? "is-active" : ""
          }`}
        >
          <h2>GitHub Projects</h2>
          <p className="lead-dark">
            A few selected projects highlighting my frontend work.
          </p>
          <div className="projects-grid">
            {projects.map((project) => (
              <article key={project.name} className="project-card">
                <h3>{project.name}</h3>
                <p>{project.description}</p>
                <p className="project-meta">{project.language}</p>
                <a href={project.url} target="_blank" rel="noreferrer">
                  View Repository
                </a>
              </article>
            ))}
          </div>
        </section>

        <section
          id="achievements"
          className={`panel panel-green achievements slide-page ${
            activeSection === "achievements" ? "is-active" : ""
          }`}
        >
          <h2>Professional Achievements</h2>
          <p className="lead">
            Highlights from 5+ years of frontend engineering across healthcare,
            retail, and AI workflow platforms.
          </p>
          <div className="achievements-grid">
            <article>
              <h3>5+ Years</h3>
              <p>Frontend project experience in production environments</p>
            </article>
            <article>
              <h3>3 Domains</h3>
              <p>Healthcare, Retail, and AI/ML data operations</p>
            </article>
            <article>
              <h3>WCAG 2.1/2.2</h3>
              <p>
                Accessibility-first engineering with global product readiness
              </p>
            </article>
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
                Open to frontend opportunities and product-focused collaborations.
                Share your idea or opportunity below.
              </p>
              <div className="contact-links">
                <a href="mailto:suranjanaghosh2312@gmail.com" className="cta">
                  suranjanaghosh2312@gmail.com
                </a>
                <a href="tel:+917980883574" className="cta">
                  +91 7980883574
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
