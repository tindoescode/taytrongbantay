const withOptimizedImages = require("next-optimized-images");

module.exports = withOptimizedImages({
  reactStrictMode: true,
  images: {
    domains: [
      "i.imgur.com",
      "www.taytrongbantay.com",
      "taytrongbantay.com",
      "placekitten.com",
      "localhost",
      "taxreform.dof.gov.ph",
      "ucarecdn.com",
    ],
  },
});
