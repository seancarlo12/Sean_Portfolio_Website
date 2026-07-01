import React, { useState, useEffect, useRef } from "react";
import {
  Linkedin,
  Mail,
  Phone,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  X,
  ArrowUpRight,
  Circle,
} from "lucide-react";
import { FaGithub } from 'react-icons/fa';
/* ------------------------------------------------------------------ */
/*  DATA                                                               */
/* ------------------------------------------------------------------ */

const PROFILE = {
  name: "Sean Carlo Tolentino",
  role: "Web Developer / IT Support",
  phone: "0938-979-1867",
  email: "seantolentino2368@gmail.com",
  github: "github.com/seancarlo12",
  githubUrl: "https://github.com/seancarlo12",
  linkedin: "linkedin.com/in/seancarlotolentino",
  linkedinUrl: "https://linkedin.com/in/seancarlotolentino",
};

const SKILLS = [
  { group: "Languages", items: ["Python", "Java", "JavaScript", "TypeScript", "C++", "SQL"] },
  { group: "Web Development", items: ["HTML", "CSS", "React", "PHP", "MySQL"] },
  { group: "IT Support & Systems", items: ["Windows OS", "Microsoft Office", "Troubleshooting", "System Configuration"] },
  { group: "Tools", items: ["VS Code", "Git", "GitHub", "Figma"] },
];

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
    desc:
      "A full-stack capstone system built for CabTech Auto Services to manage scheduling and service tracking end to end.",
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
        kind: "dashboard",
      },
      {
        label: "Appointments",
        kind: "table",
      },
      {
        label: "Service Record",
        kind: "form",
      },
    ],
  },
  {
    id: "lgu-logbook",
    file: "lgu-logbook-system.tsx",
    title: "LGU Cabanatuan City",
    subtitle: "Digital Logbook System",
    desc:
      "A digital logbook built for the Office of the City Building Official to track application records and office submissions.",
    bullets: [
      "Digitized entry and monitoring processes, reducing reliance on manual logbooks",
      "Improved data organization and retrieval for administrative staff",
      "Structured record encoding to support day-to-day workflow efficiency",
    ],
    repoUrl: PROFILE.githubUrl,
    slides: [
      {
        label: "Entry Log",
        kind: "table",
      },
      {
        label: "New Submission",
        kind: "form",
      },
      {
        label: "Status Overview",
        kind: "dashboard",
      },
    ],
  },
];

const CERTS = [
  {
    title: "Job Ready: Employability Skills",
    issuer: "Wadhwani Foundation",
    date: "May 2026",
  },
  {
    title: "English for IT",
    issuer: "Cisco Networking Academy",
    date: "December 2025",
  },
  {
    title: "JavaScript Essentials",
    issuer: "Cisco Networking Academy",
    date: "November 2025",
  },
  {
    title: "4th International Training Summit and Research Conference on Information Technology",
    issuer: "NEUST Training Department",
    date: "November 25–26, 2025",
  },
];

/* ------------------------------------------------------------------ */
/*  FAUX UI MOCKUP (used inside project slideshows — no real          */
/*  screenshots available, so we render simple wireframe previews)     */
/* ------------------------------------------------------------------ */

function MockScreen({ kind }) {
  if (kind === "dashboard") {
    return (
      <div className="mock mock-dashboard">
        <div className="mock-row">
          {[0, 1, 2].map((i) => (
            <div className="mock-card" key={i}>
              <div className="mock-card-num" />
              <div className="mock-card-label" />
            </div>
          ))}
        </div>
        <div className="mock-chart">
          {[40, 70, 55, 90, 65, 35, 80].map((h, i) => (
            <div className="mock-bar" style={{ height: `${h}%` }} key={i} />
          ))}
        </div>
      </div>
    );
  }
  if (kind === "table") {
    return (
      <div className="mock mock-table">
        <div className="mock-table-head">
          {["ID", "NAME", "DATE", "STATUS"].map((h) => (
            <div className="mock-th" key={h}>
              {h}
            </div>
          ))}
        </div>
        {[1, 2, 3, 4, 5].map((r) => (
          <div className="mock-tr" key={r}>
            <div className="mock-td short" />
            <div className="mock-td long" />
            <div className="mock-td mid" />
            <div className="mock-pill" />
          </div>
        ))}
      </div>
    );
  }
  return (
    <div className="mock mock-form">
      <div className="mock-form-title" />
      {[1, 2, 3].map((r) => (
        <div className="mock-field" key={r}>
          <div className="mock-field-label" />
          <div className="mock-field-box" />
        </div>
      ))}
      <div className="mock-field-btn" />
    </div>
  );
}

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

  const prev = () => goTo((index - 1 + project.slides.length) % project.slides.length);
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
            <MockScreen kind={slide.kind} />
          </div>
        ))}
        <button className="slide-nav slide-nav-left" onClick={prev} aria-label="Previous preview">
          <ChevronLeft size={16} strokeWidth={2.5} />
        </button>
        <button className="slide-nav slide-nav-right" onClick={next} aria-label="Next preview">
          <ChevronRight size={16} strokeWidth={2.5} />
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
        <button className="modal-close" onClick={onClose} aria-label="Close certificate">
          <X size={18} strokeWidth={2.5} />
        </button>
        <div className="cert-image">
          <div className="cert-corner cert-corner-tl" />
          <div className="cert-corner cert-corner-tr" />
          <div className="cert-corner cert-corner-bl" />
          <div className="cert-corner cert-corner-br" />
          <div className="cert-eyebrow">Certificate of Completion</div>
          <div className="cert-seal">
            <Circle size={54} strokeWidth={1} />
          </div>
          <div className="cert-title">{cert.title}</div>
          <div className="cert-divider" />
          <div className="cert-line">
            awarded to <span className="cert-name">Sean Carlo Tolentino</span>
          </div>
          <div className="cert-meta">
            <span>{cert.issuer}</span>
            <span className="cert-meta-sep">•</span>
            <span>{cert.date}</span>
          </div>
        </div>
        <p className="modal-note">Preview generated from resume data — swap in the original certificate image file when available.</p>
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
    const onScroll = () => setNavSolid(window.scrollY > 24);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="app">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500;600&family=Inter:wght@400;500;600&display=swap');

        :root {
          --black: #0a0a0a;
          --white: #ffffff;
          --paper: #f6f6f3;
          --line: #d8d8d3;
          --line-strong: #0a0a0a;
          --gray: #6f6f6a;
          --gray-soft: #a9a9a3;
        }

        * { box-sizing: border-box; }

        .app {
          background: var(--paper);
          color: var(--black);
          font-family: 'Inter', sans-serif;
          min-height: 100vh;
          position: relative;
          overflow-x: hidden;
        }

        .app::before {
          content: "";
          position: fixed;
          inset: 0;
          pointer-events: none;
          background-image:
            linear-gradient(var(--line) 1px, transparent 1px),
            linear-gradient(90deg, var(--line) 1px, transparent 1px);
          background-size: 64px 64px;
          opacity: 0.35;
          z-index: 0;
        }

        .app > * { position: relative; z-index: 1; }

        h1, h2, h3 { font-family: 'Space Grotesk', sans-serif; margin: 0; }

        .mono { font-family: 'IBM Plex Mono', monospace; }

        /* ---------------- NAV ---------------- */
        .nav {
          position: fixed;
          top: 0; left: 0; right: 0;
          z-index: 50;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 18px 40px;
          transition: background 0.3s ease, border-color 0.3s ease;
          border-bottom: 1px solid transparent;
        }
        .nav-solid {
          background: rgba(246, 246, 243, 0.9);
          backdrop-filter: blur(8px);
          border-bottom: 1px solid var(--line-strong);
        }
        .nav-logo {
          font-family: 'IBM Plex Mono', monospace;
          font-size: 14px;
          font-weight: 600;
          letter-spacing: 0.02em;
        }
        .nav-logo span { color: var(--gray-soft); }
        .nav-links {
          display: flex;
          gap: 28px;
          list-style: none;
          margin: 0; padding: 0;
        }
        .nav-links button {
          background: none; border: none; cursor: pointer;
          font-family: 'IBM Plex Mono', monospace;
          font-size: 12px;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          color: var(--black);
          padding: 4px 0;
          position: relative;
        }
        .nav-links button::after {
          content: "";
          position: absolute;
          left: 0; bottom: -2px;
          width: 0; height: 1px;
          background: var(--black);
          transition: width 0.25s ease;
        }
        .nav-links button:hover::after { width: 100%; }
        @media (max-width: 720px) { .nav-links { display: none; } }

        /* ---------------- SECTION WRAPPERS ---------------- */
        section { padding: 120px 40px; max-width: 1180px; margin: 0 auto; }
        @media (max-width: 720px) { section { padding: 90px 22px; } }

        .eyebrow {
          font-family: 'IBM Plex Mono', monospace;
          font-size: 12px;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--gray);
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 18px;
        }
        .eyebrow::before {
          content: "";
          width: 22px; height: 1px;
          background: var(--black);
        }

        /* ---------------- HERO ---------------- */
        .hero {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding-top: 100px;
        }
        .hero-kicker {
          font-family: 'IBM Plex Mono', monospace;
          font-size: 13px;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--gray);
          margin-bottom: 20px;
        }
        .hero-kicker .cursor {
          display: inline-block;
          width: 8px; height: 14px;
          background: var(--black);
          margin-left: 4px;
          animation: blink 1.1s steps(1) infinite;
          vertical-align: -2px;
        }
        @keyframes blink { 50% { opacity: 0; } }

        .hero h1 {
          font-size: clamp(48px, 9vw, 108px);
          line-height: 0.98;
          font-weight: 700;
          letter-spacing: -0.02em;
        }
        .hero-role {
          margin-top: 22px;
          font-family: 'IBM Plex Mono', monospace;
          font-size: clamp(14px, 2vw, 18px);
          color: var(--gray);
          max-width: 560px;
        }
        .hero-contacts {
          margin-top: 46px;
          display: flex;
          flex-wrap: wrap;
          gap: 14px;
        }
        .contact-pill {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 10px 16px;
          border: 1px solid var(--line-strong);
          border-radius: 999px;
          font-family: 'IBM Plex Mono', monospace;
          font-size: 12.5px;
          text-decoration: none;
          color: var(--black);
          transition: background 0.2s ease, color 0.2s ease;
        }
        .contact-pill:hover { background: var(--black); color: var(--white); }

        .hero-scroll {
          position: absolute;
          bottom: 40px;
          left: 40px;
          font-family: 'IBM Plex Mono', monospace;
          font-size: 11px;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--gray-soft);
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .hero-scroll-line {
          width: 1px; height: 40px;
          background: linear-gradient(var(--gray-soft), transparent);
        }

        /* ---------------- ABOUT / EDUCATION ---------------- */
        .about-grid {
          display: grid;
          grid-template-columns: 1fr 1.3fr;
          gap: 60px;
          align-items: start;
        }
        @media (max-width: 800px) { .about-grid { grid-template-columns: 1fr; gap: 30px; } }

        .about-grid h2 { font-size: 34px; font-weight: 600; max-width: 320px; }

        .edu-card {
          border: 1px solid var(--line-strong);
          padding: 28px 30px;
          background: var(--white);
        }
        .edu-school { font-size: 20px; font-weight: 600; }
        .edu-degree {
          margin-top: 8px;
          color: var(--gray);
          font-size: 15px;
          font-style: italic;
        }
        .edu-period {
          margin-top: 18px;
          font-family: 'IBM Plex Mono', monospace;
          font-size: 12px;
          letter-spacing: 0.06em;
          color: var(--black);
          border-top: 1px dashed var(--line);
          padding-top: 14px;
        }

        /* ---------------- SKILLS ---------------- */
        .skills-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1px;
          background: var(--line-strong);
          border: 1px solid var(--line-strong);
        }
        @media (max-width: 720px) { .skills-grid { grid-template-columns: 1fr; } }
        .skill-block { background: var(--paper); padding: 30px; }
        .skill-block-title {
          font-family: 'IBM Plex Mono', monospace;
          font-size: 12px;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--gray);
          margin-bottom: 16px;
        }
        .skill-tags { display: flex; flex-wrap: wrap; gap: 8px; }
        .skill-tag {
          border: 1px solid var(--line-strong);
          padding: 6px 12px;
          font-family: 'IBM Plex Mono', monospace;
          font-size: 12.5px;
          background: var(--white);
        }

        /* ---------------- EXPERIENCE ---------------- */
        .exp-wrap {
          display: grid;
          grid-template-columns: 260px 1fr;
          gap: 50px;
        }
        @media (max-width: 800px) { .exp-wrap { grid-template-columns: 1fr; gap: 24px; } }
        .exp-side {
          position: sticky;
          top: 110px;
          align-self: start;
        }
        .exp-title { font-size: 24px; font-weight: 600; line-height: 1.25; }
        .exp-company { margin-top: 10px; color: var(--gray); font-size: 14.5px; }
        .exp-period {
          margin-top: 16px;
          display: inline-block;
          font-family: 'IBM Plex Mono', monospace;
          font-size: 11.5px;
          letter-spacing: 0.05em;
          border: 1px solid var(--line-strong);
          padding: 6px 12px;
        }
        .exp-list { list-style: none; margin: 0; padding: 0; }
        .exp-list li {
          display: flex;
          gap: 16px;
          padding: 20px 0;
          border-top: 1px solid var(--line);
          font-size: 15.5px;
          line-height: 1.6;
        }
        .exp-list li:last-child { border-bottom: 1px solid var(--line); }
        .exp-num {
          font-family: 'IBM Plex Mono', monospace;
          font-size: 12px;
          color: var(--gray-soft);
          padding-top: 3px;
          flex-shrink: 0;
        }

        /* ---------------- PROJECTS ---------------- */
        .project-block {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 56px;
          align-items: center;
          padding: 56px 0;
          border-top: 1px solid var(--line-strong);
        }
        .project-block:last-child { border-bottom: 1px solid var(--line-strong); }
        @media (max-width: 860px) { .project-block { grid-template-columns: 1fr; gap: 30px; } }

        .project-text .file-tag {
          font-family: 'IBM Plex Mono', monospace;
          font-size: 11.5px;
          color: var(--gray);
          margin-bottom: 14px;
          display: block;
        }
        .project-text h3 { font-size: 30px; font-weight: 600; }
        .project-text .subtitle {
          margin-top: 4px;
          font-family: 'IBM Plex Mono', monospace;
          font-size: 13px;
          color: var(--gray);
        }
        .project-text p.desc {
          margin-top: 18px;
          font-size: 15px;
          line-height: 1.7;
          color: #333;
          max-width: 460px;
        }
        .project-bullets {
          list-style: none;
          margin: 20px 0 0;
          padding: 0;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .project-bullets li {
          font-size: 13.5px;
          line-height: 1.6;
          color: #444;
          padding-left: 18px;
          position: relative;
        }
        .project-bullets li::before {
          content: "";
          position: absolute;
          left: 0; top: 8px;
          width: 6px; height: 1px;
          background: var(--black);
        }
        .repo-link {
          margin-top: 26px;
          display: inline-flex;
          align-items: center;
          gap: 9px;
          font-family: 'IBM Plex Mono', monospace;
          font-size: 13px;
          text-decoration: none;
          color: var(--white);
          background: var(--black);
          padding: 12px 18px;
          transition: transform 0.15s ease;
        }
        .repo-link:hover { transform: translateY(-2px); }

        /* --- slideshow --- */
        .slideshow {
          border: 1px solid var(--line-strong);
          background: var(--white);
        }
        .browser-chrome {
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 10px 14px;
          border-bottom: 1px solid var(--line-strong);
        }
        .chrome-dots { display: flex; gap: 6px; }
        .chrome-dots .dot {
          width: 8px; height: 8px;
          border-radius: 50%;
          border: 1px solid var(--black);
        }
        .chrome-bar {
          flex: 1;
          font-family: 'IBM Plex Mono', monospace;
          font-size: 11px;
          color: var(--gray);
          background: var(--paper);
          border: 1px solid var(--line);
          padding: 4px 10px;
          text-align: center;
        }
        .slideshow-viewport {
          position: relative;
          height: 320px;
          overflow: hidden;
        }
        .slide {
          position: absolute; inset: 0;
          padding: 26px;
          opacity: 0;
          transform: translateX(14px);
          transition: opacity 0.5s ease, transform 0.5s ease;
        }
        .slide-active { opacity: 1; transform: translateX(0); }
        .slide-nav {
          position: absolute;
          top: 50%; transform: translateY(-50%);
          width: 30px; height: 30px;
          border: 1px solid var(--line-strong);
          background: var(--white);
          display: flex; align-items: center; justify-content: center;
          cursor: pointer;
        }
        .slide-nav-left { left: 12px; }
        .slide-nav-right { right: 12px; }
        .slideshow-footer {
          display: flex; align-items: center; justify-content: space-between;
          padding: 12px 16px;
          border-top: 1px solid var(--line-strong);
        }
        .slide-caption {
          font-family: 'IBM Plex Mono', monospace;
          font-size: 11.5px;
          color: var(--gray);
        }
        .slide-dots { display: flex; gap: 6px; }
        .slide-dot {
          width: 6px; height: 6px;
          border-radius: 50%;
          border: 1px solid var(--black);
          background: transparent;
          cursor: pointer;
          padding: 0;
        }
        .slide-dot-active { background: var(--black); }

        /* --- mock ui screens --- */
        .mock { width: 100%; height: 100%; }
        .mock-dashboard { display: flex; flex-direction: column; gap: 18px; height: 100%; }
        .mock-row { display: flex; gap: 12px; }
        .mock-card {
          flex: 1; border: 1px solid var(--line-strong);
          padding: 14px; display: flex; flex-direction: column; gap: 10px;
        }
        .mock-card-num { width: 40%; height: 14px; background: var(--black); }
        .mock-card-label { width: 70%; height: 6px; background: var(--line); }
        .mock-chart {
          flex: 1;
          display: flex; align-items: flex-end; gap: 8px;
          border: 1px solid var(--line-strong);
          padding: 16px;
        }
        .mock-bar { flex: 1; background: var(--black); opacity: 0.85; }

        .mock-table { display: flex; flex-direction: column; height: 100%; border: 1px solid var(--line-strong); }
        .mock-table-head { display: flex; background: var(--black); }
        .mock-th { flex: 1; color: var(--white); font-family: 'IBM Plex Mono', monospace; font-size: 10px; padding: 10px 12px; letter-spacing: 0.06em; }
        .mock-tr { display: flex; align-items: center; gap: 10px; padding: 12px; border-top: 1px solid var(--line); }
        .mock-td { height: 8px; background: var(--line); }
        .mock-td.short { width: 12%; }
        .mock-td.long { flex: 1; }
        .mock-td.mid { width: 20%; }
        .mock-pill { width: 50px; height: 16px; border: 1px solid var(--black); }

        .mock-form { border: 1px solid var(--line-strong); padding: 22px; height: 100%; display: flex; flex-direction: column; gap: 18px; }
        .mock-form-title { width: 45%; height: 14px; background: var(--black); margin-bottom: 4px; }
        .mock-field { display: flex; flex-direction: column; gap: 8px; }
        .mock-field-label { width: 30%; height: 6px; background: var(--gray-soft); }
        .mock-field-box { height: 26px; border: 1px solid var(--line); }
        .mock-field-btn { margin-top: auto; width: 120px; height: 34px; background: var(--black); }

        /* ---------------- CERTIFICATIONS ---------------- */
        .cert-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1px;
          background: var(--line-strong);
          border: 1px solid var(--line-strong);
        }
        @media (max-width: 720px) { .cert-grid { grid-template-columns: 1fr; } }
        .cert-card {
          background: var(--paper);
          padding: 30px;
          text-align: left;
          border: none;
          cursor: pointer;
          display: flex;
          flex-direction: column;
          gap: 16px;
          transition: background 0.2s ease, color 0.2s ease;
        }
        .cert-card:hover { background: var(--black); color: var(--white); }
        .cert-card:hover .cert-card-issuer { color: var(--gray-soft); }
        .cert-card-top {
          display: flex; align-items: center; justify-content: space-between;
        }
        .cert-card-index { font-family: 'IBM Plex Mono', monospace; font-size: 12px; }
        .cert-card-title { font-size: 16.5px; font-weight: 600; line-height: 1.4; }
        .cert-card-issuer { font-family: 'IBM Plex Mono', monospace; font-size: 12px; color: var(--gray); }

        /* ---------------- MODAL ---------------- */
        .modal-overlay {
          position: fixed; inset: 0;
          background: rgba(10, 10, 10, 0.86);
          display: flex; align-items: center; justify-content: center;
          padding: 30px;
          z-index: 100;
        }
        .modal-panel {
          background: var(--white);
          max-width: 560px;
          width: 100%;
          position: relative;
          padding: 30px;
        }
        .modal-close {
          position: absolute;
          top: 14px; right: 14px;
          width: 32px; height: 32px;
          border: 1px solid var(--black);
          background: var(--white);
          display: flex; align-items: center; justify-content: center;
          cursor: pointer;
        }
        .cert-image {
          border: 2px solid var(--black);
          padding: 50px 34px;
          position: relative;
          text-align: center;
          display: flex; flex-direction: column; align-items: center;
        }
        .cert-corner { position: absolute; width: 16px; height: 16px; border: 1px solid var(--black); }
        .cert-corner-tl { top: 8px; left: 8px; border-right: none; border-bottom: none; }
        .cert-corner-tr { top: 8px; right: 8px; border-left: none; border-bottom: none; }
        .cert-corner-bl { bottom: 8px; left: 8px; border-right: none; border-top: none; }
        .cert-corner-br { bottom: 8px; right: 8px; border-left: none; border-top: none; }
        .cert-eyebrow {
          font-family: 'IBM Plex Mono', monospace;
          font-size: 11px; letter-spacing: 0.14em; text-transform: uppercase;
          color: var(--gray);
        }
        .cert-seal { margin: 18px 0; }
        .cert-title { font-family: 'Space Grotesk', sans-serif; font-size: 21px; font-weight: 600; line-height: 1.35; max-width: 400px; }
        .cert-divider { width: 60px; height: 1px; background: var(--black); margin: 20px 0; }
        .cert-line { font-size: 13.5px; color: var(--gray); }
        .cert-name { color: var(--black); font-weight: 600; font-family: 'IBM Plex Mono', monospace; }
        .cert-meta {
          margin-top: 14px;
          font-family: 'IBM Plex Mono', monospace;
          font-size: 12px; color: var(--gray);
          display: flex; gap: 8px;
        }
        .modal-note { margin-top: 18px; font-size: 11.5px; color: var(--gray-soft); text-align: center; }

        /* ---------------- FOOTER ---------------- */
        .footer {
          border-top: 1px solid var(--line-strong);
          padding: 60px 40px;
          display: flex; justify-content: space-between; align-items: flex-end;
          gap: 30px; flex-wrap: wrap;
        }
        .footer-left h2 { font-size: 30px; }
        .footer-links { display: flex; gap: 18px; }
        .footer-links a {
          color: var(--black);
          display: flex; align-items: center; justify-content: center;
          width: 42px; height: 42px;
          border: 1px solid var(--black);
        }
        .footer-copy {
          width: 100%;
          font-family: 'IBM Plex Mono', monospace;
          font-size: 11px; color: var(--gray-soft);
          margin-top: 30px;
        }
      `}</style>

      {/* NAV */}
      <nav className={`nav ${navSolid ? "nav-solid" : ""}`}>
        <span className="nav-logo">
          SCT<span>.dev</span>
        </span>
        <ul className="nav-links">
          <li><button onClick={() => scrollTo("about")}>About</button></li>
          <li><button onClick={() => scrollTo("experience")}>Experience</button></li>
          <li><button onClick={() => scrollTo("projects")}>Projects</button></li>
          <li><button onClick={() => scrollTo("certs")}>Certifications</button></li>
          <li><button onClick={() => scrollTo("contact")}>Contact</button></li>
        </ul>
      </nav>

      {/* HERO */}
      <section className="hero" id="top">
        <div className="hero-kicker">
          IT student & web developer<span className="cursor" />
        </div>
        <h1>
          Sean Carlo
          <br />
          Tolentino
        </h1>
        <p className="hero-role">
          BS Information Technology, Web System Development — Nueva Ecija University of Science and Technology.
          Building practical, full-stack tools for real offices and real problems.
        </p>
        <div className="hero-contacts">
          <a className="contact-pill" href={`mailto:${PROFILE.email}`}>
            <Mail size={14} /> {PROFILE.email}
          </a>
          <a className="contact-pill" href={`tel:${PROFILE.phone}`}>
            <Phone size={14} /> {PROFILE.phone}
          </a>
          <a className="contact-pill" href={PROFILE.githubUrl} target="_blank" rel="noreferrer">
            <FaGitHub size={14} /> {PROFILE.github}
          </a>
          <a className="contact-pill" href={PROFILE.linkedinUrl} target="_blank" rel="noreferrer">
            <Linkedin size={14} /> {PROFILE.linkedin}
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
            <div className="edu-school">Nueva Ecija University of Science and Technology</div>
            <div className="edu-degree">Bachelor of Science in Information Technology, Major in Web System Development</div>
            <div className="edu-period mono">2020 — 2026</div>
          </div>
        </div>
      </section>

      {/* SKILLS */}
      <section id="skills">
        <div className="eyebrow">Skills</div>
        <h2 style={{ fontSize: 34, fontWeight: 600, marginBottom: 34 }}>Toolkit</h2>
        <div className="skills-grid">
          {SKILLS.map((s) => (
            <div className="skill-block" key={s.group}>
              <div className="skill-block-title">{s.group}</div>
              <div className="skill-tags">
                {s.items.map((item) => (
                  <span className="skill-tag" key={item}>{item}</span>
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
                <span className="exp-num mono">{String(i + 1).padStart(2, "0")}</span>
                <span>{b}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* PROJECTS */}
      <section id="projects">
        <div className="eyebrow">Projects</div>
        <h2 style={{ fontSize: 34, fontWeight: 600, marginBottom: 10 }}>Selected work</h2>
        <p className="mono" style={{ fontSize: 12.5, color: "var(--gray)" }}>
          Preview panels are illustrative wireframes generated from the project description — swap in real screenshots any time.
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
              <a className="repo-link" href={p.repoUrl} target="_blank" rel="noreferrer">
                View repository <ArrowUpRight size={15} />
              </a>
            </div>
            <ProjectSlideshow project={p} />
          </div>
        ))}
      </section>

      {/* CERTIFICATIONS */}
      <section id="certs">
        <div className="eyebrow">Certifications</div>
        <h2 style={{ fontSize: 34, fontWeight: 600, marginBottom: 10 }}>Credentials</h2>
        <p className="mono" style={{ fontSize: 12.5, color: "var(--gray)", marginBottom: 34 }}>
          Click a certificate to view it.
        </p>
        <div className="cert-grid">
          {CERTS.map((c, i) => (
            <button className="cert-card" key={c.title} onClick={() => setActiveCert(c)}>
              <div className="cert-card-top">
                <span className="cert-card-index mono">{String(i + 1).padStart(2, "0")}</span>
                <ExternalLink size={15} />
              </div>
              <div className="cert-card-title">{c.title}</div>
              <div className="cert-card-issuer">{c.issuer} — {c.date}</div>
            </button>
          ))}
        </div>
      </section>

      {/* FOOTER / CONTACT */}
      <footer className="footer" id="contact">
        <div className="footer-left">
          <div className="eyebrow" style={{ marginBottom: 12 }}>Get in touch</div>
          <h2>Let's build something.</h2>
        </div>
        <div className="footer-links">
          <a href={`mailto:${PROFILE.email}`} aria-label="Email"><Mail size={18} /></a>
          <a href={`tel:${PROFILE.phone}`} aria-label="Phone"><Phone size={18} /></a>
          <a href={PROFILE.githubUrl} target="_blank" rel="noreferrer" aria-label="GitHub"><FaGitHub size={18} /></a>
          <a href={PROFILE.linkedinUrl} target="_blank" rel="noreferrer" aria-label="LinkedIn"><Linkedin size={18} /></a>
        </div>
        <div className="footer-copy">© 2026 Sean Carlo Tolentino — built in React.</div>
      </footer>

      <CertificateModal cert={activeCert} onClose={() => setActiveCert(null)} />
    </div>
  );
}
