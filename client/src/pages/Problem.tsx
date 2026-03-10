import { useLocation } from "wouter";

/**
 * Problem Page - Financial Survival Funnel
 * Design: Dark theme, problem validation, emotional resonance
 * Purpose: Validate pain points and build urgency for solution
 */
export default function Problem() {
  const [, navigate] = useLocation();

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Hero Section with Background */}
      <div
        className="relative py-16 md:py-20 px-4"
        style={{
          backgroundImage: 'url(https://d2xsxph8kpxj0f.cloudfront.net/310519663178774865/7wTJyHXEYJUZwAQXqkbzVh/problem-section-AQ3XJZeJ7dUY2TaSpcWs77.webp)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-black/70"></div>
        <div className="relative z-10 max-w-2xl mx-auto">
          {/* Red Callout */}
          <div className="bg-red-500 text-white rounded-2xl p-6 md:p-8 shadow-2xl mb-12">
            <h1 className="text-2xl md:text-4xl font-bold leading-tight" style={{textAlign: 'center'}}>
              THIS IS NOT ABOUT BEING LAZY.
            </h1>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="bg-gray-950 py-12 md:py-16 px-4">
        <div className="max-w-2xl mx-auto space-y-12">
          {/* Problem List */}
          <div className="space-y-6">
            <p className="text-white text-lg md:text-xl leading-relaxed">
              You're <span className="text-yellow-400 font-bold">tired</span>.<br />
              You're <span className="text-yellow-400 font-bold">overworked</span>.<br />
              You <span className="text-yellow-400 font-bold">sent</span> money home.<br />
              You <span className="text-yellow-400 font-bold">paid bills</span> first before yourself.<br />
              You <span className="text-yellow-400 font-bold">tried</span> side hustles.<br />
              You <span className="text-yellow-400 font-bold">watched</span> YouTube about "financial freedom."
            </p>
          </div>

          {/* But Section */}
          <div className="space-y-4">
            <p className="text-white text-lg md:text-xl font-bold">But...</p>
            <div className="bg-gray-800 rounded-lg p-6 md:p-8 border border-gray-700 space-y-4">
              <p className="text-white text-lg">
                You don't have a <span className="text-red-400 font-bold">survival system</span>.
              </p>
              <ul className="space-y-3 text-gray-100">
                <li className="flex items-start gap-3">
                  <span className="text-red-400 font-bold text-lg">•</span>
                  <span>One hospital bill.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-400 font-bold text-lg">•</span>
                  <span>One job loss.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-400 font-bold text-lg">•</span>
                  <span>One business slowdown.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-400 font-bold text-lg">•</span>
                  <span>And everything <span className="text-red-500 font-bold">collapses</span>. ⚠️</span>
                </li>
              </ul>
            </div>
          </div>

          {/* CTA Section */}
          <div className="space-y-4 pt-8">
            <p className="text-yellow-400 font-bold text-lg md:text-xl text-center">
              👉 SHOW ME THE SURVIVAL FORMULA
            </p>
            <button
              onClick={() => navigate("/free-offer")}
              className="w-full bg-yellow-400 hover:bg-yellow-300 text-black font-bold py-4 px-8 rounded-lg text-lg md:text-xl transition-all duration-300 transform hover:scale-105 shadow-lg pulse-glow"
            >
              Start
            </button>
          </div>

          {/* Secondary CTA */}
          <div className="text-center pt-4">
            <button
              onClick={() => navigate("/")}
              className="text-gray-400 hover:text-gray-200 text-sm underline transition-colors"
            >
              ← Back to start
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
