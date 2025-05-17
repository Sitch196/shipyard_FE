import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    base: "/",
    build: {
        outDir: "dist",
        rollupOptions: {
            output: {
                manualChunks: undefined,
            },
        },
        // Ensure index.html is copied to dist
        assetsDir: "assets",
        emptyOutDir: true,
    },
    server: {
        port: 5173,
        host: true,
        strictPort: true,
    },
    preview: {
        port: 5173,
        host: true,
    },
});
