import { useLocation } from "wouter";

/**
 * 24-Hour Reset Page - Financial Survival Funnel
 * Design: Premium product, urgency, audio add-on
 * Purpose: Second paid product offer (₱199 + ₱99 audio)
 */
export default function TwentyFourHourReset() {
  const [, navigate] = useLocation();

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Hero Section */}
      <div className="bg-gray-900 py-12 md:py-16 px-4">
        <div className="max-w-2xl mx-auto">
          {/* Red Callout */}
          <div className="bg-red-500 text-white rounded-2xl p-6 md:p-8 shadow-2xl mb-12">
            <h1 className="text-2xl md:text-4xl font-bold leading-tight">
              WHAT IF YOU NEED RESULTS IN 24 HOURS?
            </h1>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="bg-gray-950 py-12 md:py-16 px-4">
        <div className="max-w-2xl mx-auto space-y-12">
          {/* Product Title */}
          <div className="text-center space-y-3">
            <p className="text-yellow-400 font-bold text-lg md:text-xl">
              Financial Reset: 24-Hour Survival to Stability Blueprint – ₱199
            </p>
          </div>

          {/* For People Who */}
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="text-white font-bold text-lg">For people who:</h3>
              <ul className="space-y-2 text-gray-100">
                <li className="flex items-start gap-3">
                  <span className="text-white font-bold">•</span>
                  <span>Are overdue in rent</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-white font-bold">•</span>
                  <span>Have GCash / lending app pressure</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-white font-bold">•</span>
                  <span>Need immediate reset</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-white font-bold">•</span>
                  <span>Feel panic rising</span>
                </li>
              </ul>
            </div>

            <div className="space-y-4">
              <h3 className="text-white font-bold text-lg">Inside:</h3>
              <ul className="space-y-2 text-gray-100">
                <li className="flex items-start gap-3">
                  <span className="text-white font-bold">•</span>
                  <span>24-Hour Reset Map</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-white font-bold">•</span>
                  <span>Emergency Negotiation Strategy</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-white font-bold">•</span>
                  <span>Fast Cash Activation Plan</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-white font-bold">•</span>
                  <span>Damage Control Checklist</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Price Section */}
          <div className="bg-gray-800 rounded-lg p-6 md:p-8 border border-gray-700 space-y-6">
            <div className="text-center">
              <p className="text-gray-300 text-lg mb-2">Price:</p>
              <p className="text-yellow-400 font-bold text-4xl md:text-5xl">
                ₱199.00
              </p>
            </div>

            {/* Add-On */}
            <div className="border-t border-gray-600 pt-6">
              <p className="text-gray-300 text-lg mb-3">Add-On:</p>
              <p className="text-cyan-400 font-bold text-xl mb-2">
                🎵 Audio Version – ₱99
              </p>
              <p className="text-gray-400 text-sm">
                (For night shift, tired VAs, busy breadwinners)
              </p>
            </div>
          </div>

          {/* CTA Section with Arrows */}
          <div className="space-y-4 pt-8">
            <p className="text-yellow-400 font-bold text-lg md:text-xl text-center">
              👉 UPGRADE TO 24-HOUR RESET
            </p>
            <div className="flex items-center justify-center gap-4 md:gap-8">
              <span className="text-orange-500 font-bold text-4xl">&gt;&gt;&gt;</span>
              <button
                onClick={() => navigate("/rebuild-mindset")}
                className="bg-yellow-400 hover:bg-yellow-300 text-black font-bold py-4 px-8 rounded-lg text-lg md:text-xl transition-all duration-300 transform hover:scale-110 shadow-lg pulse-glow"
              >
                Start
              </button>
              <span className="text-orange-500 font-bold text-4xl">&lt;&lt;&lt;</span>
            </div>
          </div>

          {/* Alternative CTA */}
          <div className="bg-gray-800 rounded-lg p-6 md:p-8 border border-gray-700 text-center space-y-4">
            <p className="text-gray-300 text-sm">Want long-term transformation?</p>
            <button
              onClick={() => navigate("/rebuild-mindset")}
              className="w-full bg-cyan-400 hover:bg-cyan-300 text-black font-bold py-3 px-6 rounded-lg transition-all duration-300"
            >
              Explore Rebuild Mindset (₱499)
            </button>
          </div>

          {/* Navigation */}
          <div className="flex justify-between items-center pt-8 border-t border-gray-700">
            <button
              onClick={() => navigate("/mini-crisis")}
              className="text-gray-400 hover:text-gray-200 text-sm underline transition-colors"
            >
              ← Back
            </button>
            <button
              onClick={() => navigate("/rebuild-mindset")}
              className="text-gray-400 hover:text-gray-200 text-sm underline transition-colors"
            >
              Next →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
