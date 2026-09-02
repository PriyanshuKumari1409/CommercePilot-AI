const axios = require("axios");

async function getProductImage(productName) {
  try {
    const apiKey = process.env.SERPAPI_KEY;

    const response = await axios.get(
      "https://serpapi.com/search.json",
      {
        params: {
          engine: "google_images",
          q: productName,
          api_key: apiKey,
        },
      }
    );

    if (
      response.data.images_results &&
      response.data.images_results.length > 0
    ) {
      return response.data.images_results[0].original;
    }

    return null;
  } catch (err) {
    console.log(err.message);
    return null;
  }
}

module.exports = {
  getProductImage,
};