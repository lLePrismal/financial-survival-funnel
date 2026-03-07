import { useLocation } from "wouter";

/**
 * Landing Page - Financial Survival Funnel
 * Design: Dark theme with red callout, yellow CTA, urgent messaging
 * Purpose: Capture attention and drive to problem page
 */
export default function Landing() {
  const [, navigate] = useLocation();

  return (
    <div className="min-h-screen bg-gray-950 text-white overflow-hidden">
      {/* Hero Section with Background Image */}
      <div
        className="relative min-h-screen flex flex-col items-center justify-center px-4 py-12"
        style={{
          backgroundImage: 'url(https://d2xsxph8kpxj0f.cloudfront.net/310519663178774865/7wTJyHXEYJUZwAQXqkbzVh/hero-landing-7HsBXpDY5obaTCVbyJ6HnR.webp)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/60"></div>

        {/* Content */}
        <div className="relative z-10 max-w-2xl mx-auto text-center space-y-8 slide-in-up">
          {/* Red Callout Headline */}
          <div className="bg-red-500 text-white rounded-2xl p-6 md:p-8 shadow-2xl transform hover:scale-105 transition-transform duration-300">
            <h1 className="text-2xl md:text-4xl font-bold leading-tight">
              IF YOUR INCOME STOPS TODAY... HOW LONG CAN YOU HOLD ON?
            </h1>
          </div>

          {/* Subheading with Emphasis */}
          <div className="space-y-4">
            <p className="text-lg md:text-xl text-gray-100 font-inter leading-relaxed">
              For every{" "}
              <span className="text-yellow-400 font-bold">call center agent</span>,{" "}
              <span className="text-yellow-400 font-bold">OFW</span>,{" "}
              <span className="text-yellow-400 font-bold">breadwinner</span>,{" "}
              <span className="text-yellow-400 font-bold">VAs</span>,{" "}
              <span className="text-yellow-400 font-bold">side hustler</span>, and{" "}
              <span className="text-yellow-400 font-bold">small business owner</span>
            </p>
            <p className="text-lg md:text-xl text-gray-200 font-inter">
              .........who's one bad day away from panic.
            </p>
          </div>

          {/* CTA Section */}
          <div className="space-y-4 pt-4">
            <p className="text-yellow-400 font-bold text-lg md:text-xl">
              👉 GET THE FREE SURVIVAL PAGE
            </p>
            <button
              onClick={() => navigate("/problem")}
              className="bg-yellow-400 hover:bg-yellow-300 text-black font-bold py-4 px-8 rounded-lg text-lg md:text-xl transition-all duration-300 transform hover:scale-110 shadow-lg pulse-glow"
            >
              Start
            </button>
          </div>

          {/* Scroll Indicator */}
          <div className="pt-8 animate-bounce">
            <p className="text-gray-300 text-sm">↓ Scroll to continue</p>
          </div>
        </div>
      </div>

      {/* Trust Indicators Section */}
      <div className="bg-gray-900 py-12 px-4">
        <div className="max-w-2xl mx-auto text-center space-y-4">
          <p className="text-gray-300 text-sm md:text-base">
            ✓ Trusted by thousands of Filipinos
          </p>
          <p className="text-gray-400 text-xs md:text-sm">
            This is not a get-rich-quick scheme. This is a survival system.
          </p>
        </div>
      </div>
    </div>
  );
}
