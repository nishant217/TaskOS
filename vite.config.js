import { defineConfig } from "vite";
import { fileURLToPath, URL } from "node:url";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { VitePWA } from "vite-plugin-pwa";
import path from "path";

export default defineConfig({
  // ⭐ Allow importing 3D models
  assetsInclude: ["**/*.glb", "**/*.gltf"],

  optimizeDeps: {
    include: ['react', 'react-dom', 'react/jsx-runtime', 'framer-motion'],
  },

  plugins: [
    react({
      jsxRuntime: 'automatic',
    }),
    tailwindcss(),

    VitePWA({
      registerType: "autoUpdate",
      injectRegister: false,

      pwaAssets: {
        disabled: false,
        config: true,
      },

      manifest: {
        name: "Super-App",
        short_name: "SuperApp",
        description: "Super-App",
        theme_color: "#ffffff",
      },

      workbox: {
        globPatterns: ["**/*.{js,css,html,svg,png,ico,glb,gltf}"],
        cleanupOutdatedCaches: true,
        clientsClaim: true,
        // Increase default Workbox precache size limit to allow larger bundles
        // Default is 2 MiB (2097152). Set to 5 MiB to accommodate index-DgyavR9O.js
        maximumFileSizeToCacheInBytes: 5 * 1024 * 1024,

        // ⭐ CRITICAL FIX: Prevent PWA from caching Mapbox requests
        runtimeCaching: [
          {
            urlPattern: ({ url }) =>
              url.origin.includes("api.mapbox.com") ||
              url.origin.includes("events.mapbox.com") ||
              url.origin.includes("tiles.mapbox.com") ||
              url.href.includes("mapbox"),
            handler: "NetworkOnly",
            options: {
              cacheName: "mapbox-no-cache",
            },
          },
          {
            urlPattern: ({ url }) => url.origin.includes("i.pravatar.cc"),
            handler: "NetworkOnly",
            options: { cacheName: "avatar-no-cache" },
          },
        ],
      },

      devOptions: {
        enabled: true,
        navigateFallback: "index.html",
        suppressWarnings: true,
        type: "module",
      },
    }),
  ],
  resolve: {
    alias: {
      // allow importing using '@/path/to/file' -> './src/path/to/file'
      "@": fileURLToPath(new URL("./src", import.meta.url)),
      react: path.resolve(__dirname, "node_modules/react"),
      "react-dom": path.resolve(__dirname, "node_modules/react-dom"),
    },
  },
});
