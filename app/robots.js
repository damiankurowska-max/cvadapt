export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/api/",
          "/sign-in",
          "/sign-up",
          "/success",
          "/dashboard",
          "/account",
          "/onboarding",
          "/gallery",
          "/reel",
          "/join",
          "/merci-sondage",
          "/institution",
        ],
      },
      { userAgent: "facebookexternalhit", allow: "/" },
      { userAgent: "Twitterbot", allow: "/" },
      { userAgent: "LinkedInBot", allow: "/" },
      { userAgent: "Googlebot", allow: "/" },
    ],
    sitemap: "https://cvadapt.eu/sitemap.xml",
  };
}
