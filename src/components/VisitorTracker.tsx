"use client";

import { useEffect } from "react";
import { captureUtm } from "@/lib/utm";
import { notifyVisit } from "@/lib/notify";

export function VisitorTracker() {
  useEffect(() => {
    captureUtm();
    // Small delay so the page fully loads before sending
    const t = setTimeout(notifyVisit, 1500);
    return () => clearTimeout(t);
  }, []);

  return null;
}
