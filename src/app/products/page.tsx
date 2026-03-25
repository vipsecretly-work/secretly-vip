import Link from "next/link";
import Image from "next/image";

export default function ProductsPage() {
  return (
    <main>
      <div className="page-hero">
        <div>
          <span className="logo-stamp">
            <Image src="/Image/Logo.png" alt="S" width={18} height={18} /> Secretly®
          </span>
          <h1 className="page-hero-title" style={{ marginTop: 8 }}>
            Products
          </h1>
        </div>
        <p className="page-hero-meta">Collection</p>
      </div>

      <section className="our-pieces" style={{ borderTop: "none" }}>
        <div className="pieces-row" style={{ borderTop: "none" }}>
          <Link className="piece-card" href="/products/bracelet">
            <div className="piece-card-img piece-bg-cream">
              <span className="piece-card-num">01</span>
              <svg viewBox="0 0 120 120" fill="none" stroke="currentColor" strokeLinecap="round" style={{ width: 110, height: 110 }}>
                <circle cx="60" cy="60" r="40" strokeWidth="4" />
                <circle cx="60" cy="60" r="28" strokeWidth="1" strokeDasharray="3 2" />
                <circle cx="60" cy="20" r="4" fill="currentColor" stroke="none" />
              </svg>
            </div>
            <div className="piece-card-body">
              <h3 className="piece-card-name">Bracelet</h3>
              <span className="piece-card-action">View Piece →</span>
            </div>
          </Link>

          <Link className="piece-card" href="/products/watches">
            <div className="piece-card-img piece-bg-dark">
              <span className="piece-card-num">02</span>
              <svg viewBox="0 0 90 130" fill="none" stroke="currentColor" strokeLinecap="round" style={{ width: 100, height: 130 }}>
                <rect x="18" y="28" width="54" height="74" rx="12" strokeWidth="2.5" />
                <circle cx="45" cy="65" r="20" strokeWidth="1.5" />
                <line x1="45" y1="65" x2="45" y2="51" strokeWidth="2" />
                <line x1="45" y1="65" x2="56" y2="65" strokeWidth="1.5" />
                <rect x="28" y="6" width="34" height="22" rx="5" strokeWidth="1.5" />
                <rect x="28" y="102" width="34" height="22" rx="5" strokeWidth="1.5" />
              </svg>
            </div>
            <div className="piece-card-body">
              <h3 className="piece-card-name">Watches</h3>
              <span className="piece-card-action">View Piece →</span>
            </div>
          </Link>

          <Link className="piece-card" href="/products/goggles">
            <div className="piece-card-img piece-bg-gray">
              <span className="piece-card-num">03</span>
              <svg viewBox="0 0 140 80" fill="none" stroke="currentColor" strokeLinecap="round" style={{ width: 130, height: 80 }}>
                <rect x="4" y="18" width="58" height="44" rx="14" strokeWidth="3" />
                <rect x="78" y="18" width="58" height="44" rx="14" strokeWidth="3" />
                <path d="M62 40 L78 40" strokeWidth="3" />
                <path d="M4 40 Q0 40 0 32" strokeWidth="2" />
                <path d="M136 40 Q140 40 140 32" strokeWidth="2" />
                <circle cx="33" cy="40" r="10" strokeWidth="1" strokeDasharray="2 2" />
                <circle cx="107" cy="40" r="10" strokeWidth="1" strokeDasharray="2 2" />
              </svg>
            </div>
            <div className="piece-card-body">
              <h3 className="piece-card-name">Goggles</h3>
              <span className="piece-card-action">View Piece →</span>
            </div>
          </Link>

          <Link className="piece-card" href="/products/bags">
            <div className="piece-card-img piece-bg-warm">
              <span className="piece-card-num">04</span>
              <svg viewBox="0 0 110 120" fill="none" stroke="currentColor" strokeLinecap="round" style={{ width: 110, height: 110, color: "#ff0033" }}>
                <path d="M18 42 L8 108 L102 108 L92 42 Z" strokeWidth="2.5" />
                <path d="M38 42 C38 22 72 22 72 42" strokeWidth="2.5" />
                <line x1="25" y1="72" x2="85" y2="72" strokeWidth="1.5" />
                <rect x="44" y="64" width="22" height="14" rx="3" strokeWidth="1.5" />
                <circle cx="55" cy="71" r="2.5" fill="currentColor" stroke="none" />
              </svg>
            </div>
            <div className="piece-card-body">
              <h3 className="piece-card-name">Bags</h3>
              <span className="piece-card-action">View Piece →</span>
            </div>
          </Link>
        </div>
      </section>

      {/* ── COMING SOON ── */}
      <section style={{ padding: "24px 16px 48px" }}>
        <div style={{
          background: "rgba(255,255,255,0.55)",
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
          border: "1px solid rgba(0,0,0,0.07)",
          borderRadius: "40px",
          padding: "80px 40px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "24px",
          textAlign: "center",
          boxShadow: "0 8px 48px rgba(255,0,51,0.05), inset 0 1px 1px rgba(255,255,255,0.9)"
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <span style={{
              width: "8px", height: "8px", borderRadius: "50%",
              background: "var(--red)",
              display: "inline-block",
              boxShadow: "0 0 0 4px rgba(255,0,51,0.15)",
              animation: "pulse 2s ease-in-out infinite"
            }} />
            <span style={{
              fontFamily: "var(--f-body)",
              fontSize: "11px",
              fontWeight: 700,
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              color: "var(--red)"
            }}>New Arrivals</span>
          </div>

          <h2 style={{
            fontFamily: "var(--f-display)",
            fontSize: "clamp(2.5rem, 5vw, 5rem)",
            textTransform: "uppercase",
            letterSpacing: "-0.02em",
            lineHeight: 1.0,
            color: "var(--black)",
            margin: 0
          }}>
            More Products<br/>
            <span style={{ color: "var(--red)" }}>Coming Soon</span>
          </h2>

          <p style={{
            fontFamily: "var(--f-body)",
            fontSize: "13px",
            fontWeight: 400,
            letterSpacing: "0.1em",
            color: "rgba(0,0,0,0.4)",
            maxWidth: "380px",
            margin: 0,
            lineHeight: 1.8
          }}>
            We are preparing something extraordinary. New curated pieces are on their way.
          </p>
        </div>
      </section>

    </main>
  );
}
