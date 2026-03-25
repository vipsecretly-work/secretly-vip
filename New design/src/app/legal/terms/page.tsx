import React from "react";

export default function TermsPage() {
  return (
    <main style={{ minHeight: "70vh", padding: "80px 40px", maxWidth: "800px", margin: "0 auto" }}>
      <h1 style={{ fontFamily: "var(--f-brand)", fontSize: "clamp(48px, 6vw, 72px)", color: "var(--red)", marginBottom: "32px", lineHeight: 1 }}>
        Terms & Conditions
      </h1>
      <div style={{ fontSize: "15px", lineHeight: 1.8, color: "#333", display: "flex", flexDirection: "column", gap: "24px" }}>
        <p>
          Welcome to Secretly. By accessing and using our website, you accept and agree to be bound by the terms and provision of this agreement. Any participation in this service will constitute acceptance of this agreement.
        </p>
        <h2 style={{ fontSize: "13px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--black)" }}>General Conditions</h2>
        <p>
          We reserve the right to refuse service to anyone for any reason at any time. You understand that your content (not including credit card information), may be transferred unencrypted and involve transmissions over various networks.
        </p>
        <h2 style={{ fontSize: "13px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--black)" }}>Modifications to the Service and Prices</h2>
        <p>
          Prices for our products are subject to change without notice. We reserve the right at any time to modify or discontinue the Service (or any part or content thereof) without notice at any time. We shall not be liable to you or to any third-party for any modification, price change, suspension or discontinuance of the Service.
        </p>
      </div>
    </main>
  );
}
