const express = require('../../../../.cache/typescript/2.9/node_modules/@types/express');
const { parse } = require('url');
const { join } = require('path');
const next = require('../../../../.cache/typescript/2.9/node_modules/@types/next');

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  // use next.js
  server.get('*', (req, res) => {
    const parsedUrl = parse(req.url, true);
    const rootStaticFiles = ['/css', '/javascript', '/img'];
    const pathname = parsedUrl.pathname || '';
    const isServeStatic = rootStaticFiles.some(i => pathname.includes(i));
    if (isServeStatic) {
      const path = join(__dirname, 'static', parsedUrl.pathname);
      app.serveStatic(req, res, path);
    } else {
      handle(req, res, parsedUrl);
    }
  });

  server.listen(port, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});
