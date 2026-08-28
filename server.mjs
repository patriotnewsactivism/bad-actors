import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PORT = process.env.PORT || 8080;
const DIST = path.join(__dirname, 'dist');

const MIME = {
  '.html': 'text/html', '.js': 'text/javascript', '.mjs': 'text/javascript',
  '.css': 'text/css', '.json': 'application/json', '.png': 'image/png',
  '.jpg': 'image/jpeg', '.svg': 'image/svg+xml', '.ico': 'image/x-icon',
  '.webmanifest': 'application/manifest+json', '.xml': 'application/xml',
  '.txt': 'text/plain', '.woff': 'font/woff', '.woff2': 'font/woff2',
};

// Preload API handlers
const apiHandlers = {};
const apiDir = path.join(__dirname, 'api');
if (fs.existsSync(apiDir)) {
  for (const file of fs.readdirSync(apiDir)) {
    if (file.endsWith('.js') || file.endsWith('.mjs')) {
      const route = '/api/' + file.replace(/\.(js|mjs)$/, '');
      try {
        const mod = await import('./api/' + file);
        apiHandlers[route] = mod.default || mod;
      } catch (e) {
        console.error(`Failed to load ${route}: ${e.message}`);
      }
    }
  }
}

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, `http://localhost:${PORT}`);
  const pathname = url.pathname;

  // API routes
  for (const [route, handler] of Object.entries(apiHandlers)) {
    if (pathname === route || pathname.startsWith(route + '/')) {
      if (handler) {
        try {
          await handler(req, res);
        } catch (e) {
          res.writeHead(500, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: e.message }));
        }
        return;
      }
    }
  }

  // Try static file
  let filePath = path.join(DIST, pathname);
  if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
    const ext = path.extname(filePath);
    res.writeHead(200, { 'Content-Type': MIME[ext] || 'application/octet-stream' });
    fs.createReadStream(filePath).pipe(res);
    return;
  }

  // SPA fallback to index.html
  const index = path.join(DIST, 'index.html');
  if (fs.existsSync(index)) {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    fs.createReadStream(index).pipe(res);
    return;
  }

  res.writeHead(404);
  res.end('Not found');
});

server.listen(PORT, () => console.log(`bad-actors serving on :${PORT}`));
