function BuyerPanel({ buyer }) {
  const hasProduct = buyer.product && buyer.product.trim() !== "";

  const image = hasProduct
    ? buyer.image || "https://placehold.co/400x300?text=Loading+Image"
    : "https://placehold.co/400x300?text=No+Product";

  return (
    <div>
      <h2 className="text-2xl font-bold text-blue-700 mb-6">
        AI Buyer
      </h2>

      {/* Product Image */}
      <div className="flex justify-center mb-6">
        <img
          src={image}
          alt={hasProduct ? buyer.product : "No Product"}
          className="w-56 h-56 object-contain rounded-xl border bg-white p-4 shadow-lg hover:scale-105 transition duration-300"
        />
      </div>

      {/* AI Badge */}
      <div className="flex justify-center mb-6">
        <span
          className={`px-4 py-2 rounded-full font-semibold shadow-sm ${
            hasProduct
              ? "bg-green-100 text-green-700"
              : "bg-gray-100 text-gray-500"
          }`}
        >
          {hasProduct ? "✓ AI Recommended" : "Waiting for Search"}
        </span>
      </div>

      <div className="space-y-6">

        {/* Product */}
        <div>
          <p className="text-gray-500">
            Selected Product
          </p>

          <h3 className="text-2xl font-bold mt-1">
            {hasProduct ? buyer.product : "-"}
          </h3>
        </div>

        {/* Price */}
        <div className="bg-blue-50 rounded-xl p-5 text-center shadow-sm">
          <p className="text-gray-500">
            Estimated Market Price
          </p>

          <h2 className="text-4xl font-bold text-blue-700 mt-2">
            ₹{hasProduct ? buyer.price : 0}
          </h2>
        </div>

        {/* Rating */}
        <div className="flex justify-between items-center">
          <span className="text-gray-500">
            ⭐ Rating
          </span>

          <span className="font-bold text-lg">
            {hasProduct ? `${buyer.rating} / 5` : "0 / 5"}
          </span>
        </div>

        {/* AI Reason */}
        <div className="border-t pt-5">
          <p className="text-gray-500 mb-2 font-medium">
            AI Recommendation
          </p>

          <p className="text-gray-700 leading-relaxed">
            {hasProduct
              ? buyer.reason
              : "Start a negotiation to let the AI Buyer analyze your requirements and recommend the best product."}
          </p>
        </div>

      </div>
    </div>
  );
}

export default BuyerPanel;