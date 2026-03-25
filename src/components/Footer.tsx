"use client";

import Link from "next/link";
import { Mail, Globe } from "lucide-react";
import { useEffect, useState } from "react";

const InstagramIcon = ({ size, color, strokeWidth }: { size: number, color: string, strokeWidth: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

export default function Footer() {
  const [time, setTime] = useState<Date | null>(null);
  const [region, setRegion] = useState<string>("");

  useEffect(() => {
    setTime(new Date());
    setRegion(Intl.DateTimeFormat().resolvedOptions().timeZone.replace("_", " "));
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const year = new Date().getFullYear();

  // Analog clock hands geometry calculations
  const secondsDegrees = time ? (time.getSeconds() / 60) * 360 : 0;
  const minsDegrees = time ? (time.getMinutes() / 60) * 360 + (time.getSeconds() / 60) * 6 : 0;
  const hoursDegrees = time ? (time.getHours() / 12) * 360 + (time.getMinutes() / 60) * 30 : 0;

  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="footer-col">
          <h3 className="footer-col-title">Legal</h3>
          <Link className="footer-link" href="/legal/terms">Terms & Conditions</Link>
          <Link className="footer-link" href="/legal/privacy">Privacy Policy</Link>
          <Link className="footer-link" href="/legal/user-data">User Data</Link>
          <Link className="footer-link" href="/legal/cookies">Cookies Info</Link>
        </div>
        
        {/* CLOCK COLUMN (Replaces Products) */}
        <div className="footer-col" style={{ alignItems: "flex-start" }}>
          <h3 className="footer-col-title" style={{ opacity: 0 }}>Time</h3>
          {time ? (
            <div style={{ position: "relative", width: "100px", height: "100px", borderRadius: "50%", border: "2px solid var(--red)", display: "flex", justifyContent: "center", alignItems: "center" }}>
              <div style={{ position: "absolute", width: "6px", height: "6px", borderRadius: "50%", backgroundColor: "var(--red)", zIndex: 10 }} />
              
              {/* Hour Hand */}
              <div style={{ position: "absolute", width: "3px", height: "26px", backgroundColor: "var(--red)", bottom: "50%", transformOrigin: "bottom center", transform: `rotate(${hoursDegrees}deg)`, borderRadius: "2px", transition: "transform 0.5s cubic-bezier(0.4, 2.08, 0.55, 0.44)" }} />
              
              {/* Minute Hand */}
              <div style={{ position: "absolute", width: "2px", height: "36px", backgroundColor: "var(--red)", bottom: "50%", transformOrigin: "bottom center", transform: `rotate(${minsDegrees}deg)`, borderRadius: "1px", opacity: 0.9, transition: "transform 0.5s cubic-bezier(0.4, 2.08, 0.55, 0.44)" }} />
              
              {/* Second Hand */}
              <div style={{ position: "absolute", width: "1px", height: "42px", backgroundColor: "var(--red)", bottom: "50%", transformOrigin: "bottom center", transform: `rotate(${secondsDegrees}deg)`, opacity: 0.6, transition: "transform 0.5s cubic-bezier(0.4, 2.08, 0.55, 0.44)" }} />
              
              {/* Top/Bottom/Left/Right Tick marks */}
              {[0, 3, 6, 9].map(h => (
                <div key={h} style={{ position: "absolute", width: "2px", height: "6px", backgroundColor: "var(--red)", top: "4px", left: "50%", marginLeft: "-1px", transformOrigin: "center 46px", transform: `rotate(${h * 30}deg)`, opacity: 0.4 }} />
              ))}
            </div>
          ) : (
            /* Layout placeholder before hydration */
            <div style={{ width: "100px", height: "100px", borderRadius: "50%", border: "2px solid rgba(255,0,51,0.2)" }} />
          )}
        </div>

        {/* DIGITAL TIME INFO COLUMN (Replaces More) */}
        <div className="footer-col" style={{ color: "var(--red)", textTransform: "uppercase", letterSpacing: "0.08em" }}>
          <h3 className="footer-col-title" style={{ opacity: 0 }}>Details</h3>
          {time ? (
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span style={{ fontSize: "24px", fontWeight: 700, lineHeight: 1, fontFamily: "monospace" }}>
                {time.toLocaleTimeString('en-US', { hour12: false })}
              </span>
              <span style={{ fontSize: "11px", fontWeight: 700, marginTop: "12px", color: "var(--red)" }}>
                {time.toLocaleDateString('en-US', { weekday: 'long' })}
              </span>
              <span style={{ fontSize: "11px", fontWeight: 600, marginTop: "4px", color: "var(--red)", opacity: 0.8 }}>
                {time.toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' })}
              </span>
              <span style={{ fontSize: "10px", fontWeight: 800, marginTop: "12px", color: "var(--red)", opacity: 0.5, borderTop: "1px solid rgba(255,0,51,0.1)", paddingTop: "8px" }}>
                REGION // {region.replace("/", " ")}
              </span>
            </div>
          ) : (
            <div style={{ opacity: 0 }}>Loading...</div>
          )}
        </div>

        <div className="footer-col">
          <h3 className="footer-col-title">Links</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            <a href="https://instagram.com/skhh" target="_blank" rel="noopener noreferrer" className="footer-link" style={{ display: "flex", alignItems: "center", gap: "12px", fontSize: "16px", marginBottom: 0 }}>
              <InstagramIcon size={28} color="#ff0033" strokeWidth={2} /> Instagram
            </a>
            <a href="mailto:info@secretly.vip" className="footer-link" style={{ display: "flex", alignItems: "center", gap: "12px", fontSize: "16px", marginBottom: 0 }}>
              <Mail size={28} color="#ff0033" strokeWidth={2} /> Mail
            </a>
            <Link href="/" className="footer-link" style={{ display: "flex", alignItems: "center", gap: "12px", fontSize: "16px", marginBottom: 0 }}>
              <Globe size={28} color="#ff0033" strokeWidth={2} /> Website
            </Link>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <span className="footer-bottom-copy">© {year} Secretly.</span>
        <span className="footer-bottom-right">secretly.vip</span>
      </div>
      <span className="footer-wordmark" aria-hidden="true">
        SECRETLY
      </span>
    </footer>
  );
}
