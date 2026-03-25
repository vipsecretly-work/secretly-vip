import React from "react";

export default function PrivacyPage() {
  return (
    <main style={{ minHeight: "70vh", padding: "80px 40px", maxWidth: "800px", margin: "0 auto" }}>
      <h1 style={{ fontFamily: "var(--f-brand)", fontSize: "clamp(48px, 6vw, 72px)", color: "var(--red)", marginBottom: "32px", lineHeight: 1 }}>
        Privacy Policy
      </h1>
      <div style={{ fontSize: "15px", lineHeight: 1.8, color: "#333", display: "flex", flexDirection: "column", gap: "24px" }}>
        <p>
          When you purchase something from our store, as part of the buying and selling process, we collect the personal information you give us such as your name, address and email address.
        </p>
        <h2 style={{ fontSize: "13px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--black)" }}>Consent</h2>
        <p>
          How do you get my consent? When you provide us with personal information to complete a transaction, verify your credit card, place an order, arrange for a delivery or return a purchase, we imply that you consent to our collecting it and using it for that specific reason only.
        </p>
        <h2 style={{ fontSize: "13px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--black)" }}>Disclosure</h2>
        <p>
          We may disclose your personal information if we are required by law to do so or if you violate our Terms of Service.
        </p>
      </div>
    </main>
  );
}
