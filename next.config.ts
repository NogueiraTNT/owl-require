import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  /* config options here */
  serverExternalPackages: ["whatsapp-web.js", "puppeteer"],
  webpack: (config, { isServer }) => {
    if (isServer) {
      config.externals.push("whatsapp-web.js")
    }
    return config
  },
  images: {
    remotePatterns: [
      {
        hostname: "utfs.io",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        port: "",
        pathname: "/a/**", // O pathname pode variar, '**' permite qualquer caminho
      },
      {
        protocol: "https",
        hostname: "megaprofissional.com.br",
        port: "",
        pathname: "/f/**", // O pathname pode variar, '**' permite qualquer caminho
      },
      {
        protocol: "https",
        hostname: "megaprofissional.com.br",
        port: "",
        pathname: "/upload/**",
      },

      {
        protocol: "https",
        hostname: "tuadzdknepst5bpa.public.blob.vercel-storage.com",
        port: "",
        pathname: "/**",
      },

      {
        protocol: "https",
        hostname: "img.freepik.com",
        port: "",
        pathname: "/vetores-gratis/**",
      },
    ],
  },
}

export default nextConfig
