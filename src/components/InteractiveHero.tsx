"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, useState, useCallback } from "react";

/* ─────────────────────────────────────────────────────────
   CANVAS PARTICLE ENGINE
   All particles live on a single <canvas> — zero DOM nodes,
   zero per-element blur compositing, zero Framer Motion overhead.
   The browser renders one GPU layer instead of 45+.
───────────────────────────────────────────────────────── */

type Particle = {
  x: number; y: number;    // current position relative to origin
  vx: number; vy: number;  // velocity
  life: number;            // 0 → 1
  maxLife: number;         // total frames to live
  size: number;
  angle: number;           // rotation
  av: number;              // angular velocity
};

function createParticle(isBurst: boolean, ox: number, oy: number, textW?: number, textH?: number): Particle & { bx: number; by: number } {
  // For ambient stream: spawn from a random point anywhere around the wordmark area
  const spawnX = isBurst ? ox : (ox - (textW ?? 0) * 0.5) + Math.random() * (textW ?? 0);
  const spawnY = isBurst ? oy : (oy - (textH ?? 0) * 0.6) + Math.random() * (textH ?? 0) * 1.2;

  const angle = Math.random() * Math.PI * 2; // always full 360°
  const speed = isBurst
    ? 2 + Math.random() * 5
    : 0.3 + Math.random() * 1.2;  // slower drift for ambient

  return {
    bx: spawnX, by: spawnY,
    x: 0, y: 0,
    vx: Math.cos(angle) * speed,
    vy: Math.sin(angle) * speed,
    life: 0,
    maxLife: isBurst ? 60 + Math.random() * 60 : 360 + Math.random() * 400, // Live much longer to build density
    size: isBurst ? 20 + Math.random() * 30 : 18 + Math.random() * 30, // Much larger ambient sizes
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

  /* Load the logo image once */
  useEffect(() => {
    setMounted(true);
    const img = new Image();
    img.src = "/Image/Logo.png";
    img.onload = () => { logoImgRef.current = img; };
  }, []);

  /* Canvas resize observer */
  useEffect(() => {
    const canvas = canvasRef.current;
    const section = sectionRef.current;
    if (!canvas || !section) return;

    const resize = () => {
      canvas.width = section.offsetWidth;
      canvas.height = section.offsetHeight;

      // Re-compute origin: right edge of "SECRETLY" text block
      // The text div starts at paddingLeft (~5vw) and the word is ~85vw wide at large sizes
      // We approximate by measuring from the right, subtracting a small margin
      const w = canvas.width;
      const h = canvas.height;
      // Wordmark bounding box: starts ~5vw from left, spans ~75vw, vertically centred
      const textX = w * 0.5;    // centre-x of the word
      const textY = h * 0.48;   // vertical centre
      const textW = w * 0.75;   // approximate word width
      const textH = h * 0.22;   // approximate word height
      originRef.current = { x: textX, y: textY, w: textW, h: textH };
    };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(section);
    return () => ro.disconnect();
  }, [mounted]);

  /* Seed the background stream: always spawn particles from origin */
  useEffect(() => {
    if (!mounted) return;

    // Spawn continuously (one every 120ms) for high density
    const id = setInterval(() => {
      const { x, y, w, h } = originRef.current;
      particlesRef.current.push(createParticle(false, x, y, w, h));
      // Cap at 250 ambient particles for massive cloud
      if (particlesRef.current.length > 250) particlesRef.current.shift();
    }, 120);

    return () => clearInterval(id);
  }, [mounted]);

  /* RAF draw loop */
  useEffect(() => {
    if (!mounted) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const img = logoImgRef.current;

      particlesRef.current = particlesRef.current.filter(p => {
        p.life++;
        const t = p.life / p.maxLife;
        if (t >= 1) return false;

        // Gentle gravity-free drift
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.005; // micro vertical drift
        p.angle += p.av;

        // Opacity: fade in quickly, hold, then fade out
        const opacity = t < 0.15 ? t / 0.15 : 1 - ((t - 0.15) / 0.85);
        const scale = 0.5 + t * 1.5;
        const drawSize = p.size * scale;

        ctx.save();
        ctx.globalAlpha = opacity * 0.85; // Max 85% opacity — high contrast and highly visible
        ctx.translate(p.bx + p.x, p.by + p.y);
        ctx.rotate(p.angle);

        if (img) {
          // Composite: draw tinted logo using "source-in" trick
          ctx.globalCompositeOperation = "source-over";
          ctx.drawImage(img, -drawSize / 2, -drawSize / 2, drawSize, drawSize);
          // Tint red by drawing a red rect clipped to the logo shape
          ctx.globalCompositeOperation = "source-atop";
          ctx.fillStyle = "#ff0033";
          ctx.fillRect(-drawSize / 2, -drawSize / 2, drawSize, drawSize);
        } else {
          // Fallback: plain red circle
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

  /* Touch/click burst handler */
  const handlePointerDown = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Spawn 16 burst particles from exact tap position
    for (let i = 0; i < 16; i++) {
      particlesRef.current.push(createParticle(true, x, y));
    }
    if (particlesRef.current.length > 200) {
      particlesRef.current = particlesRef.current.slice(-200);
    }
  }, []);

  const handlePointerMove = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
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
      {/* Rising/setting sun over mountains — pure SVG, no DOM weight */}
      <svg
        className="hero-scenery-svg"
        aria-hidden="true"
        viewBox="0 0 1200 480"
        preserveAspectRatio="xMidYMax meet"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Sky gradient that shifts warm→cool→warm with the sun */}
          <radialGradient id="sunGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%"   stopColor="#ff0033" stopOpacity="0.55" />
            <stop offset="55%"  stopColor="#ff6644" stopOpacity="0.18" />
            <stop offset="100%" stopColor="#ffffff"  stopOpacity="0" />
          </radialGradient>
          <linearGradient id="skyGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"   stopColor="#fff0f2" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#ffffff"  stopOpacity="0" />
          </linearGradient>
          {/* Mountain fills */}
          <linearGradient id="mtBack" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"   stopColor="#ffccd5" />
            <stop offset="100%" stopColor="#ffe8ec" />
          </linearGradient>
          <linearGradient id="mtMid" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"   stopColor="#ffffff" />
            <stop offset="100%" stopColor="#fff5f6" />
          </linearGradient>
          <linearGradient id="mtFront" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"   stopColor="#fff8f9" />
            <stop offset="100%" stopColor="#ffffff" />
          </linearGradient>
        </defs>

        {/* Sky wash */}
        <rect x="0" y="0" width="1200" height="480" fill="url(#skyGrad)" />

        {/* Sun glow halo — animates up then back down */}
        <ellipse className="hero-sun-glow" cx="600" cy="320" rx="180" ry="180" fill="url(#sunGlow)" />

        {/* Sun disc */}
        <circle className="hero-sun" cx="600" cy="340" r="52" fill="#ff0033" opacity="0.82" />
        {/* Subtle rays */}
        <g className="hero-sun-rays" strokeWidth="2" stroke="#ff0033" strokeOpacity="0.25">
          <line x1="600" y1="268" x2="600" y2="248" />
          <line x1="600" y1="412" x2="600" y2="432" />
          <line x1="528" y1="340" x2="508" y2="340" />
          <line x1="672" y1="340" x2="692" y2="340" />
          <line x1="549" y1="289" x2="535" y2="275" />
          <line x1="651" y1="391" x2="665" y2="405" />
          <line x1="651" y1="289" x2="665" y2="275" />
          <line x1="549" y1="391" x2="535" y2="405" />
        </g>

        {/* Back mountain range */}
        <path
          fill="url(#mtBack)"
          opacity="0.72"
          d="M0,480 L0,290 L120,210 L240,260 L360,170 L480,240 L600,160 L720,240 L840,185 L960,250 L1080,210 L1200,270 L1200,480 Z"
        />

        {/* Mid mountain range */}
        <path
          fill="url(#mtMid)"
          opacity="0.88"
          d="M0,480 L0,330 L150,270 L300,320 L450,240 L600,300 L750,250 L900,310 L1050,265 L1200,310 L1200,480 Z"
        />

        {/* Front mountain/hill — almost white, clips the sun at bottom */}
        <path
          fill="url(#mtFront)"
          opacity="1"
          d="M0,480 L0,390 L200,340 L400,380 L550,320 L700,370 L900,330 L1100,370 L1200,350 L1200,480 Z"
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
