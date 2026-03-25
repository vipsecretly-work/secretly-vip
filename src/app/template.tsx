"use client";

import { motion } from "framer-motion";
import { usePathname } from "next/navigation";

export default function Template({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <>
      <motion.div
        key={pathname + "-transition"}
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.8 }}
        style={{
          position: "fixed",
          inset: "16px",
          borderRadius: "40px",
          background: "var(--white)",
          zIndex: 9999,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          pointerEvents: "none",
        }}
      >
        <img
          src="/Image/Logo.png"
          alt="Loading transition"
          style={{
            width: 72,
            height: 72,
            objectFit: "contain",
            animation: "blinkLogo 1.2s ease-in-out infinite",
          }}
        />
      </motion.div>
      {children}
    </>
  );
}
