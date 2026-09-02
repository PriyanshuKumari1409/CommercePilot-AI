function DecisionCard({ decision }) {
  const status = decision?.status?.toLowerCase() || "";

  const hasDecision = status && status !== "waiting";

  const isFailed =
    status === "negotiation failed" ||
    status === "failed";

  const isSuccessful =
    hasDecision && !isFailed;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">
        AI Decision
      </h2>

      {/* Status Badge */}
      <div className="flex justify-center mb-6">
        <span
          className={`px-5 py-2 rounded-full font-bold ${
            isFailed
              ? "bg-red-100 text-red-700"
              : isSuccessful
              ? "bg-green-100 text-green-700"
              : "bg-gray-100 text-gray-500"
          }`}
        >
          {isFailed
            ? "Negotiation Failed"
            : isSuccessful
            ? decision.status
            : "Waiting"}
        </span>
      </div>

      <div className="space-y-5">

        {/* Status */}
        <div className="flex justify-between">
          <span>Status</span>

          <b
            className={
              isFailed
                ? "text-red-600"
                : ""
            }
          >
            {hasDecision
              ? decision.status
              : "-"}
          </b>
        </div>

        {/* Confidence */}
        <div className="flex justify-between">
          <span>Confidence</span>

          <b>
            {isFailed
              ? "0%"
              : hasDecision
              ? `${decision.confidence || 0}%`
              : "0%"}
          </b>
        </div>

      </div>

      {/* Explanation */}
      <div className="border-t mt-6 pt-5">

        {isFailed ? (
          <div className="bg-red-50 border border-red-200 rounded-xl p-4">

            <p className="font-semibold text-red-700">
              ❌ Purchase Not Recommended
            </p>

            <p className="text-gray-600 mt-2">
              The AI agents could not reach an acceptable
              deal within your maximum budget.
            </p>

            <p className="text-sm text-gray-500 mt-2">
              Consider increasing your budget or modifying
              your product requirements.
            </p>

          </div>
        ) : isSuccessful ? (
          <div className="bg-green-50 border border-green-200 rounded-xl p-4">

            <p className="font-semibold text-green-700">
              ✅ AI Recommendation
            </p>

            <p className="text-gray-600 mt-2">
              The AI agents recommend proceeding with this
              purchase based on product quality, price,
              and negotiation results.
            </p>

          </div>
        ) : (
          <p className="text-gray-600">
            Run a negotiation to receive an AI recommendation.
          </p>
        )}

      </div>
    </div>
  );
}

export default DecisionCard;