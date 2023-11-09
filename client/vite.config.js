import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";
// import { resolve } from "path";

// https://vitejs.dev/config/
export default ({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };
  return defineConfig({
    plugins: [react()],
    server: {
      proxy: {
        "/api": {
          target: process.env.VITE_API_BASE_URL,
          changeOrigin: true,
        },
      },
    },
  });
};
