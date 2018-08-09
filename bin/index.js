#!/usr/bin/env node

const Promise = require('bluebird');
const program = require('commander');
const path = require('path');
const fs = require('fs');

const TEMPLATE_DIR = path.join(__dirname, '..', 'template');
const VERSION = require('../package').version;
const _0755 = parseInt('0755', 8);

program
  .name('gen-next-js')
  .version(VERSION, '    --version')
  .usage('<dir>')
  .parse(process.argv);

function log(data) {
  console.log(data);
}

const createPath = fromDir => toDir => file => ({
  from: path.join(fromDir, file),
  to: path.resolve(toDir, file)
});

function copy({ from, to }) {
  return fs.createReadStream(from).pipe(fs.createWriteStream(to));
}

const mkdir = Promise.promisify(fs.mkdir);

function main() {
  const destPath = program.args.shift() || '.';
  const createPathFromTemplateTo = createPath(TEMPLATE_DIR);

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

main();
