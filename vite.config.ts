import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

export default defineConfig(async ({ mode }) => {
  const devPlugins =
    mode === "development"
      ? [
          (await import("@replit/vite-plugin-runtime-error-modal")).default(),
          (await import("@replit/vite-plugin-cartographer")).cartographer(),
        ]
      : [];

  return {
    plugins: [react(), tailwindcss(), ...devPlugins],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    server: {
      host: "0.0.0.0",
      port: parseInt(process.env.PORT || "3000"),
      allowedHosts: true,
      strictPort: false,
    },
    build: {
      outDir: "dist/public",
      emptyOutDir: true,
    },
  };
});
