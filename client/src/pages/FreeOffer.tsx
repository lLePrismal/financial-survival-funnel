import { useLocation } from "wouter";

/**
 * Free Offer Page - Financial Survival Funnel
 * Design: Lead magnet presentation, value stacking
 * Purpose: Capture email and deliver free 5-page guide
 */
export default function FreeOffer() {
  const [, navigate] = useLocation();

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Hero Section with Background */}
      <div
        className="relative py-16 md:py-20 px-4"
        style={{
          backgroundImage: 'url(https://d2xsxph8kpxj0f.cloudfront.net/310519663178774865/7wTJyHXEYJUZwAQXqkbzVh/solution-section-5csqTSXaQ7NREXxjqSEVCv.webp)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-black/70"></div>
        <div className="relative z-10 max-w-2xl mx-auto">
          {/* Red Callout */}
          <div className="bg-red-500 text-white rounded-2xl p-6 md:p-8 shadow-2xl mb-12">
            <h1 className="text-2xl md:text-4xl font-bold leading-tight" style={{textAlign: 'center'}}>
              FREE: 5-Pages Emergency Survival Formula
            </h1>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="bg-gray-950 py-12 md:py-16 px-4">
        <div className="max-w-2xl mx-auto space-y-12">
          {/* Inside This Page */}
          <div className="space-y-4">
            <h2 className="text-white text-2xl md:text-3xl font-bold">Inside this page:</h2>
            <ul className="space-y-3 text-gray-100">
              <li className="flex items-start gap-3">
                <span className="text-white font-bold text-lg">✓</span>
                <span className="text-lg">3-Level Crisis Budget</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-white font-bold text-lg">✓</span>
                <span className="text-lg">What to Cut in 24 Hours</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-white font-bold text-lg">✓</span>
                <span className="text-lg">What to Protect First</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-white font-bold text-lg">✓</span>
                <span className="text-lg">Survival Days Computation Formula</span>
              </li>
            </ul>
          </div>

          {/* Highlight Section */}
          <div className="bg-yellow-400 text-black rounded-lg p-6 md:p-8 text-center space-y-3">
            <p className="text-lg md:text-xl font-bold">
              These are 5 pages of the full 15-page<br />
              Mini Crisis Survival Blueprint (₱149)
            </p>
          </div>

          {/* CTA Section */}
          <div className="space-y-4 pt-8">
            <p className="text-cyan-400 font-bold text-lg md:text-xl text-center">
              👉 SEND ME THE FULL GUIDE
            </p>
            <button
              onClick={() => navigate("/mini-crisis")}
              className="w-full bg-yellow-400 hover:bg-yellow-300 text-black font-bold py-4 px-8 rounded-lg text-lg md:text-xl transition-all duration-300 transform hover:scale-105 shadow-lg pulse-glow"
            >
              Start
            </button>
          </div>

          {/* Navigation */}
          <div className="flex justify-between items-center pt-8 border-t border-gray-700">
            <button
              onClick={() => navigate("/problem")}
              className="text-gray-400 hover:text-gray-200 text-sm underline transition-colors"
            >
              ← Back
            </button>
            <button
              onClick={() => navigate("/mini-crisis")}
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
