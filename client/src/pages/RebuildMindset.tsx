import { useLocation } from "wouter";
import { StripeCheckoutButton } from "@/components/StripeCheckoutButton";

/**
 * Rebuild Mindset Page - Financial Survival Funnel
 * Design: Premium product, long-term transformation
 * Purpose: Third paid product offer (₱499) - highest tier
 */
export default function RebuildMindset() {
  const [, navigate] = useLocation();

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Hero Section */}
      <div className="bg-gray-900 py-12 md:py-16 px-4">
        <div className="max-w-2xl mx-auto">
          {/* Red Callout */}
          <div className="bg-red-500 text-white rounded-2xl p-6 md:p-8 shadow-2xl mb-12">
            <h1 className="text-2xl md:text-4xl font-bold leading-tight">
              SURVIVAL IS TEMPORARY.<br />
              REBUILD IS PERMANENT.
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
              📕 Driven To Bounce Back: The Rebuild Mindset – ₱499
            </p>
          </div>

          {/* What This Is */}
          <div className="space-y-4">
            <p className="text-gray-300 text-lg">This is not budgeting tips. This is:</p>
            <ul className="space-y-3 text-gray-100">
              <li className="flex items-start gap-3">
                <span className="text-white font-bold">•</span>
                <span><span className="text-yellow-400 font-bold">Identity Reset</span></span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-white font-bold">•</span>
                <span><span className="text-yellow-400 font-bold">Skill Monetization Strategy</span></span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-white font-bold">•</span>
                <span><span className="text-yellow-400 font-bold">Income Repositioning Framework</span></span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-white font-bold">•</span>
                <span><span className="text-yellow-400 font-bold">Discipline System</span></span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-white font-bold">•</span>
                <span><span className="text-yellow-400 font-bold">Long-Term Rebuild Plan</span></span>
              </li>
            </ul>
          </div>

          {/* For Who */}
          <div className="bg-gray-800 rounded-lg p-6 md:p-8 border border-gray-700 space-y-4">
            <h3 className="text-white font-bold text-lg">For:</h3>
            <ul className="space-y-2 text-gray-100">
              <li className="flex items-start gap-3">
                <span className="text-white font-bold">•</span>
                <span>Jack-of-all-trades</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-white font-bold">•</span>
                <span>Frustrated entrepreneurs</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-white font-bold">•</span>
                <span>Stagnant employees</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-white font-bold">•</span>
                <span>Tired but not quitting</span>
              </li>
            </ul>
          </div>

          {/* Price Section */}
          <div className="text-center space-y-3">
            <p className="text-gray-300 text-lg">Price:</p>
            <p className="text-yellow-400 font-bold text-4xl md:text-5xl">
              ₱499.00
            </p>
          </div>

          {/* CTA Section with Arrows */}
          <div className="space-y-4 pt-8">
            <p className="text-yellow-400 font-bold text-lg md:text-xl text-center">
              👉 REBUILD MY LIFE – ₱499
            </p>
            <div className="flex items-center justify-center">
              <StripeCheckoutButton
                productId="rebuild_mindset"
                productName="Rebuild Mindset"
                productPrice={49900}
                className="bg-yellow-400 hover:bg-yellow-300 text-black font-bold py-4 px-8 rounded-lg text-lg md:text-xl transition-all duration-300 transform hover:scale-110 shadow-lg pulse-glow"
              />
            </div>
          </div>

          {/* Value Proposition */}
          <div className="bg-gray-800 rounded-lg p-6 md:p-8 border border-gray-700 text-center space-y-3">
            <p className="text-gray-300 text-sm">
              This is the complete transformation package.
            </p>
            <p className="text-yellow-400 font-bold text-sm">
              Not just survival. Real rebuild.
            </p>
          </div>

          {/* Navigation */}
          <div className="flex justify-between items-center pt-8 border-t border-gray-700">
            <button
              onClick={() => navigate("/24-hour-reset")}
              className="text-gray-400 hover:text-gray-200 text-sm underline transition-colors"
            >
              ← Back
            </button>
            <button
              onClick={() => navigate("/final-selection")}
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
