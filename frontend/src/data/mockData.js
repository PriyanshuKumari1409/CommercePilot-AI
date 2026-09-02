export const mockShoppingResult = {
  buyer: {
    selectedProduct: "Lenovo LOQ 15",
    price: "₹68,990",
    rating: "4.5 ⭐",
    reason:
      "Best performance within your ₹70,000 budget. RTX 4050 GPU, Intel i5 13th Gen processor, and excellent value for students."
  },

  seller: {
    offerPrice: "₹67,490",
    discount: "₹1,500",
    delivery: "Tomorrow",
    bundle: "Wireless Mouse + Laptop Bag",
    reason:
      "Applied student discount and included accessories to improve overall value."
  },

  decision: {
    status: "Recommended",
    confidence: "96%"
  },

  budget: {
    budget: "₹70,000",
    finalPrice: "₹67,490",
    savings: "₹2,510"
  },

  approval: {
    status: "Waiting for User Approval",
    paymentRequired: true
  },

  audit: [
    "User requested a gaming laptop under ₹70,000.",
    "AI Buyer compared multiple laptops.",
    "AI Seller applied a student discount.",
    "Final recommendation generated.",
    "Waiting for user approval."
  ]
};