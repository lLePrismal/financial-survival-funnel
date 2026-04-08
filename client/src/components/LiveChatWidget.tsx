import { useEffect } from "react";

/**
 * Live Chat Widget Component
 * Integrates Drift live chat for real-time customer support
 * Drift is a popular, easy-to-integrate live chat solution
 */
export function LiveChatWidget() {
  useEffect(() => {
    // Initialize Drift chat widget
    // Replace YOUR_DRIFT_ID with actual Drift account ID from https://app.drift.com
    const driftId = "YOUR_DRIFT_ID";
    
    if (!driftId || driftId === "YOUR_DRIFT_ID") {
      console.warn("[LiveChat] Drift ID not configured. Chat widget disabled.");
      return;
    }

    // Load Drift script
    const script = document.createElement("script");
    script.src = "https://js.driftt.com/include/YOUR_DRIFT_ID/platform.js";
    script.async = true;
    
    // Initialize Drift when script loads
    script.onload = () => {
      if (window.drift) {
        window.drift.on("ready", function (api) {
          // Set up chat attributes for better targeting
          api.setAttributes({
            page: window.location.pathname,
            timestamp: new Date().toISOString(),
          });
        });
      }
    };

    document.head.appendChild(script);

    return () => {
      // Cleanup: remove script on unmount
      const existingScript = document.querySelector(
        `script[src="https://js.driftt.com/include/${driftId}/platform.js"]`
      );
      if (existingScript) {
        existingScript.remove();
      }
    };
  }, []);

  return null; // Drift renders its own UI
}

// Extend window interface for TypeScript
declare global {
  interface Window {
    drift?: {
      on: (event: string, callback: (api: any) => void) => void;
      setAttributes: (attributes: Record<string, any>) => void;
      api?: {
        openChat: () => void;
        closeChat: () => void;
      };
    };
  }
}
