import Link from "next/link";
import Image from "next/image";

export default function ContactPage() {
  return (
    <main>
      <div className="page-hero">
        <div>
          <span className="logo-stamp">
            <Image src="/Image/Logo.png" alt="S" width={18} height={18} /> Secretly®
          </span>
          <h1 className="page-hero-title" style={{ marginTop: 8 }}>
            Contact
          </h1>
        </div>
        <p className="page-hero-meta">Reach out</p>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          borderBottom: "1px solid var(--line)",
        }}
      >
        <div style={{ padding: "56px 48px" }}>
          <p
            style={{
              fontSize: 10,
              fontWeight: 600,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "var(--muted)",
              marginBottom: 16,
            }}
          >
            Get in touch
          </p>
          <h2
            style={{
              fontFamily: "var(--f-brand)",
              fontSize: "clamp(36px, 5vw, 64px)",
              fontWeight: 400,
              lineHeight: 1.1,
              marginBottom: 24,
            }}
          >
            Hit us
            <br />
            <em style={{ fontStyle: "italic", color: "var(--muted)" }}>any time.</em>
          </h2>
          <p style={{ fontSize: 15, lineHeight: 1.8, color: "#555", marginBottom: 32 }}>
            The easiest way to reach us is a DM. Slide in, tell us what you want, and we handle everything from there.
          </p>
          <a className="btn btn-black" href="https://instagram.com/skhh" target="_blank" rel="noopener noreferrer">
            Instagram ↗
          </a>
        </div>

        <div style={{ padding: "56px 48px", borderLeft: "1px solid var(--line)", background: "var(--cream)" }}>
          <p
            style={{
              fontSize: 10,
              fontWeight: 600,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "var(--muted)",
              marginBottom: 16,
            }}
          >
            Quick links
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 16, padding: "16px 0", borderBottom: "1px solid var(--line)", fontSize: 14 }}>
              <span style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--muted)", width: 80, flexShrink: 0 }}>
                Instagram
              </span>
              <a href="https://instagram.com/skhh" target="_blank" rel="noopener noreferrer" style={{ color: "var(--black)", fontWeight: 500 }}>
                @skhh
              </a>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 16, padding: "16px 0", borderBottom: "1px solid var(--line)", fontSize: 14 }}>
              <span style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--muted)", width: 80, flexShrink: 0 }}>
                DM
              </span>
              <a href="https://ig.me/m/skhh" target="_blank" rel="noopener noreferrer" style={{ color: "var(--black)", fontWeight: 500 }}>
                ig.me/m/skhh
              </a>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 16, padding: "16px 0", borderBottom: "1px solid var(--line)", fontSize: 14 }}>
              <span style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--muted)", width: 80, flexShrink: 0 }}>
                Email
              </span>
              <a href="mailto:info@secretly.vip" style={{ color: "var(--black)", fontWeight: 500 }}>
                info@secretly.vip
              </a>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 16, padding: "16px 0", borderBottom: "1px solid var(--line)", fontSize: 14 }}>
              <span style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--muted)", width: 80, flexShrink: 0 }}>
                Website
              </span>
              <Link href="/" style={{ color: "var(--black)", fontWeight: 500 }}>
                secretly.vip
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
