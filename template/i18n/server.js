const express = require('express');
const bodyParser = require('body-parser');
const { parse } = require('url');
const next = require('next');
const { join } = require('path');
const i18nextMiddleware = require('i18next-express-middleware');
const Backend = require('i18next-node-fs-backend');
const { i18nInstance } = require('./i18n');

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== 'production';


const app = next({ dev });
const handler = app.getRequestHandler();

// Using for i18n
const detectOptions = {
  order: ['querystring', 'cookie', 'header'],
  // keys or params to lookup language from
  lookupQuerystring: 'lng',
  lookupCookie: 'lng',
  lookupSession: 'lng',
  lookupPath: 'lng',
  lookupFromPathIndex: 0,
};

// using i18next-express-middleware
i18nInstance
  .use(Backend)
  .use(i18nextMiddleware.LanguageDetector)
  .init({
    fallbackLng: 'en',
    preload: ['en'],
    ns: ['common'],
    backend: {
      loadPath: join(__dirname, '../locales/{{lng}}/{{ns}}.json'),
      addPath: join(__dirname, '../locales/{{lng}}/{{ns}}.missing.json'),
    },
    detection: detectOptions,
  }, () => {
    app.prepare()
      .then(() => {
        const server = express();
        server.use(bodyParser.json());
        server.use(bodyParser.urlencoded({ extended: false }));

        // enable middleware for i18next
        server.use(i18nextMiddleware.handle(i18nInstance));

        // serve locales for client
        server.use('/locales', express.static(join(__dirname, '../locales')));

        // missing keys
        server.post('/locales/add/:lng/:ns', i18nextMiddleware.missingKeyHandler(i18nInstance));

        // use next.js
        server.get('*', (req, res) => {
          const parsedUrl = parse(req.url, true);
          const rootStaticFiles = [
            '/css',
            '/js',
            '/img',
            '/fonts',
          ];
          const pathname = parsedUrl.pathname || '';
          const isServeStatic = rootStaticFiles.some(i => pathname.includes(i));
          if (isServeStatic) {
            const path = join(__dirname, '../static', parsedUrl.pathname);
            app.serveStatic(req, res, path);
          } else {
            handler(req, res, parsedUrl);
          }
        });
        server.listen(port, (err) => {
          if (err) throw err;
          console.log(`> Ready on http://localhost:${port}`);
        });
      });
  });
