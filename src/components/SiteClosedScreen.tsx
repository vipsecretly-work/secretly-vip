"use client";

import { useEffect } from "react";

export default function SiteClosedScreen() {
  useEffect(() => {
    const preventContextMenu = (event: MouseEvent) => {
      event.preventDefault();
    };

    const preventDragStart = (event: DragEvent) => {
      event.preventDefault();
    };

    const preventInspectShortcuts = (event: KeyboardEvent) => {
      const key = event.key.toUpperCase();
      const hasPrimaryModifier = event.ctrlKey || event.metaKey;
      const hasShiftCombo = hasPrimaryModifier && event.shiftKey && ["I", "J", "C"].includes(key);
      const hasSingleCombo = hasPrimaryModifier && ["U", "S"].includes(key);

      if (key === "F12" || hasShiftCombo || hasSingleCombo) {
        event.preventDefault();
        event.stopPropagation();
      }
    };

    document.addEventListener("contextmenu", preventContextMenu, { capture: true });
    document.addEventListener("dragstart", preventDragStart, { capture: true });
    document.addEventListener("keydown", preventInspectShortcuts, { capture: true });

    return () => {
      document.removeEventListener("contextmenu", preventContextMenu, { capture: true });
      document.removeEventListener("dragstart", preventDragStart, { capture: true });
      document.removeEventListener("keydown", preventInspectShortcuts, { capture: true });
    };
  }, []);

  return (
    <main className="site-closed-screen">
      <div className="site-closed-panel">
        <div className="site-closed-mark">
          <span className="site-closed-mark-dot" aria-hidden="true" />
          <span>Secretly</span>
        </div>

        <p className="site-closed-eyebrow">Temporary Notice</p>
        <h1 className="site-closed-title">SITE IS CLOSED TEMPORARILY</h1>
        <p className="site-closed-copy">
          Access to this site is currently blocked while we make internal changes.
        </p>
        <p className="site-closed-warning">NO INSPECT BYPASS. HARDCORE ACCESS BLOCKED.</p>

        <a className="site-closed-contact" href="mailto:support@secretly.vip">
          support@secretly.vip
        </a>
      </div>
    </main>
  );
}
