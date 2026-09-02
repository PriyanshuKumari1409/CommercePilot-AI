function Features() {
  const features = [
    {
      title: "Explainable AI",
      description: "Every recommendation comes with a clear explanation.",
      // emoji: "🤖",
    },
    {
      title: "Budget Protection",
      description: "AI never exceeds your budget without approval.",
      // emoji: "💰",
    },
    {
      title: "Human Approval",
      description: "Every payment requires explicit user confirmation.",
      // emoji: "🔐",
    },
    {
      title: "Audit Trail",
      description: "Every AI action is logged for complete transparency.",
      // emoji: "📜",
    },
  ];

  return (
    <section className="bg-white py-20 px-8">
      <h2 className="text-4xl font-bold text-center">
        Why CommercePilot AI?
      </h2>

      <div className="mt-12 grid gap-8 md:grid-cols-2">
        {features.map((feature, index) => (
          <div
            key={index}
            className="rounded-2xl border p-8 shadow-sm hover:shadow-lg transition"
          >
            <h3 className="text-2xl font-semibold">
              {feature.emoji} {feature.title}
            </h3>

            <p className="mt-4 text-gray-600">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Features;