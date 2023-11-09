import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";
// import { resolve } from "path";

// https://vitejs.dev/config/
export default ({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };
  const proxy =
    process.env.VITE_ENV == "development"
      ? "http://localhost:3000"
      : "https://little-chat-room-server.onrender.com";
  return defineConfig({
    plugins: [react()],
    server: {
      proxy: {
        "/api": {
          target: "https://little-chat-room-server.onrender.com",
          changeOrigin: true,
        },
      },
    },
  });
};
