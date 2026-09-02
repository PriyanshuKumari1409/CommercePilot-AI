
function SellerPanel({ seller }) {
  const hasOffer = Number(seller?.offerPrice) > 0;
  const isFallback = seller?.source === "fallback";

  return (
    <div>
      <h2 className="text-2xl font-bold text-purple-700 mb-6">
        AI Seller
      </h2>

      {/* Main Offer Badge */}
      <div className="flex justify-center mb-6">
        <span
          className={`px-4 py-2 rounded-full font-semibold shadow-sm ${
            hasOffer
              ? "bg-purple-100 text-purple-700"
              : "bg-gray-100 text-gray-500"
          }`}
        >
          {hasOffer
            ? "Best Negotiated Offer"
            : "Waiting for Negotiation"}
        </span>
      </div>

      {/* Source Indicator */}
      {hasOffer && (
        <div className="flex justify-center mb-6">
          <span
            className={`px-4 py-2 rounded-full font-semibold text-sm ${
              isFallback
                ? "bg-yellow-100 text-yellow-700"
                : "bg-green-100 text-green-700"
            }`}
          >
            {isFallback
              ? "⚡ Smart Pricing Engine"
              : "✨ Gemini AI Seller"}
          </span>
        </div>
      )}

      {/* Offer Price */}
      <div className="bg-purple-50 rounded-xl p-5 text-center shadow-sm mb-6">
        <p className="text-gray-500">
          Final Offer Price
        </p>

        <h2 className="text-4xl font-bold text-purple-700 mt-2">
          ₹{hasOffer ? seller.offerPrice : 0}
        </h2>
      </div>

      <div className="space-y-5">

        {/* Discount */}
        <div className="flex justify-between">
          <span className="text-gray-500">
            Discount
          </span>

          <span className="font-semibold text-green-600">
            ₹{hasOffer ? seller.discount : 0}
          </span>
        </div>

        {/* Delivery */}
        <div className="flex justify-between">
          <span className="text-gray-500">
            Delivery
          </span>

          <span className="font-semibold">
            {hasOffer ? seller.delivery : "-"}
          </span>
        </div>

        {/* Warranty */}
        <div className="flex justify-between">
          <span className="text-gray-500">
            Warranty
          </span>

          <span className="font-semibold">
            {hasOffer ? seller.warranty : "-"}
          </span>
        </div>

        {/* Cashback */}
        <div className="flex justify-between">
          <span className="text-gray-500">
            Cashback
          </span>

          <span className="font-semibold text-green-600">
            {hasOffer ? seller.cashback : "-"}
          </span>
        </div>

      </div>

      {/* Seller Summary */}
      <div className="border-t mt-6 pt-5">

        <p className="text-gray-500 mb-2 font-medium">
          AI Seller Summary
        </p>

        <p className="text-gray-700 leading-relaxed">
          {hasOffer
            ? seller.reason ||
              "A realistic offer was generated based on the product price and available discounts."
            : "The AI Seller will negotiate with available offers after you start the negotiation."}
        </p>

      </div>

      {/* Fallback Explanation */}
      {hasOffer && isFallback && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 mt-5">
          <p className="font-semibold text-yellow-700">
            ⚡ AI Service Fallback Active
          </p>

          <p className="text-gray-600 text-sm mt-2">
            Gemini was temporarily unavailable, so CommercePilot
            automatically used its Smart Pricing Engine to generate
            a realistic seller offer.
          </p>
        </div>
      )}
    </div>
  );
}

export default SellerPanel;