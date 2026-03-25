"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { Search, X, ArrowRight } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";
import { motion } from "framer-motion";

// ── Product catalogue ─────────────────────────────────────────────
const PRODUCTS = [
  { id: "bracelet", name: "Bracelet", category: "Accessories", tags: ["bracelet", "metal", "stack", "wrist", "jewelry"] },
  { id: "watches",  name: "Watches",  category: "Accessories", tags: ["watch", "time", "wrist", "clock", "leather"] },
  { id: "goggles",  name: "Goggles",  category: "Eyewear",     tags: ["goggles", "glasses", "eyewear", "shades", "frame"] },
  { id: "bags",     name: "Bags",     category: "Carry",       tags: ["bag", "carry", "tote", "shoulder", "pack", "pouch"] },
];

function searchProducts(query: string) {
  if (!query.trim()) return PRODUCTS;
  const q = query.toLowerCase();
  return PRODUCTS.filter(p =>
    p.name.toLowerCase().includes(q) ||
    p.category.toLowerCase().includes(q) ||
    p.tags.some(t => t.includes(q))
  );
}

// ── Search Overlay ────────────────────────────────────────────────
function SearchOverlay({ onClose }: { onClose: () => void }) {
  const [query, setQuery] = useState("");
  const results = searchProducts(query);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    inputRef.current?.focus();
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  const go = (id: string) => {
    router.push(`/products/${id}`);
    onClose();
  };

  return (
    <div
      style={{
        position: "fixed", inset: 0, zIndex: 9999,
        background: "rgba(255, 255, 255, 0.98)",
        backdropFilter: "blur(40px)",
        display: "flex", flexDirection: "column",
        alignItems: "center", paddingTop: "15vh",
        animation: "fadeIn 0.2s ease"
      }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      {/* Stark Red Close Button */}
      <button
        onClick={onClose}
        style={{ position: "absolute", top: "40px", right: "40px", background: "none", border: "none", cursor: "pointer", color: "var(--red)", padding: 8 }}
        aria-label="Close search"
      >
        <X size={40} strokeWidth={1} />
      </button>

      {/* Massive Editorial Search Input */}
      <div style={{ width: "min(900px, 90vw)", position: "relative" }}>
        <input
          ref={inputRef}
          value={query}
          className="search-input-field"
          onChange={e => setQuery(e.target.value)}
          placeholder="SEARCH PIECES"
          style={{
            width: "100%", background: "none", border: "none",
            borderBottom: "4px solid var(--black)",
            padding: "0 0 16px 0",
            fontSize: "clamp(48px, 10vw, 120px)", 
            fontFamily: "var(--f-brand)", 
            lineHeight: 0.85,
            color: "var(--red)", 
            textTransform: "uppercase",
            outline: "none",
          }}
        />
        {/* Helper text floating inside top of border */}
        <div style={{ position: "absolute", bottom: "-28px", left: 0, fontSize: "11px", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--black)" }}>
          {query ? `MATCHES FOR: ${query}` : "PRESS ESC TO CLOSE"}
        </div>
      </div>

      {/* Results */}
      <div style={{ width: "min(900px, 90vw)", marginTop: "64px" }}>
        {query && results.length === 0 ? (
          <p style={{ color: "var(--red)", fontSize: "18px", fontWeight: 500, fontFamily: "var(--f-brand)", letterSpacing: "0.05em", marginTop: "40px" }}>
            NO PIECES FOUND.
          </p>
        ) : (
          results.map(p => (
            <button
              key={p.id}
              onClick={() => go(p.id)}
              className="search-result-btn"
              style={{
                width: "100%", display: "flex", alignItems: "baseline", justifyContent: "space-between",
                padding: "24px 0", borderBottom: "1px solid rgba(0,0,0,0.1)",
                background: "none", border: "none",
                cursor: "pointer", textAlign: "left",
                transition: "all 0.2s ease"
              }}
              onMouseEnter={(e) => { e.currentTarget.style.color = "var(--red)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = "var(--black)"; }}
            >
              <div style={{ display: "flex", alignItems: "baseline", gap: "24px" }}>
                <div style={{ fontSize: "clamp(24px, 4vw, 48px)", fontFamily: "var(--f-brand)", textTransform: "uppercase", lineHeight: 1 }}>
                  {p.name}
                </div>
                <div style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", opacity: 0.5 }}>
                  {p.category}
                </div>
              </div>
              <ArrowRight size={24} strokeWidth={1} style={{ opacity: 0.5 }} />
            </button>
          ))
        )}

        {/* Quick links when no query */}
        {!query && (
          <div style={{ marginTop: "48px" }}>
            <p style={{ fontSize: "11px", color: "var(--black)", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "24px", opacity: 0.5 }}>
              QUICK LINKS
            </p>
            <div style={{ display: "flex", gap: "24px", flexWrap: "wrap" }}>
              {["All Products", "Custom", "Contact"].map(label => (
                <Link
                  key={label}
                  href={label === "All Products" ? "/products" : `/${label.toLowerCase()}`}
                  onClick={onClose}
                  style={{
                    fontSize: "14px", color: "var(--black)", textDecoration: "none",
                    fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase",
                    borderBottom: "1.5px solid transparent",
                    paddingBottom: "4px",
                    transition: "border-color 0.2s"
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.color = "var(--red)"; e.currentTarget.style.borderColor = "var(--red)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.color = "var(--black)"; e.currentTarget.style.borderColor = "transparent"; }}
                >
                  {label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ── Navbar ────────────────────────────────────────────────────────
export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const pathname = usePathname();

  // Prevent body scroll when search is open
  useEffect(() => {
    document.body.style.overflow = searchOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [searchOpen]);

  const openSearch = useCallback(() => setSearchOpen(true), []);
  const closeSearch = useCallback(() => setSearchOpen(false), []);

  return (
    <>
      <nav className="navbar">
        <Link className="nav-logo" href="/">
          <Image src="/Image/Logo.png" alt="Secretly" width={32} height={32} />
          Secretly®
        </Link>

        <div className="nav-links" style={{ display: "flex", position: "relative", padding: "6px", background: "rgba(0,0,0,0.03)", borderRadius: "99px", alignItems: "center" }}>
          {[
            {href: "/", label: "Home"},
            {href: "/products", label: "Products"},
            {href: "/custom", label: "Custom"},
            {href: "/contact", label: "Contact"}
          ].map(item => {
            const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
            return (
              <Link 
                key={item.href} 
                href={item.href} 
                className="nav-link"
                style={{ 
                  position: "relative", 
                  zIndex: 1, 
                  padding: "10px 24px", 
                  color: isActive ? "var(--white)" : "var(--black)", 
                  transition: "color 0.4s ease",
                  margin: 0,
                  borderRadius: "99px",
                  fontWeight: 700,
                  fontSize: "11px",
                  textTransform: "uppercase",
                  letterSpacing: "0.15em",
                }}
              >
                {isActive && (
                  <motion.div
                    layoutId="desktop-nav-pill"
                    style={{
                      position: "absolute",
                      inset: 0,
                      background: "var(--black)",
                      borderRadius: "99px",
                      zIndex: -1,
                      boxShadow: "0 4px 12px rgba(0,0,0,0.1)"
                    }}
                    transition={{ type: "spring", stiffness: 450, damping: 35 }}
                  />
                )}
                <span style={{ position: "relative", zIndex: 2 }}>{item.label}</span>
              </Link>
            )
          })}
        </div>
        <div className="nav-actions">
          <button
            className="nav-icon"
            onClick={openSearch}
            aria-label="Search"
            style={{ cursor: "pointer", border: "none" }}
          >
            <Search size={15} stroke="#fff" strokeWidth={2} />
          </button>
          <button
            className="nav-hamburger"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Menu"
          >
            <span /><span /><span />
          </button>
        </div>
      </nav>

      <div className={`nav-drawer ${isOpen ? "open" : ""}`}>
        <Link className="nav-link" href="/" onClick={() => setIsOpen(false)}>Home</Link>
        <Link className="nav-link" href="/products" onClick={() => setIsOpen(false)}>Products</Link>
        <Link className="nav-link" href="/custom" onClick={() => setIsOpen(false)}>Custom</Link>
        <Link className="nav-link" href="/contact" onClick={() => setIsOpen(false)}>Contact</Link>
        <button
          onClick={() => { setIsOpen(false); openSearch(); }}
          style={{ textAlign: "left", background: "none", border: "none", cursor: "pointer", padding: "12px 0", fontSize: "14px", borderBottom: "1px solid var(--line)", fontFamily: "inherit", letterSpacing: "0.1em", textTransform: "uppercase", fontWeight: 500 }}
        >
          Search
        </button>
      </div>

      {searchOpen && <SearchOverlay onClose={closeSearch} />}
    </>
  );
}
