"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import EditorialQuote from "@/components/EditorialQuote";
import InteractiveHero from "@/components/InteractiveHero";

function FadeIn({ children, delay = 0, className = "" }: { children: React.ReactNode, delay?: number, className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

const CAROUSEL_PIECES = [
  {
    id: "bracelet",
    title: "Bracelet",
    theme: "hero-panel-dark",
    art: (
      <svg viewBox="0 0 120 120" fill="none" stroke="currentColor" strokeLinecap="round">
        <circle cx="60" cy="60" r="40" strokeWidth="6"/>
        <circle cx="60" cy="60" r="28" strokeWidth="1.5" strokeDasharray="4 3"/>
        <circle cx="60" cy="20" r="5" fill="currentColor" stroke="none"/>
        <circle cx="60" cy="20" r="3" fill="#ff0033" stroke="none"/>
      </svg>
    )
  },
  {
    id: "watches",
    title: "Watches",
    theme: "hero-panel-warm",
    art: (
      <svg viewBox="0 0 90 130" fill="none" stroke="currentColor" strokeLinecap="round">
        <rect x="18" y="28" width="54" height="74" rx="12" strokeWidth="2.5"/>
        <circle cx="45" cy="65" r="20" strokeWidth="1.5"/>
        <line x1="45" y1="65" x2="45" y2="51" strokeWidth="2"/>
        <line x1="45" y1="65" x2="56" y2="65" strokeWidth="1.5"/>
        <circle cx="45" cy="65" r="2.5" fill="currentColor" stroke="none"/>
        <rect x="28" y="6" width="34" height="22" rx="5" strokeWidth="1.5"/>
        <rect x="28" y="102" width="34" height="22" rx="5" strokeWidth="1.5"/>
      </svg>
    )
  },
  {
    id: "goggles",
    title: "Goggles",
    theme: "hero-panel-gray",
    art: (
      <svg viewBox="0 0 140 80" fill="none" stroke="currentColor" strokeLinecap="round">
        <rect x="4" y="18" width="58" height="44" rx="14" strokeWidth="3"/>
        <rect x="78" y="18" width="58" height="44" rx="14" strokeWidth="3"/>
        <path d="M62 40 L78 40" strokeWidth="3"/>
        <path d="M4 40 Q0 40 0 32" strokeWidth="2"/>
        <path d="M136 40 Q140 40 140 32" strokeWidth="2"/>
        <circle cx="33" cy="40" r="10" strokeWidth="1" strokeDasharray="2 2"/>
        <circle cx="107" cy="40" r="10" strokeWidth="1" strokeDasharray="2 2"/>
      </svg>
    )
  },
  {
    id: "bags",
    title: "Bags",
    theme: "hero-panel-cream",
    art: (
      <svg viewBox="0 0 110 120" fill="none" stroke="currentColor" strokeLinecap="round" style={{color:"#ff0033"}}>
        <path d="M18 42 L8 108 L102 108 L92 42 Z" strokeWidth="2.5"/>
        <path d="M38 42 C38 22 72 22 72 42" strokeWidth="2.5"/>
        <line x1="25" y1="72" x2="85" y2="72" strokeWidth="1.5"/>
        <rect x="44" y="64" width="22" height="14" rx="3" strokeWidth="1.5"/>
        <circle cx="55" cy="71" r="2.5" fill="currentColor" stroke="none"/>
      </svg>
    )
  }
];

import { AnimatePresence } from "framer-motion";

function HeroCarousel() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex(prev => (prev + 1) % CAROUSEL_PIECES.length);
    }, 2500);
    return () => clearInterval(timer);
  }, []);

  const p1 = CAROUSEL_PIECES[index];
  const p2 = CAROUSEL_PIECES[(index + 1) % CAROUSEL_PIECES.length];

  const variants = {
    enter: { y: 80, opacity: 0, scale: 0.95 },
    center: { y: 0, opacity: 1, scale: 1 },
    exit: { y: -80, opacity: 0, scale: 1.05 }
  };

  return (
    <section className="hero-split">
      {/* Left Panel */}
      <div style={{ position: "relative", overflow: "hidden", display: "flex", borderRadius: "40px" }}>
        <AnimatePresence mode="popLayout">
          <motion.div
            key={p1.id}
            variants={variants}
            initial="enter" animate="center" exit="exit"
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            style={{ width: "100%", display: "flex", flex: 1 }}
          >
            <Link href={`/products/${p1.id}`} className={`hero-panel ${p1.theme}`} style={{ width: "100%", margin: 0, borderRadius: "40px" }}>
              <Image src="/Image/Logo.png" alt="" width={28} height={28} style={{position:"absolute",top:20,right:20,objectFit:"contain",filter: p1.theme.includes("dark") ? "brightness(0) invert(1)" : "none", opacity:0.15,pointerEvents:"none"}} />
              <div className="hero-panel-art">{p1.art}</div>
              <div className="hero-panel-footer">
                <h2 className="hero-panel-title">{p1.title}</h2>
                <span className="hero-panel-link">Explore the piece</span>
              </div>
            </Link>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Right Panel */}
      <div style={{ position: "relative", overflow: "hidden", display: "flex", borderRadius: "40px" }}>
        <AnimatePresence mode="popLayout">
          <motion.div
            key={p2.id}
            variants={variants}
            initial="enter" animate="center" exit="exit"
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.1 }} // Slight delay for trailing parallax feel
            style={{ width: "100%", display: "flex", flex: 1 }}
          >
            <Link href={`/products/${p2.id}`} className={`hero-panel ${p2.theme}`} style={{ width: "100%", margin: 0, borderRadius: "40px" }}>
              <Image src="/Image/Logo.png" alt="" width={28} height={28} style={{position:"absolute",top:20,right:20,objectFit:"contain",filter: p2.theme.includes("dark") ? "brightness(0) invert(1)" : "none", opacity:0.15,pointerEvents:"none"}} />
              <div className="hero-panel-art">{p2.art}</div>
              <div className="hero-panel-footer">
                <h2 className="hero-panel-title">{p2.title}</h2>
                <span className="hero-panel-link">Explore the piece</span>
              </div>
            </Link>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <main>
      <InteractiveHero />

      {/* ── HERO CAROUSEL ───────────────────────────── */}
      <HeroCarousel />

      <EditorialQuote />

      {/* ── OUR PIECES ───────────────────────────── */}
      <section className="our-pieces" id="our-pieces">
        <FadeIn className="our-pieces-header">
          <h2 className="our-pieces-heading">Our Pieces</h2>
          <Link className="our-pieces-link" href="/products">Discover All</Link>
        </FadeIn>
        <div className="pieces-row">
          <Link className="piece-card" href="/products/bracelet">
            <div className="piece-card-img piece-bg-cream">
              <span className="piece-card-num">01</span>
              <svg viewBox="0 0 120 120" fill="none" stroke="currentColor" strokeLinecap="round">
                <circle cx="60" cy="60" r="40" strokeWidth="4"/>
                <circle cx="60" cy="60" r="28" strokeWidth="1" strokeDasharray="3 2"/>
                <circle cx="60" cy="20" r="4" fill="currentColor" stroke="none"/>
              </svg>
            </div>
            <div className="piece-card-body">
              <h3 className="piece-card-name">Bracelet</h3>
              <span className="piece-card-action">View →</span>
            </div>
          </Link>
          <Link className="piece-card" href="/products/watches">
            <div className="piece-card-img piece-bg-dark">
              <span className="piece-card-num">02</span>
              <svg viewBox="0 0 90 130" fill="none" stroke="currentColor" strokeLinecap="round">
                <rect x="18" y="28" width="54" height="74" rx="12" strokeWidth="2.5"/>
                <circle cx="45" cy="65" r="20" strokeWidth="1.5"/>
                <line x1="45" y1="65" x2="45" y2="51" strokeWidth="2"/>
                <line x1="45" y1="65" x2="56" y2="65" strokeWidth="1.5"/>
                <rect x="28" y="6" width="34" height="22" rx="5" strokeWidth="1.5"/>
                <rect x="28" y="102" width="34" height="22" rx="5" strokeWidth="1.5"/>
              </svg>
            </div>
            <div className="piece-card-body">
              <h3 className="piece-card-name">Watches</h3>
              <span className="piece-card-action">View →</span>
            </div>
          </Link>
          <Link className="piece-card" href="/products/goggles">
            <div className="piece-card-img piece-bg-gray">
              <span className="piece-card-num">03</span>
              <svg viewBox="0 0 140 80" fill="none" stroke="currentColor" strokeLinecap="round">
                <rect x="4" y="18" width="58" height="44" rx="14" strokeWidth="3"/>
                <rect x="78" y="18" width="58" height="44" rx="14" strokeWidth="3"/>
                <path d="M62 40 L78 40" strokeWidth="3"/>
                <path d="M4 40 Q0 40 0 32" strokeWidth="2"/>
                <path d="M136 40 Q140 40 140 32" strokeWidth="2"/>
                <circle cx="33" cy="40" r="10" strokeWidth="1" strokeDasharray="2 2"/>
                <circle cx="107" cy="40" r="10" strokeWidth="1" strokeDasharray="2 2"/>
              </svg>
            </div>
            <div className="piece-card-body">
              <h3 className="piece-card-name">Goggles</h3>
              <span className="piece-card-action">View →</span>
            </div>
          </Link>
          <Link className="piece-card" href="/products/bags">
            <div className="piece-card-img piece-bg-warm">
              <span className="piece-card-num">04</span>
              <svg viewBox="0 0 110 120" fill="none" stroke="currentColor" strokeLinecap="round" style={{color:"#ff0033"}}>
                <path d="M18 42 L8 108 L102 108 L92 42 Z" strokeWidth="2.5"/>
                <path d="M38 42 C38 22 72 22 72 42" strokeWidth="2.5"/>
                <line x1="25" y1="72" x2="85" y2="72" strokeWidth="1.5"/>
                <rect x="44" y="64" width="22" height="14" rx="3" strokeWidth="1.5"/>
                <circle cx="55" cy="71" r="2.5" fill="currentColor" stroke="none"/>
              </svg>
            </div>
            <div className="piece-card-body">
              <h3 className="piece-card-name">Bags</h3>
              <span className="piece-card-action">View →</span>
            </div>
          </Link>
        </div>
      </section>

    </main>
  );
}
