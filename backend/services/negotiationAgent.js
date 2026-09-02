


require("dotenv").config();
const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

async function negotiationAgent(buyer, seller, budget) {
  console.log("=================================");
  console.log("Negotiation Agent Running...");

  const prompt = `
You are simulating a realistic negotiation between two AI agents.

Buyer AI:
- Wants the best value.
- Negotiates politely.
- Never accepts the first offer immediately.
- Can request cashback, faster delivery or warranty.
- MUST NOT ask for a lower final price than the seller offer.

Seller AI:
- Wants to maximize profit.
- The FINAL PRICE IS FIXED.
- Seller CANNOT reduce the price further.
- Seller may justify the offer or add benefits.
- Seller may offer cashback, faster delivery or warranty ONLY.
- The final message should politely wait for the customer's decision.
- NEVER confirm the order.
- NEVER say "Thank you for shopping".
- NEVER say "Order confirmed".

Product:
${buyer.product}

Original Price:
₹${buyer.price}

FINAL NEGOTIATED PRICE (DO NOT CHANGE):
₹${seller.offerPrice}

Discount:
₹${seller.discount}

Budget:
₹${budget}

Delivery:
${seller.delivery}

Warranty:
${seller.warranty}

IMPORTANT RULES:

1. NEVER change the final price.
2. NEVER mention another price.
3. Always use ₹${seller.offerPrice}.
4. Buyer negotiates for benefits only.
5. Seller may add cashback, warranty or delivery.
6. Generate EXACTLY 6 messages.
7. Alternate Buyer and Seller.
8. DO NOT confirm the purchase.
9. DO NOT thank the customer.
10. End with the seller asking the buyer to review the offer and wait for human approval.
11. Return ONLY valid JSON.

{
  "timeline":[
    {
      "agent":"Buyer",
      "message":"..."
    },
    {
      "agent":"Seller",
      "message":"..."
    },
    {
      "agent":"Buyer",
      "message":"..."
    },
    {
      "agent":"Seller",
      "message":"..."
    },
    {
      "agent":"Buyer",
      "message":"..."
    },
    {
      "agent":"Seller",
      "message":"..."
    }
  ]
}
`;

  try {
    console.log("Calling Gemini Negotiation Agent...");

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: prompt,
    });

    let text =
      typeof response.text === "function"
        ? response.text()
        : response.text;

    const clean = text
      .replace(/```json/gi, "")
      .replace(/```/g, "")
      .trim();

    const result = JSON.parse(clean);

    // Mark that Gemini generated the negotiation
    result.source = "gemini";
    result.fallback = false;

    console.log("===== GEMINI NEGOTIATION RESULT =====");
    console.log(result);

    return result;

  } catch (err) {

    console.error("===== NEGOTIATION AGENT ERROR =====");
    console.error(err);

    console.log("⚠️ Gemini unavailable for Negotiation Agent.");
    console.log("⚠️ Using fallback negotiation engine...");

    return {
      timeline: [
        {
          agent: "Buyer",
          message: `Hi! I'm interested in the ${buyer.product}. The offer of ₹${seller.offerPrice} looks good, but could you include any extra benefits?`,
        },

        {
          agent: "Seller",
          message: `Certainly! The price remains ₹${seller.offerPrice}. It already includes ${seller.delivery} and ${seller.warranty}.`,
        },

        {
          agent: "Buyer",
          message:
            "Can you also include a cashback offer or an accessory with this purchase?",
        },

        {
          agent: "Seller",
          message:
            "I can include a small cashback while keeping the final price unchanged.",
        },

        {
          agent: "Buyer",
          message:
            "That sounds fair. The offer looks good to me. I'll wait for the final approval before proceeding.",
        },

        {
          agent: "Seller",
          message: `Great! The final offer remains ₹${seller.offerPrice} with ${seller.delivery} and ${seller.warranty}. Please review the offer and approve it to complete the purchase.`,
        },
      ],

      // Tell the frontend that fallback was used
      source: "fallback",
      fallback: true,
    };
  }
}

module.exports = negotiationAgent;