function Footer() {
  return (
    <footer className="mt-12 border-t border-gray-200 bg-white/70 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row items-center justify-between">

        {/* Left */}
        <div>
          <h2 className="text-lg font-bold text-gray-800">
            CommercePilot AI
          </h2>

          <p className="text-sm text-gray-500 mt-1">
            Multi-Agent AI Shopping & Negotiation Platform
          </p>
        </div>

        {/* Center */}
        <div className="mt-4 md:mt-0 text-center">
          <p className="text-sm text-gray-600">
            Powered by
          </p>

          <div className="flex flex-wrap justify-center gap-2 mt-2">
            <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-semibold">
              Gemini AI
            </span>

            <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-semibold">
              SerpAPI
            </span>

            <span className="px-3 py-1 rounded-full bg-purple-100 text-purple-700 text-xs font-semibold">
              React
            </span>

            <span className="px-3 py-1 rounded-full bg-orange-100 text-orange-700 text-xs font-semibold">
              Node.js
            </span>

            <span className="px-3 py-1 rounded-full bg-pink-100 text-pink-700 text-xs font-semibold">
              Express
            </span>

            <span className="px-3 py-1 rounded-full bg-gray-200 text-gray-700 text-xs font-semibold">
              MongoDB
            </span>
          </div>
        </div>

        {/* Right */}
        <div className="mt-4 md:mt-0 text-right">
          <p className="text-sm font-semibold text-gray-700">
            Built for Hackathon 2026
          </p>

          <p className="text-xs text-gray-500 mt-1">
            Human-in-the-Loop AI Commerce
          </p>
        </div>

      </div>

      <p className="border-t border-gray-200 py-3 text-center text-xs text-gray-500">
  © {new Date().getFullYear()} CommercePilot AI • All Rights Reserved
</p>
    </footer>
  );
}

export default Footer;