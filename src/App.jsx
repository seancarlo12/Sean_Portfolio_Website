import "./App.css";
import React, { useState, useEffect, useRef } from "react";
import {
  FaGithub,
  FaLinkedin,
  FaEnvelope,
  FaPhone,
  FaExternalLinkAlt,
} from "react-icons/fa";

import Lenis from "lenis";

import {
  FiChevronLeft,
  FiChevronRight,
  FiArrowUpRight,
  FiX,
  FiCircle,
} from "react-icons/fi";

/* ------------------------------------------------------------------ */
/*  DATA                                                               */
/* ------------------------------------------------------------------ */

const PROFILE = {
  name: "Sean Carlo Tolentino",
  role: "Web Developer | IT Support",
  phone: "0938-979-1867",
  email: "seantolentino2368@gmail.com",
  github: "github.com/seancarlo12",
  githubUrl: "https://github.com/seancarlo12",
  linkedin: "linkedin.com/in/seancarlotolentino",
  linkedinUrl: "https://linkedin.com/in/seancarlotolentino",
};

const SKILLS = [
  {
    group: "Languages",
    items: ["Python", "Java", "JavaScript", "TypeScript", "C++", "SQL"],
  },
  {
    group: "Web Development",
    items: ["HTML", "CSS", "React", "PHP", "MySQL"],
  },
  {
    group: "IT Support & Systems",
    items: [
      "Windows OS",
      "Microsoft Office",
      "Troubleshooting",
      "System Configuration",
    ],
  },
  {
    group: "Tools",
    items: ["VS Code", "Git", "GitHub", "Figma"],
  },
];

const SKILL_ICONS = {
  Python: "devicon-python-plain",
  Java: "devicon-java-plain",
  JavaScript: "devicon-javascript-plain",
  TypeScript: "devicon-typescript-plain",
  "C++": "devicon-cplusplus-plain",
  SQL: "devicon-mysql-plain",

  HTML: "devicon-html5-plain",
  CSS: "devicon-css3-plain",
  React: "devicon-react-original",
  PHP: "devicon-php-plain",
  MySQL: "devicon-mysql-original",

  "Windows OS": "devicon-windows8-original",
  "Microsoft Office": "devicon-microsoftsqlserver-plain", // placeholder
  Troubleshooting: "devicon-devicon-plain",
  "System Configuration": "devicon-devicon-plain",

  "VS Code": "devicon-vscode-plain",
  Git: "devicon-git-plain",
  GitHub: "devicon-github-original",
  Figma: "devicon-figma-plain",
};

const EXPERIENCE = {
  company: "Local Government Unit (LGU) — Cabanatuan City",
  title: "IT On-The-Job Trainee",
  period: "Jan 2026 — May 2026",
  bullets: [
    "Encoded and maintained digital records, improving data accuracy and organization across departments",
    "Troubleshot basic hardware and software issues, minimizing minor operational delays",
    "Supported staff in using office tools and internal systems for daily transactions",
    "Developed a logbook system for application tracking, improving monitoring and record management of submitted requests",
    "Automated building and occupancy permit certification workflows using Excel VBA, streamlining data processing and reducing manual encoding time",
    "Collaborated with office personnel in a structured government environment, completing assigned IT tasks efficiently",
  ],
};

const PROJECTS = [
  {
    id: "cabtech",
    file: "cabtech-auto-services.tsx",
    title: "CabTech Auto Services",
    subtitle: "Scheduling & Tracking System",
    desc: "A full-stack capstone system built for CabTech Auto Services to manage scheduling and service tracking end to end.",
    bullets: [
      "Core modules for service requests, appointment handling, and status monitoring",
      "Designed and structured the database for clients, vehicles, services, and service records",
      "Digitized manual scheduling and tracking processes to improve operational workflow",
      "Full-stack build focused on real-world use case simulation for auto service management",
    ],
    repoUrl: PROFILE.githubUrl,
    slides: [
      {
        label: "Dashboard",
        image: "https://res.cloudinary.com/k0n4rwiu/image/upload/v1782931900/dashboard_s9uncy.png",
        // image: "/images/cabtech/dashboard.png",
      },
      {
        label: "Appointments",
        image: "https://res.cloudinary.com/k0n4rwiu/image/upload/f_auto,q_auto/appointments_sgbjou",
        // image: "/images/cabtech/appointments.png",
      },
      {
        label: "Service Record",
        image: "https://res.cloudinary.com/k0n4rwiu/image/upload/v1782931897/service-record_msmod7.png",
        // image: "/images/cabtech/service-record.png",
      },
    ],
  },
  {
    id: "lgu-logbook",
    file: "lgu-logbook-system.tsx",
    title: "LGU Cabanatuan City",
    subtitle: "Digital Logbook System",
    desc: "A digital logbook built for the Office of the City Building Official to track application records and office submissions.",
    bullets: [
      "Digitized entry and monitoring processes, reducing reliance on manual logbooks",
      "Improved data organization and retrieval for administrative staff",
      "Structured record encoding to support day-to-day workflow efficiency",
    ],
    repoUrl: PROFILE.githubUrl,
    slides: [
      {
        label: "Entry Log",
        // image: "/images/logbook/entry-log.png",
        image: "https://res.cloudinary.com/k0n4rwiu/image/upload/v1782931942/entry-log_bvv8jt.png",
      },
      {
        label: "Logbook Records",
        // image: "/images/logbook/logs.png",
        image: "https://res.cloudinary.com/k0n4rwiu/image/upload/v1782931941/logs_dj9vvc.png",
      },
      {
        label: "Status Overview",
        // image: "/images/logbook/status-overview.png",
        image: "https://res.cloudinary.com/k0n4rwiu/image/upload/v1782931928/status-overview_lcivg3.png",
      },
    ],
  },
];

const CERTS = [
  {
    title: "Job Ready: Employability Skills",
    issuer: "Wadhwani Foundation",
    date: "May 2026",
    image: "/images/certificates/job-ready.png",
        image: "https://res.cloudinary.com/k0n4rwiu/image/upload/v1782931908/job-ready_b3ori6.png",
  },
  {
    title: "English for IT",
    issuer: "Cisco Networking Academy",
    date: "December 2025",
    image: "images/certificates/english-for-it.png",
        image: "https://res.cloudinary.com/k0n4rwiu/image/upload/v1782931925/english-for-it_b0dv4u.png",
  },
  {
    title: "JavaScript Essentials",
    issuer: "Cisco Networking Academy",
    date: "November 2025",
    image: "images/certificates/javascript-essentials.png",
        image: "https://res.cloudinary.com/k0n4rwiu/image/upload/v1782931923/javascript-essentials_yagfjl.png",
  },
  // {
  //   title:
  //     "4th International Training Summit and Research Conference on Information Technology",
  //   issuer: "NEUST Training Department",
  //   date: "November 25–26, 2025",
  //   image: "images/certificates/itsrcit.png",
  //       image: "https://res.cloudinary.com/k0n4rwiu/image/upload/v1782931928/status-overview_lcivg3.png",
  // },
];

/* ------------------------------------------------------------------ */
/*  PROJECT SLIDESHOW                                                  */
/* ------------------------------------------------------------------ */

function ProjectSlideshow({ project }) {
  const [index, setIndex] = useState(0);
  const timer = useRef(null);

  useEffect(() => {
    timer.current = setInterval(() => {
      setIndex((i) => (i + 1) % project.slides.length);
    }, 3400);
    return () => clearInterval(timer.current);
  }, [project.slides.length]);

  const goTo = (i) => {
    clearInterval(timer.current);
    setIndex(i);
    timer.current = setInterval(() => {
      setIndex((prev) => (prev + 1) % project.slides.length);
    }, 3400);
  };

  const prev = () =>
    goTo((index - 1 + project.slides.length) % project.slides.length);
  const next = () => goTo((index + 1) % project.slides.length);

  return (
    <div className="slideshow">
      <div className="browser-chrome">
        <div className="chrome-dots">
          <span className="dot" />
          <span className="dot" />
          <span className="dot" />
        </div>
        <div className="chrome-bar">{project.file}</div>
      </div>
      <div className="slideshow-viewport">
        {project.slides.map((slide, i) => (
          <div
            className={`slide ${i === index ? "slide-active" : ""}`}
            key={slide.label}
            aria-hidden={i !== index}
          >
            <img src={slide.image} alt={slide.label} className="slide-image" />
          </div>
        ))}
        <button
          className="slide-nav slide-nav-left"
          onClick={prev}
          aria-label="Previous preview"
        >
          <FiChevronLeft size={16} />
        </button>
        <button
          className="slide-nav slide-nav-right"
          onClick={next}
          aria-label="Next preview"
        >
          <FiChevronRight size={16} />
        </button>
      </div>
      <div className="slideshow-footer">
        <span className="slide-caption">{project.slides[index].label}</span>
        <div className="slide-dots">
          {project.slides.map((s, i) => (
            <button
              key={s.label}
              className={`slide-dot ${i === index ? "slide-dot-active" : ""}`}
              onClick={() => goTo(i)}
              aria-label={`Go to ${s.label}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  CERTIFICATE MODAL                                                  */
/* ------------------------------------------------------------------ */

function CertificateModal({ cert, onClose }) {
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  if (!cert) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-panel" onClick={(e) => e.stopPropagation()}>
        <button
          className="modal-close"
          onClick={onClose}
          aria-label="Close certificate"
        >
          <FiX size={18} />
        </button>
        <img src={cert.image} alt={cert.title} className="cert-image" />
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  MAIN APP                                                           */
/* ------------------------------------------------------------------ */

export default function App() {
  const [activeCert, setActiveCert] = useState(null);
  const [navSolid, setNavSolid] = useState(false);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 0.8,
      smoothWheel: true,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => lenis.destroy();
  }, []);

  useEffect(() => {
    const onScroll = () => setNavSolid(window.scrollY > 24);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="app">
      {/* NAV */}
      <nav className={`nav ${navSolid ? "nav-solid" : ""}`}>
        <span className="nav-logo">
          SCT<span>.dev</span>
        </span>
        <ul className="nav-links">
          <li>
            <button onClick={() => scrollTo("about")}>About</button>
          </li>
          <li>
            <button onClick={() => scrollTo("experience")}>Experience</button>
          </li>
          <li>
            <button onClick={() => scrollTo("projects")}>Projects</button>
          </li>
          <li>
            <button onClick={() => scrollTo("certs")}>Certifications</button>
          </li>
          <li>
            <button onClick={() => scrollTo("contact")}>Contact</button>
          </li>
        </ul>
      </nav>

      {/* HERO */}
      <section className="hero" id="top">
        <div className="hero-kicker">
          {PROFILE.role}
          <span className="cursor" />
        </div>
        <h1>
          Sean Carlo
          <br />
          Tolentino
        </h1>
        <p className="hero-role">
          BS Information Technology major in Web System Development at Nueva Ecija University of Science and Technology, 
          focused on building practical, user-centered web applications that solve real-world business and organizational challenges.
        </p>
        <div className="hero-contacts">
          <a className="contact-pill" href={`mailto:${PROFILE.email}`}>
            <FaEnvelope size={14} /> {PROFILE.email}
          </a>
          <a className="contact-pill" href={`tel:${PROFILE.phone}`}>
            <FaPhone size={14} /> {PROFILE.phone}
          </a>
          <a
            className="contact-pill"
            href={PROFILE.githubUrl}
            target="_blank"
            rel="noreferrer"
          >
            <FaGithub size={14} /> {PROFILE.github}
          </a>
          <a
            className="contact-pill"
            href={PROFILE.linkedinUrl}
            target="_blank"
            rel="noreferrer"
          >
            <FaLinkedin size={14} /> {PROFILE.linkedin}
          </a>
        </div>
      </section>

      {/* ABOUT / EDUCATION */}
      <section id="about">
        <div className="about-grid">
          <div>
            <div className="eyebrow">Education</div>
            <h2>A degree built on doing, not just studying.</h2>
          </div>
          <div className="edu-card">
            <div className="edu-school">
              Nueva Ecija University of Science and Technology
            </div>
            <div className="edu-degree">
              Bachelor of Science in Information Technology, Major in Web System
              Development
            </div>
            <div className="edu-period mono">2020 — 2026</div>
          </div>
        </div>
      </section>

      {/* SKILLS */}
      <section id="skills">
        <div className="eyebrow">Skills</div>
        <h2 style={{ fontSize: 34, fontWeight: 600, marginBottom: 34 }}>
          Toolkit
        </h2>
        <div className="skills-grid">
          {SKILLS.map((s) => (
            <div className="skill-block" key={s.group}>
              <div className="skill-block-title">{s.group}</div>

              <div className="skill-tags">
                {s.items.map((item) => (
                  <span className="skill-tag" key={item}>
                    <i className={SKILL_ICONS[item]} />
                    <span>{item}</span>
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* EXPERIENCE */}
      <section id="experience">
        <div className="eyebrow">Experience</div>
        <div className="exp-wrap">
          <div className="exp-side">
            <div className="exp-title">{EXPERIENCE.title}</div>
            <div className="exp-company">{EXPERIENCE.company}</div>
            <div className="exp-period">{EXPERIENCE.period}</div>
          </div>
          <ul className="exp-list">
            {EXPERIENCE.bullets.map((b, i) => (
              <li key={i}>
                <span className="exp-num mono">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span>{b}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* PROJECTS */}
      <section id="projects">
        <div className="eyebrow">Projects</div>
        <h2 style={{ fontSize: 34, fontWeight: 600, marginBottom: 10 }}>
          Selected work
        </h2>
        <p className="mono" style={{ fontSize: 12.5, color: "var(--gray)" }}>
          Screenshots and demonstrations of real projects I have designed and developed.
        </p>

        {PROJECTS.map((p) => (
          <div className="project-block" key={p.id}>
            <div className="project-text">
              <span className="file-tag mono">// {p.file}</span>
              <h3>{p.title}</h3>
              <div className="subtitle">{p.subtitle}</div>
              <p className="desc">{p.desc}</p>
              <ul className="project-bullets">
                {p.bullets.map((b, i) => (
                  <li key={i}>{b}</li>
                ))}
              </ul>
              <a
                className="repo-link"
                href={p.repoUrl}
                target="_blank"
                rel="noreferrer"
              >
                View repository <FiArrowUpRight size={15} />
              </a>
            </div>
            <ProjectSlideshow project={p} />
          </div>
        ))}
      </section>

      {/* CERTIFICATIONS */}
      <section id="certs">
        <div className="eyebrow">Certifications</div>
        <h2 style={{ fontSize: 34, fontWeight: 600, marginBottom: 10 }}>
          Credentials
        </h2>
        <p
          className="mono"
          style={{ fontSize: 12.5, color: "var(--gray)", marginBottom: 34 }}
        >
          Click a certificate to view it.
        </p>
        <div className="cert-grid">
          {CERTS.map((c, i) => (
            <button
              className="cert-card"
              key={c.title}
              onClick={() => setActiveCert(c)}
            >
              <div className="cert-card-top">
                <span className="cert-card-index mono">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <FaExternalLinkAlt size={15} />
              </div>
              <div className="cert-card-title">{c.title}</div>
              <div className="cert-card-issuer">
                {c.issuer} — {c.date}
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* FOOTER / CONTACT */}
      <footer className="footer" id="contact">
        <div className="footer-left">
          <div className="eyebrow" style={{ marginBottom: 12 }}>
            Get in touch
          </div>
          <h2>Let's build something.</h2>
        </div>
        <div className="footer-links">
          <a href={`mailto:${PROFILE.email}`} aria-label="Email">
            <FaEnvelope size={18} />
          </a>
          <a href={`tel:${PROFILE.phone}`} aria-label="Phone">
            <FaPhone size={18} />
          </a>
          <a
            href={PROFILE.githubUrl}
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
          >
            <FaGithub size={18} />
          </a>
          <a
            href={PROFILE.linkedinUrl}
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
          >
            <FaLinkedin size={18} />
          </a>
        </div>
        <div className="footer-copy">
          © 2026 Sean Carlo Tolentino
        </div>
      </footer>

      <CertificateModal cert={activeCert} onClose={() => setActiveCert(null)} />
    </div>
  );
}
