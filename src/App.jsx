import { useState, useEffect, useRef } from "react";

// ── IMAGE IMPORTS ─────────────────────────────────────────────────────────────
import htmlIcon from "./images/html.png";
import cssIcon from "./images/css.png";
import jsIcon from "./images/js.png";
import bootstrapIcon from "./images/bootstrap.png";
import reactIcon from "./images/react.png";
import tailwindIcon from "./images/tailwind.png";
import mysqlIcon from "./images/mysql.png";
import oracleIcon from "./images/oracle.png";
import gitIcon from "./images/git.png";
import githubIcon from "./images/github.png";
import nodejsIcon from "./images/nodejs.png";
import kotlinIcon from "./images/kotlin.png";

import qcuImg from "./images/qcu.jpg";
import vetImg from "./images/vet.jpg";
import brewImg from "./images/brewtopia.png";
import me from "./images/enerio.jpeg"

// ── STYLES ────────────────────────────────────────────────────────────────────
const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=DM+Sans:wght@300;400;500;600&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --primary: #ffffff;
    --navy: #0f172a;
    --navy2: #1e293b;
    --accent: #3b82f6;
    --accent2: #e2e8f0;
    --text: #0f172a;
    --muted: #475569;
    --border: #e2e8f0;
  }

  html { scroll-behavior: smooth; }

  body {
    font-family: 'DM Sans', sans-serif;
    background: var(--primary);
    color: var(--text);
    overflow-x: hidden;
  }

  .display { font-family: 'Playfair Display', serif; }

  /* NAV */
  nav {
    position: fixed; top: 0; left: 0; right: 0; z-index: 100;
    background: rgba(255,255,255,0.92);
    backdrop-filter: blur(12px);
    border-bottom: 1px solid var(--border);
    padding: 0 5%;
    display: flex; align-items: center; justify-content: space-between;
    height: 64px;
  }
  .nav-logo { font-family: 'Playfair Display', serif; font-size: 22px; font-weight: 900; color: var(--navy); }
  .nav-logo span { color: var(--accent); }
  .nav-links { display: flex; gap: 36px; list-style: none; }
  .nav-links a { text-decoration: none; color: var(--muted); font-size: 14px; font-weight: 500; letter-spacing: 0.5px; transition: color 0.2s; }
  .nav-links a:hover { color: var(--accent); }
  .nav-cta { background: var(--navy); color: white; border: none; padding: 10px 22px; border-radius: 8px; font-family: 'DM Sans', sans-serif; font-size: 13px; font-weight: 600; cursor: pointer; transition: background 0.2s; }
  .nav-cta:hover { background: var(--accent); }
  .hamburger { display: none; flex-direction: column; gap: 5px; cursor: pointer; background: none; border: none; padding: 4px; }
  .hamburger span { display: block; width: 22px; height: 2px; background: var(--navy); border-radius: 2px; transition: all 0.3s; }

  /* HERO */
  .hero {
    min-height: 100vh;
    display: grid;
    grid-template-columns: 1fr 1fr;
    align-items: center;
    padding: 80px 8% 40px;
    gap: 60px;
    background: linear-gradient(135deg, #ffffff 0%, #f0f7ff 100%);
    position: relative;
    overflow: hidden;
  }
  .hero::before {
    content: '';
    position: absolute;
    width: 600px; height: 600px;
    background: radial-gradient(circle, rgba(59,130,246,0.08) 0%, transparent 70%);
    top: -100px; right: -100px;
    border-radius: 50%;
  }
  .hero-tag { display: inline-block; background: rgba(59,130,246,0.1); color: var(--accent); font-size: 12px; font-weight: 600; letter-spacing: 2px; text-transform: uppercase; padding: 6px 14px; border-radius: 20px; margin-bottom: 20px; }
  .hero h1 { font-family: 'Playfair Display', serif; font-size: clamp(42px, 5vw, 68px); font-weight: 900; line-height: 1.1; color: var(--navy); margin-bottom: 20px; }
  .hero h1 span { color: var(--accent); }
  .hero-sub { font-size: 17px; color: var(--muted); line-height: 1.7; margin-bottom: 36px; max-width: 480px; font-weight: 400; }
  .hero-btns { display: flex; gap: 14px; flex-wrap: wrap; }
  .btn-primary { background: var(--navy); color: white; padding: 14px 30px; border-radius: 10px; border: none; font-family: 'DM Sans', sans-serif; font-size: 15px; font-weight: 600; cursor: pointer; transition: all 0.2s; text-decoration: none; display: inline-block; }
  .btn-primary:hover { background: var(--accent); transform: translateY(-2px); }
  .btn-outline { background: transparent; color: var(--navy); padding: 14px 30px; border-radius: 10px; border: 2px solid var(--border); font-family: 'DM Sans', sans-serif; font-size: 15px; font-weight: 600; cursor: pointer; transition: all 0.2s; text-decoration: none; display: inline-block; }
  .btn-outline:hover { border-color: var(--accent); color: var(--accent); transform: translateY(-2px); }
  .hero-img-wrap { position: relative; display: flex; justify-content: center; align-items: center; }
  .hero-img-bg { width: 380px; height: 420px; background: linear-gradient(145deg, var(--accent), var(--navy)); border-radius: 32px 8px 32px 8px; position: relative; overflow: hidden; box-shadow: 0 40px 80px rgba(15,23,42,0.2); }
  .hero-img-bg img { width: 100%; height: 100%; object-fit: cover; object-position: top; }
  .hero-badge { position: absolute; bottom: -16px; left: -16px; background: white; border-radius: 16px; padding: 14px 20px; box-shadow: 0 8px 30px rgba(0,0,0,0.12); display: flex; align-items: center; gap: 10px; }
  .hero-badge-dot { width: 10px; height: 10px; background: #22c55e; border-radius: 50%; animation: pulse 2s infinite; }
  @keyframes pulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.6;transform:scale(1.3)} }
  .hero-badge span { font-size: 13px; font-weight: 600; color: var(--navy); }

  /* SECTION BASE */
  section { padding: 100px 8%; }
  .section-tag { display: inline-block; background: rgba(59,130,246,0.1); color: var(--accent); font-size: 11px; font-weight: 700; letter-spacing: 3px; text-transform: uppercase; padding: 5px 12px; border-radius: 20px; margin-bottom: 14px; }
  .section-title { font-family: 'Playfair Display', serif; font-size: clamp(32px, 4vw, 48px); font-weight: 900; color: var(--navy); margin-bottom: 16px; }
  .section-sub { font-size: 16px; color: var(--muted); line-height: 1.7; max-width: 560px; font-weight: 400; }
  .section-header { margin-bottom: 60px; }

  /* ABOUT */
  .about { background: var(--navy); }
  .about .section-tag { background: rgba(59,130,246,0.2); }
  .about .section-title { color: white; }
  .about .section-sub { color: #cbd5e1; }
  .about-grid { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 24px; margin-top: 50px; }
  .about-card { background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.08); border-radius: 16px; padding: 28px; transition: border-color 0.3s, transform 0.3s; }
  .about-card:hover { border-color: var(--accent); transform: translateY(-4px); }
  .about-card-icon { font-size: 28px; margin-bottom: 14px; }
  .about-card h3 { font-size: 15px; font-weight: 700; color: white; margin-bottom: 10px; letter-spacing: 0.5px; }
  .about-card p { font-size: 14.5px; color: #cbd5e1; line-height: 1.7; font-weight: 400; }
  .about-card ul { list-style: none; }
  .about-card ul li { font-size: 14.5px; color: #cbd5e1; line-height: 1.8; font-weight: 400; }
  .about-card ul li::before { content: "→ "; color: var(--accent); font-weight: 600; }

  /* PROJECTS */
  .projects-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 28px; }
  .project-card { border: 1px solid var(--border); border-radius: 20px; overflow: hidden; transition: all 0.35s cubic-bezier(0.4,0,0.2,1); background: white; cursor: pointer; }
  .project-card:hover { box-shadow: 0 24px 64px rgba(59,130,246,0.18), 0 4px 16px rgba(15,23,42,0.1); transform: translateY(-8px) scale(1.02); border-color: var(--accent); }
  .project-img { height: 220px; background: linear-gradient(135deg, #dbeafe, #e0e7ff); display: flex; align-items: center; justify-content: center; position: relative; overflow: hidden; }
  .project-img img { width: 100%; height: 100%; object-fit: cover; object-position: top center; transition: transform 0.4s ease; }
  .project-card:hover .project-img img { transform: scale(1.06); }
  .project-img-overlay { position: absolute; inset: 0; background: linear-gradient(to bottom, transparent 50%, rgba(15,23,42,0.45) 100%); opacity: 0; transition: opacity 0.35s ease; }
  .project-card:hover .project-img-overlay { opacity: 1; }
  .project-num { position: absolute; top: 14px; right: 14px; background: var(--navy); color: white; font-size: 11px; font-weight: 700; padding: 4px 10px; border-radius: 20px; z-index: 1; }
  .project-body { padding: 24px; }
  .project-body h3 { font-family: 'Playfair Display', serif; font-size: 21px; font-weight: 700; color: var(--navy); margin-bottom: 10px; }
  .project-body p { font-size: 14.5px; color: #475569; line-height: 1.75; font-weight: 400; }
  .project-tags { display: flex; gap: 8px; flex-wrap: wrap; margin-top: 16px; }
  .project-tag { font-size: 11px; font-weight: 600; color: var(--accent); background: rgba(59,130,246,0.08); padding: 4px 10px; border-radius: 20px; }

  /* SKILLS */
  .skills { background: #f8fafc; }
  .skills-layout { display: grid; grid-template-columns: 1fr 1fr; gap: 60px; align-items: start; }
  .soft-skill-item { display: flex; align-items: center; gap: 14px; padding: 16px 0; border-bottom: 1px solid var(--border); }
  .soft-skill-item:last-child { border-bottom: none; }
  .soft-dot { width: 8px; height: 8px; background: var(--accent); border-radius: 50%; flex-shrink: 0; }
  .soft-skill-item span { font-size: 15px; font-weight: 500; color: var(--navy); }
  .tech-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 14px; }
  .tech-item { background: white; border: 1px solid var(--border); border-radius: 14px; padding: 18px 12px; display: flex; flex-direction: column; align-items: center; gap: 10px; transition: all 0.2s; cursor: default; }
  .tech-item:hover { border-color: var(--accent); box-shadow: 0 4px 20px rgba(59,130,246,0.1); transform: translateY(-3px); }
  .tech-icon { width: 32px; height: 32px; display: flex; align-items: center; justify-content: center; font-size: 28px; }
  .tech-icon img { width: 32px; height: 32px; object-fit: contain; }
  .tech-item span { font-size: 11px; font-weight: 600; color: var(--navy); text-align: center; letter-spacing: 0.3px; }
  .skills-sub-title { font-size: 13px; font-weight: 700; color: var(--muted); letter-spacing: 2px; text-transform: uppercase; margin-bottom: 20px; }

  /* CONTACT */
  .contact-layout { display: grid; grid-template-columns: 1fr 1fr; gap: 80px; align-items: start; }
  .contact-info h2 { font-family: 'Playfair Display', serif; font-size: 42px; font-weight: 900; color: var(--navy); margin-bottom: 16px; }
  .contact-info p { font-size: 16px; color: var(--muted); line-height: 1.7; font-weight: 400; margin-bottom: 36px; }
  .social-links { display: flex; flex-direction: column; gap: 14px; }
  .social-link { display: flex; align-items: center; gap: 14px; text-decoration: none; color: var(--navy); font-weight: 500; font-size: 15px; transition: color 0.2s; }
  .social-link:hover { color: var(--accent); }
  .social-icon { width: 42px; height: 42px; background: var(--accent2); border-radius: 10px; display: flex; align-items: center; justify-content: center; font-size: 18px; transition: background 0.2s; }
  .social-link:hover .social-icon { background: rgba(59,130,246,0.15); }
  .contact-form { display: flex; flex-direction: column; gap: 18px; }
  .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
  .form-group { display: flex; flex-direction: column; gap: 7px; }
  .form-group label { font-size: 12px; font-weight: 700; color: var(--muted); letter-spacing: 1.5px; text-transform: uppercase; }
  .form-group input, .form-group textarea {
    background: #f8fafc; border: 1px solid var(--border); border-radius: 10px;
    padding: 13px 16px; font-family: 'DM Sans', sans-serif; font-size: 14px; color: var(--navy);
    outline: none; transition: border-color 0.2s, box-shadow 0.2s; resize: none;
  }
  .form-group input:focus, .form-group textarea:focus { border-color: var(--accent); box-shadow: 0 0 0 3px rgba(59,130,246,0.1); background: white; }
  .form-submit { background: var(--navy); color: white; border: none; padding: 15px; border-radius: 10px; font-family: 'DM Sans', sans-serif; font-size: 15px; font-weight: 600; cursor: pointer; transition: all 0.2s; }
  .form-submit:hover { background: var(--accent); transform: translateY(-2px); }
  .form-success { background: rgba(34,197,94,0.1); border: 1px solid rgba(34,197,94,0.3); color: #16a34a; padding: 14px 18px; border-radius: 10px; font-size: 14px; font-weight: 500; text-align: center; }

  /* FOOTER */
  footer { background: var(--navy); padding: 32px 8%; display: flex; align-items: center; justify-content: center; }
  footer p { color: #94a3b8; font-size: 13px; text-align: center; }
  footer span { color: var(--accent); font-weight: 600; }

  /* MOBILE */
  @media (max-width: 900px) {
    .hero { grid-template-columns: 1fr; text-align: center; padding-top: 100px; }
    .hero-sub { margin: 0 auto 36px; }
    .hero-btns { justify-content: center; }
    .hero-img-wrap { order: -1; }
    .hero-img-bg { width: 280px; height: 300px; }
    .about-grid { grid-template-columns: 1fr; }
    .projects-grid { grid-template-columns: 1fr; }
    .skills-layout { grid-template-columns: 1fr; }
    .contact-layout { grid-template-columns: 1fr; gap: 40px; }
    .form-row { grid-template-columns: 1fr; }
    .nav-links { display: none; flex-direction: column; position: absolute; top: 64px; left: 0; right: 0; background: white; padding: 20px 5%; border-bottom: 1px solid var(--border); gap: 16px; }
    .nav-links.open { display: flex; }
    .hamburger { display: flex; }
    .nav-cta { display: none; }
    footer { justify-content: center; }
    .tech-grid { grid-template-columns: repeat(3, 1fr); }
  }
  @media (max-width: 480px) {
    section { padding: 70px 5%; }
    .tech-grid { grid-template-columns: repeat(2, 1fr); }
  }

  /* FADE IN */
  .fade-in { opacity: 0; transform: translateY(24px); transition: opacity 0.6s ease, transform 0.6s ease; }
  .fade-in.visible { opacity: 1; transform: translateY(0); }
`;

// ── DATA ──────────────────────────────────────────────────────────────────────

const NAV_LINKS = ["Home", "About", "Projects", "Skills", "Contact"];

const ABOUT_CARDS = [
  {
    icon: "👤",
    title: "Who I Am",
    content: "I'm a passionate and driven web developer based in the Philippines. I love turning ideas into clean, functional, and beautiful digital experiences. I believe great code is as much about clarity and craft as it is about logic.",
    type: "text"
  },
  {
    icon: "🎓",
    title: "Academic Background",
    items: [
      "Elementary: Don Ricardo Briz Central Elementary School (2010-2016)",
      "High School: Tagum City National High School (2016-2022)",
      "College: Quezon City University (2023-Present)",
      "Bachelor of Science in Information Technology",
    ],
    type: "list"
  },
  {
    icon: "🎯",
    title: "Hobbies & Goals",
    items: [
      "Building side projects & open source",
      "Playing online games",
      "Watching movies and series",
      "Goal: Land a junior Full-Stack role",
      "Goal: Contribute to real-world products"
    ],
    type: "list"
  }
];

const PROJECTS = [
  {
    image: qcuImg,
    num: "01",
    title: "Quezon City University School Portal",
    desc: "A responsive school portal designed to help students access announcements, academic information, and school services through a clean and organized web interface.",
    tags: ["HTML5", "CSS3", "Bootstrap", "JavaScript", "PHP", "MySQL"]
  },
  {
    image: vetImg,
    num: "02",
    title: "FurEver Care Veterinary Clinic",
    desc: "A responsive website for a veterinary clinic that showcases services, clinic information, and contact details to help pet owners easily learn about pet care and book visits.",
    tags: ["React", "Node.js", "Tailwind", "MongoDB"]
  },
  {
    image: brewImg,
    num: "03",
    title: "Brewtopia Coffee Shop",
    desc: "A modern coffee shop website featuring product categories, promotions, and featured drinks, designed with an engaging layout to attract customers and showcase the menu.",
    tags: ["React", "Node.js", "PostgreSQL", "ShadCN", "Tailwind"]
  }
];

const SOFT_SKILLS = [
  "Problem Solving", "Team Collaboration", "Time Management",
  "Attention to Detail", "Communication", "Adaptability",
  "Critical Thinking", "Self-motivated Learner"
];

// ShadCN inline SVG icon
const ShadcnIcon = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="32" height="32" rx="8" fill="#18181b"/>
    <path d="M8 20L16 12L24 20" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M12 24L16 20L20 24" stroke="#3b82f6" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const TECH_STACKS = [
  { icon: htmlIcon,      name: "HTML5" },
  { icon: cssIcon,       name: "CSS3" },
  { icon: jsIcon,        name: "JavaScript" },
  { icon: bootstrapIcon, name: "Bootstrap" },
  { icon: reactIcon,     name: "React" },
  { icon: "shadcn",      name: "ShadCN" },
  { icon: tailwindIcon,  name: "Tailwind" },
  { icon: mysqlIcon,     name: "MySQL" },
  { icon: oracleIcon,    name: "Oracle" },
  { icon: gitIcon,       name: "Git" },
  { icon: githubIcon,    name: "GitHub" },
  { icon: nodejsIcon,    name: "Node.js" },
  { icon: kotlinIcon,    name: "Kotlin" },
];

const GitHubIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
  </svg>
);

const EmailIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="4" width="20" height="16" rx="2"/>
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
  </svg>
);

const FacebookIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
    <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.41c0-3.025 1.792-4.697 4.533-4.697 1.312 0 2.686.235 2.686.235v2.97h-1.513c-1.491 0-1.956.93-1.956 1.874v2.25h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z"/>
  </svg>
);

const SOCIALS = [
  { icon: <GitHubIcon />,   label: "GitHub",   handle: "github.com/eneriofedericotejano-spec", href: "https://github.com/eneriofedericotejano-spec", color: "#e6f4ef", bg: "rgba(230,244,239,.08)" },
  { icon: <EmailIcon />,    label: "Email",    handle: "enerio.federico.tejano@gmail.com",     href: "mailto:enerio.federico.tejano@gmail.com",     color: "#34d399", bg: "rgba(52,211,153,.08)"  },
  { icon: <FacebookIcon />, label: "Facebook", handle: "facebook.com/federico.enerio.9",       href: "https://www.facebook.com/federico.enerio.9",  color: "#93c5fd", bg: "rgba(59,130,246,.08)"  },
];

// ── HOOK ──────────────────────────────────────────────────────────────────────

function useFadeIn() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { el.classList.add("visible"); obs.disconnect(); }
    }, { threshold: 0.15 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return ref;
}

// ── COMPONENTS ────────────────────────────────────────────────────────────────

function Nav() {
  const [open, setOpen] = useState(false);
  return (
    <nav>
      <div className="nav-logo">Federico's<span>.</span>Haven</div>
      <ul className={`nav-links${open ? " open" : ""}`}>
        {NAV_LINKS.map(l => (
          <li key={l}><a href={`#${l.toLowerCase()}`} onClick={() => setOpen(false)}>{l}</a></li>
        ))}
      </ul>
      <button className="nav-cta" onClick={() => document.getElementById("contact").scrollIntoView({ behavior: "smooth" })}>
        Hire Me
      </button>
      <button className="hamburger" onClick={() => setOpen(o => !o)} aria-label="Menu">
        <span /><span /><span />
      </button>
    </nav>
  );
}

function Hero() {
  return (
    <section className="hero" id="home">
      <div>
        <div className="hero-tag">👋 Available for work</div>
        <h1 className="display">Hi, I'm <span>Federico T. Enerio Jr.</span></h1>
        <h2 className="display" style={{ fontSize: "clamp(20px, 2.5vw, 30px)", fontWeight: 700, color: "var(--muted)", marginBottom: 20 }}>
          Aspiring Full-Stack Developer
        </h2>
        <p className="hero-sub">
          I craft clean, modern, and responsive web experiences. Passionate about turning ideas into beautiful, functional products.
        </p>
        <div className="hero-btns">
          <a href="#projects" className="btn-primary">View My Work</a>
          <a href="#contact" className="btn-outline">Contact Me</a>
        </div>
      </div>
      <div className="hero-img-wrap">
        <div className="hero-img-bg">
          {/* ✅ Uses imported myPhoto — not a string path */}
          <img src={me} alt="Federico T. Enerio Jr." />
        </div>
        <div className="hero-badge">
          <div className="hero-badge-dot" />
          <span>Open to opportunities</span>
        </div>
      </div>
    </section>
  );
}

function AboutCard({ card, delay }) {
  const ref = useFadeIn();
  return (
    <div className="about-card fade-in" ref={ref} style={{ transitionDelay: `${delay}s` }}>
      <div className="about-card-icon">{card.icon}</div>
      <h3>{card.title}</h3>
      {card.type === "text"
        ? <p>{card.content}</p>
        : <ul>{card.items.map((item, j) => <li key={j}>{item}</li>)}</ul>
      }
    </div>
  );
}

function About() {
  const ref = useFadeIn();
  return (
    <section className="about" id="about">
      <div className="section-header fade-in" ref={ref}>
        <div className="section-tag">About Me</div>
        <h2 className="section-title display">The person behind the code</h2>
        <p className="section-sub">A little bit about who I am, where I came from, and where I'm headed.</p>
      </div>
      <div className="about-grid">
        {ABOUT_CARDS.map((card, i) => (
          <AboutCard key={i} card={card} delay={i * 0.1} />
        ))}
      </div>
    </section>
  );
}

function ProjectCard({ project, delay }) {
  const ref = useFadeIn();
  return (
    <div className="project-card fade-in" ref={ref} style={{ transitionDelay: `${delay}s` }}>
      <div className="project-img">
        <img src={project.image} alt={project.title} />
        <div className="project-img-overlay" />
        <div className="project-num">{project.num}</div>
      </div>
      <div className="project-body">
        <h3>{project.title}</h3>
        <p>{project.desc}</p>
        <div className="project-tags">
          {project.tags.map(t => <span className="project-tag" key={t}>{t}</span>)}
        </div>
      </div>
    </div>
  );
}

function Projects() {
  const ref = useFadeIn();
  return (
    <section id="projects" style={{ background: "white" }}>
      <div className="section-header fade-in" ref={ref}>
        <div className="section-tag">Projects</div>
        <h2 className="section-title display">Things I've built</h2>
        <p className="section-sub">A selection of projects that showcase my skills and approach to building for the web.</p>
      </div>
      <div className="projects-grid">
        {PROJECTS.map((p, i) => (
          <ProjectCard key={i} project={p} delay={i * 0.12} />
        ))}
      </div>
    </section>
  );
}

// ✅ KEY FIX: imported images are objects (not strings), so we render <img>
// Emojis are plain strings, so we render them as text
function TechIcon({ icon, name }) {
  if (icon === "shadcn") {
    return <div className="tech-icon"><ShadcnIcon /></div>;
  }
  const isEmoji = typeof icon === "string" && [...icon].length <= 2;
  if (isEmoji) {
    return <div className="tech-icon">{icon}</div>;
  }
  return (
    <div className="tech-icon">
      <img src={icon} alt={name} />
    </div>
  );
}

function Skills() {
  const ref = useFadeIn();
  return (
    <section className="skills" id="skills">
      <div className="section-header fade-in" ref={ref}>
        <div className="section-tag">Skills</div>
        <h2 className="section-title display">What I bring to the table</h2>
        <p className="section-sub">A mix of technical tools and people skills that make me an effective developer.</p>
      </div>
      <div className="skills-layout">
        <div>
          <p className="skills-sub-title">Soft Skills</p>
          <div className="soft-skills">
            {SOFT_SKILLS.map((s, i) => (
              <div className="soft-skill-item" key={i}>
                <div className="soft-dot" />
                <span>{s}</span>
              </div>
            ))}
          </div>
        </div>
        <div>
          <p className="skills-sub-title">Tech Stack</p>
          <div className="tech-grid">
            {TECH_STACKS.map((t, i) => (
              <div className="tech-item" key={i}>
                <TechIcon icon={t.icon} name={t.name} />
                <span>{t.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Contact() {
  const ref = useFadeIn();
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  const handleSubmit = e => {
    e.preventDefault();
    setSent(true);
    setForm({ name: "", email: "", subject: "", message: "" });
    setTimeout(() => setSent(false), 4000);
  };

  return (
    <section id="contact" style={{ background: "white" }}>
      <div className="contact-layout">
        <div className="contact-info fade-in" ref={ref}>
          <div className="section-tag">Contact</div>
          <h2 className="display">Let's work together</h2>
          <p>Have an idea, collaboration, or opportunity in mind? Feel free to reach out. I'm always open to meaningful conversations.</p>
          <div className="social-links">
            {SOCIALS.map((s, i) => (
              <a href={s.href} className="social-link" key={i} target="_blank" rel="noreferrer">
                <div className="social-icon">{s.icon}</div>
                <div>
                  <div style={{ fontSize: 12, color: "var(--muted)", fontWeight: 600, letterSpacing: 1 }}>{s.label}</div>
                  <div>{s.handle}</div>
                </div>
              </a>
            ))}
          </div>
        </div>
        <div>
          {sent && <div className="form-success" style={{ marginBottom: 16 }}>✅ Message sent! I'll get back to you soon.</div>}
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label>Name</label>
                <input name="name" value={form.name} onChange={handleChange} placeholder="Your name" required />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="your@email.com" required />
              </div>
            </div>
            <div className="form-group">
              <label>Subject</label>
              <input name="subject" value={form.subject} onChange={handleChange} placeholder="What's this about?" required />
            </div>
            <div className="form-group">
              <label>Message</label>
              <textarea name="message" value={form.message} onChange={handleChange} placeholder="Tell me about your project..." rows={5} required />
            </div>
            <button type="submit" className="form-submit">Send Message →</button>
          </form>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer>
      <p>© 2026 <span>Federico T. Enerio Jr.</span>. Built with React.</p>
    </footer>
  );
}

export default function Portfolio() {
  return (
    <>
      <style>{styles}</style>
      <Nav />
      <Hero />
      <About />
      <Projects />
      <Skills />
      <Contact />
      <Footer />
    </>
  );
}
