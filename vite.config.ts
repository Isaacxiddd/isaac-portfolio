import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react(), {
    name: 'neocities-proxy',
    configureServer(server) {
      server.middlewares.use('/api/neocities-info', async (_req, res) => {
        try {
          const response = await fetch('https://neocities.org/api/info?sitename=formulafacilutn');
          if (!response.ok) throw new Error(`HTTP ${response.status}`);
          const data = await response.json();
          res.setHeader('Content-Type', 'application/json');
          res.setHeader('Access-Control-Allow-Origin', '*');
          res.statusCode = 200;
          res.end(JSON.stringify(data));
        } catch {
          res.statusCode = 500;
          res.end(JSON.stringify({ error: 'Failed to fetch Neocities info' }));
        }
      });
    },
  }],
})
