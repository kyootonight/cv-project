import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ArrowUp, Copy, Check, Send } from "lucide-react";
import ColorBends from "../colorbends";
import { motion } from "framer-motion";

const STYLES = `
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&display=swap');

.cinematic-footer-wrapper {
  font-family: 'Plus Jakarta Sans', ui-sans-serif, system-ui, sans-serif;
  -webkit-font-smoothing: antialiased;
}

@keyframes footer-heartbeat {
  0%, 100% { transform: scale(1); filter: drop-shadow(0 0 6px rgba(30, 64, 175, 0.4)); }
  15%, 45% { transform: scale(1.22); filter: drop-shadow(0 0 12px rgba(96, 165, 250, 0.85)); }
  30% { transform: scale(1); }
}

.animate-footer-heartbeat {
  animation: footer-heartbeat 2s cubic-bezier(0.25, 1, 0.5, 1) infinite;
}

.footer-glass-pill {
  background: rgba(255, 255, 255, 0.85);
  box-shadow: 
    0 10px 30px -10px rgba(0, 0, 0, 0.08), 
    inset 0 1px 1px rgba(255, 255, 255, 0.9);
  border: 1px solid rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

.footer-glass-pill:hover {
  background: rgba(239, 246, 255, 0.95);
  border-color: rgba(30, 64, 175, 0.45);
  box-shadow: 
    0 20px 40px -12px rgba(30, 64, 175, 0.15), 
    inset 0 1px 1px rgba(255, 255, 255, 1);
  color: #09090B;
}

.footer-text-glow {
  background: linear-gradient(180deg, #09090B 0%, #1E40AF 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
`;

const MagneticButton = React.forwardRef(
  ({ className = "", children, as: Component = "button", ...props }, forwardedRef) => {
    const localRef = useRef(null);

    useEffect(() => {
      if (typeof window === "undefined") return;
      const element = localRef.current;
      if (!element) return;

      const ctx = gsap.context(() => {
        const handleMouseMove = (e) => {
          const rect = element.getBoundingClientRect();
          const h = rect.width / 2;
          const w = rect.height / 2;
          const x = e.clientX - rect.left - h;
          const y = e.clientY - rect.top - w;

          gsap.to(element, {
            x: x * 0.35,
            y: y * 0.35,
            rotationX: -y * 0.12,
            rotationY: x * 0.12,
            scale: 1.04,
            ease: "power2.out",
            duration: 0.4,
          });
        };

        const handleMouseLeave = () => {
          gsap.to(element, {
            x: 0,
            y: 0,
            rotationX: 0,
            rotationY: 0,
            scale: 1,
            ease: "elastic.out(1, 0.3)",
            duration: 1.2,
          });
        };

        element.addEventListener("mousemove", handleMouseMove);
        element.addEventListener("mouseleave", handleMouseLeave);

        return () => {
          element.removeEventListener("mousemove", handleMouseMove);
          element.removeEventListener("mouseleave", handleMouseLeave);
        };
      }, element);

      return () => ctx.revert();
    }, []);

    return (
      <Component
        ref={(node) => {
          localRef.current = node;
          if (typeof forwardedRef === "function") forwardedRef(node);
          else if (forwardedRef) forwardedRef.current = node;
        }}
        className={`cursor-pointer ${className}`}
        {...props}
      >
        {children}
      </Component>
    );
  }
);
MagneticButton.displayName = "MagneticButton";

export function CinematicFooter({
  theme = "light",
  fullName = "Jacky Yohanes",
  email = "jackyrajasigma@gmail.com",
  cvUrl = "#",
  socials = [],
  contactText = "Terbuka untuk magang, kerja penuh waktu, dan project freelance.",
  triggerKey = 0,
}) {
  const [copied, setCopied] = useState(false);
  const isDark = theme === "dark";

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${email}`;
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const [inFooter, setInFooter] = useState(false);

useEffect(() => {
  const checkFooter = () => {
    const distanceToBottom =
      document.documentElement.scrollHeight - (window.scrollY + window.innerHeight);
    setInFooter(distanceToBottom < window.innerHeight * 0.65);
  };
  checkFooter();
  window.addEventListener("scroll", checkFooter, { passive: true });
  return () => window.removeEventListener("scroll", checkFooter);
}, []);
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: STYLES }} />

      <div
        className="relative h-screen w-full"
        style={{ clipPath: "polygon(0% 0, 100% 0%, 100% 100%, 0 100%)" }}
      >
        <footer
          className={`fixed bottom-0 left-0 flex h-screen w-full flex-col justify-between overflow-hidden cinematic-footer-wrapper ${
            isDark ? "text-white" : "text-zinc-950"
          }`}
          style={{ background: isDark ? "#050505" : "#FFFFFF" }}
        >
          {/* Background ColorBends otomatis menyesuaikan tema */}
          <div className={`pointer-events-none absolute inset-0 z-0 ${isDark ? "opacity-55" : "opacity-45"}`}>
            <ColorBends
              key={theme}
              colors={isDark ? ["#1D4ED8", "#3B82F6", "#93C5FD"] : ["#00FF00", "#00E676", "#B9F6CA"]}
              rotation={45}
              autoRotate={3}
              speed={0.25}
              scale={1.1}
              frequency={1}
              warpStrength={1}
              mouseInfluence={0.8}
              parallax={0.4}
              noise={0.05}
              iterations={1}
              intensity={1.05}
              bandWidth={6}
              transparent
            />
          </div>

          <div className="h-20 shrink-0" />

          {/* Center CTA & Magnetic Pills */}
          {/* Center CTA & Magnetic Pills */}
          <motion.div
            key={triggerKey}
            initial="hidden"
            animate={inFooter ? "visible" : "hidden"}
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.1, delayChildren: 0.15 } },
            }}
            className="relative z-10 flex w-full flex-1 flex-col items-center justify-center px-6 text-center"
          >
            {/* 1. Judul & Subjudul */}
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 30, scale: 0.95, filter: "blur(8px)" },
                visible: {
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  filter: "blur(0px)",
                  transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
                },
              }}
              className="mb-10 w-full max-w-4xl"
            >
              <h2
                className={`text-5xl font-black tracking-tighter md:text-8xl ${
                  isDark ? "text-white" : "text-zinc-950"
                }`}
              >
                Let&apos;s work together.
              </h2>
              <p className={`mx-auto mt-4 max-w-xl text-sm md:text-base ${isDark ? "text-zinc-400" : "text-zinc-600"}`}>
                {contactText}
              </p>
            </motion.div>

            {/* 2. Baris Tombol Email & Kirim Pesan */}
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 24, scale: 0.96 },
                visible: {
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  transition: { type: "spring", stiffness: 260, damping: 22 },
                },
              }}
              className="flex w-full flex-wrap items-center justify-center gap-4"
            >
              <MagneticButton
                as="button"
                onClick={handleCopyEmail}
                className={`group flex items-center gap-3 rounded-full px-8 py-4 text-sm font-bold shadow-md transition md:px-10 md:py-5 md:text-base ${
                  isDark ? "bg-white text-black hover:bg-zinc-200" : "bg-[#00FF00] text-black hover:brightness-95"
                }`}
              >
                {copied ? (
                  <Check className="h-5 w-5" />
                ) : (
                  <Copy className="h-5 w-5 transition-transform group-hover:scale-110" />
                )}
                {copied ? "Email Copied!" : email}
              </MagneticButton>

              <MagneticButton
                as="a"
                href={`mailto:${email}?subject=${encodeURIComponent("Halo " + fullName)}`}
                className={`group flex items-center gap-3 rounded-full border px-8 py-4 text-sm font-bold backdrop-blur-md transition md:px-10 md:py-5 md:text-base ${
                  isDark
                    ? "border-white/15 bg-white/5 text-white hover:border-blue-400/50 hover:bg-white/10"
                    : "border-black/10 bg-white/80 text-zinc-950 hover:border-green-600/50 hover:bg-green-50/90"
                }`}
              >
                <Send className={`h-5 w-5 transition-transform group-hover:scale-110 ${isDark ? "text-blue-400" : "text-[#007A00]"}`} />
                Kirim Pesan
              </MagneticButton>
            </motion.div>

            {/* 3. Baris Sosial Media & Download CV */}
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
                },
              }}
              className="mt-5 flex w-full flex-wrap items-center justify-center gap-3 md:gap-4"
            >
              {socials.map((s) => (
                <MagneticButton
                  key={s.label}
                  as="a"
                  href={s.url}
                  target="_blank"
                  rel="noreferrer"
                  className={`rounded-full border px-6 py-3 text-xs font-semibold backdrop-blur-md transition md:text-sm ${
                    isDark
                      ? "border-white/10 bg-white/5 text-zinc-300 hover:border-white/25 hover:text-white"
                      : "border-black/10 bg-white/80 text-zinc-800 hover:border-black/25 hover:text-zinc-950"
                  }`}
                >
                  {s.label} ↗
                </MagneticButton>
              ))}
              <MagneticButton
                as="a"
                href={cvUrl}
                download
                className={`rounded-full border px-6 py-3 text-xs font-semibold backdrop-blur-md transition md:text-sm ${
                  isDark
                    ? "border-white/10 bg-white/5 text-blue-400 hover:border-blue-400/40"
                    : "border-black/10 bg-white/80 text-[#007A00] hover:border-green-600/40"
                }`}
              >
                Download CV ↓
              </MagneticButton>
            </motion.div>
          </motion.div>

          {/* Bottom Bar */}
          <div className="relative z-20 flex w-full flex-col items-center justify-between gap-5 px-6 pb-8 md:flex-row md:px-12">
            <div className="order-2 text-[10px] font-semibold uppercase tracking-widest text-zinc-500 md:order-1 md:text-xs">
              © {new Date().getFullYear()} {fullName}. All rights reserved.
            </div>

            <div
              className={`order-1 flex cursor-default items-center gap-2 rounded-full border px-6 py-3 backdrop-blur-md md:order-2 ${
                isDark ? "border-white/10 bg-white/5" : "border-black/10 bg-white/80"
              }`}
            >
              <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 md:text-xs">
                Crafted with
              </span>
              <span className={`animate-footer-heartbeat text-sm md:text-base ${isDark ? "text-blue-400" : "text-[#007A00]"}`}>
                ✦
              </span>
              <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 md:text-xs">
                by
              </span>
              <span className={`ml-1 text-xs font-black tracking-normal md:text-sm ${isDark ? "text-white" : "text-zinc-950"}`}>
                {fullName}
              </span>
            </div>

            <MagneticButton
              as="button"
              onClick={scrollToTop}
              aria-label="Back to top"
              className={`group order-3 flex h-12 w-12 items-center justify-center rounded-full border backdrop-blur-md transition ${
                isDark
                  ? "border-white/10 bg-white/5 text-zinc-300 hover:border-white/25 hover:text-white"
                  : "border-black/10 bg-white/80 text-zinc-800 hover:border-black/25 hover:text-zinc-950"
              }`}
            >
              <ArrowUp className="h-5 w-5 transition-transform duration-300 group-hover:-translate-y-1" />
            </MagneticButton>
          </div>
        </footer>
      </div>
    </>
  );
}