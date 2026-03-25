import React from "react";

export default function CookiesPage() {
  return (
    <main style={{ minHeight: "70vh", padding: "80px 40px", maxWidth: "800px", margin: "0 auto" }}>
      <h1 style={{ fontFamily: "var(--f-brand)", fontSize: "clamp(48px, 6vw, 72px)", color: "var(--red)", marginBottom: "32px", lineHeight: 1 }}>
        Cookies Info
      </h1>
      <div style={{ fontSize: "15px", lineHeight: 1.8, color: "#333", display: "flex", flexDirection: "column", gap: "24px" }}>
        <p>
          To make this site work properly, we sometimes place small data files called cookies on your device. Most big websites do this too.
        </p>
        <h2 style={{ fontSize: "13px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--black)" }}>What are cookies?</h2>
        <p>
          A cookie is a small text file that a website saves on your computer or mobile device when you visit the site. It enables the website to remember your actions and preferences over a period of time, so you don’t have to keep re-entering them whenever you come back to the site.
        </p>
        <h2 style={{ fontSize: "13px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--black)" }}>How we use them</h2>
        <p>
          We only use strictly necessary cookies required for the fundamental operation of the Secretly web application, such as session management and checkout processing. No tracking or marketing cookies are utilized.
        </p>
      </div>
    </main>
  );
}
