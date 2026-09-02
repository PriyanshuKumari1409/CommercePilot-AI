function AuditTimeline({ timeline, userDecision }) {
  let updatedTimeline = [...timeline];

  // Add Human Approval/Rejection messages
  if (userDecision === "approved") {
    updatedTimeline = [
      ...updatedTimeline,
      {
        agent: "Human",
        message:
          "✅ I approve this recommendation and would like to proceed with the purchase.",
      },
      {
        agent: "Seller",
        message:
          "🎉 Thank you! Your order has been confirmed successfully. We appreciate your purchase and will begin processing your order shortly.",
      },
    ];
  }

  if (userDecision === "rejected") {
    updatedTimeline = [
      ...updatedTimeline,
      {
        agent: "Human",
        message: "❌ I have decided to reject this recommendation.",
      },
      {
        agent: "Seller",
        message:
          "We understand your decision. Thank you for considering our offer. Feel free to start a new negotiation anytime.",
      },
    ];
  }

  const hasTimeline = updatedTimeline.length > 0;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">
        Negotiation Timeline
      </h2>

      {!hasTimeline ? (
        <div className="text-center py-12 text-gray-500">
          <div className="text-5xl mb-4">💬</div>

          <h3 className="text-xl font-semibold">
            No Negotiation Yet
          </h3>

          <p className="mt-2">
            Start AI Negotiation to view the complete
            conversation between the Buyer Agent and
            Seller Agent.
          </p>
        </div>
      ) : (
        <div className="space-y-5">
          {updatedTimeline.map((item, index) => {
            let color =
              "bg-purple-50 border-l-4 border-purple-500";

            if (item.agent.toLowerCase().includes("buyer")) {
              color = "bg-blue-50 border-l-4 border-blue-500";
            } else if (item.agent.toLowerCase().includes("human")) {
              color = "bg-green-50 border-l-4 border-green-500";
            } else if (
              item.message.toLowerCase().includes("confirmed") ||
              item.message.toLowerCase().includes("thank you")
            ) {
              color = "bg-green-50 border-l-4 border-green-500";
            }

            return (
              <div
                key={index}
                className={`rounded-xl p-5 shadow-sm ${color}`}
              >
                <h3 className="font-bold mb-2">
                  {item.agent}
                </h3>

                <p className="text-gray-700">
                  {item.message}
                </p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default AuditTimeline;