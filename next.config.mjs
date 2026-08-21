/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "res.cloudinary.com",
        port: "",
        pathname: "/dhve8rbbn/image/**",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        port: "",
        pathname: "/dhve8rbbn/image/**",
      },
    ],
  },

  // ==============================
  // SECURITY HEADERS
  // ==============================
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            // Prevent MIME-type sniffing
            key: "X-Content-Type-Options",
            value: "nosniff",
          },

          {
            // Prevent clickjacking / iframe embedding
            key: "X-Frame-Options",
            value: "DENY",
          },

          {
            // Control referrer information
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },

          {
            // Disable unnecessary browser features
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
