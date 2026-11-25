"use client";

import { useEffect } from "react";

/**
 * react-colorful injects its styles on the client, so before hydration the
 * pickers render unstyled. Pickers stay transparent until this flag is set,
 * then fade in (see `.picker` in globals.css).
 */
export function HydrationFlag() {
  useEffect(() => {
    document.documentElement.dataset.hydrated = "";
  }, []);
  return null;
}
