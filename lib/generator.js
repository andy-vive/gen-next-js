const Promise = require('bluebird');
const path = require('path');
const fs = require('fs');
const _0755 = parseInt('0755', 8);
const DEFAULT_TEMPLATE_DIR = path.join(__dirname, '..', 'template', 'default');
const I18N_TEMPLATE_DIR = path.join(__dirname, '..', 'template', 'i18n');

const generator = exports;

const createPath = fromDir => toDir => file => ({
  from: path.join(fromDir, file),
  to: path.resolve(toDir, file)
});

function copy({ from, to }) {
  return fs.createReadStream(from).pipe(fs.createWriteStream(to));
}

function log(data) {
  console.log(data);
}

const mkdir = Promise.promisify(fs.mkdir);

generator.generateDefault = function(destPath) {
  log('Generating default NextJS app...');
  const createPathFromTemplateTo = createPath(DEFAULT_TEMPLATE_DIR);

  const files = [
    'package.json',
    '.babelrc',
    '.editorconfig',
    '.eslintrc',
    '.gitignore',
    'env-config.js',
    'jest.config.js',
    'jest.setup.js',
    'next.config.js',
    'postcss.config.js',
    'server.js',
    'commons/redux/index.js',
    'commons/components/index.js',
    'commons/components/Layout/index.js',
    'commons/components/Layout/Body/index.js',
    'commons/components/Layout/Header/index.js',
    'commons/components/Layout/Header/NavBar.js',
    'modules/home/index.js',
    'modules/home/home.action.js',
    'modules/home/home.reducer.js',
    'pages/index.js',
    'pages/_document.js',
    'services/sample.service.js',
    'static/sample.css'
  ];

  Promise.all([
    mkdir(path.join(destPath, 'commons'), _0755),
    mkdir(path.join(destPath, 'modules'), _0755),
    mkdir(path.join(destPath, 'pages'), _0755),
    mkdir(path.join(destPath, 'services'), _0755),
    mkdir(path.join(destPath, 'static'), _0755)
  ]).then(_ => {
    Promise.all([
      mkdir(path.join(destPath, 'commons/redux'), _0755),
      mkdir(path.join(destPath, 'commons/components'), _0755),
      mkdir(path.join(destPath, 'modules/home'), _0755)
    ]).then(_ => {
      Promise.all([
        mkdir(path.join(destPath, 'commons/components/Layout'), _0755)
      ]).then(_ => {
        Promise.all([
          mkdir(path.join(destPath, 'commons/components/Layout/Body'), _0755),
          mkdir(path.join(destPath, 'commons/components/Layout/Header'), _0755)
        ])
          .then(_ =>
            files.map(createPathFromTemplateTo(destPath)).forEach(copy)
          )
          .then(_ => log('Generate successfully!'));
      });
    });
  });
}

generator.generateWithI18n = function(destPath) {
  log('Generating NextJS app with I18n...');
  const createPathFromTemplateTo = createPath(I18N_TEMPLATE_DIR);

  const files = [
    'package.json',
    '.babelrc',
    '.editorconfig',
    '.eslintrc',
    '.gitignore',
    'env-config.js',
    'i18n.js',
    'jest.config.js',
    'jest.setup.js',
    'next.config.js',
    'postcss.config.js',
    'server.js',
    'commons/redux/index.js',
    'commons/components/index.js',
    'commons/components/Layout/index.js',
    'commons/components/Layout/Body/index.js',
    'commons/components/Layout/Header/index.js',
    'commons/components/Layout/Header/NavBar.js',
    'commons/withI18n/index.js',
    'locales/en/common.json',
    'modules/home/index.js',
    'modules/home/home.action.js',
    'modules/home/home.reducer.js',
    'pages/index.js',
    'pages/_document.js',
    'services/sample.service.js',
    'static/sample.css'
  ];

  Promise.all([
    mkdir(path.join(destPath, 'commons'), _0755),
    mkdir(path.join(destPath, 'locales'), _0755),
    mkdir(path.join(destPath, 'modules'), _0755),
    mkdir(path.join(destPath, 'pages'), _0755),
    mkdir(path.join(destPath, 'services'), _0755),
    mkdir(path.join(destPath, 'static'), _0755)
  ]).then(_ => {
    Promise.all([
      mkdir(path.join(destPath, 'commons/redux'), _0755),
      mkdir(path.join(destPath, 'commons/components'), _0755),
      mkdir(path.join(destPath, 'commons/withI18n'), _0755),
      mkdir(path.join(destPath, 'modules/home'), _0755),
      mkdir(path.join(destPath, 'locales/en'), _0755)
    ]).then(_ => {
      Promise.all([
        mkdir(path.join(destPath, 'commons/components/Layout'), _0755)
      ]).then(_ => {
        Promise.all([
          mkdir(path.join(destPath, 'commons/components/Layout/Body'), _0755),
          mkdir(path.join(destPath, 'commons/components/Layout/Header'), _0755)
        ])
          .then(_ =>
            files.map(createPathFromTemplateTo(destPath)).forEach(copy)
          )
          .then(_ => log('Generate successfully!'));
      });
    });
  });
}