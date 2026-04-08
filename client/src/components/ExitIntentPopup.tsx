import { useState, useEffect } from "react";
import { X } from "lucide-react";

/**
 * Exit-Intent Popup Component
 * Triggers when user tries to leave the page to offer a discount
 */
export function ExitIntentPopup() {
  const [isVisible, setIsVisible] = useState(false);
  const [hasShown, setHasShown] = useState(false);

  useEffect(() => {
    // Check if popup has already been shown in this session
    const popupShown = sessionStorage.getItem("exit-intent-shown");
    if (popupShown) {
      return;
    }

    const handleMouseLeave = (e: MouseEvent) => {
      // Only trigger if mouse is leaving from the top of the page
      if (e.clientY <= 0 && !hasShown) {
        setIsVisible(true);
        setHasShown(true);
        sessionStorage.setItem("exit-intent-shown", "true");
      }
    };

    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [hasShown]);

  if (!isVisible) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      {/* Popup Container */}
      <div className="bg-gray-900 border-2 border-red-500 rounded-2xl p-8 max-w-md w-full shadow-2xl animate-bounce">
        {/* Close Button */}
        <button
          onClick={() => setIsVisible(false)}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Content */}
        <div className="text-center">
          {/* Headline */}
          <h2 className="text-2xl font-bold text-white mb-4">
            WAIT! Don't leave yet 👋
          </h2>

          {/* Subheading */}
          <p className="text-gray-300 mb-6">
            Get <span className="text-yellow-400 font-bold">20% OFF</span> your first purchase
          </p>

          {/* Offer Details */}
          <div className="bg-gray-800 rounded-lg p-4 mb-6 border border-yellow-400">
            <p className="text-sm text-gray-300 mb-2">
              Use code at checkout:
            </p>
            <p className="text-xl font-bold text-yellow-400 font-mono">
              STAY20
            </p>
            <p className="text-xs text-gray-400 mt-2">
              Valid for 24 hours only
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="space-y-3">
            <button
              onClick={() => setIsVisible(false)}
              className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-4 rounded-lg transition"
            >
              Claim 20% Discount
            </button>
            <button
              onClick={() => setIsVisible(false)}
              className="w-full bg-gray-700 hover:bg-gray-600 text-white font-bold py-3 px-4 rounded-lg transition"
            >
              No Thanks, Leave
            </button>
          </div>

          {/* Trust Message */}
          <p className="text-xs text-gray-500 mt-4">
            30-day money-back guarantee • Instant access
          </p>
        </div>
      </div>
    </div>
  );
}
