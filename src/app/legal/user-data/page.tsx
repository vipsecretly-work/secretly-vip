import React from "react";

export default function UserDataPage() {
  return (
    <main style={{ minHeight: "70vh", padding: "80px 40px", maxWidth: "800px", margin: "0 auto" }}>
      <h1 style={{ fontFamily: "var(--f-brand)", fontSize: "clamp(48px, 6vw, 72px)", color: "var(--red)", marginBottom: "32px", lineHeight: 1 }}>
        User Data
      </h1>
      <div style={{ fontSize: "15px", lineHeight: 1.8, color: "#333", display: "flex", flexDirection: "column", gap: "24px" }}>
        <p>
          At Secretly, we believe in radical transparency regarding your data. We do not sell, distribute, or broker your personal information.
        </p>
        <h2 style={{ fontSize: "13px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--black)" }}>Data Retention</h2>
        <p>
          We retain your structural data only for as long as necessary to fulfill the purposes we collected it for, including for the purposes of satisfying any legal, accounting, or reporting requirements.
        </p>
        <h2 style={{ fontSize: "13px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--black)" }}>Right to Erasure</h2>
        <p>
          You have the right to request that we delete the personal information we hold about you at any time. Please contact our support team via DM to enact a data purge request.
        </p>
      </div>
    </main>
  );
}
