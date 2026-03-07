import { useLocation } from "wouter";

/**
 * Final Selection Page - Financial Survival Funnel
 * Design: Choice architecture, final CTA
 * Purpose: Let users choose their level and commit
 */
export default function FinalSelection() {
  const [, navigate] = useLocation();

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Hero Section */}
      <div className="bg-gray-900 py-12 md:py-16 px-4">
        <div className="max-w-2xl mx-auto">
          {/* Heading */}
          <h1 className="text-3xl md:text-4xl font-bold text-center text-red-400">
            CHOOSE YOUR LEVEL
          </h1>
        </div>
      </div>

      {/* Main Content */}
      <div className="bg-gray-950 py-12 md:py-16 px-4">
        <div className="max-w-4xl mx-auto space-y-12">
          {/* Three Options */}
          <div className="grid md:grid-cols-3 gap-6">
            {/* Option 1 - Survive */}
            <div className="bg-gray-800 rounded-lg p-6 border border-gray-700 space-y-4 hover:border-yellow-400 transition-colors">
              <p className="text-yellow-400 font-bold text-lg">Option 1 - SURVIVE</p>
              <div className="space-y-2">
                <p className="text-white font-bold">Mini Crisis Blueprint</p>
                <p className="text-cyan-400 font-bold text-2xl">₱149</p>
              </div>
              <button
                onClick={() => navigate("/mini-crisis")}
                className="w-full bg-yellow-400 hover:bg-yellow-300 text-black font-bold py-2 px-4 rounded transition-all duration-300"
              >
                Choose
              </button>
            </div>

            {/* Option 2 - Reset */}
            <div className="bg-gray-800 rounded-lg p-6 border-2 border-cyan-400 space-y-4 transform scale-105">
              <p className="text-cyan-400 font-bold text-lg">Option 2 - RESET</p>
              <div className="space-y-2">
                <p className="text-white font-bold">Financial Reset Blueprint</p>
                <p className="text-cyan-400 font-bold text-2xl">₱199</p>
                <p className="text-gray-400 text-sm">Audio ₱99</p>
              </div>
              <button
                onClick={() => navigate("/24-hour-reset")}
                className="w-full bg-cyan-400 hover:bg-cyan-300 text-black font-bold py-2 px-4 rounded transition-all duration-300"
              >
                Choose
              </button>
            </div>

            {/* Option 3 - Rebuild */}
            <div className="bg-gray-800 rounded-lg p-6 border border-gray-700 space-y-4 hover:border-yellow-400 transition-colors">
              <p className="text-yellow-400 font-bold text-lg">Option 3 - REBUILD</p>
              <div className="space-y-2">
                <p className="text-white font-bold">Driven To Bounce Back</p>
                <p className="text-cyan-400 font-bold text-2xl">₱499</p>
              </div>
              <button
                onClick={() => navigate("/rebuild-mindset")}
                className="w-full bg-yellow-400 hover:bg-yellow-300 text-black font-bold py-2 px-4 rounded transition-all duration-300"
              >
                Choose
              </button>
            </div>
          </div>

          {/* Bottom Close */}
          <div className="bg-gray-800 rounded-lg p-8 md:p-12 border border-gray-700 space-y-6 text-center">
            <p className="text-yellow-400 font-bold text-lg md:text-xl">
              You can keep scrolling.
            </p>
            <p className="text-white text-lg md:text-xl font-bold">
              Or you can stop surviving and start structuring your future.
            </p>
            <p className="text-gray-400 text-lg">
              This is not motivation.
            </p>
            <p className="text-gray-300 text-lg font-bold">
              This is a system.
            </p>
          </div>

          {/* Final CTA */}
          <div className="text-center space-y-4">
            <p className="text-yellow-400 font-bold text-xl md:text-2xl">
              🔥 GET ACCESS NOW
            </p>
            <button
              onClick={() => navigate("/mini-crisis")}
              className="bg-red-500 hover:bg-red-600 text-white font-bold py-4 px-8 rounded-lg text-lg md:text-xl transition-all duration-300 transform hover:scale-105 shadow-lg pulse-glow"
            >
              Start Your Journey
            </button>
          </div>

          {/* Navigation */}
          <div className="text-center pt-8 border-t border-gray-700">
            <button
              onClick={() => navigate("/rebuild-mindset")}
              className="text-gray-400 hover:text-gray-200 text-sm underline transition-colors"
            >
              Back to products
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
