import React, { useState, useEffect, useRef } from "react";
import { profile, projects } from "./data/portfolio";
import Art from "./components/ProjectArt";
import ContactForm from "./components/ContactForm";
import useScrollMotion from "./hooks/useScrollMotion";
export default function App() {
  const [filter, setFilter] = useState("All");
  const [selected, setSelected] = useState(null);
  const [dark, setDark] = useState(() => {
    try {
      return localStorage.getItem("portfolio-theme") !== "light";
    } catch {
      return true;
    }
  });
  const [menu, setMenu] = useState(false);
  const [copied, setCopied] = useState(false);
  const dialog = useRef(null);
  useScrollMotion(filter);
  useEffect(() => {
    document.documentElement.dataset.theme = dark ? "dark" : "light";
    try {
      localStorage.setItem("portfolio-theme", dark ? "dark" : "light");
    } catch {}
  }, [dark]);
  useEffect(() => {
    if (selected) dialog.current?.showModal();
    else dialog.current?.close();
  }, [selected]);
  async function copy() {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      location.href = "mailto:" + profile.email;
    }
  }
  return (
    <>
      <div className="scroll-progress" aria-hidden="true" />
      <a className="skip-link" href="#work">
        Skip to work
      </a>
      <header>
        <a className="brand" href="#home" aria-label="Dinesh home">
          Dinesh<span>✳</span>
        </a>
        <nav className={menu ? "open" : ""}>
          {["Work", "About", "Experience", "Contact"].map((x) => (
            <a
              key={x}
              href={"#" + x.toLowerCase()}
              onClick={() => setMenu(false)}
            >
              {x}
            </a>
          ))}
        </nav>
        <div className="navright">
          <button
            className="theme"
            onClick={() => setDark(!dark)}
            aria-label={dark ? "Use light theme" : "Use dark theme"}
          >
            {dark ? "☀" : "◐"}
          </button>
          <a className="talk" href="#contact">
            Let’s talk <span>↗</span>
          </a>
          <button
            className="menubtn"
            aria-expanded={menu}
            aria-label="Toggle navigation"
            onClick={() => setMenu(!menu)}
          >
            ☰
          </button>
        </div>
      </header>
      <main id="home">
        <section className="hero">
          <div className="hero-top">
            <span className="eyebrow">
              <i /> OPEN TO NEW OPPORTUNITIES
            </span>
            <span className="edition">CHENNAI, INDIA · PORTFOLIO / 2026</span>
          </div>
          <div className="hero-grid">
            <div>
              <p className="intro">Hi, I’m Dinesh Senthil Kumar.</p>
              <h1>
                <span className="hero-line">Thoughtful code.</span>
                <span className="hero-line">Useful products.</span>
                <span className="hero-line">
                  <em>End to end.</em>
                </span>
              </h1>
              <p className="lede">
                Software engineer working across web, mobile, and the systems
                behind them. Three years of turning requirements into things
                people can use.
              </p>
              <a href="#work" className="primary">
                Explore my work <span>↘</span>
              </a>
              <a className="textlink" href="#about">
                A little about me ↗
              </a>
            </div>
            <div className="portrait-wrap" data-parallax="0.07">
              <div className="portrait">
                {profile.portrait ? (
                  <img src={profile.portrait} alt="Dinesh Senthil Kumar" />
                ) : (
                  <>
                    <span className="portrait-label">
                      THE PERSON BEHIND THE CODE
                    </span>
                    <div className="monogram">
                      d<span>s.</span>
                    </div>
                    <div className="portrait-caption">
                      Dinesh Senthil Kumar<small>SOFTWARE ENGINEER</small>
                    </div>
                  </>
                )}
                <div className="portrait-stamp">
                  WEB
                  <br />
                  MOBILE
                  <br />
                  BACKEND <span>↗</span>
                </div>
              </div>
              <div className="portrait-bottom">
                <span>Curious by nature. Engineer by practice.</span>
                <span>SCROLL TO EXPLORE ↓</span>
              </div>
            </div>
          </div>
          <div className="hero-footer">
            <span>MY EVERYDAY TOOLKIT</span>
            <div>
              React <b>·</b> Node.js <b>·</b> MongoDB <b>·</b> React Native{" "}
              <b>·</b> Azure
            </div>
            <a href="#work" aria-label="Scroll to selected work">
              ↓
            </a>
          </div>
        </section>
        <section id="work" className="work section">
          <div className="section-heading">
            <div>
              <span className="eyebrow">01 / SELECTED WORK</span>
              <h2>
                Different problems.
                <br />
                <em>The same care.</em>
              </h2>
            </div>
            <p>
              A selection of projects I’ve contributed to at APSI Technologies.
              Explore what I worked on and the tools behind it.
            </p>
          </div>
          <div className="filters" aria-label="Filter projects">
            {["All", "Web", "Mobile", "Backend"].map((x) => (
              <button
                key={x}
                aria-pressed={filter === x}
                className={filter === x ? "active" : ""}
                onClick={() => setFilter(x)}
              >
                {x}
                {x === "All" && <small>06</small>}
              </button>
            ))}
          </div>
          <div className="projects">
            {projects
              .filter((p) => filter === "All" || p.category.includes(filter))
              .map((p) => (
                <button
                  className="project"
                  key={p.name}
                  onClick={() => setSelected(p)}
                >
                  <Art kind={p.art} />
                  <div className="project-meta">
                    <span>
                      {p.num} / {p.label}
                    </span>
                    <span>↗</span>
                  </div>
                  <h3>{p.name}</h3>
                  <p>{p.desc}</p>
                  <div className="tags">
                    {p.tags.slice(0, 3).map((t) => (
                      <span key={t}>{t}</span>
                    ))}
                  </div>
                </button>
              ))}
          </div>
        </section>
        <section id="about" className="about section">
          <div>
            <span className="eyebrow">02 / A LITTLE CONTEXT</span>
            <h2>
              I like knowing
              <br />
              how the{" "}
              <em>
                whole
                <br />
                thing works.
              </em>
            </h2>
            <figure className="about-photo" data-parallax="0.035">
              <img
                src={`${import.meta.env.BASE_URL}/\dinesh-outdoors.jpeg`}
                alt="Dinesh outdoors with fields and mountains in the background"
                loading="lazy"
              />
              <figcaption>A little beyond the screen.</figcaption>
            </figure>
            <div className="about-mark">
              {"{ }"}
              <span>
                FROM TEST CASE
                <br />
                TO PRODUCTION.
              </span>
            </div>
          </div>
          <div className="about-copy">
            <p className="large">
              I started with Jest automation testing. Curiosity took me into
              Node.js, then into the interfaces those APIs powered.
            </p>
            <p>
              Today I work across the MERN stack and React Native, connecting
              frontend experiences with backend services, real-time features,
              and cloud deployments. I enjoy following a problem through the
              layers until it makes sense.
            </p>
            <p>
              My work includes payments and subscriptions, GPS tracking, form
              automation, and interactive 3D experiences. I also support
              applications in production—where careful debugging matters just as
              much as writing new features.
            </p>
            <div className="facts">
              <div>
                <strong>3 years</strong>
                <span>Professional experience</span>
              </div>
              <div>
                <strong>Web + mobile</strong>
                <span>One connected perspective</span>
              </div>
            </div>
          </div>
        </section>
        <section id="experience" className="section experience">
          <div className="section-heading">
            <div>
              <span className="eyebrow">03 / EXPERIENCE & TOOLKIT</span>
              <h2>
                Built through
                <br />
                <em>hands-on work.</em>
              </h2>
            </div>
          </div>
          <div className="experience-grid">
            <div className="timeline">
              <span className="date">SEP 2023 — PRESENT</span>
              <h3>Software Engineer</h3>
              <p className="company">
                APSI Technologies Private Limited · Chennai
              </p>
              <p>
                Full-stack development, API integrations, automated testing,
                real-time communication, and Azure deployments.
              </p>
              <details>
                <summary>
                  A closer look at my role <span>+</span>
                </summary>
                <ul>
                  <li>
                    REST APIs, JWT authentication, validation, and MongoDB
                    operations.
                  </li>
                  <li>WebSockets, SSE, MQTT, and mobile GPS integrations.</li>
                  <li>
                    Jest tests, Postman validation, and production
                    troubleshooting.
                  </li>
                  <li>Azure DevOps build and release workflows.</li>
                </ul>
              </details>
              <div className="education">
                <span className="date">EDUCATION / 2023</span>
                <h4>Bachelor of Computer Applications</h4>
                <p>
                  Prince Shri Venkateshwara Arts and Science College
                  <br />
                  University of Madras
                </p>
              </div>
            </div>
            <div className="toolkit">
              {[
                [
                  "01",
                  "Interfaces",
                  "React · Next.js · React Native · TypeScript · Redux",
                ],
                [
                  "02",
                  "Behind the scenes",
                  "Node.js · Express · MongoDB · Mongoose · SQL",
                ],
                [
                  "03",
                  "Quality & delivery",
                  "Jest · Postman · Azure · Azure DevOps · Git",
                ],
                [
                  "04",
                  "Connected experiences",
                  "WebSockets · SSE · MQTT · Three.js · Razorpay",
                ],
              ].map(([n, t, d]) => (
                <div key={n}>
                  <span>{n}</span>
                  <div>
                    <h4>{t}</h4>
                    <p>{d}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        <section className="versions section">
          <div>
            <span className="eyebrow">
              SAME ENGINEER. DIFFERENT FRAMEWORKS.
            </span>
            <h3>Choose your perspective.</h3>
            <p>You’re exploring the React edition.</p>
          </div>
          <div className="version-links">
            <span className="current">
              React <small>YOU ARE HERE</small>
              <b>↗</b>
            </span>
            {[
              ["Next.js", profile.nextPortfolio],
              ["Angular", profile.angularPortfolio],
            ].map(([n, url]) =>
              url ? (
                <a href={url} key={n}>
                  {n} ↗
                </a>
              ) : (
                <span key={n} className="soon">
                  {n}
                  <small>COMING SOON</small>
                  <b>↗</b>
                </span>
              ),
            )}
          </div>
        </section>
        <section id="contact" className="contact section">
          <span className="eyebrow">
            <i /> LET’S BUILD SOMETHING USEFUL
          </span>
          <h2>
            Have a good problem?
            <br />
            <em>I’d love to hear it.</em>
          </h2>
          <p>
            I’m exploring software engineering opportunities across
            <br />
            full-stack, backend, and mobile development.
          </p>
          <ContactForm />
          <div className="contact-actions">
            <a className="primary" href={"mailto:" + profile.email}>
              Email me directly <span>↗</span>
            </a>
            <button className="copy" onClick={copy}>
              {copied ? "Email copied ✓" : profile.email + " ⧉"}
            </button>
          </div>
          <span className="sr" role="status">
            {copied ? "Email address copied" : ""}
          </span>
        </section>
      </main>
      <footer>
        <a href="#home" className="brand">
          ds<span>✳</span>
        </a>
        <span>© {new Date().getFullYear()} Dinesh Senthil Kumar</span>
        <a href="#home">Back to top ↑</a>
      </footer>
      <dialog
        ref={dialog}
        onCancel={() => setSelected(null)}
        onClick={(e) => {
          if (e.target === dialog.current) setSelected(null);
        }}
      >
        {selected && (
          <>
            <button
              className="close"
              autoFocus
              onClick={() => setSelected(null)}
              aria-label="Close project"
            >
              ×
            </button>
            <span className="eyebrow">{selected.type} / APSI TECHNOLOGIES</span>
            <h2>{selected.name}</h2>
            <p>{selected.detail}</p>
            <h4>My contributions</h4>
            <ul>
              {selected.work.map((w) => (
                <li key={w}>{w}</li>
              ))}
            </ul>
            <div className="tags">
              {selected.tags.map((t) => (
                <span key={t}>{t}</span>
              ))}
            </div>
            <p className="project-note">
              Professional project · Contributions described from my experience.
              Visuals on this portfolio are illustrative concepts.
            </p>
          </>
        )}
      </dialog>
    </>
  );
}
