function Hero() {
  return (
    <section className="min-h-screen bg-slate-50 flex flex-col justify-center items-center px-6">

      <h1 className="text-center text-5xl md:text-7xl font-extrabold text-blue-600">
        CommercePilot AI
      </h1>

      <h2 className="mt-6 text-center text-2xl font-semibold text-gray-800">
        The Explainable AI Commerce Agent
      </h2>

      <p className="mt-5 max-w-3xl text-center text-lg text-gray-600">
        AI Buyers and AI Sellers collaborate to complete secure,
        explainable, and human-approved transactions.
      </p>

      <button className="mt-10 rounded-xl bg-blue-600 px-8 py-4 text-lg font-semibold text-white transition hover:bg-blue-700">
        Start Shopping
      </button>

    </section>
  );
}

export default Hero;