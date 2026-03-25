import Link from "next/link";
import Image from "next/image";

export default function CustomPage() {
  return (
    <main>
      <div className="page-hero">
        <div>
          <span className="logo-stamp">
            <Image src="/Image/Logo.png" alt="S" width={18} height={18} /> Secretly®
          </span>
          <h1 className="page-hero-title" style={{ marginTop: 8 }}>
            Custom
          </h1>
        </div>
        <p className="page-hero-meta">Your way</p>
      </div>

      <section className="editorial">
        <div className="editorial-visual">
          <svg viewBox="0 0 140 160" fill="none" stroke="currentColor" strokeLinecap="round" style={{ width: 200, height: 200, color: "white" }}>
            <circle cx="70" cy="70" r="42" strokeWidth="3" />
            <circle cx="70" cy="70" r="28" strokeWidth="1" strokeDasharray="3 2" />
            <circle cx="70" cy="28" r="5" fill="currentColor" stroke="none" />
            <circle cx="70" cy="28" r="3" fill="#ff0033" stroke="none" />
            <path d="M52 116 L46 148 L94 148 L88 116 Z" strokeWidth="2" />
            <path d="M60 116 C60 106 80 106 80 116" strokeWidth="2" />
          </svg>
          <span className="editorial-visual-label">Made for you specifically</span>
        </div>
        <div className="editorial-text">
          <p className="editorial-eyebrow">Custom Orders</p>
          <h2 className="editorial-heading">
            Want something<br />
            <em>specific?</em>
          </h2>
          <p className="editorial-body">
            If you have something specific in mind — a different colour, a custom size, a piece that&apos;s not listed — send us a DM. We&apos;ll work it out from there.
          </p>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <a className="btn btn-black" href="https://ig.me/m/skhh" target="_blank" rel="noopener noreferrer">
              DM for Custom
            </a>
            <Link className="btn btn-outline" href="/products">
              View All Pieces
            </Link>
          </div>
        </div>
      </section>

      <section className="brand-statement">
        <h2 className="brand-statement-heading">
          Tell us<br />
          what you<br />
          <em>want.</em>
        </h2>
        <div className="brand-statement-body">
          <p>
            Custom orders are handled directly through DM. Tell us the piece, the spec, what you&apos;re thinking — and we&apos;ll respond with what&apos;s possible.
          </p>
          <p>No forms. No wait time. Just a message.</p>
          <a className="btn btn-black" href="https://ig.me/m/skhh" target="_blank" rel="noopener noreferrer">
            Start a DM →
          </a>
        </div>
      </section>
    </main>
  );
}
