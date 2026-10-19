const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const root = __dirname;
http.createServer((req, res) => {
  let name;
  try { name = decodeURIComponent(new URL(req.url, 'http://localhost').pathname); } catch { res.writeHead(400); res.end(); return; }
  let file = path.resolve(root, '.' + name);
  if (!file.startsWith(root + path.sep) && file !== root) { res.writeHead(403); res.end(); return; }
  if (name.endsWith('/')) file = path.join(file, 'index.html');
  fs.readFile(file, (err, data) => {
    if (err) { res.writeHead(404); res.end('Not found'); return; }
    const types = {'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.png':'image/png','.xml':'application/xml','.txt':'text/plain'};
    res.writeHead(200, {'Content-Type': types[path.extname(file)] || 'application/octet-stream'}); res.end(data);
  });
}).listen(4173, '0.0.0.0', () => console.log('Lova preview: http://localhost:4173/pt-br/'));
