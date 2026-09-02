


function ApprovalCard({
  decision,
  userDecision = null,
  setUserDecision = () => {},
}) {
  const status = decision?.status?.toLowerCase() || "waiting";

  const negotiationCompleted =
    status !== "waiting";

  const negotiationFailed =
    status === "negotiation failed" ||
    status === "failed";

  const handleApprove = () => {
    setUserDecision("approved");
  };

  const handleReject = () => {
    setUserDecision("rejected");
  };

  const handleNewNegotiation = () => {
    window.location.reload();
  };

  return (
    <div>
      <h2 className="text-3xl font-bold mb-6">
        Human Approval
      </h2>

      <div className="text-center">

        {/* =========================
            WAITING
        ========================== */}
        {!negotiationCompleted && (
          <>
            <div className="w-24 h-24 rounded-full bg-gray-100 mx-auto flex items-center justify-center text-5xl">
              ⏳
            </div>

            <h3 className="text-2xl font-bold mt-5">
              Waiting for Negotiation
            </h3>

            <p className="text-gray-600 mt-3 leading-relaxed">
              Start a negotiation to generate an AI recommendation.
            </p>

            <button
              disabled
              className="mt-6 w-full py-3 rounded-xl bg-gray-400 text-white font-semibold cursor-not-allowed"
            >
              Waiting...
            </button>
          </>
        )}

        {/* =========================
            NEGOTIATION FAILED
        ========================== */}
        {negotiationFailed && (
          <>
            <div className="w-24 h-24 rounded-full bg-red-100 mx-auto flex items-center justify-center text-5xl">
              ❌
            </div>

            <h3 className="text-2xl font-bold text-red-700 mt-5">
              Negotiation Failed
            </h3>

            <p className="text-gray-600 mt-3 leading-relaxed">
              The AI agents could not reach an acceptable deal
              within your budget.
            </p>

            <div className="mt-6 bg-red-50 border border-red-200 rounded-xl p-4 text-left">
              <h4 className="font-bold text-red-700 text-lg">
                No Purchase Recommendation
              </h4>

              <p className="text-gray-700 mt-2">
                The negotiated offer exceeds the maximum budget
                provided by the buyer.
              </p>

              <div className="mt-3 border-t border-red-200 pt-3">
                <p className="text-sm">
                  <span className="font-semibold">
                    Decision:
                  </span>{" "}
                  <span className="text-red-700 font-semibold">
                    Purchase Not Recommended
                  </span>
                </p>

                <p className="text-sm mt-2">
                  <span className="font-semibold">
                    Next Step:
                  </span>{" "}
                  Increase your budget or modify your requirements.
                </p>
              </div>
            </div>

            {/* No Approve / Reject buttons here */}

            <button
              onClick={handleNewNegotiation}
              className="mt-6 w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold transition-all duration-300 hover:scale-105"
            >
              Start New Negotiation
            </button>
          </>
        )}

        {/* =========================
            AI RECOMMENDATION
        ========================== */}
        {negotiationCompleted &&
          !negotiationFailed &&
          userDecision === null && (
            <>
              <div className="w-24 h-24 rounded-full bg-yellow-100 mx-auto flex items-center justify-center text-5xl">
                
              </div>

              <h3 className="text-2xl font-bold mt-5">
                AI Recommendation Ready
              </h3>

              <p className="text-gray-600 mt-3 leading-relaxed">
                The AI Buyer and AI Seller have completed the
                negotiation. Please review the recommended deal
                before making the final decision.
              </p>

              <div className="grid grid-cols-2 gap-4 mt-8">

                <button
                  onClick={handleApprove}
                  className="py-3 rounded-xl bg-green-600 hover:bg-green-700 text-white font-semibold transition-all duration-300 hover:scale-105"
                >
                  ✅ Approve
                </button>

                <button
                  onClick={handleReject}
                  className="py-3 rounded-xl bg-red-600 hover:bg-red-700 text-white font-semibold transition-all duration-300 hover:scale-105"
                >
                  ❌ Reject
                </button>

              </div>
            </>
          )}

        {/* =========================
            APPROVED
        ========================== */}
        {userDecision === "approved" && (
          <>
            <div className="w-24 h-24 rounded-full bg-green-100 mx-auto flex items-center justify-center text-5xl">
              ✅
            </div>

            <h3 className="text-2xl font-bold text-green-700 mt-5">
              Purchase Approved
            </h3>

            <p className="text-gray-600 mt-3 leading-relaxed">
              You approved the AI recommendation.
            </p>

            <div className="mt-5 bg-green-50 border border-green-200 rounded-xl p-4 text-left">
              <h4 className="font-bold text-green-700 text-lg">
                🎉 Order Confirmed
              </h4>

              <p className="text-gray-700 mt-2">
                Thank you for shopping with{" "}
                <b>CommercePilot AI</b>.
              </p>

              <p className="text-sm text-gray-600 mt-2">
                Your order has been successfully confirmed and
                will be processed shortly.
              </p>

              <div className="mt-3 border-t border-green-200 pt-3">
                <p className="text-sm">
                  <span className="font-semibold">
                    Status:
                  </span>{" "}
                  <span className="text-green-700 font-semibold">
                    Order Accepted ✓
                  </span>
                </p>

                <p className="text-sm mt-1">
                  <span className="font-semibold">
                    Next Step:
                  </span>{" "}
                  Payment and shipment processing.
                </p>
              </div>
            </div>

            <button
              disabled
              className="mt-6 w-full py-3 rounded-xl bg-green-600 text-white font-semibold opacity-90 cursor-not-allowed"
            >
              Approved ✓
            </button>
          </>
        )}

        {/* =========================
            REJECTED
        ========================== */}
        {userDecision === "rejected" && (
          <>
            <div className="w-24 h-24 rounded-full bg-red-100 mx-auto flex items-center justify-center text-5xl">
              ❌
            </div>

            <h3 className="text-2xl font-bold text-red-700 mt-5">
              Deal Rejected
            </h3>

            <p className="text-gray-600 mt-3 leading-relaxed">
              You rejected this AI recommendation.
              You can modify your requirements and start a new
              negotiation.
            </p>

            <button
              disabled
              className="mt-6 w-full py-3 rounded-xl bg-red-600 text-white font-semibold opacity-90 cursor-not-allowed"
            >
              Rejected
            </button>

            <button
              onClick={handleNewNegotiation}
              className="mt-4 w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold transition-all duration-300 hover:scale-105"
            >
              Start New Negotiation
            </button>
          </>
        )}

      </div>
    </div>
  );
}

export default ApprovalCard;