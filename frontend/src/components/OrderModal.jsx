function OrderModal({
  open,
  onClose,
  buyer,
  seller,
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">

      <div className="bg-white rounded-2xl shadow-2xl p-8 w-[500px]">

        <h2 className="text-3xl font-bold text-green-600 mb-6">
          ✅ Order Confirmed
        </h2>

        <div className="space-y-3">

          <div>
            <span className="font-semibold">Product:</span>
            <p>{buyer.product}</p>
          </div>

          <div>
            <span className="font-semibold">Final Price:</span>
            <p>₹{seller.offerPrice}</p>
          </div>

          <div>
            <span className="font-semibold">Delivery:</span>
            <p>{seller.delivery}</p>
          </div>

          <div>
            <span className="font-semibold">Warranty:</span>
            <p>{seller.warranty}</p>
          </div>

        </div>

        <button
          onClick={onClose}
          className="mt-8 w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700"
        >
          Close
        </button>

      </div>

    </div>
  );
}

export default OrderModal;