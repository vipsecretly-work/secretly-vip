"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, useState, useCallback } from "react";

/* ─────────────────────────────────────────────────────────
   CANVAS PARTICLE ENGINE — mobile-aware limits
   Desktop : up to 80 particles, logo image drawn
   Mobile  : up to 20 particles, plain circles only
             (skips drawImage + source-atop compositing
              which are the two biggest GPU drains on phones)
───────────────────────────────────────────────────────── */

type Particle = {
  x: number; y: number;
  vx: number; vy: number;
  life: number;
  maxLife: number;
  size: number;
  angle: number;
  av: number;
};

function isMobileDevice() {
  if (typeof window === "undefined") return false;
  return window.innerWidth <= 768 || navigator.maxTouchPoints > 1;
}

function createParticle(
  isBurst: boolean,
  ox: number,
  oy: number,
  mobile: boolean,
  textW?: number,
  textH?: number,
): Particle & { bx: number; by: number } {
  const spawnX = isBurst ? ox : (ox - (textW ?? 0) * 0.5) + Math.random() * (textW ?? 0);
  const spawnY = isBurst ? oy : (oy - (textH ?? 0) * 0.6) + Math.random() * (textH ?? 0) * 1.2;

  const angle = Math.random() * Math.PI * 2;
  const speed = isBurst
    ? (mobile ? 1.5 + Math.random() * 3 : 2 + Math.random() * 5)
    : 0.3 + Math.random() * 1.0;

  return {
    bx: spawnX, by: spawnY,
    x: 0, y: 0,
    vx: Math.cos(angle) * speed,
    vy: Math.sin(angle) * speed,
    life: 0,
    // Mobile: much shorter lives so fewer are alive at once
    maxLife: isBurst
      ? (mobile ? 40 + Math.random() * 30 : 60 + Math.random() * 60)
      : (mobile ? 120 + Math.random() * 80 : 240 + Math.random() * 200),
    size: isBurst
      ? (mobile ? 10 + Math.random() * 14 : 20 + Math.random() * 30)
      : (mobile ? 10 + Math.random() * 14 : 18 + Math.random() * 26),
    angle: Math.random() * Math.PI * 2,
    av: (Math.random() - 0.5) * 0.04,
  };
}

export default function InteractiveHero() {
  const [mounted, setMounted] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<(Particle & { bx: number; by: number })[]>([]);
  const rafRef = useRef<number>(0);
  const logoImgRef = useRef<HTMLImageElement | null>(null);
  const originRef = useRef<{ x: number; y: number; w: number; h: number }>({ x: 0, y: 0, w: 0, h: 0 });
  const isMobile = useRef(false);

  /* Load the logo image — desktop only */
  useEffect(() => {
    setMounted(true);
    isMobile.current = isMobileDevice();
    if (!isMobile.current) {
      const img = new Image();
      img.src = "/Image/Logo.png";
      img.onload = () => { logoImgRef.current = img; };
    }
  }, []);

  /* Canvas resize observer */
  useEffect(() => {
    const canvas = canvasRef.current;
    const section = sectionRef.current;
    if (!canvas || !section) return;

    const resize = () => {
      canvas.width = section.offsetWidth;
      canvas.height = section.offsetHeight;
      const w = canvas.width;
      const h = canvas.height;
      originRef.current = { x: w * 0.5, y: h * 0.48, w: w * 0.75, h: h * 0.22 };
    };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(section);
    return () => ro.disconnect();
  }, [mounted]);

  /* Ambient particle stream */
  useEffect(() => {
    if (!mounted) return;
    const mobile = isMobile.current;
    // Mobile: spawn less often; desktop: every 180ms (was 120ms)
    const interval = mobile ? 500 : 180;
    const cap      = mobile ? 20  : 80;

    const id = setInterval(() => {
      const { x, y, w, h } = originRef.current;
      particlesRef.current.push(createParticle(false, x, y, mobile, w, h));
      if (particlesRef.current.length > cap) particlesRef.current.shift();
    }, interval);

    return () => clearInterval(id);
  }, [mounted]);

  /* RAF draw loop */
  useEffect(() => {
    if (!mounted) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const mobile = isMobile.current;

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const img = mobile ? null : logoImgRef.current; // never use image on mobile

      particlesRef.current = particlesRef.current.filter(p => {
        p.life++;
        const t = p.life / p.maxLife;
        if (t >= 1) return false;

        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.005;
        p.angle += p.av;

        const opacity = t < 0.15 ? t / 0.15 : 1 - ((t - 0.15) / 0.85);
        const scale = 0.5 + t * 1.5;
        const drawSize = p.size * scale;

        ctx.save();
        ctx.globalAlpha = opacity * 0.75;
        ctx.translate(p.bx + p.x, p.by + p.y);
        ctx.rotate(p.angle);

        if (img) {
          // Desktop only: logo image + red tint via compositing
          ctx.globalCompositeOperation = "source-over";
          ctx.drawImage(img, -drawSize / 2, -drawSize / 2, drawSize, drawSize);
          ctx.globalCompositeOperation = "source-atop";
          ctx.fillStyle = "#ff0033";
          ctx.fillRect(-drawSize / 2, -drawSize / 2, drawSize, drawSize);
        } else {
          // Mobile + fallback: plain red circle — zero compositing cost
          ctx.fillStyle = "#ff0033";
          ctx.beginPath();
          ctx.arc(0, 0, drawSize / 2, 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.restore();
        return true;
      });

      rafRef.current = requestAnimationFrame(draw);
    };

    rafRef.current = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(rafRef.current);
  }, [mounted]);

  /* Burst on tap/click */
  const handlePointerDown = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    const mobile = isMobile.current;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const count = mobile ? 6 : 14;
    const cap   = mobile ? 30 : 120;
    for (let i = 0; i < count; i++) {
      particlesRef.current.push(createParticle(true, x, y, mobile));
    }
    if (particlesRef.current.length > cap) {
      particlesRef.current = particlesRef.current.slice(-cap);
    }
  }, []);

  /* Parallax on pointer — desktop only, skip on touch to avoid layout thrash */
  const handlePointerMove = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    if (isMobile.current || e.pointerType === "touch") return;
    const el = sectionRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = ((e.clientX - cx) / rect.width) * 40;
    const dy = ((e.clientY - cy) / rect.height) * 24;
    el.style.setProperty("--px", `${dx.toFixed(2)}px`);
    el.style.setProperty("--py", `${dy.toFixed(2)}px`);
  }, []);

  const handlePointerLeave = useCallback(() => {
    if (isMobile.current) return;
    const el = sectionRef.current;
    if (!el) return;
    el.style.setProperty("--px", "0px");
    el.style.setProperty("--py", "0px");
  }, []);

  return (
    <div
      ref={sectionRef}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className="interactive-hero-wrap"
      style={{
        "--px": "0px",
        "--py": "0px",
        width: "100%",
        /* height and marginTop are in .interactive-hero-wrap CSS (responsive via media queries) */
        position: "relative",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-start",
        paddingLeft: "max(5vw, 24px)",
        background: "var(--white)",
        borderRadius: "40px 40px 24px 24px",
        cursor: "crosshair",
        touchAction: "pan-y", /* allow vertical scroll; pointerDown still fires for burst effect */
      } as React.CSSProperties}
    >
      {/* Rising/setting sun over mountains — smooth bezier silhouettes */}
      <svg
        className="hero-scenery-svg"
        aria-hidden="true"
        viewBox="0 0 1200 520"
        preserveAspectRatio="xMidYMax meet"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <radialGradient id="sunGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%"   stopColor="#ff0033" stopOpacity="0.6" />
            <stop offset="40%"  stopColor="#ff4455" stopOpacity="0.22" />
            <stop offset="100%" stopColor="#ffffff"  stopOpacity="0" />
          </radialGradient>
          <radialGradient id="horizonBlush" cx="50%" cy="100%" r="60%">
            <stop offset="0%"   stopColor="#ffccd5" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#ffffff"  stopOpacity="0" />
          </radialGradient>
          <linearGradient id="mtBack" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"   stopColor="#ffb3c0" />
            <stop offset="100%" stopColor="#ffd6de" />
          </linearGradient>
          <linearGradient id="mtMid" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"   stopColor="#ffe0e6" />
            <stop offset="100%" stopColor="#fff0f3" />
          </linearGradient>
          <linearGradient id="mtFront" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"   stopColor="#ffffff" />
            <stop offset="100%" stopColor="#ffffff" />
          </linearGradient>
        </defs>

        {/* Horizon blush behind sun */}
        <ellipse cx="600" cy="520" rx="500" ry="320" fill="url(#horizonBlush)" />

        {/* Sun glow halo */}
        <ellipse className="hero-sun-glow" cx="600" cy="420" rx="200" ry="200" fill="url(#sunGlow)" />

        {/* Sun disc — large and bold */}
        <circle className="hero-sun" cx="600" cy="430" r="72" fill="#ff0033" opacity="0.88" />

        {/* Subtle radial rays */}
        <g className="hero-sun-rays" stroke="#ff0033" strokeOpacity="0.18" strokeLinecap="round">
          <line x1="600" y1="344" x2="600" y2="316" strokeWidth="3"/>
          <line x1="600" y1="516" x2="600" y2="544" strokeWidth="3"/>
          <line x1="514" y1="430" x2="486" y2="430" strokeWidth="3"/>
          <line x1="686" y1="430" x2="714" y2="430" strokeWidth="3"/>
          <line x1="539" y1="369" x2="520" y2="350" strokeWidth="2.5"/>
          <line x1="661" y1="491" x2="680" y2="510" strokeWidth="2.5"/>
          <line x1="661" y1="369" x2="680" y2="350" strokeWidth="2.5"/>
          <line x1="539" y1="491" x2="520" y2="510" strokeWidth="2.5"/>
        </g>

        {/* Back mountain range — smooth bezier peaks */}
        <path
          fill="url(#mtBack)"
          opacity="0.75"
          d="
            M0,520 L0,290
            Q80,240 160,170
            Q220,115 280,175
            Q340,240 380,240
            Q430,215 480,120
            Q530,215 580,225
            Q615,210 660,130
            Q700,215 750,230
            Q800,215 860,140
            Q920,215 970,235
            Q1010,220 1060,165
            Q1110,220 1200,260
            L1200,520 Z
          "
        />

        {/* Mid mountain range */}
        <path
          fill="url(#mtMid)"
          opacity="0.90"
          d="
            M0,520 L0,350
            Q60,325 120,310
            Q195,285 270,210
            Q340,285 400,300
            Q460,280 530,215
            Q595,280 650,295
            Q710,275 780,210
            Q845,275 910,295
            Q970,280 1040,230
            Q1110,280 1200,310
            L1200,520 Z
          "
        />

        {/* Front rolling hills — white, clips sun base */}
        <path
          fill="url(#mtFront)"
          opacity="1"
          d="
            M0,520 L0,420
            Q100,390 200,400
            Q300,415 380,375
            Q460,360 540,365
            Q620,370 700,360
            Q800,348 900,368
            Q1000,385 1100,375
            Q1150,370 1200,365
            L1200,520 Z
          "
        />
      </svg>

      {/* Single canvas for all particles — one GPU layer */}
      <canvas
        ref={canvasRef}
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          zIndex: 1,
        }}
      />

      {/* LIVE AROUND THE WORLD globe badge — hidden on mobile via .hero-globe-badge */}
      <div className="hero-globe-badge" style={{ position: "absolute", left: "6vw", bottom: "8vh", alignItems: "center", gap: "16px", zIndex: 5, pointerEvents: "none" }}>
        {/* SVG Globe outline */}
        <motion.svg
          width="48" height="48" viewBox="0 0 48 48" fill="none"
          animate={{ rotate: 360 }}
          transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
        >
          <circle cx="24" cy="24" r="20" stroke="#ff0033" strokeWidth="1.5" />
          <ellipse cx="24" cy="24" rx="10" ry="20" stroke="#ff0033" strokeWidth="1.2" />
          <line x1="4" y1="24" x2="44" y2="24" stroke="#ff0033" strokeWidth="1.2" />
          <ellipse cx="24" cy="24" rx="20" ry="8" stroke="#ff0033" strokeWidth="1" />
        </motion.svg>

        <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
          <span style={{ color: "var(--red)", fontSize: "11px", fontWeight: 800, letterSpacing: "0.2em" }}>LIVE AROUND</span>
          <span style={{ color: "var(--red)", fontSize: "11px", fontWeight: 800, letterSpacing: "0.2em" }}>THE WORLD</span>
        </div>
      </div>

      {/* Main wordmark — zIndex above canvas */}
      <div style={{ position: "relative", zIndex: 10, display: "flex", flexDirection: "column", alignItems: "flex-start", pointerEvents: "none" }}>
        <motion.h1
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          style={{
            fontFamily: "var(--f-brand)",
            fontSize: "clamp(44px, 14vw, 240px)",
            lineHeight: 0.85,
            color: "var(--red)",
            margin: 0,
            letterSpacing: "0.02em",
            whiteSpace: "nowrap",
            userSelect: "none",
          }}
        >
          SECRETLY
        </motion.h1>
      </div>
    </div>
  );
}
