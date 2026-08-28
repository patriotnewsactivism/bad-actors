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

// Preload API handlers (Vercel-style: export default async function handler(req, res))
const apiHandlers = {};
const apiDir = path.join(__dirname, 'api');
if (fs.existsSync(apiDir)) {
  for (const file of fs.readdirSync(apiDir)) {
    if (file.endsWith('.js') || file.endsWith('.mjs')) {
      const route = '/api/' + file.replace(/\.(js|mjs)$/, '');
      try {
        const mod = await import('./api/' + file);
        apiHandlers[route] = mod.default || mod;
        console.log(`Loaded API route: ${route}`);
      } catch (e) {
        console.error(`Failed to load ${route}: ${e.message}`);
      }
    }
  }
}

function readBody(req) {
  return new Promise((resolve) => {
    let chunks = [];
    req.on('data', (c) => chunks.push(c));
    req.on('end', () => {
      const raw = Buffer.concat(chunks).toString('utf8');
      if (!raw) return resolve({});
      try {
        resolve(JSON.parse(raw));
      } catch {
        resolve({});
      }
    });
    req.on('error', () => resolve({}));
  });
}

// Adds Vercel-style helper methods (res.status().json(), res.send()) to a plain
// Node http.ServerResponse so unmodified Vercel serverless handlers work here.
function enhanceRes(res) {
  res.status = (code) => { res.statusCode = code; return res; };
  res.json = (obj) => {
    if (!res.headersSent) res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(obj));
    return res;
  };
  res.send = (body) => {
    res.end(typeof body === 'string' ? body : JSON.stringify(body));
    return res;
  };
  return res;
}

async function enhanceReq(req) {
  const url = new URL(req.url, `http://localhost:${PORT}`);
  req.query = Object.fromEntries(url.searchParams.entries());
  if (req.method === 'POST' || req.method === 'PUT' || req.method === 'PATCH') {
    req.body = await readBody(req);
  } else {
    req.body = {};
  }
  return req;
}

const server = http.createServer(async (rawReq, rawRes) => {
  const url = new URL(rawReq.url, `http://localhost:${PORT}`);
  const pathname = url.pathname;

  // API routes (Vercel-compatible shim)
  for (const [route, handler] of Object.entries(apiHandlers)) {
    if (pathname === route || pathname.startsWith(route + '/')) {
      if (handler) {
        const res = enhanceRes(rawRes);
        // Basic permissive CORS so the SPA (same-origin here, but harmless) works
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
        try {
          const req = await enhanceReq(rawReq);
          await handler(req, res);
        } catch (e) {
          console.error(`API error on ${route}:`, e);
          if (!res.headersSent) {
            res.status(500).json({ error: e.message });
          }
        }
        return;
      }
    }
  }

  // Static file
  let filePath = path.join(DIST, pathname);
  if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
    const ext = path.extname(filePath);
    rawRes.writeHead(200, { 'Content-Type': MIME[ext] || 'application/octet-stream' });
    fs.createReadStream(filePath).pipe(rawRes);
    return;
  }

  // SPA fallback to index.html
  const index = path.join(DIST, 'index.html');
  if (fs.existsSync(index)) {
    rawRes.writeHead(200, { 'Content-Type': 'text/html' });
    fs.createReadStream(index).pipe(rawRes);
    return;
  }

  rawRes.writeHead(404);
  rawRes.end('Not found');
});

server.listen(PORT, () => console.log(`bad-actors serving on :${PORT}`));
