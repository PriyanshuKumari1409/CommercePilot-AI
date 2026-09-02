require("dotenv").config();
const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

async function sellerAgent(buyerProduct, budget) {
  console.log("=================================");
  console.log("Seller Agent Running...");
  console.log("Budget:", budget);
  console.log("Buyer Product:", buyerProduct);
  console.log("=================================");

  const prompt = `
You are an AI Seller working for a leading e-commerce company like Amazon or Flipkart.

Customer wants:

Product: ${buyerProduct.product}
Original Price: ₹${buyerProduct.price}

Customer Budget:
₹${budget}

Your job is to negotiate realistically while protecting the seller's profit.

Rules:

1. Do NOT force the price to match the customer's budget.
2. Never give an unrealistic discount just to satisfy the customer's budget.
3. Give a realistic discount between 2% and 12%.
4. The final offer should normally be based on the original product price.
5. If the customer's budget is much lower than the realistic product price, the offer may be higher than the customer's budget.
6. Never reduce the product price by more than 12%.
7. Include delivery.
8. Include warranty.
9. Mention cashback if appropriate.
10. Explain why this is a good deal.
11. Return ONLY valid JSON.

JSON Format:

{
  "offerPrice": 0,
  "discount": 0,
  "delivery": "",
  "warranty": "",
  "cashback": "",
  "reason": ""
}
`;

  try {
    console.log("Calling Gemini Seller Agent...");

    const response = await ai.models.generateContent({
      // TEMPORARY TEST MODEL
      // Change this back to your valid Gemini model after testing.
      // model: "invalid-model-for-testing",
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

    const seller = JSON.parse(clean);

    const originalPrice = Number(buyerProduct.price);

    seller.offerPrice = Number(seller.offerPrice);
    seller.discount = Number(seller.discount);

    /*
     * Safety check:
     * Seller should never give an unrealistic discount.
     */

    const minimumAllowedPrice = Math.round(
      originalPrice * 0.88
    );

    const maximumAllowedPrice = originalPrice;

    if (
      isNaN(seller.offerPrice) ||
      seller.offerPrice <= 0
    ) {
      seller.offerPrice = Math.round(
        originalPrice * 0.94
      );
    }

    /*
     * Prevent discount greater than 12%.
     */

    if (seller.offerPrice < minimumAllowedPrice) {
      seller.offerPrice = minimumAllowedPrice;
    }

    /*
     * Prevent seller from increasing price above original price.
     */

    if (seller.offerPrice > maximumAllowedPrice) {
      seller.offerPrice = maximumAllowedPrice;
    }

    seller.offerPrice = Math.round(
      seller.offerPrice
    );

    /*
     * Always calculate discount ourselves.
     */

    seller.discount =
      originalPrice - seller.offerPrice;

    /*
     * Default benefits if Gemini doesn't provide them.
     */

    seller.delivery =
      seller.delivery ||
      "Free Express Delivery";

    seller.warranty =
      seller.warranty ||
      "1 Year Brand Warranty";

    seller.cashback =
      seller.cashback ||
      "No Cashback";

    seller.reason =
      seller.reason ||
      "AI generated a realistic seller offer based on the product's market value.";

    /*
     * IMPORTANT:
     * Gemini successfully generated this offer.
     */

    seller.source = "gemini";
    seller.fallback = false;

    console.log("===== GEMINI SELLER OFFER =====");
    console.log(seller);

    return seller;

  } catch (err) {

    console.error("===== SELLER AGENT ERROR =====");
    console.error(err);

    console.log("⚠️ Gemini unavailable.");
    console.log("⚠️ Using Smart Pricing Engine...");

    const originalPrice = Number(
      buyerProduct.price
    );

    let discountPercent;

    /*
     * Realistic fallback discount.
     */

    if (originalPrice <= 3000) {
      discountPercent = 10;
    } else if (originalPrice <= 10000) {
      discountPercent = 8;
    } else if (originalPrice <= 30000) {
      discountPercent = 7;
    } else if (originalPrice <= 70000) {
      discountPercent = 6;
    } else {
      discountPercent = 5;
    }

    const discount = Math.round(
      originalPrice * discountPercent / 100
    );

    /*
     * Do NOT cap offerPrice at buyer's budget.
     */

    const offerPrice =
      originalPrice - discount;

    /*
     * Dynamic delivery.
     */

    let delivery;

    if (originalPrice >= 50000) {
      delivery =
        "Free Same-Day Delivery";
    } else if (originalPrice >= 10000) {
      delivery =
        "Free Express Delivery";
    } else {
      delivery =
        "Free Standard Delivery";
    }

    /*
     * Dynamic warranty.
     */

    let warranty;

    if (originalPrice >= 50000) {
      warranty =
        "2 Years Brand Warranty";
    } else if (originalPrice >= 10000) {
      warranty =
        "1 Year Brand Warranty";
    } else {
      warranty =
        "6 Months Brand Warranty";
    }

    /*
     * Cashback.
     */

    let cashback;

    if (originalPrice >= 50000) {
      cashback =
        "₹1,000 Cashback";
    } else if (originalPrice >= 20000) {
      cashback =
        "₹500 Cashback";
    } else {
      cashback =
        "No Cashback";
    }

    /*
     * IMPORTANT:
     * Tell the frontend that fallback was used.
     */

    return {
      offerPrice,

      discount:
        originalPrice - offerPrice,

      delivery,

      warranty,

      cashback,

      reason:
        `Smart Pricing Engine generated a realistic ${discountPercent}% discount based on the product price. The offer was not artificially reduced to match the customer's budget.`,

      source: "fallback",

      fallback: true,
    };
  }
}

module.exports = sellerAgent;