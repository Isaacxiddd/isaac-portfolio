// vite.config.ts
import { defineConfig } from "file:///C:/Users/ISAAC%20GARCIA/OneDrive/Desktop/proyectos/Portafolio2/Portafoliov3/node_modules/.pnpm/vite@6.4.3_@types+node@25.9.1_jiti@1.21.7/node_modules/vite/dist/node/index.js";
import react from "file:///C:/Users/ISAAC%20GARCIA/OneDrive/Desktop/proyectos/Portafolio2/Portafoliov3/node_modules/.pnpm/@vitejs+plugin-react@4.7.0__8f6303b5b4d5a2e4f42a4a734ef68b97/node_modules/@vitejs/plugin-react/dist/index.js";
var vite_config_default = defineConfig({
  plugins: [react(), {
    name: "neocities-proxy",
    configureServer(server) {
      server.middlewares.use("/api/neocities-info", async (_req, res) => {
        try {
          const response = await fetch("https://neocities.org/api/info?sitename=formulafacilutn");
          if (!response.ok) throw new Error(`HTTP ${response.status}`);
          const data = await response.json();
          res.setHeader("Content-Type", "application/json");
          res.setHeader("Access-Control-Allow-Origin", "*");
          res.statusCode = 200;
          res.end(JSON.stringify(data));
        } catch {
          res.statusCode = 500;
          res.end(JSON.stringify({ error: "Failed to fetch Neocities info" }));
        }
      });
    }
  }]
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxJU0FBQyBHQVJDSUFcXFxcT25lRHJpdmVcXFxcRGVza3RvcFxcXFxwcm95ZWN0b3NcXFxcUG9ydGFmb2xpbzJcXFxcUG9ydGFmb2xpb3YzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxJU0FBQyBHQVJDSUFcXFxcT25lRHJpdmVcXFxcRGVza3RvcFxcXFxwcm95ZWN0b3NcXFxcUG9ydGFmb2xpbzJcXFxcUG9ydGFmb2xpb3YzXFxcXHZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9DOi9Vc2Vycy9JU0FBQyUyMEdBUkNJQS9PbmVEcml2ZS9EZXNrdG9wL3Byb3llY3Rvcy9Qb3J0YWZvbGlvMi9Qb3J0YWZvbGlvdjMvdml0ZS5jb25maWcudHNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlJ1xyXG5pbXBvcnQgcmVhY3QgZnJvbSAnQHZpdGVqcy9wbHVnaW4tcmVhY3QnXHJcblxyXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xyXG4gIHBsdWdpbnM6IFtyZWFjdCgpLCB7XHJcbiAgICBuYW1lOiAnbmVvY2l0aWVzLXByb3h5JyxcclxuICAgIGNvbmZpZ3VyZVNlcnZlcihzZXJ2ZXIpIHtcclxuICAgICAgc2VydmVyLm1pZGRsZXdhcmVzLnVzZSgnL2FwaS9uZW9jaXRpZXMtaW5mbycsIGFzeW5jIChfcmVxLCByZXMpID0+IHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaCgnaHR0cHM6Ly9uZW9jaXRpZXMub3JnL2FwaS9pbmZvP3NpdGVuYW1lPWZvcm11bGFmYWNpbHV0bicpO1xyXG4gICAgICAgICAgaWYgKCFyZXNwb25zZS5vaykgdGhyb3cgbmV3IEVycm9yKGBIVFRQICR7cmVzcG9uc2Uuc3RhdHVzfWApO1xyXG4gICAgICAgICAgY29uc3QgZGF0YSA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcclxuICAgICAgICAgIHJlcy5zZXRIZWFkZXIoJ0NvbnRlbnQtVHlwZScsICdhcHBsaWNhdGlvbi9qc29uJyk7XHJcbiAgICAgICAgICByZXMuc2V0SGVhZGVyKCdBY2Nlc3MtQ29udHJvbC1BbGxvdy1PcmlnaW4nLCAnKicpO1xyXG4gICAgICAgICAgcmVzLnN0YXR1c0NvZGUgPSAyMDA7XHJcbiAgICAgICAgICByZXMuZW5kKEpTT04uc3RyaW5naWZ5KGRhdGEpKTtcclxuICAgICAgICB9IGNhdGNoIHtcclxuICAgICAgICAgIHJlcy5zdGF0dXNDb2RlID0gNTAwO1xyXG4gICAgICAgICAgcmVzLmVuZChKU09OLnN0cmluZ2lmeSh7IGVycm9yOiAnRmFpbGVkIHRvIGZldGNoIE5lb2NpdGllcyBpbmZvJyB9KSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgIH0sXHJcbiAgfV0sXHJcbn0pXHJcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBK1osU0FBUyxvQkFBb0I7QUFDNWIsT0FBTyxXQUFXO0FBRWxCLElBQU8sc0JBQVEsYUFBYTtBQUFBLEVBQzFCLFNBQVMsQ0FBQyxNQUFNLEdBQUc7QUFBQSxJQUNqQixNQUFNO0FBQUEsSUFDTixnQkFBZ0IsUUFBUTtBQUN0QixhQUFPLFlBQVksSUFBSSx1QkFBdUIsT0FBTyxNQUFNLFFBQVE7QUFDakUsWUFBSTtBQUNGLGdCQUFNLFdBQVcsTUFBTSxNQUFNLHlEQUF5RDtBQUN0RixjQUFJLENBQUMsU0FBUyxHQUFJLE9BQU0sSUFBSSxNQUFNLFFBQVEsU0FBUyxNQUFNLEVBQUU7QUFDM0QsZ0JBQU0sT0FBTyxNQUFNLFNBQVMsS0FBSztBQUNqQyxjQUFJLFVBQVUsZ0JBQWdCLGtCQUFrQjtBQUNoRCxjQUFJLFVBQVUsK0JBQStCLEdBQUc7QUFDaEQsY0FBSSxhQUFhO0FBQ2pCLGNBQUksSUFBSSxLQUFLLFVBQVUsSUFBSSxDQUFDO0FBQUEsUUFDOUIsUUFBUTtBQUNOLGNBQUksYUFBYTtBQUNqQixjQUFJLElBQUksS0FBSyxVQUFVLEVBQUUsT0FBTyxpQ0FBaUMsQ0FBQyxDQUFDO0FBQUEsUUFDckU7QUFBQSxNQUNGLENBQUM7QUFBQSxJQUNIO0FBQUEsRUFDRixDQUFDO0FBQ0gsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
