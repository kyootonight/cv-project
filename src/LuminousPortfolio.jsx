import React, { useState, useEffect, useRef, createContext, useContext } from "react";
import {
  motion, AnimatePresence, useMotionValue, useMotionTemplate, useSpring, useTransform, useScroll,
} from "framer-motion";
import {
  Sparkles, Mail, FileText, ArrowUpRight, ExternalLink, GraduationCap,
  Briefcase, Menu, X, MapPin, Clock, Server, Database, Cloud, Container, GitBranch, Code2, Globe,
  Cpu, Terminal, Layers, Boxes,
} from "lucide-react";
import { FaGithub as Github, FaLinkedin as Linkedin, FaInstagram as Instagram } from "react-icons/fa";
import LiquidEther from "./components/LiquidEther";
import { AnimatedThemeToggler } from "./components/AnimatedThemeToggler";
import CursorGrid from "./components/CursorGrid";
import { CinematicFooter } from "./components/ui/motion-footer";

/* ============================================================
   === EDIT DATA DI SINI — seluruh isi website diambil dari sini ===
   ============================================================ */


const CV_DATA = {
  // --- Identitas ---
  fullName: "Jacky Yohanes",
  initials: "Kyootonight",
  shortTitle: "Prompter Engineer",
  tagline: "AI Engineer | Platform, Infrastructure & Fullstack Engineering.",
  roles: ["Fullstack Developer", "Professional Prompter Engineer", "Open Source Contributor"],
  bio: "AI and full stack engineer building production systems end to end: RAG pipelines and LLM features, Go/Node/Python backends, React/TypeScript frontends, and the Linux, Docker and CI/CD infrastructure underneath.",
  focus: ["Web Platform", "CI/CD", "Cloud-native"],
  avatarUrl: "/foto.jpg",
  available: true,
  availableText: "AVAILABLE FOR WORK",
  unavailableText: "NOT AVAILABLE",
  city: "Jakarta, Indonesia",
  timezone: "Asia/Jakarta",
  timezoneLabel: "WIB",
  email: "jackyrajasigma@gmail.com",
  cvUrl: "#",
  socials: [
    { label: "GitHub", icon: "Github", url: "https://github.com/kyootonight" },
    { label: "LinkedIn", icon: "Linkedin", url: "https://www.linkedin.com/in/jacky-yohanes-b43902288/" },
    { label: "Instagram", icon: "Instagram", url: "https://instagram.com/whokyoo" },
  ],

  // --- Background Hero (LiquidEther) ---
  background: {
    intensity: 0.9,
    mouseForce: 18,
    cursorSize: 110,
  },

  // --- Background CursorGrid untuk section di bawah Hero ---
  cursorGrid: {
    enabled: true,
    start: 300,
    end: 800,
  },

  // --- Animasi saat ganti tema ---
  themeTransition: {
    duration: 700,
  },

  // --- Tema light / dark ---
  defaultTheme: "light",
  themes: {
    // LIGHT: Putih dominan + Neon #00FF00 sebagai warna kedua
    light: {
      vars: {
        bg: "#FFFFFF",
        fg: "#09090B",
        fg2: "#18181B",
        fg3: "#3F3F46",
        muted: "#52525B",
        faint: "#71717A",
        line: "rgba(0, 0, 0, 0.10)",
        "line-strong": "rgba(0, 0, 0, 0.25)",
        glass: "rgba(255, 255, 255, 0.80)",
        glass2: "rgba(0, 0, 0, 0.04)",
        nav: "rgba(255, 255, 255, 0.82)",
        accent: "#00FF00",
        "accent-text": "#007A00",
        "accent-soft": "rgba(0, 255, 0, 0.16)",
        "accent-border": "rgba(0, 185, 0, 0.65)",
        btn: "#00FF00",
        "btn-fg": "#000000",
        ok: "#00C800",
        spot: "rgba(0, 255, 0, 0.15)",
        "glow-top": "rgba(0, 255, 0, 0.14)",
      },
      liquid: {
        colors: ["#00FF00", "#00E676", "#B9F6CA"],
        opacity: 0.45,
      },
    },
    // DARK: Hitam dominan + Putih + Biru Cobalt/Sapphire lembut (#3B82F6 / #60A5FA)
    dark: {
      vars: {
        bg: "#050505",
        fg: "#FFFFFF",
        fg2: "#F4F4F5",
        fg3: "#D4D4D8",
        muted: "#A1A1AA",
        faint: "#71717A",
        line: "rgba(255, 255, 255, 0.10)",
        "line-strong": "rgba(255, 255, 255, 0.24)",
        glass: "rgba(15, 17, 22, 0.72)",
        glass2: "rgba(255, 255, 255, 0.06)",
        nav: "rgba(10, 10, 14, 0.78)",
        accent: "#3B82F6",
        "accent-text": "#60A5FA",
        "accent-soft": "rgba(59, 130, 246, 0.16)",
        "accent-border": "rgba(96, 165, 250, 0.50)",
        btn: "#FFFFFF",
        "btn-fg": "#000000",
        ok: "#4ADE80",
        spot: "rgba(59, 130, 246, 0.16)",
        "glow-top": "rgba(59, 130, 246, 0.18)",
      },
      liquid: {
        colors: ["#1D4ED8", "#3B82F6", "#93C5FD"],
        opacity: 0.5,
      },
    },
  },

  // --- Tech stack ---
  techStack: [
    { name: "React", category: "Frontend", icon: "Code2", color: "#0284C7" },
    { name: "Tailwind", category: "Frontend", icon: "Layers", color: "#0EA5E9" },
    { name: "Node.js", category: "Backend", icon: "Server", color: "#16A34A" },
    { name: "PostgreSQL", category: "Database", icon: "Database", color: "#2563EB" },
    { name: "Docker", category: "DevOps", icon: "Container", color: "#0284C7" },
    { name: "Kubernetes", category: "DevOps", icon: "Boxes", color: "#1D4ED8" },
    { name: "AWS", category: "Cloud", icon: "Cloud", color: "#D97706" },
    { name: "Linux", category: "System", icon: "Terminal", color: "#CA8A04" },
  ],

  // --- About ---
  about: {
    paragraphs: [
      "Im a full stack engineer with a focus on AI and Prompting. I quite advance on prompting techniques and have a strong understanding of LLMs, RAG pipelines, and AI system design.",
      "Outside as a developer, im a student.",
    ],
    stats: [
      { value: "2+", label: "Years of Experience" },
      { value: "12", label: "Projects Completed" },
      { value: "5", label: "Certificates & Competitions" },
    ],
    highlights: [
      { icon: "Layers", title: "Fullstack", text: "UI/UX Design, or even Database Management." },
      { icon: "Container", title: "Automation", text: "Consistent pipeline deployment." },
    ],
  },

  // --- Experience ---
  experience: [
    {
      role: "Junior Platform Engineer",
      company: "PT Contoh Teknologi",
      period: "Jun 2026 – Sekarang",
      location: "Jakarta (Hybrid)",
      points: [
        "Membangun pipeline CI/CD yang memangkas waktu deploy dari 25 menit menjadi 8 menit.",
        "Menulis runbook dan memantau layanan produksi.",
      ],
    },
    {
      role: "Ketua Divisi Web",
      company: "Organisasi Mahasiswa Informatika",
      period: "2025 – Sekarang",
      location: "Kampus",
      points: [
        "Memimpin 6 anggota merancang ulang website organisasi.",
        "Mengadakan 4 workshop web development.",
      ],
    },
    {
      role: "Freelance Web Developer",
      company: "Mandiri",
      period: "2024 – 2025",
      location: "Remote",
      points: ["Mengerjakan 8+ website UMKM dari desain sampai deploy."],
    },
  ],

  // --- Projects ---
  projects: [
    { title: "Warungku POS", category: "Web App", desc: "Aplikasi kasir untuk warung kecil: transaksi, stok, dan laporan harian.", tags: ["React", "Node.js", "PostgreSQL"], demo: "https://example.com", repo: "https://github.com/username/warungku" },
    { title: "Deploy Bot", category: "DevOps", desc: "Bot yang membangun, menguji, dan merilis aplikasi setiap ada push ke branch utama.", tags: ["Docker", "GitHub Actions"], demo: "", repo: "https://github.com/username/deploy-bot" },
    { title: "Kelas Pagi", category: "Web App", desc: "Platform catatan belajar kolaboratif untuk mahasiswa.", tags: ["Next.js", "Supabase"], demo: "https://example.com", repo: "https://github.com/username/kelas-pagi" },
    { title: "Server Monitor", category: "DevOps", desc: "Dashboard ringan untuk memantau CPU, memori, dan uptime server.", tags: ["Go", "Grafana"], demo: "https://example.com", repo: "https://github.com/username/monitor" },
    { title: "Katalog Batik", category: "Website", desc: "Katalog pengrajin batik dengan galeri produk dan pesan via WhatsApp.", tags: ["HTML", "Tailwind"], demo: "https://example.com", repo: "" },
    { title: "CTF Writeups", category: "Security", desc: "Kumpulan write-up lomba Capture The Flag beserta langkah penyelesaiannya.", tags: ["Linux", "Python"], demo: "", repo: "https://github.com/username/ctf" },
  ],

  // --- Skills ---
  skills: [
    { group: "Frontend", items: ["React", "Tailwind CSS", "Framer Motion", "TypeScript", "HTML & CSS"] },
    { group: "Backend", items: ["Node.js", "Express", "REST API", "PostgreSQL", "Redis"] },
    { group: "Infrastruktur", items: ["Docker", "Kubernetes", "AWS", "Nginx", "Linux"] },
    { group: "Tools & Soft Skills", items: ["Git", "CI/CD", "Figma", "Public Speaking", "Kerja Tim"] },
  ],

  // --- Education ---
  education: [
    { school: "Universitas Sultan Ageng Tirtayasa", degree: "S1 Teknik Informatika", period: "2023 – 2027", note: "4 GPA." },
    { school: "Institut Teknologi Sepuluh Nopember", degree: "S1 Teknik Telekomunikasi", period: "2023 – 2024", note: "Withdrawn from university. 3rd Place in Consulting with AI" },
    { school: "SMA Negeri 1 Kota Serang", degree: "IPA", period: "2020 – 2023", note: "1st Place in Whip-Cracking AI." },
  ],

  contactText: "Open for internships, full-time positions, and freelance projects.",
  footerNote: "Built with React, Tailwind CSS, and Framer Motion.",
};

/* ============================================================
   === JANGAN UBAH DI BAWAH INI (kecuali ingin ubah tampilan) ===
   ============================================================ */

const D = CV_DATA;
const NAV = ["Home", "About", "Experience", "Projects", "Skills", "Education"];
const ICONS = { Server, Database, Cloud, Container, GitBranch, Code2, Globe, Cpu, Terminal, Layers, Boxes, Github, Linkedin, Instagram, Mail };
const GLASS = {
  background: "var(--glass)",
  backdropFilter: "blur(12px)",
  WebkitBackdropFilter: "blur(12px)",
};

/* ---------- Tema (light / dark) ---------- */
const ThemeCtx = createContext({ theme: "light", toggle: () => {} });

const getInitialTheme = () => {
  let saved = null;
  try { saved = localStorage.getItem("theme"); } catch (e) {}
  if (saved === "light" || saved === "dark") return saved;
  if (D.defaultTheme === "light" || D.defaultTheme === "dark") return D.defaultTheme;
  return window.matchMedia?.("(prefers-color-scheme: light)").matches ? "light" : "dark";
};

const toVars = (o) => Object.entries(o).map(([k, v]) => `--${k}:${v};`).join("");

const THEME_CSS = `
[data-theme="light"]{${toVars(D.themes.light.vars)}}
[data-theme="dark"]{${toVars(D.themes.dark.vars)}}
.c-fg{color:var(--fg)}.c-fg2{color:var(--fg2)}.c-fg3{color:var(--fg3)}.c-muted{color:var(--muted)}.c-faint{color:var(--faint)}
.c-acc{color:var(--accent-text)}.c-btn{color:var(--btn-fg)}
.bg-glass{background:var(--glass)}.bg-glass2{background:var(--glass2)}.bg-nav{background:var(--nav)}
.bg-btn{background:var(--btn)}.bg-acc{background:var(--accent)}.bg-acc-soft{background:var(--accent-soft)}
.bg-line{background:var(--line)}.bg-ok{background:var(--ok)}.bg-off{background:var(--faint)}
.bd-line{border-color:var(--line)}.bd-btn{border-color:var(--btn)}.bd-acc{border-color:var(--accent)}
.hv-bd:hover{border-color:var(--line-strong)}.hv-bd-acc:hover{border-color:var(--accent-border)}
.hv-acc:hover{color:var(--accent-text)}.hv-fg:hover{color:var(--fg)}
.hv-glass:hover{background:var(--glass2)!important}.hv-btn:hover{filter:brightness(.94)}
.fc-bd-acc:focus{border-color:var(--accent-border)}.ph-faint::placeholder{color:var(--faint)}
::view-transition-old(root),::view-transition-new(root){animation:none;mix-blend-mode:normal}
::view-transition-old(root){z-index:1}::view-transition-new(root){z-index:2147483646}
`;

const ease = [0.22, 1, 0.36, 1];
const go = (id) => {
  if (id === "contact") {
    setFooterKey((k) => k + 1);
    window.scrollTo({ top: document.documentElement.scrollHeight, behavior: "smooth" });
    return;
  }
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
};
/* ---------- Hooks ---------- */
function useRoleTyper(words, speed = 70, hold = 1400) {
  const [i, setI] = useState(0);
  const [txt, setTxt] = useState("");
  const [del, setDel] = useState(false);
  useEffect(() => {
    const w = words[i % words.length];
    let t;
    if (!del && txt === w) t = setTimeout(() => setDel(true), hold);
    else if (del && txt === "") { setDel(false); setI((v) => (v + 1) % words.length); }
    else t = setTimeout(() => setTxt(del ? w.slice(0, txt.length - 1) : w.slice(0, txt.length + 1)), del ? 35 : speed);
    return () => clearTimeout(t);
  }, [txt, del, i, words, speed, hold]);
  return txt;
}

function useClock(tz) {
  const [t, setT] = useState("");
  useEffect(() => {
    const f = () => {
      try {
        setT(new Intl.DateTimeFormat("id-ID", { hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false, timeZone: tz })
          .format(new Date()).replace(/\./g, ":"));
      } catch (e) { setT(new Date().toLocaleTimeString()); }
    };
    f();
    const id = setInterval(f, 1000);
    return () => clearInterval(id);
  }, [tz]);
  return t;
}

/* ---------- Building blocks ---------- */
const Reveal = ({ children, delay = 0, className = "" }) => (
  <motion.div
    className={className}
    initial={{ opacity: 0, y: 24, scale: 0.96, filter: "blur(6px)" }}
    whileInView={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
    viewport={{ once: false, amount: 0.15 }}
    transition={{ duration: 0.65, delay, ease }}
  >
    {children}
  </motion.div>
);

const Section = ({ id, title, sub, children }) => (
  <section id={id} className="relative px-5 py-24">
    <div className="mx-auto max-w-6xl">
      <Reveal className="mb-12">
        <h2 className="text-3xl font-bold tracking-tight md:text-4xl">{title}</h2>
        {sub && <p className="mt-3 max-w-xl c-muted">{sub}</p>}
      </Reveal>
      {children}
    </div>
  </section>
);

function Panel({ children, className = "" }) {
  const x = useMotionValue(-300);
  const y = useMotionValue(-300);
  const bg = useMotionTemplate`radial-gradient(280px circle at ${x}px ${y}px, var(--spot), transparent 70%)`;
  return (
    <motion.div
      onMouseMove={(e) => { const r = e.currentTarget.getBoundingClientRect(); x.set(e.clientX - r.left); y.set(e.clientY - r.top); }}
      onMouseLeave={() => { x.set(-300); y.set(-300); }}
      className={`relative overflow-hidden rounded-2xl border bd-line hv-bd-acc shadow-xs transition-colors ${className}`} style={GLASS}>
      <motion.div className="pointer-events-none absolute inset-0" style={{ background: bg }} />
      <div className="relative h-full">{children}</div>
    </motion.div>
  );
}

/* ---------- Navbar ---------- */
function Navbar({ active }) {
  const [open, setOpen] = useState(false);
  const { theme, toggle } = useContext(ThemeCtx);
  const nav = (id, label) => {
  setOpen(false);
  if (label) setActive(label);
  go(id);
};
  return (
    <header className="fixed inset-x-0 top-4 z-50 px-4">
      <div className="mx-auto max-w-6xl">
        <div className="flex items-center justify-between rounded-full border bd-line bg-nav px-3 py-2 shadow-xs backdrop-blur-md">
          <button onClick={() => nav("home")} className="flex items-center gap-3 text-left">
            <span className="grid h-10 min-w-10 place-items-center rounded-full border bd-line bg-acc-soft px-3 text-xs font-bold c-acc">{D.initials}</span>
            <span className="leading-tight">
              <span className="block text-sm font-semibold">{D.fullName}</span>
              <span className="block text-xs tracking-wide c-muted">{D.shortTitle}</span>
            </span>
          </button>
          <nav className="hidden items-center gap-1 rounded-full bg-glass2 p-1 md:flex">
            {NAV.map((n) => (
              <button key={n} onClick={() => nav(n.toLowerCase())} className="relative rounded-full px-4 py-1.5 text-sm font-medium">
                {active === n && <motion.span layoutId="nav-pill" className="absolute inset-0 rounded-full bg-btn shadow-xs" transition={{ type: "spring", stiffness: 380, damping: 30 }} />}
                <span className={`relative transition-colors ${active === n ? "c-btn font-semibold" : "c-fg3 hv-fg"}`}>{n}</span>
              </button>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <AnimatedThemeToggler
              isDark={theme === "dark"}
              onToggle={toggle}
              duration={D.themeTransition.duration}
              className="h-10 w-10 border bd-line bg-nav transition hv-bd"
            />
            <button onClick={() => nav("contact")} className="inline-flex items-center gap-1.5 rounded-full bg-btn px-4 py-2 text-sm font-semibold c-btn transition hv-btn">
              Hire Me <ArrowUpRight size={14} />
            </button>
            <button onClick={() => setOpen(!open)} aria-label="Menu" className="grid h-10 w-10 place-items-center rounded-full border bd-line md:hidden">
              {open ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
        <AnimatePresence>
          {open && (
            <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
              className="mt-2 grid gap-1 rounded-3xl border bd-line bg-nav p-2 shadow-lg backdrop-blur-md md:hidden">
              {NAV.map((n) => (
                <button key={n} onClick={() => nav(n.toLowerCase())}
                  className={`rounded-2xl px-4 py-2.5 text-left text-sm font-medium ${active === n ? "bg-btn c-btn font-semibold" : "c-fg3"}`}>{n}</button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}

/* ---------- Hero ---------- */
function Hero() {
  const { theme } = useContext(ThemeCtx);
  const liquid = D.themes[theme].liquid;
  const role = useRoleTyper(D.roles);
  const clock = useClock(D.timezone);

  return (
    <section id="home" className="relative overflow-hidden px-5 pb-20 pt-32">
      {/* Lapisan 1: LiquidEther di paling bawah */}
      <div className="pointer-events-none absolute inset-0" style={{ opacity: liquid.opacity }}>
        <LiquidEther
          key={theme}
          colors={liquid.colors}
          intensity={D.background.intensity}
          mouseForce={D.background.mouseForce}
          cursorSize={D.background.cursorSize}
          resolution={0.4}
          autoDemo
          autoSpeed={0.4}
          autoIntensity={2}
        />
      </div>

      {/* Lapisan 2: Radial glow atas & gradasi halus bawah */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-64"
        style={{ background: "radial-gradient(ellipse 60% 100% at 50% 0%, var(--glow-top), transparent 75%)" }}
      />
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-40"
        style={{ background: "linear-gradient(to top, var(--bg), transparent)" }}
      />

      {/* Lapisan 3: Grid Utama Hero (Kiri Teks, Kanan Foto Tajam + Status Bar) */}
      <div className="relative z-10 mx-auto grid min-h-[70vh] max-w-6xl items-center gap-12 md:grid-cols-12">
        {/* KOLOM KIRI: Teks & CTA (7 kolom) */}
        <div className="md:col-span-7">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease }}>
            <span
              className="mb-5 inline-flex items-center gap-2 rounded-full border bd-line px-3.5 py-1.5 text-sm font-medium c-fg3"
              style={GLASS}
            >
              <Sparkles size={14} className="c-acc" /> Hi, im
            </span>

            <h1 className="text-5xl font-bold leading-none tracking-tighter sm:text-6xl md:text-7xl">
              {D.fullName}
            </h1>

            <div className="mt-5 flex items-center text-2xl font-semibold c-acc sm:text-3xl" style={{ minHeight: "1.4em" }}>
              <span>{role}</span>
              <motion.span
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
                className="ml-1.5 inline-block w-0.5 bg-acc"
                style={{ height: "1em" }}
              />
            </div>

            <p className="mt-5 max-w-xl text-lg font-medium c-fg2">{D.tagline}</p>
            <p className="mt-3 max-w-xl leading-relaxed c-muted">{D.bio}</p>

            <div className="mt-8 flex flex-wrap gap-3">
              <button
                onClick={() => go("projects")}
                className="inline-flex items-center gap-2 rounded-full bg-btn px-7 py-3.5 font-semibold c-btn shadow-sm transition hover:scale-105 hv-btn"
              >
                <Sparkles size={18} /> Explore Projects
              </button>
              <a
                href={D.cvUrl}
                download
                className="inline-flex items-center gap-2 rounded-full border bd-line px-7 py-3.5 font-semibold c-fg transition hv-bd hv-glass"
                style={GLASS}
              >
                <FileText size={18} className="c-acc" /> Download CV
              </a>
            </div>
          </motion.div>
        </div>

        {/* KOLOM KANAN: Foto Tajam (Tanpa Blur) di atas LiquidEther + Status Bar (5 kolom) */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.8, ease }}
          className="flex flex-col items-center md:col-span-5 md:items-end"
        >
          <div className="relative w-full max-w-[380px] overflow-hidden rounded-3xl">
            <img
              src={D.avatarUrl}
              alt={D.fullName}
              className="aspect-[4/4.3] w-full object-cover object-top"
              style={{
                maskImage: "linear-gradient(to bottom, black 78%, transparent 100%)",
                WebkitMaskImage: "linear-gradient(to bottom, black 78%, transparent 100%)",
              }}
            />
          </div>

          {/* Status Bar: Available for Work + Lokasi + Waktu Lokal */}
          <div
            className="-mt-4 flex w-full max-w-[380px] flex-wrap items-center justify-between gap-2 rounded-2xl border bd-line px-4 py-3 text-xs shadow-md"
            style={GLASS}
          >
            <span className="flex items-center gap-2 font-semibold tracking-wider c-fg">
              <span className="relative flex h-2 w-2">
                {D.available && (
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-ok opacity-75" />
                )}
                <span className={`relative inline-flex h-2 w-2 rounded-full ${D.available ? "bg-ok" : "bg-off"}`} />
              </span>
              {D.available ? D.availableText : D.unavailableText}
            </span>

            <span className="hidden h-3.5 w-px bg-line sm:inline-block" />

            <div className="flex items-center gap-3 c-muted">
              <span className="flex items-center gap-1">
                <MapPin size={12} className="c-acc" /> {D.city.split(",")[0]}
              </span>
              <span className="flex items-center gap-1 tabular-nums">
                <Clock size={12} className="c-acc" /> {clock} <span className="font-semibold c-acc">{D.timezoneLabel}</span>
              </span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Tech Stack Bento Strip */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.8, ease }}
        className="relative z-10 mx-auto mt-10 max-w-6xl"
      >
        <div className="mb-4 flex items-center gap-4">
          <span className="text-xs font-semibold tracking-widest c-muted">TECH STACK</span>
          <span className="h-px flex-1 bg-line" />
        </div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-8">
          {D.techStack.map((t) => {
            const Icon = ICONS[t.icon] || Code2;
            return (
              <motion.div
                key={t.name}
                whileHover={{ y: -4, scale: 1.04 }}
                className="flex cursor-default items-center gap-3 rounded-xl border bd-line p-3 shadow-xs transition-colors hv-bd-acc"
                style={GLASS}
              >
                <Icon size={20} style={{ color: t.color }} />
                <span className="leading-tight">
                  <span className="block text-sm font-medium c-fg">{t.name}</span>
                  <span className="block text-xs c-faint">{t.category}</span>
                </span>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
}

/* ---------- Experience (progress line) ---------- */
function Experience() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 75%", "end 55%"] });
  const scaleY = useSpring(scrollYProgress, { stiffness: 120, damping: 25 });
  return (
    <Section id="experience" title="Experience" sub="Perjalanan kerja, magang, dan organisasi.">
      <div ref={ref} className="relative ml-2 space-y-8 pl-8">
        <div className="absolute bottom-0 left-0 top-0 w-px bg-line" />
        <motion.div className="absolute bottom-0 left-0 top-0 w-px bg-acc" style={{ scaleY, transformOrigin: "top" }} />
        {D.experience.map((x, i) => (
          <Reveal key={x.role + x.company} delay={i * 0.06} className="relative">
            <span className="absolute h-3 w-3 rounded-full border-2 bd-acc" style={{ left: -38, top: 10, background: "var(--bg)" }} />
            <Panel className="p-6">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h3 className="flex items-center gap-2 text-lg font-semibold"><Briefcase size={16} className="c-acc" /> {x.role}</h3>
                <span className="text-xs c-muted">{x.period}</span>
              </div>
              <p className="mt-1 text-sm font-medium c-acc">{x.company} <span className="font-normal c-faint">· {x.location}</span></p>
              <ul className="mt-3 list-disc space-y-1.5 pl-5 text-sm c-muted">{x.points.map((p) => <li key={p}>{p}</li>)}</ul>
            </Panel>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

/* ---------- Projects ---------- */
function Projects() {
  const [filter, setFilter] = useState("All");
  const cats = ["All", ...new Set(D.projects.map((p) => p.category))];
  const list = D.projects.filter((p) => filter === "All" || p.category === filter);
  return (
    <Section id="projects" title="Projects" sub="Pilihan project yang pernah saya bangun.">
      <Reveal className="mb-8 flex flex-wrap gap-2">
        {cats.map((c) => (
          <button key={c} onClick={() => setFilter(c)}
            className={`rounded-full border px-4 py-1.5 text-sm font-medium transition ${filter === c ? "bd-btn bg-btn c-btn font-semibold" : "bd-line c-fg3 hv-bd"}`}
            style={filter === c ? undefined : GLASS}>{c}</button>
        ))}
      </Reveal>
      <motion.div layout className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {list.map((p) => (
            <motion.div key={p.title} layout initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} transition={{ duration: 0.35 }}>
              <Panel className="h-full p-6">
                <div className="flex h-full flex-col gap-3">
                  <span className="w-fit rounded-full bg-acc-soft px-3 py-1 text-xs font-semibold c-acc">{p.category}</span>
                  <h3 className="text-lg font-semibold">{p.title}</h3>
                  <p className="flex-1 text-sm leading-relaxed c-muted">{p.desc}</p>
                  <div className="flex flex-wrap gap-1.5">{p.tags.map((t) => <span key={t} className="rounded-md border bd-line px-2 py-0.5 text-xs c-fg3">{t}</span>)}</div>
                  <div className="flex gap-4 text-sm font-medium">
                    {p.demo && <a href={p.demo} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 hv-acc"><ExternalLink size={14} /> Demo</a>}
                    {p.repo && <a href={p.repo} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 hv-acc"><Github size={14} /> Code</a>}
                  </div>
                </div>
              </Panel>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </Section>
  );
}

/* ---------- Halaman utama ---------- */

  export default function LuminousPortfolio() {
  const [active, setActive] = useState("Home");
  const [theme, setTheme] = useState(getInitialTheme);
  const [footerKey, setFooterKey] = useState(0);

  const toggle = () => setTheme((t) => {
    const next = t === "dark" ? "light" : "dark";
    try { localStorage.setItem("theme", next); } catch (e) {}
    return next;
  });

  const { scrollY, scrollYProgress } = useScroll();
  const gridOpacity = useTransform(
    [scrollY, scrollYProgress],
    ([y, prog]) => {
      const fadeIn = Math.min(1, Math.max(0, (y - D.cursorGrid.start) / (D.cursorGrid.end - D.cursorGrid.start)));
      const fadeOut = prog > 0.82 ? Math.max(0, 1 - (prog - 0.82) / 0.1) : 1;
      return fadeIn * fadeOut;
    }
  );

  useEffect(() => {
    document.body.style.background = D.themes[theme].vars.bg;
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  useEffect(() => {
  const onScroll = () => {
    const marker = window.scrollY + window.innerHeight * 0.35;
    let current = "Home";
    for (const n of NAV) {
      const el = document.getElementById(n.toLowerCase());
      if (el && el.offsetTop <= marker) {
        current = n;
      }
    }
    setActive(current);
  };

  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
  return () => window.removeEventListener("scroll", onScroll);
}, []);

  return (
    <ThemeCtx.Provider value={{ theme, toggle }}>
      <div data-theme={theme} className="min-h-screen c-fg antialiased overflow-x-hidden" style={{ background: "var(--bg)", fontFamily: "ui-sans-serif, system-ui, -apple-system, 'Segoe UI', sans-serif" }}>
        <style>{THEME_CSS}</style>

        {/* Pembungkus konten utama dengan z-10 & background solid agar footer curtain-reveal terbuka dari bawah */}
        <div className="relative z-10 rounded-b-3xl border-b bd-line pb-8 shadow-xl" style={{ background: "var(--bg)" }}>
          {/* Background CursorGrid untuk semua section di bawah Hero */}
          {D.cursorGrid.enabled && (
            <motion.div className="pointer-events-none fixed inset-0 z-0" style={{ opacity: gridOpacity }}>
              <div style={{ height: "100%", filter: theme === "light" ? "invert(1) hue-rotate(180deg)" : "none" }}>
                <CursorGrid />
              </div>
            </motion.div>
          )}

          <Navbar active={active} setActive={setActive} />

          <div className="relative z-10">
            <Hero />

            <Section id="about" title="About Me">
              <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                <Reveal className="col-span-2 row-span-2">
                  <Panel className="h-full p-7">
                    <div className="space-y-4 leading-relaxed c-muted">{D.about.paragraphs.map((p, i) => <p key={i}>{p}</p>)}</div>
                  </Panel>
                </Reveal>
                {D.about.stats.map((s, i) => (
                  <Reveal key={s.label} delay={0.06 * (i + 1)}>
                    <Panel className="h-full p-6">
                      <p className="text-4xl font-bold c-acc">{s.value}</p>
                      <p className="mt-1 text-sm c-muted">{s.label}</p>
                    </Panel>
                  </Reveal>
                ))}
                {D.about.highlights.map((h, i) => {
                  const Icon = ICONS[h.icon] || Layers;
                  return (
                    <Reveal key={h.title} delay={0.06 * (i + 4)}>
                      <Panel className="h-full p-6">
                        <Icon size={20} className="mb-3 c-acc" />
                        <p className="font-semibold">{h.title}</p>
                        <p className="mt-1 text-sm c-muted">{h.text}</p>
                      </Panel>
                    </Reveal>
                  );
                })}
              </div>
            </Section>

            <Experience />
            <Projects />

            <Section id="skills" title="Skills" sub="Teknologi dan kemampuan yang saya gunakan.">
  <div className="grid gap-5 md:grid-cols-2">
    {D.skills.map((g, i) => (
      <Reveal key={g.group} delay={i * 0.08}>
        <Panel className="h-full p-6">
          <h3 className="mb-4 font-semibold">{g.group}</h3>
                      <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: false, amount: 0.2 }}
              variants={{
                hidden: {},
                show: { transition: { staggerChildren: 0.045, delayChildren: 0.1 } },
              }}
              className="flex flex-wrap gap-2"
            >
            {g.items.map((s) => (
              <motion.span
                key={s}
                variants={{
                  hidden: { opacity: 0, y: 12, scale: 0.85 },
                  show: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 320, damping: 22 } },
                }}
                whileHover={{ y: -3, scale: 1.06 }}
                className="cursor-default rounded-full border bd-line px-3.5 py-1.5 text-sm c-fg3 transition-colors hv-bd-acc"
                style={GLASS}
              >
                {s}
              </motion.span>
            ))}
          </motion.div>
        </Panel>
      </Reveal>
    ))}
  </div>
</Section>

            <Section id="education" title="Education" sub="Riwayat pendidikan.">
              <div className="grid gap-5 md:grid-cols-2">
                {D.education.map((e, i) => (
                  <Reveal key={e.school} delay={i * 0.06}>
                    <Panel className="h-full p-6">
                      <GraduationCap size={20} className="mb-3 c-acc" />
                      <h3 className="font-semibold">{e.school}</h3>
                      <p className="text-sm font-medium c-acc">{e.degree}</p>
                      <p className="mb-3 text-xs c-faint">{e.period}</p>
                      <p className="text-sm c-muted">{e.note}</p>
                    </Panel>
                  </Reveal>
                ))}
              </div>
            </Section>
          </div>
        </div>

        {/* Cinematic Curtain-Reveal Footer di lapisan paling bawah */}
        <CinematicFooter
          theme={theme}
          fullName={D.fullName}
          email={D.email}
          cvUrl={D.cvUrl}
          socials={D.socials}
          contactText={D.contactText}
        />
      </div>
    </ThemeCtx.Provider>
  );
}