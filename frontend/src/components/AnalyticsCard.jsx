function AnalyticsCard({
  buyer,
  seller,
  decision,
  timeline,
  userDecision,
}) {
  const status = decision?.status?.toLowerCase() || "";

  const isFailed =
    status === "negotiation failed" ||
    status === "failed";

  const isRejected = userDecision === "rejected";

  const isApproved = userDecision === "approved";

  const hasData =
    buyer?.product &&
    Number(buyer?.price) > 0 &&
    Number(seller?.offerPrice) > 0;

  const original = hasData ? Number(buyer.price) : 0;

  const finalPrice = hasData
    ? Number(seller.offerPrice)
    : 0;

  const saved = hasData
    ? Math.max(0, original - finalPrice)
    : 0;

  const discount =
    hasData && original > 0
      ? ((saved / original) * 100).toFixed(1)
      : "0";

  const isSuccessful =
    hasData &&
    !isFailed &&
    !isRejected &&
    finalPrice <= original;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">
        Negotiation Analytics
      </h2>

      <div className="space-y-4">

        {/* Original Price */}
        <div className="flex justify-between">
          <span>Original Price</span>
          <b>₹{original}</b>
        </div>

        {/* Final Price */}
        <div className="flex justify-between">
          <span>Final Price</span>
          <b>₹{finalPrice}</b>
        </div>

        {/* Money Saved */}
        <div className="flex justify-between">
          <span>Money Saved</span>

          <b
            className={
              isFailed || isRejected
                ? "text-gray-500"
                : "text-green-600"
            }
          >
            ₹{isFailed || isRejected ? 0 : saved}
          </b>
        </div>

        {/* Discount */}
        <div className="flex justify-between">
          <span>Discount</span>

          <b>
            {isFailed || isRejected
              ? "0%"
              : `${discount}%`}
          </b>
        </div>

        {/* Confidence */}
        <div className="flex justify-between">
          <span>Confidence</span>

          <b>
            {isFailed || isRejected
              ? "0%"
              : hasData
              ? `${decision?.confidence || 0}%`
              : "0%"}
          </b>
        </div>

        {/* Negotiation Rounds */}
        <div className="flex justify-between">
          <span>Negotiation Rounds</span>

          <b>
            {hasData ? timeline.length : 0}
          </b>
        </div>

        {/* AI Recommendation */}
        <div className="flex justify-between gap-4">
          <span>AI Recommendation</span>

          <span className="font-semibold text-right">
            {isFailed || isRejected
              ? "Purchase Not Recommended"
              : hasData
              ? buyer.product
              : "-"}
          </span>
        </div>

       {/* Seller Discount */}
<div className="flex justify-between">
  <span>Seller Discount</span>

  <span
    className={
      seller?.discount > 0
        ? "text-green-600 font-semibold"
        : "text-gray-500 font-semibold"
    }
  >
    ₹{Number(seller?.discount) || 0}
  </span>
</div>

      </div>

      {/* Status Message */}
      <div className="border-t mt-6 pt-5">

        {/* NEGOTIATION FAILED */}
        {isFailed && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-4">

            <p className="font-semibold text-red-700">
              ❌ Negotiation Failed
            </p>

            <p className="text-gray-600 mt-2">
              The AI agents could not reach an acceptable
              deal within the buyer's budget.
            </p>

            <p className="text-sm text-gray-500 mt-2">
              The seller's best available offer was above
              the buyer's maximum budget.
            </p>

          </div>
        )}

        {/* HUMAN REJECTED */}
        {isRejected && !isFailed && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-4">

            <p className="font-semibold text-red-700">
              ❌ Deal Rejected by Human
            </p>

            <p className="text-gray-600 mt-2">
              The AI agents successfully negotiated an offer,
              but the human reviewer rejected the recommendation.
            </p>

            <p className="text-sm text-gray-500 mt-2">
              No purchase will be made. You can start a new
              negotiation with different requirements.
            </p>

          </div>
        )}

        {/* HUMAN APPROVED */}
        {isApproved && !isFailed && (
          <div className="bg-green-50 border border-green-200 rounded-xl p-4">

            <p className="font-semibold text-green-700">
              ✅ Purchase Approved
            </p>

            <p className="text-gray-600 mt-2">
              The human reviewer approved the AI recommendation
              and the purchase can proceed.
            </p>

          </div>
        )}

        {/* NEGOTIATION SUCCESSFUL - BEFORE HUMAN DECISION */}
        {!isFailed &&
          !isRejected &&
          !isApproved &&
          isSuccessful && (
            <div className="bg-green-50 border border-green-200 rounded-xl p-4">

              <p className="font-semibold text-green-700">
                ✅ Negotiation Successful
              </p>

              <p className="text-gray-600 mt-2">
                The AI Buyer and AI Seller successfully
                negotiated the best available deal.
              </p>

              <p className="text-sm text-gray-500 mt-2">
                Waiting for human approval before proceeding.
              </p>

            </div>
          )}

        {/* WAITING */}
        {!isFailed &&
          !isRejected &&
          !isApproved &&
          !isSuccessful && (
            <p className="text-gray-600">
              Analytics will appear after the negotiation
              is completed.
            </p>
          )}

      </div>
    </div>
  );
}

export default AnalyticsCard;