const buyerAgent = require("../services/buyerAgent");
const sellerAgent = require("../services/sellerAgent");
const negotiationAgent = require("../services/negotiationAgent");
const { getProductImage } = require("../services/imageSearchService");

const negotiate = async (req, res) => {
  try {
    const { goal, budget, category } = req.body;

    console.log("Buyer Agent Running...");
    console.log("Category received:", category);

    const buyer = await buyerAgent(goal, budget, category);

    // Fetch real product image
    console.log("Fetching Product Image...");
    buyer.image = await getProductImage(buyer.product);

    console.log("Product Image:", buyer.image);

    console.log("Seller Agent Running...");
    const seller = await sellerAgent(buyer, budget);

    

    // ---------------- Budget Check ----------------

if (Number(seller.offerPrice) > Number(budget)) {

  console.log("Negotiation Failed : Budget Too Low");

  return res.json({

    buyer,

    seller,

    decision: {
      status: "Negotiation Failed",
      confidence: 0,
      reason: `Lowest possible offer is ₹${seller.offerPrice}, which is above your budget of ₹${budget}.`,
    },

    timeline: [
      {
        agent: "Buyer Agent",
        message: `Found ${buyer.product} for ₹${buyer.price}.`,
      },
      {
        agent: "Seller Agent",
        message: `Lowest possible negotiated price is ₹${seller.offerPrice}.`,
      },
      {
        agent: "Negotiation Agent",
        message:
          "Negotiation failed because the buyer's budget is lower than the minimum negotiable price.",
      },
    ],

  });

}

// ---------------- Continue Normal Negotiation ----------------

console.log("Calling Negotiation Agent...");

const negotiation = await negotiationAgent(
  buyer,
  seller,
  budget
);

console.log("Negotiation Result:");
console.log(negotiation);

res.json({

  buyer,

  seller,

  decision: {
    status: "Recommended",
    confidence:
      buyer.rating >= 4.8
        ? 99
        : buyer.rating >= 4.6
        ? 97
        : buyer.rating >= 4.4
        ? 95
        : 92,
  },

  timeline: negotiation.timeline,

});
  } catch (err) {
    console.error("CONTROLLER ERROR:");
    console.error(err);

    res.status(500).json({
      error: "Negotiation failed",
      details: err.message,
    });
  }
};

module.exports = {
  negotiate,
};