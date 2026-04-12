"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { captureUtm } from "@/lib/utm";
import { notifyVisit } from "@/lib/notify";
import { initSessionTracker, trackPageChange } from "@/lib/session";

export function VisitorTracker() {
  const pathname = usePathname();

  // Init once on mount
  useEffect(() => {
    captureUtm();
    initSessionTracker();
    const t = setTimeout(notifyVisit, 1500);
    return () => clearTimeout(t);
  }, []);

  // Track SPA page changes
  useEffect(() => {
    trackPageChange();
  }, [pathname]);

  return null;
}
