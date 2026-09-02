const products = require("../data/products");

function buyerAgent(goal, budget, category) {
  console.log("Buyer Agent Running...");

  const list = products[category] || [];

  if (list.length === 0) {
    return {
      product: "No Product Found",
      price: 0,
      rating: 0,
      reason: "No products available for this category."
    };
  }


  // Prefer products within budget
  const affordableProducts = list.filter(product => product.price <= budget);

  const productsToSearch =
    affordableProducts.length > 0
      ? affordableProducts
      : list;

  const text = goal.toLowerCase();

  let best = null;
  let bestScore = -9999;

  for (const product of productsToSearch) {
    let score = 0;

    // Budget score
    if (product.price <= budget) {
      score += 50;

      // Reward products closer to budget
      score += Math.floor(product.price / 1000);
    } else {
      // Heavy penalty if over budget
      score -= Math.floor((product.price - budget) / 1000);
    }

    // Rating
    score += product.rating * 10;

    // Tag matching
    for (const tag of product.tags) {
      if (text.includes(tag.toLowerCase())) {
        score += 25;
      }
    }

    // Requirement keywords
    if (text.includes("gaming") && product.tags.includes("gaming"))
      score += 20;

    if (text.includes("battery") && product.tags.includes("battery"))
      score += 20;

    if (text.includes("camera") && product.tags.includes("camera"))
      score += 20;

    if (text.includes("apple") && product.tags.includes("apple"))
      score += 20;

    if (text.includes("anc") && product.tags.includes("anc"))
      score += 20;

    if (text.includes("fitness") && product.tags.includes("fitness"))
      score += 20;

    // Laptop brands
    if (text.includes("hp") && product.product.toLowerCase().includes("hp"))
      score += 50;

    if (text.includes("asus") && product.product.toLowerCase().includes("asus"))
      score += 50;

    if (text.includes("lenovo") && product.product.toLowerCase().includes("lenovo"))
      score += 50;

    if (text.includes("dell") && product.product.toLowerCase().includes("dell"))
      score += 50;

    if (text.includes("acer") && product.product.toLowerCase().includes("acer"))
      score += 50;

    if (text.includes("msi") && product.product.toLowerCase().includes("msi"))
      score += 50;

    // Phone brands
    if (text.includes("samsung") && product.product.toLowerCase().includes("samsung"))
      score += 50;

    if (text.includes("oneplus") && product.product.toLowerCase().includes("oneplus"))
      score += 50;

    if (text.includes("iphone") && product.product.toLowerCase().includes("iphone"))
      score += 50;

    if (text.includes("pixel") && product.product.toLowerCase().includes("pixel"))
      score += 50;

    if (text.includes("nothing") && product.product.toLowerCase().includes("nothing"))
      score += 50;

    if (score > bestScore) {
      bestScore = score;
      best = product;
    }
  }

  return {
    product: best.product,
    price: best.price,
    rating: best.rating,
    reason: `Chosen using Smart Recommendation Engine based on your budget and requirement. (Match Score: ${bestScore})`
  };
}

module.exports = buyerAgent;