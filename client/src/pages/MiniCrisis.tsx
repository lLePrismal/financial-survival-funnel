import { useLocation } from "wouter";
import { StripeCheckoutButton } from "@/components/StripeCheckoutButton";
import { CountdownTimer } from "@/components/CountdownTimer";

/**
 * Mini Crisis Blueprint Page - Financial Survival Funnel
 * Design: Product showcase, value stacking, urgency
 * Purpose: First paid product offer (₱149)
 */
export default function MiniCrisis() {
  const [, navigate] = useLocation();

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Hero Section */}
      <div className="bg-gray-900 py-12 md:py-16 px-4">
        <div className="max-w-2xl mx-auto">
          {/* Red Callout */}
          <div className="bg-red-500 text-white rounded-2xl p-6 md:p-8 shadow-2xl mb-12">
            <h1 className="text-2xl md:text-4xl font-bold leading-tight" style={{textAlign: 'center'}}>
              STOP BLEEDING MONEY.<br />
              BUILD 30-DAY SURVIVAL CASH.
            </h1>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="bg-gray-950 py-12 md:py-16 px-4">
        <div className="max-w-2xl mx-auto space-y-12">
          {/* Countdown Timer */}
          <CountdownTimer durationHours={24} title="OFFER EXPIRES IN" />

          {/* What You Get */}
          <div className="bg-gray-800 rounded-lg p-6 md:p-8 border border-gray-700 space-y-4">
            <h2 className="text-white text-2xl font-bold">What You Get:</h2>
            <ul className="space-y-3 text-gray-100">
              <li className="flex items-start gap-3">
                <span className="text-white font-bold">•</span>
                <span>Complete Crisis Budget <span className="text-yellow-400 font-bold">Template</span></span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-white font-bold">•</span>
                <span>Debt Prioritization <span className="text-yellow-400 font-bold">Matrix</span></span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-white font-bold">•</span>
                <span>"What To Say" <span className="text-yellow-400 font-bold">Scripts to Lenders</span></span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-white font-bold">•</span>
                <span>Emotional Control <span className="text-yellow-400 font-bold">Framework</span></span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-white font-bold">•</span>
                <span>30-Day <span className="text-yellow-400 font-bold">Stabilization Plan</span></span>
              </li>
            </ul>
          </div>

          {/* Stat Section */}
          <div className="bg-gray-800 rounded-lg p-6 md:p-8 border border-gray-700 text-center space-y-3">
            <p className="text-yellow-400 font-bold text-lg md:text-xl">
              Most people lose more than ₱149 on food delivery.
            </p>
          </div>

          {/* Price Section */}
          <div className="text-center space-y-4">
            <p className="text-gray-300 text-lg">Price:</p>
            <p className="text-yellow-400 font-bold text-4xl md:text-5xl">
              ₱149.00
            </p>
            <p className="text-gray-400 text-sm">Only (Month-End Price)</p>
          </div>

          {/* CTA Section with Arrows */}
          <div className="space-y-4 pt-8">
            <p className="text-cyan-400 font-bold text-lg md:text-xl text-center">
              👉 GET INSTANT ACCESS – ₱149
            </p>
            <div className="flex items-center justify-center">
              <StripeCheckoutButton
                productId="mini_crisis_blueprint"
                productName="Mini Crisis Blueprint"
                productPrice={14900}
                className="bg-yellow-400 hover:bg-yellow-300 text-black font-bold py-4 px-8 rounded-lg text-lg md:text-xl transition-all duration-300 transform hover:scale-110 shadow-lg pulse-glow"
              />
            </div>
          </div>

          {/* Upgrade Option */}
          <div className="bg-gray-800 rounded-lg p-6 md:p-8 border border-gray-700 text-center space-y-4">
            <p className="text-gray-300 text-sm">Want faster results?</p>
            <button
              onClick={() => navigate("/24-hour-reset")}
              className="w-full bg-cyan-400 hover:bg-cyan-300 text-black font-bold py-3 px-6 rounded-lg transition-all duration-300"
            >
              View 24-Hour Reset (₱199)
            </button>
          </div>

          {/* Navigation */}
          <div className="flex justify-between items-center pt-8 border-t border-gray-700">
            <button
              onClick={() => navigate("/free-offer")}
              className="text-gray-400 hover:text-gray-200 text-sm underline transition-colors"
            >
              ← Back
            </button>
            <button
              onClick={() => navigate("/24-hour-reset")}
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
