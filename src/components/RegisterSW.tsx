import { useEffect } from "react";

/**
 * Registers the service worker in production only (avoids caching during Vite
 * HMR in development). Renders nothing.
 */
export function RegisterSW() {
  useEffect(() => {
    if (!import.meta.env.PROD) return;
    if (typeof navigator === "undefined" || !("serviceWorker" in navigator)) return;
    const onLoad = () => {
      navigator.serviceWorker.register("/sw.js").catch(() => {
        /* registration failed — app still works online */
      });
    };
    window.addEventListener("load", onLoad);
    return () => window.removeEventListener("load", onLoad);
  }, []);

  return null;
}
